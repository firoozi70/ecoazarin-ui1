import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import * as Recharts from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { PageShell } from '../layouts/PageShell';
import { useLang, useLangRefresh } from '../i18n';

const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;

// charts.jsx — صفحهٔ چارت (TradingView inspired)

const C_SYMBOLS = [
  { sym:'BTC/USDT', nameFa:'بیت‌کوین', nameEn:'Bitcoin',  price:68210, change:-1.04, vol:'28.5B' },
  { sym:'ETH/USDT', nameFa:'اتریوم',  nameEn:'Ethereum', price:3488,  change:+2.11, vol:'14.2B' },
  { sym:'XAU/USD',  nameFa:'طلای جهانی', nameEn:'Gold',     price:2348,  change:+0.62, vol:'8.9B' },
  { sym:'EUR/USD',  nameFa:'یورو/دلار', nameEn:'EUR/USD',  price:1.085, change:+0.18, vol:'98B' },
  { sym:'GBP/USD',  nameFa:'پوند/دلار', nameEn:'GBP/USD',  price:1.251, change:+0.21, vol:'45B' },
  { sym:'USD/JPY',  nameFa:'دلار/ین',   nameEn:'USD/JPY',  price:154.88,change:-0.05, vol:'62B' },
  { sym:'WTI',      nameFa:'نفت WTI',  nameEn:'WTI Crude',price:78.42, change:-0.89, vol:'4.2B' },
  { sym:'SOL/USDT', nameFa:'سولانا',    nameEn:'Solana',   price:152,   change:+3.42, vol:'2.8B' },
];
const C_TIMEFRAMES = ['1m','5m','15m','1H','4H','1D','1W','1M'];
const C_INDICATORS = [
  { id:'ma20',   name:'MA 20',        on:true },
  { id:'ma50',   name:'MA 50',        on:true },
  { id:'ema200', name:'EMA 200',      on:false },
  { id:'rsi',    name:'RSI (14)',     on:true },
  { id:'macd',   name:'MACD',         on:false },
  { id:'bb',     name:'Bollinger',    on:false },
  { id:'vol',    name:'Volume',       on:true },
];
const C_TOOLS = [
  { id:'cursor',  i:'➤', tFa:'مکان‌نما', tEn:'Cursor' },
  { id:'cross',   i:'✛', tFa:'کراس‌هیر', tEn:'Crosshair' },
  { id:'trend',   i:'╱', tFa:'خط روند', tEn:'Trend Line' },
  { id:'hline',   i:'⎯', tFa:'خط افقی', tEn:'Horizontal' },
  { id:'fib',     i:'∮', tFa:'فیبوناچی', tEn:'Fibonacci' },
  { id:'rect',    i:'▭', tFa:'مستطیل', tEn:'Rectangle' },
  { id:'text',    i:'T', tFa:'متن', tEn:'Text' },
  { id:'ruler',   i:'◷', tFa:'خط‌کش', tEn:'Ruler' },
];

function ChartsContent() {
  const [lang] = useLang();
  useLangRefresh();
  const isEn = lang === 'EN';

  const [active, setActive] = useState(0);
  const [tf, setTf] = useState('1H');
  const [tool, setTool] = useState('cross');
  const [inds, setInds] = useState(C_INDICATORS);
  const s = C_SYMBOLS[active];

  // tiny candles - generated mock
  const candles = Array.from({length:60},(_,i)=>{
    const o = 100 + Math.sin(i*0.2)*15 + i*0.4;
    const c = o + (Math.random()-0.4)*8;
    const h = Math.max(o,c) + Math.random()*4;
    const l = Math.min(o,c) - Math.random()*4;
    return { o, c, h, l, up:c>=o };
  });

  return (
    <section className="px-3 md:px-4 max-w-[1600px] mx-auto" data-screen-label="Charts">
      {/* topbar: symbol + price */}
      <div className="bg-ink-800 border border-ink-500 rounded-xl p-3 mb-2 flex items-center gap-3 flex-wrap">
        <button className="flex items-center gap-2 h-9 px-3 rounded-lg bg-ink-700 hover:bg-ink-600 transition">
          <span className="font-mono text-[14px] font-bold">{s.sym}</span>
          <span className="text-[10.5px] text-zinc-500">{isEn ? s.nameEn : s.nameFa}</span>
          <span className="text-zinc-500">▾</span>
        </button>
        <div className="flex items-baseline gap-2">
          <span className="num-display text-[20px] font-extrabold">{s.price.toLocaleString('en-US')}</span>
          <span className={`text-[12px] font-bold py-1 ${s.change>=0?'text-brand-green':'text-brand-red'}`}>{s.change>=0?'+':''}{s.change}%</span>
        </div>
        <div className="flex gap-1 mx-3 text-[11px] ltr-num" dir="ltr">
          <span className="text-zinc-500">O <span className="text-zinc-300 num-display">{(s.price*0.998).toFixed(2)}</span></span>
          <span className="text-zinc-500 ml-2">H <span className="text-brand-green num-display">{(s.price*1.005).toFixed(2)}</span></span>
          <span className="text-zinc-500 ml-2">L <span className="text-brand-red num-display">{(s.price*0.995).toFixed(2)}</span></span>
          <span className="text-zinc-500 ml-2">Vol <span className="text-zinc-300 num-display">{s.vol}</span></span>
        </div>
        <div className="flex bg-ink-700 rounded-lg p-0.5 ml-auto text-[11px] ltr-num" dir="ltr">
          {C_TIMEFRAMES.map(f=><button key={f} onClick={()=>setTf(f)} className={`px-2.5 py-1 rounded-md transition ${tf===f?'bg-brand-red text-white font-bold':'text-zinc-400 hover:text-white'}`}>{f}</button>)}
        </div>
        <div className="flex gap-1.5">
          <button className="h-9 px-3 rounded-lg bg-ink-700 hover:bg-ink-600 text-[11.5px] flex items-center gap-1.5">📷 {isEn ? 'Screenshot' : 'اسکرین‌شات'}</button>
          <button className="h-9 px-3 rounded-lg bg-ink-700 hover:bg-ink-600 text-[11.5px] flex items-center gap-1.5">⚡ {isEn ? 'Alert' : 'هشدار'}</button>
          <button className="h-9 px-4 rounded-lg bg-brand-green text-black font-bold text-[11.5px]">+ {isEn ? 'Trade' : 'معامله'}</button>
        </div>
      </div>

      {/* main grid */}
      <div className="grid lg:grid-cols-[44px_1fr_280px] gap-2">
        {/* tools */}
        <div className="bg-ink-800 border border-ink-500 rounded-xl py-2 grid auto-rows-min gap-1 lg:order-1 order-2 flex flex-row lg:flex-col">
           {C_TOOLS.map(tt=><button key={tt.id} onClick={()=>setTool(tt.id)} title={isEn ? tt.tEn : tt.tFa} className={`h-10 mx-1 rounded-lg flex items-center justify-center text-[14px] transition ${tool===tt.id?'bg-brand-red text-white':'text-zinc-400 hover:bg-ink-700 hover:text-white'}`}>{tt.i}</button>)}
        </div>
        {/* chart */}
        <div className="bg-ink-800 border border-ink-500 rounded-xl overflow-hidden lg:order-2 order-1 flex flex-col">
          <div className="relative h-[440px] md:h-[560px]" style={{ background: 'linear-gradient(180deg,#0d0d10 0%, #131316 100%)' }}>
            {/* grid */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 360" preserveAspectRatio="none">
              {Array.from({length:8},(_,i)=>(<line key={'h'+i} x1="0" x2="600" y1={i*45+10} y2={i*45+10} stroke="rgba(255,255,255,0.04)" />))}
              {Array.from({length:12},(_,i)=>(<line key={'v'+i} y1="0" y2="360" x1={i*50+25} x2={i*50+25} stroke="rgba(255,255,255,0.04)" />))}
              {/* MA lines */}
              <path d="M0,200 Q60,180 120,170 T240,140 T360,120 T480,90 T600,60" stroke="#F59E0B" strokeWidth="1.4" fill="none" opacity="0.85" />
              <path d="M0,230 Q80,210 160,205 T320,180 T480,160 T600,140" stroke="#3B82F6" strokeWidth="1.4" fill="none" opacity="0.85" />
              {/* candles */}
              {candles.map((c,i)=>{
                const x = i*9.5 + 8;
                const fy = (v)=>320 - (v-80)*4.5;
                return (<g key={i}>
                  <line x1={x+3} x2={x+3} y1={fy(c.h)} y2={fy(c.l)} stroke={c.up?'#10B981':'#E63946'} strokeWidth="1" />
                  <rect x={x} width="6" y={fy(Math.max(c.o,c.c))} height={Math.max(2,Math.abs((c.c-c.o)*4.5))} fill={c.up?'#10B981':'#E63946'} />
                </g>);
              })}
              {/* current price line */}
              <line x1="0" x2="600" y1="92" y2="92" stroke="#E63946" strokeDasharray="3 3" strokeWidth="1" opacity="0.6" />
            </svg>
            {/* axis labels */}
            <div className="absolute end-1 top-2 text-[10px] text-zinc-500 num-display space-y-3 px-1.5 py-2 bg-ink-900/40 rounded ltr-num" dir="ltr">
              <div>72,000</div><div>70,000</div><div className="text-brand-red font-bold">68,210</div><div>66,000</div><div>64,000</div>
            </div>
            {/* tool hint */}
            <div className="absolute top-2 start-2 text-[10.5px] text-zinc-500 bg-ink-900/60 px-2 py-1 rounded">
               {isEn ? 'Tool: ' : 'ابزار: '} {C_TOOLS.find(x=>x.id===tool)?.[isEn ? 'tEn' : 'tFa']} • {tf} • {s.sym}
            </div>
            {/* watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="text-zinc-700 text-[80px] font-extrabold opacity-[0.04]">Eco Azarin</div></div>
          </div>
          {/* indicators row (RSI mock) */}
          <div className="border-t border-ink-500 h-[100px] relative" style={{ background:'#0d0d10' }}>
            <svg className="w-full h-full" viewBox="0 0 600 100" preserveAspectRatio="none">
              <line x1="0" x2="600" y1="30" y2="30" stroke="rgba(230,57,70,0.25)" strokeDasharray="3 3" />
              <line x1="0" x2="600" y1="70" y2="70" stroke="rgba(43,166,122,0.25)" strokeDasharray="3 3" />
              <path d="M0,55 Q60,40 120,50 T240,30 T360,55 T480,70 T600,40" stroke="#A855F7" strokeWidth="1.6" fill="none" />
            </svg>
            <div className="absolute top-1.5 end-2 text-[10.5px] text-zinc-500 font-mono">RSI(14) <span className="text-zinc-300 num-display">58.2</span></div>
          </div>
        </div>
        {/* watchlist sidebar */}
        <aside className="bg-ink-800 border border-ink-500 rounded-xl overflow-hidden lg:order-3 order-3">
          <div className="px-3 py-2.5 border-b border-ink-500 flex items-center justify-between"><div className="text-[12.5px] font-bold">{isEn ? 'Watchlist' : 'واچ‌لیست'}</div><button className="text-[11px] text-brand-redSoft">+</button></div>
          <ul className="divide-y divide-ink-500/60 max-h-[300px] overflow-auto scrollbar-hide">
            {C_SYMBOLS.map((sy,i)=>(
              <li key={sy.sym}><button onClick={()=>setActive(i)} className={`w-full text-end px-3 py-2.5 hover:bg-ink-700/60 flex items-center gap-2 ${active===i?'bg-ink-700/80 border-s-2 md:border-s-0 md:border-e-2 border-brand-red':''}`}>
                <div className="flex-1 min-w-0 flex flex-col justify-center items-start"><div className="font-mono text-[12px] font-bold leading-tight">{sy.sym}</div><div className="text-[10px] text-zinc-500 mt-0.5 line-clamp-1">{isEn ? sy.nameEn : sy.nameFa}</div></div>
                <div className="flex flex-col items-end"><div className="num-display text-[12px] font-bold ltr-num">{sy.price.toLocaleString('en-US')}</div><div className={`text-[10px] font-bold ltr-num ${sy.change>=0?'text-brand-green':'text-brand-red'}`}>{sy.change>=0?'+':''}{sy.change}%</div></div>
              </button></li>
            ))}
          </ul>
          <div className="border-t border-ink-500 px-3 py-2.5 text-[12.5px] font-bold">{isEn ? 'Indicators' : 'اندیکاتورها'}</div>
          <ul className="divide-y divide-ink-500/60 max-h-[200px] overflow-auto scrollbar-hide">
            {inds.map((ind,i)=>(
              <li key={ind.id} className="px-3 py-2 flex items-center gap-2">
                <button onClick={()=>setInds(inds.map((x,j)=>j===i?{...x,on:!x.on}:x))} className={`min-w-9 w-9 h-5 rounded-full transition relative ${ind.on?'bg-brand-green':'bg-ink-500'}`}><span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${ind.on?(isEn?'right-0.5':'left-0.5'):(isEn?'left-0.5 mt-0':'right-0.5')}`}/></button>
                <span className="text-[12px] flex-1 text-start">{ind.name}</span>
                <button className="text-zinc-500 hover:text-white text-[14px] leading-none">⚙</button>
              </li>
            ))}
          </ul>
          <button className="w-full px-3 py-2.5 text-[11.5px] text-brand-redSoft hover:bg-ink-700/60 border-t border-ink-500">+ {isEn ? 'Add Indicator' : 'افزودن اندیکاتور'}</button>
        </aside>
      </div>

      {/* depth + orders */}
      <div className="grid md:grid-cols-3 gap-3 mt-3">
        <div className="bg-ink-800 border border-ink-500 rounded-xl p-4">
          <h4 className="text-[13px] font-bold mb-3">{isEn ? 'Order Book' : 'عمق بازار'}</h4>
          <div className="space-y-1 text-[11px] font-mono ltr-num" dir="ltr">
            {[68225,68220,68215,68212].map((p,i)=><div key={'a'+i} className="flex justify-between text-brand-red"><span>{p.toLocaleString('en-US')}</span><span>{(0.5-i*0.08).toFixed(2)}</span></div>)}
            <div className="my-1.5 py-1 border-y border-ink-500 flex justify-between font-bold"><span className="text-white num-display">68,210</span><span className="text-zinc-500">0.2%</span></div>
            {[68205,68200,68195,68190].map((p,i)=><div key={'b'+i} className="flex justify-between text-brand-green"><span>{p.toLocaleString('en-US')}</span><span>{(0.5-i*0.08).toFixed(2)}</span></div>)}
          </div>
        </div>
        <div className="bg-ink-800 border border-ink-500 rounded-xl p-4">
          <h4 className="text-[13px] font-bold mb-3">{isEn ? 'Order Placement' : 'سفارش سریع'}</h4>
          <div className="grid grid-cols-2 gap-1.5 mb-2">
            <button className="h-9 rounded-lg bg-brand-green/15 text-brand-green border border-brand-green/30 text-[12px] font-bold hover:bg-brand-green hover:text-black transition">{isEn ? 'Buy' : 'خرید'}</button>
            <button className="h-9 rounded-lg bg-brand-red/15 text-brand-red border border-brand-red/30 text-[12px] font-bold hover:bg-brand-red hover:text-white transition">{isEn ? 'Sell' : 'فروش'}</button>
          </div>
          <div className="grid gap-1.5 text-[11px]">
            <div className="flex items-center justify-between bg-ink-900 rounded-lg px-2.5 py-2"><span className="text-zinc-500">{isEn ? 'Price' : 'قیمت'}</span><input className="bg-transparent text-end outline-none num-display ltr-num" defaultValue="68,210" dir="ltr" /></div>
            <div className="flex items-center justify-between bg-ink-900 rounded-lg px-2.5 py-2"><span className="text-zinc-500">{isEn ? 'Amount' : 'حجم'}</span><input className="bg-transparent text-end outline-none num-display ltr-num" defaultValue="0.05" dir="ltr" /></div>
            <div className="flex items-center justify-between bg-ink-900 rounded-lg px-2.5 py-2"><span className="text-zinc-500">{isEn ? 'Stop Loss' : 'حد ضرر'}</span><input className="bg-transparent text-end outline-none num-display ltr-num" placeholder="—" dir="ltr" /></div>
            <div className="flex items-center justify-between bg-ink-900 rounded-lg px-2.5 py-2"><span className="text-zinc-500">{isEn ? 'Take Profit' : 'حد سود'}</span><input className="bg-transparent text-end outline-none num-display ltr-num" placeholder="—" dir="ltr" /></div>
          </div>
          <button className="w-full mt-2 h-10 rounded-lg bg-brand-green text-black font-bold text-[12px] hover:bg-brand-greenSoft">{isEn ? 'Place Order' : 'ثبت سفارش'}</button>
        </div>
        <div className="bg-ink-800 border border-ink-500 rounded-xl p-4">
          <h4 className="text-[13px] font-bold mb-3">{isEn ? 'Open Positions' : 'پوزیشن‌های باز'}</h4>
          <ul className="space-y-2 text-[11.5px]">
            {[{p:'BTC/USDT',s:'long',nFa:'+۸۴۰',nEn:'+840',cFa:'+۲٫۱٪',cEn:'+2.1%'},{p:'XAU/USD',s:'short',nFa:'-۲۴۰',nEn:'-240',cFa:'-۰٫۸٪',cEn:'-0.8%'},{p:'ETH/USDT',s:'long',nFa:'+۱٬۲۸۰',nEn:'+1280',cFa:'+۳٫۸٪',cEn:'+3.8%'}].map((o,i)=>(
              <li key={i} className="bg-ink-900 rounded-lg px-3 py-2.5 flex items-center gap-2">
                <span className="font-mono text-[11.5px] font-bold leading-none mt-1">{o.p}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded leading-none ${o.s==='long'?'bg-brand-green/20 text-brand-green':'bg-brand-red/20 text-brand-red'}`}>{o.s}</span>
                <span className={`flex-1 text-center font-bold stat-num ${o.nEn.startsWith('+')?'text-brand-green':'text-brand-red'}`}>{isEn ? o.nEn : o.nFa}<span className="text-[10px] text-zinc-500 mx-1">({isEn ? o.cEn : o.cFa})</span></span>
                <button className="text-zinc-500 hover:text-brand-red text-[10px]">{isEn ? 'Close' : 'بستن'}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
function App() { return <PageShell slug="charts"><ChartsContent /></PageShell>; }
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

export { C_SYMBOLS, C_TIMEFRAMES, C_INDICATORS, C_TOOLS, ChartsContent };
