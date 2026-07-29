import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FFF0F5] min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in select-none">
      
      {/* 1. Header Banner */}
      <div className="text-center mb-16 space-y-3">
        <span className="text-[11px] tracking-[0.3em] font-bold text-[#FF6FA7] uppercase flex items-center justify-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6FA7]" />
          <span>LUXURY CONCIERGE SUPPORT</span>
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1E1E1E] tracking-wider uppercase">
          CONTACT OUR ATELIER
        </h1>

        <div className="w-16 h-0.5 bg-[#FF6FA7] mx-auto rounded-full" />

        <p className="text-xs sm:text-sm text-[#666666] font-light max-w-lg mx-auto leading-relaxed">
          Our fine jewelry specialists are available 7 days a week for ring size consultations, custom orders, and order tracking.
        </p>
      </div>

      {/* 2. Grid Split: Contact Form (7 cols) + Atelier Info (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        
        {/* Left Column: Interactive Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow space-y-6">
          <h3 className="font-serif text-2xl font-normal text-[#1E1E1E] uppercase tracking-wide">
            SEND US A CONCIERGE MESSAGE
          </h3>

          {submitted ? (
            <div className="p-8 text-center bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-2xl space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#15803D] mx-auto animate-bounce" />
              <h4 className="text-base font-bold text-[#1E1E1E]">MESSAGE RECEIVED WITH CARE</h4>
              <p className="text-xs text-[#666666] max-w-md mx-auto">
                Thank you, {name}! Our luxury stylist concierge will review your message and respond to {email} within 4 business hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setPhone('');
                  setMessage('');
                }}
                className="btn-pink-luxury text-white text-xs font-bold tracking-widest uppercase px-6 py-2.5 rounded-full shadow-md mt-2"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E1E1E] uppercase mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-xl text-xs focus:outline-none focus:border-[#FF6FA7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1E1E] uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. priya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-xl text-xs focus:outline-none focus:border-[#FF6FA7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E1E1E] uppercase mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-xl text-xs focus:outline-none focus:border-[#FF6FA7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1E1E] uppercase mb-1">Inquiry Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-xl text-xs font-semibold text-[#1E1E1E] focus:outline-none focus:border-[#FF6FA7]"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Size Consultation">Ring &amp; Wrist Size Consultation</option>
                    <option value="Custom Laser Engraving">Custom Laser Engraving</option>
                    <option value="Order Tracking">Order &amp; Shipping Status</option>
                    <option value="Press & Media">Press &amp; Media Partnership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E1E1E] uppercase mb-1">Your Message *</label>
                <textarea
                  rows={5}
                  required
                  placeholder="How may our fine jewelry concierge assist you today?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 bg-[#FFF0F5] border border-[rgba(233,170,194,0.3)] rounded-xl text-xs focus:outline-none focus:border-[#FF6FA7]"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-pink-luxury text-white text-xs font-bold tracking-[0.24em] uppercase py-4 rounded-full shadow-lg flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>SEND MESSAGE TO CONCIERGE</span>
              </button>
            </form>
          )}

        </div>

        {/* Right Column: Atelier Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-6 rounded-3xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C98A9F]">DIRECT CONCIERGE HOTLINE</h4>
            <div className="flex items-start space-x-3 text-xs text-[#666666]">
              <Phone className="w-5 h-5 text-[#FF6FA7] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#1E1E1E] text-sm">+91 98765 43210</div>
                <div className="text-[11px] text-[#999999]">Toll-Free Direct Hotline &amp; WhatsApp Concierge</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C98A9F]">EMAIL SUPPORT</h4>
            <div className="flex items-start space-x-3 text-xs text-[#666666]">
              <Mail className="w-5 h-5 text-[#FF6FA7] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#1E1E1E] text-sm">concierge@guruganesh.com</div>
                <div className="text-[11px] text-[#999999]">24/7 Dedicated Client Response</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C98A9F]">FLAGSHIP BOUTIQUE &amp; ATELIER</h4>
            <div className="flex items-start space-x-3 text-xs text-[#666666]">
              <MapPin className="w-5 h-5 text-[#FF6FA7] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#1E1E1E]">GURU GANESH Flagship Atelier</div>
                <div>Suite 402, Bandra Kurla Complex (BKC)</div>
                <div>Mumbai, Maharashtra 400051, India</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[rgba(233,170,194,0.25)] luxury-card-shadow space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C98A9F]">CONCIERGE HOURS</h4>
            <div className="flex items-start space-x-3 text-xs text-[#666666]">
              <Clock className="w-5 h-5 text-[#FF6FA7] flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#1E1E1E]">Monday – Sunday</div>
                <div>10:00 AM – 8:00 PM IST</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
