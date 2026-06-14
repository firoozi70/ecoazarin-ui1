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
      <div className="order-2 md:order-1 flex items-center text-start w-full md:w-auto transition-all">
        <div className="flex items-center gap-3 w-full">
          <div className="shrink-0 flex items-center">
            <img 
              src="/اخبار.png" 
              alt="" 
              className="w-12 h-12 md:w-[56px] md:h-[56px] object-contain rtl:scale-x-[-1]" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-[14px] md:text-[16px] font-black leading-[1.4] tracking-tight text-zinc-900 dark:text-zinc-100">
              {isEn ? "A reference for following important events" : "مرجعی برای دنبال کردن رویدادهای مهم"}
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
