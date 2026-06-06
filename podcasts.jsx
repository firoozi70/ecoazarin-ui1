// =====================================================================
// صفحه پادکست — Podcasts page
// =====================================================================

const { useState: usePS, useEffect: useEffectPS, useRef: useRefPS } = React;

// ---- کاور هنری انتزاعی برای هر پادکست ----
function PodcastArt({ seed = 'a', className = '' }) {
  // hash → orientation/colors deterministically
  const palettes = [
    ['#E63946', '#7a1923', '#0F0F10'],
    ['#10B981', '#064e3b', '#0F0F10'],
    ['#F59E0B', '#92400e', '#0F0F10'],
    ['#6366F1', '#3730a3', '#0F0F10'],
    ['#EF4444', '#991b1b', '#0F0F10'],
  ];
  let h = 0;
  for (const c of String(seed)) h = (h * 31 + c.charCodeAt(0)) | 0;
  const p = palettes[Math.abs(h) % palettes.length];
  const rot = (Math.abs(h) % 90) - 45;
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`g-${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p[0]} />
          <stop offset="100%" stopColor={p[1]} />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill={p[2]} />
      <rect width="200" height="200" fill={`url(#g-${seed})`} opacity="0.85" />
      <g transform={`rotate(${rot} 100 100)`}>
        <rect x="-30" y="60" width="260" height="20" fill="#000" opacity="0.18" />
        <rect x="-30" y="120" width="260" height="6" fill="#fff" opacity="0.12" />
      </g>
      <circle cx="100" cy="100" r="36" fill="rgba(0,0,0,0.35)" />
      <circle cx="100" cy="100" r="36" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="6" fill="#fff" />
      <path d="M94 88 v24 l20 -12 z" fill="#fff" />
    </svg>
  );
}

// ---- بخش هیرو پادکست ----
function PodcastHero() {
  const ep = window.PODCAST_EPISODES.find(e => e.featured) || window.PODCAST_EPISODES[0];
  const [playing, setPlaying] = usePS(false);
  const [progress, setProgress] = usePS(34);

  return (
    <section className="px-4 md:px-6 max-w-[1400px] mx-auto" aria-label="پادکست ویژه" data-screen-label="01 Featured">
      <div className="relative rounded-2xl overflow-hidden border border-ink-500 bg-ink-700/40">
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="absolute -end-20 -bottom-20 w-80 h-80 rounded-full orb-red opacity-50" />
        <div className="absolute top-6 start-1/3 w-32 h-32 rounded-full bg-white/10 blur-2xl" />

        <div className="relative grid md:grid-cols-12 gap-6 p-6 md:p-10">
          {/* artwork */}
          <div className="md:col-span-4 flex md:block">
            <div className="relative w-40 md:w-full aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/15">
              <PodcastArt seed="featured" className="w-full h-full" />
              {/* live dot */}
              <span className="absolute top-3 end-3 inline-flex items-center gap-1.5 bg-black/55 backdrop-blur rounded-full px-2 py-0.5 text-[10px] font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-softPulse" />
                NEW
              </span>
            </div>
          </div>

          {/* content */}
          <div className="md:col-span-8 flex flex-col justify-between text-end">
            <div>
              <div className="inline-flex items-center gap-2 bg-black/30 border border-white/15 rounded-full px-3 py-1 text-[11px] font-medium">
                <IconHeadphones size={12} />
                <span>قسمت ویژه این هفته</span>
                <span className="opacity-60">•</span>
                <span className="opacity-80">قسمت {ep.num}</span>
              </div>
              <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-[1.15] tracking-tight">
                {ep.show}
              </h1>
              <p className="mt-2 text-[14px] md:text-[15px] text-white/85 max-w-2xl leading-7">
                {ep.title}
              </p>
            </div>

            {/* player */}
            <div className="mt-6 bg-black/30 border border-white/15 rounded-xl p-4 backdrop-blur">
              <div className="flex items-center gap-4" dir="ltr">
                <button onClick={() => setPlaying(p => !p)} className="h-12 w-12 rounded-full bg-white text-brand-redDark flex items-center justify-center shadow-xl shadow-black/30 hover:scale-105 transition" aria-label={playing ? 'مکث' : 'پخش'}>
                  {playing
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
                    : <IconPlay size={16} />}
                </button>
                <div className="flex-1">
                  <div className="relative h-1.5 rounded-full bg-white/20 cursor-pointer" onClick={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    setProgress(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
                  }}>
                    <div className="absolute inset-y-0 start-0 rounded-full bg-white" style={{ width: `${progress}%` }} />
                    <div className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow" style={{ left: `calc(${progress}% - 6px)` }} />
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-white/80">
                    <span>{`${Math.floor(progress * 0.48 / 60).toString().padStart(2,'0')}:${Math.floor(progress * 0.48 % 60).toString().padStart(2,'0')}`}</span>
                    <span>{ep.duration}</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-white/80 flex-row-reverse">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1"><IconHeadphones size={12} /> {ep.plays} پخش</span>
                  <span className="inline-flex items-center gap-1"><IconClock size={12} /> {ep.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="hover:text-white opacity-80">⏮</button>
                  <button className="hover:text-white opacity-80">⏯</button>
                  <button className="hover:text-white opacity-80">⏭</button>
                  <button className="text-[10px] bg-white/10 border border-white/15 rounded-full px-2 py-0.5 hover:bg-white/20">1.0×</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- چیپ‌های فیلتر ----
function PodcastFilters({ active, onChange }) {
  const cats = window.PODCAST_CATEGORIES;
  return (
    <section className="px-4 md:px-6 max-w-[1400px] mx-auto" aria-label="فیلتر پادکست‌ها">
      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex flex-wrap gap-2">
          {cats.map(c => {
            const isActive = c.id === active;
            return (
              <button key={c.id} onClick={() => onChange(c.id)} aria-pressed={isActive}
                className={`shrink-0 inline-flex items-center gap-2 h-9 px-4 rounded-full text-[12px] font-medium border transition-all duration-200
                  ${isActive
                    ? 'bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/20'
                    : 'bg-ink-700/60 text-zinc-300 border-ink-500 hover:border-ink-400 hover:text-white'}`}>
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                {c.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ---- ردیف برنامه‌ها (shows) ----
function PodcastShows() {
  const shows = window.PODCAST_SHOWS;
  return (
    <section className="px-4 md:px-6 max-w-[1400px] mx-auto" aria-label="برنامه‌های پادکست">
      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="eyebrow-peyda text-brand-greenSoft">برنامه‌ها</div>
          <h2 className="mt-1 text-xl md:text-2xl font-bold">برنامه‌های اکوآذرین</h2>
        </div>
        <a href="#" className="text-[12px] text-zinc-300 hover:text-white inline-flex items-center gap-1">
          همه برنامه‌ها <IconArrowLeft size={14} />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {shows.map(s => (
          <article key={s.id} className="card-hover bg-ink-700/60 border border-ink-500 rounded-2xl p-4 flex flex-col">
            <div className={`relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br ${s.color} ring-1 ring-white/10`}>
              <PodcastArt seed={s.id} className="w-full h-full" />
              <span className="absolute top-2 end-2 label-peyda bg-black/55 backdrop-blur rounded-full px-2.5 py-0.5">{s.tag}</span>
            </div>
            <h3 className="mt-3 text-[14px] font-semibold leading-6 line-clamp-1">{s.title}</h3>
            <p className="mt-1 text-[11px] text-zinc-500 line-clamp-1">{s.host}</p>
            <div className="mt-3 pt-3 border-t border-ink-500 flex items-center justify-between text-[11px] text-zinc-400">
              <span className="ltr-num">{s.episodes} قسمت</span>
              <span className="inline-flex items-center gap-1 hover:text-white cursor-pointer">دنبال‌کردن <IconArrowLeft size={12} /></span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ---- لیست قسمت‌ها ----
function EpisodesList({ filter }) {
  const all = window.PODCAST_EPISODES;
  const list = filter === 'all' ? all : all.filter(e => e.tag === filter);
  const [playingId, setPlayingId] = usePS(null);

  return (
    <section className="px-4 md:px-6 max-w-[1400px] mx-auto" aria-label="قسمت‌ها">
      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="eyebrow-peyda text-brand-greenSoft">آرشیو قسمت‌ها</div>
          <h2 className="mt-1 text-xl md:text-2xl font-bold">آرشیو قسمت‌ها <span className="text-zinc-500 text-base font-normal ltr-num">({list.length})</span></h2>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[11px] text-zinc-400">
          مرتب‌سازی:
          <button className="bg-ink-700/60 border border-ink-500 rounded-lg px-3 py-1.5 hover:border-ink-400 transition">جدیدترین</button>
        </div>
      </div>

      <div className="bg-ink-700/30 border border-ink-500 rounded-2xl overflow-hidden divide-y divide-ink-500">
        {list.map((ep, i) => {
          const isPlaying = playingId === i;
          return (
            <article key={i} className={`group p-4 md:p-5 flex items-center gap-4 transition-colors ${isPlaying ? 'bg-ink-700/50' : 'hover:bg-ink-700/30'}`}>
              <button onClick={() => setPlayingId(isPlaying ? null : i)} className={`h-12 w-12 md:h-14 md:w-14 shrink-0 rounded-xl flex items-center justify-center transition-all
                ${isPlaying ? 'bg-brand-red text-white' : 'bg-ink-900 text-zinc-300 group-hover:bg-brand-red group-hover:text-white'}`} aria-label={isPlaying ? 'مکث' : 'پخش قسمت'}>
                {isPlaying
                  ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
                  : <IconPlay size={16} />}
              </button>

              <div className="hidden sm:block w-12 h-12 shrink-0 rounded-lg overflow-hidden ring-1 ring-ink-500">
                <PodcastArt seed={ep.show + ep.num} className="w-full h-full" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="label-peyda text-zinc-400 bg-ink-900 border border-ink-500 rounded-full px-2.5 py-0.5">{ep.tag}</span>
                  {ep.live && (
                    <span className="inline-flex items-center gap-1 label-peyda text-brand-redSoft bg-brand-red/10 border border-brand-red/30 rounded-full px-2 py-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-redSoft animate-softPulse" />
                      LIVE
                    </span>
                  )}
                  <span className="text-[11px] text-zinc-500 truncate">{ep.show} • قسمت {ep.num}</span>
                </div>
                <h4 className="mt-1.5 text-[14px] md:text-[15px] font-semibold leading-6 line-clamp-2">{ep.title}</h4>
                {isPlaying && (
                  <div className="mt-3 max-w-md">
                    <div className="relative h-1 rounded-full bg-ink-500 overflow-hidden">
                      <div className="absolute inset-y-0 end-0 start-1/3 bg-brand-red rounded-full" />
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                      <span>۱۶:۲۸</span>
                      <span>{ep.duration}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="hidden md:flex flex-col items-end gap-1 text-[11px] text-zinc-400 shrink-0 w-32">
                <span className="inline-flex items-center gap-1"><IconClock size={12} /> {ep.duration}</span>
                <span className="inline-flex items-center gap-1"><IconHeadphones size={12} /> <span className="ltr-num">{ep.plays}</span></span>
                <span className="text-zinc-500">{ep.date}</span>
              </div>

              <button className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-ink-700 transition" aria-label="بیشتر">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="6" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="18" r="1.5"/></svg>
              </button>
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center">
        <button className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-ink-700 border border-ink-500 hover:border-ink-400 text-[13px] text-zinc-200 transition">
          نمایش قسمت‌های بیشتر
          <IconArrowLeft size={14} />
        </button>
      </div>
    </section>
  );
}

// ---- میزبان‌ها ----
function PodcastHosts() {
  const hosts = window.PODCAST_HOSTS;
  return (
    <section className="px-4 md:px-6 max-w-[1400px] mx-auto" aria-label="میزبانان">
      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="eyebrow-peyda text-brand-greenSoft">مجریان</div>
          <h2 className="mt-1 text-xl md:text-2xl font-bold">صداهای آشنا</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {hosts.map((h, i) => (
          <article key={i} className="card-hover bg-ink-700/60 border border-ink-500 rounded-2xl p-4 flex items-center gap-3">
            <div className="relative w-14 h-14 shrink-0 rounded-full overflow-hidden ring-1 ring-ink-400 bg-gradient-to-br from-ink-600 to-ink-800 flex items-center justify-center">
              <span className="text-[18px] font-bold text-white/80">{h.name.split(' ').slice(-1)[0].slice(0,2)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[13px] font-semibold truncate">{h.name}</h4>
              <p className="text-[11px] text-zinc-500 truncate">{h.role}</p>
              <p className="mt-1 text-[10px] text-zinc-500 ltr-num font-mono">{h.shows} قسمت</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ---- پلتفرم‌ها ----
function PodcastSubscribe() {
  return (
    <section className="px-4 md:px-6 max-w-[1400px] mx-auto" aria-label="اشتراک">
      <div className="relative rounded-2xl overflow-hidden border border-ink-500 bg-gradient-to-br from-ink-700 to-ink-800 p-6 md:p-10">
        <div className="absolute -bottom-16 -start-10 w-72 h-72 rounded-full orb-green opacity-30" />
        <div className="absolute -top-16 -end-10 w-72 h-72 rounded-full orb-red opacity-30" />
        <div className="relative grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7">
            <div className="eyebrow-peyda text-brand-greenSoft">دنبال کن</div>
            <h2 className="mt-1 text-2xl md:text-3xl font-extrabold tracking-tight">پادکست اکوآذرین را در اپ موردعلاقه‌ات دنبال کن</h2>
            <p className="mt-2 text-[13px] text-zinc-400 max-w-xl leading-7">
              قسمت‌های جدید هر شنبه. در اسپاتیفای، اپل پادکست، کستباکس و RSS موجود است.
            </p>
          </div>
          <div className="md:col-span-5 grid grid-cols-2 gap-2">
            {window.PODCAST_PLATFORMS.map(p => (
              <a key={p.name} href="#" className="bg-ink-900/60 border border-ink-500 hover:border-ink-400 rounded-xl px-3 py-3 transition flex items-center gap-3">
                <span className="h-9 w-9 rounded-lg bg-ink-700 border border-ink-500 flex items-center justify-center shrink-0">
                  <IconHeadphones size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[12px] font-semibold truncate">{p.name}</span>
                  <span className="block text-[10px] text-zinc-500 font-mono truncate">{p.hint}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// App اصلی صفحه پادکست
// =====================================================================
function PodcastsPage() {
  const [filter, setFilter] = usePS('all');

  return (
    <div dir="rtl" lang="fa" className="min-h-screen bg-ink-900 text-white">
      <LiveTicker />
      <Header />

      {/* breadcrumb */}
      <div className="px-4 md:px-6 max-w-[1400px] mx-auto pt-5 pb-2">
        <nav className="flex items-center gap-2 text-[11px] text-zinc-500" aria-label="مسیر">
          <a href="hero.html" className="hover:text-white inline-flex items-center gap-1">
            <IconArrowLeft size={12} /> بازگشت به صفحه اصلی
          </a>
          <span className="opacity-50">/</span>
          <span className="text-zinc-300">پادکست‌ها</span>
        </nav>
      </div>

      <main className="pb-12">
        <div className="space-y-8 md:space-y-10 pt-2">
          <PodcastHero />
          <PodcastFilters active={filter} onChange={setFilter} />
          <EpisodesList filter={filter} />
          <PodcastShows />
          <PodcastHosts />
          <PodcastSubscribe />
        </div>
      </main>

      <Footer />
    </div>
  );
}

const podcastRoot = ReactDOM.createRoot(document.getElementById('root'));
podcastRoot.render(<PodcastsPage />);
