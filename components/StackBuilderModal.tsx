import React, { useState } from 'react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { X, Sparkles, ShoppingBag, Plus, Trash2, Layers, Check } from 'lucide-react';

interface StackBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStackToCart: (products: Product[]) => void;
  onSelectProduct: (product: Product) => void;
}

export const StackBuilderModal: React.FC<StackBuilderModalProps> = ({
  isOpen,
  onClose,
  onAddStackToCart,
  onSelectProduct,
}) => {
  const [selectedStack, setSelectedStack] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<'Rings' | 'Necklaces' | 'Bracelets'>('Rings');

  if (!isOpen) return null;

  const categoryProducts = PRODUCTS.filter(
    (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
  );

  const toggleProductInStack = (product: Product) => {
    const exists = selectedStack.find((p) => p.id === product.id);
    if (exists) {
      setSelectedStack((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      if (selectedStack.length >= 4) return;
      setSelectedStack((prev) => [...prev, product]);
    }
  };

  const totalPrice = selectedStack.reduce((sum, p) => sum + p.price, 0);

  const handleAddAll = () => {
    if (selectedStack.length === 0) return;
    onAddStackToCart(selectedStack);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white border border-[rgba(233,170,194,0.3)] w-full max-w-4xl rounded-2xl luxury-card-shadow overflow-hidden flex flex-col max-h-[90vh] relative">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#FDEEF3] bg-[#FFF8FA] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-[#FDEEF3] text-[#FF6FA7] rounded-full">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1E1E1E] uppercase tracking-wider">
                JEWELRY STACK BUILDER
              </h2>
              <p className="text-xs text-[#666666] font-light">
                Combine up to 4 pieces to create your custom signature stack
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#999999] hover:text-[#1E1E1E] rounded-full hover:bg-[#FDEEF3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Split 2 columns */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Product Selector (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Category Tabs */}
            <div className="flex space-x-2 border-b border-[#FDEEF3] pb-3">
              {(['Rings', 'Necklaces', 'Bracelets'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-full transition-all ${
                    activeCategory === cat
                      ? 'bg-[#FF6FA7] text-white shadow-md'
                      : 'bg-[#FDEEF3] text-[#1E1E1E] hover:bg-[#E89AB5] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Available Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {categoryProducts.map((p) => {
                const isSelected = selectedStack.some((item) => item.id === p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => toggleProductInStack(p)}
                    className={`relative p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'border-[#FF6FA7] bg-[#FFF0F5] shadow-md scale-102'
                        : 'border-[rgba(233,170,194,0.3)] bg-white hover:border-[#E89AB5]'
                    }`}
                  >
                    <div className="w-full aspect-square bg-[#FDEEF3] rounded-lg overflow-hidden mb-2 relative">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-[#FF6FA7] text-white p-1 rounded-full shadow-md">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                    <div className="text-xs font-bold text-[#1E1E1E] truncate">{p.name}</div>
                    <div className="text-xs font-semibold text-[#FF6FA7]">₹{p.price.toLocaleString('en-IN')}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Stack Canvas Preview & Total (5 cols) */}
          <div className="lg:col-span-5 bg-[#FFF8FA] p-6 rounded-2xl border border-[rgba(233,170,194,0.3)] flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C98A9F]">
                  YOUR CUSTOM STACK ({selectedStack.length}/4)
                </span>
                {selectedStack.length > 0 && (
                  <button
                    onClick={() => setSelectedStack([])}
                    className="text-[10px] text-[#FF6FA7] hover:underline uppercase font-bold"
                  >
                    CLEAR STACK
                  </button>
                )}
              </div>

              {/* Stack Preview Canvas */}
              {selectedStack.length === 0 ? (
                <div className="h-64 border-2 border-dashed border-[#E89AB5]/40 rounded-xl flex flex-col items-center justify-center text-center p-6 text-[#999999]">
                  <Sparkles className="w-8 h-8 text-[#E89AB5] mb-2 animate-bounce" />
                  <p className="text-xs font-medium">Select pieces from the left to layer &amp; stack together.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {selectedStack.map((item, idx) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-white rounded-xl border border-[rgba(233,170,194,0.3)] shadow-2xs"
                    >
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <span className="w-5 h-5 rounded-full bg-[#FDEEF3] text-[#FF6FA7] text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </span>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="truncate">
                          <div className="text-xs font-bold truncate text-[#1E1E1E]">{item.name}</div>
                          <div className="text-[11px] text-[#FF6FA7] font-semibold">₹{item.price.toLocaleString('en-IN')}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleProductInStack(item)}
                        className="p-1.5 text-[#999999] hover:text-[#FF6FA7] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total & Checkout Stack Action */}
            <div className="pt-4 border-t border-[rgba(233,170,194,0.3)] space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">STACK TOTAL:</span>
                <span className="text-2xl font-bold text-[#1E1E1E]">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>

              <button
                disabled={selectedStack.length === 0}
                onClick={handleAddAll}
                className="w-full btn-pink-luxury text-white text-xs font-bold tracking-[0.24em] uppercase py-4 rounded-full shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD ENTIRE STACK TO BAG</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
