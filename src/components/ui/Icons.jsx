import * as Recharts from 'recharts';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { motion, AnimatePresence } from 'motion/react';

// =====================================================================
// آیکون‌ها — SVG اختصاصی (سبک خطی، استروک نازک، گوشه گرد)
// همه آیکون‌ها رنگ stroke را از currentColor می‌گیرند
// =====================================================================

const Svg = ({ children, size = 20, className = "", strokeWidth = 1.6 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

// لوگوی برند
const BrandMark = ({ size = 48, className = "" }) => (
  <div
    className={`brand-mark-container inline-flex flex-shrink-0 items-center justify-center ${className}`}
  >
    <img
      src="/uploads/logo-dark.png"
      alt="EcoAzarin Logo"
      style={{ height: size, width: "auto", maxWidth: "200px", objectFit: "contain" }}
      className="logo-dark"
    />
    <img
      src="/uploads/logo-light.png"
      alt="EcoAzarin Logo"
      style={{ height: size, width: "auto", maxWidth: "200px", objectFit: "contain" }}
      className="logo-light"
    />
  </div>
);

// آیکون‌های دسته‌بندی (تب‌ها)
const IconNewspaper = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="15" height="14" rx="1.5" />
    <path d="M18 8h3v8a3 3 0 0 1-3 3" />
    <path d="M6 9h9M6 12h9M6 15h6" />
  </Svg>
);
const IconGradCap = (p) => (
  <Svg {...p}>
    <path d="M2 9 L12 4 L22 9 L12 14 Z" />
    <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    <path d="M22 9v5" />
  </Svg>
);
const IconWrench = (p) => (
  <Svg {...p}>
    <path d="M14.7 6.3a4 4 0 0 0 5.5 5.5L21.5 14l-7 7L4 10.5 5 9.5l3.7 3.7a4 4 0 0 1 0-5.7l4-4a4 4 0 0 1 4 0z" />
  </Svg>
);
const IconBox = (p) => (
  <Svg {...p}>
    <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" />
    <path d="M3 7.5 12 12m0 9V12m9-4.5L12 12" />
  </Svg>
);
const IconBook = (p) => (
  <Svg {...p}>
    <path d="M4 4h10a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z" />
    <path d="M4 16a4 4 0 0 1 4-4h10" />
    <path d="M8 8h6M8 11h4" />
  </Svg>
);
const IconDoc = (p) => (
  <Svg {...p}>
    <path d="M6 3h8l5 5v13H6z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6M9 16h4" />
  </Svg>
);
const IconMic = (p) => (
  <Svg {...p}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0" />
    <path d="M12 18v3M9 21h6" />
  </Svg>
);

const IconHome = (p) => (
  <Svg {...p}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </Svg>
);

const IconSearch = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Svg>
);
const IconBell = (p) => (
  <Svg {...p}>
    <path d="M6 9a6 6 0 1 1 12 0c0 6 2 7 2 7H4s2-1 2-7" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </Svg>
);
const IconMenu = (p) => (
  <Svg {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </Svg>
);
const IconClose = (p) => (
  <Svg {...p}>
    <path d="M6 6 18 18M18 6 6 18" />
  </Svg>
);
const IconArrowUp = (p) => (
  <Svg {...p}>
    <path d="M7 17 17 7M9 7h8v8" />
  </Svg>
);
const IconChevronRight = (p) => (
  <Svg {...p}>
    <path d="m9 6 6 6-6 6" />
  </Svg>
);
const IconChevronLeft = (p) => (
  <Svg {...p}>
    <path d="m15 6-6 6 6 6" />
  </Svg>
);
const IconPlay = (p) => (
  <Svg {...p}>
    <path d="M7 5v14l12-7z" fill="currentColor" stroke="none" />
  </Svg>
);
const IconHeadphones = (p) => (
  <Svg {...p}>
    <path d="M3 14a9 9 0 1 1 18 0v4a2 2 0 0 1-2 2h-2v-7h4" />
    <path d="M3 14v4a2 2 0 0 0 2 2h2v-7H3" />
  </Svg>
);
const IconEye = (p) => (
  <Svg {...p}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </Svg>
);
const IconClock = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
);
const IconArrowDownRight = (p) => (
  <Svg {...p}>
    <path d="M7 7v10h10" />
    <path d="m7 7 10 10" />
  </Svg>
);
const IconTrendUp = (p) => (
  <Svg {...p}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </Svg>
);
const IconTrendDown = (p) => (
  <Svg {...p}>
    <path d="m4 7 6 6 4-4 6 7" />
    <path d="M14 16h6v-6" />
  </Svg>
);
const IconMail = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Svg>
);
const IconInstagram = (p) => (
  <Svg {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
  </Svg>
);
const IconTelegram = (p) => (
  <Svg {...p}>
    <path d="M21 4 2 11l6 2 2 6 4-4 5 5z" />
    <path d="M8 13 18 6" />
  </Svg>
);
const IconYoutube = (p) => (
  <Svg {...p}>
    <rect x="2" y="6" width="20" height="12" rx="3" />
    <path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" />
  </Svg>
);
const IconLive = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
    <path d="M5 12a7 7 0 0 1 14 0" />
    <path d="M2 12a10 10 0 0 1 20 0" />
  </Svg>
);
const IconSparkle = (p) => (
  <Svg {...p}>
    <path d="M12 4v6M9 7h6M5 14l2-1 1-2 1 2 2 1-2 1-1 2-1-2zM17 17l1.5-.7.7-1.5.7 1.5L21 17l-1.5.7-.7 1.5-.7-1.5z" />
  </Svg>
);
const IconArrowLeft = (p) => (
  <Svg {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Svg>
);

// ایلاستریشن‌ها (ساده، هماهنگ با برند)
const IllustMan = ({ className = "" }) => (
  <svg
    viewBox="0 0 200 160"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* coins stack */}
    <ellipse cx="148" cy="118" rx="28" ry="6" fill="#10B981" opacity=".25" />
    <rect
      x="120"
      y="100"
      width="56"
      height="14"
      rx="7"
      fill="#10B981"
      opacity=".35"
    />
    <rect
      x="120"
      y="88"
      width="56"
      height="14"
      rx="7"
      fill="#10B981"
      opacity=".55"
    />
    <rect x="120" y="76" width="56" height="14" rx="7" fill="#10B981" />
    <text
      x="148"
      y="86"
      textAnchor="middle"
      fontSize="9"
      fill="#0A0A0A"
      fontWeight="700"
    >
      $
    </text>

    {/* body — cross-legged */}
    <ellipse cx="62" cy="138" rx="46" ry="6" fill="#000" opacity=".35" />
    <path d="M30 130 Q40 100 62 100 Q84 100 94 130 Z" fill="#10B981" />
    <path
      d="M28 132 q14 -6 36 -6 q22 0 34 6"
      stroke="#0A0A0A"
      strokeWidth="1"
      fill="none"
    />

    {/* arms / laptop */}
    <rect
      x="36"
      y="96"
      width="56"
      height="22"
      rx="3"
      fill="#1A1A1C"
      stroke="#27272A"
    />
    <rect
      x="40"
      y="100"
      width="48"
      height="14"
      rx="2"
      fill="#10B981"
      opacity=".25"
    />
    <path d="M36 116 H 92" stroke="#27272A" />

    {/* head */}
    <circle cx="62" cy="74" r="16" fill="#E0C9A6" />
    <path
      d="M48 70 q4 -16 14 -16 q10 0 14 14 q-2 -2 -14 -2 q-12 0 -14 4"
      fill="#1A1A1C"
    />
    <circle cx="56" cy="76" r="1.4" fill="#1A1A1C" />
    <circle cx="68" cy="76" r="1.4" fill="#1A1A1C" />
    <path
      d="M58 82 q4 3 8 0"
      stroke="#1A1A1C"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);

const IllustSearch = ({ className = "" }) => (
  <svg
    viewBox="0 0 120 120"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle
      cx="50"
      cy="50"
      r="32"
      stroke="#E63946"
      strokeWidth="3"
      fill="none"
    />
    <circle
      cx="50"
      cy="50"
      r="24"
      stroke="#27272A"
      strokeWidth="1"
      fill="#141416"
    />
    <path d="M50 38 v24 M38 50 h24" stroke="#A1A1AA" strokeWidth="1.5" />
    <line
      x1="74"
      y1="74"
      x2="100"
      y2="100"
      stroke="#E63946"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <circle cx="92" cy="22" r="3" fill="#10B981" />
    <circle cx="20" cy="92" r="2" fill="#E63946" />
  </svg>
);

// people silhouettes for podcast hero
const PodcastDuo = ({ className = "" }) => (
  <svg
    viewBox="0 0 400 320"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="220" cy="170" r="160" fill="#FFFFFF" opacity="0.95" />
    {/* person 1 */}
    <g>
      <ellipse cx="160" cy="200" rx="48" ry="60" fill="#1A1A1C" />
      <circle cx="160" cy="120" r="34" fill="#3a2a22" />
      <path
        d="M132 116 q4 -20 28 -20 q22 0 28 20 q-2 -2 -28 -2 q-26 0 -28 2"
        fill="#1A1A1C"
      />
      <ellipse
        cx="148"
        cy="124"
        rx="6"
        ry="5"
        fill="none"
        stroke="#1A1A1C"
        strokeWidth="2"
      />
      <ellipse
        cx="170"
        cy="124"
        rx="6"
        ry="5"
        fill="none"
        stroke="#1A1A1C"
        strokeWidth="2"
      />
      <path d="M154 124 h10" stroke="#1A1A1C" strokeWidth="2" />
    </g>
    {/* person 2 */}
    <g>
      <ellipse cx="260" cy="210" rx="52" ry="70" fill="#1A1A1C" />
      <circle cx="260" cy="124" r="36" fill="#4a352b" />
      <path
        d="M230 122 q6 -22 30 -22 q24 0 30 22 q-2 -3 -30 -3 q-28 0 -30 3"
        fill="#1A1A1C"
      />
      <ellipse
        cx="248"
        cy="128"
        rx="6"
        ry="5"
        fill="none"
        stroke="#1A1A1C"
        strokeWidth="2"
      />
      <ellipse
        cx="270"
        cy="128"
        rx="6"
        ry="5"
        fill="none"
        stroke="#1A1A1C"
        strokeWidth="2"
      />
      <path d="M254 128 h10" stroke="#1A1A1C" strokeWidth="2" />
      {/* smile */}
      <path
        d="M250 144 q10 6 20 0"
        stroke="#1A1A1C"
        strokeWidth="2"
        fill="none"
      />
    </g>
  </svg>
);

const IconBookmark = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
);

const IconShare2 = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);

const TAB_ICON = {
  home: IconHome,
  news: IconNewspaper,
  journal: IconDoc,
  charts: IconTrendUp,
  articles: IconBook,
  podcasts: IconMic,
  products: IconBox,
  tools: IconWrench,
  education: IconGradCap,
  edu: IconGradCap,
  newspaper: IconNewspaper,
  cap: IconGradCap,
  wrench: IconWrench,
  box: IconBox,
  book: IconBook,
  doc: IconDoc,
  mic: IconMic,
};

Object.assign(window, {
  Svg,
  BrandMark,
  TAB_ICON,
  IconHome,
  IconSearch,
  IconBell,
  IconMenu,
  IconClose,
  IconArrowUp,
  IconChevronRight,
  IconChevronLeft,
  IconBookmark,
  IconShare2,
  IconPlay,
  IconHeadphones,
  IconEye,
  IconClock,
  IconArrowDownRight,
  IconTrendUp,
  IconTrendDown,
  IconMail,
  IconInstagram,
  IconTelegram,
  IconYoutube,
  IconLive,
  IconSparkle,
  IconArrowLeft,
  IllustMan,
  IllustSearch,
  PodcastDuo,
});

export { Svg, BrandMark, IconNewspaper, IconGradCap, IconWrench, IconBox, IconBook, IconDoc, IconMic, IconHome, IconSearch, IconBell, IconMenu, IconClose, IconArrowUp, IconChevronRight, IconChevronLeft, IconPlay, IconHeadphones, IconEye, IconClock, IconArrowDownRight, IconTrendUp, IconTrendDown, IconMail, IconInstagram, IconTelegram, IconYoutube, IconLive, IconSparkle, IconArrowLeft, IllustMan, IllustSearch, PodcastDuo, IconBookmark, IconShare2, TAB_ICON };
