import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { motion } from 'motion/react';
import { Lock, FileText, ChevronRight, CheckCircle2 } from 'lucide-react';
import changelogData from '../../change.txt?raw';
import '../index.css';

function ChangelogPage() {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (password === 'admin123' || password === 'ecoazarin2026') {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans flex items-center justify-center p-6 selection:bg-brand-green/30" dir="rtl">
      
      {!isUnlocked ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 end-0 w-64 h-64 bg-brand-green/20 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />
          
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 relative z-10 mx-auto text-brand-green">
            <Lock size={32} />
          </div>
          
          <h1 className="text-3xl font-extrabold text-white mb-3 text-center">ورود به سیستم توسعه</h1>
          <p className="text-center text-zinc-400 text-[14px] mb-8">
            برای مشاهده فایل تغییرات سیستم (Changelog)، لطفاً رمز عبور مدیریت را وارد کنید.
          </p>
          
          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <input 
                type="password"
                placeholder="رمز عبور..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-black/50 border ${error ? 'border-eed-500/50 focus:border-red-500' : 'border-white/10 focus:border-brand-green/50'} rounded-xl px-5 py-4 text-white placeholder:text-zinc-600 outline-none transition-colors text-center text-xl tracking-[0.5em]`}
                autoFocus
              />
              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-[13px] text-center mt-2 font-medium">
                  رمز عبور وارد شده اشتباه است.
                </motion.p>
              )}
            </div>
            <button 
              type="submit"
              className="w-full bg-brand-green text-black font-bold text-[15px] rounded-xl px-5 py-4 flex items-center justify-center gap-2 hover:bg-brand-green/90 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              مشاهده گزارش
              <ChevronRight size={18} className="rotate-180" />
            </button>
          </form>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-4xl p-8 rounded-3xl bg-white/5 border border-brand-green/30 shadow-2xl relative"
        >
           <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-xl bg-brand-green/20 text-brand-green flex items-center justify-center">
                 <FileText size={24} />
               </div>
               <div>
                 <h2 className="text-2xl font-bold text-white tracking-tight">گزارش جامع توسعه</h2>
                 <p className="text-zinc-500 text-[13px] font-mono mt-1">change.txt • System Core</p>
               </div>
             </div>
             <div className="flex items-center gap-2 text-[12px] font-bold text-brand-green bg-brand-green/10 px-4 py-2 rounded-lg">
               <CheckCircle2 size={16} />
               دسترسی مجاز است
             </div>
           </div>
           
           <div className="bg-[#0A0A0A] rounded-2xl p-6 border border-white/5 overflow-auto max-h-[60vh] custom-scrollbar">
             <pre className="font-sans text-[14px] leading-[2.2] text-zinc-300 whitespace-pre-wrap">
                {changelogData}
             </pre>
           </div>
           
           <div className="mt-6 text-center">
             <a href="/" className="text-zinc-500 hover:text-white transition-colors text-[14px]">بازگشت به سایت اصلی</a>
           </div>
        </motion.div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChangelogPage />
  </React.StrictMode>
);
