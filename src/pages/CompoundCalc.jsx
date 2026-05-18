import ReactDOM from 'react-dom/client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as Recharts from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { PageShell } from '../layouts/PageShell';
import { Svg } from '../components/ui/Icons';
import { isEn } from './Auth';



const {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
  Legend,
} = window.Recharts || {};

const d3FormatNumber = (num, lang, currency) => {
  if (lang === "EN") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(num);
  } else {
    // For Persian short format in tooltips/axis
    if (num >= 1e9) return (num / 1e9).toFixed(1) + " میلیارد";
    if (num >= 1e6) return (num / 1e6).toFixed(0) + " میلیون";
    return new Intl.NumberFormat("fa-IR").format(num);
  }
};

const formatFullNumber = (num, lang) => {
  if (lang === "EN")
    return new Intl.NumberFormat("en-US").format(Math.round(num));
  return new Intl.NumberFormat("fa-IR").format(Math.round(num));
};

const DICT = {
  FA: {
    title: "محاسبه‌گر سود مرکب",
    subtitle:
      "قدرت سود مرکب را در افق‌های مختلف سرمایه‌گذاری شبیه‌سازی کنید – تا ۵۰ سال، با نمای ماهانه یا سالانه.",
    params: "پارامترهای سرمایه‌گذاری",
    principal: "سرمایه اولیه",
    monthly: "واریز ماهانه",
    rate: "نرخ سود سالانه (%)",
    years: "مدت سرمایه‌گذاری (سال)",
    compoundInterval: "دوره ترکیب سود",
    intervals: {
      YEARLY: "سالانه",
      QUARTERLY: "سه‌ماهه",
      MONTHLY: "ماهانه",
      DAILY: "روزانه",
    },
    viewMode: "نمای جدول و نمودار",
    yearlyView: "سالانه",
    monthlyView: "ماهانه",

    growthMult: "ضریب رشد",
    netProfit: "سود خالص",
    totalInvested: "کل سرمایه‌گذاری",
    finalValue: "ارزش نهایی",

    chartTitle: "نمودار رشد سرمایه",
    investedLine: "سرمایه‌گذاری",
    balanceLine: "ارزش کل",

    tableTitle: "جدول تفکیک",
    colYear: "سال",
    colMonth: "ماه",
    colInvested: "سرمایه‌گذاری شده",
    colTotal: "ارزش کل",
    colProfit: "سود خالص",
    colGrowth: "رشد",
    start: "شروع",

    currency: "تومان",
    tomanM: "میلیون تومان",
    yearLabel: "سال",
    monthLabel: "ماه",

    exportPDF: "دانلود PDF",
    exportExcel: "دانلود Excel",
    exportSheets: "گزارش گوگل شیت",
  },
  EN: {
    title: "Compound Interest Calculator",
    subtitle:
      "Simulate compound interest power mathematically - up to 50 years with detailed monthly or yearly views.",
    params: "Investment Parameters",
    principal: "Initial Investment",
    monthly: "Monthly Deposit",
    rate: "Annual Interest Rate (%)",
    years: "Investment Period (Years)",
    compoundInterval: "Compound Interval",
    intervals: {
      YEARLY: "Yearly",
      QUARTERLY: "Quarterly",
      MONTHLY: "Monthly",
      DAILY: "Daily",
    },
    viewMode: "Table & Chart View",
    yearlyView: "Yearly",
    monthlyView: "Monthly",

    growthMult: "Growth Multiplier",
    netProfit: "Net Profit",
    totalInvested: "Total Invested",
    finalValue: "Final Value",

    chartTitle: "Capital Growth Chart",
    investedLine: "Invested",
    balanceLine: "Total Value",

    tableTitle: "Breakdown Table",
    colYear: "Year",
    colMonth: "Month",
    colInvested: "Invested",
    colTotal: "Total Value",
    colProfit: "Net Profit",
    colGrowth: "Growth",
    start: "Start",

    currency: "$",
    tomanM: "Million",
    yearLabel: "Year",
    monthLabel: "Month",

    exportPDF: "Export PDF",
    exportExcel: "Export Excel",
    exportSheets: "Google Sheets",
  },
};

const IconTrophy = (p) => (
  <Svg {...p} viewBox="0 0 24 24">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </Svg>
);
const IconBriefcase = (p) => (
  <Svg {...p} viewBox="0 0 24 24">
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <rect width="20" height="14" x="2" y="6" rx="2" />
  </Svg>
);
const IconSparkles = (p) => (
  <Svg {...p} viewBox="0 0 24 24">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </Svg>
);
const IconBarChart = (p) => (
  <Svg {...p} viewBox="0 0 24 24">
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </Svg>
);
const IconDownload = (p) => (
  <Svg {...p} viewBox="0 0 24 24">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </Svg>
);
const IconTable = (p) => (
  <Svg {...p} viewBox="0 0 24 24">
    <path d="M12 3v18" />
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M3 9h18" />
    <path d="M3 15h18" />
  </Svg>
);
const IconCalendar = (p) => (
  <Svg {...p} viewBox="0 0 24 24">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </Svg>
);
const IconMoney = (p) => (
  <Svg {...p} viewBox="0 0 24 24">
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </Svg>
);

const FORMAT_T = (num) => {
  if (num >= 1e9) return (num / 1e9).toFixed(2) + " میلیارد";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + " میلیون";
  return new Intl.NumberFormat("fa-IR").format(Math.round(num));
};

function CompoundCalcApp() {
  const [lang, setLang] = useState("FA");
  useEffect(() => {
    setLang(localStorage.getItem("eco-lang") || "FA");
    const h = (e) => setLang(e.detail.lang);
    window.addEventListener("eco-lang-change", h);
    return () => window.removeEventListener("eco-lang-change", h);
  }, []);

  const d = DICT[lang] || DICT.FA;
  const isEn = lang === "EN";

  const [principal, setPrincipal] = useState(isEn ? 10000 : 10000000);
  const [monthly, setMonthly] = useState(isEn ? 500 : 1000000);
  const [rate, setRate] = useState(24);
  const [years, setYears] = useState(10);
  const [compoundFreq, setCompoundFreq] = useState("MONTHLY"); // YEARLY, QUARTERLY, MONTHLY, DAILY
  const [viewMode, setViewMode] = useState("YEARLY"); // YEARLY or MONTHLY

  // Auto-switch defaults based on lang if we want
  useEffect(() => {
    if (localStorage.getItem("eco-lang") === "EN" && principal === 10000000) {
      setPrincipal(10000);
      setMonthly(500);
      setRate(8);
    }
  }, []);

  const freqMap = { YEARLY: 1, QUARTERLY: 4, MONTHLY: 12, DAILY: 365 };

  const data = useMemo(() => {
    const arr = [];
    let currentBalance = principal;
    let totalInvested = principal;
    const n = freqMap[compoundFreq];
    const r = rate / 100 / n; // rate per period

    // We want to generate monthly data points to support monthly view
    let periodIndex = 0;

    // Start point
    arr.push({
      year: 0,
      month: 0,
      balance: currentBalance,
      invested: totalInvested,
      interest: 0,
    });

    for (let y = 1; y <= years; y++) {
      for (let m = 1; m <= 12; m++) {
        // Add monthly deposit
        currentBalance += monthly;
        totalInvested += monthly;

        // Compound if it's the right time
        let compoundedThisMonth = false;

        if (compoundFreq === "MONTHLY") {
          currentBalance *= 1 + r;
        } else if (compoundFreq === "YEARLY" && m === 12) {
          currentBalance *= 1 + r;
        } else if (compoundFreq === "QUARTERLY" && m % 3 === 0) {
          currentBalance *= 1 + r;
        } else if (compoundFreq === "DAILY") {
          // Approximate daily compounding for the month (30.41 days)
          currentBalance *= Math.pow(1 + r, 365 / 12);
        }

        arr.push({
          year: y,
          month: (y - 1) * 12 + m,
          rawMonth: m,
          balance: currentBalance,
          invested: totalInvested,
          interest: currentBalance - totalInvested,
        });
      }
    }
    return arr;
  }, [principal, monthly, rate, years, compoundFreq]);

  // View Data
  const viewData = useMemo(() => {
    if (viewMode === "YEARLY") {
      return data.filter((d) => d.month === 0 || d.rawMonth === 12);
    }
    return data;
  }, [data, viewMode]);

  const finalData = data[data.length - 1];
  const maxBalance = finalData.balance;

  const growthMult = finalData.balance / (principal || 1);

  // Export functions
  const exportPDF = () => {
    if (!window.jspdf) return alert("در حال بارگذاری کتابخانه...");
    const jsPDF = window.jspdf.jsPDF;
    const doc = new jsPDF({ orientation: "portrait" });

    // Using a font that supports utf-8 would be needed for Persian,
    // jsPDF standard fonts don't support Arabic/Persian by default unless using addFileToVFS.
    // For simplicity we will just export English or numbers if no font loaded.
    doc.setFontSize(18);
    doc.text("Compound Interest Calculation", 14, 22);
    doc.setFontSize(11);
    doc.text(`Principal: ${formatFullNumber(principal, "EN")}`, 14, 30);
    doc.text(`Monthly: ${formatFullNumber(monthly, "EN")}`, 14, 38);
    doc.text(`Rate: ${rate}% / Years: ${years}`, 14, 46);

    doc.autoTable({
      startY: 55,
      head: [["Period", "Invested", "Total Value", "Profit", "Growth"]],
      body: viewData.map((r) => [
        viewMode === "YEARLY" ? `Year ${r.year}` : `Month ${r.month}`,
        formatFullNumber(r.invested, "EN"),
        formatFullNumber(r.balance, "EN"),
        formatFullNumber(r.interest, "EN"),
        (r.balance / (r.invested || 1)).toFixed(2) + "x",
      ]),
    });

    doc.save("compound-calculator.pdf");
  };

  const exportExcel = () => {
    if (!window.XLSX) return alert("در حال بارگذاری کتابخانه...");
    const ws = window.XLSX.utils.json_to_sheet(
      viewData.map((r) => ({
        [viewMode === "YEARLY" ? d.colYear : d.colMonth]:
          viewMode === "YEARLY" ? r.year : r.month,
        [d.colInvested]: r.invested,
        [d.colTotal]: r.balance,
        [d.colProfit]: r.interest,
        [d.colGrowth]: (r.balance / (r.invested || 1)).toFixed(2) + "x",
      })),
    );
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, "Compound Data");
    window.XLSX.writeFile(wb, "compound_data.xlsx");
  };

  const exportCSV = () => {
    if (!window.XLSX) return alert("در حال بارگذاری کتابخانه...");
    const ws = window.XLSX.utils.json_to_sheet(
      viewData.map((r) => ({
        [viewMode === "YEARLY" ? d.colYear : d.colMonth]:
          viewMode === "YEARLY" ? r.year : r.month,
        [d.colInvested]: r.invested,
        [d.colTotal]: r.balance,
        [d.colProfit]: r.interest,
        [d.colGrowth]: (r.balance / (r.invested || 1)).toFixed(2) + "x",
      })),
    );
    const csv = window.XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "compound_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-ink-900 light:bg-zinc-50 min-h-screen text-white light:text-zinc-900 text-right pb-24 mt-[-1px]">
      <div className="max-w-[1400px] mx-auto pt-6 px-4 md:px-6">
        {/* Breadcrumb / Title with Colored Banner */}
        <div className="mb-8 relative overflow-hidden bg-gradient-to-br from-ink-800 to-ink-900 border border-ink-500 rounded-3xl p-6 md:p-10 shadow-2xl">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full orb-green opacity-20" />
          <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full orb-red opacity-10" />

          <div className="relative z-10">
            <div className="text-[12px] text-zinc-400 flex items-center gap-2 mb-4 font-medium">
              <span>{isEn ? "Home" : "خانه"}</span>
              <span>›</span>
              <span>{isEn ? "Tools" : "ابزارها"}</span>
              <span>›</span>
              <span className="text-zinc-200">{d.title}</span>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full text-[10px] bg-brand-green/20 text-brand-greenSoft border border-brand-green/30 font-bold tracking-widest">
                ابزار آنلاین
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight font-sans text-white">
              {d.title}
            </h1>

            <p className="text-zinc-400 font-medium text-[14px] md:text-[16px] max-w-2xl leading-relaxed">
              {d.subtitle}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Right Parameters Sidebar - Now rendering first in DOM so it's on right in RTL */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-ink-850 light:bg-white border border-ink-500 light:border-zinc-200 rounded-2xl shadow-xl sticky top-20">
              <div className="px-5 py-4 border-b border-ink-500 light:border-zinc-200">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-brand-green rounded-full"></span>
                  <h2 className="text-[15px] md:text-[16px] font-bold tracking-tight">
                    {d.params}
                  </h2>
                </div>
              </div>

              <div className="p-5 space-y-7">
                {/* Principal */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[12.5px] font-bold text-zinc-300 light:text-zinc-700 flex items-center gap-2">
                      <IconMoney size={14} className="text-zinc-400" />
                      {d.principal}
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                      className="w-full bg-ink-900 border border-ink-500 rounded-xl px-3 py-2.5 outline-none font-mono text-[14px] ltr-num focus:border-brand-green/70 transition"
                      dir="ltr"
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={isEn ? 500000 : 5000000000}
                    step={isEn ? 1000 : 10000000}
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-full accent-brand-green h-1.5 bg-ink-700 rounded-lg appearance-none cursor-pointer"
                  />
                  {!isEn && principal > 0 && (
                    <div
                      className="text-[11px] text-zinc-500 text-left font-mono"
                      dir="rtl"
                    >
                      {FORMAT_T(principal)}
                    </div>
                  )}
                </div>

                {/* Rate */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[12.5px] font-bold text-zinc-300 light:text-zinc-700 flex items-center gap-2">
                      📈 {d.rate}
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
                      className="w-full bg-ink-900 border border-ink-500 rounded-xl px-3 py-2.5 outline-none font-mono text-[14px] ltr-num focus:border-brand-green/70 transition"
                      dir="ltr"
                    />
                    <div className="absolute top-1/2 -translate-y-1/2 right-4 text-zinc-500 font-bold text-[12px]">
                      %
                    </div>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    step={1}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full accent-brand-green h-1.5 bg-ink-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div
                    className="text-[11px] text-zinc-500 text-left font-mono"
                    dir="rtl"
                  >
                    {rate}% در سال
                  </div>
                </div>

                {/* Years */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[12.5px] font-bold text-zinc-300 light:text-zinc-700 flex items-center gap-2">
                      <IconCalendar size={14} className="text-zinc-400" />
                      {d.years}
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={years}
                      onChange={(e) => setYears(Number(e.target.value))}
                      className="w-full bg-ink-900 border border-ink-500 rounded-xl px-3 py-2.5 outline-none font-mono text-[14px] ltr-num focus:border-brand-green/70 transition"
                      dir="ltr"
                    />
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    step={1}
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full accent-brand-green h-1.5 bg-ink-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div
                    className="text-[11px] text-zinc-500 text-left font-mono"
                    dir="rtl"
                  >
                    {years} سال = {years * 12} ماه
                  </div>
                </div>

                {/* Monthly */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[12.5px] font-bold text-zinc-300 light:text-zinc-700 flex items-center gap-2">
                      💵 {d.monthly}
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={monthly}
                      onChange={(e) => setMonthly(Number(e.target.value))}
                      className="w-full bg-ink-900 border border-ink-500 rounded-xl px-3 py-2.5 outline-none font-mono text-[14px] ltr-num focus:border-brand-green/70 transition"
                      dir="ltr"
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={isEn ? 20000 : 100000000}
                    step={isEn ? 100 : 1000000}
                    value={monthly}
                    onChange={(e) => setMonthly(Number(e.target.value))}
                    className="w-full accent-brand-green h-1.5 bg-ink-700 rounded-lg appearance-none cursor-pointer"
                  />
                  {!isEn && monthly > 0 && (
                    <div
                      className="text-[11px] text-zinc-500 text-left font-mono"
                      dir="rtl"
                    >
                      {FORMAT_T(monthly)} در ماه
                    </div>
                  )}
                </div>

                {/* Compounding Interval */}
                <div className="space-y-3">
                  <label className="text-[12.5px] font-bold text-zinc-300 light:text-zinc-700 flex items-center gap-2">
                    🔄 {d.compoundInterval}
                  </label>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    {["YEARLY", "QUARTERLY", "MONTHLY", "DAILY"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setCompoundFreq(c)}
                        className={`flex-1 min-w-[60px] py-2 px-1 rounded-xl border transition text-center ${compoundFreq === c ? "bg-brand-green text-black border-brand-green font-bold shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)]" : "bg-ink-900 border-ink-500 text-zinc-400 hover:text-white"}`}
                      >
                        {d.intervals[c]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-ink-500 w-full" />

                {/* View Mode */}
                <div className="space-y-3">
                  <label className="text-[12.5px] font-bold text-zinc-300 light:text-zinc-700 flex items-center gap-2">
                    📊 {d.viewMode}
                  </label>
                  <div className="flex gap-2 text-[12px] font-medium bg-ink-900 border border-ink-500 rounded-xl p-1 relative">
                    <button
                      onClick={() => setViewMode("YEARLY")}
                      className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg transition relative z-10 ${viewMode === "YEARLY" ? "text-black" : "text-zinc-400 hover:text-white"}`}
                    >
                      <IconCalendar size={14} /> {d.yearlyView}
                    </button>
                    <button
                      onClick={() => setViewMode("MONTHLY")}
                      className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg transition relative z-10 ${viewMode === "MONTHLY" ? "text-black" : "text-zinc-400 hover:text-white"}`}
                    >
                      <IconCalendar size={14} /> {d.monthlyView}
                    </button>
                    {/* Active highlight */}
                    <div
                      className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-brand-green rounded-lg transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-md"
                      style={{
                        transform:
                          viewMode === "YEARLY"
                            ? "translateX(0)"
                            : isEn
                              ? "translateX(100%)"
                              : "translateX(-100%)",
                        left: !isEn ? "auto" : "4px",
                        right: !isEn ? "4px" : "auto",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top 4 Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="bg-ink-850 light:bg-white border border-ink-500 light:border-zinc-200 rounded-2xl p-4 md:p-5 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden group">
                <IconBarChart
                  size={24}
                  className="text-indigo-400 mb-2 opacity-80 group-hover:scale-110 transition-transform"
                />
                <div className="text-[12.5px] text-zinc-400 mb-1">
                  {d.growthMult}
                </div>
                <div className="text-xl md:text-2xl font-bold font-mono text-indigo-400 tracking-tight ltr-num">
                  {growthMult.toFixed(1)}x
                </div>
              </div>
              <div className="bg-ink-850 light:bg-white border border-ink-500 light:border-zinc-200 rounded-2xl p-4 md:p-5 flex flex-col items-center justify-center text-center shadow-lg group">
                <IconSparkles
                  size={24}
                  className="text-amber-500 mb-2 opacity-80 group-hover:scale-110 transition-transform"
                />
                <div className="text-[12.5px] text-zinc-400 mb-1">
                  {d.netProfit}
                </div>
                <div className="text-xl md:text-2xl font-bold font-mono text-amber-500 tracking-tight ltr-num whitespace-nowrap">
                  {isEn
                    ? `$${formatFullNumber(finalData.interest, "EN")}`
                    : FORMAT_T(finalData.interest)}
                </div>
                {!isEn && finalData.interest >= 1e6 && (
                  <div className="text-[10px] text-zinc-500 mt-0.5">
                    {d.currency}
                  </div>
                )}
              </div>
              <div className="bg-ink-850 light:bg-white border border-ink-500 light:border-zinc-200 rounded-2xl p-4 md:p-5 flex flex-col items-center justify-center text-center shadow-lg group">
                <IconBriefcase
                  size={24}
                  className="text-blue-400 mb-2 opacity-80 group-hover:scale-110 transition-transform"
                />
                <div className="text-[12.5px] text-zinc-400 mb-1">
                  {d.totalInvested}
                </div>
                <div className="text-xl md:text-2xl font-bold font-mono text-blue-400 tracking-tight ltr-num whitespace-nowrap">
                  {isEn
                    ? `$${formatFullNumber(finalData.invested, "EN")}`
                    : FORMAT_T(finalData.invested)}
                </div>
                {!isEn && finalData.invested >= 1e6 && (
                  <div className="text-[10px] text-zinc-500 mt-0.5">
                    {d.currency}
                  </div>
                )}
              </div>
              <div className="bg-ink-850 light:bg-emerald-50 border border-brand-green/30 rounded-2xl p-4 md:p-5 flex flex-col items-center justify-center text-center shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)] group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green/10 to-transparent opacity-50" />
                <IconTrophy
                  size={24}
                  className="text-brand-green mb-2 opacity-90 group-hover:scale-110 transition-transform relative z-10"
                />
                <div className="text-[12.5px] text-zinc-400 mb-1 relative z-10">
                  {d.finalValue}
                </div>
                <div className="text-xl md:text-2xl font-bold font-mono text-brand-green tracking-tight ltr-num whitespace-nowrap relative z-10">
                  {isEn
                    ? `$${formatFullNumber(finalData.balance, "EN")}`
                    : FORMAT_T(finalData.balance)}
                </div>
                {!isEn && finalData.balance >= 1e6 && (
                  <div className="text-[10px] text-zinc-500 mt-0.5 relative z-10">
                    {d.currency}
                  </div>
                )}
              </div>
            </div>

            {/* Chart Area */}
            <div className="bg-ink-850 light:bg-white border border-ink-500 light:border-zinc-200 rounded-2xl p-4 md:p-6 shadow-xl relative mt-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-brand-green rounded-full"></span>
                  <h3 className="text-[16px] font-bold">{d.chartTitle}</h3>
                </div>
                <div className="px-3 py-1 bg-ink-900 border border-ink-500 rounded-lg text-[12px] text-zinc-400">
                  {viewMode === "YEARLY" ? d.yearlyView : d.monthlyView}
                </div>
              </div>

              <div className="h-[300px] md:h-[400px] w-full mt-4" dir="ltr">
                {window.Recharts && (
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={viewData}
                      margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorBalance"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10B981"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10B981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#27272A"
                      />
                      <XAxis
                        dataKey={viewMode === "YEARLY" ? "year" : "month"}
                        tickFormatter={(val) => `${isEn ? "Yr" : "سال"} ${val}`}
                        tick={{
                          fill: "#71717A",
                          fontSize: 11,
                          fontFamily: "JetBrains Mono",
                        }}
                        axisLine={false}
                        tickLine={false}
                        dy={10}
                      />
                      <YAxis
                        tickFormatter={(val) => d3FormatNumber(val, lang)}
                        tick={{
                          fill: "#71717A",
                          fontSize: 11,
                          fontFamily: "JetBrains Mono",
                        }}
                        axisLine={false}
                        tickLine={false}
                        dx={-10}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#141416",
                          border: "1px solid #27272A",
                          borderRadius: "12px",
                          fontFamily: "JetBrains Mono",
                          fontSize: "13px",
                        }}
                        itemStyle={{ color: "#fff" }}
                        formatter={(value, name) => [
                          formatFullNumber(value, lang) +
                            (!isEn ? " تومان" : ""),
                          name === "balance" ? d.balanceLine : d.investedLine,
                        ]}
                        labelFormatter={(label) =>
                          `${viewMode === "YEARLY" ? d.colYear : d.colMonth} ${label}`
                        }
                      />
                      <Legend
                        verticalAlign="top"
                        height={36}
                        iconType="circle"
                        formatter={(value) => (
                          <span className="text-zinc-300 text-[13px] ml-1 font-sans">
                            {value === "balance"
                              ? d.balanceLine
                              : d.investedLine}
                          </span>
                        )}
                      />
                      <Line
                        type="monotone"
                        dataKey="invested"
                        name="invested"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        dot={false}
                      />
                      <Area
                        type="monotone"
                        dataKey="balance"
                        name="balance"
                        stroke="#10b981"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorBalance)"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Breakdown Table */}
            <div className="bg-ink-850 light:bg-white border border-ink-500 light:border-zinc-200 rounded-2xl shadow-xl overflow-hidden mt-6">
              <div className="px-5 py-4 border-b border-ink-500 light:border-zinc-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-brand-green rounded-full"></span>
                  <h3 className="text-[16px] font-bold">
                    {d.tableTitle}{" "}
                    {viewMode === "YEARLY" ? d.yearlyView : d.monthlyView}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={exportPDF}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ink-700 hover:bg-ink-600 text-zinc-300 text-[12px] transition"
                  >
                    <IconDownload size={14} /> {d.exportPDF}
                  </button>
                  <button
                    onClick={exportExcel}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ink-700 hover:bg-ink-600 text-zinc-300 text-[12px] transition"
                  >
                    <IconTable size={14} /> {d.exportExcel}
                  </button>
                  <button
                    onClick={exportCSV}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-[12px] transition"
                  >
                    <IconTable size={14} /> {d.exportSheets}
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-ink-500">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead className="bg-ink-900 light:bg-zinc-100 sticky top-0 z-10">
                    <tr>
                      <th
                        className={`py-3 px-4 text-zinc-400 font-bold text-[13px] border-b border-ink-500 ${!isEn ? "text-right" : ""}`}
                      >
                        {viewMode === "YEARLY" ? d.colYear : d.colMonth}
                      </th>
                      <th
                        className={`py-3 px-4 text-zinc-400 font-bold text-[13px] border-b border-ink-500 ${!isEn ? "text-right" : ""}`}
                      >
                        {d.colInvested}
                      </th>
                      <th
                        className={`py-3 px-4 text-zinc-400 font-bold text-[13px] border-b border-ink-500 ${!isEn ? "text-right" : ""}`}
                      >
                        {d.colTotal}
                      </th>
                      <th
                        className={`py-3 px-4 text-zinc-400 font-bold text-[13px] border-b border-ink-500 ${!isEn ? "text-right" : ""}`}
                      >
                        {d.colProfit}
                      </th>
                      <th
                        className={`py-3 px-4 text-zinc-400 font-bold text-[13px] border-b border-ink-500 ${!isEn ? "text-right" : ""}`}
                      >
                        {d.colGrowth}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-500/50 ltr-num font-mono text-[13px]">
                    {viewData.map((r, i) => (
                      <tr
                        key={i}
                        className="hover:bg-ink-800/50 light:hover:bg-zinc-50 transition"
                      >
                        <td
                          className={`py-3 px-4 font-sans font-bold text-zinc-300 ${!isEn ? "text-right" : ""}`}
                        >
                          {viewMode === "YEARLY"
                            ? r.year === 0
                              ? d.start
                              : `${d.yearLabel} ${r.year}`
                            : r.month === 0
                              ? d.start
                              : `${d.monthLabel} ${r.month}`}
                        </td>
                        <td
                          className={`py-3 px-4 text-blue-400 ${!isEn ? "text-right" : ""}`}
                        >
                          {isEn ? "$" : ""}
                          {formatFullNumber(r.invested, lang)}{" "}
                          {!isEn && r.year === 0 ? "ت" : !isEn ? " ت" : ""}
                        </td>
                        <td
                          className={`py-3 px-4 text-brand-green font-bold ${!isEn ? "text-right" : ""}`}
                        >
                          {isEn ? "$" : ""}
                          {formatFullNumber(r.balance, lang)}{" "}
                          {!isEn && r.year === 0 ? "ت" : !isEn ? " ت" : ""}
                        </td>
                        <td
                          className={`py-3 px-4 text-amber-500 ${!isEn ? "text-right" : ""}`}
                        >
                          +{isEn ? "$" : ""}
                          {formatFullNumber(r.interest, lang)}{" "}
                          {!isEn && r.year === 0 ? "ت" : !isEn ? " ت" : ""}
                        </td>
                        <td
                          className={`py-3 px-4 text-indigo-400 font-bold ${!isEn ? "text-right" : ""}`}
                        >
                          {(r.balance / (r.invested || 1)).toFixed(2)}x
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  PageShell ? (
    <PageShell slug="compound-calc">
      <CompoundCalcApp />
    </PageShell>
  ) : (
    <CompoundCalcApp />
  ),
);

export { d3FormatNumber, formatFullNumber, DICT, IconTrophy, IconBriefcase, IconSparkles, IconBarChart, IconDownload, IconTable, IconCalendar, IconMoney, FORMAT_T, CompoundCalcApp };
