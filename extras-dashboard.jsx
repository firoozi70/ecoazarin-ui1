// ============== SETTINGS / DASHBOARD / UPGRADE MODALS ==============
const ModalShell = ({ onClose, title, icon, children, max = "820px" }) => (
  <div
    className="fixed inset-0 z-[110] flex items-center justify-center p-4"
    style={{ animation: "fadein .18s ease-out both" }}
  >
    <div
      className="absolute inset-0 bg-black/72 backdrop-blur-sm"
      onClick={onClose}
    />
    <div
      className="relative w-full bg-ink-800 border border-ink-500 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      style={{ maxWidth: max, maxHeight: "88vh" }}
    >
      <div className="px-5 py-4 border-b border-ink-500 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          {icon}
          <h3 className="text-[16px] font-bold">{title}</h3>
        </div>
        <button
          onClick={onClose}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-ink-700"
        >
          <IconClose size={16} />
        </button>
      </div>
      <div className="flex-1 overflow-auto scrollbar-hide">{children}</div>
    </div>
  </div>
);

// --- Settings ---
const SettingsModal = ({ user, onClose }) => {
  const [tab, setTab] = _us("account");
  const [theme, setTheme] = _us(() =>
    document.documentElement.classList.contains("light") ? "light" : "dark",
  );
  const [notifEmail, setNotifEmail] = _us(true);
  const [notifPush, setNotifPush] = _us(true);
  const [notifDigest, setNotifDigest] = _us(false);
  const [twofa, setTwofa] = _us(false);
  const [privacy, setPrivacy] = _us("friends");
  const [density, setDensity] = _us("cozy");
  const [accent, setAccent] = _us("green");

  const TABS = [
    { id: "account", fa: "حساب کاربری", en: "Account", icon: "👤" },
    { id: "notifs", fa: "اعلان‌ها", en: "Notifications", icon: "🔔" },
    { id: "security", fa: "امنیت", en: "Security", icon: "🔒" },
    { id: "appear", fa: "ظاهر و تم", en: "Appearance", icon: "🎨" },
    { id: "privacy", fa: "حریم خصوصی", en: "Privacy", icon: "🛡" },
    { id: "lang", fa: "زبان و منطقه", en: "Language", icon: "🌐" },
    { id: "data", fa: "داده و ذخیره‌سازی", en: "Data", icon: "💾" },
  ];
  const lang = getLang();
  const Switch = ({ on, onClick }) => (
    <button
      onClick={onClick}
      className={`relative w-11 h-6 rounded-full transition ${on ? "bg-brand-green" : "bg-ink-500"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "right-0.5" : "right-[calc(100%-1.375rem)]"}`}
      />
    </button>
  );
  const Row = ({ title, desc, control }) => (
    <div className="flex items-start justify-between gap-4 py-3.5 border-b border-ink-500/60 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="text-[13.5px] font-semibold text-white">{title}</div>
        {desc && (
          <div className="text-[11.5px] text-zinc-400 mt-1 leading-5">
            {desc}
          </div>
        )}
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );

  return (
    <ModalShell
      onClose={onClose}
      title={lang === "EN" ? "Settings" : "تنظیمات"}
      icon={<span className="text-[18px]">⚙</span>}
      max="900px"
    >
      <div className="grid md:grid-cols-[200px_1fr] min-h-[480px]">
        {/* sidebar */}
        <aside className="bg-ink-900/50 border-l border-ink-500 p-2 overflow-x-auto md:overflow-visible">
          <div className="flex md:flex-col gap-1">
            {TABS.map((s) => (
              <button
                key={s.id}
                onClick={() => setTab(s.id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] text-right whitespace-nowrap transition ${tab === s.id ? "bg-brand-red/15 text-white border border-brand-red/30" : "text-zinc-400 hover:bg-ink-700 hover:text-white"}`}
              >
                <span className="text-[15px]">{s.icon}</span>
                <span className="flex-1">{lang === "EN" ? s.en : s.fa}</span>
              </button>
            ))}
          </div>
        </aside>
        {/* body */}
        <div className="p-5 md:p-6">
          {tab === "account" && (
            <>
              <div className="flex items-center gap-4 pb-5 border-b border-ink-500/60 mb-2">
                <Avatar name={user.name} size={64} />
                <div className="flex-1">
                  <div className="text-[16px] font-bold">{user.name}</div>
                  <div className="text-[12px] text-zinc-400 mt-0.5">
                    {user.name.toLowerCase()}@ecoazarin.ir
                  </div>
                  <button className="text-[11.5px] text-brand-redSoft hover:text-brand-red mt-1.5">
                    تغییر تصویر پروفایل
                  </button>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[11px] font-bold">
                  طلایی
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mt-2">
                <label className="block">
                  <span className="text-[12px] text-zinc-400 block mb-1">
                    نام نمایشی
                  </span>
                  <input
                    defaultValue={user.name}
                    className="w-full h-10 px-3 rounded-lg bg-ink-900 border border-ink-500 text-[13px] outline-none focus:border-brand-red"
                  />
                </label>
                <label className="block">
                  <span className="text-[12px] text-zinc-400 block mb-1">
                    نام کاربری
                  </span>
                  <input
                    defaultValue={user.name.toLowerCase()}
                    className="w-full h-10 px-3 rounded-lg bg-ink-900 border border-ink-500 text-[13px] outline-none focus:border-brand-red ltr-num"
                  />
                </label>
                <label className="block">
                  <span className="text-[12px] text-zinc-400 block mb-1">
                    ایمیل
                  </span>
                  <input
                    defaultValue={user.name.toLowerCase() + "@ecoazarin.ir"}
                    className="w-full h-10 px-3 rounded-lg bg-ink-900 border border-ink-500 text-[13px] outline-none focus:border-brand-red ltr-num"
                  />
                </label>
                <label className="block">
                  <span className="text-[12px] text-zinc-400 block mb-1">
                    شماره موبایل
                  </span>
                  <input
                    defaultValue="+98 912 *** **00"
                    className="w-full h-10 px-3 rounded-lg bg-ink-900 border border-ink-500 text-[13px] outline-none focus:border-brand-red ltr-num"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-[12px] text-zinc-400 block mb-1">
                    بیوگرافی
                  </span>
                  <textarea
                    rows={3}
                    placeholder="درباره خودت بنویس…"
                    className="w-full px-3 py-2 rounded-lg bg-ink-900 border border-ink-500 text-[13px] outline-none focus:border-brand-red resize-none"
                  />
                </label>
              </div>
              <div className="flex items-center gap-2 mt-5">
                <button className="h-10 px-5 rounded-xl bg-brand-green text-black font-bold text-[13px] hover:bg-brand-greenSoft transition">
                  ذخیرهٔ تغییرات
                </button>
                <button className="h-10 px-4 rounded-xl border border-ink-500 text-zinc-300 hover:bg-ink-700 text-[13px]">
                  انصراف
                </button>
              </div>
            </>
          )}
          {tab === "notifs" && (
            <>
              <Row
                title="ایمیل"
                desc="گزارش‌های هفتگی، خبرنامه‌ها و رویدادهای مهم"
                control={
                  <Switch
                    on={notifEmail}
                    onClick={() => setNotifEmail((v) => !v)}
                  />
                }
              />
              <Row
                title="اعلان درون‌برنامه‌ای (Push)"
                desc="اعلان‌های فوری بازار و فعالیت حساب"
                control={
                  <Switch
                    on={notifPush}
                    onClick={() => setNotifPush((v) => !v)}
                  />
                }
              />
              <Row
                title="خلاصهٔ روزانه"
                desc="هر روز ساعت ۹ صبح خلاصهٔ خبرها را دریافت کنید"
                control={
                  <Switch
                    on={notifDigest}
                    onClick={() => setNotifDigest((v) => !v)}
                  />
                }
              />
              <Row
                title="هشدار قیمت"
                desc="وقتی نماد مورد علاقه‌ات از سطح خاصی عبور کرد"
                control={
                  <button className="h-9 px-3 rounded-lg bg-ink-700 text-[12px] hover:bg-ink-600">
                    پیکربندی
                  </button>
                }
              />
            </>
          )}
          {tab === "security" && (
            <>
              <Row
                title="تأیید دو مرحله‌ای"
                desc="ایمن‌سازی حساب با کد یکبار مصرف"
                control={
                  <Switch on={twofa} onClick={() => setTwofa((v) => !v)} />
                }
              />
              <Row
                title="تغییر رمز عبور"
                desc="آخرین تغییر: ۲ ماه پیش"
                control={
                  <button className="h-9 px-3 rounded-lg bg-ink-700 text-[12px] hover:bg-ink-600">
                    تغییر
                  </button>
                }
              />
              <Row
                title="نشست‌های فعال"
                desc="۲ دستگاه آنلاین — کروم، iOS"
                control={
                  <button className="h-9 px-3 rounded-lg bg-ink-700 text-[12px] hover:bg-ink-600">
                    مدیریت
                  </button>
                }
              />
              <Row
                title="ورود با گوگل / آپل"
                desc="اتصال حساب اجتماعی"
                control={
                  <button className="h-9 px-3 rounded-lg bg-ink-700 text-[12px] hover:bg-ink-600">
                    اتصال
                  </button>
                }
              />
              <Row
                title="حذف حساب"
                desc="حذف دائمی حساب و تمام داده‌ها"
                control={
                  <button className="h-9 px-3 rounded-lg bg-brand-red/10 text-brand-redSoft border border-brand-red/30 text-[12px]">
                    حذف حساب
                  </button>
                }
              />
            </>
          )}
          {tab === "appear" && (
            <>
              <div className="py-3.5 border-b border-ink-500/60">
                <div className="text-[13.5px] font-semibold mb-2">تم</div>
                <div className="flex gap-2">
                  {[
                    { id: "dark", l: "تیره" },
                    { id: "light", l: "روشن" },
                    { id: "auto", l: "سیستم" },
                  ].map((o) => (
                    <button
                      key={o.id}
                      onClick={() => {
                        setTheme(o.id);
                        document.documentElement.classList.toggle(
                          "light",
                          o.id === "light",
                        );
                        document.documentElement.classList.toggle(
                          "dark",
                          o.id !== "light",
                        );
                        try {
                          localStorage.setItem(
                            "eco-theme",
                            o.id === "light" ? "light" : "dark",
                          );
                        } catch (e) {}
                      }}
                      className={`h-10 px-4 rounded-lg text-[12.5px] border transition ${theme === o.id ? "bg-brand-green text-black border-brand-green font-bold" : "bg-ink-900 text-zinc-300 border-ink-500 hover:border-ink-400"}`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
              <div className="py-3.5 border-b border-ink-500/60">
                <div className="text-[13.5px] font-semibold mb-2">
                  رنگ تأکید
                </div>
                <div className="flex gap-2">
                  {[
                    { id: "red", c: "#E63946" },
                    { id: "green", c: "#2BA67A" },
                    { id: "blue", c: "#2563EB" },
                    { id: "amber", c: "#F59E0B" },
                    { id: "violet", c: "#7C3AED" },
                  ].map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setAccent(o.id)}
                      aria-label={o.id}
                      className={`h-9 w-9 rounded-full ring-2 transition ${accent === o.id ? "ring-white scale-110" : "ring-transparent hover:scale-105"}`}
                      style={{ background: o.c }}
                    />
                  ))}
                </div>
              </div>
              <div className="py-3.5">
                <div className="text-[13.5px] font-semibold mb-2">
                  چگالی نمایش
                </div>
                <div className="flex gap-2">
                  {[
                    { id: "compact", l: "فشرده" },
                    { id: "cozy", l: "متعادل" },
                    { id: "comfortable", l: "گسترده" },
                  ].map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setDensity(o.id)}
                      className={`h-9 px-4 rounded-lg text-[12.5px] border transition ${density === o.id ? "bg-brand-green text-black border-brand-green font-bold" : "bg-ink-900 text-zinc-300 border-ink-500 hover:border-ink-400"}`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
          {tab === "privacy" && (
            <>
              <Row
                title="نمایش پروفایل به دیگران"
                control={
                  <select
                    value={privacy}
                    onChange={(e) => setPrivacy(e.target.value)}
                    className="h-9 px-3 rounded-lg bg-ink-900 border border-ink-500 text-[12.5px]"
                  >
                    <option value="public">عمومی</option>
                    <option value="friends">فقط دوستان</option>
                    <option value="private">خصوصی</option>
                  </select>
                }
              />
              <Row
                title="نمایش وضعیت آنلاین"
                desc="دیگران ببینند الان کجای سایت هستی"
                control={<Switch on={true} onClick={() => {}} />}
              />
              <Row
                title="کوکی‌های شخصی‌سازی"
                desc="بهبود تجربه با تحلیل رفتار"
                control={<Switch on={true} onClick={() => {}} />}
              />
              <Row
                title="ردگیری تبلیغات"
                desc="تبلیغات شخصی‌سازی شده بر اساس علاقه‌ها"
                control={<Switch on={false} onClick={() => {}} />}
              />
              <Row
                title="دانلود داده‌های من"
                desc="یک کپی از همهٔ داده‌های حسابت بگیر"
                control={
                  <button className="h-9 px-3 rounded-lg bg-ink-700 text-[12px] hover:bg-ink-600">
                    درخواست دانلود
                  </button>
                }
              />
            </>
          )}
          {tab === "lang" && (
            <>
              <div className="py-3.5 border-b border-ink-500/60">
                <div className="text-[13.5px] font-semibold mb-2">
                  زبان رابط کاربری
                </div>
                <div className="flex gap-2">
                  {[
                    { id: "FA", l: "فارسی" },
                    { id: "EN", l: "English" },
                  ].map((o) => (
                    <button
                      key={o.id}
                      onClick={() => {
                        try {
                          localStorage.setItem("eco-lang", o.id);
                        } catch (e) {}
                        setTimeout(() => location.reload(), 60);
                      }}
                      className={`h-10 px-5 rounded-lg text-[12.5px] border transition ${lang === o.id ? "bg-brand-green text-black border-brand-green font-bold" : "bg-ink-900 text-zinc-300 border-ink-500 hover:border-ink-400"}`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
              <Row
                title="منطقهٔ زمانی"
                desc="تهران (GMT+3:30)"
                control={
                  <button className="h-9 px-3 rounded-lg bg-ink-700 text-[12px] hover:bg-ink-600">
                    تغییر
                  </button>
                }
              />
              <Row
                title="فرمت تاریخ"
                control={
                  <select className="h-9 px-3 rounded-lg bg-ink-900 border border-ink-500 text-[12.5px]">
                    <option>شمسی</option>
                    <option>میلادی</option>
                    <option>قمری</option>
                  </select>
                }
              />
              <Row
                title="ارز پیش‌فرض"
                control={
                  <select className="h-9 px-3 rounded-lg bg-ink-900 border border-ink-500 text-[12.5px]">
                    <option>تومان</option>
                    <option>دلار</option>
                    <option>یورو</option>
                  </select>
                }
              />
            </>
          )}
          {tab === "data" && (
            <>
              <Row
                title="حافظهٔ مرورگر"
                desc="۲۴٫۸ مگابایت — جستجوها، علاقه‌مندی‌ها، نوتیف‌ها"
                control={
                  <button className="h-9 px-3 rounded-lg bg-ink-700 text-[12px] hover:bg-ink-600">
                    پاک‌سازی
                  </button>
                }
              />
              <Row
                title="پشتیبان‌گیری از ژورنال"
                desc="پشتیبان روزانه روی ابر — فعال است"
                control={<Switch on={true} onClick={() => {}} />}
              />
              <Row
                title="دانلود کامل ژورنال (CSV)"
                control={
                  <button className="h-9 px-3 rounded-lg bg-ink-700 text-[12px] hover:bg-ink-600">
                    دانلود
                  </button>
                }
              />
              <Row
                title="بازنشانی سایت"
                desc="پاک کردن همهٔ تنظیمات شخصی"
                control={
                  <button className="h-9 px-3 rounded-lg bg-brand-red/10 text-brand-redSoft border border-brand-red/30 text-[12px]">
                    بازنشانی
                  </button>
                }
              />
            </>
          )}
        </div>
      </div>
    </ModalShell>
  );
};

// --- Dashboard ---
const DashboardModal = ({ user, onClose }) => {
  const lang = getLang();
  const stats = [
    {
      label: "ارزش پرتفوی",
      value: "۱۲۴٫۸م",
      change: "+۴٫۲٪",
      up: true,
      icon: "💰",
    },
    {
      label: "سود این ماه",
      value: "۸٫۹م",
      change: "+۱۲٪",
      up: true,
      icon: "📈",
    },
    { label: "معاملات باز", value: "۷", change: "۳ سود", up: true, icon: "📊" },
    {
      label: "دوره‌های گذرانده",
      value: "۱۲",
      change: "+۲",
      up: true,
      icon: "🎓",
    },
  ];
  const watchlist = [
    { sym: "BTC/USD", price: "۶۸٬۲۱۰", change: "-۱٫۰۴٪", dir: "down" },
    { sym: "XAU/USD", price: "۲٬۳۴۸", change: "+۰٫۶۲٪", dir: "up" },
    { sym: "ETH/USD", price: "۳٬۴۸۸", change: "+۲٫۱۱٪", dir: "up" },
    { sym: "EUR/USD", price: "۱٫۰۸۵", change: "+۰٫۱۸٪", dir: "up" },
  ];
  const recentTrades = [
    {
      pair: "BTC/USDT",
      side: "خرید",
      size: "۰٫۲۵",
      pnl: "+۸۴۰",
      time: "۲ ساعت پیش",
    },
    {
      pair: "XAU/USD",
      side: "فروش",
      size: "۱٫۰",
      pnl: "-۲۴۰",
      time: "۵ ساعت پیش",
    },
    {
      pair: "ETH/USDT",
      side: "خرید",
      size: "۲٫۰",
      pnl: "+۱٬۲۸۰",
      time: "دیروز",
    },
  ];
  // tiny SVG sparkline data
  const Sparkline = ({ up }) => (
    <svg viewBox="0 0 80 28" className="w-full h-7">
      <polyline
        fill="none"
        strokeWidth="2"
        stroke={up ? "#2BA67A" : "#E63946"}
        points={
          up
            ? "2,22 12,18 24,20 36,12 48,14 60,8 72,6 78,4"
            : "2,8 12,12 24,9 36,16 48,12 60,18 72,20 78,24"
        }
      />
    </svg>
  );
  return (
    <ModalShell
      onClose={onClose}
      title={lang === "EN" ? "My dashboard" : "داشبورد من"}
      icon={<span className="text-[18px]">📊</span>}
      max="980px"
    >
      <div className="p-5 md:p-6">
        {/* greeting */}
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-ink-500/60">
          <Avatar name={user.name} size={56} />
          <div className="flex-1 min-w-0">
            <div className="text-[18px] font-bold">سلام {user.name} 👋</div>
            <div className="text-[12px] text-zinc-400 mt-0.5">
              امروز پرتفویت ۴٫۲٪ رشد داشته. ادامه بده!
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[11px] font-bold">
            عضو طلایی
          </span>
        </div>
        {/* stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-ink-900/60 border border-ink-500 rounded-xl p-4 hover:border-ink-400 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[18px]">{s.icon}</span>
                <span
                  className={`text-[10.5px] font-bold ${s.up ? "text-brand-green" : "text-brand-red"}`}
                >
                  {s.change}
                </span>
              </div>
              <div className="text-[20px] font-extrabold stat-num">
                {s.value}
              </div>
              <div className="text-[11px] text-zinc-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
        {/* equity curve placeholder */}
        <div className="bg-ink-900/60 border border-ink-500 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[13px] font-bold">منحنی سرمایه</div>
              <div className="text-[11px] text-zinc-500">۳۰ روز گذشته</div>
            </div>
            <div className="flex gap-1 text-[11px]">
              {["۷ روز", "۳۰ روز", "۹۰ روز", "۱ سال"].map((p, i) => (
                <button
                  key={i}
                  className={`px-2.5 py-1 rounded-md ${i === 1 ? "bg-brand-green text-black font-bold" : "bg-ink-700 text-zinc-400 hover:text-white"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <svg viewBox="0 0 600 140" className="w-full h-[140px]">
            <defs>
              <linearGradient id="dashGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#2BA67A" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2BA67A" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,110 L40,98 L80,104 L120,82 L160,90 L200,72 L240,84 L280,58 L320,68 L360,42 L400,52 L440,30 L480,38 L520,22 L560,28 L600,14 L600,140 L0,140 Z"
              fill="url(#dashGrad)"
            />
            <path
              d="M0,110 L40,98 L80,104 L120,82 L160,90 L200,72 L240,84 L280,58 L320,68 L360,42 L400,52 L440,30 L480,38 L520,22 L560,28 L600,14"
              fill="none"
              stroke="#2BA67A"
              strokeWidth="2"
            />
          </svg>
        </div>
        {/* two-col: watchlist + trades */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-ink-900/60 border border-ink-500 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-ink-500 flex items-center justify-between">
              <div className="text-[13px] font-bold">واچ‌لیست</div>
              <button className="text-[11px] text-brand-redSoft hover:text-brand-red">
                + افزودن
              </button>
            </div>
            <ul className="divide-y divide-ink-500/60">
              {watchlist.map((w, i) => (
                <li
                  key={i}
                  className="px-4 py-3 flex items-center gap-3 hover:bg-ink-700/30"
                >
                  <span className="font-mono text-[12.5px] font-bold w-20">
                    {w.sym}
                  </span>
                  <div className="flex-1">
                    <Sparkline up={w.dir === "up"} />
                  </div>
                  <div className="text-left">
                    <div className="num-display text-[12.5px] font-bold">
                      {w.price}
                    </div>
                    <div
                      className={`text-[10.5px] font-bold ${w.dir === "up" ? "text-brand-green" : "text-brand-red"}`}
                    >
                      {w.change}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-ink-900/60 border border-ink-500 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-ink-500 flex items-center justify-between">
              <div className="text-[13px] font-bold">معاملات اخیر</div>
              <a
                href="journal.html"
                className="text-[11px] text-brand-redSoft hover:text-brand-red"
              >
                همه ›
              </a>
            </div>
            <ul className="divide-y divide-ink-500/60">
              {recentTrades.map((tr, i) => (
                <li key={i} className="px-4 py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[12.5px] font-bold">
                      {tr.pair}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded ${tr.side === "خرید" ? "bg-brand-green/15 text-brand-green" : "bg-brand-red/15 text-brand-red"}`}
                    >
                      {tr.side}
                    </span>
                    <span className="text-[10.5px] text-zinc-500 mr-auto">
                      {tr.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11.5px] text-zinc-400">
                    <span>
                      حجم: <span className="num-display">{tr.size}</span>
                    </span>
                    <span
                      className={`font-bold ${tr.pnl.startsWith("+") ? "text-brand-green" : "text-brand-red"}`}
                    >
                      {tr.pnl}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-2 mt-5">
          <a
            href="journal.html"
            className="h-11 rounded-xl bg-ink-700 hover:bg-ink-600 flex items-center justify-center gap-2 text-[12.5px] font-semibold"
          >
            📓 ژورنال‌نویسی
          </a>
          <a
            href="charts.html"
            className="h-11 rounded-xl bg-ink-700 hover:bg-ink-600 flex items-center justify-center gap-2 text-[12.5px] font-semibold"
          >
            📈 تحلیل چارت
          </a>
          <a
            href="education.html"
            className="h-11 rounded-xl bg-ink-700 hover:bg-ink-600 flex items-center justify-center gap-2 text-[12.5px] font-semibold"
          >
            🎓 ادامهٔ آموزش
          </a>
        </div>
      </div>
    </ModalShell>
  );
};

// --- Upgrade ---
const UpgradeModal = ({ onClose }) => {
  const lang = getLang();
  const [billing, setBilling] = _us("annual");
  const PLANS = [
    {
      id: "free",
      name: "رایگان",
      en: "Free",
      price: { m: "۰", y: "۰" },
      ribbon: null,
      desc: "برای شروع و آشنایی",
      color: "zinc",
      features: [
        "دسترسی به اخبار و مقالات",
        "۳ نماد در واچ‌لیست",
        "جستجوی پایه",
        "بدون ژورنال‌نویسی",
        "بدون تحلیل پیشرفته",
      ],
    },
    {
      id: "gold",
      name: "طلایی",
      en: "Gold",
      price: { m: "۲۹۰٬۰۰۰", y: "۲٬۸۹۰٬۰۰۰" },
      ribbon: "محبوب‌ترین",
      desc: "برای معامله‌گران فعال",
      color: "amber",
      features: [
        "همه‌چیز پلن رایگان",
        "واچ‌لیست نامحدود",
        "ژورنال‌نویسی نامحدود",
        "چارت پیشرفته با ۱۵۰+ اندیکاتور",
        "هشدار قیمت",
        "۲۰٪ تخفیف دوره‌ها",
        "پشتیبانی اولویت‌دار",
      ],
    },
    {
      id: "plat",
      name: "الماس",
      en: "Platinum",
      price: { m: "۵۹۰٬۰۰۰", y: "۵٬۸۹۰٬۰۰۰" },
      ribbon: "حرفه‌ای",
      desc: "برای پرتفو-منیجرها و تحلیلگران",
      color: "cyan",
      features: [
        "همه‌چیز پلن طلایی",
        "API و وب‌هوک",
        "بک‌تست استراتژی",
        "گزارش‌های PDF حرفه‌ای",
        "۵۰٪ تخفیف دوره‌ها",
        "کوچ اختصاصی هفتگی",
        "دسترسی زودهنگام به ابزارها",
      ],
    },
  ];
  const colorMap = {
    zinc: {
      ring: "border-ink-500",
      btn: "bg-ink-700 hover:bg-ink-600 text-white",
      tag: "bg-ink-700 text-zinc-300",
    },
    amber: {
      ring: "border-amber-500/50 shadow-[0_8px_40px_-10px_rgba(245,158,11,0.4)]",
      btn: "bg-gradient-to-br from-amber-400 to-amber-500 text-black hover:from-amber-300 hover:to-amber-400",
      tag: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    },
    cyan: {
      ring: "border-cyan-500/50 shadow-[0_8px_40px_-10px_rgba(6,182,212,0.3)]",
      btn: "bg-gradient-to-br from-cyan-400 to-cyan-500 text-black hover:from-cyan-300 hover:to-cyan-400",
      tag: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30",
    },
  };
  return (
    <ModalShell
      onClose={onClose}
      title={lang === "EN" ? "Upgrade plan" : "ارتقای حساب"}
      icon={<span className="text-[18px]">⭐</span>}
      max="980px"
    >
      <div className="p-5 md:p-7">
        <div className="text-center mb-6">
          <h2 className="text-[22px] md:text-[26px] font-extrabold tracking-tight">
            پلنی که با تو رشد می‌کند
          </h2>
          <p className="text-[12.5px] text-zinc-400 mt-2 max-w-[460px] mx-auto leading-6">
            از ابزارهای حرفه‌ای تحلیل، ژورنال‌نویسی نامحدود و دسترسی به دوره‌های
            اختصاصی بهره‌مند شو.
          </p>
          <div className="inline-flex bg-ink-900 border border-ink-500 rounded-full p-1 mt-4 text-[12px]">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-4 py-1.5 rounded-full transition ${billing === "monthly" ? "bg-white text-black font-bold" : "text-zinc-400"}`}
            >
              ماهانه
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`px-4 py-1.5 rounded-full transition flex items-center gap-1.5 ${billing === "annual" ? "bg-white text-black font-bold" : "text-zinc-400"}`}
            >
              سالانه{" "}
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-green/20 text-brand-green font-bold">
                −۲۰٪
              </span>
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {PLANS.map((p) => {
            const c = colorMap[p.color];
            return (
              <div
                key={p.id}
                className={`relative bg-ink-900/60 border-2 ${c.ring} rounded-2xl p-5 flex flex-col`}
              >
                {p.ribbon && (
                  <div
                    className={`absolute -top-3 right-4 px-2.5 py-1 rounded-full text-[10.5px] font-bold ${c.tag}`}
                  >
                    {p.ribbon}
                  </div>
                )}
                <div className="text-[15px] font-extrabold">{p.name}</div>
                <div className="text-[11.5px] text-zinc-400 mt-0.5">
                  {p.desc}
                </div>
                <div className="mt-4 pb-4 border-b border-ink-500/60">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[28px] font-extrabold stat-num">
                      {billing === "annual" ? p.price.y : p.price.m}
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      تومان / {billing === "annual" ? "سال" : "ماه"}
                    </span>
                  </div>
                  {p.id !== "free" && billing === "annual" && (
                    <div className="text-[10.5px] text-brand-green mt-1 font-bold">
                      ۲۰٪ صرفه‌جویی نسبت به ماهانه
                    </div>
                  )}
                </div>
                <ul className="mt-4 space-y-2.5 flex-1">
                  {p.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[12.5px] text-zinc-300"
                    >
                      <span className="text-brand-green mt-0.5 shrink-0">
                        ✓
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-5 h-11 rounded-xl text-[13px] font-bold transition ${c.btn}`}
                >
                  {p.id === "free" ? "پلن فعلی" : "انتخاب پلن"}
                </button>
              </div>
            );
          })}
        </div>
        <div className="mt-6 pt-5 border-t border-ink-500/60 text-center text-[11.5px] text-zinc-500 leading-6">
          همهٔ پلن‌ها ۷ روز ضمانت بازگشت وجه دارند • پرداخت امن از طریق درگاه
          ملت / پاسارگاد • قابل لغو در هر زمان
        </div>
      </div>
    </ModalShell>
  );
};

// --- Profile menu ---
const ProfileMenu = ({ user, onLogout }) => {
  const [open, setOpen] = _us(false);
  const [modal, setModal] = _us(null); // 'settings' | 'dashboard' | 'upgrade' | null
  const ref = _ur(null);
  _ue(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  const openModal = (id) => {
    setOpen(false);
    setModal(id);
  };
  const lang = getLang();
  const ITEMS = [
    {
      id: "profile",
      fa: "پروفایل من",
      en: "My profile",
      icon: "👤",
      action: () => openModal("settings"),
    },
    {
      id: "dashboard",
      fa: "داشبورد من",
      en: "My dashboard",
      icon: "📊",
      action: () => openModal("dashboard"),
    },
    {
      id: "journal",
      fa: "ژورنال من",
      en: "My journal",
      icon: "📓",
      action: () => {
        location.href = "journal.html";
      },
    },
    {
      id: "settings",
      fa: "تنظیمات",
      en: "Settings",
      icon: "⚙",
      action: () => openModal("settings"),
    },
    {
      id: "upgrade",
      fa: "ارتقای حساب",
      en: "Upgrade",
      icon: "⭐",
      action: () => openModal("upgrade"),
      highlight: true,
    },
  ];
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 h-9 pr-1.5 pl-3 rounded-full bg-brand-green text-black hover:bg-brand-greenSoft transition shadow-[0_4px_14px_-6px_rgba(43,166,122,0.6)]"
      >
        <Avatar name={user.name} size={28} />
        <span
          className="text-[13px] font-bold leading-none flex items-center"
          style={{ paddingTop: 1 }}
        >
          {user.name}
        </span>
      </button>
      {open && (
        <div
          className="absolute top-11 left-0 w-[240px] bg-ink-800 border border-ink-500 rounded-xl shadow-2xl overflow-hidden z-50"
          style={{ animation: "fadein .15s ease-out both" }}
        >
          <div className="p-4 border-b border-ink-500 flex items-center gap-3">
            <Avatar name={user.name} size={42} />
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-bold leading-tight">
                {user.name}
              </div>
              <div className="text-[11px] text-zinc-500 mt-0.5 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400" />
                {lang === "EN" ? "Gold member" : "عضو طلایی"}
              </div>
            </div>
          </div>
          <ul className="p-2 grid gap-1 text-[13px]">
            {ITEMS.map((i) => (
              <li key={i.id}>
                <button
                  onClick={i.action}
                  className={`w-full text-right px-3 py-2 rounded-lg flex items-center gap-2.5 ${i.highlight ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 font-bold" : "hover:bg-ink-700 text-zinc-300"}`}
                >
                  <span className="text-[14px]">{i.icon}</span>
                  <span className="flex-1">{lang === "EN" ? i.en : i.fa}</span>
                </button>
              </li>
            ))}
            <li className="border-t border-ink-500/60 pt-1 mt-1">
              <button
                onClick={onLogout}
                className="w-full text-right px-3 py-2 rounded-lg hover:bg-brand-red/10 text-brand-redSoft flex items-center gap-2.5"
              >
                <span className="text-[14px]">↩</span>
                <span>{t("logout")}</span>
              </button>
            </li>
          </ul>
        </div>
      )}
      {modal === "settings" && (
        <SettingsModal user={user} onClose={() => setModal(null)} />
      )}
      {modal === "dashboard" && (
        <DashboardModal user={user} onClose={() => setModal(null)} />
      )}
      {modal === "upgrade" && <UpgradeModal onClose={() => setModal(null)} />}
    </div>
  );
};

const AuthButtons = () => {
  const [user, setUser] = useUser();
  if (user) return <ProfileMenu user={user} onLogout={() => setUser(null)} />;
  return (
    <div className="flex items-center gap-2">
      <a
        href="auth.html"
        className="inline-flex items-center gap-1 sm:gap-1.5 h-8 px-3 sm:h-9 sm:px-4 rounded-lg sm:rounded-xl text-[12px] sm:text-[13px] font-medium bg-brand-green text-black hover:bg-brand-greenSoft transition shadow-[0_4px_14px_-6px_rgba(16,185,129,0.5)]"
        aria-label={t("login")}
      >
        {t("login")}
        <IconArrowLeft size={14} className="hidden sm:block" />
      </a>
    </div>
  );
};

Object.assign(window, {
  LangToggle,
  NotificationBell,
  AuthButtons,
  ProfileMenu,
  useUser,
  useLang,
  Avatar,
  ModalShell,
  SettingsModal,
  DashboardModal,
  UpgradeModal,
});
