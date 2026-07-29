import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { X, Star, ShieldCheck, Truck, RefreshCw, Check, Sparkles, ChevronDown, Heart } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, variant?: string, size?: string) => void;
  onSelectProduct?: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'shipping'>('details');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Initialize modal state when product changes
  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setSelectedVariant(product.variants?.[0] || '18k Yellow Gold');
      setSelectedSize(product.sizes?.[0] || '');
      setQuantity(1);
      setActiveTab('details');
      setIsWishlisted(false);
    }
  }, [product]);

  if (!product) return null;

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleAdd = (buyNow = false) => {
    onAddToCart(product, quantity, selectedVariant, selectedSize);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative bg-[#FAF8F5] max-w-4xl w-full rounded-xs overflow-hidden shadow-2xl z-10 border border-[#EBE6DD] max-h-[92vh] flex flex-col md:flex-row animate-modal-zoom">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 bg-white/90 hover:bg-white text-[#1C1917] transition-all rounded-full shadow-md hover:rotate-90 duration-300"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery & Thumbnails */}
        <div className="md:w-1/2 bg-[#F3EEE6] p-4 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EBE6DD]">
          {/* Main Selected Image */}
          <div className="relative aspect-square w-full bg-[#EAE3D6] overflow-hidden rounded-xs mb-4 group shadow-sm">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-10">
              {product.isBestseller && (
                <span className="bg-[#1C1917] text-white text-[10px] uppercase font-semibold px-2.5 py-1 tracking-widest shadow-xs">
                  Bestseller
                </span>
              )}
              {product.isSale && (
                <span className="bg-[#B85C38] text-white text-[10px] uppercase font-semibold px-2.5 py-1 tracking-widest shadow-xs animate-pulse-glow">
                  Special Sale
                </span>
              )}
              {product.isNew && (
                <span className="bg-[#C0A062] text-white text-[10px] uppercase font-semibold px-2.5 py-1 tracking-widest shadow-xs">
                  New Arrival
                </span>
              )}
            </div>

            {/* Wishlist toggle */}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="absolute bottom-3 right-3 p-2.5 bg-white/80 hover:bg-white rounded-full transition-colors text-[#1C1917] shadow-sm"
              title="Add to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#B85C38] text-[#B85C38]' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Selector Strip */}
          {galleryImages.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-1">
              {galleryImages.map((imgUrl, idx) => {
                const isSelected = selectedImage === imgUrl;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative w-16 h-16 rounded-xs overflow-hidden flex-shrink-0 border-2 transition-all ${
                      isSelected ? 'border-[#C0A062] scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`${product.name} thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Full Product Specs & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto max-h-[85vh] md:max-h-[90vh] flex flex-col justify-between space-y-6">
          <div>
            {/* Category & Title */}
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] tracking-[0.2em] font-semibold text-[#C0A062] uppercase">
                GLOW &amp; CO. {product.category}
              </span>
              <span className="text-[11px] font-medium text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-full flex items-center">
                <span className="w-1.5 h-1.5 bg-[#166534] rounded-full mr-1.5 animate-ping" />
                In Stock
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1917] tracking-wide mb-2">
              {product.name}
            </h1>

            {/* Ratings & Price */}
            <div className="flex items-center justify-between border-b border-[#EBE6DD] pb-4 mb-5">
              <div className="flex items-center space-x-2">
                <div className="flex text-[#C0A062]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#1C1917]">{product.rating.toFixed(1)}</span>
                <span className="text-xs text-[#78716C]">({product.reviewsCount || 128} reviews)</span>
              </div>

              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-[#1C1917]">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-[#A8A29E] line-through">${product.originalPrice}</span>
                )}
              </div>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-[#57534E] font-light leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Metal / Color Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-5">
                <label className="block text-[11px] font-semibold tracking-wider text-[#1C1917] uppercase mb-2">
                  Metal Finish: <span className="text-[#C0A062] font-normal">{selectedVariant}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => {
                    const isSel = selectedVariant === variant;
                    return (
                      <button
                        key={variant}
                        onClick={() => setSelectedVariant(variant)}
                        className={`text-xs px-3.5 py-2 border rounded-xs font-medium transition-all ${
                          isSel
                            ? 'border-[#C0A062] bg-[#F5EFE4] text-[#1C1917] font-semibold shadow-2xs'
                            : 'border-[#D1C9BC] bg-white text-[#57534E] hover:border-[#C0A062]'
                        }`}
                      >
                        {isSel && <Check className="w-3 h-3 inline-block mr-1 text-[#C0A062]" />}
                        {variant}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Options (For Rings or Bracelets) */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-semibold tracking-wider text-[#1C1917] uppercase">
                    Select Size: <span className="text-[#C0A062] font-normal">{selectedSize}</span>
                  </label>
                  <span className="text-[10px] text-[#78716C] underline cursor-pointer hover:text-[#C0A062]">
                    Size Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const isSel = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[42px] text-xs py-2 px-3 border rounded-xs font-medium transition-all ${
                          isSel
                            ? 'border-[#C0A062] bg-[#1C1917] text-white font-semibold'
                            : 'border-[#D1C9BC] bg-white text-[#1C1917] hover:border-[#C0A062]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Interactive Accordion Tabs */}
            <div className="border-t border-b border-[#EBE6DD] py-2 mb-6">
              <div className="flex border-b border-[#EBE6DD] space-x-6">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`text-xs tracking-wider uppercase font-semibold py-2.5 border-b-2 transition-all ${
                    activeTab === 'details'
                      ? 'border-[#C0A062] text-[#C0A062]'
                      : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  Highlights &amp; Specs
                </button>
                <button
                  onClick={() => setActiveTab('materials')}
                  className={`text-xs tracking-wider uppercase font-semibold py-2.5 border-b-2 transition-all ${
                    activeTab === 'materials'
                      ? 'border-[#C0A062] text-[#C0A062]'
                      : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  Materials &amp; Care
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`text-xs tracking-wider uppercase font-semibold py-2.5 border-b-2 transition-all ${
                    activeTab === 'shipping'
                      ? 'border-[#C0A062] text-[#C0A062]'
                      : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  Shipping &amp; Returns
                </button>
              </div>

              {/* Tab Content */}
              <div className="py-4 min-h-[90px]">
                {activeTab === 'details' && (
                  <ul className="space-y-1.5 text-xs text-[#57534E] leading-relaxed">
                    {product.details?.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <Sparkles className="w-3.5 h-3.5 text-[#C0A062] mr-2 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === 'materials' && (
                  <p className="text-xs text-[#57534E] leading-relaxed">
                    {product.materialsCare ||
                      'Handcrafted using premium ethically-sourced materials. Clean with a soft lint-free cloth and store in your GLOW & CO. velvet pouch.'}
                  </p>
                )}

                {activeTab === 'shipping' && (
                  <p className="text-xs text-[#57534E] leading-relaxed">
                    {product.shippingReturns ||
                      'Complimentary express shipping on orders over $50. We offer a 30-day risk-free return and exchange policy.'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-[#D1C9BC] bg-white rounded-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-3 text-[#1C1917] text-sm hover:bg-[#F2EDE4] font-medium transition-colors"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-[#1C1917]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-3 text-[#1C1917] text-sm hover:bg-[#F2EDE4] font-medium transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={() => handleAdd(false)}
                className="flex-1 bg-[#C0A062] hover:bg-[#A88849] active:bg-[#93753A] text-white text-xs font-bold tracking-[0.2em] uppercase py-3.5 transition-all shadow-md hover:shadow-lg focus:outline-none"
              >
                ADD TO BAG • ${(product.price * quantity).toFixed(2)}
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={() => handleAdd(true)}
              className="w-full bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-bold tracking-[0.2em] uppercase py-3 transition-colors rounded-xs shadow-xs"
            >
              BUY NOW WITH EXPRESS CHECKOUT
            </button>

            {/* Guarantee Pills */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#EBE6DD] text-[10px] text-[#78716C] text-center">
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-[#C0A062] mb-1" />
                <span>Fast Worldwide Delivery</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-[#C0A062] mb-1" />
                <span>2-Year Fine Guarantee</span>
              </div>
              <div className="flex flex-col items-center">
                <RefreshCw className="w-4 h-4 text-[#C0A062] mb-1" />
                <span>30-Day Easy Returns</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
