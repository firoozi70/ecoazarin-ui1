import * as Recharts from 'recharts';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { motion, AnimatePresence } from 'motion/react';
import { useLang, t } from '../../i18n/index';
import { IconClock, IconArrowLeft, IconEye } from '../ui/Icons';
import { SectionBanner } from './Misc';



// ---------- آموزش — دسته‌های موضوعی + گرید دوره‌ها ----------
const EDU_TOPICS = [
  { fa: 'فارکس', en: 'Forex' }, { fa: 'بورس', en: 'Stocks' }, { fa: 'کریپتو', en: 'Crypto' }, { fa: 'طلا و سکه', en: 'Gold & Coin' },
  { fa: 'پرتفوی', en: 'Portfolio' }, { fa: 'تحلیل تکنیکال', en: 'Technical Analysis' }, { fa: 'تحلیل بنیادی', en: 'Fundamental Analysis' }, { fa: 'مدیریت ریسک', en: 'Risk Management' },
  { fa: 'اقتصاد کلان', en: 'Macroeconomics' }, { fa: 'صندوق‌ها', en: 'Funds' }, { fa: 'مشتقه', en: 'Derivatives' }, { fa: 'ETF', en: 'ETF' },
  { fa: 'فین‌تک', en: 'FinTech' }, { fa: 'بانکداری', en: 'Banking' }, { fa: 'مالی شخصی', en: 'Personal Finance' }, { fa: 'بیمه', en: 'Insurance' }
];

const EDU_COURSES = [
{ titleFa: 'اصول معامله‌گری در بازار فارکس', titleEn: 'Trading Principles in Forex Market', instructorFa: 'فرشید شیرافکن', instructorEn: 'Farshid Shirafkan', hours: 20, priceFa: '۱۹۶٬۰۰۰', priceEn: '196,000', oldPriceFa: '۹۸۰٬۰۰۰', oldPriceEn: '980,000', discountFa: '۸۰٪', discountEn: '80%', badgeFa: 'شگفتی', badgeEn: 'Surprise', code: 'FX101' },
{ titleFa: 'ابزار تحلیل تکنیکال — اکسل پیشرفته', titleEn: 'Technical Analysis Tools — Advanced Excel', instructorFa: 'آرمان ری بد', instructorEn: 'Arman Reybod', hours: 13, priceFa: '۹۸٬۰۰۰', priceEn: '98,000', oldPriceFa: '۲۷۰٬۰۰۰', oldPriceEn: '270,000', discountFa: null, discountEn: null, badgeFa: 'شگفتی', badgeEn: 'Surprise', code: 'TA200' },
{ titleFa: 'ICDL مهارت‌های هفت‌گانه برای تحلیلگر مالی', titleEn: 'ICDL 7 Skills for Financial Analyst', instructorFa: 'امیررضا نیک‌خواه', instructorEn: 'Amirreza Nikkhah', hours: 14, priceFa: '۹۸٬۰۰۰', priceEn: '98,000', oldPriceFa: '۱۴۸٬۰۰۰', oldPriceEn: '148,000', discountFa: null, discountEn: null, badgeFa: 'شگفتی', badgeEn: 'Surprise', code: 'ICDL' },
{ titleFa: 'برنامه‌نویسی پایتون برای بازار سرمایه — مقدماتی', titleEn: 'Python Programming for Capital Market — Beginner', instructorFa: 'پژمان اقبالی شمس‌آبادی', instructorEn: 'Pejman Eghbali', hours: 22, priceFa: '۱۷۸٬۰۰۰', priceEn: '178,000', oldPriceFa: '۸۹۰٬۰۰۰', oldPriceEn: '890,000', discountFa: '۸۰٪', discountEn: '80%', badgeFa: null, badgeEn: null, code: 'PY100' }];

const EDU_LATEST = [
{ titleFa: 'طراحی مدار سرمایه‌گذاری با آلتیوم — کارگاه عملی', titleEn: 'Investment Circuit Design with Altium — Workshop', instructorFa: 'سید پدرام محسنی', instructorEn: 'Pedram Mohseni', hours: 7, priceFa: '۱٬۹۹۰٬۰۰۰', priceEn: '1,990,000', code: 'WS01' },
{ titleFa: 'مدیریت کیفیت پروژه بر اساس ایزو ۱۰۰۰۶', titleEn: 'Project Quality Management ISO 10006', instructorFa: 'آرزو صبری', instructorEn: 'Arezoo Sabri', hours: 3, priceFa: '۱٬۱۹۰٬۰۰۰', priceEn: '1,190,000', code: 'ISO' },
{ titleFa: 'زبان انگلیسی تخصصی مالی — فصل ۱۱ و ۱۲', titleEn: 'Specialized Financial English — Ch 11 & 12', instructorFa: 'میلاد جلالی', instructorEn: 'Milad Jalali', hours: 4, priceFa: '۱٬۲۹۰٬۰۰۰', priceEn: '1,290,000', code: 'EN12' },
{ titleFa: 'تصمیم‌گیری در شرایط عدم قطعیت', titleEn: 'Decision Making Under Uncertainty', instructorFa: 'غلامرضا بداقی', instructorEn: 'Gholamreza Bodaghi', hours: 2, priceFa: '۹۸۰٬۰۰۰', priceEn: '980,000', code: 'DEC' }];

const EDU_FILTERS = [
  { fa: 'همه', en: 'All' }, { fa: 'برنامه‌نویسی', en: 'Programming' }, { fa: 'هوش مصنوعی', en: 'AI' }, { fa: 'یادگیری ماشین', en: 'Machine Learning' }, 
  { fa: 'بورس و بازار مالی', en: 'Stock & Financial Markets' }, { fa: 'طراحی گرافیکی', en: 'Graphic Design' }, { fa: 'زبان', en: 'Language' }, { fa: 'علوم ریاضی', en: 'Math Science' }
];

const CourseCard = ({ c, withDiscount, isEn }) =>
<article className="card-hover bg-ink-800/60 border border-ink-500 rounded-2xl overflow-hidden hover:border-ink-400 flex flex-col h-full">
    <div className="relative aspect-[4/3] bg-gradient-to-br from-ink-700 to-ink-800 flex items-center justify-center placeholder-stripe shrink-0">
      <div className="relative text-zinc-300 font-mono text-[12.5px] font-bold tracking-wider">{c.code}</div>
      <button className="absolute top-2 start-2 h-7 w-7 rounded-md bg-ink-900/80 border border-ink-500 flex items-center justify-center text-zinc-300 hover:text-brand-red transition" aria-label="نشان">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 4h12v18l-6-4-6 4z" /></svg>
      </button>
      {withDiscount && (isEn ? c.discountEn : c.discountFa) &&
    <span className="stat-num absolute bottom-0 end-0 bg-brand-red text-pure-white text-[12px] font-bold px-2.5 py-1 rounded-tl-md">{isEn ? c.discountEn : c.discountFa}</span>
    }
      {withDiscount && (isEn ? c.badgeEn : c.badgeFa) &&
    <span className="absolute bottom-2 start-2 bg-brand-red text-pure-white text-[11px] font-bold px-2 py-0.5 rounded-md">{isEn ? c.badgeEn : c.badgeFa}</span>
    }
    </div>
    <div className="p-3 flex flex-col flex-1">
      <h4 className="text-[14px] font-bold leading-7 line-clamp-2 min-h-[56px] text-start">{(isEn ? c.titleEn : c.titleFa)}</h4>
      <div className="mt-2.5 space-y-1.5 text-[12.5px] text-zinc-400">
        <div className="flex items-center gap-1.5"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="3" /><path d="M5 20a7 7 0 0 1 14 0" /></svg> {isEn ? c.instructorEn : c.instructorFa}</div>
        <div className="flex items-center gap-1.5"><IconClock size={13} /> <span className="stat-num ltr-num">{c.hours}</span> {isEn ? 'hours' : 'ساعت'}</div>
      </div>
      <div className="mt-auto pt-2.5 border-t border-ink-500 flex items-center justify-between gap-2 text-start">
        {c.oldPriceFa && <span className="text-[11.5px] text-zinc-500 line-through stat-num ltr-num break-all min-w-[30%]">{isEn ? c.oldPriceEn : c.oldPriceFa}</span>}
        <span className="stat-num text-[15px] font-bold ltr-num ms-auto break-all text-end">{isEn ? c.priceEn : c.priceFa} <span className="text-[11px] font-medium text-zinc-400">{isEn ? 'Tomans' : 'تومان'}</span></span>
      </div>
    </div>
  </article>;


const EduTab = () => {
  const [lang] = useLang();
  const isEn = lang === 'EN';
  const [topicIdx, setTopicIdx] = useState(0);
  const [filter1, setFilter1] = useState(0);
  const [filter2, setFilter2] = useState(0);
  return (
    <section key="edu-section" className="px-4 md:px-6 max-w-[1400px] mx-auto tab-anim" aria-label="آموزش">
      <div className="bg-ink-700/40 border border-ink-500 rounded-2xl p-5 md:p-8 tab-anim-card">
        <SectionBanner tabId="edu" />

        <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
          <div className="text-start">
            <div className="eyebrow-peyda text-brand-greenSoft">{isEn ? 'EcoAzarin Academy' : 'مدرسه اکوآذرین'}</div>
            <h3 className="mt-1 text-xl md:text-2xl font-bold tracking-tight">{isEn ? 'Learn, then invest' : 'یاد بگیر، سپس سرمایه‌گذاری کن'}</h3>
            <p className="mt-1 text-[13px] text-zinc-400 max-w-xl leading-7">{isEn ? 'Structured courses from basic concepts to advanced technical analysis.' : 'دوره‌های ساختاریافته از مفاهیم پایه تا تحلیل تکنیکال پیشرفته.'}</p>
          </div>
        </div>

        {/* topic chips grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
          {EDU_TOPICS.slice(0, 16).map((t, i) =>
          <button key={i} onClick={() => setTopicIdx(i)}
          className="flex flex-col items-center gap-2 group transition focus:outline-none">
              <div className={`w-full aspect-square rounded-2xl flex items-center justify-center border transition-all duration-300 ease-out
                ${topicIdx === i ?
            'bg-gradient-to-br from-brand-red to-brand-redDark border-brand-red text-white shadow-[0_10px_24px_-10px_rgba(230,57,70,0.7)] scale-[1.04]' :
            'bg-ink-800/60 border-ink-500 text-zinc-400 group-hover:text-white group-hover:border-ink-400 group-hover:-translate-y-0.5'}`}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="9" r="3.5" /><path d="M5 21a7 7 0 0 1 14 0" />
                </svg>
              </div>
              <span className={`text-[12.5px] md:text-[13px] font-semibold transition-colors ${topicIdx === i ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>{isEn ? t.en : t.fa}</span>
            </button>
          )}
        </div>

        {/* row 1 — popular */}
        <div className="mt-10">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <h3 className="text-[15px] md:text-[17px] font-bold flex items-center gap-2"><span className="w-1 h-5 rounded bg-brand-red" /> {isEn ? 'Popular Courses' : 'آموزش‌های پرمخاطب'}</h3>
            <div className="flex items-center gap-1 bg-ink-800/70 border border-ink-500 rounded-full p-1 overflow-x-auto scrollbar-hide max-w-full backdrop-blur">
              {EDU_FILTERS.map((f, i) =>
              <button key={i} onClick={() => setFilter1(i)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200 ${
              filter1 === i ?
              'bg-gradient-to-br from-brand-red to-brand-redDark text-white shadow-[0_4px_14px_-4px_rgba(230,57,70,0.6)]' :
              'text-zinc-400 hover:text-white hover:bg-ink-700/60'}`
              }>{isEn ? f.en : f.fa}</button>
              )}
              <a href="#" className="shrink-0 text-[11px] text-brand-redSoft px-2 hover:text-brand-red transition ltr:flex-row-reverse flex">{isEn ? 'See All ‹' : 'دیدن همه ‹'}</a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {EDU_COURSES.map((c, i) => <CourseCard key={i} c={c} withDiscount isEn={isEn} />)}
          </div>
        </div>

        {/* row 2 — latest */}
        <div className="mt-10">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <h3 className="text-[15px] md:text-[17px] font-bold flex items-center gap-2"><span className="w-1 h-5 rounded bg-brand-red" /> {isEn ? 'Latest Courses' : 'جدیدترین آموزش‌ها'}</h3>
            <div className="flex items-center gap-1 bg-ink-800/70 border border-ink-500 rounded-full p-1 overflow-x-auto scrollbar-hide max-w-full backdrop-blur">
              {EDU_FILTERS.map((f, i) =>
              <button key={i} onClick={() => setFilter2(i)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200 ${
              filter2 === i ?
              'bg-gradient-to-br from-brand-red to-brand-redDark text-white shadow-[0_4px_14px_-4px_rgba(230,57,70,0.6)]' :
              'text-zinc-400 hover:text-white hover:bg-ink-700/60'}`
              }>{isEn ? f.en : f.fa}</button>
              )}
              <a href="#" className="shrink-0 text-[11px] text-brand-redSoft px-2 hover:text-brand-red transition ltr:flex-row-reverse flex">{isEn ? 'See All ‹' : 'دیدن همه ‹'}</a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {EDU_LATEST.map((c, i) => <CourseCard key={i} c={c} isEn={isEn} />)}
          </div>
        </div>
      </div>
    </section>);

};

// ---------- مقالات — کاروسل + گرید + لیست‌ها ----------
const ARTICLE_BULLETS = [
  { fa: 'تحلیل عمیق سیاست ارزی بانک مرکزی در فصل پیش رو', en: 'Deep analysis of Central Bank FX policy in the upcoming quarter' },
  { fa: 'پنج خطای رایج تازه‌واردان بازار سرمایه و راهکار اجتناب', en: 'Five common mistakes of stock market beginners and how to avoid them' },
  { fa: 'چگونه پرتفوی متناسب با ریسک شخصی بسازیم؟', en: 'How to build a portfolio tailored to personal risk?' },
  { fa: 'صنعت پتروشیمی ایران در گذرگاه قیمت‌گذاری دستوری', en: 'Iran\'s petrochemical industry at the crossroads of mandatory pricing' },
  { fa: 'بررسی صورت‌های مالی شرکت‌های بزرگ بورسی', en: 'Review of financial statements of large listed companies' },
  { fa: 'فین‌تک ایرانی در سال جدید — فرصت‌ها و چالش‌ها', en: 'Iranian FinTech in the new year — Opportunities and Challenges' }
];

const ARTICLE_FEATURED_CARDS = [
{ titleFa: 'تیتر مقاله مورد نظر، تیتر مقاله اصلی مورد نظر اکوآذرین', titleEn: 'Desired article title, main article title of EcoAzarin', views: 450, timeFa: '۲ روز قبل', timeEn: '2 days ago' },
{ titleFa: 'متن مورد نظر خبر متن مورد نظر خبر متن مورد نظر خبر', titleEn: 'Sample news text sample news text sample news text', views: 450, timeFa: '۲ روز قبل', timeEn: '2 days ago' },
{ titleFa: 'متن مورد نظر خبر متن مورد نظر خبر متن مورد نظر خبر', titleEn: 'Sample news text sample news text sample news text', views: 450, timeFa: '۲ روز قبل', timeEn: '2 days ago' },
{ titleFa: 'متن مورد نظر خبر متن مورد نظر خبر متن مورد نظر خبر', titleEn: 'Sample news text sample news text sample news text', views: 450, timeFa: '۲ روز قبل', timeEn: '2 days ago' }];

const ARTICLE_LIST_ITEM = { titleFa: 'متن مورد نظر خبر متن مورد نظر خبر متن مورد نظر خبر', titleEn: 'Sample news text sample news text sample news text', metaFa: '۲ روز قبل', metaEn: '2 days ago', views: '۴۵۰' };
const _list8 = Array.from({ length: 8 }, () => ARTICLE_LIST_ITEM);

// Sub-components for ArticlesTab
const ArticleCarousel = ({ isEn }) => {
  const slides = [
  { kickerFa: 'تحلیل بازار', kickerEn: 'Market Analysis', titleFa: 'مسیر دلار در فصل پیش‌رو', titleEn: 'Dollar path in the upcoming season', tone: 'red' },
  { kickerFa: 'پرونده ویژه', kickerEn: 'Special File', titleFa: 'بورس تهران؛ بازگشت یا اصلاح؟', titleEn: 'Tehran Stock Exchange; Return or Correction?', tone: 'green' },
  { kickerFa: 'گفت‌وگو', kickerEn: 'Interview', titleFa: 'اقتصاددان مهمان درباره تورم', titleEn: 'Guest economist on inflation', tone: 'red' },
  { kickerFa: 'پژوهش', kickerEn: 'Research', titleFa: 'صنعت پتروشیمی در ۱۴۰۵', titleEn: 'Petrochemical Industry in 2026', tone: 'green' },
  { kickerFa: 'بین‌الملل', kickerEn: 'International', titleFa: 'فدرال رزرو و موج بعدی نرخ بهره', titleEn: 'Fed and the next wave of interest rates', tone: 'red' },
  { kickerFa: 'فناوری', kickerEn: 'Technology', titleFa: 'فین‌تک ایرانی در سال جدید', titleEn: 'Iranian FinTech in the new year', tone: 'green' },
  { kickerFa: 'انرژی', kickerEn: 'Energy', titleFa: 'گاز ایران؛ مازاد یا کسری؟', titleEn: 'Iran\'s gas; Surplus or Deficit?', tone: 'red' }];

  const [idx, setIdx] = useState(2);
  useEffect(() => {
    const timer = setInterval(() => {
      if (window.innerWidth >= 768) {
        setIdx((i) => (i + 1) % slides.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);
  const s = slides[idx];
  return (
    <div className="relative bg-ink-800 border border-ink-500 rounded-xl overflow-hidden order-2 md:order-2 min-h-[260px] md:min-h-[300px]">
      <div className={`absolute inset-0 ${s.tone === 'red' ? 'bg-gradient-to-br from-brand-redDark/35 via-ink-800 to-ink-900' : 'bg-gradient-to-br from-emerald-900/35 via-ink-800 to-ink-900'} transition-all duration-700`} />
      <div className="absolute inset-0 dotted-bg opacity-40" />
      <div className="absolute -end-10 -top-10 w-40 h-40 rounded-full orb-red opacity-40" />
      <div className="absolute -start-12 -bottom-12 w-44 h-44 rounded-full orb-green opacity-30" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
      <div className="relative h-full flex flex-col justify-end p-5 md:p-7 items-start">
        <span className={`inline-flex items-center gap-1 self-start label-peyda px-2.5 py-1 rounded-full mb-3 ${s.tone === 'red' ? 'bg-brand-red/20 text-brand-redSoft border border-brand-red/30' : 'bg-brand-green/20 text-brand-greenSoft border border-brand-green/30'}`}>
          {isEn ? s.kickerEn : s.kickerFa}
        </span>
        <h4 className="text-lg md:text-xl font-bold leading-[1.6] line-clamp-2 text-pure-white max-w-md text-start">{isEn ? s.titleEn : s.titleFa}</h4>
        <div className="mt-4 hidden md:flex items-center gap-1.5 ltr:flex-row-reverse self-start">
          {slides.map((_, i) =>
          <button key={i} onClick={() => setIdx(i)} aria-label={isEn ? `Slide ${i + 1}` : `اسلاید ${i + 1}`}
          className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'}`} />
          )}
        </div>
      </div>
    </div>);

};

const ArticlesTab = () => {
  const [lang] = useLang();
  const isEn = lang === 'EN';
  return (
    <section key="articles-section" className="px-4 md:px-6 max-w-[1400px] mx-auto tab-anim" aria-label="مقالات">
      <div className="bg-ink-700/40 border border-ink-500 rounded-2xl p-5 md:p-8 tab-anim-card">
        <SectionBanner tabId="articles" />

        <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
          <div className="text-start">
            <div className="eyebrow-peyda text-brand-greenSoft">{isEn ? 'Analytical Articles' : 'مقالات تحلیلی'}</div>
            <h3 className="mt-1 text-xl md:text-2xl font-bold tracking-tight">{isEn ? 'Deeper than the daily headlines' : 'عمیق‌تر از تیتر روزنامه'}</h3>
            <p className="mt-1 text-[13px] text-zinc-400 max-w-xl leading-7">{isEn ? 'Long-form analytical articles from our research team and guest experts.' : 'مقالات بلندِ تحلیلی از تیم پژوهش و کارشناسان مهمان.'}</p>
          </div>
          <a href="#" className="text-[12px] text-zinc-300 hover:text-white inline-flex items-center gap-1 group ltr:flex-row-reverse">
            {isEn ? 'View All' : 'مشاهده همه'}
            <IconArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform ltr:rotate-180" />
          </a>
        </div>

        {/* carousel + bullets */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {/* bullets — RIGHT in RTL */}
          <div className="bg-ink-800/60 border border-ink-500 rounded-xl p-5 order-1 md:order-1 relative overflow-hidden">
            <h4 className="text-[13px] font-bold mb-4 flex items-center gap-2"><span className="w-1 h-4 rounded bg-brand-red" /> {isEn ? 'Research Headlines' : 'سرتیترهای پژوهشی'}</h4>
            <ul className="space-y-1">
              {ARTICLE_BULLETS.map((b, i) =>
              <li key={i} className="group flex items-center gap-3 text-[13px] text-zinc-300 leading-7 py-1.5 px-2 -mx-2 rounded-lg hover:bg-ink-700/40 hover:text-white transition cursor-pointer text-start">
                  <span className="num-display text-[10px] font-bold text-brand-red w-5 shrink-0 ltr-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="line-clamp-1 flex-1">{isEn ? b.en : b.fa}</span>
                  <IconArrowLeft size={12} className="text-zinc-500 group-hover:text-brand-red group-hover:-translate-x-0.5 transition-all opacity-0 group-hover:opacity-100 ltr:rotate-180" />
                </li>
              )}
            </ul>
          </div>
          {/* image carousel — LEFT in RTL */}
          <ArticleCarousel isEn={isEn} />
        </div>

        {/* featured 4 cards */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {ARTICLE_FEATURED_CARDS.map((c, i) =>
          <article key={i} className="card-hover bg-ink-800/60 border border-ink-500 rounded-xl overflow-hidden hover:border-ink-400">
              <div className="relative aspect-[4/3] bg-ink-700 overflow-hidden">
                <div className="absolute inset-0 placeholder-stripe opacity-90" />
                <div className="absolute inset-0 dotted-bg opacity-30" />
                <span className="absolute top-2 end-2 label-peyda bg-black/60 backdrop-blur-sm border border-white/15 rounded-full px-2.5 py-0.5 text-white">{isEn ? 'Article' : 'مقاله'}</span>
              </div>
              <div className="p-3 text-start">
                <h4 className="text-[13px] font-bold leading-6 line-clamp-2 min-h-[48px]">{(isEn ? c.titleEn : c.titleFa)}</h4>
                <div className="mt-2 pt-2 border-t border-ink-500 flex items-center justify-end gap-3 text-[11px] text-zinc-500 ltr:flex-row-reverse">
                  <span className="inline-flex items-center gap-1"><IconEye size={12} /> <span className="ltr-num tabular-nums">{c.views}</span></span>
                  <span className="inline-flex items-center gap-1"><IconClock size={12} /> {isEn ? c.timeEn : c.timeFa}</span>
                </div>
              </div>
            </article>
          )}
        </div>

        {/* three lists */}
        {[
        { titleFa: 'جدیدترین‌ها', titleEn: 'Latest', accent: 'bg-brand-red' },
        { titleFa: 'پربازدیدترین‌ها', titleEn: 'Most Popular', accent: 'bg-brand-green' },
        { titleFa: 'منتخب سردبیر', titleEn: 'Editor\'s Choice', accent: 'bg-brand-red' }].
        map((sec, idx) =>
        <div key={idx} className="mt-8">
            <h3 className="text-[14px] font-bold mb-3 flex items-center gap-2"><span className={`w-1 h-5 rounded ${sec.accent}`} /> {isEn ? sec.titleEn : sec.titleFa}</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3">
              {_list8.map((it, i) =>
            <div key={i} className={`card-hover flex items-center gap-2.5 bg-ink-800/60 border border-ink-500 rounded-lg p-2 hover:border-ink-400 hover:bg-ink-800/80 cursor-pointer text-start h-full ${i >= 4 ? 'hidden md:flex' : 'flex'}`}>
                  <div className="w-12 h-12 shrink-0 rounded-md placeholder-stripe border border-ink-500 overflow-hidden" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium leading-5 line-clamp-2">{(isEn ? it.titleEn : it.titleFa)}</p>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-zinc-500">
                      <span className="inline-flex items-center gap-1"><IconClock size={10} /> {(isEn ? it.metaEn : it.metaFa)}</span>
                      <span className="inline-flex items-center gap-1"><IconEye size={10} /> <span className="ltr-num tabular-nums">{it.views}</span></span>
                    </div>
                  </div>
                </div>
            )}
            </div>
            <div className="mt-3 md:hidden text-center">
              <a href="#" className="inline-block py-2 px-5 text-[12px] font-medium text-zinc-300 hover:text-white bg-ink-800 rounded-full border border-ink-500">
                {isEn ? 'View All' : 'مشاهده همه'}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>);

};


Object.assign(window, { EduTab, ArticlesTab });

export { EDU_TOPICS, EDU_COURSES, EDU_LATEST, EDU_FILTERS, CourseCard, EduTab, ARTICLE_BULLETS, ARTICLE_FEATURED_CARDS, ARTICLE_LIST_ITEM, _list8, ArticleCarousel, ArticlesTab };
