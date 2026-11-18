import React, { useState, useEffect, useRef, useMemo } from 'react';
import pako from 'pako';
import { defaultData, defaultSettings } from './config';
import QuestionScreen from './components/QuestionScreen';
import PinScreen from './components/PinScreen';
import SuccessScreen from './components/SuccessScreen';
import LetterScreen from './components/LetterScreen';

// Giải mã tham số nén c trong URL nếu có
function decodeCompressedParam(compressed) {
  try {
    let s = compressed.replace(/-/g, "+").replace(/_/g, "/");
    while (s.length % 4) s += "=";
    const binary = atob(s);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const inflated = pako.inflate(bytes, { to: "string" });
    return JSON.parse(inflated);
  } catch (err) {
    console.error("Lỗi giải mã URL query c:", err);
    return null;
  }
}

// Đọc query param từ URL
function getParam(key) {
  const params = new URLSearchParams(window.location.search);
  const c = params.get("c");
  if (c) {
    const decoded = decodeCompressedParam(c);
    if (decoded && decoded[key] !== undefined) return decoded[key];
  }
  const val = params.get(key);
  return val ? decodeURIComponent(val) : null;
}

export default function App() {
  const [screen, setScreen] = useState("question"); // "question" | "pin" | "success" | "letter"
  const [remoteSettings, setRemoteSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(() => !!getParam("id"));

  // Fetch settings từ API lovegift.online nếu có ?id=
  useEffect(() => {
    const id = getParam("id");
    if (!id) return;
    let cancelled = false;
    fetch(`https://lovegift.online/api/settings/${encodeURIComponent(id)}`)
      .then(res => res.json())
      .then(res => {
        if (!cancelled && res?.success && res?.data?.settings) {
          setRemoteSettings(res.data.settings);
        }
      })
      .catch(err => console.error("Lỗi tải settings:", err))
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  // Tổng hợp cấu hình
  const config = useMemo(() => {
    const rawType = (remoteSettings?.type || getParam("type")) === "f" ? "f" : "m";
    const base = defaultData[rawType] || defaultData.m;

    const pick = (field, key, fallback) => {
      if (remoteSettings && remoteSettings[field] != null && String(remoteSettings[field]).trim() !== "") {
        return remoteSettings[field];
      }
      const paramVal = getParam(key);
      return paramVal || fallback;
    };

    const question = pick("question", "question", base.question);
    const hint = pick("hint", "hint", defaultSettings.hint);
    const pin = pick("pin", "pin", defaultSettings.pins[0]);
    const letter = pick("letter", "letter", base.letter);
    const music = pick("music", "music", defaultSettings.music);

    let photos = defaultSettings.images;
    if (remoteSettings?.image && Array.isArray(remoteSettings.image) && remoteSettings.image.length > 0) {
      photos = remoteSettings.image.map(x => String(x).trim()).filter(Boolean);
    } else {
      const imgParam = getParam("image");
      if (imgParam) {
        photos = imgParam.split(",").map(x => x.trim()).filter(Boolean);
      }
    }

    const isPreview = getParam("isPreview") === "true";

    return {
      type: rawType,
      question,
      yesText: base.yesText,
      noText: base.noText,
      hint,
      pins: defaultSettings.pins,
      pinPreview: defaultSettings.pinPreview,
      pin,
      letter,
      photos,
      music,
      videoSrc: defaultSettings.videoSrc,
      isPreview,
      noPhrases: base.noPhrases,
      successText: base.successText,
      letterTitle: base.letterTitle,
      dedicatedTo: base.dedicatedTo,
      loveSign: base.loveSign,
      bearRoseGif: defaultSettings.bearRoseGif,
      bearPinGif: defaultSettings.bearPinGif,
      bearSuccessGif: defaultSettings.bearSuccessGif
    };
  }, [remoteSettings]);

  // Audio tự động phát / kích hoạt khi tương tác người dùng
  const audioRef = useRef(null);
  const interactedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(config.music);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }

    const handleUnlock = () => {
      if (!interactedRef.current && audioRef.current) {
        interactedRef.current = true;
        audioRef.current.play().catch(() => {});
      }
    };

    window.addEventListener("click", handleUnlock, { once: true });
    window.addEventListener("touchstart", handleUnlock, { once: true });

    return () => {
      audio.pause();
      window.removeEventListener("click", handleUnlock);
      window.removeEventListener("touchstart", handleUnlock);
    };
  }, [config.music]);

  if (isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-pink-100 via-white to-pink-100">
        <div className="relative flex items-center justify-center mb-8">
          <span className="absolute h-20 w-20 rounded-full border-4 border-pink-200 border-t-rose-400 animate-spin" />
          <span className="text-4xl animate-pulse">❤️</span>
        </div>
        <p
          className="text-rose-500 text-lg md:text-xl animate-pulse"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Đang chuẩn bị điều bất ngờ cho bạn...
        </p>
      </div>
    );
  }

  if (screen === "question") {
    return <QuestionScreen config={config} onAccept={() => setScreen("pin")} />;
  }

  if (screen === "pin") {
    return <PinScreen config={config} onSuccess={() => setScreen("success")} />;
  }

  if (screen === "success") {
    return <SuccessScreen config={config} onContinue={() => setScreen("letter")} />;
  }

  if (screen === "letter") {
    return (
      <LetterScreen
        config={config}
        onPlayVideo={() => {
          if (audioRef.current) {
            audioRef.current.pause();
          }
        }}
        onPauseVideo={() => {
          // Video tạm dừng
        }}
      />
    );
  }

  return null;
}
