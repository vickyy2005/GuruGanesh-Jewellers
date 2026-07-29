import React from 'react';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';
import { ArrowRight, BookOpen } from 'lucide-react';

interface BlogSectionProps {
  onReadPost: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onReadPost }) => {
  return (
    <section className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      <div className="text-center mb-12">
        <span className="text-[11px] tracking-[0.25em] font-bold text-[#E89AB5] uppercase block mb-1">
          STYLE &amp; CRAFTSMANSHIP
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-widest text-[#1E1E1E] uppercase">
          THE GLOW JOURNAL
        </h2>
        <div className="w-16 h-0.5 bg-[#E89AB5] mx-auto mt-3 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <div
            key={post.id}
            onClick={() => onReadPost(post)}
            className="group cursor-pointer bg-white border border-[rgba(233,170,194,0.22)] rounded-xs p-4 luxury-card-shadow flex flex-col justify-between transition-all duration-500 hover:-translate-y-2"
          >
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-[#FDEEF3] rounded-xs mb-4 relative shimmer-hover">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#1E1E1E] text-[10px] uppercase font-bold px-2.5 py-1 rounded-xs shadow-xs">
                  {post.readTime}
                </span>
              </div>

              <div className="text-[11px] font-bold text-[#C98A9F] uppercase tracking-wider mb-1">
                {post.date} • By {post.author}
              </div>

              <h3 className="font-serif text-2xl font-normal text-[#1E1E1E] group-hover:text-[#FF6FA7] transition-colors mb-2 leading-snug">
                {post.title}
              </h3>

              <p className="text-xs text-[#666666] font-light leading-relaxed line-clamp-2 mb-4">
                {post.subtitle}
              </p>
            </div>

            <div className="pt-2 border-t border-[rgba(233,170,194,0.2)]">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#1E1E1E] group-hover:text-[#FF6FA7] transition-colors flex items-center">
                <span>READ ARTICLE</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 transform group-hover:translate-x-1.5 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
