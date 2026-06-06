import React, { useState } from 'react';
import { useLang, LangToggle } from '../i18n';
import { motion } from 'motion/react';
import { 
  Code2, Terminal, Cpu, Key, ArrowRight, BookOpen, Layers, 
  Zap, Hexagon, ArrowLeft, Copy, Check, Database
} from 'lucide-react';

const MOCK_ENDPOINTS = [
  {
    id: 'market-data',
    method: 'GET',
    path: '/v1/market/tickers',
    descEn: 'Retrieve live market pricing and 24h volume for supported trading pairs.',
    descFa: 'دریافت قیمت لحظه‌ای بازار و حجم ۲۴ ساعته برای جفت‌ارزهای پشتیبانی شده.',
    res: `{\n  "status": "success",\n  "data": [\n    {"symbol": "BTC-USD", "price": 64230.50, "vol": 1245.2},\n    {"symbol": "ETH-USD", "price": 3450.00, "vol": 8900.5}\n  ]\n}`
  },
  {
    id: 'account-balance',
    method: 'GET',
    path: '/v1/account/balance',
    descEn: 'Get current user portfolio balance and margin ratio.',
    descFa: 'دریافت موجودی فعلی پرتفوی کاربر و نسبت مارجین.',
    res: `{\n  "balance": 150000.00,\n  "currency": "USD",\n  "margin_used": 12000.50,\n  "margin_ratio": 0.08\n}`
  },
  {
    id: 'trade-order',
    method: 'POST',
    path: '/v1/trade/orders',
    descEn: 'Place a new market or limit order.',
    descFa: 'ثبت یک سفارش جدید در بازار (مارکت یا لیمیت).',
    res: `{\n  "order_id": "ord_947x3a",\n  "status": "filled",\n  "executed_price": 64235.00,\n  "fee": 0.50\n}`
  }
];

export function DevelopersPage() {
  const [lang] = useLang();
  const isEn = lang === 'EN';
  const [activeTab, setActiveTab] = useState(MOCK_ENDPOINTS[0].id);
  const [copied, setCopied] = useState(false);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeData = MOCK_ENDPOINTS.find(e => e.id === activeTab);

  return (
    <div className={`min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-brand-green/30 ${isEn ? '' : 'dir-rtl'}`}>
      
      {/* Navbar Minimalist */}
      <nav className="fixed top-0 w-full border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-3 text-white group">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                <Hexagon size={22} className="text-brand-green" />
              </div>
              <div>
                <div className="font-bold tracking-tight text-[15px]">Eco Azarin</div>
                <div className="text-[11px] font-mono text-zinc-500 tracking-widest">{isEn ? 'DEVELOPERS' : 'توسعه‌دهندگان'}</div>
              </div>
            </a>
            
            <div className="hidden md:flex items-center gap-1 p-1 bg-white/5 rounded-lg border border-white/5">
              <button className="px-4 py-2 text-[13px] font-mono font-medium rounded-md bg-white/10 text-white">REST API</button>
              <button className="px-4 py-2 text-[13px] font-mono font-medium rounded-md text-zinc-500 hover:text-white transition-colors">WebSockets</button>
              <button className="px-4 py-2 text-[13px] font-mono font-medium rounded-md text-zinc-500 hover:text-white transition-colors">SDKs</button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <LangToggle />
            <a href="/" className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-zinc-300 hover:text-white hover:bg-white/20 transition-colors">
              {isEn ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </a>
            <button className="hidden md:flex items-center gap-2 bg-brand-green text-black px-6 py-2.5 rounded-lg font-bold text-[14px] hover:bg-brand-green/90 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
               <Key size={16} />
               <span>{isEn ? 'Generate API Key' : 'ساخت توکن API'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-green/20 blur-[150px] rounded-full pointer-events-none -z-10 opacity-50" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[12px] font-mono mb-8 text-brand-green">
              <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              v3.2.0 is live
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              {isEn ? 'Build the future of' : 'آینده‌ی مالی را'}<br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-green to-emerald-300">
                {isEn ? 'algorithmic trading.' : 'با کدها بساز.'}
              </span>
            </h1>
            
            <p className="text-lg text-zinc-400 leading-relaxed mb-10 max-w-xl">
              {isEn 
                ? 'Integrate Eco Azarin\'s ultra-low latency market data and trading execution into your own scripts, apps, and quant models in minutes.'
                : 'داده‌های زنده بازار و اتصال به هسته معاملات Eco Azarin را در کمترین زمان با بالاترین سرعت در اسکریپت‌ها و اپلیکیشن‌های خود ادغام کنید.'}
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-zinc-200 transition text-[15px] flex items-center gap-2">
                <BookOpen size={18} />
                {isEn ? 'Read Documentation' : 'مطالعه مستندات'}
              </button>
              <button className="bg-white/5 text-white border border-white/10 px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition text-[15px] flex items-center gap-2">
                <Terminal size={18} />
                {isEn ? 'Quick Start Guide' : 'شروع سریع'}
              </button>
            </div>
          </motion.div>

          {/* Interactive Terminal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-2xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-brand-green/5 to-transparent pointer-events-none" />
            <div className="h-12 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400/20 border border-eed-400/50" />
              <div className="w-3 h-3 rounded-full bg-amber-400/20 border border-amber-400/50" />
              <div className="w-3 h-3 rounded-full bg-brand-green/20 border border-brand-green/50" />
              <div className="ms-4 font-mono text-[12px] text-zinc-500">api.ecoazarin.com</div>
            </div>
            
            <div className="flex">
              {/* Sidebar Tabs */}
              <div className="w-1/3 border-e border-white/10 bg-white/[0.02] p-2 flex flex-col gap-1 min-h-[400px]">
                {MOCK_ENDPOINTS.map(ep => (
                  <button 
                    key={ep.id}
                    onClick={() => setActiveTab(ep.id)}
                    className={`flex flex-col items-start p-3 rounded-lg text-start transition-colors ${
                      activeTab === ep.id 
                        ? 'bg-white/10 border border-white/5' 
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[10px] font-mono font-bold px-1.5 rounded ${ep.method === 'GET' ? 'bg-blue-400/20 text-blue-400' : 'bg-brand-green/20 text-brand-green'}`}>
                        {ep.method}
                      </span>
                      <span className="text-[12px] font-mono text-zinc-300 truncate w-full" dir="ltr">{ep.path}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Code Area */}
              <div className="w-2/3 p-6 relative">
                <button onClick={() => copyCode(activeData.res)} className="absolute top-4 end-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 transition">
                  {copied ? <Check size={16} className="text-brand-green" /> : <Copy size={16} />}
                </button>
                <div className="mb-6">
                  <h3 className="text-white font-bold mb-2 text-[15px]">{activeData.path}</h3>
                  <p className="text-zinc-500 text-[13px] leading-relaxed">{isEn ? activeData.descEn : activeData.descFa}</p>
                </div>
                <div className="bg-black/50 border border-white/5 rounded-xl p-4">
                  <div className="text-[10px] font-mono text-zinc-500 mb-2 uppercase tracking-wider">JSON Response</div>
                  <pre className="font-mono text-[13px] leading-[1.6] text-emerald-400 overflow-x-auto" dir="ltr">
                    {activeData.res}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Documentation Snippet Section */}
      <section className="py-20 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              {isEn ? 'Simple. Powerful. Elegant.' : 'ساده. قدرتمند. ظریف.'}
            </h2>
            <p className="text-zinc-400 text-[15px] max-w-2xl leading-relaxed">
              {isEn 
                ? 'Our SDK brings the full power of Eco Azarin to your application with just a few lines of code. Authentication, rate-limiting, and error handling are fully managed.'
                : 'کتابخانه نرم‌افزاری ما تمام قدرت اکو آذرین را تنها با چند خط کد به برنامه شما می‌آورد. احراز هویت، محدودیت درخواست‌ها و مدیریت خطاها به‌طور کامل خودکارسازی شده‌اند.'}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl border border-white/5 bg-[#0A0A0A] overflow-hidden">
              <div className="flex items-center gap-4 px-4 h-12 border-b border-white/5 bg-white/5">
                <span className="text-[12px] font-mono text-zinc-400">Node.js</span>
                <span className="text-[12px] font-mono text-brand-green border-b border-brand-green py-3">trade.js</span>
              </div>
              <div className="p-6 overflow-x-auto text-[13px] font-mono leading-relaxed" dir="ltr">
                <span className="text-pink-400">import</span> <span className="text-white">{'{'} EcoClient {'}'}</span> <span className="text-pink-400">from</span> <span className="text-green-300">'@ecoazarin/sdk'</span>;<br/><br/>
                <span className="text-zinc-500">// Initialize the client with your API key</span><br/>
                <span className="text-pink-400">const</span> <span className="text-white">eco</span> <span className="text-pink-400">=</span> <span className="text-pink-400">new</span> <span className="text-blue-300">EcoClient</span>({'{'}<br/>
                <span className="text-white">  apiKey:</span> <span className="text-amber-300">process.env.ECO_API_KEY</span><br/>
                {'}'});<br/><br/>
                <span className="text-zinc-500">// Execute a market order programmatically</span><br/>
                <span className="text-pink-400">async function</span> <span className="text-blue-300">executeTrade</span>() {'{'}<br/>
                <span className="text-white">  </span><span className="text-pink-400">try</span> {'{'}<br/>
                <span className="text-white">    </span><span className="text-pink-400">const</span> <span className="text-white">order</span> <span className="text-pink-400">=</span> <span className="text-pink-400">await</span> <span className="text-white">eco.orders.</span><span className="text-blue-300">create</span>({'{'}<br/>
                <span className="text-white">      symbol:</span> <span className="text-green-300">'BTC-USD'</span>,<br/>
                <span className="text-white">      side:</span> <span className="text-green-300">'buy'</span>,<br/>
                <span className="text-white">      type:</span> <span className="text-green-300">'market'</span>,<br/>
                <span className="text-white">      amount:</span> <span className="text-amber-300">0.15</span><br/>
                <span className="text-white">    </span>{'}'});<br/><br/>
                <span className="text-white">    </span><span className="text-blue-300">console.log</span>(<span className="text-green-300">'Trade Executed:'</span>, <span className="text-white">order.id</span>);<br/>
                <span className="text-white">  </span>{'}'} <span className="text-pink-400">catch</span> (<span className="text-white">error</span>) {'{'}<br/>
                <span className="text-white">    </span><span className="text-blue-300">console.error</span>(<span className="text-green-300">'Execution failed:'</span>, <span className="text-white">error.message</span>);<br/>
                <span className="text-white">  </span>{'}'}<br/>
                {'}'}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Code2 size={16} />
                  </div>
                  <h3 className="font-bold text-white text-[16px]">{isEn ? 'Type-Safe SDKs' : 'تایپینگ کامل SDK'}</h3>
                </div>
                <p className="text-zinc-400 text-[14px] leading-relaxed">
                  {isEn 
                    ? 'Our TypeScript definitions ensure you catch errors before running your code. Get instant autocomplete for endpoints, parameters, and responses.'
                    : 'با پشتیبانی کامل از TypeScript، خطاها را پیش از اجرای کد شناسایی کنید. پیشنهاد خودکارِ (Autocomplete) پارامترها و پاسخ‌های API برای شما آماده است.'}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-brand-green/20 text-brand-green flex items-center justify-center shrink-0">
                    <Terminal size={16} />
                  </div>
                  <h3 className="font-bold text-white text-[16px]">{isEn ? 'Webhooks & Streams' : 'وب‌هوک و استریم زنده'}</h3>
                </div>
                <p className="text-zinc-400 text-[14px] leading-relaxed">
                  {isEn 
                    ? 'Subscribe to WebSockets to receive live ticker updates and orderbook depth, or configure webhooks for account and portfolio events.'
                    : 'برای دریافت لحظه‌ای قیمت‌ها و عمق بازار به وب‌سوکت متصل شوید، یا وب‌هوک‌های اختصاصی را برای رویدادهای پرتفوی خود پیکربندی کنید.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              {isEn ? 'Built for scale and precision.' : 'ساخته شده برای مقیاس و دقت.'}
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-[15px]">
              {isEn ? 'Everything you need to build powerful financial applications.' : 'هر آنچه برای ساخت برنامه‌های قدرتمند مالی نیاز دارید.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Zap size={24}/>, tEn: 'Ultra-low Latency', tFa: 'تاخیر بسیار پایین', dEn: 'Direct cross-connect to major liquidity providers ensuring execution under 50ms.', dFa: 'اتصال مستقیم به تامین‌کنندگان نقدینگی برای تضمین اجرای سفارشات در کمتر از ۵۰ میلی‌ثانیه.' },
              { icon: <Layers size={24}/>, tEn: 'Robust SDKs', tFa: 'کتابخانه‌های قدرتمند', dEn: 'Official client libraries for Python, Node.js, Go, and Rust with full type safety.', dFa: 'کتابخانه‌های رسمی برای زبان‌های پایتون، نود، گو و راست با تایپینگ کامل.' },
              { icon: <Database size={24}/>, tEn: 'Historical Data', tFa: 'داده‌های تاریخی', dEn: 'Access years of tick-by-tick order book data and OHLCV bars for backtesting.', dFa: 'دسترسی به سال‌ها دیتای تیک به تیک و کندل‌های قیمتی جهت تست استراتژی‌ها.' }
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-green/30 hover:bg-white/10 transition group">
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{isEn ? f.tEn : f.tFa}</h3>
                <p className="text-[14px] text-zinc-400 leading-relaxed">{isEn ? f.dEn : f.dFa}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-24 border-t border-white/5 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-0 end-1/4 w-[500px] h-[500px] bg-brand-green/10 blur-[120px] rounded-full pointer-events-none -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              {isEn ? 'Transparent API Pricing' : 'تعرفه‌های استفاده از API'}
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto text-[15px]">
              {isEn 
                ? 'From hobby projects to high-frequency trading firms. Scale your infrastructure alongside your algorithms.' 
                : 'از پروژه‌های شخصی تا شرکت‌های معاملات الگوریتمی (HFT). زیرساخت‌های خود را متناسب با نیاز خود مقیاس‌دهی کنید.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Free Tier */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 hover:border-white/20 transition-colors flex flex-col">
              <div className="font-mono text-[12px] text-zinc-400 mb-2 uppercase tracking-widest">{isEn ? 'Sandbox' : 'آزمایشی (سندباکس)'}</div>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-bold text-white">{isEn ? 'Free' : 'رایگان'}</span>
              </div>
              <p className="text-[14px] text-zinc-400 mb-8 h-10">
                {isEn ? 'Perfect for testing strategies and paper trading.' : 'ایده‌آل برای تست استراتژی‌ها و پیپر تریدینگ (معاملات کاغذی).'}
              </p>
              
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  isEn ? '10 req/sec limit' : 'محدودیت ۱۰ درخواست/ثانیه',
                  isEn ? 'Delayed market data (15m)' : 'داده‌های بازار با ۱۵ دقیقه تاخیر',
                  isEn ? 'Paper trading environment' : 'محیط شبیه‌ساز معاملات',
                  isEn ? 'Community support' : 'پشتیبانی از طریق کامیونیتی'
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={16} className="text-brand-green shrink-0 mt-0.5" />
                    <span className="text-[13px] text-zinc-300">{f}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition text-[14px]">
                {isEn ? 'Get API Key' : 'دریافت کلید API'}
              </button>
            </div>

            {/* Pro Tier */}
            <div className="rounded-3xl border border-brand-green/50 bg-brand-green/5 p-8 relative flex flex-col shadow-[0_0_40px_rgba(16,185,129,0.1)]">
              <div className="absolute top-0 start-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-brand-green text-black text-[11px] font-bold rounded-full uppercase tracking-wider">
                {isEn ? 'Recommended' : 'پیشنهاد ما'}
              </div>
              <div className="font-mono text-[12px] text-brand-green mb-2 uppercase tracking-widest">{isEn ? 'Pro Trader' : 'معامله‌گر حرفه‌ای'}</div>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-bold text-white">{isEn ? '$99' : '۲٬۹۰۰٬۰۰۰'}</span>
                <span className="text-zinc-400 mb-1">{isEn ? '/mo' : ' تومان / ماه'}</span>
              </div>
              <p className="text-[14px] text-zinc-400 mb-8 h-10">
                {isEn ? 'For serious algorithmic traders requiring live data.' : 'مخصوص معامله‌گران الگوریتمی جدی که به داده‌های لایو نیاز دارند.'}
              </p>
              
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  isEn ? '100 req/sec limit' : 'محدودیت ۱۰۰ درخواست/ثانیه',
                  isEn ? 'Real-time orderbook (L2)' : 'دفتر سفارشات لایو (سطح ۲)',
                  isEn ? 'Live trade execution' : 'اجرای معاملات در بازار واقعی',
                  isEn ? 'Webhooks support' : 'پشتیبانی کامل از وب‌هوک',
                  isEn ? 'Priority email support' : 'پشتیبانی با اولویت بالا'
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={16} className="text-brand-green shrink-0 mt-0.5" />
                    <span className="text-[13px] text-zinc-300">{f}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full py-3 rounded-xl bg-brand-green text-black font-bold hover:bg-brand-green/90 transition text-[14px]">
                {isEn ? 'Start Pro Plan' : 'شروع پلن حرفه‌ای'}
              </button>
            </div>

            {/* Enterprise Tier */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 hover:border-white/20 transition-colors flex flex-col">
              <div className="font-mono text-[12px] text-purple-400 mb-2 uppercase tracking-widest">{isEn ? 'Institutional' : 'سازمانی / فاند'}</div>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-bold text-white">{isEn ? 'Custom' : 'توافقی'}</span>
              </div>
              <p className="text-[14px] text-zinc-400 mb-8 h-10">
                {isEn ? 'Direct market access for funds and institutions.' : 'دسترسی مستقیم (DMA) برای فاندها، بروکرها و نهادهای مالی.'}
              </p>
              
              <ul className="space-y-4 mb-8 flex-1">
                {[
                  isEn ? 'Unlimited req/sec (Dedicated Node)' : 'بدون محدودیت نرخ (نود اختصاصی)',
                  isEn ? 'Full depth orderbook (L3)' : 'عمق کامل دفتر سفارشات (سطح ۳)',
                  isEn ? 'Co-location & Cross-connect' : 'اتصال مستقیم (Co-location)',
                  isEn ? 'Custom integrations' : 'پیاده‌سازی‌های اختصاصی',
                  isEn ? '24/7 Phone & Slack support' : 'پشتیبانی ۲۴ ساعته (تلفن و اسلک)'
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={16} className="text-purple-400 shrink-0 mt-0.5" />
                    <span className="text-[13px] text-zinc-300">{f}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition text-[14px]">
                {isEn ? 'Contact Sales' : 'تماس با فروش'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer minimal */}
      <footer className="border-t border-white/5 py-8 text-center text-zinc-600 text-[13px] font-mono">
        © 2026 Eco Azarin Developers Platform. All rights reserved.
      </footer>
    </div>
  );
}
