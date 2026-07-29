import React from 'react';
import { SUMMER_MODEL_IMAGE, PRODUCTS } from '../data';
import { ArrowRight, Sparkles, Star, ShieldCheck, Heart, Gift } from 'lucide-react';

interface PromoBannerProps {
  onShopSummer: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onShopSummer }) => {
  // Floating secondary feature product detail (e.g., prod-1 circle pendant)
  const featureJewel = PRODUCTS[0];

  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      {/* High-Fashion Editorial Card Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1F1418] via-[#2A1B22] to-[#361E2B] text-white border border-[rgba(232,154,181,0.3)] rounded-2xl shadow-[0_30px_70px_rgba(42,27,34,0.35)] grid grid-cols-1 lg:grid-cols-12 items-center p-8 sm:p-12 lg:p-16 gap-10">
        
        {/* Decorative Glowing Background Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#E89AB5]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FF6FA7]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="floating-particle w-32 h-32 top-10 right-1/3" />

        {/* Left Column: Editorial Copy & VIP Details (7 cols) */}
        <div className="lg:col-span-7 relative z-10 space-y-6">
          
          {/* VIP Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-[11px] font-bold tracking-[0.25em] text-[#E89AB5] uppercase shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6FA7] animate-spin" style={{ animationDuration: '6s' }} />
            <span>EXCLUSIVE SUMMER BOUTIQUE DROP</span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-wide text-white uppercase leading-[1.08]">
            RADIATE IN <span className="text-[#FF6FA7] italic font-normal">ROSE GOLD</span> &amp; SWAROVSKI PINK
          </h2>

          <p className="text-white/80 text-sm sm:text-base font-light tracking-wide max-w-lg leading-relaxed">
            Unveiling our summer capsule collection: 18k Rose Gold Vermeil pieces infused with blush Swarovski crystals that capture warm golden hour reflections.
          </p>

          {/* Luxury Feature Bullet Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 pb-2 text-xs text-white/90">
            <div className="flex items-center space-x-2.5 bg-white/5 p-3 rounded-xs border border-white/10">
              <Sparkles className="w-4 h-4 text-[#FF6FA7] flex-shrink-0" />
              <span>18k Heavy Rose Gold Vermeil Coating</span>
            </div>
            <div className="flex items-center space-x-2.5 bg-white/5 p-3 rounded-xs border border-white/10">
              <Star className="w-4 h-4 text-[#FF6FA7] flex-shrink-0" />
              <span>Hand-Cut Blush Swarovski Crystals</span>
            </div>
            <div className="flex items-center space-x-2.5 bg-white/5 p-3 rounded-xs border border-white/10">
              <Gift className="w-4 h-4 text-[#FF6FA7] flex-shrink-0" />
              <span>Includes Velvet Box &amp; Satin Ribbon</span>
            </div>
            <div className="flex items-center space-x-2.5 bg-white/5 p-3 rounded-xs border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#FF6FA7] flex-shrink-0" />
              <span>2-Year Fine Guarantee &amp; 30-Day Returns</span>
            </div>
          </div>

          {/* CTA Action Bar */}
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onShopSummer}
              className="btn-pink-luxury text-white text-[12px] sm:text-[13px] font-bold tracking-[0.24em] uppercase px-9 py-4 rounded-full shadow-lg flex items-center justify-center space-x-3 group"
            >
              <span>EXPLORE SUMMER CAPSULE</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>

            <div className="text-[11px] font-bold text-[#E89AB5] uppercase tracking-wider text-center sm:text-left flex items-center justify-center sm:justify-start space-x-1">
              <Heart className="w-3.5 h-3.5 fill-[#FF6FA7] text-[#FF6FA7]" />
              <span>Limited Batch • 24 Pieces Crafted</span>
            </div>
          </div>

        </div>

        {/* Right Column: Layered Editorial Portrait & Floating Jewelry Badge (5 cols) */}
        <div className="lg:col-span-5 relative z-10 flex justify-center items-center">
          
          {/* Main Editorial Portrait with Arch Mask & Glow */}
          <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-t-[120px] rounded-b-xl overflow-hidden border-2 border-white/20 shadow-2xl group shimmer-hover">
            <img
              src={SUMMER_MODEL_IMAGE}
              alt="GLOW & CO. Summer Fine Jewelry Model"
              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1418]/70 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 text-center z-10">
              <span className="text-[10px] font-bold tracking-[0.25em] text-white/90 uppercase bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                GLOW &amp; CO. SUMMER 2026
              </span>
            </div>
          </div>

          {/* Floating Jewelry Feature Card Overlay */}
          {featureJewel && (
            <div
              onClick={onShopSummer}
              className="absolute -bottom-6 -left-4 sm:-left-8 bg-white/95 text-[#1E1E1E] p-3.5 rounded-xs border border-[rgba(232,154,181,0.3)] shadow-2xl flex items-center space-x-3 cursor-pointer hover:scale-105 transition-transform duration-300 backdrop-blur-md max-w-[240px] hidden sm:flex"
            >
              <img
                src={featureJewel.image}
                alt={featureJewel.name}
                className="w-12 h-12 object-cover rounded-2xs bg-[#FDEEF3]"
                referrerPolicy="no-referrer"
              />
              <div className="overflow-hidden">
                <div className="text-[9px] font-bold tracking-wider text-[#FF6FA7] uppercase">FEATURED PIECE</div>
                <div className="text-xs font-bold truncate">{featureJewel.name}</div>
                <div className="text-xs font-bold text-[#1E1E1E]">₹{featureJewel.price.toLocaleString('en-IN')}</div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
