import React, { useEffect, useState } from 'react';
import { Sparkles, Crown, Gem } from 'lucide-react';
import { GuruGaneshLogo } from './GuruGaneshLogo';

interface LuxuryPreloaderProps {
  onComplete: () => void;
}

export const LuxuryPreloader: React.FC<LuxuryPreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingPhraseIndex, setLoadingPhraseIndex] = useState(0);

  const luxuryPhrases = [
    'Sourcing 100% Recycled 925 Sterling Silver...',
    'Submerging in 2.5-Micron 18k Rose Gold Baths...',
    'Hand-Setting Micro-Pavé Swarovski Crystals...',
    'BIS Hallmark Certified Purity Inspection...',
    'Welcome to The House of GURU GANESH.',
  ];

  useEffect(() => {
    // Deliberate 3.6 second luxury loading sequence
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setFadeOut(true), 400);
          setTimeout(() => onComplete(), 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 36);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Phrase rotation based on progress
  useEffect(() => {
    if (progress < 25) setLoadingPhraseIndex(0);
    else if (progress < 50) setLoadingPhraseIndex(1);
    else if (progress < 75) setLoadingPhraseIndex(2);
    else if (progress < 95) setLoadingPhraseIndex(3);
    else setLoadingPhraseIndex(4);
  }, [progress]);

  const brandLetters = ['G', 'U', 'R', 'U', ' ', 'G', 'A', 'N', 'E', 'S', 'H'];

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#FFF0F5] flex flex-col items-center justify-center select-none transition-all duration-1000 ${
        fadeOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Soft Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6FA7]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-lg px-6">
        
        {/* Pulsing Gemstone Icon with Orbiting Rings */}
        <div className="relative flex items-center justify-center w-28 h-28">
          <div className="absolute inset-0 rounded-full border border-[#FF6FA7]/30 animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border border-dashed border-[#E89AB5]/50 animate-[spin_15s_linear_infinite_reverse]" />
          <div className="p-4 bg-white rounded-full border border-[rgba(233,170,194,0.4)] luxury-card-shadow transform transition-transform duration-500 scale-110">
            <GuruGaneshLogo size={56} showText={false} />
          </div>
        </div>

        {/* Sequential Letter Shimmer Brand Name */}
        <div className="space-y-3">
          <div className="flex justify-center space-x-1 sm:space-x-2">
            {brandLetters.map((char, idx) => {
              const activeCount = Math.floor((progress / 100) * brandLetters.length);
              const isLit = idx <= activeCount;
              return (
                <span
                  key={idx}
                  className={`font-serif text-3xl sm:text-5xl font-normal uppercase transition-all duration-300 ${
                    char === ' ' ? 'w-3 sm:w-5' : ''
                  } ${
                    isLit
                      ? 'text-[#1E1E1E] scale-105 shadow-xs'
                      : 'text-[#E89AB5]/40 opacity-40'
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </div>

          <p className="text-[10px] tracking-[0.4em] font-bold text-[#FF6FA7] uppercase">
            FINE HANDCRAFTED 18K VERMEIL
          </p>
        </div>

        {/* Dynamic Craftsmanship Phrase & Progress Bar */}
        <div className="w-64 space-y-3 pt-2">
          <div className="text-[11px] font-medium text-[#666666] h-5 transition-all duration-300 italic font-serif">
            "{luxuryPhrases[loadingPhraseIndex]}"
          </div>

          {/* Thin Gold Progress Bar */}
          <div className="w-full bg-[#FDEEF3] h-1.5 rounded-full overflow-hidden border border-[rgba(233,170,194,0.3)]">
            <div
              className="bg-gradient-to-r from-[#E89AB5] via-[#FF6FA7] to-[#C98A9F] h-full rounded-full transition-all duration-100 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-bold text-[#C98A9F] tracking-widest uppercase">
            <span>BKC ATELIER</span>
            <span>{Math.min(progress, 100)}%</span>
          </div>
        </div>

      </div>

      {/* Footer Hallmark Seal */}
      <div className="absolute bottom-8 text-[10px] tracking-[0.3em] text-[#999999] uppercase font-semibold flex items-center space-x-2">
        <Sparkles className="w-3 h-3 text-[#FF6FA7]" />
        <span>BIS HALLMARK CERTIFIED 18K VERMEIL</span>
      </div>

    </div>
  );
};
