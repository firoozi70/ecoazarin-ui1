import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import * as Recharts from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { PageShell } from '../layouts/PageShell';
import { useLang, useLangRefresh } from '../i18n/index';

const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;

// education.jsx — آموزش جامع

const E_TRACKS = [
  { id:'beginner', lFa:'تازه‌کار', lEn:'Beginner', dFa:'از صفر تا اولین معامله', dEn:'From zero to first trade', color:'#10B981', courses:18, hours:120, icon:'🌱' },
  { id:'inter',    lFa:'متوسط',   lEn:'Intermediate', dFa:'تحلیل تکنیکال و فاندامنتال', dEn:'Tech & Fundamental analysis', color:'#3B82F6', courses:24, hours:180, icon:'📊' },
  { id:'pro',      lFa:'حرفه‌ای',  lEn:'Professional', dFa:'استراتژی و مدیریت سرمایه', dEn:'Strategy & Risk management', color:'#F59E0B', courses:16, hours:140, icon:'⚡' },
  { id:'algo',     lFa:'کوانت',   lEn:'Quantitative', dFa:'برنامه‌نویسی و الگوریتم', dEn:'Programming & Algorithms', color:'#A855F7', courses:12, hours:160, icon:'⚙' },
];
const E_TOPICS_FA = ['تحلیل تکنیکال','تحلیل بنیادی','مدیریت ریسک','روان‌شناسی بازار','پرایس اکشن','پایتون برای بازار','الگوریتمیک','اقتصاد کلان','مشتقه','اختیار معامله','صندوق‌ها','بک‌تست','بازار طلا','کریپتو','فارکس','بورس'];
const E_TOPICS_EN = ['Technical Analysis','Fundamental Analysis','Risk Management','Market Psychology','Price Action','Python for Markets','Algorithmic','Macroeconomics','Derivatives','Options','Funds','Backtesting','Gold Market','Crypto','Forex','Stocks'];

const E_COURSES = [
  { titleFa:'پرایس اکشن از صفر تا صد', titleEn:'Price Action From A to Z', instFa:'فرشید شیرافکن', instEn:'Farshid Shirafkan', hours:42, lessons:86, level:'متوسط', levelEn:'Intermediate', priceFa:'۸۹۰٬۰۰۰', priceEn:'890,000', oldPriceFa:'۱٬۸۰۰٬۰۰۰', oldPriceEn:'1,800,000', offFa:'-۵۰٪', offEn:'-50%', studentsFa:'۱۲٬۴۰۰', studentsEn:'12,400', rating:4.8, badgeFa:'پرفروش‌ترین', badgeEn:'Best Seller' },
  { titleFa:'مدیریت ریسک و سرمایه پیشرفته', titleEn:'Advanced Risk & Capital Management', instFa:'علی محمدی', instEn:'Ali Mohammadi', hours:18, lessons:32, level:'حرفه‌ای', levelEn:'Professional', priceFa:'۵۹۰٬۰۰۰', priceEn:'590,000', oldPriceFa:'۹۸۰٬۰۰۰', oldPriceEn:'980,000', offFa:'-۴۰٪', offEn:'-40%', studentsFa:'۸٬۲۰۰', studentsEn:'8,200', rating:4.9, badgeFa:null, badgeEn:null },
  { titleFa:'پایتون برای معامله‌گران', titleEn:'Python for Traders', instFa:'پژمان اقبالی', instEn:'Pejman Eghbali', hours:36, lessons:74, level:'کوانت', levelEn:'Quantitative', priceFa:'۱٬۲۹۰٬۰۰۰', priceEn:'1,290,000', oldPriceFa:null, oldPriceEn:null, offFa:null, offEn:null, studentsFa:'۵٬۶۰۰', studentsEn:'5,600', rating:4.7, badgeFa:'جدید', badgeEn:'New' },
  { titleFa:'تحلیل بنیادی بازار سرمایه', titleEn:'Capital Market Fundamental Analysis', instFa:'مهرداد سعدی', instEn:'Mehrdad Saadi', hours:28, lessons:54, level:'متوسط', levelEn:'Intermediate', priceFa:'۶۹۰٬۰۰۰', priceEn:'690,000', oldPriceFa:'۹۸۰٬۰۰۰', oldPriceEn:'980,000', offFa:'-۳۰٪', offEn:'-30%', studentsFa:'۷٬۸۰۰', studentsEn:'7,800', rating:4.6, badgeFa:null, badgeEn:null },
  { titleFa:'روان‌شناسی معامله‌گر', titleEn:'Trader Psychology', instFa:'دکتر سارا اکبری', instEn:'Dr. Sara Akbari', hours:14, lessons:28, level:'تازه‌کار', levelEn:'Beginner', priceFa:'۳۹۰٬۰۰۰', priceEn:'390,000', oldPriceFa:null, oldPriceEn:null, offFa:null, offEn:null, studentsFa:'۹٬۸۰۰', studentsEn:'9,800', rating:4.9, badgeFa:null, badgeEn:null },
  { titleFa:'استراتژی‌های اسکالپ روزانه', titleEn:'Daily Scalp Strategies', instFa:'حسام رنجبر', instEn:'Hesam Ranjbar', hours:22, lessons:46, level:'حرفه‌ای', levelEn:'Professional', priceFa:'۸۹۰٬۰۰۰', priceEn:'890,000', oldPriceFa:'۱٬۲۸۰٬۰۰۰', oldPriceEn:'1,280,000', offFa:'-۳۰٪', offEn:'-30%', studentsFa:'۴٬۲۰۰', studentsEn:'4,200', rating:4.5, badgeFa:null, badgeEn:null },
];
const LEVEL_COLOR = { 'تازه‌کار':'#10B981', 'متوسط':'#3B82F6', 'حرفه‌ای':'#F59E0B', 'کوانت':'#A855F7', 'Beginner':'#10B981', 'Intermediate':'#3B82F6', 'Professional':'#F59E0B', 'Quantitative':'#A855F7' };

function EducationContent(){
  const [lang] = useLang();
  useLangRefresh();
  const isEn = lang === 'EN';
  const [track, setTrack] = useState('all');
  const [topic, setTopic] = useState('');
  
  const E_TOPICS = isEn ? E_TOPICS_EN : E_TOPICS_FA;

  const filtered = E_COURSES.filter(c => {
    const title = isEn ? c.titleEn : c.titleFa;
    const inst = isEn ? c.instEn : c.instFa;
    return (!topic || title.includes(topic) || inst.includes(topic) || (!isEn && c.titleFa.includes(topic)) || (isEn && c.titleEn.includes(topic))); 
  });

  return (
    <section className="px-4 md:px-6 max-w-[1400px] mx-auto" data-screen-label="Education">
      {/* hero */}
      <div className="bg-ink-850 light:bg-white border border-ink-500 light:border-zinc-200 rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden group">
        <div className="absolute top-0 end-0 w-[500px] h-[500px] bg-brand-green/10 light:bg-brand-green/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-700 ease-out" />
        <div className="absolute bottom-0 start-0 w-[300px] h-[300px] bg-brand-green/5 light:bg-brand-green/5 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3" />
        
        <div className="relative grid md:grid-cols-[1fr_auto] items-center gap-8 md:gap-12 z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 light:bg-brand-green/10 border border-brand-green/20 text-brand-green font-semibold text-[12px] mb-5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
              <span>{isEn ? 'EcoAzarin Academy' : 'آکادمی اکوآذرین'}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.3] text-white light:text-zinc-900">
              {isEn ? 'Trade with knowledge, not guesses.' : 'بازار رو نه با حدس، با دانش معامله کن.'}
            </h1>
            <p className="text-zinc-400 light:text-zinc-500 text-[14.5px] mt-5 max-w-xl leading-relaxed">
              {isEn ? '70+ courses from beginner to expert, taught by recognized analysts and traders. With valid certification.' : '۷۰+ دوره از مبتدی تا پیشرفته، توسط تحلیلگران و مدرس‌های شناخته‌شدهٔ بازار. با گواهی‌نامهٔ معتبر.'}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <button className="h-12 px-6 rounded-xl bg-brand-green text-black font-bold text-[14px] hover:bg-[#10B981] hover:scale-105 active:scale-95 transition-all shadow-[0_4px_20px_-5px_rgba(16,185,129,0.4)]">
                {isEn ? 'Start free trial' : 'شروع رایگان'}
              </button>
              <button className="h-12 px-6 rounded-xl bg-ink-800 light:bg-zinc-50 text-white light:text-zinc-900 font-semibold border border-ink-500 light:border-zinc-200 text-[14px] hover:bg-ink-700 light:hover:bg-zinc-100 transition-colors">
                {isEn ? 'View courses' : 'مشاهدهٔ دوره‌ها'}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 md:gap-6 text-center">
            <div><div className="text-[28px] font-extrabold stat-num text-brand-green">{isEn ? '70+' : '۷۰+'}</div><div className="text-[11px] text-zinc-400">{isEn ? 'Courses' : 'دوره'}</div></div>
            <div><div className="text-[28px] font-extrabold stat-num text-brand-green">{isEn ? '28K' : '۲۸K'}</div><div className="text-[11px] text-zinc-400">{isEn ? 'Students' : 'دانشجو'}</div></div>
            <div><div className="text-[28px] font-extrabold stat-num text-brand-green">{isEn ? '98%' : '۹۸٪'}</div><div className="text-[11px] text-zinc-400">{isEn ? 'Satisfaction' : 'رضایت'}</div></div>
          </div>
        </div>
      </div>

      {/* tracks */}
      <h2 className="text-[15px] font-bold mb-3 mt-2">{isEn ? 'Learning Tracks' : 'مسیرهای یادگیری'}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {E_TRACKS.map(tr=>(
          <button key={tr.id} onClick={()=>setTrack(tr.id)} className={`text-start bg-ink-800 border rounded-xl p-4 transition hover:border-ink-400 ${track===tr.id?'border-2':'border'}`} style={{ borderColor: track===tr.id?tr.color:undefined }}>
            <div className="flex items-center gap-3 mb-3"><span className="h-10 w-10 rounded-xl flex items-center justify-center text-[20px]" style={{ background: tr.color+'20', border:`1px solid ${tr.color}40` }}>{tr.icon}</span><div className="flex-1"><div className="text-[14px] font-extrabold" style={{ color: tr.color }}>{isEn ? tr.lEn : tr.lFa}</div><div className="text-[10.5px] text-zinc-500">{isEn ? tr.dEn : tr.dFa}</div></div></div>
            <div className="flex items-center justify-between text-[11px] text-zinc-400"><span>{tr.courses} {isEn ? 'Courses' : 'دوره'}</span><span>{tr.hours} {isEn ? 'Hours' : 'ساعت'}</span></div>
          </button>
        ))}
      </div>

      {/* topics */}
      <div className="flex items-center gap-2 flex-wrap mb-5">
        <span className="text-[11.5px] text-zinc-500">{isEn ? 'Topic:' : 'موضوع:'}</span>
        <button onClick={()=>setTopic('')} className={`px-3 py-1 rounded-full text-[11.5px] border transition ${!topic?'bg-white text-black border-white font-bold':'bg-ink-800 text-zinc-300 border-ink-500 hover:border-ink-400'}`}>{isEn ? 'All' : 'همه'}</button>
        {E_TOPICS.map((tp, idx)=><button key={tp} onClick={()=>setTopic(E_TOPICS[idx])} className={`px-3 py-1 rounded-full text-[11.5px] border transition ${topic===E_TOPICS[idx]?'bg-white text-black border-white font-bold':'bg-ink-800 text-zinc-300 border-ink-500 hover:border-ink-400'}`}>{tp}</button>)}
      </div>

      {/* courses grid */}
      <h2 className="text-[15px] font-bold mb-3">{isEn ? 'Featured Courses' : 'دوره‌های منتخب'}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filtered.map((c,i)=>{
          const level = isEn ? c.levelEn : c.level;
          const badge = isEn ? c.badgeEn : c.badgeFa;
          const off = isEn ? c.offEn : c.offFa;
          return (
          <article key={i} className="bg-ink-800 border border-ink-500 rounded-xl overflow-hidden hover:border-ink-400 transition group flex flex-col">
            <div className="relative aspect-[16/9] overflow-hidden" style={{ background:`linear-gradient(135deg, ${LEVEL_COLOR[level]}30, ${LEVEL_COLOR[level]}05)` }}>
              <div className="absolute inset-0 dotted-bg opacity-40" />
              <div className="absolute top-2.5 end-2.5 flex gap-1.5">{badge && <span className="label-peyda px-2 py-0.5 rounded-md bg-brand-red text-white">{badge}</span>}{off && <span className="label-peyda px-2 py-0.5 rounded-md bg-brand-green text-black">{off}</span>}</div>
              <div className="absolute bottom-2.5 start-2.5 px-2 py-0.5 rounded-md text-[10.5px] font-bold" style={{ background: LEVEL_COLOR[level]+'30', color:LEVEL_COLOR[level], border:`1px solid ${LEVEL_COLOR[level]}50` }}>{level}</div>
              <div className="absolute inset-0 flex items-center justify-center"><span className="h-12 w-12 rounded-full bg-white/90 text-black flex items-center justify-center text-[20px] group-hover:scale-110 transition">▶</span></div>
            </div>
            <div className="p-4 flex-1 flex flex-col items-start text-start">
              <div className="flex items-center gap-1 text-[10.5px] text-amber-400 mb-1">★★★★★ <span className="text-zinc-400 mx-1">{c.rating} ({isEn ? c.studentsEn : c.studentsFa})</span></div>
              <h3 className="text-[14.5px] font-bold leading-7 line-clamp-2 group-hover:text-brand-green transition flex-1 w-full text-start">{isEn ? c.titleEn : c.titleFa}</h3>
              <div className="text-[11.5px] text-zinc-400 mt-1.5">{isEn ? 'Instructor:' : 'مدرس:'} {isEn ? c.instEn : c.instFa}</div>
              <div className="flex items-center gap-3 mt-2 text-[10.5px] text-zinc-500"><span>⏱ {c.hours} {isEn ? 'hours' : 'ساعت'}</span><span>📺 {c.lessons} {isEn ? 'lessons' : 'درس'}</span></div>
              <div className="flex w-full items-end justify-between mt-3 pt-3 border-t border-ink-500/60">
                <div className="text-start">
                  {c.oldPriceFa && <div className="text-[10.5px] text-zinc-500 line-through num-display text-start w-full">{isEn ? c.oldPriceEn : c.oldPriceFa}</div>}
                  <div className="text-[15px] font-extrabold stat-num text-brand-green">{isEn ? c.priceEn : c.priceFa}<span className="text-[10px] font-medium text-zinc-500 mx-1">{isEn ? 'Tomans' : 'تومان'}</span></div>
                </div>
                <button className="h-9 px-3 rounded-lg bg-ink-700 text-white text-[11.5px] font-bold hover:bg-brand-green hover:text-black transition">{isEn ? 'Enroll' : 'ثبت‌نام'}</button>
              </div>
            </div>
          </article>
        )})}
      </div>

      {/* free resources */}
      <div className="grid md:grid-cols-3 gap-3 mb-6">
        {[
          {i:'🎬', tFa:'وبینارهای رایگان', tEn:'Free Webinars', dFa:'هر چهارشنبه ساعت ۲۰ — تحلیل زنده بازار', dEn:'Every Wednesday 8PM - Live market analysis', ctaFa:'ثبت‌نام در وبینار بعدی', ctaEn:'Register for next webinar'},
          {i:'📖', tFa:'کتابخانهٔ منابع', tEn:'Resource Library', dFa:'۲۰۰+ مقاله و چیت‌شیت رایگان', dEn:'200+ free articles and cheat sheets', ctaFa:'مرور کتابخانه', ctaEn:'Browse library'},
          {i:'🎙', tFa:'پادکست هفتگی', tEn:'Weekly Podcast', dFa:'گفت‌وگو با تحلیلگران بازار', dEn:'Interviews with market analysts', ctaFa:'گوش کن', ctaEn:'Listen now'}
        ].map((r,i)=>(
          <a href="#" key={i} className="bg-ink-800 border border-ink-500 rounded-xl p-5 hover:border-ink-400 transition flex items-start gap-4">
            <span className="text-[28px]">{r.i}</span>
            <div className="flex-1 text-start"><div className="text-[14px] font-bold mb-1">{isEn ? r.tEn : r.tFa}</div><div className="text-[12px] text-zinc-400 leading-6 mb-2">{isEn ? r.dEn : r.dFa}</div><div className={`text-[11.5px] text-brand-green font-bold flex items-center ${isEn ? 'flex-row-reverse w-min' : ''}`}><span>›</span> <span className="mx-1">{isEn ? r.ctaEn : r.ctaFa}</span> </div></div>
          </a>
        ))}
      </div>
    </section>
  );
}
function App(){ return <PageShell slug="education"><EducationContent /></PageShell>; }
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

export { E_TRACKS, E_TOPICS_FA, E_COURSES, LEVEL_COLOR, EducationContent };

