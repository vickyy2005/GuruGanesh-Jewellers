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
  const [selectedMaterial, setSelectedMaterial] = useState<string>('ALL');
  const [selectedStone, setSelectedStone] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [wishlistedIds, setWishlistedIds] = useState<Record<string, boolean>>({});

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
    if (selectedMaterial !== 'ALL' && !p.material?.toLowerCase().includes(selectedMaterial.toLowerCase())) return false;
    if (selectedStone !== 'ALL' && !p.stoneDetails?.toLowerCase().includes(selectedStone.toLowerCase())) return false;
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

  const resetFilters = () => {
    setMaxPrice(20000);
    setSelectedMaterial('ALL');
    setSelectedStone('ALL');
    setInStockOnly(false);
    onCategoryChange('ALL');
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
      
      {/* Clean Unboxed Editorial Header */}
      <div className="text-center mb-10 space-y-3 pt-2">
        <span className="text-[11px] tracking-[0.3em] font-bold text-[#FF6FA7] uppercase flex items-center justify-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6FA7]" />
          <span>FINE HANDCRAFTED 18K VERMEIL</span>
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1E1E1E] tracking-wider uppercase">
          {selectedCategory === 'ALL'
            ? 'THE BOUTIQUE CATALOGUE'
            : selectedCategory === 'NEW'
            ? 'NEW ARRIVALS 2026'
            : selectedCategory === 'SALE'
            ? 'SPECIAL SALE SELECTIONS'
            : `${selectedCategory.toUpperCase()} COLLECTION`}
        </h1>

        <div className="w-16 h-0.5 bg-[#FF6FA7] mx-auto rounded-full" />

        <p className="text-xs sm:text-sm text-[#666666] font-light max-w-lg mx-auto leading-relaxed">
          Exquisite fine necklaces, halo solitaire rings, and huggie hoops crafted in heavy 18k Rose Gold Vermeil.
        </p>
      </div>

      {/* Main 2-Column Layout: Permanent Left Sidebar Filters (3 cols) + Right Product Grid (9 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side Permanent Filter Sidebar (3 cols) */}
        <aside className="lg:col-span-3 bg-white p-6 rounded-2xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow space-y-6 lg:sticky lg:top-24">
          
          <div className="flex items-center justify-between border-b border-[#FDEEF3] pb-4">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#1E1E1E] flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-[#FF6FA7]" />
              <span>BOUTIQUE FILTERS</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-[10px] font-bold text-[#FF6FA7] hover:underline uppercase flex items-center space-x-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>RESET</span>
            </button>
          </div>

          {/* 1. Category Selection */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold tracking-wider text-[#1E1E1E] uppercase">
              CATEGORIES
            </label>
            <div className="space-y-1">
              {categoriesWithCounts.map((cat) => {
                const isAct = selectedCategory === cat.val;
                return (
                  <button
                    key={cat.val}
                    onClick={() => onCategoryChange(cat.val)}
                    className={`w-full flex items-center justify-between text-xs px-3 py-2 rounded-xl font-bold transition-all text-left ${
                      isAct
                        ? 'bg-[#FF6FA7] text-white shadow-xs'
                        : 'text-[#666666] hover:bg-[#FFF0F5] hover:text-[#1E1E1E]'
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

          {/* 2. Price Range Slider */}
          <div className="space-y-2 border-t border-[#FDEEF3] pt-4">
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
              min="5000"
              max="20000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#FF6FA7]"
            />
            <div className="flex justify-between text-[10px] text-[#666666] font-semibold">
              <span>₹5,000</span>
              <span>₹20,000</span>
            </div>
          </div>

          {/* 3. Material Finish */}
          <div className="space-y-2 border-t border-[#FDEEF3] pt-4">
            <label className="block text-[11px] font-bold tracking-wider text-[#1E1E1E] uppercase">
              MATERIAL FINISH
            </label>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="w-full bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-xl p-2.5 text-xs font-semibold text-[#1E1E1E] focus:outline-none focus:border-[#FF6FA7]"
            >
              <option value="ALL">All Materials</option>
              <option value="Rose Gold">18k Rose Gold Vermeil</option>
              <option value="Silver">925 Sterling Silver</option>
              <option value="Brass">Gold Plated Brass</option>
            </select>
          </div>

          {/* 4. Gemstone Accents */}
          <div className="space-y-2 border-t border-[#FDEEF3] pt-4">
            <label className="block text-[11px] font-bold tracking-wider text-[#1E1E1E] uppercase">
              GEMSTONE ACCENTS
            </label>
            <select
              value={selectedStone}
              onChange={(e) => setSelectedStone(e.target.value)}
              className="w-full bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-xl p-2.5 text-xs font-semibold text-[#1E1E1E] focus:outline-none focus:border-[#FF6FA7]"
            >
              <option value="ALL">All Gemstones</option>
              <option value="Sapphire">Pink Sapphire</option>
              <option value="Quartz">Rose Quartz</option>
              <option value="Swarovski">Swarovski Crystals</option>
              <option value="Diamond">Pink Diamond Simulants</option>
            </select>
          </div>

          {/* 5. In-Stock Only Toggle */}
          <div className="border-t border-[#FDEEF3] pt-4">
            <label className="flex items-center space-x-2 text-xs font-semibold text-[#1E1E1E] cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-[#FF6FA7] w-4 h-4"
              />
              <span>In-Stock Pieces Only</span>
            </label>
          </div>

        </aside>

        {/* Right Side Product Grid (9 cols) */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Top Sort & Results Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 border border-[rgba(233,170,194,0.25)] rounded-2xl luxury-card-shadow gap-4">
            <div className="text-xs font-semibold text-[#666666]">
              Showing <span className="text-[#FF6FA7] font-bold">{filtered.length}</span> luxury pieces
            </div>

            <div className="flex items-center space-x-2 text-xs font-semibold text-[#1E1E1E]">
              <span className="text-[#666666] uppercase tracking-wider text-[10px]">SORT BY:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-xl px-3.5 py-2 text-xs font-bold text-[#1E1E1E] focus:outline-none focus:border-[#FF6FA7]"
              >
                <option value="featured">Featured Picks</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white border border-[rgba(233,170,194,0.2)] rounded-3xl p-8">
              <p className="text-lg font-serif text-[#1E1E1E] mb-2">No luxury pieces match your selected filter criteria.</p>
              <p className="text-xs text-[#666666] mb-6">Try adjusting your price range or reset active filters.</p>
              <button
                onClick={resetFilters}
                className="btn-pink-luxury text-white text-xs font-bold tracking-widest uppercase px-6 py-3.5 rounded-full shadow-md"
              >
                RESET ALL FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => {
                const isWish = wishlistedIds[product.id];
                return (
                  <div
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="product-card-luxury bg-white border border-[rgba(233,170,194,0.25)] rounded-2xl p-4 flex flex-col justify-between group relative cursor-pointer"
                  >
                    {/* Product Badges Overlay */}
                    <div className="absolute top-6 left-6 z-10 flex flex-col space-y-1">
                      {product.isBestseller && (
                        <span className="bg-[#1E1E1E] text-white text-[9px] uppercase font-bold px-2.5 py-0.5 tracking-wider rounded-full shadow-xs flex items-center space-x-1">
                          <Crown className="w-2.5 h-2.5 text-[#FF6FA7]" />
                          <span>BESTSELLER</span>
                        </span>
                      )}
                      {product.isSale && (
                        <span className="bg-[#FF6FA7] text-white text-[9px] uppercase font-bold px-2.5 py-0.5 tracking-wider rounded-full shadow-xs animate-pulse-glow">
                          SPECIAL SALE
                        </span>
                      )}
                      {product.isNew && (
                        <span className="bg-[#E89AB5] text-white text-[9px] uppercase font-bold px-2.5 py-0.5 tracking-wider rounded-full shadow-xs">
                          NEW ARRIVAL
                        </span>
                      )}
                    </div>

                    {/* Wishlist Heart Top Right */}
                    <button
                      onClick={(e) => toggleWishlist(e, product.id)}
                      className={`absolute top-6 right-6 z-10 p-2 rounded-full backdrop-blur-md transition-all ${
                        isWish
                          ? 'bg-[#FDEEF3] text-[#FF6FA7]'
                          : 'bg-white/80 text-[#1E1E1E] hover:text-[#FF6FA7]'
                      }`}
                      title="Save to Wishlist"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWish ? 'fill-[#FF6FA7] text-[#FF6FA7]' : ''}`} />
                    </button>

                    {/* Product Image Frame */}
                    <div className="w-full aspect-square bg-gradient-to-b from-[#FFF0F5] to-[#FDEEF3] overflow-hidden relative mb-4 rounded-xl shimmer-hover">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="card-image w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />

                      {/* Hover Quick View Overlay */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProduct(product);
                          }}
                          className="bg-white/95 text-[#1E1E1E] hover:bg-[#FF6FA7] hover:text-white text-[10px] font-bold tracking-widest uppercase px-4 py-2.5 rounded-full shadow-md transition-all flex items-center space-x-1.5 transform translate-y-2 group-hover:translate-y-0"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>QUICK VIEW</span>
                        </button>
                      </div>
                    </div>

                    {/* Product Metadata */}
                    <div className="space-y-1.5 mb-4">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#C98A9F]">
                        {product.material || '18K ROSE GOLD VERMEIL'}
                      </div>

                      <div className="flex items-start justify-between">
                        <h3 className="text-sm font-bold text-[#1E1E1E] group-hover:text-[#FF6FA7] transition-colors truncate pr-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center text-xs font-bold text-[#FF6FA7] flex-shrink-0">
                          <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                          <span>{product.rating.toFixed(1)}</span>
                        </div>
                      </div>

                      <div className="flex items-baseline space-x-2">
                        <span className="text-base font-bold text-[#1E1E1E]">₹{product.price.toLocaleString('en-IN')}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#999999] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                    </div>

                    {/* Add to Bag CTA */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="w-full btn-pink-luxury text-white text-[11px] font-bold tracking-[0.2em] uppercase py-3 rounded-xl shadow-xs flex items-center justify-center space-x-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>ADD TO BAG</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

        </main>

      </div>

      {/* Boutique Fine Guarantee Banner */}
      <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-6 bg-white rounded-2xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow flex flex-col items-center">
          <Truck className="w-6 h-6 text-[#FF6FA7] mb-2" />
          <h4 className="text-xs font-bold text-[#1E1E1E] uppercase tracking-wider mb-1">FREE INSURED DELIVERY</h4>
          <p className="text-[11px] text-[#666666]">Complimentary express shipping across India on orders over ₹2,999.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow flex flex-col items-center">
          <Gift className="w-6 h-6 text-[#FF6FA7] mb-2" />
          <h4 className="text-xs font-bold text-[#1E1E1E] uppercase tracking-wider mb-1">VELVET GIFT PACKAGING</h4>
          <p className="text-[11px] text-[#666666]">Includes signature rose velvet presentation box and satin ribbon.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow flex flex-col items-center">
          <ShieldCheck className="w-6 h-6 text-[#FF6FA7] mb-2" />
          <h4 className="text-xs font-bold text-[#1E1E1E] uppercase tracking-wider mb-1">2-YEAR FINE WARRANTY</h4>
          <p className="text-[11px] text-[#666666]">Full coverage for stone tightening, surface refinishing, &amp; free size exchanges.</p>
        </div>
      </section>

    </div>
  );
};
