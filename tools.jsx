// tools.jsx — ابزارهای ترید
const { useState: tlUS } = React;
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
  const [cat, setCat] = tlUS('all');
  const list = T_TOOLS.filter(t=>cat==='all'||t.cat===cat);
  return (
    <section className="px-4 md:px-6 max-w-[1400px] mx-auto" data-screen-label="Tools">
      <div className="bg-gradient-to-l from-brand-green/15 via-ink-800 to-ink-800 border border-ink-500 rounded-2xl p-6 md:p-8 mb-6">
        <span className="text-[11px] px-2.5 py-1 rounded-md bg-brand-green/15 border border-brand-green/30 text-brand-green font-bold">⚙ ابزارخانه</span>
        <h1 className="text-2xl md:text-3xl font-extrabold mt-3 tracking-tight">ابزارهایی که حرفه‌ای‌ها استفاده می‌کنند.</h1>
        <p className="text-zinc-300 text-[13px] mt-2 max-w-xl leading-7">اندیکاتور، اکسپرت، اسکنر و فید داده — تست شده توسط تیم اکوآذرین.</p>
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
              <div>{t.oldPrice && <div className="text-[10.5px] text-zinc-500 line-through num-display">{t.oldPrice}</div>}<div className="text-[15px] font-extrabold stat-num text-brand-green">{t.price}<span className="text-[10px] font-medium text-zinc-500 me-1">{t.price==='رایگان'?'':'تومان'}</span></div></div>
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
