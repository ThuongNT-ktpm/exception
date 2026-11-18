import React, { useState, useRef } from 'react';
import FloatingHearts from './FloatingHearts';

export default function LetterScreen({ config }) {
  const [videoSrc, setVideoSrc] = useState(config.videoSrc || "./video.mp4");
  const [videoError, setVideoError] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setVideoError(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-pink-200 via-pink-100 to-rose-200 relative overflow-hidden flex flex-col items-center justify-center px-4 py-6 select-none">
      <FloatingHearts />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center animate-fade-in">
        {/* Tiêu đề chính */}
        <h1
          className="text-3xl sm:text-5xl font-bold text-rose-600 mb-1 text-center drop-shadow-sm leading-tight"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          {config.letterTitle || "Gửi mắm thúiiiii"}
        </h1>

        {/* Tiêu đề phụ */}
        <p
          className="text-pink-400 text-xs sm:text-sm mb-3 italic text-center"
          style={{ fontFamily: "'Lora', serif" }}
        >
          {config.dedicatedTo || "~luôn vui vẻ nhó~"}
        </p>

        {/* Trái tim trang trí */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-10 sm:w-16 bg-pink-300" />
          <span className="text-pink-400 text-base animate-pulse">❤️</span>
          <div className="h-px w-10 sm:w-16 bg-pink-300" />
        </div>

        {/* Khung phát Video (Đã xóa bỏ 3 ảnh Polaroid theo yêu cầu) */}
        <div className="w-full bg-white/85 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl p-3 sm:p-5 border border-white/60">
          {!videoError ? (
            <div className="flex flex-col items-center">
              <video
                controls
                playsInline
                className="w-full rounded-xl sm:rounded-2xl shadow-md overflow-hidden bg-black aspect-video object-cover"
                src={videoSrc}
                onError={() => setVideoError(true)}
              >
                Trình duyệt của bạn không hỗ trợ thẻ video.
              </video>
              <div className="mt-3 flex items-center justify-between w-full px-1">
                <span className="text-[11px] sm:text-xs text-gray-500 italic" style={{ fontFamily: "'Lora', serif" }}>
                  🎬 Video dành riêng cho mắm thúi
                </span>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[11px] sm:text-xs text-rose-500 hover:text-rose-600 underline cursor-pointer"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Đổi video khác
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 sm:p-8 border-2 border-dashed border-rose-300 rounded-xl sm:rounded-2xl bg-rose-50/50 text-center">
              <span className="text-4xl sm:text-5xl mb-2 animate-bounce">🎬</span>
              <h3
                className="text-lg sm:text-xl font-bold text-rose-600 mb-1"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Khu vực video kỷ niệm
              </h3>
              <p
                className="text-gray-600 text-[11px] sm:text-xs mb-3 leading-relaxed max-w-xs"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Đặt file video của bạn vào thư mục web với tên:
                <br />
                <code className="inline-block mt-1 bg-white text-rose-500 font-bold px-2 py-0.5 rounded border border-rose-200 text-xs shadow-sm">
                  video.mp4
                </code>
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-rose-400 hover:bg-rose-500 active:scale-95 text-white rounded-full text-xs font-semibold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                style={{ fontFamily: "'Lora', serif" }}
              >
                <span>📁</span> Chọn video từ máy để xem ngay
              </button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}
