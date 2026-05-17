// =====================================================================
// App — کامپوننت اصلی
// =====================================================================
const { useState: useStateMain } = React;
const { LiveTicker, Header, ThemeToggle, HeroCarousel, CategoryTabs, TabContent, BigNewsCarousel, Footer } = window;

function App() {
  const [activeTab, setActiveTab] = useStateMain('news');
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