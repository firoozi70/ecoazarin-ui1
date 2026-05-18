import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as Recharts from 'recharts';
const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { t, __ECO_LANG as ECO_LANG, getLang, LangToggle, useLang } from '../../i18n/index';
import { motion, AnimatePresence } from 'motion/react';
import { IconClose, IconArrowLeft } from '../ui/Icons';
import { TABS } from '../../data/mockData';
import { Avatar, useUser } from '../auth/AuthModals';
import { NotificationBell } from '../notifications/Notifications';
import { ModalShell } from './ModalShell';


const SettingsModal = ({ user, onClose }) => {
  const [tab, setTab] = useState("account");
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains("light") ? "light" : "dark",
  );
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [notifDigest, setNotifDigest] = useState(false);
  const [twofa, setTwofa] = useState(false);
  const [privacy, setPrivacy] = useState("friends");
  const [density, setDensity] = useState("cozy");
  const [accent, setAccent] = useState("green");

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

export { SettingsModal };