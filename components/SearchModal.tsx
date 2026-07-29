import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { Search, X, Star, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    (p.variants && p.variants.some((v) => v.toLowerCase().includes(query.toLowerCase())))
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-16 sm:pt-24 px-4 animate-fade-in">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />

      <div className="relative bg-[#FAF8F5] max-w-xl w-full rounded-xs shadow-2xl z-10 p-6 border border-[#EBE6DD] animate-modal-zoom">
        {/* Search input bar */}
        <div className="flex items-center justify-between border-b border-[#EBE6DD] pb-3 mb-4">
          <div className="flex items-center space-x-3 flex-1 mr-4">
            <Search className="w-5 h-5 text-[#C0A062] flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fine jewelry, gold, diamonds, rings..."
              autoFocus
              className="w-full bg-transparent text-sm font-medium text-[#1C1917] placeholder-[#8C8275] focus:outline-none"
            />
          </div>
          <button onClick={onClose} className="p-1.5 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F2EDE4] rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 text-xs">
          <span className="text-[#8C8275] font-semibold uppercase text-[10px] tracking-wider">Popular:</span>
          {['Necklaces', 'Earrings', 'Rings', 'Gold', 'Circle'].map((chip) => (
            <button
              key={chip}
              onClick={() => setQuery(chip)}
              className="bg-[#F2EDE4] hover:bg-[#C0A062] hover:text-white px-3 py-1 rounded-xs text-[11px] font-semibold transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Search Results list */}
        <div className="max-h-80 overflow-y-auto space-y-2.5 pr-1">
          {filtered.length === 0 ? (
            <p className="text-center py-10 text-xs text-[#78716C]">
              No luxury jewelry pieces match "{query}". Try searching for 'Gold', 'Rings', or 'Necklaces'.
            </p>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectProduct(item);
                  onClose();
                }}
                className="flex items-center justify-between p-2.5 hover:bg-white border border-transparent hover:border-[#EBE6DD] rounded-xs cursor-pointer transition-all group shadow-2xs"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover bg-[#EAE2D5] rounded-xs group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-[#1C1917] group-hover:text-[#C0A062] transition-colors">{item.name}</h4>
                    <p className="text-[10px] text-[#78716C] flex items-center mt-0.5">
                      <span>{item.category}</span>
                      <span className="mx-1.5">•</span>
                      <Star className="w-3 h-3 text-[#C0A062] fill-current mr-0.5" />
                      <span>{item.rating.toFixed(1)}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-[#1C1917]">₹{item.price.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-[#C0A062] opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
