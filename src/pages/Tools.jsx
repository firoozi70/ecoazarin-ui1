import ReactDOM from 'react-dom/client';
import * as Recharts from 'recharts';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { motion, AnimatePresence } from 'motion/react';

import { PageShell } from '../layouts/PageShell';
import { useLang } from '../i18n';

// tools.jsx — ابزارهای ترید

const T_CATS = [
  { id:'all', l:'همه', i:'⊞' },
  { id:'indi', l:'اندیکاتورها', i:'📐' },
  { id:'eas', l:'اکسپرت‌ها', i:'🤖' },
  { id:'scan', l:'اسکنرها', i:'🔍' },
  { id:'risk', l:'مدیریت ریسک', i:'🛡' },
  { id:'data', l:'داده‌ها', i:'📡' },
];
const T_TOOLS = [
  { cat:'indi', n:'EcoTrend Pro — اندیکاتور روند ترکیبی', d:'ترکیبی از EMA، Supertrend و VWAP با هشدار صوتی روی تغییر روند. سازگار با MT4/MT5 و TradingView.', price:'۸۹۰٬۰۰۰', oldPrice:'۱٬۶۰۰٬۰۰۰', rating:4.9, sales:1280, badge:'پرفروش', plat:['MT5','TV'] },
  { cat:'eas',  n:'Azarin Scalper EA', d:'اکسپرت اسکالپ خودکار با مدیریت ریسک پویا. مناسب جفت‌ارزهای اصلی فارکس.', price:'۲٬۴۹۰٬۰۰۰', oldPrice:null, rating:4.7, sales:480, badge:'حرفه‌ای', plat:['MT4','MT5'] },
  { cat:'scan', n:'Multi-TF Scanner — اسکنر بازار', d:'اسکن همزمان ۲۵۰+ نماد در ۸ تایم‌فریم برای یافتن ست‌آپ‌ها. خروجی CSV و وب‌هوک.', price:'۵۹۰٬۰۰۰', oldPrice:'۹۸۰٬۰۰۰', rating:4.8, sales:920, badge:'محبوب', plat:['Web'] },
  { cat:'risk', n:'Position Sizer — ماشین‌حساب حجم', d:'محاسبهٔ خودکار حجم پوزیشن بر اساس درصد ریسک، استاپ و موجودی حساب.', price:'رایگان', oldPrice:null, rating:4.9, sales:8400, badge:'رایگان', plat:['Web','iOS','Android'] },
  { cat:'data', n:'Live Order-Flow Feed', d:'فید زندهٔ جریان سفارش‌های بایننس و CME با تأخیر زیر ۳۰۰ms. اشتراک ماهانه.', price:'۹۸۰٬۰۰۰/ماه', oldPrice:null, rating:4.6, sales:240, badge:'جدید', plat:['API'] },
  { cat:'indi', n:'Smart Money Concepts Pack', d:'پک کامل اندیکاتورهای SMC: Order Block، FVG، Liquidity Pool. فارسی شده.', price:'۱٬۲۸۰٬۰۰۰', oldPrice:'۲٬۲۰۰٬۰۰۰', rating:4.8, sales:1840, badge:null, plat:['TV'] },
  { cat:'risk', n:'Drawdown Guard EA', d:'محافظت خودکار از حساب در برابر دراودان غیرمنتظره. بستن تمام پوزیشن‌ها بر اساس حد آستانه.', price:'۶۹۰٬۰۰۰', oldPrice:null, rating:4.7, sales:620, badge:null, plat:['MT5'] },
  { cat:'eas', n:'Grid Bot — Crypto', d:'ربات گرید برای صرافی‌های اصلی کریپتو با بک‌تست داخلی و کنترل ریسک.', price:'۱٬۴۹۰٬۰۰۰', oldPrice:'۲٬۲۰۰٬۰۰۰', rating:4.5, sales:540, badge:null, plat:['Binance','Bybit'] },
];
const PLAT_COLOR = { MT4:'#3B82F6', MT5:'#1D4ED8', TV:'#10B981', Web:'#8B5CF6', iOS:'#71717A', Android:'#10B981', API:'#F59E0B', Binance:'#F0B90B', Bybit:'#F7A600' };

function ToolsContent(){
  const [lang] = useLang();
  const isEn = lang === 'EN';
  const [cat, setCat] = useState('all');
  const list = T_TOOLS.filter(t=>cat==='all'||t.cat===cat);
  return (
    <section className="px-4 md:px-6 max-w-[1400px] mx-auto" data-screen-label="Tools">
      <div className="bg-ink-850 light:bg-white border border-ink-500 light:border-zinc-200 rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-green/10 light:bg-brand-green/10 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/3 group-hover:scale-110 transition-transform duration-700 ease-out" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-green/5 light:bg-brand-green/10 rounded-full blur-[70px] translate-y-1/3 translate-x-1/4" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 light:bg-brand-green/10 border border-brand-green/20 text-brand-green font-semibold text-[12px] mb-5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span>{isEn ? 'Toolbox' : 'ابزارخانه'}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.3] text-white light:text-zinc-900">
            {isEn ? 'Tools the professionals use.' : 'ابزارهایی که حرفه‌ای‌ها استفاده می‌کنند.'}
          </h1>
          <p className="text-zinc-400 light:text-zinc-500 text-[14.5px] mt-4 max-w-xl leading-relaxed">
            {isEn ? 'Indicators, expert advisors, scanners, and data feeds — tested by the EcoAzarin team.' : 'اندیکاتور، اکسپرت، اسکنر و فید داده — تست شده توسط تیم اکوآذرین.'}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-hide pb-2">
        {T_CATS.map(c=><button key={c.id} onClick={()=>setCat(c.id)} className={`shrink-0 px-3.5 py-2 rounded-full text-[12.5px] border transition flex items-center gap-1.5 ${cat===c.id?'bg-brand-green text-black border-brand-green font-bold':'bg-ink-800 text-zinc-300 border-ink-500 hover:border-ink-400'}`}><span>{c.i}</span>{c.l}</button>)}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((t,i)=>(
          <article key={i} className="bg-ink-800 border border-ink-500 rounded-xl p-5 hover:border-ink-400 transition flex flex-col">
            <div className="flex items-start gap-3 mb-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-green/20 to-emerald-700/10 border border-brand-green/30 flex items-center justify-center text-[22px]">{T_CATS.find(c=>c.id===t.cat)?.i}</div>
              <div className="flex-1 min-w-0">
                {t.badge && <span className="label-peyda px-1.5 py-0.5 rounded bg-brand-red/15 text-brand-redSoft border border-brand-red/30 mb-1 inline-block">{t.badge}</span>}
                <h3 className="text-[14.5px] font-bold leading-6">{t.n}</h3>
              </div>
            </div>
            <p className="text-[12px] text-zinc-400 leading-6 mb-3 flex-1">{t.d}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {t.plat.map(p=><span key={p} className="text-[10px] px-2 py-0.5 rounded font-bold" style={{ background:PLAT_COLOR[p]+'25', color:PLAT_COLOR[p], border:`1px solid ${PLAT_COLOR[p]}40` }}>{p}</span>)}
            </div>
            <div className="flex items-center gap-2 text-[10.5px] text-zinc-500 mb-3"><span className="text-amber-400">★ {t.rating}</span><span>·</span><span>{t.sales.toLocaleString('fa-IR')} فروش</span></div>
            <div className="flex items-end justify-between pt-3 border-t border-ink-500/60">
              <div>{t.oldPrice && <div className="text-[10.5px] text-zinc-500 line-through num-display">{t.oldPrice}</div>}<div className="text-[15px] font-extrabold stat-num text-brand-green">{t.price}<span className="text-[10px] font-medium text-zinc-500 mr-1">{t.price==='رایگان'?'':'تومان'}</span></div></div>
              <button className="h-9 px-4 rounded-lg bg-brand-green text-black text-[12px] font-bold hover:bg-brand-greenSoft">خرید</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function App(){ return <PageShell slug="tools"><ToolsContent /></PageShell>; }
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

export { T_CATS, T_TOOLS, PLAT_COLOR, ToolsContent };
