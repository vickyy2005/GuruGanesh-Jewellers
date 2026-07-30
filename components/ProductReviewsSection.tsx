import React, { useState } from 'react';
import { Star, CheckCircle2, ThumbsUp, MessageSquarePlus, X, Send, Image as ImageIcon, Sparkles, Filter, Award, ShieldCheck } from 'lucide-react';
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
  photoUrl?: string;
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
      photoUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'rev-2',
      author: 'Ananya Verma',
      location: 'New Delhi, DL',
      rating: 5,
      date: '1 month ago',
      title: 'Perfection in every detail',
      content: 'I was hesitant to buy fine jewelry online, but GLOW & CO surpassed all expectations. The stones have incredible sparkle under golden hour light.',
      helpfulCount: 18,
      isVerified: true,
      photoUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'rev-3',
      author: 'Rohan Mehta',
      location: 'Bengaluru, KA',
      rating: 5,
      date: '1 month ago',
      title: 'Best Anniversary Gift Ever 🌹',
      content: 'Gifted this piece to my wife for our 3rd anniversary. She adored the custom laser engraving! Delivery was super fast within 2 days.',
      helpfulCount: 15,
      isVerified: true,
    },
    {
      id: 'rev-4',
      author: 'Meera Kapoor',
      location: 'Jaipur, RJ',
      rating: 4,
      date: '2 months ago',
      title: 'Delicate & Elegant',
      content: 'Very high quality vermeil finish. Lightweight enough for daily wear at the atelier.',
      helpfulCount: 9,
      isVerified: true,
      photoUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop',
    },
  ]);

  const [filterRating, setFilterRating] = useState<number | 'ALL' | 'PHOTOS'>('ALL');
  const [helpfulLiked, setHelpfulLiked] = useState<Record<string, boolean>>({});
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
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
      location: newLocation || 'India',
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
    setNewLocation('');
    setNewTitle('');
    setNewContent('');
  };

  const overallRating = product.rating || 4.9;
  const totalCount = (product.reviewsCount || 98) + (reviewsList.length - 4);

  // Filter reviews
  const displayedReviews = reviewsList.filter((r) => {
    if (filterRating === 'ALL') return true;
    if (filterRating === 'PHOTOS') return !!r.photoUrl;
    return r.rating === filterRating;
  });

  return (
    <section className="mt-16 border-t border-[#FDEEF3] pt-12 select-none">
      
      {/* Section Title */}
      <div className="text-center mb-10 space-y-2">
        <span className="text-[11px] tracking-[0.25em] font-bold text-[#C98A9F] uppercase flex items-center justify-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6FA7]" />
          <span>VERIFIED CUSTOMER FEEDBACK</span>
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E1E1E] uppercase tracking-wide">
          CUSTOMER REVIEWS &amp; RATINGS
        </h2>
      </div>

      {/* Luxury Ratings Summary Dashboard */}
      <div className="bg-gradient-to-r from-white via-[#FFF8FA] to-white p-6 sm:p-8 rounded-3xl border border-[rgba(233,170,194,0.35)] luxury-card-shadow mb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Score Box (4 cols) */}
          <div className="md:col-span-4 text-center md:border-r border-[#FDEEF3] md:pr-6 space-y-3">
            <div className="text-5xl sm:text-6xl font-bold text-[#1E1E1E] tracking-tight font-serif">
              {overallRating.toFixed(1)}
            </div>
            
            <div className="flex justify-center text-[#FF6FA7] space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>

            <div className="space-y-1">
              <div className="text-xs text-[#666666] font-bold tracking-wider uppercase">
                OUT OF 5 STAR RATING
              </div>
              <div className="text-[11px] font-bold text-[#C98A9F] uppercase tracking-widest">
                BASED ON {totalCount} VERIFIED REVIEWS
              </div>
            </div>

            {/* Recommendation Stat */}
            <div className="pt-2">
              <span className="inline-flex items-center space-x-1.5 bg-[#DCFCE7] text-[#15803D] text-[11px] font-bold px-3 py-1 rounded-full border border-[#15803D]/20">
                <Award className="w-3.5 h-3.5" />
                <span>98% of Customers Recommend This Piece</span>
              </span>
            </div>
          </div>

          {/* Rating Bars (5 cols) */}
          <div className="md:col-span-5 space-y-2 text-xs">
            {[
              { stars: 5, label: '5 Star', pct: '88%' },
              { stars: 4, label: '4 Star', pct: '9%' },
              { stars: 3, label: '3 Star', pct: '2%' },
              { stars: 2, label: '2 Star', pct: '1%' },
              { stars: 1, label: '1 Star', pct: '0%' },
            ].map((row) => (
              <button
                key={row.stars}
                onClick={() => setFilterRating(filterRating === row.stars ? 'ALL' : row.stars)}
                className={`w-full flex items-center space-x-3 p-1 rounded-lg transition-colors text-left group ${
                  filterRating === row.stars ? 'bg-[#FFF0F5]' : 'hover:bg-[#FFF0F5]/50'
                }`}
              >
                <span className="w-12 text-[11px] font-bold text-[#1E1E1E] flex-shrink-0 group-hover:text-[#FF6FA7]">
                  {row.label}
                </span>
                <div className="flex-1 bg-[#FDEEF3] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#FF6FA7] h-full rounded-full transition-all duration-500" style={{ width: row.pct }} />
                </div>
                <span className="w-8 text-[11px] text-[#666666] font-semibold text-right">{row.pct}</span>
              </button>
            ))}
          </div>

          {/* Write Review Action (3 cols) */}
          <div className="md:col-span-3 flex flex-col items-center justify-center space-y-3 md:pl-4">
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="w-full btn-pink-luxury text-white text-xs font-bold tracking-widest uppercase py-4 px-5 rounded-full shadow-lg flex items-center justify-center space-x-2 group hover:scale-102 transition-transform"
            >
              <MessageSquarePlus className="w-4 h-4 transform group-hover:scale-110 transition-transform" />
              <span>WRITE A REVIEW</span>
            </button>
            <div className="text-[10px] text-[#666666] text-center flex items-center space-x-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
              <span>Verified Atelier Buyers Only</span>
            </div>
          </div>

        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
        <span className="text-[11px] font-bold text-[#999999] uppercase tracking-wider flex items-center space-x-1 mr-2">
          <Filter className="w-3.5 h-3.5 text-[#FF6FA7]" />
          <span>FILTER:</span>
        </span>

        {[
          { label: 'All Reviews', val: 'ALL' },
          { label: '★ 5 Stars', val: 5 },
          { label: '★ 4 Stars', val: 4 },
          { label: '📷 With Customer Photos', val: 'PHOTOS' },
        ].map((tab) => (
          <button
            key={tab.label}
            onClick={() => setFilterRating(tab.val as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all uppercase whitespace-nowrap ${
              filterRating === tab.val
                ? 'bg-[#FF6FA7] text-white shadow-xs'
                : 'bg-white text-[#666666] border border-[rgba(233,170,194,0.3)] hover:text-[#1E1E1E]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Customer Reviews Feed */}
      <div className="space-y-4">
        {displayedReviews.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl text-center text-xs text-[#666666] space-y-2">
            <p className="font-bold text-sm text-[#1E1E1E]">No reviews found matching this filter.</p>
            <button onClick={() => setFilterRating('ALL')} className="text-[#FF6FA7] font-bold hover:underline">
              View All Reviews
            </button>
          </div>
        ) : (
          displayedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow space-y-4 transition-transform hover:-translate-y-0.5 duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFF0F5] border border-[#FF6FA7]/30 text-[#FF6FA7] font-bold text-sm flex items-center justify-center uppercase shadow-2xs">
                    {rev.author[0]}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-[#1E1E1E]">{rev.author}</span>
                      {rev.isVerified && (
                        <span className="text-[10px] font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full flex items-center border border-[#15803D]/20">
                          <CheckCircle2 className="w-3 h-3 mr-0.5 text-[#15803D]" />
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-[#999999] font-medium">{rev.location} • {rev.date}</div>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex text-[#FF6FA7] space-x-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>

              {/* Review Title & Body */}
              <div className="space-y-1.5">
                <h4 className="font-serif text-base font-bold text-[#1E1E1E]">{rev.title}</h4>
                <p className="text-xs sm:text-sm text-[#666666] font-light leading-relaxed">{rev.content}</p>
              </div>

              {/* Optional Customer Photo Thumbnail */}
              {rev.photoUrl && (
                <div className="pt-2">
                  <div className="w-24 h-24 rounded-xl overflow-hidden border border-[#FDEEF3] shadow-xs cursor-pointer hover:scale-105 transition-transform">
                    <img src={rev.photoUrl} alt="Customer Review Photo" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}

              {/* Helpful Upvote Button */}
              <div className="flex items-center justify-between pt-3 border-t border-[#FDEEF3]">
                <span className="text-[11px] text-[#999999]">Was this review helpful?</span>
                <button
                  onClick={() => toggleHelpful(rev.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-1.5 transition-all ${
                    helpfulLiked[rev.id]
                      ? 'bg-[#FF6FA7] text-white shadow-2xs'
                      : 'bg-[#FFF0F5] text-[#666666] hover:bg-[#FDEEF3] hover:text-[#1E1E1E]'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${helpfulLiked[rev.id] ? 'fill-white' : ''}`} />
                  <span>Helpful ({rev.helpfulCount})</span>
                </button>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[rgba(233,170,194,0.3)] space-y-6 relative">
            
            <div className="flex items-center justify-between border-b border-[#FDEEF3] pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#FF6FA7] uppercase tracking-widest block">ATELIER FEEDBACK</span>
                <h3 className="font-serif text-xl font-bold text-[#1E1E1E] uppercase">WRITE A REVIEW</h3>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-2 text-[#999999] hover:text-[#FF6FA7] rounded-full hover:bg-[#FFF0F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              
              {/* Rating Selector */}
              <div className="space-y-1 text-center py-2 bg-[#FFF0F5] rounded-2xl border border-[#FF6FA7]/20">
                <label className="block text-[11px] font-bold text-[#1E1E1E] uppercase tracking-wider">YOUR RATING</label>
                <div className="flex justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 text-[#FF6FA7] hover:scale-125 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${star <= newRating ? 'fill-[#FF6FA7]' : 'text-[#999999]'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-[#1E1E1E] uppercase text-[10px]">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Priya S."
                    className="w-full bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#FF6FA7]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-bold text-[#1E1E1E] uppercase text-[10px]">City / Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Mumbai, MH"
                    className="w-full bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#FF6FA7]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-[#1E1E1E] uppercase text-[10px]">Review Headline</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Summarize your experience..."
                  className="w-full bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#FF6FA7]"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-[#1E1E1E] uppercase text-[10px]">Your Review *</label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Share details about the craftsmanship, shine, and fit..."
                  className="w-full bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-xl p-2.5 text-xs font-semibold focus:outline-none focus:border-[#FF6FA7]"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-pink-luxury text-white text-xs font-bold tracking-widest uppercase py-3.5 rounded-full shadow-lg flex items-center justify-center space-x-2 mt-4"
              >
                <Send className="w-4 h-4" />
                <span>SUBMIT VERIFIED REVIEW</span>
              </button>

            </form>
          </div>
        </div>
      )}

    </section>
  );
};
