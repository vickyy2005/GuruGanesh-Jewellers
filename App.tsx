import React, { useState } from 'react';
import { PRODUCTS, BLOG_POSTS } from './data';
import { Product, CartItem, BlogPost, ToastMessage } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
import { BestsellersSection } from './components/BestsellersSection';
import { PromoBanner } from './components/PromoBanner';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { BlogReaderModal } from './components/BlogReaderModal';
import { SearchModal } from './components/SearchModal';
import { InfoModal } from './components/InfoModal';
import { Toast } from './components/Toast';
import { CustomCursor } from './components/CustomCursor';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ShopPage } from './components/ShopPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { StackBuilderModal } from './components/StackBuilderModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CustomerShowcaseSection } from './components/CustomerShowcaseSection';
import { StylistChatWidget } from './components/StylistChatWidget';
import { FaqSection } from './components/FaqSection';
import { LuxuryPreloader } from './components/LuxuryPreloader';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ScrollFadeSection } from './components/ScrollFadeSection';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<'home' | 'shop' | 'product-detail' | 'about' | 'contact'>('home');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-1', 'prod-3']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStackBuilderOpen, setIsStackBuilderOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);
  const [infoModalData, setInfoModalData] = useState<{ title: string; content: string } | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Trigger Toast Notification
  const showToast = (title: string, message: string) => {
    const id = Date.now().toString();
    setToast({ id, title, message });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3500);
  };

  // Add item to shopping bag
  const handleAddToCart = (
    product: Product,
    quantityToAdd: number = 1,
    variant?: string,
    size?: string
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant === variant &&
          item.selectedSize === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantityToAdd;
        return updated;
      }
      return [
        ...prev,
        {
          product,
          quantity: quantityToAdd,
          selectedVariant: variant,
          selectedSize: size,
        },
      ];
    });

    const variantText = variant ? ` (${variant}${size ? `, ${size}` : ''})` : '';
    showToast('Added to Shopping Bag 💕', `${quantityToAdd}x ${product.name}${variantText}`);
  };

  // Add multiple items from stack builder
  const handleAddStackToCart = (products: Product[]) => {
    products.forEach((p) => {
      handleAddToCart(p, 1);
    });
    showToast('Custom Stack Added! ✨', `${products.length} luxury pieces added to your shopping bag.`);
  };

  // Update item quantity in bag
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove item from bag
  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item Removed', 'Product removed from your shopping bag.');
  };

  // Wishlist Toggle
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const isSaved = prev.includes(productId);
      if (isSaved) {
        showToast('Removed from Wishlist', 'Item removed from saved favorites.');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist 💕', 'Item added to your saved favorites.');
        return [...prev, productId];
      }
    });
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  // Handle Checkout simulation
  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Open Dedicated Product Details View
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Category selection
  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    if (activeView === 'home') {
      const section = document.getElementById('bestsellers-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      } else {
        setActiveView('shop');
      }
    }
  };

  // Filter products for homepage section
  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'NEW') return p.isNew || p.isBestseller;
    if (activeCategory === 'SALE') return p.isSale || (p.originalPrice && p.originalPrice > p.price);
    if (activeCategory === 'Summer') return p.isSummerCollection;
    return p.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF0F5] text-[#1E1E1E] selection:bg-[#E89AB5] selection:text-white">
      {/* Initial Website Preloader Screen */}
      {isLoading && <LuxuryPreloader onComplete={() => setIsLoading(false)} />}

      {/* Custom Pink Magnetic Follower Cursor */}
      <CustomCursor />

      {/* Floating Glassmorphism Header */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectCategory={handleSelectCategory}
        activeCategory={activeCategory}
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenStackBuilder={() => setIsStackBuilderOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenAbout={() =>
          setInfoModalData({
            title: 'ABOUT GLOW & CO.',
            content:
              'GLOW & CO. was founded with a vision to redefine everyday fine luxury. Every piece is handcrafted in heavy 18k Rose Gold Vermeil (2.5+ microns over solid 925 Sterling Silver) with hand-selected crystal accents. We are committed to 100% ethical sourcing, carbon-neutral shipping, and fair artisan craftsmanship.',
          })
        }
        onOpenContact={() =>
          setInfoModalData({
            title: 'CONTACT US & CONCIERGE',
            content:
              'Our luxury jewelry concierge is available 7 days a week to assist you with custom sizes, order tracking, styling advice, and gift recommendations.\n\nEmail: concierge@glowandco.com\nPhone / WhatsApp: +91 98765 43210\nHours: 10:00 AM – 8:00 PM IST',
          })
        }
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'product-detail' && selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            onBackToShop={() => setActiveView('shop')}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          />
        ) : activeView === 'shop' ? (
          <ShopPage
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            selectedCategory={activeCategory}
            onCategoryChange={(cat) => setActiveCategory(cat)}
          />
        ) : activeView === 'about' ? (
          <AboutPage
            onExploreShop={() => {
              setActiveView('shop');
              setActiveCategory('ALL');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : activeView === 'contact' ? (
          <ContactPage />
        ) : (
          <>
            {/* 1. Hero Banner */}
            <Hero
              onExplore={() => {
                setActiveView('shop');
                setActiveCategory('ALL');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenStackBuilder={() => setIsStackBuilderOpen(true)}
            />

            {/* 2. Main Categories Grid */}
            <CategoriesSection
              onSelectCategory={(catName) => {
                setActiveView('shop');
                setActiveCategory(catName);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 3. Luxury Bestsellers & Product Cards */}
            <BestsellersSection
              products={filteredProducts}
              onAddToCart={(product) => handleAddToCart(product, 1)}
              onSelectProduct={handleSelectProduct}
              activeFilter={activeCategory}
              onViewAllShop={() => {
                setActiveView('shop');
                setActiveCategory('ALL');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 4. Promotional Summer Banner */}
            <PromoBanner
              onShopSummer={() => {
                setActiveView('shop');
                setActiveCategory('Summer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 5. Customer Instagram Showcase */}
            <CustomerShowcaseSection onSelectProduct={handleSelectProduct} />

            {/* 6. Style & Craftsmanship Journal */}
            <BlogSection onReadPost={(post) => setReadingPost(post)} />

            {/* 7. Interactive FAQ Accordion */}
            <FaqSection />
          </>
        )}
      </main>

      {/* Luxury Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveView('shop');
          setActiveCategory(cat);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenModal={(title, content) => setInfoModalData({ title, content })}
      />

      {/* Floating Jewelry Stylist Assistant Chat Widget (Visible ONLY after preloader finishes) */}
      {!isLoading && (
        <StylistChatWidget
          onSelectProduct={handleSelectProduct}
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
          onOpenStackBuilder={() => setIsStackBuilderOpen(true)}
        />
      )}

      {/* Interactive Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={(id) => handleToggleWishlist(id)}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        onSelectProduct={handleSelectProduct}
      />

      {/* Express Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onClearCart={() => setCart([])}
      />

      {/* Jewelry Stack Builder Modal */}
      <StackBuilderModal
        isOpen={isStackBuilderOpen}
        onClose={() => setIsStackBuilderOpen(false)}
        onAddStackToCart={handleAddStackToCart}
        onSelectProduct={handleSelectProduct}
      />

      {/* Ring & Wrist Size Guide Finder Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Blog Article Reader Modal */}
      <BlogReaderModal
        post={readingPost}
        onClose={() => setReadingPost(null)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      {/* Info / Policy Modal */}
      <InfoModal
        title={infoModalData?.title || null}
        content={infoModalData?.content || null}
        onClose={() => setInfoModalData(null)}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}
