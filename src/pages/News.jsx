import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { PageShell } from '../layouts/PageShell';
import { BigNewsCarousel, NewsLists } from '../components/home/News';
import { IconSearch, IconClose, IconChevronLeft, IconChevronRight } from '../components/ui/Icons';
import { motion } from 'motion/react';
import { useLang } from '../i18n';

function NewsContent() {
  const [lang] = useLang();
  const isEn = lang === 'EN';
  const [q, setQ] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'popular'

  const categories = [
    { id: 'all', label: 'همه اخبار' },
    { id: 'بورس', label: 'بورس' },
    { id: 'کریپتو', label: 'کریپتو' },
    { id: 'بانکداری', label: 'بانکداری' },
    { id: 'جهان', label: 'اقتصاد جهان' }
  ];

  // We rely on window.NEWS_GRID as base mock data.
  // We'll duplicate it to simulate a larger paginated list.
  const ALL_NEWS = useMemo(() => {
    let base = window.NEWS_GRID || [];
    // duplicate to get pages
    let extended = [];
    for(let i = 0; i < 24; i++) {
      const b = base[i % base.length];
      extended.push({ ...b, id: i, views: b.views + (Math.random()*100 - 50) });
    }
    return extended;
  }, []);

  const filteredNews = useMemo(() => {
    let result = ALL_NEWS;
    if (activeCategory !== 'all') {
      result = result.filter(n => n.kicker === activeCategory);
    }
    if (q) {
      result = result.filter(n => n.title.includes(q) || n.kicker.includes(q));
    }
    if (sortBy === 'popular') {
      result = [...result].sort((a,b) => b.views - a.views);
    }
    return result;
  }, [ALL_NEWS, activeCategory, q, sortBy]);

  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const currentNews = filteredNews.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <section className="px-4 md:px-6 max-w-[1400px] mx-auto py-8" data-screen-label="News">
      {/* Hero Header & Search */}
      <div className="mb-12 relative mt-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-green/10 light:bg-brand-green/10 rounded-full blur-[100px] -z-10 opacity-70" />
        
        <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 light:bg-brand-green/10 border border-brand-green/20 text-brand-green font-semibold text-[12px] mb-6 mx-auto flex w-max">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
          <span>{isEn ? 'EcoAzarin Newsroom' : 'اتاق خبر اکوآذرین'}</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5 text-white light:text-zinc-900 text-center">
          {isEn ? 'Latest' : 'جدیدترین'} <span className="text-brand-green">{isEn ? 'Market News' : 'اخبار بازار'}</span>
        </h1>
        <p className="text-zinc-400 light:text-zinc-500 text-[14.5px] md:text-[15px] leading-relaxed max-w-2xl mx-auto text-center mb-8">
          {isEn ? 'Live coverage, breaking news, financial markets, cryptocurrency, and macroeconomic updates with exclusive insights.' : 'پوشش لحظه‌ای و اخبار فوری بازارهای مالی، کریپتوکارنسی و اقتصاد کلان با تحلیل‌های اختصاصی اکو آذرین'}
        </p>

        {/* Elegant Search Bar */}
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-green/40 to-brand-green/10 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative bg-ink-850 light:bg-white border border-ink-500 light:border-zinc-200 rounded-2xl flex items-center px-3 py-2.5 shadow-lg light:shadow-sm">
            <IconSearch size={22} className="text-zinc-500 ltr:ml-3 rtl:mr-3 shrink-0" />
            <input 
              value={q}
              onChange={(e) => { setQ(e.target.value); setCurrentPage(1); }}
              placeholder={isEn ? "Search news, reports..." : "جستجو در اخبار، تحلیل‌ها و گزارش‌ها..."}
              className="flex-1 bg-transparent border-none outline-none text-[15px] font-medium text-white light:text-zinc-800 placeholder:text-zinc-500 light:placeholder:text-zinc-400 px-2 h-10"
            />
            {q && (
              <button 
                onClick={() => { setQ(''); setCurrentPage(1); }} 
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-ink-800 light:bg-zinc-100 text-zinc-400 hover:text-white light:hover:text-zinc-900 transition-colors"
                aria-label="Clear search"
              >
                <IconClose size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="-mx-4 md:mx-0 mb-12 max-w-full overflow-hidden">
        <BigNewsCarousel />
      </div>

      {/* Filter and Content Area */}
      <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
        {/* Main Content (List/Grid) */}
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 border-b border-ink-500 light:border-zinc-200 pb-4">
            {/* Categories */}
            <div className="flex overflow-x-auto scrollbar-hide gap-2 w-full sm:w-auto pb-1 sm:pb-0">
              {categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => { setActiveCategory(c.id); setCurrentPage(1); }}
                  className={`px-4 py-2 rounded-xl text-[13px] font-bold whitespace-nowrap transition border ${
                    activeCategory === c.id 
                      ? 'bg-brand-green text-ink-900 border-brand-green shadow-md' 
                      : 'bg-ink-800 light:bg-zinc-50 border-ink-500 light:border-zinc-200 text-zinc-400 light:text-zinc-600 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 text-[13px] w-full sm:w-auto bg-ink-850 light:bg-zinc-100 border border-ink-500 light:border-zinc-200 rounded-xl px-3 py-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none outline-none text-zinc-300 light:text-zinc-700 font-medium py-1 w-full"
              >
                <option value="newest" className="bg-ink-900">جدیدترین</option>
                <option value="popular" className="bg-ink-900">پربازدیدترین</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 min-h-[400px]">
            {currentNews.length > 0 ? currentNews.map((n, i) => (
              <motion.a 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                key={n.id} 
                href="article.html" 
                className="block group bg-ink-850 light:bg-white border border-ink-500 light:border-zinc-200 rounded-2xl overflow-hidden hover:border-zinc-400 light:hover:border-zinc-400 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[16/9] w-full bg-ink-900 light:bg-zinc-100 overflow-hidden relative">
                  <img src={`https://picsum.photos/seed/${n.id + 100}/600/400`} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3">
                    <span className="label-peyda text-brand-green bg-ink-900/80 light:bg-white/90 backdrop-blur-md border border-brand-green/30 px-2.5 py-1 rounded-md text-[11px] font-bold shadow-lg">
                      {n.kicker}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-[14px] md:text-[15px] leading-relaxed group-hover:text-brand-green transition-colors text-white light:text-zinc-900 mb-4 line-clamp-2">
                    {n.title}
                  </h3>
                  <div className="text-[12px] text-zinc-400 light:text-zinc-500 flex items-center justify-between border-t border-ink-500/50 light:border-zinc-100 pt-4 mt-auto">
                    <div className="flex items-center gap-2.5 tabular-nums">
                      <span>{n.time}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-600/50"></span>
                      <span className="flex items-center gap-1.5 opacity-80"><span className="text-zinc-500">👁</span> {Math.round(n.views).toLocaleString('fa-IR')}</span>
                    </div>
                    <span className="text-brand-green opacity-0 group-hover:opacity-100 transition-opacity font-bold -translate-x-2 group-hover:translate-x-0 transform flex items-center gap-1">
                      ادامه <IconChevronLeft size={14} />
                    </span>
                  </div>
                </div>
              </motion.a>
            )) : (
              <div className="col-span-1 md:col-span-2 py-20 text-center text-zinc-500">
                موردی یافت نشد.
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mb-12 border-t border-ink-500 light:border-zinc-200 pt-8">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-ink-850 light:bg-white border border-ink-500 light:border-zinc-200 shadow-sm text-zinc-400 light:text-zinc-600 hover:text-white light:hover:text-zinc-900 hover:border-zinc-500 disabled:opacity-30 transition-all"
              >
                <IconChevronRight size={18} />
              </button>
              
              <div className="flex items-center gap-1.5">
                {Array.from({length: totalPages}, (_, i) => i+1).map(num => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`w-10 h-10 flex items-center justify-center rounded-2xl text-[14px] font-bold transition-all tabular-nums ${
                      currentPage === num 
                        ? 'bg-brand-green text-ink-900 shadow-lg shadow-brand-green/20 border border-brand-green'
                        : 'bg-ink-850 light:bg-white border border-ink-500 light:border-zinc-200 shadow-sm text-zinc-400 light:text-zinc-600 hover:text-white light:hover:text-zinc-900'
                    }`}
                  >
                    {num.toLocaleString('fa-IR')}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-ink-850 light:bg-white border border-ink-500 light:border-zinc-200 shadow-sm text-zinc-400 light:text-zinc-600 hover:text-white light:hover:text-zinc-900 hover:border-zinc-500 disabled:opacity-30 transition-all"
              >
                <IconChevronLeft size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Lists */}
        <div className="w-full md:w-[320px] shrink-0 sticky top-24 pb-8">
          <div className="bg-ink-850 light:bg-white border border-ink-500 light:border-zinc-200 rounded-2xl overflow-hidden shadow-lg p-5">
             <h3 className="text-brand-red font-bold text-[14px] mb-4 flex items-center gap-2 border-b border-ink-500 light:border-zinc-200 pb-3">
                🔥 پربحث‌ترین‌های هفته
             </h3>
             <ul className="grid gap-4">
                {(window.POPULAR_LIST?.slice(0, 5) || []).map((n, i) => (
                  <li key={i}>
                    <a href="article.html" className="group block">
                      <h4 className="text-[13px] text-zinc-200 light:text-zinc-800 leading-relaxed font-semibold group-hover:text-brand-red transition-colors line-clamp-2">
                        {n.title}
                      </h4>
                      <p className="text-[11px] text-zinc-500 light:text-zinc-500 mt-2 flex items-center gap-2 tabular-nums">
                        <span>{n.meta}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-600/50"></span>
                        <span className="flex items-center gap-1"><span className="text-zinc-400">👁</span> {n.views}</span>
                      </p>
                    </a>
                  </li>
                ))}
             </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <PageShell headerSlot={null}>
      <NewsContent />
    </PageShell>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

