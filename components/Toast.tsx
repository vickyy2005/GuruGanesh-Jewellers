import React from 'react';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up max-w-sm w-full bg-[#1C1917] text-white p-4 shadow-xl border border-[#C0A062]/30 flex items-center justify-between gap-3">
      <div className="flex items-center space-x-3">
        <CheckCircle2 className="w-5 h-5 text-[#C0A062] flex-shrink-0" />
        <div>
          <h4 className="text-xs font-bold tracking-wider uppercase text-white">{toast.title}</h4>
          <p className="text-xs text-[#D6D3D1] font-light">{toast.message}</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="text-[10px] uppercase font-bold text-[#C0A062] hover:underline"
      >
        DISMISS
      </button>
    </div>
  );
};
