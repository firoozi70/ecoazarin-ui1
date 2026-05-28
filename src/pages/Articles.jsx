import ReactDOM from 'react-dom/client';
import * as Recharts from 'recharts';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { motion, AnimatePresence } from 'motion/react';
import { PageShell } from '../layouts/PageShell';
import { useLang } from '../i18n';

// articles.jsx — صفحهٔ مقالات (zoomit inspired)

const A_CATEGORIES = [
  { id:'all', l:'همه', i:'⊞' },
  { id:'macro', l:'اقتصاد کلان', i:'🌍' },
  { id:'crypto', l:'کریپتو', i:'⟁' },
  { id:'stocks', l:'بورس', i:'📈' },
  { id:'forex', l:'فارکس', i:'$' },
  { id:'gold', l:'طلا', i:'⛁' },
  { id:'opinion', l:'دیدگاه', i:'✍' },
];
const A_FEATURED = {
  cat:'macro', tag:'تحلیل ویژه', title:'چرا تورم نقطه‌ای این بار متفاوت است؟ مقایسهٔ ساختاری ۳ دههٔ گذشته', author:'دکتر سعید لیلاز', avatar:'س.ل', read:'۱۸ دقیقه', date:'۲ ساعت پیش', views:'۲۸٫۴K', img:'#0F172A',
  excerpt:'اقتصاد ایران در دو سال گذشته با موجی از تورم مواجه بوده که ساختار آن تفاوت‌های اساسی با دوره‌های پیشین دارد. در این تحلیل، با نگاه آماری به سه دههٔ گذشته بررسی می‌کنیم که چرا روش‌های سنتی مهار قیمت دیگر کارآمد نیستند…'
};
const A_LIST = [
  { cat:'crypto', tag:'بازار', title:'حلاجی بیت‌کوین: چرا چرخهٔ هاوینگ ۲۰۲۴ با گذشته فرق دارد', author:'آرمان موسوی', read:'۱۲ دقیقه', date:'۴ ساعت پیش', views:'۱۸٫۲K' },
  { cat:'stocks', tag:'تحلیل', title:'سهم‌های لبنی در بورس تهران: زمان ورود یا خروج؟', author:'مریم نوری', read:'۸ دقیقه', date:'۶ ساعت پیش', views:'۹٫۸K' },
  { cat:'forex', tag:'پیش‌بینی', title:'یورو/دلار در آستانهٔ تصمیم بانک مرکزی اروپا', author:'علی اکبری', read:'۶ دقیقه', date:'دیروز', views:'۷٫۲K' },
  { cat:'gold', tag:'تکنیکال', title:'اونس طلا: سناریو صعود تا ۲۴۰۰ دلار', author:'حسین رضایی', read:'۱۰ دقیقه', date:'دیروز', views:'۱۲٫۶K' },
  { cat:'opinion', tag:'یادداشت', title:'یادداشت سردبیر: ۵ خطای رایج معامله‌گر تازه‌کار', author:'سردبیر اکوآذرین', read:'۵ دقیقه', date:'۲ روز پیش', views:'۲۲٫۱K' },
  { cat:'macro', tag:'گزارش', title:'گزارش هفتگی بازارهای جهانی: هفتهٔ پر هیجان فدرال‌رزرو', author:'تیم اکونومیست', read:'۱۵ دقیقه', date:'۲ روز پیش', views:'۱۴٫۸K' },
  { cat:'crypto', tag:'تکنولوژی', title:'لایر-۲ اتریوم: کدام شبکه برای آیندهٔ DeFi برندهٔ نهایی است؟', author:'پارسا کریمی', read:'۱۴ دقیقه', date:'۳ روز پیش', views:'۸٫۹K' },
  { cat:'stocks', tag:'مصاحبه', title:'گفت‌وگو با مدیرعامل فولاد مبارکه: آیندهٔ صنعت فولاد', author:'الهام صادقی', read:'۲۰ دقیقه', date:'۳ روز پیش', views:'۱۹٫۳K' },
];
const SHADES = ['#0F172A','#1E1B4B','#3F1D1D','#0F2D24','#3F2D08','#2A0F3F','#0F2A3F','#3F0F1E'];

function ArticlesContent(){
  const [lang] = useLang();
  const isEn = lang === 'EN';
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const filtered = A_LIST.filter(a => (cat==='all' || a.cat===cat) && (!q.trim() || a.title.includes(q)));
  return (
    <section className="px-4 md:px-6 max-w-[1300px] mx-auto" data-screen-label="Articles">
      {/* hero search */}
      <div className="bg-ink-850 light:bg-white border border-ink-500 light:border-zinc-200 rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-redDark/20 light:bg-[#ff4b4b]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-700 ease-out" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-redDark/10 light:bg-[#ff4b4b]/5 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-redDark/10 light:bg-[#ff4b4b]/10 border border-brand-redDark/20 light:border-[#ff4b4b]/20 text-[#ff4b4b] font-semibold text-[12px] mb-5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            <span>{isEn ? 'Articles & Analysis' : 'مقالات و تحلیل‌ها'}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.3] text-white light:text-zinc-900">
            {isEn ? 'Read deeply on what matters in the market.' : 'آنچه در بازار مهم است، عمیق بخوان.'}
          </h1>
          <p className="text-zinc-400 light:text-zinc-500 text-[14.5px] mt-4 mb-8 max-w-xl leading-relaxed">
            {isEn ? 'Daily analyst reviews, weekly reports, and educational notes.' : 'تحلیل‌های روزانهٔ کارشناسان، گزارش‌های هفتگی و یادداشت‌های آموزشی.'}
          </p>
          <div className="bg-ink-900/50 light:bg-white border border-ink-500 light:border-zinc-300 rounded-2xl p-2 flex items-center gap-2 max-w-xl shadow-lg light:shadow-sm focus-within:border-[#ff4b4b]/50 focus-within:ring-4 focus-within:ring-[#ff4b4b]/10 transition-all">
            <svg className="w-5 h-5 text-zinc-500 ltr:ml-3 rtl:mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              value={q} 
              onChange={(e)=>setQ(e.target.value)} 
              placeholder={isEn ? "Search articles..." : "جستجو در عنوان مقاله…"} 
              className="flex-1 bg-transparent border-none outline-none text-[14.5px] font-medium text-white light:text-zinc-800 placeholder:text-zinc-600 light:placeholder:text-zinc-400 h-10 px-2" 
            />
            {q && (
              <button onClick={()=>setQ('')} className="w-8 h-8 flex items-center justify-center rounded-xl bg-ink-800 light:bg-zinc-100 text-zinc-400 hover:text-white light:hover:text-zinc-900 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* categories */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
        {A_CATEGORIES.map(c=><button key={c.id} onClick={()=>setCat(c.id)} className={`shrink-0 px-3.5 py-2 rounded-full text-[12.5px] border transition flex items-center gap-1.5 ${cat===c.id?'bg-brand-red text-white border-brand-red font-bold':'bg-ink-800 text-zinc-300 border-ink-500 hover:border-ink-400'}`}><span>{c.i}</span>{c.l}</button>)}
      </div>

      {/* featured */}
      {cat==='all' && !q && (
        <a href="#" className="grid md:grid-cols-2 gap-5 bg-ink-800 border border-ink-500 rounded-2xl overflow-hidden hover:border-ink-400 transition mb-8 group">
          <div className="aspect-[16/10] md:aspect-auto relative overflow-hidden" style={{ background: SHADES[1] }}>
            <div className="absolute inset-0 placeholder-stripe opacity-30" />
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-brand-red text-white text-[10.5px] font-bold">⭐ ویژه</div>
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white/80 text-[10.5px]"><span>{A_FEATURED.read}</span><span>•</span><span>{A_FEATURED.views} بازدید</span></div>
          </div>
          <div className="p-5 md:p-7">
            <span className="label-peyda px-2 py-0.5 rounded-md bg-brand-red/15 text-brand-redSoft border border-brand-red/30">{A_FEATURED.tag}</span>
            <h2 className="text-xl md:text-2xl font-extrabold mt-3 leading-snug group-hover:text-brand-redSoft transition">{A_FEATURED.title}</h2>
            <p className="text-[13px] text-zinc-400 mt-3 leading-7 line-clamp-3">{A_FEATURED.excerpt}</p>
            <div className="flex items-center gap-3 mt-5 pt-4 border-t border-ink-500/60">
              <span className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-redSoft to-brand-red text-white flex items-center justify-center text-[11px] font-bold">{A_FEATURED.avatar}</span>
              <div className="flex-1"><div className="text-[12.5px] font-bold">{A_FEATURED.author}</div><div className="text-[10.5px] text-zinc-500">{A_FEATURED.date}</div></div>
              <span className="text-[12px] text-brand-redSoft">ادامه ‹</span>
            </div>
          </div>
        </a>
      )}

      {/* grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((a,i)=>(
          <a href="#" key={i} className="bg-ink-800 border border-ink-500 rounded-xl overflow-hidden hover:border-ink-400 transition group flex flex-col">
            <div className="aspect-[16/10] relative overflow-hidden" style={{ background: SHADES[i%SHADES.length] }}>
              <div className="absolute inset-0 placeholder-stripe opacity-25" />
              <div className="absolute top-2.5 right-2.5 label-peyda px-2 py-0.5 rounded-md bg-black/60 text-white border border-white/10">{a.tag}</div>
              <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10.5px]">{a.read}</div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-[14.5px] font-bold leading-7 line-clamp-2 group-hover:text-brand-redSoft transition flex-1">{a.title}</h3>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-ink-500/60 text-[10.5px] text-zinc-500">
                <span>{a.author}</span>
                <span>{a.date} · {a.views}</span>
              </div>
            </div>
          </a>
        ))}
        {filtered.length===0 && <div className="sm:col-span-2 lg:col-span-3 bg-ink-800 border border-ink-500 rounded-xl p-10 text-center text-zinc-400">مقاله‌ای یافت نشد.</div>}
      </div>

      {/* newsletter */}
      <div className="mt-10 bg-gradient-to-l from-brand-green/20 via-ink-800 to-ink-800 border border-ink-500 rounded-2xl p-6 md:p-8 flex items-center gap-5 flex-wrap">
        <div className="flex-1 min-w-[260px]">
          <div className="text-[11px] text-brand-green font-bold mb-1">📬 خبرنامهٔ هفتگی</div>
          <h3 className="text-xl font-extrabold mb-1">هر شنبه صبح، خلاصهٔ بازارها در صندوق تو.</h3>
          <p className="text-[12.5px] text-zinc-400">بدون اسپم. تنها یک ایمیل در هفته از تیم سردبیری.</p>
        </div>
        <div className="flex gap-2 flex-1 min-w-[260px]">
          <input placeholder="email@example.com" className="flex-1 h-11 px-3 rounded-xl bg-ink-900 border border-ink-500 text-[13px] outline-none focus:border-brand-green ltr-num placeholder:text-zinc-500" />
          <button className="h-11 px-5 rounded-xl bg-brand-green text-black font-bold text-[12.5px]">عضویت</button>
        </div>
      </div>
    </section>
  );
}
function App(){ return <PageShell slug="articles"><ArticlesContent /></PageShell>; }
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

export { A_CATEGORIES, A_FEATURED, A_LIST, SHADES, ArticlesContent };
