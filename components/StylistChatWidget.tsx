import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send, Heart, ShieldCheck, Ruler, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';

interface StylistChatWidgetProps {
  onSelectProduct: (product: Product) => void;
  onOpenSizeGuide: () => void;
  onOpenStackBuilder: () => void;
}

export const StylistChatWidget: React.FC<StylistChatWidgetProps> = ({
  onSelectProduct,
  onOpenSizeGuide,
  onOpenStackBuilder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ sender: 'stylist' | 'user'; text: string; action?: 'size' | 'stack' | 'bestseller' }>
  >([
    {
      sender: 'stylist',
      text: "Bonjour! I'm Camille, your GLOW & CO. Personal Stylist 🌸 How may I assist your fine jewelry selection today?",
    },
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleSendQuick = (text: string, action?: 'size' | 'stack' | 'bestseller') => {
    setMessages((prev) => [...prev, { sender: 'user', text }]);

    setTimeout(() => {
      let replyText = "I would love to help you with that! 😊";
      if (action === 'size') {
        replyText = "I've launched our interactive Ring & Wrist Size Finder for you! You can slide your exact measurements to get a perfect fit.";
        onOpenSizeGuide();
      } else if (action === 'stack') {
        replyText = "Great choice! Opening our Jewelry Stack Builder canvas so you can layer rings & necklaces together.";
        onOpenStackBuilder();
      } else if (action === 'bestseller') {
        replyText = "Our top bestseller right now is the 18k Rose Gold Swarovski Solitaire Pendant! It pairs effortlessly with everyday couture.";
        onSelectProduct(PRODUCTS[0]);
      } else {
        replyText = "Thank you for reaching out! All GLOW & CO. pieces feature 18k Heavy Rose Gold Vermeil, 2-Year Warranty, and free velvet gift packaging.";
      }

      setMessages((prev) => [...prev, { sender: 'stylist', text: replyText, action }]);
    }, 600);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const text = inputVal;
    setInputVal('');
    handleSendQuick(text);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn-pink-luxury text-white p-4 rounded-full shadow-[0_15px_35px_rgba(255,111,167,0.4)] flex items-center space-x-2.5 group hover:scale-108 transition-all duration-300"
        >
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase hidden sm:inline-block pr-1">
            STYLIST ASSISTANT
          </span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="bg-white/95 backdrop-blur-xl border border-[rgba(233,170,194,0.35)] w-80 sm:w-96 rounded-2xl luxury-card-shadow overflow-hidden flex flex-col h-[500px] animate-fade-in">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#1F1418] via-[#2A1B22] to-[#361E2B] text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#E89AB5] flex items-center justify-center font-serif text-lg font-bold text-white shadow-inner">
                C
              </div>
              <div>
                <div className="text-xs font-bold tracking-wider uppercase flex items-center space-x-1">
                  <span>CAMILLE • SENIOR STYLIST</span>
                  <Sparkles className="w-3 h-3 text-[#FF6FA7]" />
                </div>
                <div className="text-[10px] text-[#E89AB5] uppercase flex items-center space-x-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span>ONLINE &amp; READY TO ASSIST</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FFF8FA]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[82%] p-3 rounded-2xl text-xs font-light leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-[#FF6FA7] text-white rounded-br-none font-medium'
                      : 'bg-white text-[#1E1E1E] border border-[rgba(233,170,194,0.3)] rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action Suggestions */}
          <div className="p-3 border-t border-[#FDEEF3] bg-white flex flex-wrap gap-2">
            <button
              onClick={() => handleSendQuick('Help me find my ring size', 'size')}
              className="text-[10px] font-bold uppercase tracking-wider bg-[#FDEEF3] text-[#FF6FA7] hover:bg-[#FF6FA7] hover:text-white px-3 py-1.5 rounded-full transition-colors flex items-center space-x-1"
            >
              <Ruler className="w-3 h-3" />
              <span>SIZE FINDER</span>
            </button>
            <button
              onClick={() => handleSendQuick('Show stack builder', 'stack')}
              className="text-[10px] font-bold uppercase tracking-wider bg-[#FDEEF3] text-[#FF6FA7] hover:bg-[#FF6FA7] hover:text-white px-3 py-1.5 rounded-full transition-colors flex items-center space-x-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>BUILD STACK</span>
            </button>
            <button
              onClick={() => handleSendQuick('What is your top bestseller?', 'bestseller')}
              className="text-[10px] font-bold uppercase tracking-wider bg-[#FDEEF3] text-[#FF6FA7] hover:bg-[#FF6FA7] hover:text-white px-3 py-1.5 rounded-full transition-colors"
            >
              BESTSELLER RECOMMENDATION
            </button>
          </div>

          {/* Input Bar */}
          <form onSubmit={handleInputSubmit} className="p-3 border-t border-[#FDEEF3] bg-white flex items-center space-x-2">
            <input
              type="text"
              placeholder="Ask a styling question..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-[#FFF8FA] border border-[rgba(233,170,194,0.3)] px-3 py-2 rounded-full text-xs focus:outline-none focus:border-[#FF6FA7]"
            />
            <button
              type="submit"
              className="p-2 bg-[#FF6FA7] hover:bg-[#E89AB5] text-white rounded-full transition-colors shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
