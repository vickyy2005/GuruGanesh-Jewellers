import React, { useState, useEffect } from 'react';
import { HERO_IMAGE } from '../data';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onOpenStackBuilder?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onOpenStackBuilder }) => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      if (window.scrollY < 900) {
        setScrollY(window.scrollY);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 30,
        y: (e.clientY / innerHeight - 0.5) * 30,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const headline = "ELEVATE EVERY MOMENT.";
  const letters = headline.split("");

  const words = [
    { word: "ELEVATE", chars: "ELEVATE".split("") },
    { word: "EVERY", chars: "EVERY".split("") },
    { word: "MOMENT.", chars: "MOMENT.".split("") },
  ];

  let charGlobalCounter = 0;

  return (
    <section className="relative w-full min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex items-center justify-start overflow-hidden bg-[#FFF8FA] border-b border-[rgba(233,170,194,0.2)] select-none">
      
      {/* 1. Full-Width Background Image with Ken Burns & Mouse Parallax */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="GLOW & CO. Luxury Rose Gold Fine Jewelry"
          className={`w-full h-full object-cover object-[65%_center] sm:object-center transition-all duration-1000 ease-out will-change-transform ${
            isLoaded ? 'opacity-100 animate-[heroBgZoom_3.5s_cubic-bezier(0.16,1,0.3,1)_forwards]' : 'opacity-0 scale-106'
          }`}
          style={{
            transform: `translate3d(${mousePos.x * 0.4}px, ${scrollY * 0.18 + mousePos.y * 0.4}px, 0) scale(${1 + (900 - scrollY) * 0.00004})`,
            transition: 'transform 0.15s ease-out, opacity 1.2s ease-out',
          }}
          referrerPolicy="no-referrer"
        />

        {/* 2. Floating Pink Particle Lights */}
        <div className="floating-particle w-48 h-48 top-12 left-1/4 pointer-events-none" style={{ animationDelay: '0s' }} />
        <div className="floating-particle w-64 h-64 bottom-20 left-10 pointer-events-none" style={{ animationDelay: '2s' }} />
        <div className="floating-particle w-40 h-40 top-1/3 right-1/4 pointer-events-none" style={{ animationDelay: '4s' }} />

        {/* 3. Soft Warm Pink Gradient Overlay for Pristine Readability */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, 
              rgba(255, 248, 250, 0.97) 0%, 
              rgba(255, 248, 250, 0.90) 35%, 
              rgba(255, 248, 250, 0.60) 65%, 
              rgba(255, 248, 250, 0.15) 100%)`,
            opacity: Math.min(1, 0.95 + scrollY * 0.0005),
          }}
        />

        {/* Soft Ambient Rose Gold Glow */}
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#FDEEF3]/60 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 4. Luxury Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-14 sm:py-20 lg:py-24">
        <div className="max-w-xl lg:max-w-3xl">
          
          {/* Subtitle Badge */}
          <div
            className={`inline-flex items-center space-x-2 bg-[#FDEEF3]/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-[rgba(233,170,194,0.4)] text-[11px] font-bold tracking-[0.25em] text-[#FF6FA7] uppercase mb-6 transition-all duration-700 shadow-2xs ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E89AB5] animate-spin" style={{ animationDuration: '8s' }} />
            <span>SWAROVSKI &amp; ROSE GOLD FINE JEWELRY</span>
          </div>

          {/* Single-Line Fluid Headline with Intact Words */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal text-[#1E1E1E] tracking-tight leading-[1.08] uppercase mb-6 flex flex-wrap gap-x-3 sm:gap-x-4 whitespace-nowrap">
            {words.map((wObj, wIdx) => (
              <span key={wIdx} className="inline-block whitespace-nowrap">
                {wObj.chars.map((char) => {
                  charGlobalCounter += 1;
                  const delayMs = 200 + charGlobalCounter * 35;
                  return (
                    <span key={charGlobalCounter} className="inline-block overflow-hidden py-1">
                      <span
                        className="inline-block will-change-transform"
                        style={{
                          animation: isLoaded ? `letterReveal 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.25) ${delayMs}ms forwards` : 'none',
                          opacity: isLoaded ? undefined : 0,
                        }}
                      >
                        {char}
                      </span>
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          {/* Description Animation */}
          <p
            className="text-[#666666] text-base sm:text-lg lg:text-xl font-sans font-light tracking-wide leading-relaxed mb-10 max-w-lg"
            style={{
              animation: isLoaded ? `heroDescReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${200 + letters.length * 40 + 200}ms forwards` : 'none',
              opacity: isLoaded ? undefined : 0,
            }}
          >
            Timeless 18k Rose Gold Vermeil &amp; sparkling gem creations designed to embrace your inner romantic.
          </p>

          {/* Luxury Pink CTA Button */}
          <div
            style={{
              animation: isLoaded ? `heroCtaReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${200 + letters.length * 40 + 400}ms forwards` : 'none',
              opacity: isLoaded ? undefined : 0,
            }}
          >
            <button
              onClick={onExplore}
              className="btn-pink-luxury text-white text-[12px] sm:text-[13px] font-bold tracking-[0.24em] uppercase px-9 py-4 sm:py-4.5 rounded-full shadow-lg flex items-center space-x-3 group"
            >
              <span>DISCOVER BOUTIQUE</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>

        </div>
      </div>

      {/* Continuous Bouncing Scroll Indicator */}
      <div
        onClick={onExplore}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
      >
        <span className="text-[10px] tracking-[0.25em] text-[#C98A9F] font-bold uppercase mb-1">SCROLL</span>
        <ChevronDown className="w-4 h-4 text-[#FF6FA7] animate-bounce" />
      </div>

    </section>
  );
};
