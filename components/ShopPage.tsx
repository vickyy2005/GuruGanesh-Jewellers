import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import {
  Star,
  Eye,
  ShoppingBag,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  Crown,
  Heart,
  Truck,
  Gift,
  ShieldCheck,
  Check,
  ChevronRight,
  X,
  Scale,
  User,
  Palette,
  ChevronDown,
  Sparkle,
} from 'lucide-react';

interface ShopPageProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  onSelectProduct,
  onAddToCart,
  selectedCategory,
  onCategoryChange,
}) => {
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [selectedWeight, setSelectedWeight] = useState<string>('ALL');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('ALL');
  const [selectedGender, setSelectedGender] = useState<string>('ALL');
  const [selectedStyle, setSelectedStyle] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [wishlistedIds, setWishlistedIds] = useState<Record<string, boolean>>({});
  
  // State for toggling filters panel
  const [showFiltersPanel, setShowFiltersPanel] = useState<boolean>(false);

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setWishlistedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter logic
  let filtered = PRODUCTS.filter((p) => {
    if (selectedCategory !== 'ALL') {
      if (selectedCategory === 'NEW' && !p.isNew && !p.isBestseller) return false;
      if (selectedCategory === 'SALE' && !p.isSale && (!p.originalPrice || p.originalPrice <= p.price)) return false;
      if (
        selectedCategory !== 'NEW' &&
        selectedCategory !== 'SALE' &&
        p.category.toLowerCase() !== selectedCategory.toLowerCase()
      )
        return false;
    }
    if (p.price > maxPrice) return false;

    // Weight Filter
    if (selectedWeight !== 'ALL') {
      if (selectedWeight === 'light' && p.price > 9500) return false;
      if (selectedWeight === 'medium' && (p.price <= 9500 || p.price > 14500)) return false;
      if (selectedWeight === 'heavy' && p.price <= 14500) return false;
    }

    // Occasion Filter
    if (selectedOccasion !== 'ALL') {
      const matchOccasion = (p.occasion || '').toLowerCase().includes(selectedOccasion.toLowerCase()) ||
        (p.description || '').toLowerCase().includes(selectedOccasion.toLowerCase()) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(selectedOccasion.toLowerCase()));
      if (!matchOccasion) return false;
    }

    // Gender Filter
    if (selectedGender !== 'ALL') {
      if (p.gender && p.gender.toLowerCase() !== selectedGender.toLowerCase()) return false;
    }

    // Style Filter
    if (selectedStyle !== 'ALL') {
      const matchStyle = (p.style || '').toLowerCase().includes(selectedStyle.toLowerCase()) ||
        (p.name || '').toLowerCase().includes(selectedStyle.toLowerCase()) ||
        (p.description || '').toLowerCase().includes(selectedStyle.toLowerCase());
      if (!matchStyle) return false;
    }

    if (inStockOnly && !p.inStock) return false;

    return true;
  });

  // Sort logic
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const activeFiltersCount =
    (maxPrice < 20000 ? 1 : 0) +
    (selectedWeight !== 'ALL' ? 1 : 0) +
    (selectedOccasion !== 'ALL' ? 1 : 0) +
    (selectedGender !== 'ALL' ? 1 : 0) +
    (selectedStyle !== 'ALL' ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  const resetFilters = () => {
    setMaxPrice(20000);
    setSelectedWeight('ALL');
    setSelectedOccasion('ALL');
    setSelectedGender('ALL');
    setSelectedStyle('ALL');
    setInStockOnly(false);
  };

  const categoriesWithCounts = [
    { label: 'ALL BOUTIQUE', val: 'ALL', count: PRODUCTS.length },
    { label: 'NECKLACES', val: 'Necklaces', count: PRODUCTS.filter((p) => p.category === 'Necklaces').length },
    { label: 'EARRINGS', val: 'Earrings', count: PRODUCTS.filter((p) => p.category === 'Earrings').length },
    { label: 'RINGS', val: 'Rings', count: PRODUCTS.filter((p) => p.category === 'Rings').length },
    { label: 'BRACELETS', val: 'Bracelets', count: PRODUCTS.filter((p) => p.category === 'Bracelets').length },
    { label: 'NEW ARRIVALS', val: 'NEW', count: PRODUCTS.filter((p) => p.isNew || p.isSummerCollection).length },
    { label: 'SPECIAL SALE', val: 'SALE', count: PRODUCTS.filter((p) => p.isSale).length },
  ];

  return (
    <div className="bg-[#FFF0F5] min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in select-none">
      
      {/* Royal Editorial Header with Upper & Lower Royal Ornamental Borders */}
      <div className="relative text-center my-6 py-8 px-6 bg-gradient-to-r from-[#FFF8FA]/80 via-white to-[#FFF8FA]/80 rounded-3xl border border-[rgba(233,170,194,0.35)] luxury-card-shadow overflow-hidden">
        
        {/* Royal Upper Border Motif */}
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[#FF6FA7] to-transparent w-24 sm:w-44" />
          <div className="flex items-center space-x-1.5 text-[#FF6FA7]">
            <span className="text-[10px]">♦</span>
            <Crown className="w-4 h-4 text-[#FF6FA7]" />
            <span className="text-[10px]">♦</span>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-[#FF6FA7] to-transparent w-24 sm:w-44" />
        </div>

        {/* Subtitle */}
        <span className="text-[11px] tracking-[0.3em] font-bold text-[#FF6FA7] uppercase flex items-center justify-center space-x-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6FA7]" />
          <span>FINE HANDCRAFTED 18K VERMEIL</span>
        </span>

        {/* Headline */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1E1E1E] tracking-wider uppercase mb-3">
          {selectedCategory === 'ALL'
            ? 'THE BOUTIQUE CATALOGUE'
            : selectedCategory === 'NEW'
            ? 'NEW ARRIVALS 2026'
            : selectedCategory === 'SALE'
            ? 'SPECIAL SALE SELECTIONS'
            : `${selectedCategory.toUpperCase()} COLLECTION`}
        </h1>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#666666] font-light max-w-lg mx-auto leading-relaxed mb-5">
          Exquisite fine necklaces, halo solitaire rings, and huggie hoops crafted in heavy 18k Rose Gold Vermeil.
        </p>

        {/* Royal Lower Border Motif */}
        <div className="flex items-center justify-center space-x-3 mt-1">
          <div className="h-px bg-gradient-to-r from-transparent via-[#FF6FA7] to-transparent w-28 sm:w-52" />
          <div className="flex items-center space-x-1.5 text-[#FF6FA7]">
            <span className="text-[10px]">❖</span>
            <Sparkle className="w-3.5 h-3.5 text-[#FF6FA7]" />
            <span className="text-[10px]">❖</span>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-[#FF6FA7] to-transparent w-28 sm:w-52" />
        </div>

      </div>

      {/* 1. Top Horizontal Categories Section */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 overflow-x-auto pb-3 pt-1 no-scrollbar sm:justify-center">
          {categoriesWithCounts.map((cat) => {
            const isAct = selectedCategory === cat.val;
            return (
              <button
                key={cat.val}
                onClick={() => onCategoryChange(cat.val)}
                className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all uppercase whitespace-nowrap shadow-2xs ${
                  isAct
                    ? 'bg-[#FF6FA7] text-white shadow-md scale-102'
                    : 'bg-white text-[#666666] hover:text-[#1E1E1E] hover:bg-white/80 border border-[rgba(233,170,194,0.3)]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isAct ? 'bg-white/20 text-white' : 'bg-[#FDEEF3] text-[#FF6FA7]'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Controls Bar (Results Count, Filter Toggle Button, Sort Selector) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between bg-white p-4 border border-[rgba(233,170,194,0.25)] rounded-2xl luxury-card-shadow gap-4 mb-6">
        
        <div className="flex items-center justify-between sm:justify-start gap-4">
          <div className="text-xs font-semibold text-[#666666]">
            Showing <span className="text-[#FF6FA7] font-bold">{filtered.length}</span> luxury pieces
          </div>

          {/* FILTERS Button - Clicking this toggles all filters */}
          <button
            onClick={() => setShowFiltersPanel(!showFiltersPanel)}
            className={`btn-pink-luxury text-white text-xs font-bold px-5 py-2.5 rounded-xl flex items-center space-x-2 uppercase shadow-md transition-transform ${
              showFiltersPanel ? 'ring-2 ring-[#FF6FA7] ring-offset-1' : ''
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>FILTERS</span>
            {activeFiltersCount > 0 && (
              <span className="bg-white text-[#FF6FA7] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ml-1">
                {activeFiltersCount}
              </span>
            )}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showFiltersPanel ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#1E1E1E]">
          <span className="text-[#666666] uppercase tracking-wider text-[10px]">SORT BY:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full sm:w-auto bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-xl px-3.5 py-2 text-xs font-bold text-[#1E1E1E] focus:outline-none focus:border-[#FF6FA7]"
          >
            <option value="featured">Featured Picks</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* 3. Expandable Filters Section (Visible ONLY after clicking FILTERS button) */}
      {showFiltersPanel && (
        <div className="bg-white p-6 rounded-2xl border border-[rgba(233,170,194,0.3)] luxury-card-shadow mb-8 animate-fade-in space-y-6">
          <div className="flex items-center justify-between border-b border-[#FDEEF3] pb-4">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#1E1E1E] flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-[#FF6FA7]" />
              <span>REFINE YOUR SELECTION</span>
            </h3>

            <div className="flex items-center space-x-4">
              <button
                onClick={resetFilters}
                className="text-[10px] font-bold text-[#FF6FA7] hover:underline uppercase flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>RESET ALL</span>
              </button>
              <button
                onClick={() => setShowFiltersPanel(false)}
                className="p-1.5 text-[#999999] hover:text-[#FF6FA7] rounded-full hover:bg-[#FFF0F5] transition-colors"
                title="Close Filters"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Grid of All Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* Filter 1: Price Range */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold tracking-wider text-[#1E1E1E] uppercase">
                  MAX PRICE
                </label>
                <span className="text-xs font-bold text-[#FF6FA7]">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={5000}
                max={20000}
                step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#FF6FA7] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#999999] font-bold">
                <span>₹5,000</span>
                <span>₹20,000</span>
              </div>
            </div>

            {/* Filter 2: Weight */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold tracking-wider text-[#1E1E1E] uppercase flex items-center justify-between">
                <span>WEIGHT</span>
                <Scale className="w-3.5 h-3.5 text-[#FF6FA7]" />
              </label>
              <select
                value={selectedWeight}
                onChange={(e) => setSelectedWeight(e.target.value)}
                className="w-full bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-xl p-2.5 text-xs font-bold text-[#1E1E1E] focus:outline-none focus:border-[#FF6FA7]"
              >
                <option value="ALL">All Weights</option>
                <option value="light">Light Weight (&lt; 5g)</option>
                <option value="medium">Medium Weight (5g - 15g)</option>
                <option value="heavy">Heavy Luxury (&gt; 15g)</option>
              </select>
            </div>

            {/* Filter 3: Occasion (Sub-categories) */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold tracking-wider text-[#1E1E1E] uppercase flex items-center justify-between">
                <span>OCCASION</span>
                <Gift className="w-3.5 h-3.5 text-[#FF6FA7]" />
              </label>
              <select
                value={selectedOccasion}
                onChange={(e) => setSelectedOccasion(e.target.value)}
                className="w-full bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-xl p-2.5 text-xs font-bold text-[#1E1E1E] focus:outline-none focus:border-[#FF6FA7]"
              >
                <option value="ALL">All Occasions</option>
                <option value="bridal">👰 Bridal &amp; Wedding</option>
                <option value="daily">💼 Daily Workwear</option>
                <option value="party">✨ Parties &amp; Gala</option>
                <option value="festive">🪔 Festive &amp; Puja</option>
                <option value="anniversary">🎁 Anniversary Gift</option>
              </select>
            </div>

            {/* Filter 4: Gender */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold tracking-wider text-[#1E1E1E] uppercase flex items-center justify-between">
                <span>GENDER</span>
                <User className="w-3.5 h-3.5 text-[#FF6FA7]" />
              </label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-xl p-2.5 text-xs font-bold text-[#1E1E1E] focus:outline-none focus:border-[#FF6FA7]"
              >
                <option value="ALL">All Genders</option>
                <option value="Women">Women's Collection</option>
                <option value="Men">Men's Collection</option>
                <option value="Unisex">Unisex / Neutral</option>
              </select>
            </div>

            {/* Filter 5: Style */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold tracking-wider text-[#1E1E1E] uppercase flex items-center justify-between">
                <span>STYLE</span>
                <Palette className="w-3.5 h-3.5 text-[#FF6FA7]" />
              </label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-xl p-2.5 text-xs font-bold text-[#1E1E1E] focus:outline-none focus:border-[#FF6FA7]"
              >
                <option value="ALL">All Styles</option>
                <option value="solitaire">Solitaire &amp; Halo</option>
                <option value="minimalist">Minimalist Elegant</option>
                <option value="statement">Statement &amp; Choker</option>
                <option value="vintage">Vintage Heirloom</option>
              </select>
            </div>

          </div>

          {/* In-Stock Toggle & Apply Row */}
          <div className="flex items-center justify-between pt-4 border-t border-[#FDEEF3]">
            <label className="flex items-center space-x-2 text-xs font-semibold text-[#1E1E1E] cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-[#FF6FA7] w-4 h-4"
              />
              <span>In-Stock Pieces Only</span>
            </label>

            <button
              onClick={() => setShowFiltersPanel(false)}
              className="btn-pink-luxury text-white text-xs font-bold px-6 py-2 rounded-xl uppercase shadow-xs"
            >
              APPLY FILTERS
            </button>
          </div>

        </div>
      )}

      {/* 4. Product Grid */}
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group bg-white rounded-2xl border border-[rgba(233,170,194,0.25)] overflow-hidden luxury-card-shadow hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-square overflow-hidden bg-[#FDEEF3]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {product.isBestseller && (
                    <span className="bg-[#FF6FA7] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-xs">
                      BESTSELLER
                    </span>
                  )}
                  {product.isSale && (
                    <span className="bg-[#1E1E1E] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-xs">
                      SPECIAL OFFER
                    </span>
                  )}
                </div>

                {/* Wishlist Heart Button */}
                <button
                  onClick={(e) => toggleWishlist(e, product.id)}
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-[#FF6FA7] hover:bg-white hover:scale-110 transition-all shadow-xs"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      wishlistedIds[product.id] ? 'fill-[#FF6FA7]' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Content Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#999999] mb-1">
                    <span className="uppercase font-bold tracking-wider">{product.category}</span>
                    <div className="flex items-center space-x-1 text-[#FF6FA7]">
                      <Star className="w-3 h-3 fill-[#FF6FA7]" />
                      <span className="font-bold text-[#1E1E1E]">{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-base font-semibold text-[#1E1E1E] group-hover:text-[#FF6FA7] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#FDEEF3]">
                  <div>
                    <span className="text-sm font-bold text-[#1E1E1E]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#999999] line-through ml-2">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="btn-pink-luxury text-white p-2.5 rounded-full shadow-xs hover:scale-105 transition-transform"
                    title="Add to Shopping Bag"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

    </div>
  );
};
