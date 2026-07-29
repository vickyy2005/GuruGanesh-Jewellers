import React, { useEffect, useRef, useState } from 'react';

interface ScrollFadeSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollFadeSection: React.FC<ScrollFadeSectionProps> = ({ children, className = '' }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(1);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far section top is relative to top of screen
      // When rect.top is near top of screen (0 or negative), start fading out
      if (rect.top < 100 && rect.bottom > 0) {
        const fadeDistance = windowHeight * 0.75;
        const progress = Math.min(1, Math.max(0, (100 - rect.top) / fadeDistance));
        // Calculate smooth fade out: 1 -> 0.15
        const newOpacity = Math.max(0.15, 1 - progress * 0.85);
        const newTranslateY = -progress * 25;
        setOpacity(newOpacity);
        setTranslateY(newTranslateY);
      } else {
        setOpacity(1);
        setTranslateY(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-300 ease-out will-change-[opacity,transform] ${className}`}
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
      }}
    >
      {children}
    </div>
  );
};
