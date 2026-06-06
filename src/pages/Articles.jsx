import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import * as Recharts from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { PageShell } from '../layouts/PageShell';
import { useLang } from '../i18n';

const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;

// articles.jsx — صفحهٔ مقالات (zoomit inspired)

const A_CATEGORIES = [
  { id:'all', lFa:'همه', lEn:'All', i:'⊞' },
  { id:'macro', lFa:'اقتصاد کلان', lEn:'Macro', i:'🌍' },
  { id:'crypto', lFa:'کریپتو', lEn:'Crypto', i:'⟁' },
  { id:'stocks', lFa:'بورس', lEn:'Stocks', i:'📈' },
  { id:'forex', lFa:'فارکس', lEn:'Forex', i:'$' },
  { id:'gold', lFa:'طلا', lEn:'Gold', i:'⛁' },
  { id:'opinion', lFa:'دیدگاه', lEn:'Opinion', i:'✍' },
];
const A_FEATURED = {
  cat:'macro', 
  tagFa:'تحلیل ویژه', tagEn:'Special Analysis',
  titleFa:'چرا تورم نقطه‌ای این بار متفاوت است؟ مقایسهٔ ساختاری ۳ دههٔ گذشته', titleEn:'Why is point-to-point inflation different this time? A structural comparison of the past 3 decades', 
  authorFa:'دکتر سعید لیلاز', authorEn:'Dr. Saied Leilaz', 
  avatarFa:'س.ل', avatarEn:'S.L', 
  readFa:'۱۸ دقیقه', readEn:'18 mins', 
  dateFa:'۲ ساعت پیش', dateEn:'2 hours ago', 
  viewsFa:'۲۸٫۴K', viewsEn:'28.4K', img:'#0F172A',
  excerptFa:'اقتصاد ایران در دو سال گذشته با موجی از تورم مواجه بوده که ساختار آن تفاوت‌های اساسی با دوره‌های پیشین دارد. در این تحلیل، با نگاه آماری به سه دههٔ گذشته بررسی می‌کنیم که چرا روش‌های سنتی مهار قیمت دیگر کارآمد نیستند…',
  excerptEn:'Iran\'s economy has faced a wave of inflation over the past two years, whose structure differs fundamentally from previous periods. In this analysis, looking back statistically over three decades, we examine why traditional price control methods are no longer effective…'
};
const A_LIST = [
  { cat:'crypto', tagFa:'بازار', tagEn:'Market', titleFa:'حلاجی بیت‌کوین: چرا چرخهٔ هاوینگ ۲۰۲۴ با گذشته فرق دارد', titleEn:'Bitcoin Analysis: Why the 2024 halving cycle is different', authorFa:'آرمان موسوی', authorEn:'Arman Mousavi', readFa:'۱۲ دقیقه', readEn:'12 mins', dateFa:'۴ ساعت پیش', dateEn:'4 hours ago', viewsFa:'۱۸٫۲K', viewsEn:'18.2K' },
  { cat:'stocks', tagFa:'تحلیل', tagEn:'Analysis', titleFa:'سهم‌های لبنی در بورس تهران: زمان ورود یا خروج؟', titleEn:'Dairy stocks in Tehran exchange: Time to enter or exit?', authorFa:'مریم نوری', authorEn:'Maryam Nouri', readFa:'۸ دقیقه', readEn:'8 mins', dateFa:'۶ ساعت پیش', dateEn:'6 hours ago', viewsFa:'۹٫۸K', viewsEn:'9.8K' },
  { cat:'forex', tagFa:'پیش‌بینی', tagEn:'Forecast', titleFa:'یورو/دلار در آستانهٔ تصمیم بانک مرکزی اروپا', titleEn:'EUR/USD ahead of ECB decision', authorFa:'علی اکبری', authorEn:'Ali Akbari', readFa:'۶ دقیقه', readEn:'6 mins', dateFa:'دیروز', dateEn:'Yesterday', viewsFa:'۷٫۲K', viewsEn:'7.2K' },
  { cat:'gold', tagFa:'تکنیکال', tagEn:'Technical', titleFa:'اونس طلا: سناریو صعود تا ۲۴۰۰ دلار', titleEn:'Gold Ounce: Bullish scenario to $2400', authorFa:'حسین رضایی', authorEn:'Hossein Rezaei', readFa:'۱۰ دقیقه', readEn:'10 mins', dateFa:'دیروز', dateEn:'Yesterday', viewsFa:'۱۲٫۶K', viewsEn:'12.6K' },
  { cat:'opinion', tagFa:'یادداشت', tagEn:'Note', titleFa:'یادداشت سردبیر: ۵ خطای رایج معامله‌گر تازه‌کار', titleEn:'Editor\'s Note: 5 common mistakes of novice traders', authorFa:'سردبیر اکوآذرین', authorEn:'EcoAzarin Editor', readFa:'۵ دقیقه', readEn:'5 mins', dateFa:'۲ روز پیش', dateEn:'2 days ago', viewsFa:'۲۲٫۱K', viewsEn:'22.1K' },
  { cat:'macro', tagFa:'گزارش', tagEn:'Report', titleFa:'گزارش هفتگی بازارهای جهانی: هفتهٔ پر هیجان فدرال‌رزرو', titleEn:'Global markets weekly report: Exciting week for the Fed', authorFa:'تیم اکونومیست', authorEn:'Economist Team', readFa:'۱۵ دقیقه', readEn:'15 mins', dateFa:'۲ روز پیش', dateEn:'2 days ago', viewsFa:'۱۴٫۸K', viewsEn:'14.8K' },
  { cat:'crypto', tagFa:'تکنولوژی', tagEn:'Tech', titleFa:'لایر-۲ اتریوم: کدام شبکه برای آیندهٔ DeFi برندهٔ نهایی است؟', titleEn:'Ethereum L2: Which network is the ultimate winner for DeFi\'s future?', authorFa:'پارسا کریمی', authorEn:'Parsa Karimi', readFa:'۱۴ دقیقه', readEn:'14 mins', dateFa:'۳ روز پیش', dateEn:'3 days ago', viewsFa:'۸٫۹K', viewsEn:'8.9K' },
  { cat:'stocks', tagFa:'مصاحبه', tagEn:'Interview', titleFa:'گفت‌وگو با مدیرعامل فولاد مبارکه: آیندهٔ صنعت فولاد', titleEn:'Interview with Mobarakeh Steel CEO: Future of the steel industry', authorFa:'الهام صادقی', authorEn:'Elham Sadeghi', readFa:'۲۰ دقیقه', readEn:'20 mins', dateFa:'۳ روز پیش', dateEn:'3 days ago', viewsFa:'۱۹٫۳K', viewsEn:'19.3K' },
];
const SHADES = ['#0F172A','#1E1B4B','#3F1D1D','#0F2D24','#3F2D08','#2A0F3F','#0F2A3F','#3F0F1E'];

function ArticlesContent(){
  const [lang] = useLang();
  const isEn = lang === 'EN';
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const filtered = A_LIST.filter(a => (cat==='all' || a.cat===cat) && (!q.trim() || (isEn ? a.titleEn : a.titleFa).toLowerCase().includes(q.toLowerCase())));
  return (
    <section className="px-4 md:px-6 max-w-[1300px] mx-auto" data-screen-label="Articles">
      {/* hero search */}
      <div className="bg-ink-850 light:bg-white border border-ink-500 light:border-zinc-200 rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden group">
        <div className="absolute top-0 end-0 w-[400px] h-[400px] bg-brand-redDark/20 light:bg-[#ff4b4b]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-700 ease-out" />
        <div className="absolute bottom-0 start-0 w-[300px] h-[300px] bg-brand-redDark/10 light:bg-[#ff4b4b]/5 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3" />
        
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
            <svg className="w-5 h-5 text-zinc-500 ms-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
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
        {A_CATEGORIES.map(c=><button key={c.id} onClick={()=>setCat(c.id)} className={`shrink-0 px-3.5 py-2 rounded-full text-[12.5px] border transition flex items-center gap-1.5 ${cat===c.id?'bg-brand-red text-white border-brand-red font-bold':'bg-ink-800 text-zinc-300 border-ink-500 hover:border-ink-400'}`}><span>{c.i}</span>{isEn ? c.lEn : c.lFa}</button>)}
      </div>

      {/* featured */}
      {cat==='all' && !q && (
        <a href="#" className="grid md:grid-cols-2 gap-5 bg-ink-800 border border-ink-500 rounded-2xl overflow-hidden hover:border-ink-400 transition mb-8 group">
          <div className="aspect-[16/10] md:aspect-auto relative overflow-hidden" style={{ background: SHADES[1] }}>
            <div className="absolute inset-0 placeholder-stripe opacity-30" />
            <div className="absolute top-3 end-3 px-2.5 py-1 rounded-md bg-brand-red text-white text-[10.5px] font-bold">⭐ {isEn ? 'Featured' : 'ویژه'}</div>
            <div className="absolute bottom-3 start-3 end-3 flex items-center gap-2 text-white/80 text-[10.5px] ltr-num" dir="ltr"><span>{isEn ? A_FEATURED.readEn : A_FEATURED.readFa}</span><span>•</span><span>{isEn ? A_FEATURED.viewsEn : A_FEATURED.viewsFa} {isEn ? 'views' : 'بازدید'}</span></div>
          </div>
          <div className="p-5 md:p-7">
            <span className="label-peyda px-2 py-0.5 rounded-md bg-brand-red/15 text-brand-redSoft border border-brand-red/30">{isEn ? A_FEATURED.tagEn : A_FEATURED.tagFa}</span>
            <h2 className="text-xl md:text-2xl font-extrabold mt-3 leading-snug group-hover:text-brand-redSoft transition">{isEn ? A_FEATURED.titleEn : A_FEATURED.titleFa}</h2>
            <p className="text-[13px] text-zinc-400 mt-3 leading-7 line-clamp-3">{isEn ? A_FEATURED.excerptEn : A_FEATURED.excerptFa}</p>
            <div className="flex items-center gap-3 mt-5 pt-4 border-t border-ink-500/60">
               <span className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-redSoft to-brand-red text-white flex items-center justify-center text-[11px] font-bold">{isEn ? A_FEATURED.avatarEn : A_FEATURED.avatarFa}</span>
               <div className="flex-1"><div className="text-[12.5px] font-bold">{isEn ? A_FEATURED.authorEn : A_FEATURED.authorFa}</div><div className="text-[10.5px] text-zinc-500">{isEn ? A_FEATURED.dateEn : A_FEATURED.dateFa}</div></div>
               <span className="text-[12px] text-brand-redSoft">{isEn ? 'Read More' : 'ادامه'} {isEn ? '›' : '‹'}</span>
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
              <div className="absolute top-2.5 end-2.5 label-peyda px-2 py-0.5 rounded-md bg-black/60 text-white border border-white/10">{isEn ? a.tagEn : a.tagFa}</div>
              <div className="absolute bottom-2.5 start-2.5 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10.5px]">{isEn ? a.readEn : a.readFa}</div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-[14.5px] font-bold leading-7 line-clamp-2 group-hover:text-brand-redSoft transition flex-1 text-start">{isEn ? a.titleEn : a.titleFa}</h3>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-ink-500/60 text-[10.5px] text-zinc-500">
                <span>{isEn ? a.authorEn : a.authorFa}</span>
                <span className="ltr-num" dir="ltr">{isEn ? a.dateEn : a.dateFa} · {isEn ? a.viewsEn : a.viewsFa}</span>
              </div>
            </div>
          </a>
        ))}
        {filtered.length===0 && <div className="sm:col-span-2 lg:col-span-3 bg-ink-800 border border-ink-500 rounded-xl p-10 text-center text-zinc-400">{isEn ? 'No articles found.' : 'مقاله‌ای یافت نشد.'}</div>}
      </div>

      {/* newsletter */}
      <div className="mt-10 bg-gradient-to-l rtl:from-brand-green/20 rtl:via-ink-800 rtl:to-ink-800 ltr:from-ink-800 ltr:via-ink-800 ltr:to-brand-green/20 border border-ink-500 rounded-2xl p-6 md:p-8 flex items-center gap-5 flex-wrap">
        <div className="flex-1 min-w-[260px] text-start">
          <div className="text-[11px] text-brand-green font-bold mb-1">📬 {isEn ? 'Weekly Newsletter' : 'خبرنامهٔ هفتگی'}</div>
          <h3 className="text-xl font-extrabold mb-1">{isEn ? 'Market summaries in your inbox every Saturday.' : 'هر شنبه صبح، خلاصهٔ بازارها در صندوق تو.'}</h3>
          <p className="text-[12.5px] text-zinc-400">{isEn ? 'No spam. Just one email a week from the editorial team.' : 'بدون اسپم. تنها یک ایمیل در هفته از تیم سردبیری.'}</p>
        </div>
        <div className="flex gap-2 flex-1 min-w-[260px] ltr">
          <input placeholder="email@example.com" className="flex-1 h-11 px-3 rounded-xl bg-ink-900 border border-ink-500 text-[13px] outline-none focus:border-brand-green ltr-num placeholder:text-zinc-500 text-start" />
          <button className="h-11 px-5 rounded-xl bg-brand-green text-black font-bold text-[12.5px]">{isEn ? 'Subscribe' : 'عضویت'}</button>
        </div>
      </div>
    </section>
  );
}
function App(){ return <PageShell slug="articles"><ArticlesContent /></PageShell>; }
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

export { A_CATEGORIES, A_FEATURED, A_LIST, SHADES, ArticlesContent };
