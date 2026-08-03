import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { ProductReviewsSection } from './ProductReviewsSection';
import {
  Star,
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Check,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  X,
  ShoppingBag,
  ArrowLeft,
  ChevronDown,
  ZoomIn,
} from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number, variant?: string, size?: string) => void;
  onSelectProduct: (product: Product) => void;
  onBackToShop: () => void;
  onOpenSizeGuide?: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onAddToCart,
  onSelectProduct,
  onBackToShop,
  onOpenSizeGuide,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants?.[0] || '18k Rose Gold'
  );
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<'details' | 'shipping' | 'care' | null>('details');

  // Cursor zoom state & hover slideshow state
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number; show: boolean }>({ x: 0, y: 0, show: false });
  const [isZoomActive, setIsZoomActive] = useState<boolean>(false);
  const [isHoveringMainImage, setIsHoveringMainImage] = useState<boolean>(false);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImage(product.image);
    setSelectedVariant(product.variants?.[0] || '18k Rose Gold');
    setSelectedSize(product.sizes?.[0] || '');
    setQuantity(1);
    setIsWishlisted(false);
    setIsZoomActive(false);
  }, [product]);

  useEffect(() => {
    setIsZoomActive(false);
  }, [selectedImage]);

  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  // Auto-slide images when mouse cursor hovers over main image
  useEffect(() => {
    if (isHoveringMainImage && !isZoomActive && galleryImages.length > 1) {
      const interval = setInterval(() => {
        setSelectedImage((current) => {
          const currentIdx = galleryImages.indexOf(current);
          const nextIdx = (currentIdx + 1) % galleryImages.length;
          return galleryImages[nextIdx];
        });
      }, 1300);
      return () => clearInterval(interval);
    }
  }, [isHoveringMainImage, isZoomActive, galleryImages]);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = galleryImages.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setSelectedImage(galleryImages[nextIndex]);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = galleryImages.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[prevIndex]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomActive) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y, show: true });
  };

  const handleMouseLeave = () => {
    setZoomPos((prev) => ({ ...prev, show: false }));
  };

  // Related products in the same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const toggleAccordion = (section: 'details' | 'shipping' | 'care') => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="bg-[#FFF0F5] min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto animate-fade-in select-none">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-xs font-semibold tracking-widest text-[#666666] uppercase mb-8">
        <button onClick={onBackToShop} className="hover:text-[#FF6FA7] transition-colors flex items-center">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          SHOP
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#E89AB5]" />
        <span className="hover:text-[#FF6FA7] cursor-pointer" onClick={onBackToShop}>{product.category}</span>
        <ChevronRight className="w-3.5 h-3.5 text-[#E89AB5]" />
        <span className="text-[#1E1E1E] font-bold truncate">{product.name}</span>
      </div>

      {/* Main Ultra-Clean Product Layout (Split 2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-20">
        
        {/* Left Column: Image Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Image Container with Click-to-Activate Magnifier Zoom & Slide Arrows */}
          <div
            onClick={() => setIsZoomActive(!isZoomActive)}
            onMouseEnter={() => setIsHoveringMainImage(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              setIsHoveringMainImage(false);
              handleMouseLeave();
            }}
            className={`relative aspect-square w-full bg-[#FFF0F5]/50 rounded-2xl overflow-hidden group border transition-all duration-300 ${
              isZoomActive
                ? 'border-[#FF6FA7] shadow-lg cursor-zoom-out'
                : 'border-[rgba(233,170,194,0.25)] shadow-sm cursor-pointer'
            }`}
          >
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-200 ease-out will-change-transform"
              style={{
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                transform: isZoomActive && zoomPos.show ? 'scale(2.4)' : 'scale(1)',
              }}
              referrerPolicy="no-referrer"
            />

            {/* Click to Zoom Badge */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/60 text-[10px] font-bold text-[#1E1E1E] flex items-center space-x-1.5 shadow-xs pointer-events-none transition-all">
              <ZoomIn className={`w-3.5 h-3.5 ${isZoomActive ? 'text-[#FF6FA7] animate-pulse' : 'text-[#666666]'}`} />
              <span>{isZoomActive ? 'Zoom Active • Move Cursor (Click to Exit)' : 'Click Image to Zoom'}</span>
            </div>

            {/* Left Slide Arrow */}
            {galleryImages.length > 1 && (
              <button
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/85 hover:bg-white text-[#1E1E1E] hover:text-[#FF6FA7] rounded-full shadow-md transition-all duration-300 transform group-hover:scale-105"
                title="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Right Slide Arrow */}
            {galleryImages.length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/85 hover:bg-white text-[#1E1E1E] hover:text-[#FF6FA7] rounded-full shadow-md transition-all duration-300 transform group-hover:scale-105"
                title="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            {/* Expand Fullscreen Lightbox Button */}
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="absolute top-4 right-4 p-3 bg-white/85 hover:bg-white text-[#1E1E1E] hover:text-[#FF6FA7] rounded-full shadow-md transition-all duration-300"
              title="Expand Image"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Gallery Thumbnails Strip */}
          {galleryImages.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pt-1 no-scrollbar">
              {galleryImages.map((imgUrl, idx) => {
                const isSelected = selectedImage === imgUrl;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative w-18 h-18 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${
                      isSelected
                        ? 'border-[#FF6FA7] opacity-100 shadow-xs scale-102'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`${product.name} thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Clean Minimal Metadata & Action (5 cols) */}
        <div className="lg:col-span-5 space-y-6 pt-2">
          
          {/* Category Tag */}
          <div className="text-[11px] tracking-[0.25em] font-bold text-[#C98A9F] uppercase">
            GLOW &amp; CO. • {product.category}
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E1E1E] tracking-wide leading-tight">
            {product.name}
          </h1>

          {/* Price & Star Rating */}
          <div className="flex items-baseline justify-between border-b border-[#FDEEF3] pb-4">
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-bold text-[#1E1E1E]">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="text-sm text-[#999999] line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>

            <div className="flex items-center text-xs font-bold text-[#FF6FA7]">
              <Star className="w-4 h-4 fill-current mr-1" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-[#666666] font-normal ml-1">({product.reviewsCount || 64})</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#666666] font-light leading-relaxed">
            {product.description}
          </p>

          {/* Finish / Metal Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2">
              <label className="block text-[11px] font-bold tracking-wider text-[#1E1E1E] uppercase">
                FINISH: <span className="text-[#FF6FA7] font-normal">{selectedVariant}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => {
                  const isSel = selectedVariant === variant;
                  return (
                    <button
                      key={variant}
                      onClick={() => setSelectedVariant(variant)}
                      className={`text-xs px-4 py-2 rounded-full font-semibold transition-all ${
                        isSel
                          ? 'bg-[#FF6FA7] text-white shadow-xs'
                          : 'bg-white border border-[#E89AB5]/40 text-[#1E1E1E] hover:border-[#FF6FA7]'
                      }`}
                    >
                      {variant}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size Options */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold tracking-wider text-[#1E1E1E] uppercase">
                  SIZE: <span className="text-[#FF6FA7] font-normal">{selectedSize}</span>
                </label>
                {onOpenSizeGuide && (
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-[10px] font-bold text-[#FF6FA7] hover:underline uppercase tracking-wider"
                  >
                    SIZE GUIDE
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const isSel = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[42px] text-xs py-2 px-3 border rounded-xl font-bold transition-all ${
                        isSel
                          ? 'border-[#1E1E1E] bg-[#1E1E1E] text-white'
                          : 'border-[#E89AB5]/40 bg-white text-[#1E1E1E] hover:border-[#FF6FA7]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add To Bag & Wishlist Row */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center space-x-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-[rgba(233,170,194,0.4)] bg-white rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-3 text-[#1E1E1E] text-xs font-bold hover:bg-[#FDEEF3] rounded-l-full transition-colors"
                >
                  -
                </button>
                <span className="px-2.5 text-xs font-bold text-[#1E1E1E]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-3 text-[#1E1E1E] text-xs font-bold hover:bg-[#FDEEF3] rounded-r-full transition-colors"
                >
                  +
                </button>
              </div>

              {/* Primary Add to Bag Button */}
              <button
                onClick={() => onAddToCart(product, quantity, selectedVariant, selectedSize)}
                className="flex-1 btn-pink-luxury text-white text-xs font-bold tracking-[0.24em] uppercase py-4 rounded-full shadow-md flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD TO BAG • ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-3.5 border border-[rgba(233,170,194,0.4)] rounded-full transition-colors ${
                  isWishlisted ? 'bg-[#FDEEF3] text-[#FF6FA7]' : 'bg-white text-[#1E1E1E] hover:text-[#FF6FA7]'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#FF6FA7] text-[#FF6FA7]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Clean Collapsible Accordions for Details & Delivery */}
          <div className="border-t border-[#FDEEF3] pt-4 space-y-2 text-xs">
            
            {/* Details Accordion */}
            <div className="border-b border-[#FDEEF3] pb-3">
              <button
                onClick={() => toggleAccordion('details')}
                className="w-full flex items-center justify-between font-bold text-[#1E1E1E] uppercase tracking-wider py-1"
              >
                <span>PRODUCT DETAILS &amp; SPECS</span>
                <ChevronDown className={`w-4 h-4 text-[#FF6FA7] transition-transform ${openAccordion === 'details' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'details' && (
                <div className="pt-2 text-[#666666] font-light space-y-1.5 leading-relaxed">
                  <p>• 18k Rose Gold Vermeil (Solid 925 Sterling Silver base)</p>
                  <p>• Hand-set Swarovski crystals</p>
                  <p>• Includes signature velvet presentation box &amp; cleaning cloth</p>
                </div>
              )}
            </div>

            {/* Shipping Accordion */}
            <div className="border-b border-[#FDEEF3] pb-3">
              <button
                onClick={() => toggleAccordion('shipping')}
                className="w-full flex items-center justify-between font-bold text-[#1E1E1E] uppercase tracking-wider py-1"
              >
                <span>COMPLIMENTARY SHIPPING &amp; RETURNS</span>
                <ChevronDown className={`w-4 h-4 text-[#FF6FA7] transition-transform ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'shipping' && (
                <div className="pt-2 text-[#666666] font-light leading-relaxed">
                  Free express insured delivery (3-5 business days). Enjoy 30-day risk-free returns and size exchanges.
                </div>
              )}
            </div>

            {/* Care Accordion */}
            <div className="border-b border-[#FDEEF3] pb-3">
              <button
                onClick={() => toggleAccordion('care')}
                className="w-full flex items-center justify-between font-bold text-[#1E1E1E] uppercase tracking-wider py-1"
              >
                <span>2-YEAR FINE GUARANTEE</span>
                <ChevronDown className={`w-4 h-4 text-[#FF6FA7] transition-transform ${openAccordion === 'care' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'care' && (
                <div className="pt-2 text-[#666666] font-light leading-relaxed">
                  All GLOW &amp; CO. creations include our 2-Year warranty covering surface refinishing, stone tightening, and clasp maintenance.
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Verified Customer Reviews & Ratings Breakdown */}
      <ProductReviewsSection product={product} />

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 border-t border-[#FDEEF3] pt-12">
          <div className="text-center mb-8">
            <span className="text-[11px] tracking-[0.25em] font-bold text-[#C98A9F] uppercase block mb-1">
              CURATED PAIRINGS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1E1E1E] uppercase tracking-wide">
              YOU MAY ALSO ADORE
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectProduct(rel)}
                className="product-card-luxury bg-white border border-[rgba(233,170,194,0.2)] rounded-2xl p-4 cursor-pointer flex flex-col justify-between"
              >
                <div className="w-full aspect-square bg-[#FDEEF3] overflow-hidden rounded-xl mb-3 relative">
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="card-image w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#1E1E1E] hover:text-[#FF6FA7] transition-colors truncate">
                    {rel.name}
                  </h3>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-bold text-[#1E1E1E]">₹{rel.price.toLocaleString('en-IN')}</span>
                    <div className="flex items-center text-[11px] text-[#FF6FA7]">
                      <Star className="w-3 h-3 fill-current mr-0.5" />
                      <span>{rel.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20"
          >
            <X className="w-6 h-6" />
          </button>

          {galleryImages.length > 1 && (
            <button
              onClick={handlePrevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white p-3.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20"
              title="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {galleryImages.length > 1 && (
            <button
              onClick={handleNextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white p-3.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20"
              title="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          <img src={selectedImage} alt={product.name} className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl" />
        </div>
      )}

    </div>
  );
};
