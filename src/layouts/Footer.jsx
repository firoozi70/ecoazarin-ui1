import * as Recharts from 'recharts';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { motion, AnimatePresence } from 'motion/react';
import { BrandMark, IconInstagram, IconTelegram, IconYoutube, IconMail } from '../components/ui/Icons';
import { useLangRefresh } from '../i18n';



// ---------- بخش قابل جمع‌شدن فوتر ----------
const FooterSection = ({ title, children, defaultOpen = false, className }) => {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div
      className={
        className ||
        "md:col-span-2 lg:col-span-2 border-b border-ink-500 md:border-0 py-3 md:py-0"
      }
    >
      <button
        type="button"
        className="flex items-center justify-between w-full md:hidden text-[13px] font-bold"
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform text-zinc-500 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <h4 className="hidden md:block text-[13px] font-bold mb-3">{title}</h4>
      <div className={`mt-3 md:mt-0 ${open ? "block" : "hidden md:block"}`}>
        {children}
      </div>
    </div>
  );
};

// ---------- فوتر ----------
const Footer = () => {
  useLangRefresh();
  const isEn = window.__ECO_LANG === 'EN';

  return (
  <footer className="border-t border-ink-500 bg-ink-850 mt-12">
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8 md:py-14 grid gap-0 md:gap-8 md:grid-cols-6 lg:grid-cols-12 content-start">
      <div className="md:col-span-6 lg:col-span-3 pb-6 md:pb-8 lg:pb-0 border-b border-ink-500 md:border-0 mb-2 md:mb-0">
        <div className="flex items-center gap-2.5">
          <BrandMark size={44} />
          <div>
            <div className="text-[16px] font-bold">Eco Azarin</div>
            <div className="text-[11px] text-zinc-500">{isEn ? 'Smart Capital Path' : 'مسیر هوشمند سرمایه'}</div>
          </div>
        </div>
        <p className="mt-4 text-[12px] text-zinc-400 leading-7 max-w-sm">
          {isEn ? 'EcoAzarin, an independent analytic platform for the capital, currency, gold, and crypto markets in Iran.' : 'اکوآذرین، رسانه و پلتفرم تحلیلی مستقل برای فعالان بازار سرمایه، ارز، طلا و کریپتو در ایران.'}
        </p>
        <div className="mt-5 flex items-center gap-2">
          {[
            { Icon: IconInstagram, label: "Instagram" },
            { Icon: IconTelegram, label: "Telegram" },
            { Icon: IconYoutube, label: "Youtube" },
            { Icon: IconMail, label: "Email" },
          ].map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="h-9 w-9 rounded-lg border border-ink-500 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-400 transition"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>

      {[
        { t: isEn ? "Content" : "محتوا", l: [{text: isEn?"News":"اخبار", href:"/news.html"}, {text:isEn?"Articles":"مقالات", href:"/articles.html"}, {text:isEn?"Podcasts":"پادکست", href:"/podcasts.html"}, {text:isEn?"Journal":"ژورنال نویسی", href:"/journal.html"}] },
        { t: isEn ? "Product" : "محصول", l: [{text:isEn?"Tools":"ابزارها", href:"/tools.html"}, {text:isEn?"API / Developers":"توسعه‌دهندگان", href:"/developers.html"}, {text:isEn?"Education":"آموزش", href:"/education.html"}, {text:isEn?"Charts":"چارت‌ها", href:"/charts.html"}] },
        { t: isEn ? "Company" : "شرکت", l: [{text:isEn?"About Us":"درباره ما", href:"/about.html"}, {text:isEn?"Contact Us":"تماس با ما", href:"/contact.html"}, {text:isEn?"Careers":"استخدام", href:"/careers.html"}, {text:isEn?"Privacy & Policy":"حریم خصوصی", href:"/privacy.html"}] },
      ].map((c) => (
        <FooterSection key={c.t} title={c.t}>
          <ul className="space-y-2 mb-2 md:mb-0">
            {c.l.map((i) => (
              <li key={i.text}>
                <a
                  href={i.href}
                  className="text-[12px] text-zinc-400 hover:text-white transition"
                >
                  {i.text}
                </a>
              </li>
            ))}
          </ul>
        </FooterSection>
      ))}

      <FooterSection
        title={isEn ? "Newsletter" : "خبرنامه"}
        defaultOpen={true}
        className="md:col-span-6 lg:col-span-3 border-b border-ink-500 md:border-0 py-3 md:py-0 mt-2 md:mt-6 lg:mt-0"
      >
        <p className="text-[11px] text-zinc-500 mb-3 leading-6 mt-1 md:mt-0">
          {isEn ? 'Once a week, only the essentials.' : 'یک‌بار در هفته، تنها مهم‌ترین‌ها.'}
        </p>
        <div className="flex items-center bg-ink-900 border border-ink-500 rounded-lg overflow-hidden max-w-full md:max-w-[400px] lg:max-w-xs focus-within:border-brand-green/60 transition-colors">
          <input
            type="email"
            placeholder={isEn ? "Your email" : "ایمیل شما"}
            aria-label={isEn ? "Email" : "ایمیل"}
            className="bg-transparent min-w-0 flex-1 h-9 px-3 text-[12px] outline-none placeholder:text-zinc-600 block w-full ms-2"
          />
          <button className="shrink-0 h-9 px-4 bg-brand-green text-black text-[12px] font-medium hover:bg-brand-greenSoft transition whitespace-nowrap">
            {isEn ? "Subscribe" : "عضویت"}
          </button>
        </div>
      </FooterSection>
    </div>
    <div className="border-t border-ink-500">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-zinc-500">
        <div>{isEn ? '© 2026 EcoAzarin — All rights reserved.' : '© ۱۴۰۵ اکوآذرین — تمامی حقوق محفوظ است.'}</div>
        <div className="flex items-center gap-4">
          <a href="/terms.html" className="hover:text-white transition">
            {isEn ? 'Terms' : 'قوانین'}
          </a>
          <a href="/privacy.html" className="hover:text-white transition">
            {isEn ? 'Privacy' : 'حریم خصوصی'}
          </a>
          <a href="/cookies.html" className="hover:text-white transition">
            {isEn ? 'Cookies' : 'کوکی‌ها'}
          </a>
        </div>
      </div>
    </div>
  </footer>
  );
};

Object.assign(window, { Footer, FooterSection });

export { FooterSection, Footer };
