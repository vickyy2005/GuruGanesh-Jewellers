import React, { useState, useEffect, useRef } from 'react';
import { HERO_IMAGE } from '../data';
import { ArrowRight, Sparkles, ChevronDown, Play, Pause, Volume2, VolumeX, ShieldCheck, Star, Layers } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onOpenStackBuilder?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onOpenStackBuilder }) => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // High quality royalty-free luxury jewelry video streams
  const PROMO_VIDEO_URL = "https://assets.mixkit.co/videos/preview/mixkit-diamond-ring-in-a-luxury-box-42099-large.mp4";

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
        x: (e.clientX / innerWidth - 0.5) * 25,
        y: (e.clientY / innerHeight - 0.5) * 25,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const headline = "ELEVATE EVERY MOMENT.";
  const letters = headline.split("");

  const words = [
    { word: "ELEVATE", chars: "ELEVATE".split("") },
    { word: "EVERY", chars: "EVERY".split("") },
    { word: "MOMENT.", chars: "MOMENT.".split("") },
  ];

  let charGlobalCounter = 0;

  return (
    <section className="relative w-full min-h-[520px] sm:min-h-[600px] lg:min-h-[680px] flex items-center justify-start overflow-hidden bg-[#FFF8FA] border-b border-[rgba(233,170,194,0.2)]">
      
      {/* 1. Full-Width Background Video & Parallax Image Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {!videoError ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover opacity-90 scale-105 transition-opacity duration-1000"
            style={{
              transform: `translate3d(${mousePos.x * 0.2}px, ${scrollY * 0.12 + mousePos.y * 0.2}px, 0)`,
            }}
          >
            <source src={PROMO_VIDEO_URL} type="video/mp4" />
          </video>
        ) : (
          <img
            src={HERO_IMAGE}
            alt="GLOW & CO. Luxury Rose Gold Fine Jewelry"
            className={`w-full h-full object-cover object-[65%_center] sm:object-center transition-all duration-1000 ease-out will-change-transform ${
              isLoaded ? 'opacity-100 animate-[heroBgZoom_3.5s_cubic-bezier(0.16,1,0.3,1)_forwards]' : 'opacity-0 scale-106'
            }`}
            style={{
              transform: `translate3d(${mousePos.x * 0.4}px, ${scrollY * 0.18 + mousePos.y * 0.4}px, 0) scale(${1 + (900 - scrollY) * 0.00004})`,
            }}
            referrerPolicy="no-referrer"
          />
        )}

        {/* Floating Pink Particle Light Orbs */}
        <div className="floating-particle w-48 h-48 top-12 left-1/4 pointer-events-none" style={{ animationDelay: '0s' }} />
        <div className="floating-particle w-64 h-64 bottom-20 left-10 pointer-events-none" style={{ animationDelay: '2s' }} />
        <div className="floating-particle w-40 h-40 top-1/3 right-1/4 pointer-events-none" style={{ animationDelay: '4s' }} />

        {/* Soft Warm Pink Readability Gradient Overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, 
              rgba(255, 248, 250, 0.96) 0%, 
              rgba(255, 248, 250, 0.88) 40%, 
              rgba(255, 248, 250, 0.50) 70%, 
              rgba(255, 248, 250, 0.15) 100%)`,
          }}
        />

        {/* Ambient Rose Gold Radial Glow */}
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#FDEEF3]/70 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Floating Video Control Badge */}
      {!videoError && (
        <div className="absolute bottom-8 right-8 z-20 hidden sm:flex items-center space-x-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[rgba(233,170,194,0.4)] shadow-md text-xs font-bold text-[#1E1E1E]">
          <button onClick={togglePlay} className="p-1 text-[#FF6FA7] hover:scale-110 transition-transform">
            {isPlaying ? <Pause className="w-4 h-4 fill-[#FF6FA7]" /> : <Play className="w-4 h-4 fill-[#FF6FA7]" />}
          </button>
          <span className="text-[10px] text-[#999999] uppercase font-bold tracking-wider">LIVE ATELIER VIDEO</span>
          <button onClick={toggleMute} className="p-1 text-[#FF6FA7] hover:scale-110 transition-transform">
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      )}

      {/* 2. Luxury Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-16 sm:py-24 lg:py-28">
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

          {/* Single-Line Fluid Headline */}
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
            className="text-[#666666] text-base sm:text-lg lg:text-xl font-sans font-light tracking-wide leading-relaxed mb-8 max-w-lg"
            style={{
              animation: isLoaded ? `heroDescReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${200 + letters.length * 40 + 200}ms forwards` : 'none',
              opacity: isLoaded ? undefined : 0,
            }}
          >
            Timeless 18k Rose Gold Vermeil &amp; sparkling gem creations designed to embrace your inner romantic.
          </p>

          {/* Dual Luxury Action Buttons */}
          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
            style={{
              animation: isLoaded ? `heroCtaReveal 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${200 + letters.length * 40 + 400}ms forwards` : 'none',
              opacity: isLoaded ? undefined : 0,
            }}
          >
            <button
              onClick={onExplore}
              className="btn-pink-luxury text-white text-[12px] sm:text-[13px] font-bold tracking-[0.24em] uppercase px-9 py-4 rounded-full shadow-lg flex items-center justify-center space-x-3 group"
            >
              <span>DISCOVER BOUTIQUE</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>

            {onOpenStackBuilder && (
              <button
                onClick={onOpenStackBuilder}
                className="bg-white/80 hover:bg-white text-[#1E1E1E] hover:text-[#FF6FA7] text-[12px] sm:text-[13px] font-bold tracking-[0.2em] uppercase px-8 py-4 rounded-full border border-[rgba(233,170,194,0.4)] shadow-md flex items-center justify-center space-x-2 transition-all duration-300 hover:shadow-lg"
              >
                <Layers className="w-4 h-4 text-[#FF6FA7]" />
                <span>BUILD YOUR STACK</span>
              </button>
            )}
          </div>

          {/* Verified Customer Reviews & Certification Trust Badge */}
          <div className="flex items-center space-x-6 text-xs text-[#666666] pt-2 border-t border-[rgba(233,170,194,0.25)] max-w-lg">
            <div className="flex items-center space-x-1 text-[#FF6FA7]">
              <Star className="w-4 h-4 fill-[#FF6FA7]" />
              <Star className="w-4 h-4 fill-[#FF6FA7]" />
              <Star className="w-4 h-4 fill-[#FF6FA7]" />
              <Star className="w-4 h-4 fill-[#FF6FA7]" />
              <Star className="w-4 h-4 fill-[#FF6FA7]" />
              <span className="font-bold text-[#1E1E1E] ml-1">4.9/5</span>
            </div>
            <span className="text-[#999999]">|</span>
            <div className="flex items-center space-x-1 font-semibold text-[#1E1E1E]">
              <ShieldCheck className="w-4 h-4 text-[#FF6FA7]" />
              <span>2,400+ Verified Luxury Reviews</span>
            </div>
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
