import React from 'react';
import { X } from 'lucide-react';

interface InfoModalProps {
  title: string | null;
  content: string | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ title, content, onClose }) => {
  if (!title || !content) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity" />

      <div className="relative bg-[#FAF8F5] max-w-lg w-full shadow-2xl z-10 p-6 sm:p-8 border border-[#EBE6DD]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#57534E] hover:text-[#1C1917]"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-serif text-2xl font-normal text-[#1C1917] uppercase mb-4 tracking-wider">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-[#57534E] font-light leading-relaxed mb-6">
          {content}
        </p>

        <div className="text-right">
          <button
            onClick={onClose}
            className="bg-[#C0A062] hover:bg-[#A88849] text-white text-xs font-semibold px-6 py-2.5 uppercase tracking-widest"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
