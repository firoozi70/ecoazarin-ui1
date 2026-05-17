// =====================================================================
// page-shell.jsx — shared chrome wrapper (Ticker, Header, Footer)
// Each new page calls <PageShell slug="journal">{content}</PageShell>
// =====================================================================
const { LiveTicker, Header, ThemeToggle, Footer } = window;

const PageShell = ({ slug, children }) => {
  if (slug && typeof window !== 'undefined') window.PAGE_SLUG = slug;
  return (
    <div dir="rtl" lang="fa" className="min-h-screen bg-ink-900 text-white">
      <LiveTicker />
      <Header rightSlot={<ThemeToggle />} />
      <main className="pb-12 pt-6">{children}</main>
      <Footer />
    </div>
  );
};
window.PageShell = PageShell;
