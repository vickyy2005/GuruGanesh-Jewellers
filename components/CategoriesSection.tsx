import React from 'react';
import { CATEGORIES } from '../data';
import { ArrowRight } from 'lucide-react';

interface CategoriesSectionProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      <div className="text-center mb-12">
        <span className="text-[11px] tracking-[0.25em] font-bold text-[#E89AB5] uppercase mb-1 block">
          CURATED SELECTIONS
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-widest text-[#1E1E1E] uppercase">
          EXPLORE BY BOUTIQUE CATEGORY
        </h2>
        <div className="w-16 h-0.5 bg-[#E89AB5] mx-auto mt-3 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.linkCategory)}
            className="group cursor-pointer flex flex-col items-center text-center bg-white p-5 border border-[rgba(233,170,194,0.22)] rounded-xs luxury-card-shadow transition-all duration-500 hover:-translate-y-2"
          >
            {/* Aspect Square Image Container */}
            <div className="w-full aspect-[4/3] sm:aspect-[1/1] overflow-hidden bg-[#FDEEF3] mb-5 relative rounded-xs shimmer-hover">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-300" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-10 opacity-90 group-hover:opacity-100">
                <span className="text-xs font-bold tracking-widest uppercase bg-white/90 text-[#1E1E1E] backdrop-blur-md px-3 py-1 rounded-xs shadow-xs">
                  Rose Collection
                </span>
                <span className="p-2 bg-[#FF6FA7] text-white rounded-full transform translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-md">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Category Title */}
            <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-wider text-[#1E1E1E] uppercase mb-1 group-hover:text-[#FF6FA7] transition-colors">
              {cat.name}
            </h2>

            {/* Shop Now Link */}
            <span className="text-[12px] tracking-[0.2em] font-bold text-[#C98A9F] uppercase flex items-center group-hover:text-[#FF6FA7] transition-colors">
              <span>{cat.subtext}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
