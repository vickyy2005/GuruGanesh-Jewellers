import React, { useState } from 'react';
import { Star, Instagram, Heart, Sparkles, CheckCircle2, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';

interface CustomerShowcaseSectionProps {
  onSelectProduct: (product: Product) => void;
}

export const CustomerShowcaseSection: React.FC<CustomerShowcaseSectionProps> = ({ onSelectProduct }) => {
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});

  const toggleLike = (id: number) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const showcasePosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
      username: "@sophia.monroe",
      rating: 5,
      comment: "Obsessed with my 18k Rose Gold Swarovski Pendant! The sparkle in golden hour light is unreal. ✨",
      productId: "prod-1",
      likes: 342,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
      username: "@elena_vogue",
      rating: 5,
      comment: "The stackable pave ring is my daily go-to. Received so many compliments at brunch today 💕",
      productId: "prod-4",
      likes: 519,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
      username: "@charlotte_atelier",
      rating: 5,
      comment: "The velvet box packaging made unboxing feel like absolute luxury. 10/10 fine quality! 🌸",
      productId: "prod-2",
      likes: 288,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1611591475118-29a39396f4fc?auto=format&fit=crop&q=80&w=800",
      username: "@camilla.design",
      rating: 5,
      comment: "Bought the blush crystal drop earrings for my wedding anniversary. Stunning craftsmanship!",
      productId: "prod-3",
      likes: 412,
    },
  ];

  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[rgba(233,170,194,0.25)]">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-[#FDEEF3] px-4 py-1 rounded-full text-xs font-bold text-[#FF6FA7] uppercase tracking-[0.2em] mb-2">
          <Instagram className="w-3.5 h-3.5" />
          <span>JOIN THE GLOW SOCIETY</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-widest text-[#1E1E1E] uppercase">
          SPOTTED IN GURU GANESH
        </h2>
        <p className="text-xs sm:text-sm text-[#666666] font-light max-w-md mx-auto mt-2">
          Tag @guruganesh_jewelry on Instagram to be featured on our official luxury boutique showcase.
        </p>
      </div>

      {/* Showcase Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {showcasePosts.map((post) => {
          const product = PRODUCTS.find((p) => p.id === post.productId) || PRODUCTS[0];
          const isLiked = likedPosts[post.id];

          return (
            <div
              key={post.id}
              className="bg-white border border-[rgba(233,170,194,0.25)] rounded-2xl overflow-hidden luxury-card-shadow flex flex-col justify-between group transition-all duration-500 hover:-translate-y-2"
            >
              {/* Photo Box */}
              <div className="w-full aspect-[4/5] bg-[#FDEEF3] relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.username}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Top Overlay Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="text-[10px] font-bold text-white uppercase bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 flex items-center space-x-1">
                    <span>{post.username}</span>
                    <CheckCircle2 className="w-3 h-3 text-[#FF6FA7]" />
                  </span>

                  <button
                    onClick={() => toggleLike(post.id)}
                    className="p-2 rounded-full bg-white/80 backdrop-blur-md text-[#1E1E1E] hover:text-[#FF6FA7] transition-all transform active:scale-125"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#FF6FA7] text-[#FF6FA7]' : ''}`} />
                  </button>
                </div>

                {/* Bottom Shop Hover Overlay */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="w-full bg-white/95 text-[#1E1E1E] hover:bg-[#FF6FA7] hover:text-white text-[11px] font-bold tracking-widest uppercase py-2.5 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>SHOP THIS LOOK (₹{product.price.toLocaleString('en-IN')})</span>
                  </button>
                </div>
              </div>

              {/* Review Text */}
              <div className="p-4 space-y-2">
                <div className="flex text-[#FF6FA7]">
                  {[...Array(post.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current mr-0.5" />
                  ))}
                </div>
                <p className="text-xs text-[#1E1E1E] font-light leading-relaxed line-clamp-3 italic">
                  "{post.comment}"
                </p>
                <div className="text-[10px] font-bold text-[#C98A9F] uppercase tracking-wider pt-1 border-t border-[#FDEEF3]">
                  VERIFIED BUYER • {isLiked ? post.likes + 1 : post.likes} LIKES
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};
