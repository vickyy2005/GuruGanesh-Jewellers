import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, Sparkles, Layers, Ruler, ShieldCheck } from 'lucide-react';
import { GuruGaneshLogo } from './GuruGaneshLogo';

interface HeaderProps {
  cartCount: number;
  wishlistCount?: number;
  onOpenCart: () => void;
  onOpenWishlist?: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (cat: string) => void;
  activeCategory: string;
  activeView: 'home' | 'shop' | 'product-detail' | 'about' | 'contact' | 'admin';
  onNavigate: (view: 'home' | 'shop' | 'about' | 'contact' | 'admin') => void;
  onOpenStackBuilder?: () => void;
  onOpenSizeGuide?: () => void;
  onOpenAbout?: () => void;
  onOpenContact?: () => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount = 0,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onSelectCategory,
  activeCategory,
  activeView,
  onNavigate,
  onOpenStackBuilder,
  onOpenSizeGuide,
  onOpenAbout,
  onOpenContact,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', view: 'home', value: 'ALL' },
    { label: 'BOUTIQUE SHOP', view: 'shop', value: 'ALL' },
    { label: 'ABOUT', view: 'about', value: 'ALL' },
    { label: 'CONTACT US', view: 'contact', value: 'ALL' },
  ];

  const handleNavClick = (item: (typeof navItems)[0]) => {
    setMobileMenuOpen(false);
    onNavigate(item.view as any);
    onSelectCategory(item.value || 'ALL');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="sticky top-0 z-40">
      
      {/* 1. Top Luxury Announcement & Utility Bar */}
      <div className="bg-[#1F1418] text-white py-2 px-4 sm:px-8 text-[11px] border-b border-white/10 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Announcement Message */}
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6FA7] animate-pulse" />
            <span className="tracking-[0.18em] uppercase font-light text-white/90">
              FREE INSURED EXPRESS SHIPPING &amp; 2-YEAR GUARANTEE
            </span>
          </div>

          {/* Top Right Utility Buttons: Size Finder, Stack Builder & Admin Panel */}
          <div className="hidden sm:flex items-center space-x-5 font-bold tracking-[0.2em] uppercase text-[#E89AB5]">
            {onOpenSizeGuide && (
              <button
                onClick={onOpenSizeGuide}
                className="hover:text-white transition-colors flex items-center space-x-1.5 cursor-pointer"
                title="Find Ring & Wrist Size"
              >
                <Ruler className="w-3.5 h-3.5 text-[#FF6FA7]" />
                <span>SIZE FINDER</span>
              </button>
            )}

            <div className="w-px h-3 bg-white/20" />

            {onOpenStackBuilder && (
              <button
                onClick={onOpenStackBuilder}
                className="bg-[#FF6FA7]/20 hover:bg-[#FF6FA7] hover:text-white px-3 py-1 rounded-full transition-all duration-300 text-white flex items-center space-x-1.5 border border-[#FF6FA7]/40 cursor-pointer"
                title="Build Custom Jewelry Stack"
              >
                <Layers className="w-3.5 h-3.5 text-[#FF6FA7]" />
                <span>STACK BUILDER</span>
              </button>
            )}

            {onOpenAdmin && (
              <>
                <div className="w-px h-3 bg-white/20" />
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-white transition-colors flex items-center space-x-1.5 cursor-pointer text-[#FF6FA7]"
                  title="Admin Panel - Product Concierge"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF6FA7]" />
                  <span>ADMIN PANEL</span>
                </button>
              </>
            )}
          </div>

        </div>
      </div>

      {/* 2. Main Glassmorphism Navbar */}
      <header
        className={`transition-all duration-500 ${
          scrolled
            ? 'py-2.5 glass-nav shadow-[0_10px_30px_rgba(233,170,194,0.15)]'
            : 'py-4 bg-[#FFF8FA]/95 backdrop-blur-md border-b border-[rgba(233,170,194,0.18)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            {/* Mobile Menu Toggle */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#1E1E1E] hover:text-[#FF6FA7] transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Logo */}
            <div
              className="flex-shrink-0 flex items-center cursor-pointer"
              onClick={() => handleNavClick({ label: 'HOME', view: 'home', value: 'ALL' })}
            >
              <GuruGaneshLogo size={42} />
            </div>

            {/* Center Navigation Links (Clean & Spacious) */}
            <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
              {navItems.map((item) => {
                const isActive = activeView === item.view;

                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className={`text-[12px] tracking-[0.22em] font-semibold uppercase relative py-1 nav-center-underline transition-colors ${
                      isActive
                        ? 'text-[#C98A9F] active font-bold'
                        : 'text-[#1E1E1E] hover:text-[#FF6FA7]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Icons (Search, Wishlist, Cart) */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Search Icon */}
              <button
                onClick={onOpenSearch}
                className="text-[#1E1E1E] hover:text-[#FF6FA7] transition-colors p-2 focus:outline-none transform hover:scale-110 duration-300 rounded-full hover:bg-[#FDEEF3]"
                title="Search jewelry"
                aria-label="Search"
              >
                <Search className="w-5 h-5 stroke-[1.75]" />
              </button>

              {/* Wishlist Heart Icon */}
              {onOpenWishlist && (
                <button
                  onClick={onOpenWishlist}
                  className="flex items-center text-[#1E1E1E] hover:text-[#FF6FA7] transition-colors p-2 group focus:outline-none transform hover:scale-105 duration-300 rounded-full hover:bg-[#FDEEF3]"
                  title="My Wishlist"
                  aria-label="Wishlist"
                >
                  <Heart className="w-5 h-5 stroke-[1.75] text-[#FF6FA7] group-hover:fill-[#FF6FA7] transition-all" />
                  {wishlistCount > 0 && (
                    <span className="ml-1 text-[11px] font-bold text-white bg-[#FF6FA7] px-1.5 py-0.5 rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </button>
              )}

              {/* Shopping Bag Icon */}
              <button
                onClick={onOpenCart}
                className="flex items-center text-[#1E1E1E] hover:text-[#FF6FA7] transition-colors p-2 group focus:outline-none transform hover:scale-105 duration-300 rounded-full hover:bg-[#FDEEF3]"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.75] text-[#C98A9F] group-hover:text-[#FF6FA7] group-hover:animate-[bounceCart_0.6s_ease-in-out]" />
                <span className="ml-1.5 text-[12px] font-bold tracking-wider text-[#1E1E1E] bg-[#FDEEF3] group-hover:bg-[#E89AB5] group-hover:text-white px-2 py-0.5 rounded-full transition-colors">
                  {cartCount}
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[rgba(233,170,194,0.2)] bg-[#FFF8FA]/98 backdrop-blur-lg px-6 pt-4 pb-8 space-y-4 animate-fade-in shadow-lg">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="block w-full text-left py-2 text-xs tracking-[0.22em] uppercase font-semibold border-b border-[#FDEEF3] text-[#1E1E1E] hover:text-[#FF6FA7]"
              >
                {item.label}
              </button>
            ))}

            {onOpenStackBuilder && (
              <button
                onClick={() => {
                  onOpenStackBuilder();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-[#FDEEF3] text-[#FF6FA7] font-bold text-xs tracking-widest uppercase rounded-full"
              >
                <Layers className="w-4 h-4" />
                <span>STACK BUILDER</span>
              </button>
            )}

            {onOpenSizeGuide && (
              <button
                onClick={() => {
                  onOpenSizeGuide();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-white border border-[#E89AB5] text-[#1E1E1E] font-bold text-xs tracking-widest uppercase rounded-full"
              >
                <Ruler className="w-4 h-4 text-[#C98A9F]" />
                <span>RING SIZE FINDER</span>
              </button>
            )}

            {onOpenAdmin && (
              <button
                onClick={() => {
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-[#B85B7A] to-[#E89AB5] text-white font-bold text-xs tracking-widest uppercase rounded-full shadow-md"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>ADMIN PANEL</span>
              </button>
            )}
          </div>
        )}
      </header>
    </div>
  );
};
