const { useState, useEffect, useRef } = React;

// ---------- بنر هیرو (پادکست) — کاروسل ----------
const HeroCarousel = () => {
  const slides = window.HERO_SLIDES;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const s = slides[idx];

  return (
    <section
      className="relative px-4 md:px-6 max-w-[1400px] mx-auto"
      aria-label="پادکست ویژه"
      data-screen-label="01 Hero Podcast"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[280px] md:h-[340px] rounded-2xl overflow-hidden hero-gradient">
        {/* big white circle behind faces */}
        <div
          className="absolute -left-10 md:left-12 top-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full bg-white/95"
          aria-hidden="true"
        />
        <div
          className="absolute -right-20 -bottom-20 w-[260px] h-[260px] rounded-full orb-red opacity-60"
          aria-hidden="true"
        />
        <div
          className="absolute top-6 left-1/3 w-[120px] h-[120px] rounded-full bg-white/10 blur-2xl"
          aria-hidden="true"
        />

        {/* podcast duo (visually on the LEFT in RTL = end side) */}
        <div className="absolute bottom-0 -left-10 md:left-8 h-full w-[70%] md:w-[45%] flex items-end justify-start pointer-events-none opacity-30 md:opacity-100">
          <PodcastDuo className="h-full w-auto max-w-none" />
        </div>

        {/* text — right side in RTL */}
        <div className="relative h-full flex items-center z-10 pointer-events-none">
          <div
            key={idx}
            className="px-5 md:px-12 max-w-[100%] md:max-w-[55%] mr-0 ml-auto text-right animate-[fade-in_0.5s_ease-out] pointer-events-auto"
          >
            <div className="inline-flex items-center gap-2 bg-black/25 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1 text-[10px] md:text-[11px] font-medium">
              <IconHeadphones size={12} />
              <span>{s.badge}</span>
              <span className="opacity-60">•</span>
              <span className="opacity-80">{s.episode}</span>
            </div>
            <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-[1.15] tracking-tight text-pure-white drop-shadow-md">
              {s.title}
            </h1>
            <p className="mt-2 text-[12px] md:text-sm text-pure-white/80 line-clamp-2 max-w-md">
              {s.desc}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="podcasts.html"
                className="inline-flex items-center gap-2 h-10 md:h-11 px-5 rounded-xl bg-white text-brand-redDark text-[13px] md:text-sm font-semibold shadow-lg shadow-black/20 hover:shadow-black/40 transition hover:scale-105"
              >
                <IconPlay size={14} />
                {s.cta}
              </a>
              <span className="hidden md:inline text-[11px] text-white/70 font-mono">
                {s.duration}
              </span>
            </div>
          </div>
        </div>

        {/* nav arrows — desktop */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIdx((i) => (i - 1 + slides.length) % slides.length);
          }}
          className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur transition z-30 cursor-pointer"
          aria-label="اسلاید قبلی"
        >
          <IconChevronLeft size={18} />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIdx((i) => (i + 1) % slides.length);
          }}
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur transition z-30 cursor-pointer"
          aria-label="اسلاید بعدی"
        >
          <IconChevronRight size={18} />
        </button>

        {/* dots */}
        <div
          className="absolute bottom-4 right-6 md:right-12 flex gap-1.5 z-30"
          role="tablist"
          aria-label="انتخاب اسلاید"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.preventDefault();
                setIdx(i);
              }}
              aria-label={`اسلاید ${i + 1}`}
              aria-selected={i === idx}
              className={`h-1.5 p-0 outline-none cursor-pointer rounded-full transition-all ${i === idx ? "w-6 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70 shadow-sm"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { HeroCarousel });
