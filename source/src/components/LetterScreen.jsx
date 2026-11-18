import React, { useState } from 'react';
import FloatingHearts from './FloatingHearts';
import RomanticDecoration from './RomanticDecoration';

export default function LetterScreen({ config, onPlayVideo, onPauseVideo }) {
  const [videoSrc, setVideoSrc] = useState(
    config.videoSrc || "./TAM_SU_BAN_GAI_MUSIC_VIDEO.mp4"
  );
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (e) => {
    setIsPlaying(true);
    onPlayVideo?.(e);
  };

  const handlePause = (e) => {
    setIsPlaying(false);
    onPauseVideo?.(e);
  };

  const handleVideoError = () => {
    if (videoSrc !== "./video.mp4") {
      setVideoSrc("./video.mp4");
    } else {
      setVideoError(true);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-pink-200 via-pink-100 to-rose-200 relative overflow-hidden flex flex-col items-center justify-center px-4 py-6 md:py-8 select-none safe-area">
      {/* Mưa trái tim bay */}
      <FloatingHearts />

      {/* Dây hoa hồng leo, Đèn đom đóm Fairy Lights, Cupid bay & Cặp Pet thông minh phản ứng theo video */}
      <RomanticDecoration isPlaying={isPlaying} />

      {/* Khung nội dung chính */}
      <div className="relative z-10 w-full max-w-[360px] sm:max-w-lg md:max-w-2xl flex flex-col items-center animate-fade-in">
        {/* Tiêu đề chính */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-600 mb-1 md:mb-1.5 text-center drop-shadow-sm leading-tight"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          {config.letterTitle || "Gửi mắm thúiiiii"}
        </h1>

        {/* Tiêu đề phụ */}
        <p
          className="text-pink-400 text-xs sm:text-sm md:text-base mb-3 md:mb-4 italic text-center"
          style={{ fontFamily: "'Lora', serif" }}
        >
          {config.dedicatedTo || "~luôn vui vẻ nhó~"}
        </p>

        {/* Trái tim trang trí */}
        <div className="flex items-center gap-3 mb-3 md:mb-4">
          <div className="h-px w-10 sm:w-16 md:w-20 bg-pink-300" />
          <span className="text-pink-400 text-base md:text-lg animate-pulse">❤️</span>
          <div className="h-px w-10 sm:w-16 md:w-20 bg-pink-300" />
        </div>

        {/* Khung phát Video */}
        <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-xl p-3 sm:p-4 md:p-5 border border-white/80">
          {!videoError ? (
            <div className="flex flex-col items-center">
              <video
                controls
                playsInline
                preload="auto"
                className="w-full rounded-xl md:rounded-2xl shadow-md overflow-hidden bg-black aspect-video object-cover"
                src={videoSrc}
                onPlay={handlePlay}
                onPause={handlePause}
                onEnded={handlePause}
                onError={handleVideoError}
              >
                Trình duyệt của bạn không hỗ trợ thẻ video.
              </video>

              {/* Dòng chữ dưới video */}
              <div className="mt-3 md:mt-3.5 flex items-center justify-center w-full px-2 text-center">
                <p
                  className="text-sm sm:text-base md:text-xl text-rose-500 font-bold tracking-wide"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  Tiến Thương with love, Trúc Ly ❤️
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 md:p-8 border-2 border-dashed border-rose-300 rounded-xl md:rounded-2xl bg-rose-50/50 text-center">
              <span className="text-4xl sm:text-5xl mb-2 animate-bounce">🎬</span>
              <h3
                className="text-lg md:text-xl font-bold text-rose-600 mb-1"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Tiến Thương with love, Trúc Ly ❤️
              </h3>
              <p
                className="text-gray-600 text-xs md:text-sm mb-3 leading-relaxed max-w-sm"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Vui lòng kiểm tra file video trong thư mục web!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
