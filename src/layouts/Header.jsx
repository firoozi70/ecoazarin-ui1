import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as Recharts from 'recharts';
const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { t } from '../i18n/index';
import { motion, AnimatePresence } from 'motion/react';
import { NEWS_TICKER, NAV_ITEMS } from '../data/mockData';
import { IconArrowLeft, BrandMark, TAB_ICON, IconClose, IconMenu, IconSearch } from '../components/ui/Icons';
import { useUser } from '../components/auth/AuthModals';
import { LangToggle, useLang } from '../i18n/index';
import { NotificationBell } from '../components/notifications/Notifications';
import { AuthButtons } from '../components/modals/DashboardModals';



// ---------- نوار خبر عمودی (تیتر) ----------
const LiveTicker = () => {
  const [lang] = useLang();
  const isEn = lang === "EN";
  const items = NEWS_TICKER || [];
  const N = items.length || 1;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || N <= 1) return;
    const timer = setInterval(() => setIdx((i) => (i + 1) % N), 4200);
    return () => clearInterval(timer);
  }, [N, paused]);

  return (
    <div
      className="w-full bg-[#0A0A0A] light:bg-white border-b border-ink-500 light:border-zinc-200 overflow-hidden"
      role="region"
      aria-label={isEn ? "Breaking News Ticker" : "نوار خبر فوری"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[1600px] mx-auto flex items-center h-11">
        {/* breaking-news badge */}
        <div className="shrink-0 flex items-center gap-2 pe-3 ps-3.5 h-7 mx-3 my-2 rounded-md bg-gradient-to-l from-brand-redDark to-brand-red shadow-[0_4px_14px_-6px_rgba(230,57,70,0.7)]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-white animate-softPulse" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
          </span>
          <span
            className="text-[11.5px] font-extrabold tracking-tight text-pure-white whitespace-nowrap"
            style={{ fontFamily: "'Charisma','Vazirmatn',sans-serif" }}
          >
            {t("breakingNews")}
          </span>
        </div>
        <span className="hidden md:block w-px h-5 bg-ink-500/70 light:bg-zinc-300 ms-1" />

        {/* rotating headline */}
        <div
          className="relative flex-1 overflow-hidden h-full"
          aria-live="polite"
        >
          {items.map((t, i) => {
            const offset = i - idx;
            const visible = offset === 0;
            const above = offset === -1 || (idx === 0 && i === N - 1);
            return (
              <a
                key={i}
                href="#"
                className={`absolute inset-x-0 top-0 h-full flex items-center px-3 text-[13.5px] md:text-[14.5px] font-medium text-[#FAFAFA] light:text-zinc-800 ${visible ? "opacity-100 translate-y-0" : above ? "opacity-0 -translate-y-full" : "opacity-0 translate-y-full"}`}
                style={{
                  transition:
                    "transform 700ms cubic-bezier(.7,.05,.25,1), opacity 600ms ease",
                  pointerEvents: visible ? "auto" : "none",
                }}
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-greenSoft mx-3 shrink-0" />
                <span className="truncate">{isEn ? t.en : t.fa}</span>
              </a>
            );
          })}
          {/* fade edges */}
          <div className="pointer-events-none absolute inset-y-0 end-0 w-12 bg-gradient-to-l rtl:bg-gradient-to-r from-[#0A0A0A] light:from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 start-0 w-12 bg-gradient-to-r rtl:bg-gradient-to-l from-[#0A0A0A] light:from-white to-transparent" />
        </div>

        {/* progress dots */}
        <div className="hidden sm:flex items-center gap-0.5 px-3 shrink-0">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={isEn ? `News ${i + 1}` : `خبر ${i + 1}`}
              className="p-1.5 cursor-pointer flex items-center justify-center group outline-none"
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-4 bg-brand-red" : "w-1.5 bg-ink-500 light:bg-zinc-300 group-hover:bg-ink-400 light:group-hover:bg-zinc-400"}`}
              />
            </button>
          ))}
        </div>

        <a
          href="#"
          className="hidden md:inline-flex shrink-0 items-center gap-1 px-4 h-full text-[12px] text-zinc-400 light:text-zinc-500 hover:text-brand-red light:hover:text-brand-red transition border-s border-ink-500 light:border-zinc-200"
        >
          {t("allNews")}{" "}
          <IconArrowLeft size={12} className="rtl:rotate-180" />
        </a>
      </div>
    </div>
  );
};

// ---------- هدر و نویگیشن ----------
const Header = ({ onOpenSearch, rightSlot }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user] = useUser();
  // Active route from window.PAGE_SLUG (set per page) or pathname guess
  const currentSlug =
    (typeof window !== "undefined" && window.PAGE_SLUG) ||
    (() => {
      const p = (
        location.pathname.split("/").pop() || "/"
      ).toLowerCase();
      const match = (NAV_ITEMS || []).find(
        (n) => n.href.toLowerCase() === p,
      );
      return match ? match.slug : "home";
    })();
  const [lang] = useLang();
  const isEn = lang === "EN";
  return (
    <header
      className="bg-ink-900/90 backdrop-blur-md border-b border-ink-500 sticky top-0 z-40 max-w-[100vw]"
      role="banner"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-2 md:gap-4">
        {/* Brand (right side in RTL) */}
        <a
          href="/"
          className="flex items-center gap-2 md:gap-2.5 shrink-0"
          aria-label={t("appTitle")}
        >
          <BrandMark size={36} className="me-1" />
          <div className="leading-none hidden min-[360px]:block">
            <div className="text-[13px] md:text-[15px] font-bold tracking-tight">
              {t("appTitle")}
            </div>
            <div className="text-[9px] md:text-[10px] text-zinc-500 mt-1">
              {t("appSubtitle")}
            </div>
          </div>
        </a>

        {/* Nav center — desktop only */}
        <nav
          className="hidden lg:flex items-center gap-1 mx-auto"
          aria-label={isEn ? "Main navigation" : "ناوبری اصلی"}
        >
          {NAV_ITEMS.map((item, i) => {
            const active = item.slug === currentSlug;
            const label = isEn ? item.en : item.fa;
            const Icon = TAB_ICON ? TAB_ICON[item.slug] : null;
            return (
              <a
                key={i}
                href={item.href}
                className={`px-3 py-2 rounded-xl text-[13.5px] transition-all flex items-center gap-2 ${
                  active
                    ? "bg-brand-green/15 light:bg-[#10B981]/15 text-brand-green font-bold"
                    : "text-zinc-400 light:text-zinc-500 hover:text-zinc-200 light:hover:text-zinc-800 hover:bg-ink-700/50 light:hover:bg-zinc-100"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {Icon && <Icon size={16} strokeWidth={active ? 2 : 1.5} />}
                <span>{label}</span>
                {active && (
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-brand-green ms-0.5"
                    aria-hidden="true"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right cluster (visually left in RTL) */}
        <div className="flex items-center justify-end gap-2 md:gap-3 shrink-0">
          <div className="flex items-center">
            <LangToggle className="flex items-center" />
          </div>
          <NotificationBell />
          <div className="hidden sm:block">
            <HeaderSearch />
          </div>
          <div className="hidden sm:block">{rightSlot}</div>
          <AuthButtons />

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden inline-flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-lg text-zinc-300 light:text-zinc-600 hover:bg-ink-700 light:hover:bg-zinc-100 transition me-0"
            aria-label={isEn ? "Menu" : "منو"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t border-ink-500 bg-ink-850"
          role="menu"
        >
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV_ITEMS.map((item, i) => {
              const active = item.slug === currentSlug;
              const label = isEn ? item.en : item.fa;
              const Icon = TAB_ICON ? TAB_ICON[item.slug] : null;
              return (
                <a
                  key={i}
                  href={item.href}
                  className={`px-3.5 py-2.5 rounded-xl text-[14.5px] transition-all flex items-center gap-2.5 ${
                    active
                      ? "bg-brand-green/15 light:bg-[#10B981]/15 text-brand-green font-bold"
                      : "text-zinc-300 light:text-zinc-600 hover:bg-ink-700/50 light:hover:bg-zinc-100"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {Icon && <Icon size={18} strokeWidth={active ? 2 : 1.5} />}
                  <span>{label}</span>
                  {active && (
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-brand-green ms-0.5"
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
            <div className="flex items-center justify-between pt-4 mt-2 border-t border-ink-500">
              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenSearch}
                  className="flex items-center gap-2 text-zinc-400 px-2 py-1.5"
                >
                  <IconSearch size={16} /> {t("search")}
                </button>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {rightSlot}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// ---------- HeaderSearch — جستجوی اینلاین در نوار بالا ----------
const HeaderSearch = () => {
  const [lang] = useLang();
  const isEn = lang === "EN";
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    const onGlobalKey = (e) => {
      // ignore if focus is inside input/textarea already (except if we want to close)
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        const mainInput = document.querySelector('input[type="search"]');
        if (
          mainInput &&
          mainInput !== inputRef.current &&
          mainInput.offsetParent !== null
        ) {
          return; // Let the main page search bar take it
        }
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onGlobalKey);
    return () => document.removeEventListener("keydown", onGlobalKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target))
        setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  
  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setResults(window.searchSite ? window.searchSite(q, 8) : []);
  }, [q]);

  const goAll = () => {
    if (q.trim())
      window.location.href = `search-results.html?q=${encodeURIComponent(q)}`;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    goAll();
  };

  return (
    <div ref={wrapRef} className="relative hidden md:block">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center h-9 w-9 rounded-lg text-zinc-400 hover:text-white hover:bg-ink-700 transition"
          aria-label={t("search")}
        >
          <IconSearch size={18} />
        </button>
      )}
      {open && (
        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 h-9 w-[320px] lg:w-[380px] rounded-lg bg-ink-800 border border-ink-400 px-2"
          style={{ animation: "fadein .18s ease-out both" }}
        >
          <span className="text-brand-red shrink-0">
            <IconSearch size={16} />
          </span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
            placeholder={t("searchAll")}
            aria-label={t("search")}
            className="flex-1 h-full bg-transparent border-0 outline-none text-[13px] text-white placeholder:text-zinc-500"
          />
          <button
            type="button"
            onClick={() => {
              setQ("");
              setOpen(false);
            }}
            className="shrink-0 text-zinc-500 hover:text-white"
            aria-label={t("close")}
          >
            <IconClose size={14} />
          </button>
        </form>
      )}
      {open && q.trim() && (
        <div
          className="absolute top-11 start-0 w-[420px] lg:w-[460px] bg-ink-800 border border-ink-500 rounded-xl shadow-2xl overflow-hidden z-50"
          style={{ animation: "fadein .2s ease-out both" }}
        >
          {results.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <div className="mx-auto w-10 h-10 rounded-full bg-ink-700 border border-ink-500 flex items-center justify-center text-zinc-500 mb-2">
                <IconSearch size={18} />
              </div>
              <div className="text-[13.5px] text-zinc-300 font-peyda font-semibold">
                {t("nothingFound")}
              </div>
              <div className="text-[12px] text-zinc-500 mt-1">
                {isEn ? `No results found for "${q}".` : `برای «${q}» نتیجه‌ای پیدا نشد.`}
              </div>
            </div>
          ) : (
            <React.Fragment>
              <div className="px-3 py-2 text-[11.5px] text-zinc-500 border-b border-ink-500 flex items-center justify-between">
                <span>
                  {results.length}{" "}
                  {t("results")}
                </span>
                <button
                  onClick={goAll}
                  className="text-brand-redSoft hover:text-brand-red flex items-center"
                >
                  {t("seeAll")}
                </button>
              </div>
              <ul className="max-h-[360px] overflow-auto scrollbar-hide">
                {results.map((r, i) => (
                  <li key={i}>
                    <button
                      onClick={goAll}
                      className="w-full text-start px-3 py-2.5 hover:bg-ink-700/70 transition flex items-start gap-3 border-b border-ink-500/60"
                    >
                      <span className="label-peyda shrink-0 px-2 py-0.5 rounded-full bg-brand-red/15 text-brand-redSoft border border-brand-red/25">
                        {r.category}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-[13px] text-white font-semibold leading-6 line-clamp-1">
                          {r.title}
                        </span>
                        <span className="block text-[11px] text-zinc-500 mt-0.5 line-clamp-1">
                          {r.section} · {r.meta}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  );
};

Object.assign(window, { LiveTicker, Header, HeaderSearch });

export { LiveTicker, Header, HeaderSearch };
