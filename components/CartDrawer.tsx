import React from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 100;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF8FA] text-[#1E1E1E] shadow-2xl flex flex-col justify-between border-l border-[rgba(233,170,194,0.3)] animate-slide-right">
          
          {/* Header */}
          <div className="p-6 border-b border-[rgba(233,170,194,0.25)] flex items-center justify-between bg-white">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#FF6FA7]" />
              <h2 className="font-serif text-xl tracking-wider uppercase font-semibold text-[#1E1E1E]">
                YOUR SHOPPING BAG ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#666666] hover:text-[#FF6FA7] hover:bg-[#FDEEF3] rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#FDEEF3]/70 px-6 py-3 border-b border-[rgba(233,170,194,0.25)]">
            {amountToFreeShipping > 0 ? (
              <p className="text-xs text-[#666666] text-center font-medium">
                Add <span className="font-bold text-[#1E1E1E]">${amountToFreeShipping.toFixed(2)}</span> more to unlock <span className="text-[#FF6FA7] font-bold">FREE Express Delivery</span>
              </p>
            ) : (
              <p className="text-xs text-[#FF6FA7] font-bold text-center uppercase tracking-wider">
                ✓ You have unlocked FREE Express Delivery!
              </p>
            )}
            <div className="w-full bg-[#E5DEC3]/40 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#E89AB5] to-[#FF6FA7] h-full transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-12 h-12 text-[#E89AB5] mx-auto stroke-1" />
                <p className="text-base font-serif text-[#1E1E1E]">Your shopping bag is currently empty.</p>
                <p className="text-xs text-[#666666]">Explore our handcrafted rose gold bestsellers.</p>
                <button
                  onClick={onClose}
                  className="btn-pink-luxury text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full mt-4"
                >
                  START EXPLORING
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="flex gap-4 border-b border-[rgba(233,170,194,0.2)] pb-4 bg-white p-3.5 rounded-xs luxury-card-shadow">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover bg-[#FDEEF3] rounded-xs flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xs font-bold text-[#1E1E1E]">
                          {item.product.name}
                        </h3>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#999999] hover:text-[#FF6FA7] transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[10px] text-[#666666] mt-0.5">
                        {item.product.category} {item.selectedVariant ? `• ${item.selectedVariant}` : ''} {item.selectedSize ? `• ${item.selectedSize}` : ''}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[rgba(233,170,194,0.3)] bg-white rounded-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2 py-1 text-[#1E1E1E] hover:bg-[#FDEEF3] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-bold text-[#1E1E1E]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="px-2 py-1 text-[#1E1E1E] hover:bg-[#FDEEF3] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#1E1E1E]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[rgba(233,170,194,0.25)] bg-white space-y-4">
              <div className="space-y-1.5 text-xs text-[#666666]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#1E1E1E]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Express Delivery</span>
                  <span>{amountToFreeShipping === 0 ? 'FREE' : '₹99'}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1E1E1E] pt-2 border-t border-[rgba(233,170,194,0.2)]">
                  <span>Total</span>
                  <span className="text-[#FF6FA7]">₹{(subtotal + (amountToFreeShipping === 0 ? 0 : 99)).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full btn-pink-luxury text-white text-xs font-bold tracking-[0.2em] uppercase py-4 rounded-full shadow-md flex items-center justify-center space-x-2"
              >
                <span>PROCEED TO EXPRESS CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[#999999] tracking-wide">
                Secured by 256-bit luxury SSL encryption. 30-day returns.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
