import React, { useState } from 'react';

export default function QuestionScreen({ config, onAccept }) {
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState(null);

  // Giới hạn độ phóng to vừa vặn trên màn hình điện thoại
  const yesBtnSize = Math.min(noCount * 10 + 20, 50);

  const handleNoClick = () => {
    setNoCount(prev => prev + 1);
    const btnW = 120;
    const btnH = 45;
    const pad = 16;
    const maxX = Math.max(pad, window.innerWidth - btnW - pad);
    const maxY = Math.max(pad + 40, window.innerHeight - btnH - pad);
    const x = Math.floor(Math.random() * (maxX - pad)) + pad;
    const y = Math.floor(Math.random() * (maxY - (pad + 40))) + pad + 40;
    setNoPos({ x, y });
  };

  const noText = noCount === 0
    ? (config.noText || "Trúc Ly")
    : (config.noPhrases && config.noPhrases[Math.min(noCount, config.noPhrases.length - 1)]) || "Trúc Ly";

  const yesText = config.yesText || "Tiến Thương";

  return (
    <div className="min-h-[100dvh] h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col items-center justify-center px-4 -mt-4 select-none">
      <img
        className="h-[140px] sm:h-[180px] object-contain drop-shadow-sm"
        src={config.bearRoseGif}
        alt="Cute bear with roses"
      />
      <h1
        className="my-4 text-2xl sm:text-4xl text-center text-gray-800 max-w-lg leading-snug px-2"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        {config.question}
      </h1>
      <div
        className="flex items-center gap-3 sm:gap-4 mt-2"
        style={{ fontFamily: "'Lora', serif" }}
      >
        <button
          className="rounded-xl bg-green-500 px-5 py-2 sm:px-6 sm:py-2.5 font-bold text-white hover:bg-green-600 active:scale-95 transition-all cursor-pointer shadow-md whitespace-nowrap"
          style={{ fontSize: `${yesBtnSize}px` }}
          onClick={onAccept}
        >
          {yesText}
        </button>
        <button
          onClick={handleNoClick}
          className="rounded-xl bg-red-500 px-5 py-2 sm:px-6 sm:py-2.5 font-bold text-white hover:bg-red-600 active:scale-95 transition-all duration-150 cursor-pointer shadow-md whitespace-nowrap text-base"
          style={noPos ? { position: "fixed", left: `${noPos.x}px`, top: `${noPos.y}px`, zIndex: 50 } : {}}
        >
          {noText}
        </button>
      </div>
    </div>
  );
}
