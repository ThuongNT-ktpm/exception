import React, { useState, useEffect } from 'react';

// Dây đèn đom đóm Fairy Lights với nhịp chớp lấp lánh
const FAIRY_LIGHTS_LEFT = [
  { top: '8%', left: '18px', delay: '0s', color: '#fef08a' },
  { top: '19%', left: '32px', delay: '0.6s', color: '#fed7aa' },
  { top: '31%', left: '22px', delay: '1.2s', color: '#fef08a' },
  { top: '44%', left: '38px', delay: '0.4s', color: '#fbcfe8' },
  { top: '56%', left: '24px', delay: '1.5s', color: '#fef08a' },
  { top: '68%', left: '42px', delay: '0.8s', color: '#fed7aa' },
  { top: '80%', left: '28px', delay: '1.1s', color: '#fef08a' },
  { top: '91%', left: '36px', delay: '0.3s', color: '#fbcfe8' },
];

const FAIRY_LIGHTS_RIGHT = [
  { top: '8%', right: '18px', delay: '0.4s', color: '#fef08a' },
  { top: '19%', right: '35px', delay: '1.0s', color: '#fbcfe8' },
  { top: '31%', right: '24px', delay: '0.2s', color: '#fed7aa' },
  { top: '44%', right: '40px', delay: '1.4s', color: '#fef08a' },
  { top: '56%', right: '26px', delay: '0.7s', color: '#fed7aa' },
  { top: '68%', right: '42px', delay: '1.3s', color: '#fef08a' },
  { top: '80%', right: '28px', delay: '0.5s', color: '#fbcfe8' },
  { top: '91%', right: '36px', delay: '1.6s', color: '#fef08a' },
];

const LEFT_PET_QUOTES_PLAYING = [
  "Đang xem cùng nè, cuốn qué 🍿",
  "Bắp rang bơ ngon nhức nách 🍿",
  "Đoạn này ngọt ngào sâu răng 🍭",
  "Trúc Ly xinh nhất trần đời 🥇",
  "Xem chăm chú dữ dằn ta 🤭",
  "1000 điểm cho Tiến Thương & Trúc Ly 💯",
  "Bấm nữa đi tui thích bắn tim 🥰"
];

const LEFT_PET_QUOTES_PAUSED = [
  "Ủa sao bấm dừng òi? Đang hay mà 🥺",
  "Bật tiếp đuy mừ, đang cuốn quá 🍿",
  "Dừng lại để ngắm Trúc Ly đúng hem 👀",
  "Bấm play tiếp đuy, tui chờ nãy giờ 🥺"
];

const RIGHT_PET_QUOTES_PLAYING = [
  "Cute xỉu lên xỉu xuống á 🥰",
  "Cặp đôi vàng trong làng phát cơm chó 🐶",
  "Bắn tim pằng pằng nè 💘",
  "Xem xong là phải yêu nhau nhiều hơn nhó 💍",
  "Thả triệu tim cho hai bạn ✨",
  "Đoạn này lãng mạn qué đuy 🌹",
  "Tiến Thương 💖 Trúc Ly mãi đỉnh ✨"
];

const RIGHT_PET_QUOTES_PAUSED = [
  "Ơ kìa, ai tắt vậy ta? 👀",
  "Đang xem đoạn tình cảm mà dừng 🥺",
  "Chắc dừng để ôm nhau một cái đúng hơm 😘",
  "Bật lên đi mà, năn nỉ á 🥺"
];

export default function RomanticDecoration({ isPlaying = false }) {
  // Trạng thái câu thoại
  const [leftQuoteIndex, setLeftQuoteIndex] = useState(0);
  const [rightQuoteIndex, setRightQuoteIndex] = useState(0);

  // Hiệu ứng pháo hoa tim khi click
  const [leftBursts, setLeftBursts] = useState([]);
  const [rightBursts, setRightBursts] = useState([]);

  // Bộ đếm tim vui nhộn
  const [loveCount, setLoveCount] = useState(0);

  // Tự động đổi câu thoại thỉnh thoảng
  useEffect(() => {
    const timer = setInterval(() => {
      setLeftQuoteIndex(prev => (prev + 1) % LEFT_PET_QUOTES_PLAYING.length);
      setRightQuoteIndex(prev => (prev + 1) % RIGHT_PET_QUOTES_PLAYING.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const triggerLeftPet = () => {
    setLoveCount(c => c + 1);
    setLeftQuoteIndex(prev => (prev + 1) % (isPlaying ? LEFT_PET_QUOTES_PLAYING.length : LEFT_PET_QUOTES_PAUSED.length));
    const burst = {
      id: Date.now(),
      emojis: ['💖', '🍿', '✨', '💕', '🥰', '🌸']
    };
    setLeftBursts(prev => [...prev.slice(-4), burst]);
    setTimeout(() => {
      setLeftBursts(prev => prev.filter(b => b.id !== burst.id));
    }, 1200);
  };

  const triggerRightPet = () => {
    setLoveCount(c => c + 1);
    setRightQuoteIndex(prev => (prev + 1) % (isPlaying ? RIGHT_PET_QUOTES_PLAYING.length : RIGHT_PET_QUOTES_PAUSED.length));
    const burst = {
      id: Date.now(),
      emojis: ['💘', '💍', '🌹', '✨', '💖', '🎉']
    };
    setRightBursts(prev => [...prev.slice(-4), burst]);
    setTimeout(() => {
      setRightBursts(prev => prev.filter(b => b.id !== burst.id));
    }, 1200);
  };

  const leftQuote = isPlaying
    ? LEFT_PET_QUOTES_PLAYING[leftQuoteIndex % LEFT_PET_QUOTES_PLAYING.length]
    : LEFT_PET_QUOTES_PAUSED[leftQuoteIndex % LEFT_PET_QUOTES_PAUSED.length];

  const rightQuote = isPlaying
    ? RIGHT_PET_QUOTES_PLAYING[rightQuoteIndex % RIGHT_PET_QUOTES_PLAYING.length]
    : RIGHT_PET_QUOTES_PAUSED[rightQuoteIndex % RIGHT_PET_QUOTES_PAUSED.length];

  return (
    <div className="hidden lg:block pointer-events-none">
      {/* ================= THIÊN THẦN CUPID BAY GÓC TRÊN ================= */}
      <div className="absolute top-4 right-16 xl:right-28 z-30 pointer-events-auto cupid-fly select-none cursor-pointer" title="Tiến Thương ❤️ Trúc Ly">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-rose-200 shadow-md transition-transform hover:scale-110">
          <span className="text-xl animate-bounce">🕊️</span>
          <span
            className="text-xs font-bold text-rose-500 tracking-wider whitespace-nowrap"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Tiến Thương 💖 Trúc Ly
          </span>
          <span className="text-sm animate-pulse">✨</span>
        </div>
      </div>

      {/* ================= BỘ ĐẾM TIM VUI NHỘN Ở GÓC TRÊN TRÁI ================= */}
      {loveCount > 0 && (
        <div className="absolute top-4 left-16 xl:left-28 z-30 pointer-events-none select-none animate-fade-in">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/90 text-white shadow-md text-xs font-semibold">
            <span>❤️</span>
            <span>x{loveCount} siêu ngọt ngào!</span>
          </div>
        </div>
      )}

      {/* ================= DÂY HOA HỒNG & ĐÈN ĐOM ĐÓM BÊN TRÁI ================= */}
      <div className="absolute top-0 left-0 h-full w-28 xl:w-36 overflow-hidden z-20">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-85"
          viewBox="0 0 120 800"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M 20 0 Q 45 150, 25 300 T 40 550 T 25 800"
            stroke="#fda4af"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 20 0 Q 35 150, 18 300 T 32 550 T 20 800"
            stroke="#f472b6"
            strokeWidth="2"
            strokeDasharray="4 6"
          />
          <ellipse cx="38" cy="120" rx="9" ry="5" transform="rotate(-30 38 120)" fill="#86efac" opacity="0.8" />
          <ellipse cx="18" cy="220" rx="9" ry="5" transform="rotate(35 18 220)" fill="#86efac" opacity="0.8" />
          <ellipse cx="42" cy="360" rx="10" ry="5" transform="rotate(-25 42 360)" fill="#86efac" opacity="0.8" />
          <ellipse cx="20" cy="480" rx="9" ry="5" transform="rotate(40 20 480)" fill="#86efac" opacity="0.8" />
          <ellipse cx="38" cy="620" rx="10" ry="5" transform="rotate(-30 38 620)" fill="#86efac" opacity="0.8" />
        </svg>

        <div className="absolute top-[6%] left-6 text-xl animate-pulse">🌸</div>
        <div className="absolute top-[22%] left-3 text-2xl animate-pulse" style={{ animationDelay: '1s' }}>🌹</div>
        <div className="absolute top-[38%] left-7 text-xl animate-pulse" style={{ animationDelay: '0.5s' }}>🌸</div>
        <div className="absolute top-[56%] left-4 text-2xl animate-pulse" style={{ animationDelay: '1.2s' }}>🌹</div>
        <div className="absolute top-[72%] left-6 text-xl animate-pulse" style={{ animationDelay: '0.8s' }}>🌸</div>

        {FAIRY_LIGHTS_LEFT.map((light, i) => (
          <div
            key={i}
            className="fairy-light"
            style={{
              top: light.top,
              left: light.left,
              animationDelay: light.delay,
              backgroundColor: light.color,
              boxShadow: `0 0 14px 4px ${light.color}, 0 0 4px #ffffff`,
            }}
          />
        ))}
      </div>

      {/* ================= DÂY HOA HỒNG & ĐÈN ĐOM ĐÓM BÊN PHẢI ================= */}
      <div className="absolute top-0 right-0 h-full w-28 xl:w-36 overflow-hidden z-20">
        <svg
          className="absolute top-0 right-0 w-full h-full opacity-85"
          viewBox="0 0 120 800"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M 100 0 Q 75 150, 95 300 T 80 550 T 95 800"
            stroke="#fda4af"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 100 0 Q 85 150, 102 300 T 88 550 T 100 800"
            stroke="#f472b6"
            strokeWidth="2"
            strokeDasharray="4 6"
          />
          <ellipse cx="82" cy="110" rx="9" ry="5" transform="rotate(30 82 110)" fill="#86efac" opacity="0.8" />
          <ellipse cx="102" cy="230" rx="9" ry="5" transform="rotate(-35 102 230)" fill="#86efac" opacity="0.8" />
          <ellipse cx="78" cy="350" rx="10" ry="5" transform="rotate(25 78 350)" fill="#86efac" opacity="0.8" />
          <ellipse cx="100" cy="490" rx="9" ry="5" transform="rotate(-40 100 490)" fill="#86efac" opacity="0.8" />
          <ellipse cx="82" cy="630" rx="10" ry="5" transform="rotate(30 82 630)" fill="#86efac" opacity="0.8" />
        </svg>

        <div className="absolute top-[9%] right-6 text-xl animate-pulse" style={{ animationDelay: '0.4s' }}>🌸</div>
        <div className="absolute top-[25%] right-3 text-2xl animate-pulse" style={{ animationDelay: '1.4s' }}>🌹</div>
        <div className="absolute top-[41%] right-7 text-xl animate-pulse" style={{ animationDelay: '0.7s' }}>🌸</div>
        <div className="absolute top-[59%] right-4 text-2xl animate-pulse" style={{ animationDelay: '1.1s' }}>🌹</div>
        <div className="absolute top-[75%] right-6 text-xl animate-pulse" style={{ animationDelay: '0.2s' }}>🌸</div>

        {FAIRY_LIGHTS_RIGHT.map((light, i) => (
          <div
            key={i}
            className="fairy-light"
            style={{
              top: light.top,
              right: light.right,
              animationDelay: light.delay,
              backgroundColor: light.color,
              boxShadow: `0 0 14px 4px ${light.color}, 0 0 4px #ffffff`,
            }}
          />
        ))}
      </div>

      {/* ================= PET BÊN TRÁI: GẤU ĂN BẮP RANG BƠ ================= */}
      <div
        className="absolute left-6 xl:left-14 bottom-8 xl:bottom-12 z-30 pointer-events-auto flex flex-col items-center cursor-pointer select-none group"
        onClick={triggerLeftPet}
        title="Bấm vào tui để chọc nè!"
      >
        {/* Bong bóng thoại đổi câu linh hoạt */}
        <div className="mb-2 px-3 py-1.5 max-w-[170px] rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-pink-200 text-center transition-all duration-300 group-hover:scale-105 animate-bounce">
          <span
            className="text-xs xl:text-sm font-bold text-rose-500 leading-snug block"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {leftQuote}
          </span>
          <div className="w-2 h-2 bg-white/95 rotate-45 border-r border-b border-pink-200 mx-auto -mb-2 mt-0.5" />
        </div>

        {/* Chú gấu chibi với hiệu ứng tương tác */}
        <div className="relative pet-float transition-transform duration-300 group-hover:scale-125 group-active:scale-95">
          <img
            src="./bear1.gif"
            alt="Pet Gấu"
            className="h-20 xl:h-24 w-auto object-contain drop-shadow-lg"
          />
          {/* Mây hồng */}
          <div className="w-16 h-3 bg-pink-300/40 rounded-full blur-[2px] mx-auto -mt-1" />
        </div>

        {/* Chùm pháo hoa tim bắn tung tóe khi click */}
        {leftBursts.map(burst => (
          <div key={burst.id} className="absolute -top-6 inset-x-0 flex justify-center pointer-events-none">
            {burst.emojis.map((emoji, idx) => (
              <span
                key={idx}
                className="heart-sparkle"
                style={{
                  '--tx': `${(idx - 2.5) * 26}px`,
                  '--ty': `${-35 - (idx % 3) * 20}px`,
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* ================= PET BÊN PHẢI: MÈO TRẮNG THẢ TIM ================= */}
      <div
        className="absolute right-6 xl:right-14 bottom-8 xl:bottom-12 z-30 pointer-events-auto flex flex-col items-center cursor-pointer select-none group"
        onClick={triggerRightPet}
        title="Bấm vào tui để nhận tim nè!"
      >
        {/* Bong bóng thoại */}
        <div className="mb-2 px-3 py-1.5 max-w-[170px] rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-pink-200 text-center transition-all duration-300 group-hover:scale-105 animate-bounce" style={{ animationDelay: '0.4s' }}>
          <span
            className="text-xs xl:text-sm font-bold text-rose-500 leading-snug block"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {rightQuote}
          </span>
          <div className="w-2 h-2 bg-white/95 rotate-45 border-r border-b border-pink-200 mx-auto -mb-2 mt-0.5" />
        </div>

        {/* Chú mèo chibi ăn mừng */}
        <div className="relative pet-float-reverse transition-transform duration-300 group-hover:scale-125 group-active:scale-95">
          <img
            src="./bear3.gif"
            alt="Pet Mèo"
            className="h-20 xl:h-24 w-auto object-contain drop-shadow-lg"
          />
          <div className="w-16 h-3 bg-pink-300/40 rounded-full blur-[2px] mx-auto -mt-1" />
        </div>

        {/* Chùm tim bung tỏa khi click */}
        {rightBursts.map(burst => (
          <div key={burst.id} className="absolute -top-6 inset-x-0 flex justify-center pointer-events-none">
            {burst.emojis.map((emoji, idx) => (
              <span
                key={idx}
                className="heart-sparkle"
                style={{
                  '--tx': `${(idx - 2.5) * 26}px`,
                  '--ty': `${-35 - (idx % 3) * 20}px`,
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
