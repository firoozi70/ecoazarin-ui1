// products.jsx — محصولات اکوآذرین
const { useState: pUS } = React;
const P_LIST = [
  { cat:'sub', n:'اشتراک طلایی اکوآذرین', d:'دسترسی کامل به همهٔ ابزارها، چارت پیشرفته، ژورنال‌نویسی و ۲۰٪ تخفیف دوره‌ها.', price:'۲٬۸۹۰٬۰۰۰/سال', icon:'⭐', color:'#F59E0B', popular:true },
  { cat:'sub', n:'اشتراک الماس', d:'برای تحلیلگران حرفه‌ای: API، بک‌تست استراتژی، گزارش PDF، کوچ هفتگی.', price:'۵٬۸۹۰٬۰۰۰/سال', icon:'💎', color:'#06B6D4' },
  { cat:'service', n:'مشاورهٔ پرتفوی شخصی', d:'یک ساعت گفت‌وگوی تخصصی با تحلیلگر ارشد + گزارش مکتوب.', price:'۹۸۰٬۰۰۰/جلسه', icon:'🤝', color:'#10B981' },
  { cat:'service', n:'سیگنال هفتگی پریمیوم', d:'۵–۸ سیگنال در هفته از تیم تحلیل، با نقاط ورود/خروج دقیق و توضیح کامل.', price:'۱٬۲۸۰٬۰۰۰/ماه', icon:'📡', color:'#A855F7' },
  { cat:'pack', n:'پک کامل آموزشی', d:'مجموعهٔ ۸ دورهٔ منتخب از پایه تا پیشرفته با ۵۰٪ تخفیف.', price:'۴٬۹۹۰٬۰۰۰', icon:'📦', color:'#E63946' },
  { cat:'pack', n:'بسته شروع معامله‌گری', d:'۳ دوره + اندیکاتور EcoTrend + ۱ ماه اشتراک طلایی.', price:'۱٬۹۹۰٬۰۰۰', icon:'🎁', color:'#3B82F6' },
];
const P_CATS = [{id:'all',l:'همه'},{id:'sub',l:'اشتراک‌ها'},{id:'service',l:'خدمات'},{id:'pack',l:'بسته‌ها'}];

function ProductsContent(){
  const [c,setC]=pUS('all');
  const list = P_LIST.filter(p=>c==='all'||p.cat===c);
  return (
    <section className="px-4 md:px-6 max-w-[1300px] mx-auto" data-screen-label="Products">
      <div className="bg-gradient-to-l from-brand-red/15 via-ink-800 to-ink-800 border border-ink-500 rounded-2xl p-6 md:p-8 mb-6">
        <span className="text-[11px] px-2.5 py-1 rounded-md bg-brand-red/15 border border-brand-red/30 text-brand-redSoft font-bold">🛍 محصولات و خدمات</span>
        <h1 className="text-2xl md:text-3xl font-extrabold mt-3 tracking-tight">هرچه برای رشد سرمایه‌ت لازم داری، یک‌جا.</h1>
      </div>
      <div className="flex gap-2 mb-6">{P_CATS.map(x=><button key={x.id} onClick={()=>setC(x.id)} className={`px-4 py-2 rounded-full text-[12.5px] border transition ${c===x.id?'bg-brand-red text-white border-brand-red font-bold':'bg-ink-800 text-zinc-300 border-ink-500 hover:border-ink-400'}`}>{x.l}</button>)}</div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((p,i)=>(
          <article key={i} className={`relative bg-ink-800 border-2 rounded-2xl p-6 transition ${p.popular?'border-amber-500/60 shadow-[0_8px_40px_-10px_rgba(245,158,11,0.4)]':'border-ink-500 hover:border-ink-400'}`}>
            {p.popular && <div className="absolute -top-3 right-5 px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">محبوب‌ترین</div>}
            <div className="h-14 w-14 rounded-2xl flex items-center justify-center text-[26px] mb-4" style={{ background:p.color+'25', border:`1px solid ${p.color}50` }}>{p.icon}</div>
            <h3 className="text-[16px] font-extrabold mb-2">{p.n}</h3>
            <p className="text-[12.5px] text-zinc-400 leading-7 mb-5">{p.d}</p>
            <div className="text-[20px] font-extrabold stat-num mb-4" style={{ color:p.color }}>{p.price.split('/')[0]}<span className="text-[11px] font-medium text-zinc-500 mr-1">{p.price.includes('/')?'/'+p.price.split('/')[1]:''} تومان</span></div>
            <button className="w-full h-11 rounded-xl text-[13px] font-bold transition" style={{ background:p.color, color:'#000' }}>انتخاب</button>
          </article>
        ))}
      </div>
    </section>
  );
}
function App(){ return <PageShell slug="products"><ProductsContent /></PageShell>; }
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
