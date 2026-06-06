const { useState, useEffect, useRef } = React;

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
    title: "هیچ خبر و رخداد مهمی از بازار رو از دست نده!",
    placeholder: "جستجو در اخبار…",
    accent: "bg-brand-red",
  },
  edu: {
    title: "هوشمندانه‌تر یاد بگیر، دانش مالی‌ت رو رشد بده!",
    placeholder: "جستجوی دوره و آموزش…",
    accent: "bg-brand-red",
  },
  tools: {
    title: "به ابزارهایی که برای تصمیم بهتر لازم داری دسترسی داشته باش!",
    placeholder: "جستجو در ابزارها…",
    accent: "bg-brand-green",
  },
  products: {
    title: "محصولات و خدمات کاربردی اکوآذرین رو کشف کن!",
    placeholder: "جستجو در محصولات…",
    accent: "bg-brand-green",
  },
  journal: {
    title: "معاملات، افکار و پیشرفت‌ت رو ردگیری کن!",
    placeholder: "جستجو در ژورنال…",
    accent: "bg-brand-red",
  },
  articles: {
    title: "تحلیل‌های عمیق و دیدگاه کارشناسان رو بخون!",
    placeholder: "جستجو در مقالات…",
    accent: "bg-brand-red",
  },
  podcast: {
    title: "به پادکست‌های مالی اختصاصی و گفت‌وگوها گوش بده!",
    placeholder: "جستجو در پادکست‌ها…",
    accent: "bg-brand-green",
  },
};

// Single theme-aware banner. Search is on the RIGHT (col-span-3, the
// previous slogan slot); slogan is on the LEFT (col-span-2). Both follow
// the global token system so they flip on dark/light without forking.
const SectionBanner = ({ tabId, query, onQuery, resultCount }) => {
  const b = TAB_BANNER[tabId] || TAB_BANNER.news;
  const inputRef = useRef(null);
  const [osKey, setOsKey] = useState("⌘ K");

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const isMac =
        navigator.platform.toUpperCase().indexOf("MAC") >= 0 ||
        navigator.userAgent.toUpperCase().indexOf("MAC") >= 0;
      setOsKey(isMac ? "⌘ K" : "Ctrl + K");
    }

    const handleKeyDown = (e) => {
      // ignore if focus is inside input/textarea already
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="grid md:grid-cols-5 gap-3 mb-5 md:mb-6">
      {/* SEARCH — now on the right (was slogan's slot) */}
      <div className="md:col-span-3 order-1 md:order-1 flex items-center group bg-ink-800/60 light:bg-white border border-ink-500 light:border-zinc-200 rounded-xl px-2 py-2 relative transition-all hover:border-ink-400 light:hover:border-zinc-300 focus-within:border-brand-red/60 focus-within:shadow-[0_0_0_4px_rgba(230,57,70,0.10)]">
        <label className="flex items-center gap-3 w-full cursor-text">
          <span className="h-10 w-10 shrink-0 rounded-[10px] bg-[#2E1417] light:bg-brand-red/5 border border-brand-red/20 light:border-brand-red/10 flex items-center justify-center text-brand-red">
            <IconSearch size={18} />
          </span>
          <input
            ref={inputRef}
            type="search"
            placeholder={
              typeof t !== "undefined"
                ? t("searchAll")
                : "جستجو در همهٔ بخش‌های سایت…"
            }
            aria-label="جستجو"
            value={query || ""}
            onChange={(e) => onQuery && onQuery(e.target.value)}
            className="flex-1 min-w-0 h-10 bg-transparent border-0 text-[13px] md:text-[14px] text-zinc-100 light:text-zinc-800 placeholder:text-zinc-500 light:placeholder:text-zinc-400 outline-none"
          />
          {query ? (
            <span className="text-[11px] text-zinc-400 light:text-zinc-500 tabular-nums shrink-0">
              {resultCount || 0} نتیجه
            </span>
          ) : (
            <kbd
              className="hidden md:inline-flex shrink-0 items-center justify-center h-[26px] min-w-[32px] px-2 rounded-md border border-ink-500 light:border-zinc-200 bg-ink-900/60 light:bg-zinc-50 text-[11px] font-mono font-medium text-zinc-400 light:text-zinc-500 tracking-wider shadow-sm me-2"
              style={{ direction: "ltr" }}
            >
              {osKey}
            </kbd>
          )}
          {query ? (
            <button
              onClick={() => onQuery && onQuery("")}
              className="text-zinc-500 hover:text-white shrink-0 me-2"
              aria-label="پاک کردن"
            >
              <IconClose size={16} />
            </button>
          ) : null}
        </label>
      </div>
      {/* SLOGAN — now on the left (was search's slot) */}
      <div className="md:col-span-2 order-2 md:order-2 relative overflow-hidden bg-gradient-to-br from-ink-800/80 to-ink-900/60 border border-ink-500 rounded-xl px-4 py-3 flex items-center gap-3 transition-all hover:border-ink-400 text-zinc-500">
        <span
          className={`h-10 w-1.5 rounded-full ${b.accent} shrink-0 shadow-[0_0_18px_-2px_currentColor]`}
        />
        <h2 className="text-[13px] md:text-[14px] font-bold leading-snug tracking-tight text-white line-clamp-2 flex-1">
          {b.title}
        </h2>
        <span
          className="absolute -start-6 -top-6 w-20 h-20 rounded-full opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, currentColor, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
};

// (SearchAndSlogan قدیمی حذف شد — به SectionBanner داخل هر تب منتقل شد)
const SearchAndSlogan = () => null;

Object.assign(window, { SearchAndSlogan, SectionBanner, ThemeToggle });
