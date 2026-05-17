const { useState, useEffect, useRef } = React;

// ---------- کاروسل خبری بزرگ ----------
const BigNewsCarousel = () => {
  const list = window.FEATURED_NEWS;
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % list.length), 5500);
    return () => clearInterval(t);
  }, [list.length]);
  const it = list[idx];
  return (
    <section
      className="px-4 md:px-6 max-w-[1400px] mx-auto"
      aria-label="مهم‌ترین خبر"
    >
      <div className="relative h-[260px] md:h-[380px] rounded-2xl overflow-hidden border border-ink-500 placeholder-stripe">
        {/* fake photo bg */}
        <div className="absolute inset-0 bg-black">
          <img
            src={`https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute right-8 top-8 w-32 h-32 rounded-full orb-red opacity-30" />
          <div className="absolute left-12 bottom-12 w-40 h-40 rounded-full orb-green opacity-20" />
        </div>

        {/* gradient overlay bottom */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/70 to-transparent" />

        <div className="relative h-full flex items-end p-5 md:p-10 z-10 pointer-events-none">
          <div
            key={idx}
            className="max-w-2xl animate-[fade-in_0.5s_ease-out] pointer-events-auto"
          >
            <span
              className={`inline-block label-peyda px-2.5 py-1 rounded-full ${it.tone === "red" ? "bg-brand-red/20 text-brand-redSoft border border-brand-red/30" : "bg-brand-green/20 text-brand-greenSoft border border-brand-green/30"}`}
            >
              {it.kicker}
            </span>
            <h3 className="mt-3 text-xl md:text-3xl font-bold leading-[1.4] line-clamp-3 text-pure-white drop-shadow">
              <a
                href="article.html"
                className="hover:text-zinc-200 transition-colors"
              >
                {it.title}
              </a>
            </h3>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-[11px] text-pure-white/80 font-mono">
                {it.meta}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <a
                href="article.html"
                className="text-[13px] text-pure-white inline-flex items-center gap-1 hover:gap-2 transition-all font-medium"
              >
                ادامه خبر <IconArrowLeft size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* dots */}
        <div className="absolute bottom-4 right-1/2 translate-x-1/2 flex gap-1.5 z-20">
          {list.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.preventDefault();
                setIdx(i);
              }}
              aria-label={`اسلاید ${i + 1}`}
              className={`h-1.5 p-0 outline-none cursor-pointer rounded-full transition-all ${i === idx ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/60"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- شبکه خبر ۳ ستونه ----------
const NewsGrid = () => {
  const items = window.NEWS_GRID;
  return (
    <section
      className="px-4 md:px-6 max-w-[1400px] mx-auto"
      aria-label="شبکه خبر"
    >
      <div className="overflow-x-auto scrollbar-hide -mx-4 md:mx-0 px-4 md:px-0">
        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 w-max md:w-auto pb-4 md:pb-0">
          {items.map((it, i) => {
            const mockupImgs = [
              "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1621504450181-5d356f157fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            ];
            return (
              <article
                key={i}
                className="group card-hover bg-ink-700/60 border border-ink-500 rounded-2xl overflow-hidden w-[280px] md:w-auto shrink-0 md:shrink flex flex-col"
              >
                <a
                  href="article.html"
                  className="relative h-[160px] md:h-[200px] bg-ink-800 overflow-hidden block"
                >
                  <img
                    src={mockupImgs[i % mockupImgs.length]}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                  />
                  <span className="absolute top-3 right-3 text-[11.5px] font-medium tracking-tight bg-black/60 backdrop-blur-sm border border-white/15 rounded-full px-2.5 py-1 text-white z-10">
                    {it.kicker}
                  </span>
                </a>
                <div className="p-4 md:p-5 flex flex-col flex-1">
                  <h4 className="text-[15px] md:text-[16px] font-semibold leading-[1.9] line-clamp-2 mb-4">
                    <a
                      href="article.html"
                      className="hover:text-white transition-colors"
                    >
                      {it.title}
                    </a>
                  </h4>
                  <div className="mt-auto pt-3 border-t border-ink-500 flex items-center justify-between text-[12px] text-zinc-400">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5">
                        <IconEye size={14} />{" "}
                        <span className="stat-num text-[13px] text-zinc-200 ltr-num">
                          {it.views}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <IconClock size={14} /> {it.time}
                      </span>
                    </div>
                    <a
                      href="article.html"
                      className="text-zinc-300 hover:text-white transition inline-flex items-center gap-1 font-medium group-hover:text-brand-green"
                    >
                      بیشتر <IconArrowLeft size={14} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ---------- لیست‌های خبری (جدیدترین/پربازدید/منتخب) ----------
const NewsLists = () => {
  const sections = [
    {
      id: "latest",
      title: "جدیدترین اخبار",
      badge: "تازه",
      items: window.LATEST_LIST,
    },
    {
      id: "popular",
      title: "پربازدیدترین‌ها",
      badge: "داغ",
      items: window.POPULAR_LIST,
    },
    {
      id: "editor",
      title: "منتخب سردبیر",
      badge: "پیشنهادی",
      items: window.EDITORS_LIST,
    },
  ];

  return (
    <div className="px-4 md:px-6 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {sections.map((sec) => (
        <section key={sec.id} aria-label={sec.title}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[15px] font-bold flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-brand-red" />
              {sec.title}
            </h3>
            <span className="label-peyda text-brand-greenSoft bg-brand-green/10 border border-brand-green/20 rounded-full px-2.5 py-0.5">
              {sec.badge}
            </span>
          </div>
          <ul className="bg-ink-700/40 border border-ink-500 rounded-2xl divide-y divide-ink-500">
            {sec.items.map((it, i) => {
              const thList = [
                "https://images.unsplash.com/photo-1590283603385-17ffb3a7fcc0?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&q=80",
                "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&q=80",
                "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&q=80",
                "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&q=80",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&q=80",
              ];
              const th = thList[i % thList.length];
              return (
                <li
                  key={i}
                  className="group flex items-start gap-3 p-3 transition-colors hover:bg-ink-700/60 light:hover:bg-zinc-50 cursor-pointer"
                >
                  <a
                    href="article.html"
                    className="w-16 h-16 shrink-0 rounded-xl border border-ink-500 bg-ink-800 overflow-hidden block"
                  >
                    <img
                      src={th}
                      alt=""
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </a>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[13px] font-medium leading-6 line-clamp-2">
                      <a
                        href="article.html"
                        className="hover:text-brand-green transition-colors"
                      >
                        {it.title}
                      </a>
                    </h4>
                    <div className="mt-2 flex items-center gap-3 text-[10px] text-zinc-500">
                      <span className="inline-flex items-center gap-1.5">
                        <IconEye size={12} />{" "}
                        <span className="stat-num text-[12px] text-zinc-300 ltr-num">
                          {it.views}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <IconClock size={11} /> {it.meta}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
};

Object.assign(window, { BigNewsCarousel, NewsGrid, NewsLists });
