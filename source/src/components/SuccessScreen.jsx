import React from 'react';

export default function SuccessScreen({ config, onContinue }) {
  return (
    <div className="min-h-[100dvh] h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col items-center justify-center bg-white px-4 md:px-6 animate-fade-in select-none safe-area">
      {/* Gấu: kích thước cân đối */}
      <img
        src={config.bearSuccessGif}
        alt="happy cat / bear"
        className="h-[140px] sm:h-[165px] md:h-[195px] mb-3 md:mb-4 object-contain drop-shadow-sm"
      />
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2 md:mb-3 text-center leading-tight"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        Yeyyyy! Đúng rồi!
      </h2>
      <p
        className="text-pink-500 text-base sm:text-lg md:text-xl mb-6 md:mb-8 italic text-center font-medium"
        style={{ fontFamily: "'Lora', serif" }}
      >
        {config.successText}
      </p>
      <button
        onClick={onContinue}
        className="text-gray-600 text-base sm:text-lg md:text-xl underline underline-offset-8 hover:text-pink-500 active:scale-95 transition-all cursor-pointer py-1.5 px-4"
        style={{ fontFamily: "'Lora', serif" }}
      >
        Tiếp tục
      </button>
    </div>
  );
}
