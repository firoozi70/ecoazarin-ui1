import * as Recharts from 'recharts';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { motion, AnimatePresence } from 'motion/react';
import { HERO_SLIDES } from '../../data/mockData';
import { PodcastDuo, IconHeadphones, IconPlay, IconChevronLeft, IconChevronRight } from '../ui/Icons';
import { useLang } from '../../i18n/index';

// ---------- بنر هیرو (پادکست) — کاروسل ----------
const HeroCarousel = () => {
  const [lang] = useLang();
  const isEn = lang === "EN";
  const slides = window.HERO_SLIDES || [];
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const timer = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [paused, slides.length]);

  const s = slides[idx] || {};

  return (
    <section
      className="relative px-4 md:px-6 max-w-[1400px] mx-auto"
      aria-label={isEn ? "Special Podcast" : "پادکست ویژه"}
      data-screen-label="01 Hero Podcast"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[280px] md:h-[340px] rounded-2xl overflow-hidden hero-gradient">
        {/* big white circle behind faces */}
        <div
          className="absolute -start-10 md:start-12 top-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full bg-white/95"
          aria-hidden="true"
        />
        <div
          className="absolute -end-20 -bottom-20 w-[260px] h-[260px] rounded-full orb-red opacity-60"
          aria-hidden="true"
        />
        <div
          className="absolute top-6 start-1/3 w-[120px] h-[120px] rounded-full bg-white/10 blur-2xl"
          aria-hidden="true"
        />

        {/* podcast duo */}
        <div className="absolute bottom-0 -start-10 md:start-8 h-full w-[70%] md:w-[45%] flex items-end justify-start pointer-events-none opacity-30 md:opacity-100">
          <PodcastDuo className="h-full w-auto max-w-none transform rtl:-scale-x-100" />
        </div>

        {/* text */}
        <div className="relative h-full flex items-center z-10 pointer-events-none">
          <div
            key={idx}
            className="px-5 md:px-12 max-w-[100%] md:max-w-[55%] me-0 ms-auto text-end animate-[fade-in_0.5s_ease-out] pointer-events-auto"
            style={{ textAlign: 'start' }}
          >
            <div className="inline-flex items-center gap-2 bg-black/25 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1 text-[10px] md:text-[11px] font-medium" dir="ltr">
              <IconHeadphones size={12} />
              <span>{isEn ? s.badgeEn : s.badge}</span>
              <span className="opacity-60">•</span>
              <span className="opacity-80">{isEn ? s.episodeEn : s.episode}</span>
            </div>
            <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-[1.15] tracking-tight text-pure-white drop-shadow-md">
              {isEn ? s.titleEn : s.title}
            </h1>
            <p className="mt-2 text-[12px] md:text-sm text-pure-white/80 line-clamp-2 max-w-md">
              {isEn ? s.descEn : s.desc}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="podcasts.html"
                className="inline-flex items-center gap-2 h-10 md:h-11 px-5 rounded-xl bg-white text-brand-redDark text-[13px] md:text-sm font-semibold shadow-lg shadow-black/20 hover:shadow-black/40 transition hover:scale-105"
              >
                <IconPlay size={14} className="rtl:rotate-180" />
                {isEn ? s.ctaEn : s.cta}
              </a>
              <span className="hidden md:inline text-[11px] text-white/70 font-mono">
                {isEn ? s.durationEn : s.duration}
              </span>
            </div>
          </div>
        </div>

        {/* nav arrows — desktop */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIdx((i) => (i - 1 + slides.length) % slides.length);
          }}
          className="hidden md:flex absolute start-3 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur transition z-30 cursor-pointer"
          aria-label={isEn ? "Previous Slide" : "اسلاید قبلی"}
        >
          <IconChevronLeft size={18} className="rtl:rotate-180" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIdx((i) => (i + 1) % slides.length);
          }}
          className="hidden md:flex absolute end-3 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur transition z-30 cursor-pointer"
          aria-label={isEn ? "Next Slide" : "اسلاید بعدی"}
        >
          <IconChevronRight size={18} className="rtl:rotate-180" />
        </button>

        {/* dots */}
        <div
          className="absolute bottom-4 end-6 md:end-12 flex gap-1.5 z-30"
          role="tablist"
          aria-label={isEn ? "Select Slide" : "انتخاب اسلاید"}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.preventDefault();
                setIdx(i);
              }}
              aria-label={isEn ? `Slide ${i + 1}` : `اسلاید ${i + 1}`}
              aria-selected={i === idx}
              className={`h-1.5 p-0 outline-none cursor-pointer rounded-full transition-all ${i === idx ? "w-6 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70 shadow-sm"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { HeroCarousel });

export { HeroCarousel };
