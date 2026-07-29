import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, Diamond, Gem, Heart } from 'lucide-react';

interface ScrollTextBannerProps {
  speed?: number;
  reverse?: boolean;
}

export const ScrollTextBanner: React.FC<ScrollTextBannerProps> = ({
  speed = 1,
  reverse = false,
}) => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      
      setScrollOffset((prev) => prev + delta * (reverse ? -0.4 : 0.4) * speed);
      setIsScrolling(true);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [speed, reverse]);

  const items = [
    { text: "18K ROSE GOLD VERMEIL", icon: Sparkles },
    { text: "HAND-SET SWAROVSKI CRYSTALS", icon: Diamond },
    { text: "ETHICALLY SOURCED DIAMONDS", icon: Gem },
    { text: "FREE LUXURY GIFT WRAPPING", icon: Heart },
    { text: "SUSTAINABLE FINE JEWELRY", icon: Sparkles },
    { text: "ATELIER CRAFTSMANSHIP", icon: Diamond },
  ];

  // Repeat items for seamless continuous ticker
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#FFF0F5] via-[#FDEEF3] to-[#FFF8FA] py-5 border-y border-[rgba(233,170,194,0.3)] select-none">
      
      {/* Decorative subtle ambient pink glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-24 bg-[#FF6FA7]/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-24 bg-[#E89AB5]/15 rounded-full blur-2xl pointer-events-none" />

      {/* Kinetic Interactive Marquee Container */}
      <div
        className="flex whitespace-nowrap will-change-transform transition-transform duration-75 ease-out"
        style={{
          transform: `translateX(${(reverse ? 1 : -1) * (scrollOffset % 1200)}px)`,
        }}
      >
        <div className={`flex items-center space-x-10 sm:space-x-16 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} ${isScrolling ? '[animation-play-state:paused]' : ''}`}>
          {marqueeItems.map((item, idx) => {
            const Icon = item.icon;
            const isHighlighted = idx % 2 === 0;
            return (
              <div key={idx} className="flex items-center space-x-4 sm:space-x-6 group">
                <span
                  className={`font-serif text-2xl sm:text-3xl lg:text-4xl tracking-[0.18em] uppercase transition-colors duration-300 ${
                    isHighlighted
                      ? 'font-normal text-[#1E1E1E] drop-shadow-xs'
                      : 'font-light text-transparent bg-clip-text bg-gradient-to-r from-[#C98A9F] to-[#FF6FA7] style-outline-text'
                  }`}
                >
                  {item.text}
                </span>
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6FA7] opacity-80 group-hover:scale-125 group-hover:rotate-45 transition-transform duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
