// =====================================================================
// journal.jsx — صفحهٔ ژورنال‌نویسی معاملاتی (my-journal.app inspired)
// =====================================================================
const { useState: jUS, useMemo: jUM } = React;

const J_TRADES = [
  { id:1, date:'۱۴۰۳/۰۲/۱۸', pair:'BTC/USDT',  side:'long',  entry:67120, exit:68420, size:0.25, pnl:+325,   r:1.8, tag:'breakout', mood:'😊', notes:'برک‌اوت ساختاری روی روند صعودی روزانه. مدیریت پوزیشن خوب بود.' },
  { id:2, date:'۱۴۰۳/۰۲/۱۷', pair:'XAU/USD',   side:'short', entry:2358,  exit:2348,  size:1.0,  pnl:+100,   r:1.0, tag:'rejection', mood:'🙂', notes:'پولبک به مقاومت قبلی، ورود با تاییدیه RSI واگرایی منفی.' },
  { id:3, date:'۱۴۰۳/۰۲/۱۶', pair:'ETH/USDT',  side:'long',  entry:3380,  exit:3320,  size:2.0,  pnl:-120,   r:-1.2,tag:'fakeout',  mood:'😞', notes:'ورود زود بود، استاپ خورد. باید صبر می‌کردم به کلوز کندل.' },
  { id:4, date:'۱۴۰۳/۰۲/۱۵', pair:'EUR/USD',   side:'long',  entry:1.084, exit:1.087, size:50000,pnl:+150,   r:1.5, tag:'trend',    mood:'😊', notes:'ادامهٔ روند صعودی، خرید روی پولبک به EMA20.' },
  { id:5, date:'۱۴۰۳/۰۲/۱۴', pair:'BTC/USDT',  side:'short', entry:69200, exit:68500, size:0.15, pnl:+105,   r:0.9, tag:'rejection', mood:'😐', notes:'نزدیک قله رد شد. کوچک ولی مفید.' },
  { id:6, date:'۱۴۰۳/۰۲/۱۲', pair:'XAU/USD',   side:'long',  entry:2310,  exit:2336,  size:0.8,  pnl:+208,   r:2.6, tag:'breakout', mood:'🤩', notes:'بهترین معاملهٔ هفته. دیسیپلین کامل، اجرای دقیق.' },
  { id:7, date:'۱۴۰۳/۰۲/۱۱', pair:'ETH/USDT',  side:'long',  entry:3220,  exit:3180,  size:1.5,  pnl:-60,    r:-0.6,tag:'overtrade',mood:'😟', notes:'ست‌آپ کامل نبود، ورود از سر بی‌حوصلگی.' },
];

function JournalContent() {
  const [filter, setFilter] = jUS('all'); // all | wins | losses
  const [tag, setTag]       = jUS('');
  const [view, setView]     = jUS('list'); // list | calendar | analytics

  const trades = jUM(() => {
    let xs = J_TRADES;
    if (filter === 'wins')   xs = xs.filter(t => t.pnl > 0);
    if (filter === 'losses') xs = xs.filter(t => t.pnl < 0);
    if (tag) xs = xs.filter(t => t.tag === tag);
    return xs;
  }, [filter, tag]);

  const stats = jUM(() => {
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
    const t = J_TRADES.find(x => x.date.endsWith(String(i+1).padStart(2,'0')));
    return t ? { day:i+1, pnl:t.pnl } : { day:i+1, pnl:0 };
  });

  return (
    <section className="px-4 md:px-6 max-w-[1400px] mx-auto" data-screen-label="Journal">
      {/* hero */}
      <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2"><span className="h-7 px-2.5 rounded-md bg-brand-red/15 border border-brand-red/30 text-brand-redSoft text-[11px] font-bold flex items-center">📓 ژورنال معاملات</span><span className="text-[11px] text-zinc-500">دیسیپلین = نتیجه</span></div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">معامله‌گر بشو، نه قمارباز.</h1>
          <p className="text-zinc-400 text-[13.5px] mt-2 max-w-xl leading-7">هر معامله رو ثبت کن، الگوهای ذهنی و خطاها رو ببین، و خودت رو هر هفته بهتر کن.</p>
        </div>
        <button className="h-11 px-5 rounded-xl bg-brand-green text-black font-bold text-[13px] hover:bg-brand-greenSoft transition shadow-[0_8px_24px_-8px_rgba(43,166,122,0.5)] flex items-center gap-2">
          <span className="text-[16px]">+</span> ثبت معاملهٔ جدید
        </button>
      </div>

      {/* stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <div className="bg-ink-800 border border-ink-500 rounded-xl p-4"><div className="text-[10.5px] text-zinc-500">سود/زیان کل</div><div className={`text-[22px] font-extrabold mt-1 stat-num ${stats.totalPnl>=0?'text-brand-green':'text-brand-red'}`}>{stats.totalPnl>=0?'+':''}{stats.totalPnl.toLocaleString('fa-IR')}<span className="text-[12px] font-medium text-zinc-500 mr-1">$</span></div></div>
        <div className="bg-ink-800 border border-ink-500 rounded-xl p-4"><div className="text-[10.5px] text-zinc-500">نرخ برد</div><div className="text-[22px] font-extrabold mt-1 stat-num">{stats.wr}<span className="text-[12px] font-medium text-zinc-500 mr-0.5">٪</span></div><div className="h-1.5 mt-2 bg-ink-700 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-l from-brand-green to-emerald-400" style={{width:stats.wr+'%'}} /></div></div>
        <div className="bg-ink-800 border border-ink-500 rounded-xl p-4"><div className="text-[10.5px] text-zinc-500">میانگین R</div><div className="text-[22px] font-extrabold mt-1 stat-num">{stats.avgR}</div></div>
        <div className="bg-ink-800 border border-ink-500 rounded-xl p-4"><div className="text-[10.5px] text-zinc-500">میانگین برد</div><div className="text-[22px] font-extrabold mt-1 stat-num text-brand-green">+{stats.avgWin}<span className="text-[12px] font-medium text-zinc-500 mr-0.5">$</span></div></div>
        <div className="bg-ink-800 border border-ink-500 rounded-xl p-4"><div className="text-[10.5px] text-zinc-500">میانگین زیان</div><div className="text-[22px] font-extrabold mt-1 stat-num text-brand-red">−{stats.avgLoss}<span className="text-[12px] font-medium text-zinc-500 mr-0.5">$</span></div></div>
      </div>

      {/* view tabs */}
      <div className="flex items-center gap-2 mb-4 border-b border-ink-500">
        {[{id:'list',l:'فهرست معاملات',i:'📋'},{id:'calendar',l:'تقویم سود/زیان',i:'📅'},{id:'analytics',l:'تحلیل رفتار',i:'📊'}].map(v=>(
          <button key={v.id} onClick={()=>setView(v.id)} className={`px-4 py-2.5 text-[13px] flex items-center gap-2 border-b-2 -mb-px transition ${view===v.id?'border-brand-red text-white font-bold':'border-transparent text-zinc-400 hover:text-white'}`}>
            <span>{v.i}</span>{v.l}
          </button>
        ))}
      </div>

      {/* filters bar */}
      {view==='list' && <>
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <div className="flex bg-ink-800 border border-ink-500 rounded-lg p-0.5 text-[12px]">
            {[{id:'all',l:'همه'},{id:'wins',l:'برد'},{id:'losses',l:'باخت'}].map(f=>(
              <button key={f.id} onClick={()=>setFilter(f.id)} className={`px-3 py-1.5 rounded-md transition ${filter===f.id?'bg-brand-red text-white font-bold':'text-zinc-400 hover:text-white'}`}>{f.l}</button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-zinc-500">برچسب:</span>
            {TAGS.map(tg=><button key={tg} onClick={()=>setTag(tag===tg?'':tg)} className={`px-2.5 py-1 rounded-full text-[11px] border transition ${tag===tg?'bg-white text-black border-white font-bold':'bg-transparent text-zinc-400 border-ink-500 hover:border-ink-400'}`}>#{tg}</button>)}
          </div>
        </div>
        {/* trades */}
        <ul className="grid gap-3">
          {trades.length === 0 && <li className="bg-ink-800 border border-ink-500 rounded-xl p-8 text-center text-zinc-400">هیچ معامله‌ای پیدا نشد.</li>}
          {trades.map(t=>(
            <li key={t.id} className="bg-ink-800 border border-ink-500 rounded-xl p-4 hover:border-ink-400 transition group">
              <div className="grid md:grid-cols-[1fr_auto] gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className="font-mono text-[14px] font-bold">{t.pair}</span>
                    <span className={`text-[10.5px] px-2 py-0.5 rounded-md font-bold ${t.side==='long'?'bg-brand-green/15 text-brand-green':'bg-brand-red/15 text-brand-red'}`}>{t.side==='long'?'خرید (Long)':'فروش (Short)'}</span>
                    <span className="text-[10.5px] px-2 py-0.5 rounded-md bg-ink-700 text-zinc-300">#{t.tag}</span>
                    <span className="text-[20px]">{t.mood}</span>
                    <span className="text-[10.5px] text-zinc-500 mr-auto ltr-num">{t.date}</span>
                  </div>
                  <p className="text-[12.5px] text-zinc-400 leading-6 line-clamp-2">{t.notes}</p>
                  <div className="flex items-center gap-4 mt-2.5 text-[11.5px] text-zinc-500">
                    <span>ورود: <span className="num-display text-zinc-300">{t.entry.toLocaleString('en-US')}</span></span>
                    <span>خروج: <span className="num-display text-zinc-300">{t.exit.toLocaleString('en-US')}</span></span>
                    <span>حجم: <span className="num-display text-zinc-300">{t.size}</span></span>
                  </div>
                </div>
                <div className="md:text-left flex md:flex-col items-center md:items-end gap-3 md:gap-1 md:min-w-[120px] md:border-r md:border-ink-500/60 md:pr-4">
                  <div className={`text-[20px] md:text-[24px] font-extrabold stat-num ${t.pnl>=0?'text-brand-green':'text-brand-red'}`}>{t.pnl>=0?'+':''}{t.pnl}<span className="text-[12px] mr-1 font-medium text-zinc-500">$</span></div>
                  <div className={`text-[11.5px] font-bold ${t.r>=0?'text-brand-green':'text-brand-red'}`}>{t.r>=0?'+':''}{t.r}R</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>}

      {view==='calendar' && (
        <div className="bg-ink-800 border border-ink-500 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-bold">اردیبهشت ۱۴۰۳</h3>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-brand-green/40 border border-brand-green/60" /> سود</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-brand-red/40 border border-brand-red/60" /> زیان</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-ink-700 border border-ink-500" /> بدون معامله</span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] text-zinc-500 mb-2">{['ش','ی','د','س','چ','پ','ج'].map(d=><div key={d}>{d}</div>)}</div>
          <div className="grid grid-cols-7 gap-1.5">
            {days.map(d=>{
              const cls = d.pnl>0?'bg-brand-green/15 border-brand-green/40 text-brand-green':d.pnl<0?'bg-brand-red/15 border-brand-red/40 text-brand-red':'bg-ink-700 border-ink-500 text-zinc-500';
              return <div key={d.day} className={`aspect-square rounded-lg border ${cls} p-1.5 flex flex-col`}>
                <div className="text-[10.5px]">{d.day.toLocaleString('fa-IR')}</div>
                {d.pnl !== 0 && <div className="mt-auto text-[11px] font-extrabold stat-num">{d.pnl>0?'+':''}{d.pnl}</div>}
              </div>;
            })}
          </div>
        </div>
      )}

      {view==='analytics' && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-ink-800 border border-ink-500 rounded-2xl p-5">
            <h3 className="text-[14px] font-bold mb-4">منحنی سرمایه (Equity Curve)</h3>
            <svg viewBox="0 0 600 200" className="w-full h-[200px]">
              <defs><linearGradient id="jGrad" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#2BA67A" stopOpacity="0.3"/><stop offset="100%" stopColor="#2BA67A" stopOpacity="0"/></linearGradient></defs>
              <path d="M0,180 L80,160 L160,170 L240,140 L320,150 L400,100 L480,120 L560,80 L600,60 L600,200 L0,200 Z" fill="url(#jGrad)" />
              <path d="M0,180 L80,160 L160,170 L240,140 L320,150 L400,100 L480,120 L560,80 L600,60" fill="none" stroke="#2BA67A" strokeWidth="2.5" />
            </svg>
          </div>
          <div className="bg-ink-800 border border-ink-500 rounded-2xl p-5">
            <h3 className="text-[14px] font-bold mb-4">توزیع R به ازای ست‌آپ</h3>
            <div className="space-y-3">
              {[{tag:'breakout', r:2.2, c:5},{tag:'rejection', r:0.95, c:4},{tag:'trend',r:1.5,c:3},{tag:'fakeout',r:-0.9,c:2},{tag:'overtrade',r:-0.6,c:2}].map(s=>(
                <div key={s.tag}>
                  <div className="flex items-center justify-between text-[12px] mb-1"><span>#{s.tag} <span className="text-zinc-500">({s.c})</span></span><span className={`font-bold stat-num ${s.r>=0?'text-brand-green':'text-brand-red'}`}>{s.r>=0?'+':''}{s.r}R</span></div>
                  <div className="h-2 bg-ink-700 rounded-full overflow-hidden relative"><div className={`absolute top-0 h-full ${s.r>=0?'bg-brand-green':'bg-brand-red'}`} style={{ right:'50%', width:Math.min(50,Math.abs(s.r)*20)+'%', transform:s.r<0?'translateX(100%)':undefined }} /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 bg-ink-800 border border-ink-500 rounded-2xl p-5">
            <h3 className="text-[14px] font-bold mb-3">یادداشت‌های تأمل هفتگی</h3>
            <div className="grid sm:grid-cols-3 gap-3 text-[12.5px] leading-6">
              <div className="bg-ink-900 border border-ink-500 rounded-xl p-3"><div className="text-[10.5px] text-brand-green font-bold mb-1">✓ چیزی که خوب بود</div>صبر روی ست‌آپ‌های A+. سه معاملهٔ بزرگ این هفته.</div>
              <div className="bg-ink-900 border border-ink-500 rounded-xl p-3"><div className="text-[10.5px] text-brand-red font-bold mb-1">✗ خطایی که تکرار شد</div>ورود زود قبل از کلوز کندل. سه بار این هفته.</div>
              <div className="bg-ink-900 border border-ink-500 rounded-xl p-3"><div className="text-[10.5px] text-amber-400 font-bold mb-1">→ هفتهٔ بعد</div>فقط ست‌آپ‌های breakout روی روند، نه کانتر-ترند.</div>
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
