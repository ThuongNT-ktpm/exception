import React, { useState } from 'react';

export default function PinScreen({ config, onSuccess }) {
  const [pinInput, setPinInput] = useState("");
  const [isWrong, setIsWrong] = useState(false);

  const handleDigit = (digit) => {
    if (pinInput.length >= 4) return;
    const nextPin = pinInput + digit;
    setPinInput(nextPin);

    if (nextPin.length === 4) {
      const isCorrect = Array.isArray(config.pins)
        ? config.pins.includes(nextPin)
        : (nextPin === config.pin || nextPin === "2705" || nextPin === "2809");

      if (isCorrect) {
        setTimeout(onSuccess, 350);
      } else {
        setIsWrong(true);
        setTimeout(() => {
          setIsWrong(false);
          setPinInput("");
        }, 500);
      }
    }
  };

  const handleBackspace = () => {
    setPinInput(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPinInput("");
  };

  return (
    <div className="min-h-[100dvh] h-[100dvh] max-h-[100dvh] overflow-hidden bg-gradient-to-b from-pink-100 via-white to-pink-100 flex flex-col items-center justify-center px-4 py-2 select-none safe-area">
      <div className="w-full max-w-sm md:max-w-md flex flex-col items-center animate-fade-in">
        {/* Gấu nhỏ xinh, vừa vặn */}
        <img
          src={config.bearPinGif}
          alt="cute bear"
          className="h-[75px] sm:h-[85px] md:h-[95px] mb-2 object-contain drop-shadow-sm"
        />

        {/* Gợi ý mật khẩu */}
        {config.hint && (
          <div className="max-w-[320px] sm:max-w-[360px] md:max-w-md mb-2 md:mb-3 px-3.5 py-1.5 md:py-2 rounded-2xl bg-white/80 border border-pink-100 shadow-sm text-center">
            <p
              className="text-gray-600 text-[11px] sm:text-xs leading-snug italic"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {config.hint}
            </p>
          </div>
        )}

        {/* Chế độ xem trước */}
        {config.isPreview && (
          <div className="mb-2 px-3 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-center">
            <span
              className="text-rose-500 text-[11px] font-medium"
              style={{ fontFamily: "'Lora', serif" }}
            >
              🔎 PIN:{" "}
              <span className="font-bold tracking-wider">{config.pinPreview || "2705 hoặc 2809"}</span>
            </span>
          </div>
        )}

        {/* Bàn phím số: kích thước chuẩn vừa tay, thanh lịch */}
        <div className="w-full max-w-[275px] sm:max-w-[290px] md:max-w-[310px] bg-white/85 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-lg p-3 sm:p-4 md:p-4.5 flex flex-col items-center border border-white/70">
          {/* 4 chấm PIN */}
          <div className={`flex gap-3.5 md:gap-4 mb-3 md:mb-3.5 ${isWrong ? "animate-shake" : ""}`}>
            {[0, 1, 2, 3].map(idx => (
              <div
                key={idx}
                className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border-2 transition-all duration-200 ${
                  idx < pinInput.length
                    ? "bg-rose-400 border-rose-400 scale-125 shadow-md shadow-rose-200"
                    : "bg-transparent border-pink-300"
                }`}
              />
            ))}
          </div>

          {/* Bàn phím số */}
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5 md:gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button
                key={num}
                onClick={() => handleDigit(String(num))}
                className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-pink-50/90 hover:bg-pink-200 active:bg-pink-300 active:scale-95 text-lg sm:text-xl font-bold text-gray-700 transition-all cursor-pointer shadow-sm flex items-center justify-center"
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleBackspace}
              className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-transparent hover:bg-pink-100 active:scale-95 text-lg md:text-xl text-gray-400 transition-all flex items-center justify-center cursor-pointer"
            >
              ←
            </button>
            <button
              onClick={() => handleDigit("0")}
              className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-pink-50/90 hover:bg-pink-200 active:bg-pink-300 active:scale-95 text-lg sm:text-xl font-bold text-gray-700 transition-all cursor-pointer shadow-sm flex items-center justify-center"
            >
              0
            </button>
            <button
              onClick={handleClear}
              className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-transparent hover:bg-red-50 hover:text-red-400 active:scale-95 text-xs md:text-sm text-gray-400 transition-all flex items-center justify-center cursor-pointer font-medium"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Xoá
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
