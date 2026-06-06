const { useState, useEffect, useRef } = React;

// ---------- آموزش — دسته‌های موضوعی + گرید دوره‌ها ----------
const EDU_TOPICS = ['فارکس', 'بورس', 'کریپتو', 'طلا و سکه', 'پرتفوی', 'تحلیل تکنیکال', 'تحلیل بنیادی', 'مدیریت ریسک', 'اقتصاد کلان', 'صندوق‌ها', 'مشتقه', 'ETF', 'فین‌تک', 'بانکداری', 'مالی شخصی', 'بیمه'];

const EDU_COURSES = [
{ title: 'اصول معامله‌گری در بازار فارکس', instructor: 'فرشید شیرافکن', hours: 20, price: '۱۹۶٬۰۰۰', oldPrice: '۹۸۰٬۰۰۰', discount: '۸۰٪', badge: 'شگفتی', code: 'FX101' },
{ title: 'ابزار تحلیل تکنیکال — اکسل پیشرفته', instructor: 'آرمان ری بد', hours: 13, price: '۹۸٬۰۰۰', oldPrice: '۲۷۰٬۰۰۰', discount: null, badge: 'شگفتی', code: 'TA200' },
{ title: 'ICDL مهارت‌های هفت‌گانه برای تحلیلگر مالی', instructor: 'امیررضا نیک‌خواه', hours: 14, price: '۹۸٬۰۰۰', oldPrice: '۱۴۸٬۰۰۰', discount: null, badge: 'شگفتی', code: 'ICDL' },
{ title: 'برنامه‌نویسی پایتون برای بازار سرمایه — مقدماتی', instructor: 'پژمان اقبالی شمس‌آبادی', hours: 22, price: '۱۷۸٬۰۰۰', oldPrice: '۸۹۰٬۰۰۰', discount: '۸۰٪', badge: null, code: 'PY100' }];

const EDU_LATEST = [
{ title: 'طراحی مدار سرمایه‌گذاری با آلتیوم — کارگاه عملی', instructor: 'سید پدرام محسنی', hours: 7, price: '۱٬۹۹۰٬۰۰۰', code: 'WS01' },
{ title: 'مدیریت کیفیت پروژه بر اساس ایزو ۱۰۰۰۶', instructor: 'آرزو صبری', hours: 3, price: '۱٬۱۹۰٬۰۰۰', code: 'ISO' },
{ title: 'زبان انگلیسی تخصصی مالی — فصل ۱۱ و ۱۲', instructor: 'میلاد جلالی', hours: 4, price: '۱٬۲۹۰٬۰۰۰', code: 'EN12' },
{ title: 'تصمیم‌گیری در شرایط عدم قطعیت', instructor: 'غلامرضا بداقی', hours: 2, price: '۹۸۰٬۰۰۰', code: 'DEC' }];

const EDU_FILTERS = ['همه', 'برنامه‌نویسی', 'هوش مصنوعی', 'یادگیری ماشین', 'بورس و بازار مالی', 'طراحی گرافیکی', 'زبان', 'علوم ریاضی'];

const CourseCard = ({ c, withDiscount }) =>
<article className="card-hover bg-ink-800/60 border border-ink-500 rounded-2xl overflow-hidden hover:border-ink-400">
    <div className="relative aspect-[4/3] bg-gradient-to-br from-ink-700 to-ink-800 flex items-center justify-center placeholder-stripe">
      <div className="relative text-zinc-300 font-mono text-[12.5px] font-bold tracking-wider">{c.code}</div>
      <button className="absolute top-2 start-2 h-7 w-7 rounded-md bg-ink-900/80 border border-ink-500 flex items-center justify-center text-zinc-300 hover:text-brand-red transition" aria-label="نشان">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 4h12v18l-6-4-6 4z" /></svg>
      </button>
      {withDiscount && c.discount &&
    <span className="stat-num absolute bottom-0 end-0 bg-brand-red text-pure-white text-[12px] font-bold px-2.5 py-1 rounded-tl-md">{c.discount}</span>
    }
      {withDiscount && c.badge &&
    <span className="absolute bottom-2 start-2 bg-brand-red text-pure-white text-[11px] font-bold px-2 py-0.5 rounded-md">{c.badge}</span>
    }
    </div>
    <div className="p-3">
      <h4 className="text-[14px] font-bold leading-7 line-clamp-2 min-h-[56px]">{c.title}</h4>
      <div className="mt-2.5 space-y-1.5 text-[12.5px] text-zinc-400">
        <div className="flex items-center gap-1.5"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="3" /><path d="M5 20a7 7 0 0 1 14 0" /></svg> {c.instructor}</div>
        <div className="flex items-center gap-1.5"><IconClock size={13} /> <span className="stat-num ltr-num">{c.hours}</span> ساعت</div>
      </div>
      <div className="mt-2.5 pt-2.5 border-t border-ink-500 flex items-center justify-end gap-2">
        {c.oldPrice && <span className="text-[11.5px] text-zinc-500 line-through stat-num ltr-num">{c.oldPrice}</span>}
        <span className="stat-num text-[15px] font-bold ltr-num">{c.price} <span className="text-[11px] font-medium text-zinc-400">تومان</span></span>
      </div>
    </div>
  </article>;


const EduTab = () => {
  const [topicIdx, setTopicIdx] = useState(0);
  const [filter1, setFilter1] = useState(0);
  const [filter2, setFilter2] = useState(0);
  return (
    <section key="edu-section" className="px-4 md:px-6 max-w-[1400px] mx-auto tab-anim" aria-label="آموزش">
      <div className="bg-ink-700/40 border border-ink-500 rounded-2xl p-5 md:p-8 tab-anim-card">
        <SectionBanner tabId="edu" />

        <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
          <div>
            <div className="eyebrow-peyda text-brand-greenSoft">مدرسه اکوآذرین</div>
            <h3 className="mt-1 text-xl md:text-2xl font-bold tracking-tight">یاد بگیر، سپس سرمایه‌گذاری کن</h3>
            <p className="mt-1 text-[13px] text-zinc-400 max-w-xl leading-7">دوره‌های ساختاریافته از مفاهیم پایه تا تحلیل تکنیکال پیشرفته.</p>
          </div>
        </div>

        {/* topic chips grid */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
          {EDU_TOPICS.slice(0, 16).map((t, i) =>
          <button key={t} onClick={() => setTopicIdx(i)}
          className="flex flex-col items-center gap-2 group transition focus:outline-none">
              <div className={`w-full aspect-square rounded-2xl flex items-center justify-center border transition-all duration-300 ease-out
                ${topicIdx === i ?
            'bg-gradient-to-br from-brand-red to-brand-redDark border-brand-red text-white shadow-[0_10px_24px_-10px_rgba(230,57,70,0.7)] scale-[1.04]' :
            'bg-ink-800/60 border-ink-500 text-zinc-400 group-hover:text-white group-hover:border-ink-400 group-hover:-translate-y-0.5'}`}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="9" r="3.5" /><path d="M5 21a7 7 0 0 1 14 0" />
                </svg>
              </div>
              <span className={`text-[12.5px] md:text-[13px] font-semibold transition-colors ${topicIdx === i ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>{t}</span>
            </button>
          )}
        </div>

        {/* row 1 — popular */}
        <div className="mt-10">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <h3 className="text-[15px] md:text-[17px] font-bold flex items-center gap-2"><span className="w-1 h-5 rounded bg-brand-red" /> آموزش‌های پرمخاطب</h3>
            <div className="flex items-center gap-1 bg-ink-800/70 border border-ink-500 rounded-full p-1 overflow-x-auto scrollbar-hide max-w-full backdrop-blur">
              {EDU_FILTERS.map((f, i) =>
              <button key={f} onClick={() => setFilter1(i)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200 ${
              filter1 === i ?
              'bg-gradient-to-br from-brand-red to-brand-redDark text-white shadow-[0_4px_14px_-4px_rgba(230,57,70,0.6)]' :
              'text-zinc-400 hover:text-white hover:bg-ink-700/60'}`
              }>{f}</button>
              )}
              <a href="#" className="shrink-0 text-[11px] text-brand-redSoft px-2 hover:text-brand-red transition">دیدن همه ‹</a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {EDU_COURSES.map((c, i) => <CourseCard key={i} c={c} withDiscount />)}
          </div>
        </div>

        {/* row 2 — latest */}
        <div className="mt-10">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <h3 className="text-[15px] md:text-[17px] font-bold flex items-center gap-2"><span className="w-1 h-5 rounded bg-brand-red" /> جدیدترین آموزش‌ها</h3>
            <div className="flex items-center gap-1 bg-ink-800/70 border border-ink-500 rounded-full p-1 overflow-x-auto scrollbar-hide max-w-full backdrop-blur">
              {EDU_FILTERS.map((f, i) =>
              <button key={f} onClick={() => setFilter2(i)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200 ${
              filter2 === i ?
              'bg-gradient-to-br from-brand-red to-brand-redDark text-white shadow-[0_4px_14px_-4px_rgba(230,57,70,0.6)]' :
              'text-zinc-400 hover:text-white hover:bg-ink-700/60'}`
              }>{f}</button>
              )}
              <a href="#" className="shrink-0 text-[11px] text-brand-redSoft px-2 hover:text-brand-red transition">دیدن همه ‹</a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {EDU_LATEST.map((c, i) => <CourseCard key={i} c={c} />)}
          </div>
        </div>
      </div>
    </section>);

};

// ---------- مقالات — کاروسل + گرید + لیست‌ها ----------
const ARTICLE_BULLETS = [
'تحلیل عمیق سیاست ارزی بانک مرکزی در فصل پیش رو',
'پنج خطای رایج تازه‌واردان بازار سرمایه و راهکار اجتناب',
'چگونه پرتفوی متناسب با ریسک شخصی بسازیم؟',
'صنعت پتروشیمی ایران در گذرگاه قیمت‌گذاری دستوری',
'بررسی صورت‌های مالی شرکت‌های بزرگ بورسی',
'فین‌تک ایرانی در سال جدید — فرصت‌ها و چالش‌ها'];

const ARTICLE_FEATURED_CARDS = [
{ title: 'تیتر مقاله مورد نظر، تیتر مقاله اصلی مورد نظر اکوآذرین', views: 450, time: '۲ روز قبل' },
{ title: 'متن مورد نظر خبر متن مورد نظر خبر متن مورد نظر خبر', views: 450, time: '۲ روز قبل' },
{ title: 'متن مورد نظر خبر متن مورد نظر خبر متن مورد نظر خبر', views: 450, time: '۲ روز قبل' },
{ title: 'متن مورد نظر خبر متن مورد نظر خبر متن مورد نظر خبر', views: 450, time: '۲ روز قبل' }];

const ARTICLE_LIST_ITEM = { title: 'متن مورد نظر خبر متن مورد نظر خبر متن مورد نظر خبر', meta: '۲ روز قبل', views: '۴۵۰' };
const _list8 = Array.from({ length: 8 }, () => ARTICLE_LIST_ITEM);

// Sub-components for ArticlesTab
const ArticleCarousel = () => {
  const slides = [
  { kicker: 'تحلیل بازار', title: 'مسیر دلار در فصل پیش‌رو', tone: 'red' },
  { kicker: 'پرونده ویژه', title: 'بورس تهران؛ بازگشت یا اصلاح؟', tone: 'green' },
  { kicker: 'گفت‌وگو', title: 'اقتصاددان مهمان درباره تورم', tone: 'red' },
  { kicker: 'پژوهش', title: 'صنعت پتروشیمی در ۱۴۰۵', tone: 'green' },
  { kicker: 'بین‌الملل', title: 'فدرال رزرو و موج بعدی نرخ بهره', tone: 'red' },
  { kicker: 'فناوری', title: 'فین‌تک ایرانی در سال جدید', tone: 'green' },
  { kicker: 'انرژی', title: 'گاز ایران؛ مازاد یا کسری؟', tone: 'red' }];

  const [idx, setIdx] = useState(2);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [slides.length]);
  const s = slides[idx];
  return (
    <div className="relative bg-ink-800 border border-ink-500 rounded-xl overflow-hidden order-2 md:order-2 min-h-[260px] md:min-h-[300px]">
      <div className={`absolute inset-0 ${s.tone === 'red' ? 'bg-gradient-to-br from-brand-redDark/35 via-ink-800 to-ink-900' : 'bg-gradient-to-br from-emerald-900/35 via-ink-800 to-ink-900'} transition-all duration-700`} />
      <div className="absolute inset-0 dotted-bg opacity-40" />
      <div className="absolute -end-10 -top-10 w-40 h-40 rounded-full orb-red opacity-40" />
      <div className="absolute -start-12 -bottom-12 w-44 h-44 rounded-full orb-green opacity-30" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
      <div className="relative h-full flex flex-col justify-end p-5 md:p-7">
        <span className={`inline-flex items-center gap-1 self-start label-peyda px-2.5 py-1 rounded-full mb-3 ${s.tone === 'red' ? 'bg-brand-red/20 text-brand-redSoft border border-brand-red/30' : 'bg-brand-green/20 text-brand-greenSoft border border-brand-green/30'}`}>
          {s.kicker}
        </span>
        <h4 className="text-lg md:text-xl font-bold leading-[1.6] line-clamp-2 text-pure-white max-w-md">{s.title}</h4>
        <div className="mt-4 flex items-center gap-1.5">
          {slides.map((_, i) =>
          <button key={i} onClick={() => setIdx(i)} aria-label={`اسلاید ${i + 1}`}
          className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'}`} />
          )}
        </div>
      </div>
    </div>);

};

const ArticlesTab = () => {
  return (
    <section key="articles-section" className="px-4 md:px-6 max-w-[1400px] mx-auto tab-anim" aria-label="مقالات">
      <div className="bg-ink-700/40 border border-ink-500 rounded-2xl p-5 md:p-8 tab-anim-card">
        <SectionBanner tabId="articles" />

        <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
          <div>
            <div className="eyebrow-peyda text-brand-greenSoft">مقالات تحلیلی</div>
            <h3 className="mt-1 text-xl md:text-2xl font-bold tracking-tight">عمیق‌تر از تیتر روزنامه</h3>
            <p className="mt-1 text-[13px] text-zinc-400 max-w-xl leading-7">مقالات بلندِ تحلیلی از تیم پژوهش و کارشناسان مهمان.</p>
          </div>
          <a href="#" className="text-[12px] text-zinc-300 hover:text-white inline-flex items-center gap-1 group">
            مشاهده همه
            <IconArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* carousel + bullets */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {/* bullets — RIGHT in RTL */}
          <div className="bg-ink-800/60 border border-ink-500 rounded-xl p-5 order-1 md:order-1 relative overflow-hidden">
            <h4 className="text-[13px] font-bold mb-4 flex items-center gap-2"><span className="w-1 h-4 rounded bg-brand-red" /> سرتیترهای پژوهشی</h4>
            <ul className="space-y-1">
              {ARTICLE_BULLETS.map((b, i) =>
              <li key={i} className="group flex items-center gap-3 text-[13px] text-zinc-300 leading-7 py-1.5 px-2 -mx-2 rounded-lg hover:bg-ink-700/40 hover:text-white transition cursor-pointer">
                  <span className="num-display text-[10px] font-bold text-brand-red w-5 shrink-0 ltr-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="line-clamp-1 flex-1">{b}</span>
                  <IconArrowLeft size={12} className="text-zinc-500 group-hover:text-brand-red group-hover:-translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </li>
              )}
            </ul>
          </div>
          {/* image carousel — LEFT in RTL */}
          <ArticleCarousel />
        </div>

        {/* featured 4 cards */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {ARTICLE_FEATURED_CARDS.map((c, i) =>
          <article key={i} className="card-hover bg-ink-800/60 border border-ink-500 rounded-xl overflow-hidden hover:border-ink-400">
              <div className="relative aspect-[4/3] bg-ink-700 overflow-hidden">
                <div className="absolute inset-0 placeholder-stripe opacity-90" />
                <div className="absolute inset-0 dotted-bg opacity-30" />
                <span className="absolute top-2 end-2 label-peyda bg-black/60 backdrop-blur-sm border border-white/15 rounded-full px-2.5 py-0.5 text-white">مقاله</span>
              </div>
              <div className="p-3">
                <h4 className="text-[13px] font-bold leading-6 line-clamp-2 min-h-[48px]">{c.title}</h4>
                <div className="mt-2 pt-2 border-t border-ink-500 flex items-center justify-end gap-3 text-[11px] text-zinc-500">
                  <span className="inline-flex items-center gap-1"><IconEye size={12} /> <span className="ltr-num tabular-nums">{c.views}</span></span>
                  <span className="inline-flex items-center gap-1"><IconClock size={12} /> {c.time}</span>
                </div>
              </div>
            </article>
          )}
        </div>

        {/* three lists */}
        {[
        { title: 'جدیدترین‌ها', accent: 'bg-brand-red' },
        { title: 'پربازدیدترین‌ها', accent: 'bg-brand-green' },
        { title: 'منتخب سردبیر', accent: 'bg-brand-red' }].
        map((sec) =>
        <div key={sec.title} className="mt-8">
            <h3 className="text-[14px] font-bold mb-3 flex items-center gap-2"><span className={`w-1 h-5 rounded ${sec.accent}`} /> {sec.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3">
              {_list8.map((it, i) =>
            <div key={i} className="card-hover flex items-center gap-2.5 bg-ink-800/60 border border-ink-500 rounded-lg p-2 hover:border-ink-400 hover:bg-ink-800/80 cursor-pointer">
                  <div className="w-12 h-12 shrink-0 rounded-md placeholder-stripe border border-ink-500 overflow-hidden" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium leading-5 line-clamp-2">{it.title}</p>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-zinc-500">
                      <span className="inline-flex items-center gap-1"><IconClock size={10} /> {it.meta}</span>
                      <span className="inline-flex items-center gap-1"><IconEye size={10} /> <span className="ltr-num tabular-nums">{it.views}</span></span>
                    </div>
                  </div>
                </div>
            )}
            </div>
          </div>
        )}
      </div>
    </section>);

};


Object.assign(window, { EduTab, ArticlesTab });
