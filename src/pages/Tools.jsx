import ReactDOM from 'react-dom/client';
import * as Recharts from 'recharts';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { motion, AnimatePresence } from 'motion/react';

import { PageShell } from '../layouts/PageShell';
import { useLang } from '../i18n';

// tools.jsx — ابزارهای ترید

const T_CATS = [
  { id:'all', lFa:'همه', lEn:'All', i:'⊞' },
  { id:'indi', lFa:'اندیکاتورها', lEn:'Indicators', i:'📐' },
  { id:'eas', lFa:'اکسپرت‌ها', lEn:'Expert Advisors', i:'🤖' },
  { id:'scan', lFa:'اسکنرها', lEn:'Scanners', i:'🔍' },
  { id:'risk', lFa:'مدیریت ریسک', lEn:'Risk Management', i:'🛡' },
  { id:'data', lFa:'داده‌ها', lEn:'Data Feeds', i:'📡' },
];
const T_TOOLS = [
  { cat:'indi', nFa:'EcoTrend Pro — اندیکاتور روند ترکیبی', nEn:'EcoTrend Pro — Hybrid Trend Indicator', dFa:'ترکیبی از EMA، Supertrend و VWAP با هشدار صوتی روی تغییر روند. سازگار با MT4/MT5 و TradingView.', dEn:'Combination of EMA, Supertrend, and VWAP with audio alerts on trend change. Compatible with MT4/MT5 and TradingView.', priceFa:'۸۹۰٬۰۰۰', priceEn:'890,000', oldPriceFa:'۱٬۶۰۰٬۰۰۰', oldPriceEn:'1,600,000', rating:4.9, sales:1280, badgeFa:'پرفروش', badgeEn:'Best Seller', plat:['MT5','TV'] },
  { cat:'eas',  nFa:'Azarin Scalper EA', nEn:'Azarin Scalper EA', dFa:'اکسپرت اسکالپ خودکار با مدیریت ریسک پویا. مناسب جفت‌ارزهای اصلی فارکس.', dEn:'Automated scalping EA with dynamic risk management. Suitable for major Forex pairs.', priceFa:'۲٬۴۹۰٬۰۰۰', priceEn:'2,490,000', oldPriceFa:null, oldPriceEn:null, rating:4.7, sales:480, badgeFa:'حرفه‌ای', badgeEn:'Pro', plat:['MT4','MT5'] },
  { cat:'scan', nFa:'Multi-TF Scanner — اسکنر بازار', nEn:'Multi-TF Scanner — Market Dashboard', dFa:'اسکن همزمان ۲۵۰+ نماد در ۸ تایم‌فریم برای یافتن ست‌آپ‌ها. خروجی CSV و وب‌هوک.', dEn:'Simultaneous scan of 250+ pairs across 8 timeframes. CSV export and Webhooks.', priceFa:'۵۹۰٬۰۰۰', priceEn:'590,000', oldPriceFa:'۹۸۰٬۰۰۰', oldPriceEn:'980,000', rating:4.8, sales:920, badgeFa:'محبوب', badgeEn:'Popular', plat:['Web'] },
  { cat:'risk', nFa:'Position Sizer — ماشین‌حساب حجم', nEn:'Position Sizer — Volume Calculator', dFa:'محاسبهٔ خودکار حجم پوزیشن بر اساس درصد ریسک، استاپ و موجودی حساب.', dEn:'Automated position sizing based on risk percentage, stop loss, and account balance.', priceFa:'رایگان', priceEn:'Free', oldPriceFa:null, oldPriceEn:null, rating:4.9, sales:8400, badgeFa:'رایگان', badgeEn:'Free', plat:['Web','iOS','Android'] },
  { cat:'data', nFa:'Live Order-Flow Feed', nEn:'Live Order-Flow Feed', dFa:'فید زندهٔ جریان سفارش‌های بایننس و CME با تأخیر زیر ۳۰۰ms. اشتراک ماهانه.', dEn:'Live order-flow feed for Binance and CME with under 300ms latency. Monthly.', priceFa:'۹۸۰٬۰۰۰', priceEn:'980,000', oldPriceFa:null, oldPriceEn:null, rating:4.6, sales:240, badgeFa:'جدید', badgeEn:'New', plat:['API'] },
  { cat:'indi', nFa:'Smart Money Concepts Pack', nEn:'Smart Money Concepts Pack', dFa:'پک کامل اندیکاتورهای SMC: Order Block، FVG، Liquidity Pool. فارسی شده.', dEn:'Complete SMC indicators pack: Order Blocks, FVG, Liquidity Pools. Translated.', priceFa:'۱٬۲۸۰٬۰۰۰', priceEn:'1,280,000', oldPriceFa:'۲٬۲۰۰٬۰۰۰', oldPriceEn:'2,200,000', rating:4.8, sales:1840, badgeFa:null, badgeEn:null, plat:['TV'] },
  { cat:'risk', nFa:'Drawdown Guard EA', nEn:'Drawdown Guard EA', dFa:'محافظت خودکار از حساب در برابر دراودان غیرمنتظره. بستن تمام پوزیشن‌ها بر اساس حد آستانه.', dEn:'Automated account protection against unexpected drawdowns. Close all by threshold.', priceFa:'۶۹۰٬۰۰۰', priceEn:'690,000', oldPriceFa:null, oldPriceEn:null, rating:4.7, sales:620, badgeFa:null, badgeEn:null, plat:['MT5'] },
  { cat:'eas', nFa:'Grid Bot — Crypto', nEn:'Grid Bot — Crypto', dFa:'ربات گرید برای صرافی‌های اصلی کریپتو با بک‌تست داخلی و کنترل ریسک.', dEn:'Grid bot for major crypto exchanges with built-in backtesting and risk control.', priceFa:'۱٬۴۹۰٬۰۰۰', priceEn:'1,490,000', oldPriceFa:'۲٬۲۰۰٬۰۰۰', oldPriceEn:'2,200,000', rating:4.5, sales:540, badgeFa:null, badgeEn:null, plat:['Binance','Bybit'] },
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
        <div className="absolute top-0 start-0 w-[500px] h-[500px] bg-brand-green/10 light:bg-brand-green/10 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/3 group-hover:scale-110 transition-transform duration-700 ease-out" />
        <div className="absolute bottom-0 end-0 w-[400px] h-[400px] bg-brand-green/5 light:bg-brand-green/10 rounded-full blur-[70px] translate-y-1/3 translate-x-1/4" />
        
        <div className="relative z-10 text-start">
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
        {T_CATS.map(c=><button key={c.id} onClick={()=>setCat(c.id)} className={`shrink-0 px-3.5 py-2 rounded-full text-[12.5px] border transition flex items-center gap-1.5 ${cat===c.id?'bg-brand-green text-black border-brand-green font-bold':'bg-ink-800 text-zinc-300 border-ink-500 hover:border-ink-400'}`}><span>{c.i}</span>{isEn ? c.lEn : c.lFa}</button>)}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((t,i)=>{
          const n = isEn ? t.nEn : t.nFa;
          const d = isEn ? t.dEn : t.dFa;
          const badge = isEn ? t.badgeEn : t.badgeFa;
          const price = isEn ? t.priceEn : t.priceFa;
          const oldPrice = isEn ? t.oldPriceEn : t.oldPriceFa;
          const isFree = t.priceFa === 'رایگان';

          return (
          <article key={i} className="bg-ink-800 border border-ink-500 rounded-xl p-5 hover:border-ink-400 transition flex flex-col text-start">
            <div className="flex items-start gap-3 mb-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-green/20 to-emerald-700/10 border border-brand-green/30 flex items-center justify-center text-[22px]">{T_CATS.find(c=>c.id===t.cat)?.i}</div>
              <div className="flex-1 min-w-0">
                {badge && <span className="label-peyda px-1.5 py-0.5 rounded bg-brand-red/15 text-brand-redSoft border border-brand-red/30 mb-1 inline-block">{badge}</span>}
                <h3 className="text-[14.5px] font-bold leading-6">{n}</h3>
              </div>
            </div>
            <p className="text-[12px] text-zinc-400 leading-6 mb-3 flex-1">{d}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {t.plat.map(p=><span key={p} className="text-[10px] px-2 py-0.5 rounded font-bold ltr-num" style={{ background:PLAT_COLOR[p]+'25', color:PLAT_COLOR[p], border:`1px solid ${PLAT_COLOR[p]}40` }}>{p}</span>)}
            </div>
            <div className="flex items-center gap-2 text-[10.5px] text-zinc-500 mb-3"><span className="text-amber-400">★ {t.rating}</span><span>·</span><span>{t.sales.toLocaleString(isEn ? 'en-US' : 'fa-IR')} {isEn ? 'Sales' : 'فروش'}</span></div>
            <div className="flex items-end justify-between pt-3 border-t border-ink-500/60">
              <div>{oldPrice && <div className="text-[10.5px] text-zinc-500 line-through num-display text-start w-full">{oldPrice}</div>}<div className="text-[15px] font-extrabold stat-num text-brand-green">{price}<span className="text-[10px] font-medium text-zinc-500 mx-1">{isFree ? '' : (isEn ? 'Tomans' : 'تومان')}</span></div></div>
              <button className="h-9 px-4 rounded-lg bg-brand-green text-black text-[12px] font-bold hover:bg-brand-greenSoft">{isFree ? (isEn ? 'Get' : 'دریافت') : (isEn ? 'Buy' : 'خرید')}</button>
            </div>
          </article>
        )})}
      </div>
    </section>
  );
}
function App(){ return <PageShell slug="tools"><ToolsContent /></PageShell>; }
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

export { T_CATS, T_TOOLS, PLAT_COLOR, ToolsContent };
