import React, { useState } from 'react';
import { Star, CheckCircle2, ThumbsUp, MessageSquarePlus, X, Send } from 'lucide-react';
import { Product } from '../types';

interface ProductReviewsSectionProps {
  product: Product;
}

interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpfulCount: number;
  isVerified: boolean;
}

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({ product }) => {
  const [reviewsList, setReviewsList] = useState<Review[]>([
    {
      id: 'rev-1',
      author: 'Priya Sharma',
      location: 'Mumbai, MH',
      rating: 5,
      date: '2 weeks ago',
      title: 'Exquisite Rose Gold Finish! ✨',
      content: 'The 18k Rose Gold Vermeil shine is breathtaking. Received so many compliments at a family wedding. Packaging with the velvet pouch was top tier!',
      helpfulCount: 24,
      isVerified: true,
    },
    {
      author: 'Ananya Verma',
      location: 'New Delhi, DL',
      rating: 5,
      date: '1 month ago',
      title: 'Perfection in every detail',
      content: 'I was hesitant to buy fine jewelry online, but GLOW & CO surpassed all expectations. The stones have incredible sparkle under golden hour light.',
      helpfulCount: 18,
      isVerified: true,
      id: 'rev-2',
    },
    {
      author: 'Rohan Mehta',
      location: 'Bengaluru, KA',
      rating: 5,
      date: '1 month ago',
      title: 'Best Anniversary Gift Ever 🌹',
      content: 'Gifted this piece to my wife for our 3rd anniversary. She adored the custom laser engraving! Delivery was super fast within 2 days.',
      helpfulCount: 15,
      isVerified: true,
      id: 'rev-3',
    },
    {
      author: 'Meera Kapoor',
      location: 'Jaipur, RJ',
      rating: 4,
      date: '2 months ago',
      title: 'Delicate & Elegant',
      content: 'Very high quality vermeil finish. Lightweight enough for daily wear at the atelier.',
      helpfulCount: 9,
      isVerified: true,
      id: 'rev-4',
    },
  ]);

  const [helpfulLiked, setHelpfulLiked] = useState<Record<string, boolean>>({});
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const toggleHelpful = (id: string) => {
    setHelpfulLiked((prev) => {
      const isAlready = prev[id];
      setReviewsList((list) =>
        list.map((r) =>
          r.id === id ? { ...r, helpfulCount: isAlready ? r.helpfulCount - 1 : r.helpfulCount + 1 } : r
        )
      );
      return { ...prev, [id]: !isAlready };
    });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newContent) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      location: 'India',
      rating: newRating,
      date: 'Just now',
      title: newTitle || 'Wonderful Piece',
      content: newContent,
      helpfulCount: 0,
      isVerified: true,
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsWriteModalOpen(false);
    setNewAuthor('');
    setNewTitle('');
    setNewContent('');
  };

  const overallRating = product.rating || 4.9;
  const totalCount = (product.reviewsCount || 64) + (reviewsList.length - 4);

  return (
    <section className="mt-16 border-t border-[#FDEEF3] pt-12 select-none">
      
      {/* Section Title */}
      <div className="text-center mb-10">
        <span className="text-[11px] tracking-[0.25em] font-bold text-[#C98A9F] uppercase block mb-1">
          VERIFIED CUSTOMER FEEDBACK
        </span>
        <h2 className="font-serif text-3xl font-normal text-[#1E1E1E] uppercase tracking-wide">
          CUSTOMER REVIEWS &amp; RATINGS
        </h2>
      </div>

      {/* Ratings Breakdown Summary Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-white p-6 sm:p-8 rounded-2xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow mb-10 items-center">
        
        {/* Rating Score Box (4 cols) */}
        <div className="md:col-span-4 text-center md:border-r border-[#FDEEF3] md:pr-6 space-y-2">
          <div className="text-5xl font-bold text-[#1E1E1E] tracking-tight">{overallRating.toFixed(1)}</div>
          <div className="flex justify-center text-[#FF6FA7]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <div className="text-xs text-[#666666] font-medium">
            OUT OF 5 STAR RATING
          </div>
          <div className="text-[11px] font-bold text-[#C98A9F] uppercase tracking-wider">
            BASED ON {totalCount} REVIEWS
          </div>
        </div>

        {/* Rating Distribution Bar Chart (5 cols) */}
        <div className="md:col-span-5 space-y-2 text-xs">
          {[
            { stars: '5 Star', pct: '88%' },
            { stars: '4 Star', pct: '9%' },
            { stars: '3 Star', pct: '2%' },
            { stars: '2 Star', pct: '1%' },
            { stars: '1 Star', pct: '0%' },
          ].map((row, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <span className="w-12 text-[11px] font-bold text-[#1E1E1E] flex-shrink-0">{row.stars}</span>
              <div className="flex-1 bg-[#FDEEF3] h-2 rounded-full overflow-hidden">
                <div className="bg-[#FF6FA7] h-full rounded-full" style={{ width: row.pct }} />
              </div>
              <span className="w-8 text-[11px] text-[#666666] font-semibold text-right">{row.pct}</span>
            </div>
          ))}
        </div>

        {/* Action Column (3 cols) */}
        <div className="md:col-span-3 flex flex-col items-center justify-center space-y-3 md:pl-4">
          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="w-full btn-pink-luxury text-white text-xs font-bold tracking-widest uppercase py-3.5 px-4 rounded-full shadow-md flex items-center justify-center space-x-2"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>WRITE A REVIEW</span>
          </button>
          <div className="text-[10px] text-[#666666] text-center flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
            <span>Verified Purchase Reviews Only</span>
          </div>
        </div>

      </div>

      {/* Customer Reviews Feed */}
      <div className="space-y-4">
        {reviewsList.map((rev) => (
          <div
            key={rev.id}
            className="bg-white p-6 rounded-2xl border border-[rgba(233,170,194,0.22)] shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-[#FDEEF3] text-[#FF6FA7] font-bold text-xs flex items-center justify-center uppercase">
                  {rev.author[0]}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-[#1E1E1E]">{rev.author}</span>
                    {rev.isVerified && (
                      <span className="text-[10px] font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-0.5" />
                        Verified Buyer
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-[#999999]">{rev.location} • {rev.date}</div>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex text-[#FF6FA7]">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current mr-0.5" />
                ))}
              </div>
            </div>

            {/* Review Title & Body */}
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#1E1E1E]">{rev.title}</h4>
              <p className="text-xs text-[#666666] font-light leading-relaxed">{rev.content}</p>
            </div>

            {/* Helpful Counter */}
            <div className="pt-2 flex items-center justify-between text-xs text-[#999999] border-t border-[#FDEEF3]">
              <span className="text-[11px]">Was this review helpful?</span>
              <button
                onClick={() => toggleHelpful(rev.id)}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  helpfulLiked[rev.id]
                    ? 'bg-[#FDEEF3] text-[#FF6FA7]'
                    : 'bg-[#FFF8FA] text-[#666666] hover:text-[#1E1E1E]'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Helpful ({rev.helpfulCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white border border-[rgba(233,170,194,0.3)] w-full max-w-lg rounded-2xl luxury-card-shadow overflow-hidden p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#FDEEF3] pb-4">
              <h3 className="font-serif text-xl font-normal text-[#1E1E1E] uppercase">
                WRITE A CUSTOMER REVIEW
              </h3>
              <button onClick={() => setIsWriteModalOpen(false)} className="p-1 text-[#999999] hover:text-[#1E1E1E]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1E1E1E] uppercase mb-1">Overall Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating ? 'fill-[#FF6FA7] text-[#FF6FA7]' : 'text-[#D1D5DB]'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E1E1E] uppercase mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya S."
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full p-2.5 bg-[#FFF8FA] border border-[rgba(233,170,194,0.3)] rounded-xl text-xs focus:outline-none focus:border-[#FF6FA7]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E1E1E] uppercase mb-1">Review Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Stunning craftsmanship & fast shipping!"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-[#FFF8FA] border border-[rgba(233,170,194,0.3)] rounded-xl text-xs focus:outline-none focus:border-[#FF6FA7]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E1E1E] uppercase mb-1">Your Review</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share your experience wearing this GLOW & CO. piece..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-2.5 bg-[#FFF8FA] border border-[rgba(233,170,194,0.3)] rounded-xl text-xs focus:outline-none focus:border-[#FF6FA7]"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-pink-luxury text-white text-xs font-bold tracking-widest uppercase py-3.5 rounded-full shadow-md flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>SUBMIT REVIEW</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
