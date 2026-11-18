import React from 'react';

export default function SuccessScreen({ config, onContinue }) {
  return (
    <div className="min-h-[100dvh] h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col items-center justify-center bg-white px-4 animate-fade-in select-none">
      <img
        src={config.bearSuccessGif}
        alt="happy cat / bear"
        className="h-[140px] sm:h-[180px] mb-4 object-contain"
      />
      <h2
        className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2 text-center"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        Yeyyyy! Đúng rồi!
      </h2>
      <p
        className="text-pink-500 text-base sm:text-lg mb-6 italic text-center"
        style={{ fontFamily: "'Lora', serif" }}
      >
        {config.successText}
      </p>
      <button
        onClick={onContinue}
        className="text-gray-600 text-base sm:text-lg underline underline-offset-4 hover:text-pink-500 active:scale-95 transition-all cursor-pointer py-1 px-3"
        style={{ fontFamily: "'Lora', serif" }}
      >
        Tiếp tục
      </button>
    </div>
  );
}
