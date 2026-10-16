import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Share2 } from 'lucide-react';

export default function TopBar({ title }) {
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('پیوند اینفوگرافیک با موفقیت کپی شد!');
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between py-4 px-4 sm:px-0">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowRight size={16} />
        <span>بازگشت به پرتال اصلی</span>
      </Link>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
        >
          <Share2 size={14} />
          <span className="hidden sm:inline">اشتراک‌گذاری</span>
        </button>
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
        >
          <Download size={14} />
          <span>چاپ / PDF</span>
        </button>
      </div>
    </div>
  );
}