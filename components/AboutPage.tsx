import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Award,
  ArrowRight,
  Building2,
  Gem,
  CheckCircle2,
  Scale,
  Sparkle,
} from 'lucide-react';
import { HERO_IMAGE, SUMMER_MODEL_IMAGE } from '../data';

interface AboutPageProps {
  onExploreShop: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onExploreShop }) => {
  return (
    <div className="bg-[#FFF0F5] min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto animate-fade-in select-none space-y-16">
      
      {/* 1. Minimalist Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <span className="text-[11px] tracking-[0.3em] font-bold text-[#FF6FA7] uppercase flex items-center justify-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6FA7]" />
          <span>ESTABLISHED ATELIER • MUMBAI, INDIA</span>
        </span>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1E1E1E] tracking-wider uppercase leading-tight">
          THE HOUSE OF GURU GANESH
        </h1>

        <div className="w-16 h-0.5 bg-[#FF6FA7] mx-auto rounded-full" />

        <p className="text-xs sm:text-sm text-[#666666] font-light leading-relaxed max-w-xl mx-auto">
          Crafting modern fine jewelry in heavy 18k Rose Gold Vermeil, designed for everyday elegance and timeless radiance.
        </p>
      </div>

      {/* 2. Stat Highlights Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow text-center">
        <div className="space-y-1">
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1E1E]">18k</div>
          <div className="text-[10px] font-bold text-[#C98A9F] uppercase tracking-wider">Heavy Rose Gold Vermeil</div>
        </div>
        <div className="space-y-1">
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1E1E]">2.5+ µm</div>
          <div className="text-[10px] font-bold text-[#C98A9F] uppercase tracking-wider">Plating Thickness</div>
        </div>
        <div className="space-y-1">
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1E1E]">100%</div>
          <div className="text-[10px] font-bold text-[#C98A9F] uppercase tracking-wider">Recycled 925 Silver</div>
        </div>
        <div className="space-y-1">
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1E1E]">BIS</div>
          <div className="text-[10px] font-bold text-[#C98A9F] uppercase tracking-wider">Hallmark Certified</div>
        </div>
      </div>

      {/* 3. Clean 2-Column Brand Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white p-8 sm:p-12 rounded-3xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow">
        
        <div className="lg:col-span-6 space-y-5">
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#FF6FA7] uppercase block">OUR PHILOSOPHY</span>
          
          <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#1E1E1E] uppercase leading-tight">
            Luxury Fine Jewelry Designed For Daily Wear
          </h2>

          <div className="w-12 h-0.5 bg-[#FF6FA7]" />

          <p className="text-xs sm:text-sm text-[#666666] font-light leading-relaxed">
            At GURU GANESH, we believe fine jewelry shouldn't be locked away for rare occasions. We fuse solid 925 Sterling Silver cores with heavy 2.5+ micron 18k Rose Gold Vermeil electro-baths to create waterproof, anti-tarnish creations built to last.
          </p>

          <p className="text-xs sm:text-sm text-[#666666] font-light leading-relaxed">
            Every Swarovski crystal and pink sapphire accent is individually hand-set under jewellers microscopes by our master bench artisans in Mumbai.
          </p>
        </div>

        <div className="lg:col-span-6">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[rgba(233,170,194,0.3)] shadow-md">
            <img
              src={SUMMER_MODEL_IMAGE}
              alt="GLOW & CO. Artisan Craftsmanship"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

      </div>

      {/* 4. Professional 4 Brand Pillars Grid */}
      <div className="space-y-8 text-center">
        <div>
          <span className="text-[11px] tracking-[0.25em] font-bold text-[#C98A9F] uppercase block mb-1">
            WHY COLLECTORS CHOOSE US
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1E1E1E] uppercase tracking-wider">
            THE ATELIER COMMITMENT
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          
          <div className="bg-white p-6 rounded-2xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0F5] text-[#FF6FA7] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#1E1E1E] uppercase">18K ROSE GOLD VERMEIL</h3>
            <p className="text-xs text-[#666666] font-light leading-relaxed">
              Dipped in 2.5+ microns of pure 18k gold—5x thicker than standard plating for enduring mirror shine.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0F5] text-[#FF6FA7] flex items-center justify-center">
              <Gem className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#1E1E1E] uppercase">SWAROVSKI MICRO-SET</h3>
            <p className="text-xs text-[#666666] font-light leading-relaxed">
              Ethically sourced hand-set Swarovski crystals and pink sapphires selected for optical fire.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0F5] text-[#FF6FA7] flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#1E1E1E] uppercase">SOLID 925 SILVER CORE</h3>
            <p className="text-xs text-[#666666] font-light leading-relaxed">
              100% recycled 925 sterling silver base ensuring durable luxury weight and 100% hypoallergenic comfort.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0F5] text-[#FF6FA7] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#1E1E1E] uppercase">2-YEAR ATELIER WARRANTY</h3>
            <p className="text-xs text-[#666666] font-light leading-relaxed">
              Every creation includes 2-Year warranty protection covering surface refinishing and stone maintenance.
            </p>
          </div>

        </div>
      </div>

      {/* 5. Clean Official Certification Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-[#FDEEF3] pb-4 mb-4 gap-3 text-center sm:text-left">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-[#FFF0F5] text-[#FF6FA7] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#1E1E1E]">GURU GANESH FINE JEWELRY PVT. LTD.</h4>
              <p className="text-[11px] text-[#666666]">Government Registered &amp; BIS Hallmarked Fine Enterprise</p>
            </div>
          </div>

          <span className="text-[11px] font-bold text-[#15803D] bg-[#DCFCE7] px-3 py-1 rounded-full flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            BIS Hallmark Certified
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C98A9F] block mb-0.5">ENTITY</span>
            <div className="font-bold text-[#1E1E1E] text-[11px]">Guru Ganesh Fine Jewelry Pvt. Ltd.</div>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C98A9F] block mb-0.5">CIN NUMBER</span>
            <div className="font-bold text-[#1E1E1E] text-[11px]">U36910MH2024PTC419820</div>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C98A9F] block mb-0.5">BIS LICENCE</span>
            <div className="font-bold text-[#1E1E1E] text-[11px]">HM-2024-MH-8842</div>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C98A9F] block mb-0.5">LOCATION</span>
            <div className="font-bold text-[#1E1E1E] text-[11px]">BKC, Mumbai, India</div>
          </div>
        </div>
      </div>

      {/* 6. Clean Explore CTA */}
      <div className="text-center pt-4">
        <button
          onClick={onExploreShop}
          className="btn-pink-luxury text-white text-xs font-bold tracking-[0.24em] uppercase px-10 py-4 rounded-full shadow-lg inline-flex items-center space-x-3 group"
        >
          <span>DISCOVER THE BOUTIQUE CATALOGUE</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
        </button>
      </div>

    </div>
  );
};
