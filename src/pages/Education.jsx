import ReactDOM from 'react-dom/client';
import * as Recharts from 'recharts';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { motion, AnimatePresence } from 'motion/react';
import { PageShell } from '../layouts/PageShell';
import { useLang } from '../i18n';

// education.jsx — آموزش جامع

const E_TRACKS = [
  { id:'beginner', l:'تازه‌کار', d:'از صفر تا اولین معامله', color:'#10B981', courses:18, hours:120, icon:'🌱' },
  { id:'inter',    l:'متوسط',   d:'تحلیل تکنیکال و فاندامنتال', color:'#3B82F6', courses:24, hours:180, icon:'📊' },
  { id:'pro',      l:'حرفه‌ای',  d:'استراتژی و مدیریت سرمایه', color:'#F59E0B', courses:16, hours:140, icon:'⚡' },
  { id:'algo',     l:'کوانت',   d:'برنامه‌نویسی و الگوریتم', color:'#A855F7', courses:12, hours:160, icon:'⚙' },
];
const E_TOPICS = ['تحلیل تکنیکال','تحلیل بنیادی','مدیریت ریسک','روان‌شناسی بازار','پرایس اکشن','پایتون برای بازار','الگوریتمیک','اقتصاد کلان','مشتقه','اختیار معامله','صندوق‌ها','بک‌تست','بازار طلا','کریپتو','فارکس','بورس'];
const E_COURSES = [
  { title:'پرایس اکشن از صفر تا صد', inst:'فرشید شیرافکن', hours:42, lessons:86, level:'متوسط', price:'۸۹۰٬۰۰۰', oldPrice:'۱٬۸۰۰٬۰۰۰', off:'-۵۰٪', students:'۱۲٬۴۰۰', rating:4.8, badge:'پرفروش‌ترین' },
  { title:'مدیریت ریسک و سرمایه پیشرفته', inst:'علی محمدی', hours:18, lessons:32, level:'حرفه‌ای', price:'۵۹۰٬۰۰۰', oldPrice:'۹۸۰٬۰۰۰', off:'-۴۰٪', students:'۸٬۲۰۰', rating:4.9, badge:null },
  { title:'پایتون برای معامله‌گران', inst:'پژمان اقبالی', hours:36, lessons:74, level:'کوانت', price:'۱٬۲۹۰٬۰۰۰', oldPrice:null, off:null, students:'۵٬۶۰۰', rating:4.7, badge:'جدید' },
  { title:'تحلیل بنیادی بازار سرمایه', inst:'مهرداد سعدی', hours:28, lessons:54, level:'متوسط', price:'۶۹۰٬۰۰۰', oldPrice:'۹۸۰٬۰۰۰', off:'-۳۰٪', students:'۷٬۸۰۰', rating:4.6, badge:null },
  { title:'روان‌شناسی معامله‌گر', inst:'دکتر سارا اکبری', hours:14, lessons:28, level:'تازه‌کار', price:'۳۹۰٬۰۰۰', oldPrice:null, off:null, students:'۹٬۸۰۰', rating:4.9, badge:null },
  { title:'استراتژی‌های اسکالپ روزانه', inst:'حسام رنجبر', hours:22, lessons:46, level:'حرفه‌ای', price:'۸۹۰٬۰۰۰', oldPrice:'۱٬۲۸۰٬۰۰۰', off:'-۳۰٪', students:'۴٬۲۰۰', rating:4.5, badge:null },
];
const LEVEL_COLOR = { 'تازه‌کار':'#10B981', 'متوسط':'#3B82F6', 'حرفه‌ای':'#F59E0B', 'کوانت':'#A855F7' };

function EducationContent(){
  const [lang] = useLang();
  const isEn = lang === 'EN';
  const [track, setTrack] = useState('all');
  const [topic, setTopic] = useState('');
  const filtered = E_COURSES.filter(c => (!topic || c.title.includes(topic) || c.inst.includes(topic)));
  return (
    <section className="px-4 md:px-6 max-w-[1400px] mx-auto" data-screen-label="Education">
      {/* hero */}
      <div className="bg-ink-850 light:bg-white border border-ink-500 light:border-zinc-200 rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-green/10 light:bg-brand-green/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-700 ease-out" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-green/5 light:bg-brand-green/5 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3" />
        
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
            <div><div className="text-[28px] font-extrabold stat-num text-brand-green">۷۰+</div><div className="text-[11px] text-zinc-400">دوره</div></div>
            <div><div className="text-[28px] font-extrabold stat-num text-brand-green">۲۸K</div><div className="text-[11px] text-zinc-400">دانشجو</div></div>
            <div><div className="text-[28px] font-extrabold stat-num text-brand-green">۹۸٪</div><div className="text-[11px] text-zinc-400">رضایت</div></div>
          </div>
        </div>
      </div>

      {/* tracks */}
      <h2 className="text-[15px] font-bold mb-3 mt-2">مسیرهای یادگیری</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {E_TRACKS.map(tr=>(
          <button key={tr.id} onClick={()=>setTrack(tr.id)} className={`text-right bg-ink-800 border rounded-xl p-4 transition hover:border-ink-400 ${track===tr.id?'border-2':'border'}`} style={{ borderColor: track===tr.id?tr.color:undefined }}>
            <div className="flex items-center gap-3 mb-3"><span className="h-10 w-10 rounded-xl flex items-center justify-center text-[20px]" style={{ background: tr.color+'20', border:`1px solid ${tr.color}40` }}>{tr.icon}</span><div className="flex-1"><div className="text-[14px] font-extrabold" style={{ color: tr.color }}>{tr.l}</div><div className="text-[10.5px] text-zinc-500">{tr.d}</div></div></div>
            <div className="flex items-center justify-between text-[11px] text-zinc-400"><span>{tr.courses} دوره</span><span>{tr.hours} ساعت</span></div>
          </button>
        ))}
      </div>

      {/* topics */}
      <div className="flex items-center gap-2 flex-wrap mb-5">
        <span className="text-[11.5px] text-zinc-500">موضوع:</span>
        <button onClick={()=>setTopic('')} className={`px-3 py-1 rounded-full text-[11.5px] border transition ${!topic?'bg-white text-black border-white font-bold':'bg-ink-800 text-zinc-300 border-ink-500 hover:border-ink-400'}`}>همه</button>
        {E_TOPICS.map(tp=><button key={tp} onClick={()=>setTopic(tp)} className={`px-3 py-1 rounded-full text-[11.5px] border transition ${topic===tp?'bg-white text-black border-white font-bold':'bg-ink-800 text-zinc-300 border-ink-500 hover:border-ink-400'}`}>{tp}</button>)}
      </div>

      {/* courses grid */}
      <h2 className="text-[15px] font-bold mb-3">دوره‌های منتخب</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filtered.map((c,i)=>(
          <article key={i} className="bg-ink-800 border border-ink-500 rounded-xl overflow-hidden hover:border-ink-400 transition group flex flex-col">
            <div className="relative aspect-[16/9] overflow-hidden" style={{ background:`linear-gradient(135deg, ${LEVEL_COLOR[c.level]}30, ${LEVEL_COLOR[c.level]}05)` }}>
              <div className="absolute inset-0 dotted-bg opacity-40" />
              <div className="absolute top-2.5 right-2.5 flex gap-1.5">{c.badge && <span className="label-peyda px-2 py-0.5 rounded-md bg-brand-red text-white">{c.badge}</span>}{c.off && <span className="label-peyda px-2 py-0.5 rounded-md bg-brand-green text-black">{c.off}</span>}</div>
              <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md text-[10.5px] font-bold" style={{ background: LEVEL_COLOR[c.level]+'30', color:LEVEL_COLOR[c.level], border:`1px solid ${LEVEL_COLOR[c.level]}50` }}>{c.level}</div>
              <div className="absolute inset-0 flex items-center justify-center"><span className="h-12 w-12 rounded-full bg-white/90 text-black flex items-center justify-center text-[20px] group-hover:scale-110 transition">▶</span></div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-center gap-1 text-[10.5px] text-amber-400 mb-1">★★★★★ <span className="text-zinc-400 mr-1">{c.rating} ({c.students})</span></div>
              <h3 className="text-[14.5px] font-bold leading-7 line-clamp-2 group-hover:text-brand-green transition flex-1">{c.title}</h3>
              <div className="text-[11.5px] text-zinc-400 mt-1.5">مدرس: {c.inst}</div>
              <div className="flex items-center gap-3 mt-2 text-[10.5px] text-zinc-500"><span>⏱ {c.hours} ساعت</span><span>📺 {c.lessons} درس</span></div>
              <div className="flex items-end justify-between mt-3 pt-3 border-t border-ink-500/60">
                <div>
                  {c.oldPrice && <div className="text-[10.5px] text-zinc-500 line-through num-display">{c.oldPrice}</div>}
                  <div className="text-[15px] font-extrabold stat-num text-brand-green">{c.price}<span className="text-[10px] font-medium text-zinc-500 mr-1">تومان</span></div>
                </div>
                <button className="h-9 px-3 rounded-lg bg-ink-700 text-white text-[11.5px] font-bold hover:bg-brand-green hover:text-black transition">ثبت‌نام</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* free resources */}
      <div className="grid md:grid-cols-3 gap-3 mb-6">
        {[
          {i:'🎬', t:'وبینارهای رایگان', d:'هر چهارشنبه ساعت ۲۰ — تحلیل زنده بازار', cta:'ثبت‌نام در وبینار بعدی'},
          {i:'📖', t:'کتابخانهٔ منابع', d:'۲۰۰+ مقاله و چیت‌شیت رایگان', cta:'مرور کتابخانه'},
          {i:'🎙', t:'پادکست هفتگی', d:'گفت‌وگو با تحلیلگران بازار', cta:'گوش کن'}
        ].map((r,i)=>(
          <a href="#" key={i} className="bg-ink-800 border border-ink-500 rounded-xl p-5 hover:border-ink-400 transition flex items-start gap-4">
            <span className="text-[28px]">{r.i}</span>
            <div className="flex-1"><div className="text-[14px] font-bold mb-1">{r.t}</div><div className="text-[12px] text-zinc-400 leading-6 mb-2">{r.d}</div><div className="text-[11.5px] text-brand-green font-bold">{r.cta} ›</div></div>
          </a>
        ))}
      </div>
    </section>
  );
}
function App(){ return <PageShell slug="education"><EducationContent /></PageShell>; }
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

export { E_TRACKS, E_TOPICS, E_COURSES, LEVEL_COLOR, EducationContent };
