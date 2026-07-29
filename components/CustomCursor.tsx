import React, { useEffect, useState, useRef } from 'react';
import { Sparkles } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  angle: number;
}

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      setPosition({ x, y });
      if (!isVisible) setIsVisible(true);

      // Check if mouse is over interactive elements
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('.cursor-pointer') ||
          target.closest('.product-card-luxury'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }

      // Add a trailing sparkle particle when moving
      if (Math.random() > 0.4) {
        particleIdRef.current += 1;
        const newParticle: Particle = {
          id: particleIdRef.current,
          x: x + (Math.random() * 12 - 6),
          y: y + (Math.random() * 12 - 6),
          size: Math.random() * 6 + 3,
          opacity: 1,
          angle: Math.random() * 360,
        };
        setParticles((prev) => [...prev.slice(-12), newParticle]);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Smooth lerp follower animation & particle fade out
  useEffect(() => {
    let animationFrameId: number;

    const loop = () => {
      setFollowerPos((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });

      // Fade out particles
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            opacity: p.opacity - 0.04,
            y: p.y - 0.4, // float up slightly
          }))
          .filter((p) => p.opacity > 0)
      );

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block select-none">
      
      {/* Sparkle Particle Dust Trail */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed pointer-events-none text-[#FF6FA7] transition-opacity"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            opacity: p.opacity,
            transform: `translate(-50%, -50%) rotate(${p.angle}deg) scale(${p.opacity})`,
          }}
        >
          <Sparkles className="w-3 h-3 text-[#FF6FA7] fill-[#FF6FA7]" />
        </div>
      ))}

      {/* Primary Rose Gold Glowing Core */}
      <div
        className={`fixed top-0 left-0 w-3 h-3 bg-gradient-to-r from-[#FF6FA7] to-[#E89AB5] rounded-full pointer-events-none shadow-lg transition-transform duration-100 ${
          isMouseDown ? 'scale-75' : isHovered ? 'scale-150' : 'scale-100'
        }`}
        style={{
          transform: `translate3d(${position.x - 6}px, ${position.y - 6}px, 0)`,
          boxShadow: '0 0 12px rgba(255, 111, 167, 0.8)',
        }}
      />

      {/* Outer Magnetic Ring Follower */}
      <div
        className={`fixed top-0 left-0 rounded-full border border-[#FF6FA7]/50 pointer-events-none transition-all duration-300 flex items-center justify-center ${
          isHovered
            ? 'w-14 h-14 border-[#FF6FA7] bg-[#FFF0F5]/50 backdrop-blur-xs scale-110 shadow-xl'
            : isMouseDown
            ? 'w-6 h-6 border-[#E89AB5]'
            : 'w-9 h-9 border-[#E89AB5]/70'
        }`}
        style={{
          transform: `translate3d(${followerPos.x - (isHovered ? 28 : isMouseDown ? 12 : 18)}px, ${
            followerPos.y - (isHovered ? 28 : isMouseDown ? 12 : 18)
          }px, 0)`,
        }}
      >
        {isHovered && (
          <span className="text-[8px] font-bold tracking-widest text-[#FF6FA7] uppercase animate-pulse">
            GLOW
          </span>
        )}
      </div>

    </div>
  );
};
