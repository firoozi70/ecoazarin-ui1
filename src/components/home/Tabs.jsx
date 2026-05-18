import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as Recharts from 'recharts';
const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { t } from '../../i18n/index';
import { motion, AnimatePresence } from 'motion/react';
import { TABS } from '../../data/mockData';
import { TAB_ICON } from '../ui/Icons';



// ---------- تب‌های دسته‌بندی — اکتیو-فیلد ساده، بدون پیل اسلایدینگ ----------
const CategoryTabs = ({ activeId, onChange, idPrefix = 'main' }) => {
  const tabs = window.TABS;
  return (
    <section className="px-4 md:px-6 max-w-[1400px] mx-auto" aria-label="دسته‌بندی محتوا">
      <div className="bg-ink-800/70 dark:bg-ink-800/70 light:bg-white/80 border border-ink-500 light:border-zinc-200 rounded-2xl p-1.5 md:p-2 backdrop-blur-md shadow-lg shadow-black/30 light:shadow-zinc-300/30">
        <div className="relative overflow-x-auto scrollbar-hide" role="tablist">
          <div className="flex md:grid md:grid-cols-7 gap-1 md:gap-1.5 min-w-max md:min-w-0">
            {tabs.map((tab) => {
              const Icon = TAB_ICON[tab.icon];
              const active = activeId === tab.id;
              return (
                <button
                  key={`${idPrefix}-${tab.id}`}
                  type="button"
                  onClick={() => onChange(tab.id)}
                  className={`relative shrink-0 md:shrink min-w-[96px] md:min-w-0 flex items-center justify-center gap-2 h-12 md:h-14 px-3 rounded-xl transition-all duration-300 ease-out ${
                  active ?
                  'bg-gradient-to-br from-brand-green to-emerald-400 text-black shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)]' :
                  'text-zinc-300 hover:text-white hover:bg-ink-700/50 light:text-zinc-600 light:hover:text-zinc-900 light:hover:bg-zinc-100'}`
                  }
                  aria-pressed={active}
                  aria-selected={active}
                  role="tab">
                  <Icon size={18} className={active ? 'text-black' : ''} />
                  <span className={`text-[12px] md:text-[13px] tracking-tight ${active ? 'font-extrabold text-black' : 'font-semibold'}`}>{t ? t('tab' + tab.id.charAt(0).toUpperCase() + tab.id.slice(1)) : tab.label}</span>
                </button>);
            })}
          </div>
        </div>
      </div>
    </section>);

};

// ---------- StickyTabs — پیل شناور هنگام اسکرول ----------
// Desktop: expand on hover (and click). Mobile/touch: tap to expand.
// Uses (hover: hover) media query via JS to detect touch devices.
const StickyTabs = ({ activeId, onChange }) => {
  const tabs = window.TABS;
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    // detect touch / hover capability
    const mq = window.matchMedia('(hover: none), (pointer: coarse)');
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      mq.removeEventListener?.('change', update);
    };
  }, []);

  const handleEnter = () => {
    if (isTouch) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const handleLeave = () => {
    if (isTouch) return;
    closeTimer.current = setTimeout(() => setOpen(false), 220);
  };
  const handlePillClick = () => {
    // works for both — desktop click is also fine, touch needs tap
    setOpen((o) => !o);
  };

  if (!show) return null;
  const activeTab = tabs.find((t) => t.id === activeId) || tabs[0];
  const ActiveIcon = TAB_ICON[activeTab.icon];

  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
      dir="rtl"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}>

      {/* Expanded panel — slides up from above the pill */}
      <div
        className={`absolute bottom-[58px] left-1/2 -translate-x-1/2 origin-bottom transition-all duration-250 ease-out ${
        open ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'}`
        }>
        <div className="bg-ink-800/95 border border-ink-500 backdrop-blur-xl rounded-2xl p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] w-[320px] max-w-[90vw]">
          <div className="grid grid-cols-2 gap-1">
            {tabs.map((tab) => {
              const Icon = TAB_ICON[tab.icon];
              const active = tab.id === activeId;
              return (
                <button
                  key={tab.id}
                  onClick={() => {onChange(tab.id);setOpen(false);window.scrollTo({ top: 0, behavior: 'smooth' });}}
                  className={`relative flex items-center gap-2.5 h-11 px-3 rounded-xl text-[12.5px] transition-all duration-200 ${
                  active ?
                  'bg-gradient-to-br from-brand-green to-emerald-400 text-black font-bold shadow-[0_4px_14px_-4px_rgba(16,185,129,0.5)]' :
                  'text-zinc-300 hover:bg-ink-700/80 hover:text-white'}`
                  }>
                  <Icon size={15} className="shrink-0" />
                  <span className="flex-1 text-right">{t ? t('tab' + tab.id.charAt(0).toUpperCase() + tab.id.slice(1)) : tab.label}</span>
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-black/70" />}
                </button>);

            })}
          </div>
        </div>
        {/* connector arrow */}
        <span className="block absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-ink-800/95 border-r border-b border-ink-500" />
      </div>

      {/* Compact pill */}
      <div className="flex items-center gap-1 bg-ink-800/95 border border-ink-500 backdrop-blur-xl rounded-full p-1.5 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]">
        <button
          onClick={handlePillClick}
          aria-expanded={open}
          aria-label="انتخاب دسته"
          className="group flex items-center gap-2 h-10 pr-3 pl-3 rounded-full bg-gradient-to-br from-brand-green to-emerald-400 text-black text-[12.5px] font-bold transition-all hover:shadow-[0_6px_18px_-6px_rgba(16,185,129,0.7)]">
          <ActiveIcon size={15} />
          <span className="max-w-[120px] truncate">{t ? t('tab' + activeTab.id.charAt(0).toUpperCase() + activeTab.id.slice(1)) : activeTab.label}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-black/60 animate-softPulse" aria-hidden="true" />
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </div>);

};


Object.assign(window, { CategoryTabs, StickyTabs });

export { CategoryTabs, StickyTabs };
