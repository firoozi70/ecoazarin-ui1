import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { PageShell } from '../layouts/PageShell';
import { BigNewsCarousel, NewsLists } from '../components/home/News';
import { IconSearch, IconClose, IconChevronLeft, IconChevronRight } from '../components/ui/Icons';
import { motion } from 'motion/react';

function NewsContent() {
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
      <div className="mb-12 relative">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white light:text-zinc-900 text-center">
          جدیدترین <span className="text-brand-green">اخبار بازار</span>
        </h1>
        <p className="text-zinc-400 light:text-zinc-500 text-[14px] md:text-[15px] leading-7 max-w-2xl mx-auto text-center mb-8">
          پوشش لحظه‌ای و اخبار فوری بازارهای مالی، کریپتوکارنسی و اقتصاد کلان با تحلیل‌های اختصاصی اکو آذرین
        </p>

        {/* Elegant Search Bar */}
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-green to-brand-green/30 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative bg-ink-900 light:bg-white border border-ink-500 light:border-zinc-200 rounded-2xl flex items-center px-4 py-3 shadow-lg">
            <IconSearch size={22} className="text-brand-green ml-3 shrink-0" />
            <input 
              value={q}
              onChange={(e) => { setQ(e.target.value); setCurrentPage(1); }}
              placeholder="جستجو در اخبار، تحلیل‌ها و گزارش‌ها..." 
              className="flex-1 bg-transparent border-none outline-none text-[15px] font-medium text-white light:text-zinc-800 placeholder:text-zinc-600 light:placeholder:text-zinc-400"
            />
            {q && (
              <button 
                onClick={() => { setQ(''); setCurrentPage(1); }} 
                className="shrink-0 text-zinc-500 hover:text-white bg-ink-800 light:bg-zinc-100 p-1.5 rounded-lg transition"
              >
                <IconClose size={16} />
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
                className="block group bg-ink-850 light:bg-white border border-ink-500 light:border-zinc-200 rounded-2xl overflow-hidden hover:border-zinc-400"
              >
                <div className="flex items-center justify-between p-4 border-b border-ink-500/50 light:border-zinc-100">
                  <span className="label-peyda text-brand-green bg-brand-green/10 px-2 py-0.5 rounded text-[11px] font-bold">
                    {n.kicker}
                  </span>
                  <span className="text-[11px] text-zinc-500 tabular-nums">
                    {n.time}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[14px] md:text-[15px] leading-relaxed group-hover:text-brand-green transition-colors text-white light:text-zinc-900 mb-3">
                    {n.title}
                  </h3>
                  <div className="text-[12px] text-zinc-400 flex items-center justify-between mt-4">
                    <span className="flex items-center gap-1.5 opacity-80 tabular-nums"><span className="text-zinc-500">👁</span> {Math.round(n.views).toLocaleString('fa-IR')} بازدید</span>
                    <span className="text-brand-green opacity-0 group-hover:opacity-100 transition-opacity font-medium -translate-x-2 group-hover:translate-x-0 transform flex items-center gap-1">
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
            <div className="flex items-center justify-center gap-2 mb-12 border-t border-ink-500 light:border-zinc-200 pt-8">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-ink-850 light:bg-zinc-100 border border-ink-500 light:border-zinc-200 text-zinc-400 hover:text-white hover:bg-ink-700 disabled:opacity-30 transition"
              >
                <IconChevronRight size={18} />
              </button>
              
              <div className="flex items-center gap-1 ltr-num">
                {Array.from({length: totalPages}, (_, i) => i+1).map(num => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-[14px] font-bold transition-all ${
                      currentPage === num 
                        ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20'
                        : 'text-zinc-400 hover:text-white hover:bg-ink-800 light:hover:bg-zinc-100'
                    }`}
                  >
                    {num.toLocaleString('fa-IR')}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-ink-850 light:bg-zinc-100 border border-ink-500 light:border-zinc-200 text-zinc-400 hover:text-white hover:bg-ink-700 disabled:opacity-30 transition"
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
                      <p className="text-[11px] text-zinc-500 mt-2 font-mono flex items-center gap-2">
                        <span>{n.meta}</span>
                        <span>•</span>
                        <span>{n.views} 👁</span>
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

