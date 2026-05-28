import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
import { PageShell } from '../layouts/PageShell';
import { useLang } from '../i18n';

// icon imports
const IconCheck = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;
const IconX = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;

const P_LIST = [
  { id: 'sub-pro', cat:'sub', n:'اشتراک طلایی اکوآذرین', nEn:'EcoAzarin Gold Subscription', d:'دسترسی کامل به همهٔ ابزارها، چارت پیشرفته، ژورنال‌نویسی و ۲۰٪ تخفیف دوره‌ها.', dEn:'Full access to all tools, advanced charts, journaling, and 20% discount on courses.', price:'۲٬۸۹۰٬۰۰۰/سال', priceEn:'2,890,000/yr', icon:'⭐', color:'#F59E0B', popular:true },
  { id: 'sub-vip', cat:'sub', n:'اشتراک الماس', nEn:'Diamond Subscription', d:'برای تحلیلگران حرفه‌ای: API، بک‌تست استراتژی، گزارش PDF، کوچ هفتگی.', dEn:'For pro analysts: API, strategy backtest, PDF reports, weekly coaching.', price:'۵٬۸۹۰٬۰۰۰/سال', priceEn:'5,890,000/yr', icon:'💎', color:'#06B6D4' },
  { id: 'srv-consult', cat:'service', n:'مشاورهٔ پرتفوی شخصی', nEn:'Personal Portfolio Consultation', d:'یک ساعت گفت‌وگوی تخصصی با تحلیلگر ارشد + گزارش مکتوب.', dEn:'1-hour specialized discussion with a senior analyst + written report.', price:'۹۸۰٬۰۰۰/جلسه', priceEn:'980,000/session', icon:'🤝', color:'#10B981' },
  { id: 'srv-signal', cat:'service', n:'سیگنال هفتگی پریمیوم', nEn:'Premium Weekly Signals', d:'۵–۸ سیگنال در هفته از تیم تحلیل، با نقاط ورود/خروج دقیق و توضیح کامل.', dEn:'5-8 signals per week from the analytics team, with precise entry/exit points.', price:'۱٬۲۸۰٬۰۰۰/ماه', priceEn:'1,280,000/mo', icon:'📡', color:'#A855F7' },
  { id: 'pack-full', cat:'pack', n:'پک کامل آموزشی', nEn:'Full Training Pack', d:'مجموعهٔ ۸ دورهٔ منتخب از پایه تا پیشرفته با ۵۰٪ تخفیف.', dEn:'Collection of 8 selected courses from basics to advanced at 50% off.', price:'۴٬۹۹۰٬۰۰۰', priceEn:'4,990,000', icon:'📦', color:'#E63946' },
  { id: 'pack-start', cat:'pack', n:'بسته شروع معامله‌گری', nEn:'Trading Starter Pack', d:'۳ دوره + اندیکاتور EcoTrend + ۱ ماه اشتراک طلایی.', dEn:'3 courses + EcoTrend indicator + 1 month Gold Subscription.', price:'۱٬۹۹۰٬۰۰۰', priceEn:'1,990,000', icon:'🎁', color:'#3B82F6' },
];

const P_CATS = [
  { id:'all', l:'همه', lEn:'All' },
  { id:'sub', l:'اشتراک‌ها', lEn:'Subscriptions' },
  { id:'service', l:'خدمات', lEn:'Services' },
  { id:'pack', l:'بسته‌ها', lEn:'Packages' }
];

const COMPARISON = [
  { feature: 'چارت‌های پایه', featureEn: 'Basic Charts', basic: true, gold: true, diamond: true },
  { feature: 'اخبار بازار', featureEn: 'Market News', basic: true, gold: true, diamond: true },
  { feature: 'اندیکاتورهای حرفه‌ای', featureEn: 'Pro Indicators', basic: false, gold: true, diamond: true },
  { feature: 'هشدارهای شخصی', featureEn: 'Custom Alerts', basic: false, gold: true, diamond: true },
  { feature: 'ژورنال معاملاتی', featureEn: 'Trading Journal', basic: false, gold: true, diamond: true },
  { feature: 'دسترسی API', featureEn: 'API Access', basic: false, gold: false, diamond: true },
  { feature: 'کوچینگ اختصاصی', featureEn: '1on1 Coaching', basic: false, gold: false, diamond: true },
  { feature: 'معاملات رباتیک', featureEn: 'Bot Trading', basic: false, gold: false, diamond: true },
];

function ProductsContent() {
  const [lang] = useLang();
  const isEn = lang === 'EN';
  const [c, setC] = useState('all');
  const list = P_LIST.filter(p => c === 'all' || p.cat === c);

  const handlePurchase = () => {
    // Redirect to Auth or Payment page
    window.location.href = '/auth.html';
  };

  return (
    <section className="px-4 md:px-6 max-w-[1400px] mx-auto py-8" data-screen-label="Products">
      
      {/* Modern Hero Banner */}
      <div className="bg-ink-850 light:bg-white border border-ink-500 light:border-zinc-200 rounded-3xl p-8 md:p-14 mb-10 relative overflow-hidden text-center z-0 group shadow-lg light:shadow-sm">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-red/10 light:bg-brand-red/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-700 ease-out" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-green/10 light:bg-brand-green/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-red/10 light:bg-brand-red/10 border border-brand-red/20 text-brand-red font-semibold text-[12px] mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            <span>{isEn ? 'EcoAzarin Store' : 'فروشگاه و محصولات اکوآذرین'}</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.3] text-white light:text-zinc-900 mb-6 max-w-3xl">
            {isEn ? 'Everything you need to grow your capital, all in one place.' : 'هرچه برای رشد سرمایه‌ت لازم داری، یک‌جا.'}
          </h1>
          <p className="text-zinc-400 light:text-zinc-500 text-[15px] md:text-[16px] max-w-2xl leading-relaxed mb-8">
            {isEn ? 'From professional tools and educational courses to premium subscriptions. Start your journey with the best resources.' : 'از ابزارهای حرفه‌ای و دوره‌های آموزشی تا اشتراک‌های ویژه. مسیر موفقیت خود را با کامل‌ترین تجهیزات آغاز کنید.'}
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {P_CATS.map(x => (
          <button 
            key={x.id} 
            onClick={() => setC(x.id)} 
            className={`px-5 py-2.5 rounded-full text-[13px] border transition-all duration-300 font-medium ${
              c === x.id 
              ? 'bg-brand-red text-white border-brand-red shadow-[0_4px_15px_-4px_rgba(230,57,70,0.4)]'
              : 'bg-ink-800 light:bg-zinc-50 text-zinc-300 light:text-zinc-600 border-ink-500 light:border-zinc-200 hover:border-brand-red/50 hover:text-brand-red'
            }`}
          >
            {isEn ? x.lEn : x.l}
          </button>
        ))}
      </div>

      {/* Product Cards (Equal Height Grid) */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {list.map((p, i) => (
          <article 
            key={i} 
            className={`relative flex flex-col bg-ink-850 light:bg-white border-2 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 ${
              p.popular 
              ? 'border-brand-red shadow-[0_8px_30px_-10px_rgba(230,57,70,0.2)]'
              : 'border-ink-500 light:border-zinc-200 hover:border-ink-400 light:hover:border-zinc-300 shadow-sm'
            }`}
          >
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold bg-brand-red text-white shadow-sm">
                {isEn ? 'Most Popular' : 'محبوب‌ترین'}
              </div>
            )}
            
            <div className="flex items-center gap-4 mb-5">
              <div className="h-16 w-16 rounded-2xl flex items-center justify-center text-[30px] shrink-0" style={{ background: p.color + '15', border: `1px solid ${p.color}30` }}>
                {p.icon}
              </div>
              <div>
                <h3 className="text-[18px] font-extrabold text-white light:text-zinc-900 leading-tight">{isEn ? p.nEn : p.n}</h3>
              </div>
            </div>
            
            <p className="text-[13.5px] text-zinc-400 light:text-zinc-500 leading-relaxed mb-6 flex-1">
              {isEn ? p.dEn : p.d}
            </p>
            
            <div className="mt-auto">
              <div className="flex items-end mb-6">
                <span className="text-[24px] font-extrabold stat-num" style={{ color: p.color }}>
                  {(isEn ? p.priceEn : p.price).split('/')[0]}
                </span>
                <span className="text-[13px] font-medium text-zinc-500 mb-1 ml-1">
                  {(isEn ? p.priceEn : p.price).includes('/') ? '/' + (isEn ? p.priceEn : p.price).split('/')[1] : ''}
                  {isEn ? '' : ' تومان'}
                </span>
              </div>
              
              <button 
                onClick={handlePurchase}
                className="w-full h-12 rounded-xl text-[14px] font-bold transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                style={{ 
                  background: p.popular ? p.color : 'transparent',
                  color: p.popular ? '#fff' : p.color,
                  border: `2px solid ${p.color}`
                }}
              >
                {isEn ? 'Select Plan' : 'انتخاب و خرید'}
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className={isEn ? '' : 'rotate-180'}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Comparison Section */}
      <div className="bg-ink-850 light:bg-white border border-ink-500 light:border-zinc-200 rounded-3xl p-6 md:p-10 mb-10 overflow-hidden shadow-lg light:shadow-sm">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-2 text-white light:text-zinc-900">
          {isEn ? 'Compare Plans' : 'مقایسه اشتراک‌ها'}
        </h2>
        <p className="text-zinc-400 text-center mb-8 text-[14px]">
          {isEn ? 'Find the right tier for your trading.' : 'کدام سطح اشتراک برای شما مناسب است؟'}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b border-ink-500 light:border-zinc-200 font-bold text-zinc-300 light:text-zinc-600 text-[14px] w-1/4">
                  {isEn ? 'Features' : 'ویژگی‌ها'}
                </th>
                <th className="p-4 border-b border-ink-500 light:border-zinc-200 font-bold text-zinc-300 light:text-zinc-800 text-[14px] text-center w-1/4 bg-ink-900/30 light:bg-zinc-50 rounded-tl-xl rounded-tr-xl">
                  {isEn ? 'Free (Basic)' : 'رایگان (پایه)'}
                </th>
                <th className="p-4 border-b border-ink-500 light:border-zinc-200 font-bold text-amber-500 text-[14px] text-center w-1/4 relative top-bg-effect">
                  <div className="absolute inset-0 bg-amber-500/5 light:bg-amber-100/50 rounded-tl-xl rounded-tr-xl -z-10"></div>
                  {isEn ? 'Gold Status' : 'اشتراک طلایی'}
                </th>
                <th className="p-4 border-b border-ink-500 light:border-zinc-200 font-bold text-cyan-500 text-[14px] text-center w-1/4 bg-ink-900/30 light:bg-zinc-50 rounded-tl-xl rounded-tr-xl">
                  {isEn ? 'Diamond VIP' : 'الماس VIP'}
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, idx) => (
                <tr key={idx} className="group hover:bg-ink-800/50 light:hover:bg-zinc-50/80 transition-colors">
                  <td className="p-4 border-b border-ink-500/50 light:border-zinc-100 text-[13.5px] font-medium text-zinc-300 light:text-zinc-700">
                    {isEn ? row.featureEn : row.feature}
                  </td>
                  <td className="p-4 border-b border-ink-500/50 light:border-zinc-100 text-center bg-ink-900/10 light:bg-zinc-50/50">
                    {row.basic ? <div className="text-zinc-500 flex justify-center"><IconCheck/></div> : <div className="text-ink-500 light:text-zinc-300 flex justify-center"><IconX/></div>}
                  </td>
                  <td className="p-4 border-b border-ink-500/50 light:border-zinc-100 text-center relative">
                    <div className="absolute inset-0 bg-amber-500/5 light:bg-amber-100/50 group-hover:bg-amber-500/10 transition-colors -z-10"></div>
                    {row.gold ? <div className="text-amber-500 flex justify-center"><IconCheck/></div> : <div className="text-ink-500 light:text-zinc-300 flex justify-center"><IconX/></div>}
                  </td>
                  <td className="p-4 border-b border-ink-500/50 light:border-zinc-100 text-center bg-ink-900/10 light:bg-zinc-50/50">
                    {row.diamond ? <div className="text-cyan-500 flex justify-center"><IconCheck/></div> : <div className="text-ink-500 light:text-zinc-300 flex justify-center"><IconX/></div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
}
function App(){ return <PageShell slug="products"><ProductsContent /></PageShell>; }
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

export { P_LIST, P_CATS, ProductsContent };

