import React, { useEffect, useState } from 'react';
import { Sparkles, Crown } from 'lucide-react';

export const DualKineticText: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full py-20 bg-[#1E1E1E] text-white overflow-hidden border-y border-[rgba(233,170,194,0.25)] select-none">
      {/* Background Ambient Luxury Pink Glow */}
      <div className="absolute inset-0 bg-radial from-[#E89AB5]/15 via-transparent to-transparent pointer-events-none blur-3xl" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FF6FA7]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#C98A9F]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Center Floating Badge */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 text-xs font-bold tracking-[0.3em] text-[#E89AB5] uppercase shadow-lg">
          <Crown className="w-4 h-4 text-[#FF6FA7] animate-pulse" />
          <span>THE ART OF FINE JEWELRY</span>
        </div>
      </div>

      {/* Row 1: Left to Right Scroll Motion */}
      <div className="relative w-full overflow-hidden py-3">
        <div
          className="flex whitespace-nowrap will-change-transform transition-transform duration-100 ease-out"
          style={{
            transform: `translateX(${(-scrollY * 0.35) % 1000}px)`,
          }}
        >
          <div className="flex items-center space-x-12 sm:space-x-20 text-5xl sm:text-7xl lg:text-8xl font-serif uppercase font-light tracking-widest text-white/90">
            <span>✨ ETHICALLY CRAFTED</span>
            <span className="text-[#FF6FA7]">•</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E89AB5] to-[#FF6FA7]">18K ROSE GOLD</span>
            <span className="text-[#FF6FA7]">•</span>
            <span>SWAROVSKI CRYSTALS</span>
            <span className="text-[#FF6FA7]">•</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E89AB5] to-[#FF6FA7]">TIMELESS BEAUTY</span>
            <span className="text-[#FF6FA7]">•</span>
            <span>ETHICALLY CRAFTED</span>
            <span className="text-[#FF6FA7]">•</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E89AB5] to-[#FF6FA7]">18K ROSE GOLD</span>
          </div>
        </div>
      </div>

      {/* Row 2: Right to Left Scroll Motion */}
      <div className="relative w-full overflow-hidden py-3 mt-2">
        <div
          className="flex whitespace-nowrap will-change-transform transition-transform duration-100 ease-out"
          style={{
            transform: `translateX(${(-800 + scrollY * 0.35) % 1000}px)`,
          }}
        >
          <div className="flex items-center space-x-12 sm:space-x-20 text-5xl sm:text-7xl lg:text-8xl font-serif uppercase font-light tracking-widest text-[#E89AB5]/80">
            <span className="style-outline-text-dark">DESIGNED IN PARIS</span>
            <Sparkles className="w-8 h-8 text-[#FF6FA7]" />
            <span className="style-outline-text-dark">LUXURY ATELIER</span>
            <Sparkles className="w-8 h-8 text-[#FF6FA7]" />
            <span className="style-outline-text-dark">EXQUISITE CRAFTSMANSHIP</span>
            <Sparkles className="w-8 h-8 text-[#FF6FA7]" />
            <span className="style-outline-text-dark">DESIGNED IN PARIS</span>
            <Sparkles className="w-8 h-8 text-[#FF6FA7]" />
            <span className="style-outline-text-dark">LUXURY ATELIER</span>
          </div>
        </div>
      </div>
    </section>
  );
};
