import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import * as Recharts from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { PageShell } from '../layouts/PageShell';
import { useLang, useLangRefresh } from '../i18n';

const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;

// =====================================================================
// journal.jsx — صفحهٔ ژورنال‌نویسی معاملاتی (my-journal.app inspired)
// =====================================================================


const J_TRADES = [
  { id:1, dateFa:'۱۴۰۳/۰۲/۱۸', dateEn:'2024/05/07', pair:'BTC/USDT',  side:'long',  entry:67120, exit:68420, size:0.25, pnl:+325,   r:1.8, tag:'breakout', mood:'😊', notesFa:'برک‌اوت ساختاری روی روند صعودی روزانه. مدیریت پوزیشن خوب بود.', notesEn:'Structural breakout on daily uptrend. Position management was good.' },
  { id:2, dateFa:'۱۴۰۳/۰۲/۱۷', dateEn:'2024/05/06', pair:'XAU/USD',   side:'short', entry:2358,  exit:2348,  size:1.0,  pnl:+100,   r:1.0, tag:'rejection', mood:'🙂', notesFa:'پولبک به مقاومت قبلی، ورود با تاییدیه RSI واگرایی منفی.', notesEn:'Pullback to previous resistance, entry with negative RSI divergence confirmation.' },
  { id:3, dateFa:'۱۴۰۳/۰۲/۱۶', dateEn:'2024/05/05', pair:'ETH/USDT',  side:'long',  entry:3380,  exit:3320,  size:2.0,  pnl:-120,   r:-1.2,tag:'fakeout',  mood:'😞', notesFa:'ورود زود بود، استاپ خورد. باید صبر می‌کردم به کلوز کندل.', notesEn:'Early entry, hit stop. Should have waited for candle close.' },
  { id:4, dateFa:'۱۴۰۳/۰۲/۱۵', dateEn:'2024/05/04', pair:'EUR/USD',   side:'long',  entry:1.084, exit:1.087, size:50000,pnl:+150,   r:1.5, tag:'trend',    mood:'😊', notesFa:'ادامهٔ روند صعودی، خرید روی پولبک به EMA20.', notesEn:'Continuation of uptrend, bought on pullback to EMA20.' },
  { id:5, dateFa:'۱۴۰۳/۰۲/۱۴', dateEn:'2024/05/03', pair:'BTC/USDT',  side:'short', entry:69200, exit:68500, size:0.15, pnl:+105,   r:0.9, tag:'rejection', mood:'😐', notesFa:'نزدیک قله رد شد. کوچک ولی مفید.', notesEn:'Rejected near top. Small but useful.' },
  { id:6, dateFa:'۱۴۰۳/۰۲/۱۲', dateEn:'2024/05/01', pair:'XAU/USD',   side:'long',  entry:2310,  exit:2336,  size:0.8,  pnl:+208,   r:2.6, tag:'breakout', mood:'🤩', notesFa:'بهترین معاملهٔ هفته. دیسیپلین کامل، اجرای دقیق.', notesEn:'Best trade of the week. Full discipline, perfect execution.' },
  { id:7, dateFa:'۱۴۰۳/۰۲/۱۱', dateEn:'2024/04/30', pair:'ETH/USDT',  side:'long',  entry:3220,  exit:3180,  size:1.5,  pnl:-60,    r:-0.6,tag:'overtrade',mood:'😟', notesFa:'ست‌آپ کامل نبود، ورود از سر بی‌حوصلگی.', notesEn:'Setup wasn\'t complete, entered out of boredom.' },
];

function JournalContent() {
  const [lang] = useLang();
  useLangRefresh();
  const isEn = lang === 'EN';
  const [filter, setFilter] = useState('all'); // all | wins | losses
  const [tag, setTag]       = useState('');
  const [view, setView]     = useState('list'); // list | calendar | analytics

  const trades = useMemo(() => {
    let xs = J_TRADES;
    if (filter === 'wins')   xs = xs.filter(t => t.pnl > 0);
    if (filter === 'losses') xs = xs.filter(t => t.pnl < 0);
    if (tag) xs = xs.filter(t => t.tag === tag);
    return xs;
  }, [filter, tag]);

  const stats = useMemo(() => {
    const wins  = J_TRADES.filter(t => t.pnl > 0);
    const losses= J_TRADES.filter(t => t.pnl < 0);
    const totalPnl = J_TRADES.reduce((s,t)=>s+t.pnl, 0);
    const wr = Math.round((wins.length / J_TRADES.length) * 100);
    const avgR = (J_TRADES.reduce((s,t)=>s+t.r,0)/J_TRADES.length).toFixed(2);
    const avgWin  = (wins.reduce((s,t)=>s+t.pnl,0)/(wins.length||1)).toFixed(0);
    const avgLoss = (Math.abs(losses.reduce((s,t)=>s+t.pnl,0))/(losses.length||1)).toFixed(0);
    return { wins:wins.length, losses:losses.length, totalPnl, wr, avgR, avgWin, avgLoss };
  }, []);

  const TAGS = ['breakout','rejection','trend','fakeout','overtrade'];

  // calendar grid (mock - 30 days)
  const days = Array.from({length:30},(_,i)=>{
    const dt = String(i+1).padStart(2,'0');
    const t = J_TRADES.find(x => x.dateFa.endsWith(dt));
    return t ? { day:i+1, pnl:t.pnl } : { day:i+1, pnl:0 };
  });

  return (
    <section className="px-4 md:px-6 max-w-[1400px] mx-auto" data-screen-label="Journal">
      {/* hero */}
      <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2"><span className="h-7 px-2.5 rounded-md bg-brand-red/15 border border-brand-red/30 text-brand-redSoft text-[11px] font-bold flex items-center">{isEn ? '📓 Trading Journal' : '📓 ژورنال معاملات'}</span><span className="text-[11px] text-zinc-500">{isEn ? 'Discipline = Results' : 'دیسیپلین = نتیجه'}</span></div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{isEn ? 'Be a Trader, not a Gambler.' : 'معامله‌گر بشو، نه قمارباز.'}</h1>
          <p className="text-zinc-400 text-[13.5px] mt-2 max-w-xl leading-7">{isEn ? 'Log every trade, see your mental patterns and mistakes, and improve yourself every week.' : 'هر معامله رو ثبت کن، الگوهای ذهنی و خطاها رو ببین، و خودت رو هر هفته بهتر کن.'}</p>
        </div>
        <button className="h-11 px-5 rounded-xl bg-brand-green text-black font-bold text-[13px] hover:bg-brand-greenSoft transition shadow-[0_8px_24px_-8px_rgba(43,166,122,0.5)] flex items-center gap-2">
          <span className="text-[16px]">+</span> {isEn ? 'New Trade' : 'ثبت معاملهٔ جدید'}
        </button>
      </div>

      {/* stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <div className="bg-ink-800 border border-ink-500 rounded-xl p-4 text-start"><div className="text-[10.5px] text-zinc-500">{isEn ? 'Total PnL' : 'سود/زیان کل'}</div><div className={`text-[22px] font-extrabold mt-1 stat-num ${stats.totalPnl>=0?'text-brand-green':'text-brand-red'}`}>{stats.totalPnl>=0?'+':''}{isEn ? stats.totalPnl.toLocaleString('en-US') : stats.totalPnl.toLocaleString('fa-IR')}<span className="text-[12px] font-medium text-zinc-500 mx-1">$</span></div></div>
        <div className="bg-ink-800 border border-ink-500 rounded-xl p-4 text-start"><div className="text-[10.5px] text-zinc-500">{isEn ? 'Win Rate' : 'نرخ برد'}</div><div className="text-[22px] font-extrabold mt-1 stat-num">{isEn ? stats.wr.toLocaleString('en-US') : stats.wr.toLocaleString('fa-IR')}<span className="text-[12px] font-medium text-zinc-500 mx-0.5">٪</span></div><div className="h-1.5 mt-2 bg-ink-700 rounded-full overflow-hidden flex w-full"><div className="h-full bg-gradient-to-l rtl:from-brand-green rtl:to-emerald-400 ltr:from-emerald-400 ltr:to-brand-green" style={{width:stats.wr+'%'}} /></div></div>
        <div className="bg-ink-800 border border-ink-500 rounded-xl p-4 text-start"><div className="text-[10.5px] text-zinc-500">{isEn ? 'Avg R' : 'میانگین R'}</div><div className="text-[22px] font-extrabold mt-1 stat-num">{isEn ? Number(stats.avgR).toLocaleString('en-US') : Number(stats.avgR).toLocaleString('fa-IR')}</div></div>
        <div className="bg-ink-800 border border-ink-500 rounded-xl p-4 text-start"><div className="text-[10.5px] text-zinc-500">{isEn ? 'Avg Win' : 'میانگین برد'}</div><div className="text-[22px] font-extrabold mt-1 stat-num text-brand-green">+{isEn ? Number(stats.avgWin).toLocaleString('en-US') : Number(stats.avgWin).toLocaleString('fa-IR')}<span className="text-[12px] font-medium text-zinc-500 mx-0.5">$</span></div></div>
        <div className="bg-ink-800 border border-ink-500 rounded-xl p-4 text-start"><div className="text-[10.5px] text-zinc-500">{isEn ? 'Avg Loss' : 'میانگین زیان'}</div><div className="text-[22px] font-extrabold mt-1 stat-num text-brand-red">−{isEn ? Number(stats.avgLoss).toLocaleString('en-US') : Number(stats.avgLoss).toLocaleString('fa-IR')}<span className="text-[12px] font-medium text-zinc-500 mx-0.5">$</span></div></div>
      </div>

      {/* view tabs */}
      <div className="flex items-center gap-2 mb-4 border-b border-ink-500">
        {[{id:'list',lFa:'فهرست معاملات', lEn:'Trade List', i:'📋'},{id:'calendar',lFa:'تقویم سود/زیان', lEn:'PnL Calendar', i:'📅'},{id:'analytics',lFa:'تحلیل رفتار', lEn:'Behavior Analytics', i:'📊'}].map(v=>(
          <button key={v.id} onClick={()=>setView(v.id)} className={`px-4 py-2.5 text-[13px] flex items-center gap-2 border-b-2 -mb-px transition ${view===v.id?'border-brand-red text-white font-bold':'border-transparent text-zinc-400 hover:text-white'}`}>
            <span>{v.i}</span>{isEn ? v.lEn : v.lFa}
          </button>
        ))}
      </div>

      {/* filters bar */}
      {view==='list' && <>
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <div className="flex bg-ink-800 border border-ink-500 rounded-lg p-0.5 text-[12px]">
            {[{id:'all',lFa:'همه', lEn:'All'},{id:'wins',lFa:'برد', lEn:'Wins'},{id:'losses',lFa:'باخت', lEn:'Losses'}].map(f=>(
              <button key={f.id} onClick={()=>setFilter(f.id)} className={`px-3 py-1.5 rounded-md transition ${filter===f.id?'bg-brand-red text-white font-bold':'text-zinc-400 hover:text-white'}`}>{isEn ? f.lEn : f.lFa}</button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-zinc-500">{isEn ? 'Tags:' : 'برچسب:'}</span>
            {TAGS.map(tg=><button key={tg} onClick={()=>setTag(tag===tg?'':tg)} className={`px-2.5 py-1 rounded-full text-[11px] border transition ${tag===tg?'bg-white text-black border-white font-bold':'bg-transparent text-zinc-400 border-ink-500 hover:border-ink-400'}`}>#{tg}</button>)}
          </div>
        </div>
        {/* trades */}
        <ul className="grid gap-3">
          {trades.length === 0 && <li className="bg-ink-800 border border-ink-500 rounded-xl p-8 text-center text-zinc-400">{isEn ? 'No trades found.' : 'هیچ معامله‌ای پیدا نشد.'}</li>}
          {trades.map(t=>(
            <li key={t.id} className="bg-ink-800 border border-ink-500 rounded-xl p-4 hover:border-ink-400 transition group text-start">
              <div className="grid md:grid-cols-[1fr_auto] gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="font-mono text-[14px] font-bold">{t.pair}</span>
                    <span className={`text-[10.5px] px-2 py-0.5 rounded-md font-bold ${t.side==='long'?'bg-brand-green/15 text-brand-green':'bg-brand-red/15 text-brand-red'}`}>{t.side==='long'?(isEn?'Long':'خرید (Long)'):(isEn?'Short':'فروش (Short)')}</span>
                    <span className="text-[10.5px] px-2 py-0.5 rounded-md bg-ink-700 text-zinc-300">#{t.tag}</span>
                    <span className="text-[20px]">{t.mood}</span>
                    <span className="text-[10.5px] text-zinc-500 me-auto ltr-num">{isEn ? t.dateEn : t.dateFa}</span>
                  </div>
                  <p className="text-[12.5px] text-zinc-400 leading-6 line-clamp-2">{isEn ? t.notesEn : t.notesFa}</p>
                  <div className="flex items-center gap-4 mt-2.5 text-[11.5px] text-zinc-500">
                    <span>{isEn?'Entry: ':'ورود: '}<span className="num-display text-zinc-300">{t.entry.toLocaleString('en-US')}</span></span>
                    <span>{isEn?'Exit: ':'خروج: '}<span className="num-display text-zinc-300">{t.exit.toLocaleString('en-US')}</span></span>
                    <span>{isEn?'Size: ':'حجم: '}<span className="num-display text-zinc-300">{isEn?t.size:t.size.toLocaleString('fa-IR')}</span></span>
                  </div>
                </div>
                <div className={`md:${isEn?'text-start border-e':'text-end border-s'} flex md:flex-col items-center md:items-${isEn?'start':'end'} gap-3 md:gap-1 md:min-w-[120px] md:border-ink-500/60 md:p${isEn?'e':'s'}-4`}>
                  <div className={`text-[20px] md:text-[24px] font-extrabold stat-num ${t.pnl>=0?'text-brand-green':'text-brand-red'}`}>{t.pnl>=0?'+':''}{isEn ? t.pnl.toLocaleString('en-US') : t.pnl.toLocaleString('fa-IR')}<span className="text-[12px] mx-1 font-medium text-zinc-500">$</span></div>
                  <div className={`text-[11.5px] font-bold ${t.r>=0?'text-brand-green':'text-brand-red'}`}>{t.r>=0?'+':''}{isEn ? t.r.toLocaleString('en-US') : t.r.toLocaleString('fa-IR')}R</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>}

      {view==='calendar' && (
        <div className="bg-ink-800 border border-ink-500 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-bold">{isEn ? 'May 2024' : 'اردیبهشت ۱۴۰۳'}</h3>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-brand-green/40 border border-brand-green/60" /> {isEn ? 'Win' : 'سود'}</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-brand-red/40 border border-brand-red/60" /> {isEn ? 'Loss' : 'زیان'}</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-ink-700 border border-ink-500" /> {isEn ? 'No Trade' : 'بدون معامله'}</span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] text-zinc-500 mb-2">{(isEn ? ['S','M','T','W','T','F','S'] : ['ش','ی','د','س','چ','پ','ج']).map((d,i)=><div key={i}>{d}</div>)}</div>
          <div className="grid grid-cols-7 gap-1.5">
            {days.map(d=>{
              const cls = d.pnl>0?'bg-brand-green/15 border-brand-green/40 text-brand-green':d.pnl<0?'bg-brand-red/15 border-brand-red/40 text-brand-red':'bg-ink-700 border-ink-500 text-zinc-500';
              return <div key={d.day} className={`aspect-square rounded-lg border ${cls} p-1.5 flex flex-col`}>
                <div className="text-[10.5px]">{isEn ? d.day : d.day.toLocaleString('fa-IR')}</div>
                {d.pnl !== 0 && <div className="mt-auto text-[11px] font-extrabold stat-num">{d.pnl>0?'+':''}{d.pnl}</div>}
              </div>;
            })}
          </div>
        </div>
      )}

      {view==='analytics' && (
        <div className="grid md:grid-cols-2 gap-4 text-start">
          <div className="bg-ink-800 border border-ink-500 rounded-2xl p-5">
            <h3 className="text-[14px] font-bold mb-4">{isEn ? 'Equity Curve' : 'منحنی سرمایه (Equity Curve)'}</h3>
            <svg viewBox="0 0 600 200" className="w-full h-[200px]">
              <defs><linearGradient id="jGrad" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#2BA67A" stopOpacity="0.3"/><stop offset="100%" stopColor="#2BA67A" stopOpacity="0"/></linearGradient></defs>
              <path d="M0,180 L80,160 L160,170 L240,140 L320,150 L400,100 L480,120 L560,80 L600,60 L600,200 L0,200 Z" fill="url(#jGrad)" />
              <path d="M0,180 L80,160 L160,170 L240,140 L320,150 L400,100 L480,120 L560,80 L600,60" fill="none" stroke="#2BA67A" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="bg-ink-800 border border-ink-500 rounded-2xl p-5">
            <h3 className="text-[14px] font-bold mb-4">{isEn ? 'R Distribution by Setup' : 'توزیع R به ازای ست‌آپ'}</h3>
            <div className="space-y-3">
              {[{tag:'breakout', r:2.2, c:5},{tag:'rejection', r:0.95, c:4},{tag:'trend',r:1.5,c:3},{tag:'fakeout',r:-0.9,c:2},{tag:'overtrade',r:-0.6,c:2}].map(s=>(
                <div key={s.tag}>
                  <div className="flex items-center justify-between text-[12px] mb-1"><span>#{s.tag} <span className="text-zinc-500">({s.c})</span></span><span className={`font-bold stat-num ${s.r>=0?'text-brand-green':'text-brand-red'}`}>{s.r>=0?'+':''}{s.r}R</span></div>
                  <div className="h-2 bg-ink-700 rounded-full overflow-hidden relative w-full"><div className={`absolute top-0 h-full ${s.r>=0?'bg-brand-green':'bg-brand-red'}`} style={{ [isEn?'left':'right']:'50%', width:Math.min(50,Math.abs(s.r)*20)+'%', transform:s.r<0?(isEn?'translateX(-100%)':'translateX(100%)'):undefined }} /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 bg-ink-800 border border-ink-500 rounded-2xl p-5">
            <h3 className="text-[14px] font-bold mb-3">{isEn ? 'Weekly Reflection Notes' : 'یادداشت‌های تأمل هفتگی'}</h3>
            <div className="grid sm:grid-cols-3 gap-3 text-[12.5px] leading-6">
              <div className="bg-ink-900 border border-ink-500 rounded-xl p-3"><div className="text-[10.5px] text-brand-green font-bold mb-1">{isEn ? '✓ What went well' : '✓ چیزی که خوب بود'}</div>{isEn ? 'Patience on A+ setups. Three big trades this week.' : 'صبر روی ست‌آپ‌های A+. سه معاملهٔ بزرگ این هفته.'}</div>
              <div className="bg-ink-900 border border-ink-500 rounded-xl p-3"><div className="text-[10.5px] text-brand-red font-bold mb-1">{isEn ? '✗ Repeated mistake' : '✗ خطایی که تکرار شد'}</div>{isEn ? 'Early entry before candle close. Three times this week.' : 'ورود زود قبل از کلوز کندل. سه بار این هفته.'}</div>
              <div className="bg-ink-900 border border-ink-500 rounded-xl p-3"><div className="text-[10.5px] text-amber-400 font-bold mb-1">{isEn ? '→ Next week' : '→ هفتهٔ بعد'}</div>{isEn ? 'Only on-trend breakout setups, no counter-trend.' : 'فقط ست‌آپ‌های breakout روی روند، نه کانتر-ترند.'}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function App() {
  return <PageShell slug="journal"><JournalContent /></PageShell>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

export { J_TRADES, JournalContent };
