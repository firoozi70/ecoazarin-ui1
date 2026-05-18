import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { PageShell } from '../layouts/PageShell';
import { BigNewsCarousel, NewsGrid, NewsLists } from '../components/home/News';

function NewsContent() {
  const [q, setQ] = useState('');

  return (
    <section className="px-4 md:px-6 max-w-[1400px] mx-auto py-6" data-screen-label="News">
      {/* Search Header */}
      <div className="bg-ink-850 light:bg-white light:shadow-sm border border-ink-500 light:border-zinc-200 rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-[-50px] right-20 w-60 h-60 rounded-full orb-red opacity-20 pointer-events-none -z-10" />
        
        <div className="z-10">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 text-white light:text-zinc-900">
            جدیدترین اخبار بازار
          </h1>
          <p className="text-zinc-400 light:text-zinc-500 text-[13px] leading-7">
            پوشش لحظه‌ای و اخبار فوری بازارهای مالی، کریپتوکارنسی و اقتصاد کلان
          </p>
        </div>

        <div className="w-full md:w-auto relative z-10">
          <div className="bg-ink-900 light:bg-zinc-50 border border-ink-500 light:border-zinc-200 rounded-xl flex items-center px-3 py-2 w-full md:w-[320px]">
            <span className="text-zinc-400 light:text-zinc-400 opacity-60 ml-2">🔍</span>
            <input 
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="جستجو در اخبار..." 
              className="flex-1 bg-transparent border-none outline-none text-[13px] text-white light:text-zinc-800 placeholder:text-zinc-600 light:placeholder:text-zinc-400"
            />
            {q && (
              <button 
                onClick={() => setQ('')} 
                className="text-zinc-500 hover:text-white light:text-zinc-400 light:hover:text-zinc-800 text-[11px]"
              >
                پاک
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="-mx-4 md:mx-0 mb-8 max-w-full overflow-hidden">
        <BigNewsCarousel />
      </div>

      <div className="-mx-4 md:mx-0 mb-8 max-w-full overflow-hidden">
        <NewsGrid />
      </div>

      <div className="-mx-4 md:mx-0 max-w-full overflow-hidden">
        <NewsLists />
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
