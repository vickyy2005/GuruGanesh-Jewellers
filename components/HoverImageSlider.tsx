import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { Eye } from 'lucide-react';

interface HoverImageSliderProps {
  product: Product;
  onClick: () => void;
  aspectRatioClass?: string;
}

export const HoverImageSlider: React.FC<HoverImageSliderProps> = ({
  product,
  onClick,
  aspectRatioClass = "aspect-square",
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Combine main image and gallery images, ensuring unique valid URLs
  const imageList = React.useMemo(() => {
    const list = [product.image];
    if (product.gallery && Array.isArray(product.gallery)) {
      product.gallery.forEach((url) => {
        if (url && typeof url === 'string' && url.trim().length > 0 && !list.includes(url)) {
          list.push(url);
        }
      });
    }
    return list;
  }, [product.image, product.gallery]);

  // Handle hover auto-slide
  useEffect(() => {
    if (isHovered && imageList.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIdx((prev) => (prev + 1) % imageList.length);
      }, 1200); // Auto change image every 1.2s on hover
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentIdx(0); // Reset back to main image when mouse leaves
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, imageList.length]);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full ${aspectRatioClass} bg-[#FDEEF3]/60 overflow-hidden cursor-pointer relative mb-4 rounded-xs shimmer-hover group/img`}
    >
      {/* Dynamic Image Layers with Smooth Crossfade */}
      {imageList.map((imgUrl, idx) => {
        const isActive = idx === currentIdx;
        return (
          <img
            key={`${imgUrl}-${idx}`}
            src={imgUrl}
            alt={`${product.name} angle ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
              isActive ? 'opacity-100 scale-105 z-10' : 'opacity-0 scale-100 pointer-events-none z-0'
            }`}
            referrerPolicy="no-referrer"
          />
        );
      })}

      {/* Hover Quick View Overlay */}
      <div className="absolute inset-0 bg-black/15 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="bg-white/95 text-[#1E1E1E] hover:bg-[#FF6FA7] hover:text-white text-[11px] font-bold tracking-widest uppercase px-4 py-2.5 shadow-md transition-all flex items-center space-x-1.5 transform translate-y-2 group-hover/img:translate-y-0"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>VIEW PIECE</span>
        </button>
      </div>

      {/* Hover Image Pagination Dots Indicator (Shows when hovering multi-image products) */}
      {imageList.length > 1 && isHovered && (
        <div className="absolute bottom-2 left-0 right-0 z-30 flex items-center justify-center space-x-1 animate-fade-in">
          {imageList.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIdx ? 'w-4 bg-[#FF6FA7]' : 'w-1.5 bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
