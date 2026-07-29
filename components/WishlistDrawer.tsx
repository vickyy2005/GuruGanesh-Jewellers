import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none animate-fade-in">
      {/* Backdrop Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF0F5] border-l border-[rgba(233,170,194,0.3)] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 bg-white border-b border-[rgba(233,170,194,0.2)] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-[#FF6FA7] fill-[#FF6FA7]" />
              <h2 className="font-serif text-xl font-normal text-[#1E1E1E] uppercase tracking-wider">
                MY WISHLIST ({wishlistProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#666666] hover:text-[#FF6FA7] transition-colors rounded-full hover:bg-[#FFF0F5]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white border border-[rgba(233,170,194,0.3)] flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-[#C98A9F]" />
                </div>
                <h3 className="font-serif text-xl font-normal text-[#1E1E1E] uppercase">
                  YOUR WISHLIST IS EMPTY
                </h3>
                <p className="text-xs text-[#666666] max-w-xs mx-auto">
                  Explore our handcrafted 18k Rose Gold Vermeil collection and save your favorite pieces here.
                </p>
                <button
                  onClick={onClose}
                  className="btn-pink-luxury text-white text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-full shadow-md"
                >
                  EXPLORE CATALOGUE
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-2xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow flex space-x-4 items-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="w-20 h-20 object-cover rounded-xl cursor-pointer hover:scale-105 transition-transform border border-[rgba(233,170,194,0.2)]"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="font-serif text-sm font-semibold text-[#1E1E1E] truncate cursor-pointer hover:text-[#FF6FA7] transition-colors"
                    >
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-[#999999] truncate">{product.material}</p>
                    <div className="text-xs font-bold text-[#1E1E1E]">
                      ₹{product.price.toLocaleString('en-IN')}
                    </div>

                    <div className="flex items-center space-x-2 pt-1">
                      <button
                        onClick={() => onAddToCart(product)}
                        className="btn-pink-luxury text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full flex items-center space-x-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>ADD TO BAG</span>
                      </button>

                      <button
                        onClick={() => onRemoveFromWishlist(product.id)}
                        className="p-1.5 text-[#999999] hover:text-[#FF6FA7] transition-colors rounded-full hover:bg-[#FFF0F5]"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer CTA */}
          {wishlistProducts.length > 0 && (
            <div className="p-6 bg-white border-t border-[rgba(233,170,194,0.2)] space-y-3">
              <button
                onClick={() => {
                  wishlistProducts.forEach((p) => onAddToCart(p));
                  onClose();
                }}
                className="w-full btn-pink-luxury text-white text-xs font-bold tracking-[0.2em] uppercase py-3.5 rounded-full shadow-lg flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>MOVE ALL ITEMS TO BAG</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
