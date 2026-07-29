import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  className?: string;
  delay?: number;
  mode?: 'words' | 'letters' | 'fade-up';
}

export const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({
  text,
  as = 'h2',
  className = '',
  delay = 0,
  mode = 'words',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  const Component = as;

  if (mode === 'words') {
    const words = text.split(' ');
    return (
      <Component ref={elementRef as any} className={`flex flex-wrap ${className}`}>
        {words.map((word, idx) => (
          <span key={idx} className="inline-block overflow-hidden mr-[0.25em] py-0.5">
            <span
              className="inline-block transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) will-change-transform"
              style={{
                transform: isVisible ? 'translateY(0) rotate(0deg)' : 'translateY(110%) rotate(3deg)',
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${delay + idx * 45}ms`,
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </Component>
    );
  }

  if (mode === 'letters') {
    const letters = text.split('');
    return (
      <Component ref={elementRef as any} className={`flex flex-wrap ${className}`}>
        {letters.map((char, idx) => (
          <span key={idx} className="inline-block overflow-hidden py-0.5">
            <span
              className="inline-block transition-all duration-600 cubic-bezier(0.175, 0.885, 0.32, 1.25) will-change-transform"
              style={{
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(120%) scale(0.8)',
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${delay + idx * 25}ms`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          </span>
        ))}
      </Component>
    );
  }

  return (
    <Component
      ref={elementRef as any}
      className={`transition-all duration-800 cubic-bezier(0.16, 1, 0.3, 1) will-change-transform ${className}`}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(35px)',
        opacity: isVisible ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
    >
      {text}
    </Component>
  );
};
