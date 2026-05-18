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

export { DashboardModal };