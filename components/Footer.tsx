import React, { useState } from 'react';
import { INSTAGRAM_PHOTOS } from '../data';
import { ArrowRight, Facebook, Instagram, Youtube, Sparkles, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenModal: (title: string, content: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenModal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4500);
    }
  };

  return (
    <footer className="relative bg-[#1C1418] text-white pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-[rgba(232,154,181,0.2)]">
      
      {/* Decorative Warm Ambient Glow Overlay */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#E89AB5]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#FF6FA7]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Main 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-16 border-b border-white/10">
          
          {/* Column 1: Editorial Instagram / Lookbook Feed (5 cols) */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#FF6FA7]" />
              <h3 className="text-xs tracking-[0.25em] font-bold text-[#E89AB5] uppercase">
                EDITORIAL LOOKBOOK @GURUGANESH
              </h3>
            </div>

            <p className="text-xs text-white/70 font-light leading-relaxed">
              Explore how stylists and tastemakers layer our fine 18k Rose Gold Vermeil pieces around the world.
            </p>

            {/* 3 Styled Lookbook Cards with Polaroid Frames */}
            <div className="grid grid-cols-3 gap-3 max-w-sm pt-1">
              {INSTAGRAM_PHOTOS.map((photo) => (
                <a
                  key={photo.id}
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative aspect-square bg-[#2A1B22] p-1 rounded-xs overflow-hidden border border-white/15 shadow-lg transform hover:-translate-y-1.5 transition-all duration-300"
                >
                  <img
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full h-full object-cover rounded-2xs group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Hover Overlay with Heart Counter */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white text-[10px] font-bold space-y-1">
                    <Heart className="w-4 h-4 text-[#FF6FA7] fill-[#FF6FA7] animate-bounce" />
                    <span>{photo.likes || '2.4k'}</span>
                    <span className="text-[9px] text-[#E89AB5]">{photo.handle || '@glowandco'}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-bold text-[#FF6FA7] hover:text-[#E89AB5] tracking-widest uppercase transition-colors"
              >
                <span>FOLLOW #GLOWANDCO ON INSTAGRAM</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: The Boutique Directory (3 cols) */}
          <div className="md:col-span-3 flex flex-col space-y-3 text-xs tracking-[0.2em] font-bold uppercase">
            <h3 className="text-xs tracking-[0.25em] font-bold text-[#E89AB5] uppercase mb-2 border-b border-white/10 pb-2 inline-block">
              THE BOUTIQUE
            </h3>
            <button
              onClick={() => onSelectCategory('ALL')}
              className="text-left text-white/70 hover:text-[#FF6FA7] transition-colors py-1 flex items-center group"
            >
              <span className="w-1.5 h-1.5 bg-[#FF6FA7] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              ALL FINE JEWELRY
            </button>
            <button
              onClick={() => onSelectCategory('Necklaces')}
              className="text-left text-white/70 hover:text-[#FF6FA7] transition-colors py-1 flex items-center group"
            >
              <span className="w-1.5 h-1.5 bg-[#FF6FA7] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              ROSE GOLD NECKLACES
            </button>
            <button
              onClick={() => onSelectCategory('Earrings')}
              className="text-left text-white/70 hover:text-[#FF6FA7] transition-colors py-1 flex items-center group"
            >
              <span className="w-1.5 h-1.5 bg-[#FF6FA7] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              HUGGIE HOOP EARRINGS
            </button>
            <button
              onClick={() => onSelectCategory('Rings')}
              className="text-left text-white/70 hover:text-[#FF6FA7] transition-colors py-1 flex items-center group"
            >
              <span className="w-1.5 h-1.5 bg-[#FF6FA7] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              SOLITAIRE RINGS
            </button>
            <button
              onClick={() => onSelectCategory('Bracelets')}
              className="text-left text-white/70 hover:text-[#FF6FA7] transition-colors py-1 flex items-center group"
            >
              <span className="w-1.5 h-1.5 bg-[#FF6FA7] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              PAPERCLIP BRACELETS
            </button>
          </div>

          {/* Column 3: Luxury VIP Glow Club Newsletter (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs tracking-[0.25em] font-bold text-[#E89AB5] uppercase mb-2 border-b border-white/10 pb-2 inline-block">
              JOIN THE VIP GLOW CLUB
            </h3>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              Receive private invitations to novel collection drops, editorial styling guides, and <span className="text-[#FF6FA7] font-semibold">10% off</span> your first order.
            </p>

            <form onSubmit={handleSubscribe} className="relative max-w-md pt-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your VIP email address..."
                required
                className="w-full bg-white/10 border border-white/20 rounded-full px-5 py-3.5 pr-12 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#FF6FA7] focus:bg-white/15 backdrop-blur-md transition-all shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-2.5 bottom-1.5 bg-gradient-to-r from-[#C98A9F] to-[#FF6FA7] hover:from-[#E89AB5] hover:to-[#FF6FA7] text-white p-2.5 rounded-full transition-all focus:outline-none shadow-md transform hover:scale-105"
                aria-label="Subscribe to VIP Club"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {subscribed && (
              <p className="text-xs text-[#FF6FA7] font-bold tracking-wide animate-fade-in flex items-center pt-1">
                <Heart className="w-3.5 h-3.5 mr-1.5 fill-[#FF6FA7]" />
                <span>Welcome! Your 10% VIP gift code has been sent.</span>
              </p>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright, Legal Links & Socials */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 space-y-4 sm:space-y-0">
          <div className="font-serif tracking-wider text-white/80 text-sm">
            &copy; {new Date().getFullYear()} <span className="text-[#E89AB5] uppercase font-sans text-xs">GURU GANESH JEWELRY</span>. All Rights Reserved.
          </div>

          <div className="flex space-x-6 uppercase font-bold tracking-wider text-[10px]">
            <button
              onClick={() => onOpenModal('PRIVACY POLICY', 'At GLOW & CO., your privacy is paramount. We process personal data strictly to fulfill luxury orders and enhance your shopping experience.')}
              className="hover:text-[#FF6FA7] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenModal('TERMS OF SERVICE', 'By accessing GLOW & CO., you agree to comply with our purchasing terms, 30-day return policies, and 2-year fine guarantee.')}
              className="hover:text-[#FF6FA7] transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onOpenModal('SHIPPING & RETURNS', 'We offer complimentary express delivery on orders over $50 and 30-day risk-free returns on unworn items.')}
              className="hover:text-[#FF6FA7] transition-colors"
            >
              Shipping &amp; Returns
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-4 text-white/80">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#FF6FA7] transform hover:scale-125 transition-all p-1">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#FF6FA7] transform hover:scale-125 transition-all p-1">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#FF6FA7] transform hover:scale-125 transition-all p-1">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
