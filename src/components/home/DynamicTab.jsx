import * as Recharts from 'recharts';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { motion, AnimatePresence } from 'motion/react';
import { useLang, t } from '../../i18n/index';
import { EduTab, ArticlesTab } from './EduArticles';
import { TAB_CONTENT } from '../../data/mockData';

import { SectionBanner } from './Misc';
import { IconArrowLeft, IconSearch } from '../ui/Icons';



// ---------- محتوای داینامیک تب فعال ----------
const TabContent = ({ tabId }) => {
  const [lang] = useLang();
  const isEn = lang === 'EN';
  if (tabId === 'edu') return <EduTab />;
  if (tabId === 'articles') return <ArticlesTab />;
  const data = window.TAB_CONTENT[tabId];
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [query, setQuery] = useState('');
  const [paused, setPaused] = useState(false);
  
  // reset on tab change
  useEffect(() => {setCarouselIdx(0); setQuery('');}, [tabId]);

  const norm = (s) => (s||'').toString().replace(/[\u064B-\u065F\u0670]/g,'').replace(/[ي]/g,'ی').replace(/[ك]/g,'ک').replace(/\u200c/g,' ').toLowerCase();
  const nq = norm(query.trim());
  const visible = nq ? data.items.filter(it => norm(`${(isEn ? it.titleEn : it.titleFa)} ${it.tag||''} ${(isEn ? it.metaEn : it.metaFa)||''}`).includes(nq)) : data.items;
  
  const totalPages = Math.max(1, Math.ceil(visible.length / 4));
  
  useEffect(() => {
    if (paused || totalPages <= 1 || tabId !== 'news') return;
    const timer = setInterval(() => {
      setCarouselIdx(prev => (prev + 1) % totalPages);
    }, 4500);
    return () => clearInterval(timer);
  }, [paused, totalPages, tabId]);

  // Adjust carousel index if search shrinks the visible array
  useEffect(() => {
    if (carouselIdx >= totalPages) {
       setCarouselIdx(Math.max(0, totalPages - 1));
    }
  }, [totalPages, carouselIdx]);

  const currentItems = visible.slice(carouselIdx * 4, carouselIdx * 4 + 4);

  return (
    <section className="px-4 md:px-6 max-w-[1400px] mx-auto" aria-label={(isEn ? data.titleEn : data.titleFa)}>
      <div key={tabId} className="bg-ink-700/40 border border-ink-500 rounded-2xl p-5 md:p-8 min-h-[300px] tab-anim-card">
        <SectionBanner tabId={tabId} query={query} onQuery={setQuery} resultCount={visible.length} />
        <div className="flex items-end justify-between gap-4 flex-wrap text-start">
          <div>
            {tabId !== 'news' && (
              <div className="eyebrow-peyda text-brand-greenSoft">{isEn ? data.eyebrowEn || data.eyebrow : data.eyebrowFa || data.eyebrow}</div>
            )}
            <h3 className="mt-1.5 text-xl md:text-2xl font-bold tracking-tight">{(isEn ? data.titleEn : data.titleFa)}</h3>
            {tabId !== 'news' && (
              <p className="mt-1.5 text-[14px] text-zinc-400 max-w-xl leading-7">{isEn ? data.descEn || data.desc : data.descFa || data.desc}</p>
            )}
          </div>
          <a href="#" className="text-[12px] text-zinc-300 hover:text-white inline-flex items-center gap-1 group ltr:flex-row-reverse">
            {isEn ? 'View All' : 'مشاهده همه'}
            <IconArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform ltr:rotate-180" />
          </a>
        </div>

        {visible.length === 0 && (
          <div className="mt-8 rounded-xl border border-dashed border-ink-500 bg-ink-900/40 p-10 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-ink-800 border border-ink-500 flex items-center justify-center text-zinc-500 mb-3"><IconSearch size={20} /></div>
            <div className="text-[14px] font-bold text-zinc-200">{isEn ? 'Nothing Found' : 'چیزی یافت نشد'}</div>
            <div className="text-[12.5px] text-zinc-400 mt-1">{isEn ? `No results found for "${query}" in this section.` : `در این بخش برای «${query}» نتیجه‌ای پیدا نشد.`}</div>
          </div>
        )}
        <div 
          className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="popLayout">
            {currentItems.map((it, i) =>
            <motion.a 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                href={it.href || '#'} 
                key={`${tabId}-${carouselIdx}-${i}`} 
                className="card-hover group bg-ink-800/80 border border-ink-500 rounded-xl p-4 flex flex-col hover:bg-ink-800 transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-medium tracking-tight text-zinc-300 bg-ink-900 border border-ink-500 rounded-full px-2.5 py-1">{isEn ? it.tagEn || it.tag : it.tagFa || it.tag}</span>
                    {it.isFree && <span className="text-[11px] font-bold text-black bg-brand-green/80 rounded-full px-2 py-0.5">{isEn ? 'Free' : 'رایگان'}</span>}
                  </div>
                  <span className="stat-num text-[13px] text-zinc-300 ltr-num">{it.views}</span>
                </div>
                <h4 className="text-[15px] font-semibold leading-7 line-clamp-3 flex-1 group-hover:text-brand-green transition-colors text-start">{(isEn ? it.titleEn : it.titleFa)}</h4>
                <div className="mt-3 pt-3 border-t border-ink-500 flex items-center justify-between">
                  <span className="text-[12px] text-zinc-500">{(isEn ? it.metaEn : it.metaFa)}</span>
                  <span className="h-6 w-6 rounded-full bg-ink-900 border border-ink-500 flex items-center justify-center text-zinc-300 group-hover:bg-brand-green group-hover:text-black group-hover:border-brand-green transition-colors">
                    <IconArrowLeft size={12} className="ltr:rotate-180" />
                  </span>
                </div>
              </motion.a>
            )}
          </AnimatePresence>
        </div>

        {/* carousel dots */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-1.5 ltr:flex-row-reverse">
            {Array.from({length: totalPages}, (_, i) => i).map((i) =>
            <button key={i} onClick={() => setCarouselIdx(i)} aria-label={isEn ? `Page ${i + 1}` : `صفحه ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === carouselIdx ? 'w-6 bg-white' : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'}`} />
            )}
          </div>
        )}
      </div>
    </section>);

};

Object.assign(window, { TabContent });

export { TabContent };
