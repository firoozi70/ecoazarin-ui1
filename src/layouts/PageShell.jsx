import * as Recharts from 'recharts';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { motion, AnimatePresence } from 'motion/react';
import { LiveTicker, Header } from './Header';
import { ThemeToggle } from '../components/home/Misc';
import { Footer } from './Footer';
import { useLangRefresh } from '../i18n';

// =====================================================================
// page-shell.jsx — shared chrome wrapper (Ticker, Header, Footer)
// Each new page calls <PageShell slug="journal">{content}</PageShell>
// =====================================================================

const CookieBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookieConsent');
    if (!accepted) {
      // Add slight delay before showing
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-50 pointer-events-auto"
        >
          <div className="bg-ink-850 light:bg-white border border-ink-500 light:border-zinc-200 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] p-5 rounded-2xl flex flex-col gap-4 relative overflow-hidden text-start">
            <h3 className="font-bold text-[14px] text-white light:text-zinc-900 flex items-center gap-2">
              <span className="text-xl">🍪</span> {window.__ECO_LANG === 'EN' ? "Your Privacy" : "حریم خصوصی شما"}
            </h3>
            <p className="text-[12.5px] text-zinc-400 light:text-zinc-600 leading-relaxed font-medium">
              {window.__ECO_LANG === 'EN' 
                ? <>We use cookies for a better experience. By continuing, you agree to our <a href="/cookies.html" className="text-brand-green hover:underline">Cookie Policy</a> and <a href="/privacy.html" className="text-brand-green hover:underline">Privacy Policy</a>.</>
                : <>ما برای بهبود تجربه کاربری، ارائه تحلیل‌های دقیق‌تر و شخصی‌سازی محتوا، از کوکی‌ها استفاده می‌کنیم. با ادامه استفاده از اکوآذرین، با <a href="/cookies.html" className="text-brand-green hover:underline">سیاست کوکی‌ها</a> و <a href="/privacy.html" className="text-brand-green hover:underline">حریم خصوصی</a> ما موافقت می‌کنید.</>
              }
            </p>
            <div className="flex items-center gap-3 mt-2">
              <button 
                onClick={accept} 
                className="flex-1 bg-brand-green hover:bg-[#10B981] text-ink-900 font-bold px-4 py-2.5 rounded-xl text-[13px] transition-all hover:shadow-[0_8px_20px_-8px_rgba(16,185,129,0.5)]"
              >
                {window.__ECO_LANG === 'EN' ? "Got it!" : "متوجه شدم!"}
              </button>
              <a 
                href="/cookies.html" 
                className="flex-1 text-center bg-ink-800 light:bg-zinc-100 hover:bg-ink-700 light:hover:bg-zinc-200 text-white light:text-zinc-800 font-bold px-4 py-2.5 rounded-xl text-[13px] transition-colors"
              >
                {window.__ECO_LANG === 'EN' ? "Learn more" : "اطلاعات بیشتر"}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const PageShell = ({ slug, children }) => {
  useLangRefresh();
  const isEn = window.__ECO_LANG === 'EN';

  if (slug && typeof window !== 'undefined') window.PAGE_SLUG = slug;
  return (
    <div dir={isEn ? "ltr" : "rtl"} lang={isEn ? "en" : "fa"} className="min-h-screen bg-ink-900 text-white">
      <LiveTicker />
      <Header rightSlot={<ThemeToggle />} />
      <main className="pb-12 pt-6 relative z-10">{children}</main>
      <Footer />
      <CookieBanner />
    </div>
  );
};
window.PageShell = PageShell;

export { PageShell };
