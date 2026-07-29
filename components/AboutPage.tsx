import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Heart,
  Award,
  ArrowRight,
  Crown,
  Building2,
  Gem,
  CheckCircle2,
  Compass,
  Users,
  Feather,
  Clock,
  Sparkle,
  Star,
  Check,
} from 'lucide-react';
import { HERO_IMAGE, SUMMER_MODEL_IMAGE } from '../data';

interface AboutPageProps {
  onExploreShop: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onExploreShop }) => {
  const [activeTab, setActiveTab] = useState<'heritage' | 'purity' | 'sustainability' | 'atelier'>('heritage');

  return (
    <div className="bg-[#FFF0F5] min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in select-none space-y-16">
      
      {/* 1. High-Fashion Editorial Hero Showcase */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFF8FA] via-[#FDEEF3] to-[#FFF8FA] p-8 sm:p-14 border border-[rgba(233,170,194,0.3)] luxury-card-shadow text-center">
        
        {/* Ambient Glow & Floating Badge */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF6FA7]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] tracking-[0.3em] font-bold text-[#FF6FA7] uppercase flex items-center justify-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6FA7]" />
            <span>ESTABLISHED 2024 • MUMBAI, INDIA</span>
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#1E1E1E] tracking-wider uppercase leading-tight">
            THE HOUSE OF GURU GANESH
          </h1>

          <div className="w-24 h-0.5 bg-[#FF6FA7] mx-auto rounded-full" />

          <p className="text-sm sm:text-base text-[#666666] font-light max-w-2xl mx-auto leading-relaxed">
            Redefining modern fine jewelry through heavy 18k Rose Gold Vermeil, micro-pavé crystal setting, and timeless Indian artisan heritage.
          </p>

          {/* Key Stat Cards Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-3xl mx-auto">
            <div className="p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-[rgba(233,170,194,0.3)] shadow-xs">
              <div className="text-2xl font-bold text-[#1E1E1E]">50,000+</div>
              <div className="text-[10px] text-[#666666] uppercase font-semibold">GURU GANESH Collectors</div>
            </div>
            <div className="p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-[rgba(233,170,194,0.3)] shadow-xs">
              <div className="text-2xl font-bold text-[#1E1E1E]">2.5+ µm</div>
              <div className="text-[10px] text-[#666666] uppercase font-semibold">18k Gold Plating</div>
            </div>
            <div className="p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-[rgba(233,170,194,0.3)] shadow-xs">
              <div className="text-2xl font-bold text-[#1E1E1E]">100%</div>
              <div className="text-[10px] text-[#666666] uppercase font-semibold">Recycled 925 Silver</div>
            </div>
            <div className="p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-[rgba(233,170,194,0.3)] shadow-xs">
              <div className="text-2xl font-bold text-[#1E1E1E]">4.9 / 5.0</div>
              <div className="text-[10px] text-[#666666] uppercase font-semibold">Verified Ratings</div>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Official Corporate Registry Card */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow space-y-6">
        <div className="flex items-center justify-between border-b border-[#FDEEF3] pb-4 flex-wrap gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#FFF0F5] text-[#FF6FA7] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-normal text-[#1E1E1E]">GURU GANESH FINE JEWELRY PVT. LTD.</h3>
              <p className="text-xs text-[#666666]">Government Registered &amp; BIS Hallmarked Enterprise</p>
            </div>
          </div>

          <span className="text-xs font-bold text-[#15803D] bg-[#DCFCE7] px-3.5 py-1 rounded-full flex items-center shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
            BIS Hallmark Registration Certified
          </span>
        </div>

        {/* Corporate Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-[#FFF0F5] rounded-2xl border border-[rgba(233,170,194,0.2)] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C98A9F]">LEGAL ENTITY</span>
            <div className="font-bold text-[#1E1E1E]">Guru Ganesh Fine Jewelry Pvt. Ltd.</div>
          </div>
          <div className="p-4 bg-[#FFF0F5] rounded-2xl border border-[rgba(233,170,194,0.2)] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C98A9F]">CORPORATE ID (CIN)</span>
            <div className="font-bold text-[#1E1E1E]">U36910MH2024PTC419820</div>
          </div>
          <div className="p-4 bg-[#FFF0F5] rounded-2xl border border-[rgba(233,170,194,0.2)] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C98A9F]">BIS LICENCE NO.</span>
            <div className="font-bold text-[#1E1E1E]">HM-2024-MH-8842</div>
          </div>
          <div className="p-4 bg-[#FFF0F5] rounded-2xl border border-[rgba(233,170,194,0.2)] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C98A9F]">ATELIER LOCATION</span>
            <div className="font-bold text-[#1E1E1E]">BKC, Mumbai 400051, India</div>
          </div>
        </div>
      </div>

      {/* 3. Interactive Brand Pillars Tabs */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow space-y-8">
        
        {/* Tab Buttons */}
        <div className="flex items-center justify-center gap-3 flex-wrap border-b border-[#FDEEF3] pb-6">
          {[
            { id: 'heritage', label: 'OUR HERITAGE' },
            { id: 'purity', label: 'BIS PURITY & VERMEIL' },
            { id: 'sustainability', label: 'SUSTAINABILITY' },
            { id: 'atelier', label: 'THE ARTISAN ATELIER' },
          ].map((tab) => {
            const isAct = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-xs px-6 py-3 rounded-full font-bold tracking-widest uppercase transition-all duration-300 ${
                  isAct
                    ? 'bg-[#FF6FA7] text-white shadow-md scale-105'
                    : 'bg-[#FFF0F5] text-[#1E1E1E] hover:bg-[#E89AB5] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="py-4">
          {activeTab === 'heritage' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-bold tracking-widest text-[#FF6FA7] uppercase block">FOUNDER'S VISION</span>
                <h3 className="font-serif text-3xl font-normal text-[#1E1E1E] uppercase">
                  Feminine Radiance Built For Everyday Wear
                </h3>
                <p className="text-xs sm:text-sm text-[#666666] font-light leading-relaxed">
                  "Jewelry shouldn't sit in a safe waiting for annual galas. We created GURU GANESH so every woman can wear 18k heavy rose gold vermeil that brings effortless luxury to daily life."
                </p>
                <p className="text-xs text-[#999999] italic font-serif">— Elena Vance, Creative Director &amp; Founder</p>
              </div>
              <div className="lg:col-span-6">
                <img
                  src={SUMMER_MODEL_IMAGE}
                  alt="GLOW & CO. Heritage"
                  className="w-full aspect-[4/3] object-cover rounded-2xl shadow-md border border-[rgba(233,170,194,0.3)]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          )}

          {activeTab === 'purity' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#666666]">
              <div className="p-6 bg-[#FFF0F5] rounded-2xl space-y-2 border border-[rgba(233,170,194,0.2)]">
                <ShieldCheck className="w-6 h-6 text-[#FF6FA7] mb-1" />
                <h4 className="font-bold text-[#1E1E1E] uppercase">2.5+ MICRON GOLD VERMEIL</h4>
                <p>Five times thicker than standard gold plating. Submerged in 18k Rose Gold electro-baths for deep mirror brilliance.</p>
              </div>
              <div className="p-6 bg-[#FFF0F5] rounded-2xl space-y-2 border border-[rgba(233,170,194,0.2)]">
                <Crown className="w-6 h-6 text-[#FF6FA7] mb-1" />
                <h4 className="font-bold text-[#1E1E1E] uppercase">SOLID 925 STERLING SILVER CORE</h4>
                <p>Every piece starts with 100% solid 925 sterling silver base, providing structural strength and authentic fine weight.</p>
              </div>
              <div className="p-6 bg-[#FFF0F5] rounded-2xl space-y-2 border border-[rgba(233,170,194,0.2)]">
                <Gem className="w-6 h-6 text-[#FF6FA7] mb-1" />
                <h4 className="font-bold text-[#1E1E1E] uppercase">MICRO-SET GEMSTONES</h4>
                <p>AAA grade pink sapphires and Swarovski crystals individually micro-set under jewellers microscopes.</p>
              </div>
            </div>
          )}

          {activeTab === 'sustainability' && (
            <div className="space-y-4 max-w-3xl mx-auto text-center">
              <h3 className="font-serif text-3xl text-[#1E1E1E] uppercase">100% ETHICAL &amp; RECYCLED METALS</h3>
              <p className="text-xs sm:text-sm text-[#666666] font-light leading-relaxed">
                We take environmental responsibility seriously. 100% of our precious silver core is sourced from certified recycled mines, reducing carbon emissions by 85%. All shipment packaging is crafted from reusable velvet presentation boxes and FSC-certified recycled paper.
              </p>
            </div>
          )}

          {activeTab === 'atelier' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#666666]">
              <div className="p-6 bg-[#FFF0F5] rounded-2xl space-y-2 border border-[rgba(233,170,194,0.2)]">
                <span className="text-[10px] font-bold text-[#FF6FA7] uppercase tracking-widest">LOCATION</span>
                <h4 className="font-bold text-[#1E1E1E] text-sm uppercase">BKC MUMBAI ATELIER</h4>
                <p>Our master bench jewellers hand-finish every piece in our Bandra Kurla Complex atelier under strict BIS hallmark compliance.</p>
              </div>
              <div className="p-6 bg-[#FFF0F5] rounded-2xl space-y-2 border border-[rgba(233,170,194,0.2)]">
                <span className="text-[10px] font-bold text-[#FF6FA7] uppercase tracking-widest">GUARANTEE</span>
                <h4 className="font-bold text-[#1E1E1E] text-sm uppercase">2-YEAR LUXURY WARRANTY</h4>
                <p>Enjoy complete peace of mind with our 2-Year warranty covering surface refinishing, stone tightening, and free ring size exchanges.</p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* 4. 4-Stage Craftsmanship Process Cards */}
      <div className="text-center space-y-10">
        <div>
          <span className="text-[11px] tracking-[0.25em] font-bold text-[#C98A9F] uppercase block mb-1">
            BEHIND THE BENCH
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E1E1E] uppercase tracking-wide">
            OUR 4-STAGE CRAFTSMANSHIP PROCESS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow space-y-3 text-left">
            <span className="w-8 h-8 rounded-full bg-[#FFF0F5] text-[#FF6FA7] text-xs font-bold flex items-center justify-center">
              01
            </span>
            <h4 className="text-sm font-bold text-[#1E1E1E] uppercase">3D CAD SCULPTING</h4>
            <p className="text-xs text-[#666666] font-light leading-relaxed">
              Every ring halo and paperclip chain link is digitally modeled to calculate light refraction angles for maximum brilliance.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow space-y-3 text-left">
            <span className="w-8 h-8 rounded-full bg-[#FFF0F5] text-[#FF6FA7] text-xs font-bold flex items-center justify-center">
              02
            </span>
            <h4 className="text-sm font-bold text-[#1E1E1E] uppercase">SILVER CORE CASTING</h4>
            <p className="text-xs text-[#666666] font-light leading-relaxed">
              Formed using 100% recycled 925 sterling silver for structural durability, optimal weight, and nickel-free comfort.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow space-y-3 text-left">
            <span className="w-8 h-8 rounded-full bg-[#FFF0F5] text-[#FF6FA7] text-xs font-bold flex items-center justify-center">
              03
            </span>
            <h4 className="text-sm font-bold text-[#1E1E1E] uppercase">18K VERMEIL BATH</h4>
            <p className="text-xs text-[#666666] font-light leading-relaxed">
              Electro-plated in pure 18k Rose Gold baths to bond a deep 2.5-micron layer five times thicker than fashion jewelry.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow space-y-3 text-left">
            <span className="w-8 h-8 rounded-full bg-[#FFF0F5] text-[#FF6FA7] text-xs font-bold flex items-center justify-center">
              04
            </span>
            <h4 className="text-sm font-bold text-[#1E1E1E] uppercase">MICROSCOPIC SETTING</h4>
            <p className="text-xs text-[#666666] font-light leading-relaxed">
              Stones are micro-set individually by master jewellers under high magnification, followed by plush hand mirror polishing.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Company Milestones */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow space-y-8">
        <div className="text-center">
          <span className="text-[11px] tracking-[0.25em] font-bold text-[#C98A9F] uppercase block mb-1">
            MILESTONES &amp; JOURNEY
          </span>
          <h2 className="font-serif text-3xl font-normal text-[#1E1E1E] uppercase tracking-wide">
            THE GLOW &amp; CO. TIMELINE
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#FFF0F5] rounded-2xl border border-[rgba(233,170,194,0.2)] space-y-2">
            <span className="text-xs font-bold text-[#FF6FA7] uppercase tracking-widest">2024 • FOUNDING</span>
            <h4 className="text-sm font-bold text-[#1E1E1E]">Boutique Launch in BKC Mumbai</h4>
            <p className="text-xs text-[#666666] font-light">
              Opened our flagship craft atelier in Bandra Kurla Complex with 8 signature Rose Gold Vermeil creations.
            </p>
          </div>

          <div className="p-6 bg-[#FFF0F5] rounded-2xl border border-[rgba(233,170,194,0.2)] space-y-2">
            <span className="text-xs font-bold text-[#FF6FA7] uppercase tracking-widest">2025 • PAN-INDIA EXPANSION</span>
            <h4 className="text-sm font-bold text-[#1E1E1E]">Free Insured Express Delivery</h4>
            <p className="text-xs text-[#666666] font-light">
              Launched pan-India shipping, interactive Ring &amp; Wrist Size Calculators, and complimentary Laser Engraving.
            </p>
          </div>

          <div className="p-6 bg-[#FFF0F5] rounded-2xl border border-[rgba(233,170,194,0.2)] space-y-2">
            <span className="text-xs font-bold text-[#FF6FA7] uppercase tracking-widest">2026 • GLOBAL GLOW SOCIETY</span>
            <h4 className="text-sm font-bold text-[#1E1E1E]">50,000+ Verified Collectors</h4>
            <p className="text-xs text-[#666666] font-light">
              Established "The Glow Society" client club offering 2-Year fine guarantee protection and personal concierge styling.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Call to Action Banner */}
      <div className="text-center bg-gradient-to-r from-[#FFF8FA] via-[#FDEEF3] to-[#FFF8FA] p-10 rounded-3xl border border-[rgba(233,170,194,0.3)] luxury-card-shadow space-y-4">
        <h3 className="font-serif text-3xl font-normal text-[#1E1E1E] uppercase">
          READY TO FIND YOUR PERFECT GLOW?
        </h3>
        <p className="text-xs text-[#666666] max-w-md mx-auto">
          Explore our handcrafted 18k Rose Gold Vermeil necklaces, solitaire rings, and huggie hoops today.
        </p>
        <button
          onClick={onExploreShop}
          className="btn-pink-luxury text-white text-xs font-bold tracking-[0.24em] uppercase px-8 py-4 rounded-full shadow-lg inline-flex items-center space-x-2"
        >
          <span>EXPLORE BOUTIQUE CATALOGUE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
