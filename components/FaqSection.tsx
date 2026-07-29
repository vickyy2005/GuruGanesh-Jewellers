import React, { useState } from 'react';
import { ChevronDown, Sparkles, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqs = [
    {
      question: "What is 18k Rose Gold Vermeil?",
      answer: "Vermeil (pronounced vehr-may) is a premium gold plating process. Unlike standard flash plating, our Vermeil pieces feature a thick layer of solid 18k Rose Gold (at least 2.5 microns thick) electroplated over a solid 925 Sterling Silver base for maximum longevity and hypoallergenic wear.",
      icon: Sparkles,
    },
    {
      question: "What does the 2-Year Fine Guarantee cover?",
      answer: "Every GLOW & CO. creation comes backed by our 2-Year Luxury Guarantee. This covers any manufacturing defects, gemstone resetting, surface refinishing, and clasp replacements free of charge.",
      icon: ShieldCheck,
    },
    {
      question: "How long does shipping take and is gift box packaging included?",
      answer: "All orders are processed within 24 hours. We offer free express insured worldwide shipping (3-5 business days). Every piece arrives beautifully presented in our signature velvet rose box with satin ribbon.",
      icon: Truck,
    },
    {
      question: "What is your return & exchange policy?",
      answer: "We offer 30-day hassle-free returns and exchanges. If your ring size needs adjusting or you wish to exchange a gift, return shipping is completely free within the US, UK, and EU.",
      icon: RefreshCw,
    },
    {
      question: "How should I care for my Swarovski & Rose Gold jewelry?",
      answer: "To preserve your jewelry's radiant luster, avoid exposing pieces to perfumes, harsh chemicals, or swimming pools. Clean gently with a soft micro-fiber cloth (included with your order).",
      icon: Heart,
    },
  ];

  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-[11px] tracking-[0.25em] font-bold text-[#E89AB5] uppercase block mb-1">
          NEED ASSISTANCE?
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-widest text-[#1E1E1E] uppercase">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <div className="w-16 h-0.5 bg-[#E89AB5] mx-auto mt-3 rounded-full" />
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const Icon = faq.icon;

          return (
            <div
              key={idx}
              className="bg-white border border-[rgba(233,170,194,0.25)] rounded-2xl luxury-card-shadow overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full p-5 text-left flex items-center justify-between space-x-4 focus:outline-none"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="p-2 bg-[#FDEEF3] text-[#FF6FA7] rounded-xl flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-serif text-lg sm:text-xl font-normal text-[#1E1E1E] tracking-wide">
                    {faq.question}
                  </span>
                </div>

                <ChevronDown
                  className={`w-5 h-5 text-[#FF6FA7] transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-6 pt-1 text-xs sm:text-sm text-[#666666] font-light leading-relaxed border-t border-[#FDEEF3]/60 bg-[#FFF8FA]/60 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
