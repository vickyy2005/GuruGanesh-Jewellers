import React from 'react';

interface GuruGaneshLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
}

export const GuruGaneshLogo: React.FC<GuruGaneshLogoProps> = ({
  className = '',
  size = 36,
  showText = true,
  textColor = 'text-[#1E1E1E]',
}) => {
  return (
    <div className={`flex items-center space-x-3 select-none group cursor-pointer ${className}`}>
      {/* Golden GG Diamond Monogram SVG Emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform group-hover:scale-105 transition-transform duration-500 flex-shrink-0"
      >
        <defs>
          {/* Metallic Gold Gradient */}
          <linearGradient id="ggGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9E29C" />
            <stop offset="35%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#B8860B" />
            <stop offset="100%" stopColor="#AA771C" />
          </linearGradient>

          {/* Rose Gold Accent Gradient */}
          <linearGradient id="ggRoseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF0F5" />
            <stop offset="50%" stopColor="#E89AB5" />
            <stop offset="100%" stopColor="#B85B7A" />
          </linearGradient>

          {/* Golden Glow Filter */}
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Diamond Outer Frame */}
        <polygon
          points="50,6 94,40 50,94 6,40"
          stroke="url(#ggGoldGrad)"
          strokeWidth="3.5"
          fill="none"
          strokeLinejoin="round"
          filter="url(#goldGlow)"
        />

        {/* Diamond Inner Facet Line */}
        <polygon
          points="50,14 86,40 50,86 14,40"
          stroke="url(#ggGoldGrad)"
          strokeWidth="1.5"
          strokeDasharray="1 1"
          fill="none"
          opacity="0.4"
        />

        {/* Left 'G' Monogram */}
        <path
          d="M 45,26 L 24,40 L 45,72 L 45,54 L 35,54 L 35,46 L 45,46 Z"
          stroke="url(#ggGoldGrad)"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 45,34 L 30,42 L 45,64"
          stroke="url(#ggGoldGrad)"
          strokeWidth="2"
          fill="none"
          opacity="0.9"
        />

        {/* Right 'G' Monogram (Mirrored) */}
        <path
          d="M 55,26 L 76,40 L 55,72 L 55,54 L 65,54 L 65,46 L 55,46 Z"
          stroke="url(#ggGoldGrad)"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 55,34 L 70,42 L 55,64"
          stroke="url(#ggGoldGrad)"
          strokeWidth="2"
          fill="none"
          opacity="0.9"
        />

        {/* Center Vertical Divider Line */}
        <line
          x1="50"
          y1="20"
          x2="50"
          y2="80"
          stroke="url(#ggGoldGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Sparkle Glint at Top Apex */}
        <circle cx="50" cy="6" r="2.5" fill="#FFF8DC" />
      </svg>

      {/* Brand Name Typography */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif text-xl sm:text-2xl tracking-[0.22em] font-normal uppercase transition-colors duration-300 ${textColor} group-hover:text-[#FF6FA7]`}>
            GURU GANESH
          </span>
          <span className="text-[9px] tracking-[0.3em] uppercase text-[#B85B7A] font-bold -mt-1">
            JEWELLERS
          </span>
        </div>
      )}
    </div>
  );
};
