import React from 'react';
import ReactDOM from 'react-dom/client';
import { PageShell } from '../layouts/PageShell';
import { IconArrowLeft } from '../components/ui/Icons';
import { motion } from 'motion/react';

function NotFoundPage() {
  return (
    <PageShell headerSlot={null}>
      <div className="flex-1 flex items-center justify-center py-20 px-4 min-h-[70vh]">
        <div className="max-w-md text-center max-w-lg mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-8">
              <div className="text-[120px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-brand-red to-brand-redDark drop-shadow-xl select-none num-display tracking-tighter mix-blend-screen light:mix-blend-normal">
                404
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-red/20 blur-[60px] -z-10 rounded-full" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white light:text-zinc-900">
              مسیر را گم کرده‌اید؟
            </h1>
            <p className="text-zinc-400 light:text-zinc-500 mb-8 leading-relaxed text-[15px]">
              صفحه‌ای که به دنبال آن هستید وجود ندارد، حذف شده است و یا آدرس آن را اشتباه وارد کرده‌اید. اما نگران نباشید، همیشه راه بازگشتی هست.
            </p>
            
            <a 
              href="hero.html"
              className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-redDark text-white px-8 py-3.5 rounded-xl font-bold transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-8px_rgba(230,57,70,0.6)]"
            >
              بازگشت به خانه <IconArrowLeft size={18} />
            </a>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NotFoundPage />);
