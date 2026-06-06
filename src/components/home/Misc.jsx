import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as Recharts from 'recharts';
const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { t, useLang } from '../../i18n/index';
import { motion, AnimatePresence } from 'motion/react';
import { IconSearch, IconClose } from '../ui/Icons';



// ---------- ThemeToggle ----------
const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    if (typeof localStorage !== "undefined") {
      const v = localStorage.getItem("eco-theme");
      if (v) return v === "dark";
    }
    return true;
  });
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("eco-theme", dark ? "dark" : "light");
    } catch (e) {}
  }, [dark]);
  return (
    <button
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? "تم روشن" : "تم تیره"}
      className="relative inline-flex items-center h-9 w-16 rounded-full bg-ink-700 light:bg-zinc-200 border border-ink-500 light:border-zinc-300 transition-colors"
    >
      <span
        className={`absolute top-0.5 h-7 w-7 rounded-full transition-all duration-300 flex items-center justify-center ${dark ? "end-0.5 bg-ink-900 text-amber-300" : "end-[calc(100%-1.875rem)] bg-white text-amber-500 shadow-md"}`}
      >
        {dark ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
          </svg>
        )}
      </span>
      <span className="sr-only">تغییر تم</span>
    </button>
  );
};

// ---------- بنر اختصاصی تب: شعار داینامیک + جستجو (بدون عضویت) ----------
const TAB_BANNER = {
  news: {
    titleFa: "هیچ خبر و رخداد مهمی از بازار رو از دست نده!",
    titleEn: "Don't miss any important market news!",
    placeholder: "جستجو در اخبار…",
    accent: "bg-brand-red",
  },
  edu: {
    titleFa: "هوشمندانه‌تر یاد بگیر، دانش مالی‌ت رو رشد بده!",
    titleEn: "Learn smarter, grow your financial knowledge!",
    placeholder: "جستجوی دوره و آموزش…",
    accent: "bg-brand-red",
  },
  tools: {
    titleFa: "به ابزارهایی که برای تصمیم بهتر لازم داری دسترسی داشته باش!",
    titleEn: "Get access to the tools you need for better decisions!",
    placeholder: "جستجو در ابزارها…",
    accent: "bg-brand-green",
  },
  products: {
    titleFa: "محصولات و خدمات کاربردی اکوآذرین رو کشف کن!",
    titleEn: "Discover EcoAzarin's useful products and services!",
    placeholder: "جستجو در محصولات…",
    accent: "bg-brand-green",
  },
  journal: {
    titleFa: "معاملات، افکار و پیشرفت‌ت رو ردگیری کن!",
    titleEn: "Track your trades, thoughts, and progress!",
    placeholder: "جستجو در ژورنال…",
    accent: "bg-brand-red",
  },
  articles: {
    titleFa: "تحلیل‌های عمیق و دیدگاه کارشناسان رو بخون!",
    titleEn: "Read deep analysis and diverse expert opinions!",
    placeholder: "جستجو در مقالات…",
    accent: "bg-brand-red",
  },
  podcast: {
    titleFa: "به پادکست‌های مالی اختصاصی و گفت‌وگوها گوش بده!",
    titleEn: "Listen to exclusive financial podcasts and talks!",
    placeholder: "جستجو در پادکست‌ها…",
    accent: "bg-brand-green",
  },
};

// Single theme-aware banner. Search is on the RIGHT (relative), slogan is on the LEFT.
const SectionBanner = ({ tabId, query, onQuery, resultCount }) => {
  const [lang] = useLang();
  const isEn = lang === 'EN';
  const inputRef = useRef(null);

  // Dynamic Context: News route filters News, else global search.
  const isNewsRoute = typeof window !== 'undefined' && window.PAGE_SLUG === 'news';

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    if (!isNewsRoute && onQuery) {
      window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-5 md:mb-6 w-full">
      {/* SLOGAN BANNER (Start side) */}
      <div className="order-2 md:order-1 flex items-center justify-center bg-zinc-200/60 dark:bg-zinc-800/80 rounded-full px-1.5 py-1.5 md:pe-5 transition-all text-start w-full md:w-auto relative overflow-hidden group">
        <div className="flex items-center gap-3 relative z-10 w-full justify-between">
          <div className="shrink-0 flex items-center">
            {/* Custom Illustration SVG Matching the Blueprint */}
            <div className="w-[50px] h-[34px] md:w-[60px] md:h-[40px] flex items-center justify-center overflow-visible bg-zinc-100 dark:bg-zinc-700/50 rounded-full rtl:scale-x-[-1] shadow-inner border border-white/50 dark:border-zinc-600/50 px-2">
               <svg viewBox="0 0 120 70" className="w-[64px] h-[44px] drop-shadow-sm overflow-visible text-start" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Coins */}
                  <g stroke="#9CA3AF" strokeWidth="1.5">
                    <ellipse cx="90" cy="55" rx="14" ry="4" fill="#E5E7EB"/>
                    <path d="M76 55 v-5 a14 4 0 0 1 28 0 v5" fill="#F3F4F6"/>
                    <ellipse cx="90" cy="50" rx="14" ry="4" fill="#E5E7EB"/>
                    <path d="M76 50 v-5 a14 4 0 0 1 28 0 v5" fill="#F3F4F6"/>
                    <ellipse cx="90" cy="45" rx="14" ry="4" fill="#E5E7EB"/>
                    <path d="M76 45 v-5 a14 4 0 0 1 28 0 v5" fill="#F3F4F6"/>
                    <ellipse cx="90" cy="40" rx="14" ry="4" fill="#E5E7EB"/>
                  </g>
                  {/* Person Body & Legs */}
                  <path d="M25 55 C 10 50, 45 42, 65 52 L 25 55 Z" fill="#ffffff" stroke="#374151" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M35 55 C 30 65, 60 62, 55 50 C 45 48, 40 50, 35 55 Z" fill="#F9FAFB" stroke="#374151" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M35 30 C 20 28, 20 40, 25 48 C 30 50, 50 50, 55 45 C 55 40, 45 32, 35 30 Z" fill="#10B981"/>
                  {/* Head & Hair */}
                  <circle cx="38" cy="20" r="7" fill="#FCD34D"/>
                  <path d="M33 18 C 33 5, 48 5, 45 20 C 40 18, 38 18, 33 18 Z" fill="#111827"/>
                  <circle cx="35" cy="15" r="3" fill="#111827"/>
                  {/* Laptop */}
                  <path d="M42 45 L 60 45 L 65 38 L 47 38 Z" fill="#111827" stroke="#374151" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M60 45 L 50 35 L 55 33 L 65 43 Z" fill="#1F2937" stroke="#374151" strokeWidth="1.5" strokeLinejoin="round"/>
                  {/* Arm */}
                  <path d="M33 36 C 30 42, 35 48, 45 43" fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round"/>
               </svg>
            </div>
          </div>
          <div className="flex-1 px-1">
            <h2 className="text-[13.5px] md:text-[15px] font-black leading-tight tracking-tight text-zinc-900 dark:text-zinc-100 flex flex-col whitespace-pre-wrap font-peyda pt-0.5">
              {isEn ? (
                <>Everything you need <br/><span className="text-[15px] md:text-[17px]">to know about economy!</span></>
              ) : (
                <>هر آن‌چیزی کــه از <br/><span className="text-[15px] md:text-[17px]">اقتصاد بـایـد بـدونی!</span></>
              )}
            </h2>
          </div>
        </div>
      </div>

      {/* SEARCH (End side) - noticeably smaller max-width */}
      <div className="order-1 md:order-2 flex items-center w-full md:max-w-md bg-zinc-100 dark:bg-zinc-800/80 border-2 border-transparent focus-within:border-brand-red/30 transition-all rounded-full px-2 py-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800">
        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full cursor-text relative">
          <button type="submit" className="h-9 w-9 shrink-0 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
            <IconSearch size={18} />
          </button>
          <input
            ref={inputRef}
            type="search"
            placeholder={isEn ? "What news are you looking for!" : "دنبال چه خبری هستی !"}
            aria-label={isEn ? "Search" : "جستجو"}
            value={query || ""}
            onChange={(e) => onQuery && onQuery(e.target.value)}
            className="flex-1 min-w-0 h-9 bg-transparent border-0 text-[13px] md:text-[14px] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQuery && onQuery("")}
              className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white shrink-0 me-2"
              aria-label={isEn ? "Clear" : "پاک کردن"}
            >
              <IconClose size={16} />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

// (SearchAndSlogan قدیمی حذف شد — به SectionBanner داخل هر تب منتقل شد)
const SearchAndSlogan = () => null;

Object.assign(window, { SearchAndSlogan, SectionBanner, ThemeToggle });

export { ThemeToggle, TAB_BANNER, SectionBanner, SearchAndSlogan };
