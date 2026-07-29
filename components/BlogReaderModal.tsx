import React from 'react';
import { BlogPost } from '../types';
import { X, Calendar, User, Clock } from 'lucide-react';

interface BlogReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" />

      <div className="relative bg-[#FAF8F5] max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl z-10 p-6 sm:p-10 border border-[#EBE6DD]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#F2EDE4] hover:bg-[#E2DACD] text-[#1C1917] rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="flex items-center space-x-4 text-xs text-[#78716C] border-b border-[#EBE6DD] pb-3">
            <span className="flex items-center"><User className="w-3.5 h-3.5 mr-1 text-[#C0A062]" /> {post.author}</span>
            <span className="flex items-center"><Calendar className="w-3.5 h-3.5 mr-1 text-[#C0A062]" /> {post.date}</span>
            <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-[#C0A062]" /> {post.readTime}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C1917]">
            {post.title}
          </h2>

          <p className="text-sm font-medium text-[#C0A062] uppercase tracking-wider">
            {post.subtitle}
          </p>

          <div className="w-full aspect-[16/9] overflow-hidden my-4 bg-[#F2EDE4]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="prose prose-stone text-xs sm:text-sm font-light text-[#44403C] space-y-4 leading-relaxed">
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.trim().startsWith('###')) {
                return (
                  <h3 key={idx} className="font-serif text-lg font-bold text-[#1C1917] pt-2">
                    {paragraph.replace('###', '').trim()}
                  </h3>
                );
              }
              return <p key={idx}>{paragraph.trim()}</p>;
            })}
          </div>

          <div className="pt-6 border-t border-[#EBE6DD] text-center">
            <button
              onClick={onClose}
              className="bg-[#1C1917] hover:bg-[#38332E] text-white text-xs font-semibold tracking-widest uppercase px-8 py-3"
            >
              CLOSE ARTICLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
