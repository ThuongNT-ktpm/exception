import React, { useState } from 'react';

export default function QuestionScreen({ config, onAccept }) {
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState(null);

  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
  // Độ lớn nút Tiến Thương: vừa vặn, không bị phóng quá to
  const yesBtnSize = isDesktop
    ? Math.min(noCount * 8 + 20, 52)
    : Math.min(noCount * 6 + 18, 42);

  const handleNoClick = () => {
    setNoCount(prev => prev + 1);

    // Vùng đệm an toàn
    const btnW = isDesktop ? 150 : 125;
    const btnH = isDesktop ? 55 : 48;
    const padX = isDesktop ? 30 : 20;
    const padTop = isDesktop ? 50 : 80;
    const padBottom = isDesktop ? 45 : 60;

    const maxX = Math.max(padX, window.innerWidth - btnW - padX);
    const maxY = Math.max(padTop, window.innerHeight - btnH - padBottom);

    const x = Math.floor(Math.random() * (maxX - padX)) + padX;
    const y = Math.floor(Math.random() * (maxY - padTop)) + padTop;
    setNoPos({ x, y });
  };

  const noText = noCount === 0
    ? (config.noText || "Trúc Ly")
    : (config.noPhrases && config.noPhrases[Math.min(noCount, config.noPhrases.length - 1)]) || "Trúc Ly";

  const yesText = config.yesText || "Tiến Thương";

  return (
    <div className="min-h-[100dvh] h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col items-center justify-center px-4 md:px-6 select-none safe-area">
      {/* Gấu cute - Vừa vặn trên laptop và mobile */}
      <img
        className="h-[140px] sm:h-[165px] md:h-[195px] object-contain drop-shadow-sm mb-2 md:mb-3"
        src={config.bearRoseGif}
        alt="Cute bear with roses"
      />

      {/* Câu hỏi - Kích thước cân đối, dễ nhìn */}
      <h1
        className="my-3 md:my-4 text-2xl sm:text-3xl md:text-4xl text-center text-gray-800 max-w-sm sm:max-w-md md:max-w-2xl leading-snug px-2"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        {config.question}
      </h1>

      {/* Nút bấm */}
      <div
        className="flex items-center gap-3 sm:gap-5 md:gap-6 mt-2 md:mt-4"
        style={{ fontFamily: "'Lora', serif" }}
      >
        <button
          className="rounded-2xl bg-green-500 px-6 py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-3.5 font-bold text-white hover:bg-green-600 active:scale-95 transition-all cursor-pointer shadow-md whitespace-nowrap"
          style={{ fontSize: `${yesBtnSize}px` }}
          onClick={onAccept}
        >
          {yesText}
        </button>
        <button
          onClick={handleNoClick}
          className="rounded-2xl bg-red-500 px-6 py-2.5 sm:px-7 sm:py-3 md:px-8 md:py-3.5 font-bold text-white hover:bg-red-600 active:scale-95 transition-all duration-150 cursor-pointer shadow-md whitespace-nowrap text-base sm:text-lg md:text-xl"
          style={noPos ? { position: "fixed", left: `${noPos.x}px`, top: `${noPos.y}px`, zIndex: 50 } : {}}
        >
          {noText}
        </button>
      </div>
    </div>
  );
}
