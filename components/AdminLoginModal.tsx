import React, { useState } from 'react';
import { KeyRound, Lock, Sparkles, X, ShieldCheck } from 'lucide-react';
import { GuruGaneshLogo } from './GuruGaneshLogo';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'admin123' || passcode.trim() === 'admin') {
      setError('');
      setPasscode('');
      onSuccess();
    } else {
      setError('Invalid passcode. Use demo passcode "admin123" or click Quick Demo Access.');
    }
  };

  const handleQuickAccess = () => {
    setError('');
    setPasscode('');
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#FFF0F5] border border-[#E89AB5]/40 rounded-3xl p-8 shadow-2xl overflow-hidden">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#D4AF37] via-[#E89AB5] to-[#B85B7A]" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-[#E89AB5]/20 transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Header */}
        <div className="text-center mb-6 flex flex-col items-center">
          <div className="p-3 rounded-full bg-white border border-[#E89AB5]/40 shadow-md mb-3">
            <GuruGaneshLogo size={48} showText={false} />
          </div>
          <h2 className="font-serif text-2xl font-bold tracking-wider text-[#1E1E1E]">
            ADMIN CONCIERGE
          </h2>
          <p className="text-xs tracking-widest text-[#B85B7A] uppercase mt-1">
            GURU GANESH Product Management
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-2">
              Passcode Access
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B85B7A]" />
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (e.g. admin123)"
                className="w-full pl-12 pr-4 py-3 bg-white/80 border border-[#E89AB5]/50 rounded-xl focus:ring-2 focus:ring-[#B85B7A] focus:outline-none text-neutral-800 text-sm placeholder:text-neutral-400"
                autoFocus
              />
            </div>
            {error && <p className="text-xs text-rose-600 mt-2 font-medium">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl font-semibold tracking-wider text-sm text-white bg-gradient-to-r from-[#B85B7A] to-[#E89AB5] hover:opacity-95 shadow-md shadow-[#B85B7A]/20 transition-all flex items-center justify-center space-x-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>Unlock Admin Panel</span>
          </button>
        </form>

        {/* Quick Demo Access Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E89AB5]/30" />
          </div>
          <span className="relative px-3 text-xs uppercase tracking-widest text-neutral-400 bg-[#FFF0F5]">
            Quick Access
          </span>
        </div>

        {/* Quick Demo Button */}
        <button
          onClick={handleQuickAccess}
          className="w-full py-3 px-4 border border-[#B85B7A]/40 rounded-xl font-medium text-xs text-[#B85B7A] bg-white/50 hover:bg-[#E89AB5]/15 transition-all flex items-center justify-center space-x-2"
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>Quick Demo Login (No Password Required)</span>
        </button>

        <p className="text-[11px] text-center text-neutral-400 mt-4">
          Default Passcode: <code className="bg-white/80 px-1.5 py-0.5 rounded text-[#B85B7A]">admin123</code>
        </p>
      </div>
    </div>
  );
};
