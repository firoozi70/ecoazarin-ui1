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


const UpgradeModal = ({ onClose }) => {
  const lang = getLang();
  const [billing, setBilling] = useState("annual");
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

export { UpgradeModal };