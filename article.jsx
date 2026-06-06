const { useState, useEffect } = React;
const {
  PageShell,
  IconEye,
  IconClock,
  IconShare2,
  IconBookmark,
  IconChevronLeft,
  IconChevronRight,
  IconArrowLeft,
} = window;

function ArticleApp() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showGoTop, setShowGoTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = `${(totalScroll / windowHeight) * 100}`;
      setScrollProgress(Number(scroll));

      if (totalScroll > 300) {
        setShowGoTop(true);
      } else {
        setShowGoTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const article = {
    title: "مفهوم سود مرکب چیست و چرا نباید آن را نادیده گرفت؟",
    kicker: "مدیریت سرمایه",
    date: "۱۲ بهمن ۱۴۰۲",
    views: "18,400",
    timeToRead: "۵ دقیقه مطالعه",
    commentsCount: "۰ دیدگاه",
    author: "روا ژورنال",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  };

  return (
    <>
      <div
        className={`fixed top-0 start-0 end-0 h-1 z-[9999] pointer-events-none transition-opacity duration-300 ${scrollProgress > 2 ? "opacity-100" : "opacity-0"}`}
      >
        <div
          className="h-full bg-brand-green transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 mt-6 md:mt-10 pb-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Sidebar (Left side on Desktop) */}
          <aside className="lg:col-span-4 order-2 lg:sticky lg:top-[110px] space-y-8">
            {/* Table of Contents */}
            <div className="bg-ink-800/80 light:bg-zinc-50 border border-ink-500 light:border-zinc-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-white light:text-zinc-900 border-b border-ink-500 light:border-zinc-200 pb-3">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
                <h3 className="font-bold text-[14px]">فهرست مطالب</h3>
              </div>
              <ul className="space-y-3 text-[13px] text-zinc-400 light:text-zinc-600 font-medium">
                <li>
                  <a
                    href="#intro"
                    className="block hover:text-brand-green transition-colors text-white light:text-zinc-900 font-bold border-e-2 border-brand-green pe-2"
                  >
                    سود مرکب چیست؟
                  </a>
                </li>
                <li>
                  <a
                    href="#intro-2"
                    className="block hover:text-brand-green transition-colors pe-2"
                  >
                    مقدمه
                  </a>
                </li>
                <li>
                  <a
                    href="#why"
                    className="block hover:text-brand-green transition-colors pe-2"
                  >
                    چگونه سود روی سود می‌آید؟
                  </a>
                </li>
                <li>
                  <a
                    href="#comparison"
                    className="block hover:text-brand-green transition-colors pe-2"
                  >
                    مقایسه سود ساده و مرکب
                  </a>
                </li>
                <li>
                  <a
                    href="#conclusion"
                    className="block hover:text-brand-green transition-colors pe-2"
                  >
                    جمع‌بندی
                  </a>
                </li>
              </ul>
            </div>

            {/* VIP Banner */}
            <div className="relative rounded-2xl overflow-hidden border border-brand-red/30 bg-ink-900 light:bg-[#fef2f2] p-6 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
              <div className="absolute top-0 end-0 w-32 h-32 bg-brand-red/10 blur-[40px] rounded-full"></div>
              <div className="absolute bottom-0 start-0 w-24 h-24 bg-brand-red/10 blur-[30px] rounded-full"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="bg-brand-red text-white text-[11px] font-bold px-3 py-1 rounded-full mb-4 shadow-sm inline-block tracking-wide">
                  تخفیف ویژه
                </span>
                <h3 className="text-lg font-extrabold text-white light:text-zinc-900 mb-2 title-font">
                  اشتراک طلایی اکو آذرین
                </h3>
                <p className="text-[13px] text-zinc-400 light:text-zinc-600 mb-6 leading-relaxed">
                  دسترسی نامحدود به تمامی تحلیل‌های ویژه، سبدهای پیشنهادی و
                  سیگنال‌های اختصاصی.
                </p>
                <a
                  href="#"
                  className="w-full h-11 bg-brand-red hover:bg-brand-red/90 text-white flex items-center justify-center rounded-xl font-bold text-[14px] transition-colors shadow-[0_4px_12px_rgba(239,68,68,0.25)]"
                >
                  جزئیات و خرید اشتراک VIP
                </a>
              </div>
            </div>

            {/* Latest News inside sidebar */}
            <div className="bg-ink-800/50 light:bg-zinc-50 border border-ink-500 light:border-zinc-200 rounded-2xl p-6 hidden lg:block shadow-sm">
              <h3 className="text-[15px] font-bold text-white light:text-zinc-900 mb-6 border-e-2 border-brand-red pe-3">
                آخرین اخبار و مقالات
              </h3>
              <ul className="space-y-4">
                {[
                  "تله دردادون روزانه پراپ فاند؛ نجات حساب با یک کلیک!",
                  "اکسپرت پراپ فاند: رعایت خودکار قوانین مدیریت ریسک",
                  "چرا مدیریت سرمایه بدون تحلیل رفتار معامله‌گر ناقص است؟",
                  "معرفی اکسپرت ژورنال هوشمند روا:مدیریت ریسک",
                ].map((title, i) => (
                  <li
                    key={i}
                    className="group border-b border-ink-500/50 light:border-zinc-200 pb-4 last:border-0 last:pb-0"
                  >
                    <a href="#" className="flex flex-col gap-2">
                      <span className="text-[13px] font-medium leading-[1.8] text-zinc-300 light:text-zinc-700 group-hover:text-brand-green transition-colors line-clamp-2 title-font">
                        {title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Article Content (Right side on Desktop) */}
          <article className="lg:col-span-8 order-1">
            {/* Breadcrumb */}
            <nav className="flex flex-wrap items-center gap-2 text-[12px] text-zinc-500 light:text-zinc-500 mb-6 w-full">
              <a
                href="/"
                className="hover:text-white light:hover:text-black transition-colors"
              >
                خانه
              </a>
              <IconChevronLeft size={14} />
              <a
                href="/"
                className="hover:text-white light:hover:text-black transition-colors"
              >
                وبلاگ
              </a>
              <IconChevronLeft size={14} />
              <span className="text-zinc-300 light:text-zinc-800 truncate min-w-0 flex-1">
                {article.title}
              </span>
            </nav>

            <header className="mb-8">
              <div className="relative rounded-2xl overflow-hidden mb-8 border border-ink-500 light:border-zinc-200 bg-ink-800 aspect-video md:aspect-[21/9]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-[32px] font-extrabold leading-[1.6] text-white light:text-zinc-900 tracking-tight title-font">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 py-6 text-[12.5px] font-medium text-zinc-400 light:text-zinc-500 mb-6 border-b border-ink-500 light:border-zinc-200">
                <div className="flex items-center gap-1.5 flex-1 md:flex-none">
                  <IconEye size={16} className="text-brand-green" />
                  <span className="text-zinc-300 light:text-zinc-700 ltr-num font-mono">
                    {article.author}
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-ink-500 light:bg-zinc-300 hidden sm:block" />
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-300 light:text-zinc-700">
                    {article.date}
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-ink-500 light:bg-zinc-300 hidden sm:block" />
                <div className="flex items-center gap-1.5">
                  <span className="text-brand-green px-1.5 py-0.5 rounded bg-brand-green/10">
                    {article.timeToRead}
                  </span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-ink-500 light:bg-zinc-300 hidden sm:block" />
                <div className="flex items-center gap-1.5 text-zinc-400">
                  {article.commentsCount}
                </div>
              </div>
            </header>

            <div className="prose prose-invert prose-lg max-w-none prose-p:leading-[2.2] prose-p:text-zinc-300 light:prose-p:text-zinc-700 prose-p:text-[15px] md:prose-p:text-[16px] prose-a:text-brand-green prose-h2:text-white light:prose-h2:text-zinc-900 prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-10 prose-h2:font-extrabold prose-h3:text-xl prose-h3:text-white light:prose-h3:text-zinc-900 prose-h3:font-bold prose-ul:text-zinc-300 light:prose-ul:text-zinc-700 prose-ul:leading-loose">
              <h2 id="intro" className="title-font">
                سود مرکب چیست؟
              </h2>
              <p className="font-semibold text-zinc-100 light:text-zinc-900 text-lg">
                آلبرت انیشتین زمانی سود مرکب را هشتمین عجایب جهان نامید. او
                می‌گفت: «کسی که آن را درک کند، سودش را می‌برد و کسی که آن را درک
                نکند، آن را پرداخت می‌کند.»
              </p>
              <p>
                بیشتر تازه‌واردان بازار سرمایه تصور می‌کنند برای ثروتمند شدن
                نیاز به یک سرمایه اولیه هنگفت دارند. در حالی که راز اصلی
                ثروت‌آفرینان بزرگ نهفته در درک مفهوم سود مرکب (Compound
                Interest) است. سود مرکب یعنی سودی که روی سودهای قبلی شما اعمال
                می‌شود و باعث رشد نمایی سرمایه‌تان می‌گردد.
              </p>
              <p>
                اجازه دهید با یک مثال ساده شروع کنیم. فرض کنید ۱۰۰ میلیون تومان
                با نرخ سود ۲۰٪ سالانه سرمایه‌گذاری کرده‌اید. در سال اول سود شما
                ۲۰ میلیون تومان خواهد بود. اگر این سود را برداشت کنید (سود
                ساده)، سال دوم نیز فقط ۲۰ میلیون سود خواهید داشت. اما اگر اجازه
                دهید آن ۲۰ میلیون در حساب شما بماند، در سال دوم سود شما روی ۱۲۰
                میلیون تومان محاسبه می‌شود (سود مرکب) که برابر با ۲۴ میلیون
                تومان خواهد بود.
              </p>

              <h3 id="intro-2">فرمول جادویی سود مرکب</h3>
              <p>
                شاید در سال‌های اول تفاوت سود ساده با سود مرکب زیاد به نظر نرسد،
                اما وقتی افق زمانی را به ۵ یا ۱۰ سال افزایش دهیم، نمودار رشد
                سرمایه به شکل خیره‌کننده‌ای اوج می‌گیرد. در واقع زمان مهم‌ترین
                متغیر در فرمول سود مرکب است.
              </p>

              <ul className="list-disc ps-0 pe-6 marker:text-brand-green space-y-2 mb-8">
                <li>
                  سرمایه‌گذاری زودتر را شروع کنید تا زمان بیشتری برای مرکب شدن
                  داشته باشید.
                </li>
                <li>
                  به سودهای کوچک قانع باشید، ولی در بازه‌های زمانی متوالی آنها
                  را تکرار کنید.
                </li>
                <li>
                  سودهای حاصله را مدام مجددا سرمایه‌گذاری کنید و برداشت زودهنگام
                  نداشته باشید.
                </li>
                <li>
                  از ابزارهای محاسبه‌گر آنلاین برای درک بهتر قدرت سود مرکب
                  استفاده نمایید.
                </li>
              </ul>

              <div className="bg-ink-800/40 light:bg-zinc-50 border-e-4 border-brand-green p-5 my-8 rounded-l-xl">
                <p className="m-0 text-[14px]">
                  <strong>مقاله مرتبط:</strong>{" "}
                  <a href="#">
                    ابزار محاسبه‌گر سود مرکب سرمایه را حتماً بررسی کنید
                  </a>
                </p>
              </div>

              <h2 id="comparison" className="title-font">
                تفاوت اصلی سود ساده و مرکب
              </h2>
              <p>
                در سیستم سود ساده، شما تنها روی سپرده اولیه خود سود می‌گیرید. در
                حالی که سود مرکب به عنوان یک "ماشین تولید ثروت" عمل می‌کند و
                سودهای به دست آمده را مجدداً به چرخه تولید سود برمی‌گرداند.
              </p>

              <div className="relative rounded-xl overflow-hidden my-8 border border-ink-500 light:border-zinc-200">
                <img
                  src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="chart display"
                  className="w-full h-auto"
                />
              </div>

              <p>
                همان‌طور که در نمودار بالا مشخص است، سرمایه‌گذارانی که از اصل
                سود مرکب بهره می‌گیرند در درازمدت فاصله‌ای غیرقابل جبران با
                سایرین پیدا می‌کنند.
              </p>

              <h2 id="conclusion" className="title-font">
                جمع‌بندی
              </h2>
              <p>
                اگر مدام در حال برداشت سود معاملات خود هستید و آن را برای
                هزینه‌های جاری زندگی صرف می‌کنید، در بهترین حالت درجا خواهید زد
                و اثر جادویی سود مرکب را از دست می‌دهید. برای پیشرفت واقعی، باید
                بخشی از سود را مجدد به گردش درآورید.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-8 border-t border-ink-500 light:border-zinc-200">
              <div className="flex items-center gap-2 font-medium text-[13px] text-white light:text-zinc-900">
                <IconShare2 size={16} />
                <span>این مطلب را به اشتراک بگذارید:</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-full bg-ink-800 light:bg-zinc-100 hover:bg-brand-green hover:text-white transition-colors flex items-center justify-center border border-ink-500 light:border-zinc-200">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 7h-2v-3.5c0-.83-.67-1.5-1.5-1.5S10 12.67 10 13.5V17H8v-6h2v1.5c.39-.75 1.15-1.5 2.25-1.5 1.5 0 2.75 1.25 2.75 2.75V17z" />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-ink-800 light:bg-zinc-100 hover:bg-brand-red hover:text-white transition-colors flex items-center justify-center border border-ink-500 light:border-zinc-200">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.06c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-ink-800 light:bg-zinc-100 hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-center border border-ink-500 light:border-zinc-200">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <a
                href="#"
                className="flex flex-col p-4 rounded-xl border border-ink-500 light:border-zinc-200 hover:border-ink-400 hover:bg-ink-800/40 light:hover:bg-zinc-50 transition"
              >
                <span className="text-[11px] text-zinc-500 mb-1 flex items-center gap-1">
                  <IconChevronRight size={12} /> مقاله قبلی
                </span>
                <span className="text-[13px] font-bold text-white light:text-zinc-900 title-font">
                  تله دردادون روزانه پراپ فاند؛ نجات حساب!
                </span>
              </a>
              <a
                href="#"
                className="flex flex-col p-4 rounded-xl border border-ink-500 light:border-zinc-200 hover:border-ink-400 hover:bg-ink-800/40 light:hover:bg-zinc-50 transition items-end text-start"
              >
                <span className="text-[11px] text-zinc-500 mb-1 flex items-center gap-1">
                  مقاله بعدی <IconChevronLeft size={12} />
                </span>
                <span className="text-[13px] font-bold text-white light:text-zinc-900 text-end title-font">
                  اکسپرت پراپ فاند: رعایت خودکار قوانین مدیریت ریسک
                </span>
              </a>
            </div>

            {/* Related Articles */}
            <div className="mt-16">
              <h3 className="text-xl font-bold text-white light:text-zinc-900 mb-6 title-font border-b border-ink-500 light:border-zinc-200 pb-3">
                مقالات مرتبط
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <a key={i} href="#" className="group flex flex-col gap-3">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden border border-ink-500 bg-ink-800">
                      <img
                        src={`https://images.unsplash.com/photo-1611974789855-${i}c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        alt=""
                      />
                    </div>
                    <h4 className="text-[13.5px] font-bold leading-[1.6] text-white light:text-zinc-900 group-hover:text-brand-green transition-colors title-font line-clamp-2">
                      تله دردادون روزانه پراپ فاند؛ نجات حساب با یک کلیک!
                    </h4>
                    <span className="text-[11px] text-zinc-500">
                      ۱۴۰۳/۱۲/۱۴
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-16 bg-ink-800/20 light:bg-zinc-50/50 rounded-2xl border border-ink-500 light:border-zinc-200 p-6 md:p-8">
              <h3 className="text-xl font-bold text-white light:text-zinc-900 mb-2 title-font">
                دیدگاه‌ها
              </h3>
              <p className="text-[13px] text-zinc-400 mb-8 border-b border-ink-500 light:border-zinc-200 pb-6">
                هنوز دیدگاهی برای این مقاله ثبت نشده است. اولین نفر باشید!
              </p>

              <h4 className="text-lg font-bold text-white light:text-zinc-900 mb-2 title-font">
                دیدگاهتان را بنویسید
              </h4>
              <p className="text-[12px] text-zinc-500 mb-6">
                نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری
                شده‌اند *
              </p>

              <form className="space-y-4 max-w-2xl">
                <div>
                  <label className="block text-[12px] text-zinc-400 mb-2">
                    دیدگاه *
                  </label>
                  <textarea
                    className="w-full h-32 bg-ink-900 light:bg-white border border-ink-500 light:border-zinc-300 rounded-xl p-3 outline-none focus:border-brand-green text-[14px]"
                    placeholder="متن دیدگاه..."
                  ></textarea>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] text-zinc-400 mb-2">
                      نام *
                    </label>
                    <input className="w-full h-11 bg-ink-900 light:bg-white border border-ink-500 light:border-zinc-300 rounded-xl px-4 outline-none focus:border-brand-green text-[14px]" />
                  </div>
                  <div>
                    <label className="block text-[12px] text-zinc-400 mb-2">
                      ایمیل *
                    </label>
                    <input
                      type="email"
                      dir="ltr"
                      className="w-full h-11 bg-ink-900 light:bg-white border border-ink-500 light:border-zinc-300 rounded-xl px-4 text-start outline-none focus:border-brand-green text-[14px]"
                    />
                  </div>
                </div>
                <button className="bg-brand-green text-black font-bold text-[14px] px-8 py-3 rounded-xl hover:bg-brand-greenSoft transition-colors mt-2">
                  فرستادن دیدگاه
                </button>
              </form>
            </div>
          </article>
        </div>

        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 start-6 w-12 h-12 bg-ink-800 border border-ink-500 light:bg-zinc-100 light:border-zinc-300 text-white light:text-zinc-900 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-40 hover:bg-brand-green hover:text-black hover:border-brand-green ${
            showGoTop
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        >
          <IconArrowLeft className="rotate-90" size={24} />
        </button>
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  PageShell ? (
    <PageShell slug="article">
      <ArticleApp />
    </PageShell>
  ) : (
    <ArticleApp />
  ),
);
