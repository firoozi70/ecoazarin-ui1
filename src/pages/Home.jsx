import ReactDOM from 'react-dom/client';
import * as Recharts from 'recharts';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { motion, AnimatePresence } from 'motion/react';
import { LiveTicker, Header } from '../layouts/Header';
import { ThemeToggle } from '../components/home/Misc';
import { HeroCarousel } from '../components/home/Hero';
import { CategoryTabs, StickyTabs } from '../components/home/Tabs';
import { TabContent } from '../components/home/DynamicTab';
import { BigNewsCarousel, NewsGrid, NewsLists } from '../components/home/News';
import { Footer } from '../layouts/Footer';

// =====================================================================
// App — کامپوننت اصلی
// =====================================================================



function App() {
  const [activeTab, setActiveTab] = useState('news');
  const isNewsPage = (typeof window !== 'undefined' && window.PAGE_SLUG === 'news');

  return (
    <div dir="rtl" lang="fa" className="min-h-screen bg-ink-900 text-white">
      <LiveTicker />
      <Header rightSlot={<ThemeToggle />} />

      <main className="pb-12">
        <div className="space-y-8 md:space-y-10 pt-6">
          <HeroCarousel />
          {!isNewsPage && <CategoryTabs activeId={activeTab} onChange={setActiveTab} />}
          {!isNewsPage && <TabContent tabId={activeTab} />}
          <BigNewsCarousel />
          <NewsGrid />
          <NewsLists />
        </div>
      </main>

      {!isNewsPage && <StickyTabs activeId={activeTab} onChange={setActiveTab} />}
      <Footer />
    </div>);

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
