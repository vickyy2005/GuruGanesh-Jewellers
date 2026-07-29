import React from 'react';
import { Product } from '../types';
import { Star, Eye, ShoppingBag, Heart, Sparkles, ArrowRight } from 'lucide-react';

interface BestsellersSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  activeFilter: string;
  onViewAllShop?: () => void;
}

export const BestsellersSection: React.FC<BestsellersSectionProps> = ({
  products,
  onAddToCart,
  onSelectProduct,
  activeFilter,
  onViewAllShop,
}) => {
  return (
    <section id="bestsellers-section" className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <span className="text-[11px] tracking-[0.25em] font-bold text-[#E89AB5] uppercase mb-2 block">
          HANDCRAFTED FINE JEWELRY
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-widest text-[#1E1E1E] uppercase">
          {activeFilter === 'ALL'
            ? 'OUR LUXURY BESTSELLERS'
            : activeFilter === 'NEW'
            ? 'NEW ARRIVALS'
            : activeFilter === 'SALE'
            ? 'SPECIAL SALE PIECES'
            : `${activeFilter.toUpperCase()} COLLECTION`}
        </h2>
        <div className="w-16 h-0.5 bg-[#E89AB5] mx-auto mt-3 mb-2 rounded-full" />
        {activeFilter !== 'ALL' && (
          <p className="text-xs uppercase tracking-widest text-[#666666]">
            Showing items in {activeFilter}
          </p>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card-luxury bg-white border border-[rgba(233,170,194,0.22)] rounded-xs p-4 flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Badges */}
            <div className="absolute top-6 left-6 z-10 flex flex-col space-y-1">
              {product.isBestseller && (
                <span className="bg-[#1E1E1E] text-white text-[9px] uppercase font-bold px-2.5 py-0.5 tracking-wider shadow-xs rounded-xs">
                  Bestseller
                </span>
              )}
              {product.isSale && (
                <span className="bg-[#FF6FA7] text-white text-[9px] uppercase font-bold px-2.5 py-0.5 tracking-wider shadow-xs rounded-xs animate-pulse-glow">
                  Sale
                </span>
              )}
            </div>

            {/* Product Image Box */}
            <div
              onClick={() => onSelectProduct(product)}
              className="w-full aspect-square bg-[#FDEEF3]/60 overflow-hidden cursor-pointer relative mb-4 rounded-xs shimmer-hover"
            >
              <img
                src={product.image}
                alt={product.name}
                className="card-image w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />

              {/* Hover Quick View Overlay */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(product);
                  }}
                  className="bg-white/95 text-[#1E1E1E] hover:bg-[#FF6FA7] hover:text-white text-[11px] font-bold tracking-widest uppercase px-4 py-2.5 shadow-md transition-all flex items-center space-x-1.5 transform translate-y-2 group-hover:translate-y-0"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>VIEW PIECE</span>
                </button>
              </div>
            </div>

            {/* Product Metadata */}
            <div className="space-y-1.5 mb-4">
              <div className="flex items-start justify-between">
                <h3
                  onClick={() => onSelectProduct(product)}
                  className="text-[14px] font-bold text-[#1E1E1E] hover:text-[#FF6FA7] transition-colors cursor-pointer truncate pr-2"
                  title={product.name}
                >
                  {product.name}
                </h3>
                <div className="flex items-center text-[12px] font-bold text-[#FF6FA7] flex-shrink-0">
                  <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                  <span>{product.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="flex items-baseline space-x-2">
                <span className="text-[16px] font-bold text-[#1E1E1E]">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && (
                  <span className="text-xs text-[#999999] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-5 gap-2">
              <button
                onClick={() => onAddToCart(product)}
                className="col-span-4 btn-pink-luxury text-white text-[11px] font-bold tracking-[0.18em] uppercase py-3 rounded-xs shadow-xs flex items-center justify-center space-x-1"
              >
                <ShoppingBag className="w-3.5 h-3.5 mr-1" />
                <span>ADD TO BAG</span>
              </button>
              <button
                onClick={() => onSelectProduct(product)}
                className="col-span-1 border border-[rgba(233,170,194,0.3)] hover:border-[#FF6FA7] bg-white hover:bg-[#FDEEF3] text-[#1E1E1E] hover:text-[#FF6FA7] flex items-center justify-center transition-colors rounded-xs"
                title="View Full Product Page"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All Boutique Link Button */}
      {onViewAllShop && (
        <div className="text-center pt-4">
          <button
            onClick={onViewAllShop}
            className="btn-pink-luxury text-white text-xs font-bold tracking-[0.24em] uppercase px-10 py-4.5 rounded-full shadow-lg inline-flex items-center space-x-3 group"
          >
            <Sparkles className="w-4 h-4 text-white animate-spin" style={{ animationDuration: '6s' }} />
            <span>EXPLORE ENTIRE BOUTIQUE CATALOG</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>
      )}

    </section>
  );
};
