import * as Recharts from 'recharts';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { motion, AnimatePresence } from 'motion/react';

// =====================================================================
// داده پادکست‌ها — Bilingual Podcast Data
// =====================================================================

const PODCAST_SHOWS = [
  { id: 'eqa', titleFa: 'اقتصاد دستوری و آزاد', titleEn: 'Command vs Free Economy', hostFa: 'دکتر امیر حسینی و فرشاد ملک', hostEn: 'Dr. Amir Hosseini & Farshad Malek', tagFa: 'هفتگی', tagEn: 'Weekly', episodes: 24, color: 'from-brand-redDark to-[#7a1923]' },
  { id: 'msm', titleFa: 'مسیر هوشمند سرمایه', titleEn: 'Smart Capital Path',   hostFa: 'لیلا کاظمی', hostEn: 'Leila Kazemi',                    tagFa: 'گزارش', tagEn: 'Report',  episodes: 18, color: 'from-emerald-700 to-emerald-950' },
  { id: 'tnf', titleFa: 'تورم، نرخ بهره، آینده', titleEn: 'Inflation, Rates, Future', hostFa: 'تیم تحلیل اکوآذرین', hostEn: 'EcoAzarin Analyst Team',           tagFa: 'لایو', tagEn: 'Live',   episodes: 12, color: 'from-amber-700 to-amber-950' },
  { id: 'apf', titleFa: 'الفبای پرتفوی شخصی', titleEn: 'Personal Portfolio Basics',    hostFa: 'مهدی شریفی', hostEn: 'Mehdi Sharifi',                    tagFa: 'مدرسه', tagEn: 'School', episodes: 8,  color: 'from-indigo-700 to-indigo-950' },
];

const PODCAST_EPISODES = [
  { num: 24, showFa: 'اقتصاد دستوری و آزاد', showEn: 'Command vs Free Economy', titleFa: 'مرز قیمت‌گذاری دولتی و بازار آزاد در ایران', titleEn: 'Government Price Controls vs Free Market in Iran', dateFa: '۲ روز قبل', dateEn: '2 days ago', durationFa: '۴۸:۲۰', durationEn: '48:20', playsFa: '۱۸٬۴۰۰', playsEn: '18,400', tagFa: 'هفتگی', tagEn: 'Weekly', live: false, featured: true, tag: 'هفتگی' },
  { num: 23, showFa: 'اقتصاد دستوری و آزاد', showEn: 'Command vs Free Economy', titleFa: 'پنج کلاس دارایی پربازده اردیبهشت — بررسی کامل', titleEn: 'Five High-Yield Asset Classes in Past Month - Comprehensive Review',  dateFa: '۹ روز قبل', dateEn: '9 days ago', durationFa: '۳۲:۰۵', durationEn: '32:05', playsFa: '۱۲٬۲۰۰', playsEn: '12,200', tagFa: 'هفتگی', tagEn: 'Weekly', live: false, tag: 'هفتگی' },
  { num: 7,  showFa: 'تورم، نرخ بهره، آینده', showEn: 'Inflation, Rates, Future', titleFa: 'سیاست جدید بانک مرکزی و اثر آن بر سپرده‌ها', titleEn: 'New Central Bank Policies and Their Impact on Deposits',  dateFa: 'لایو • شنبه ۲۰:۳۰', dateEn: 'LIVE • Sat 20:30', durationFa: 'پخش زنده', durationEn: 'LIVE', playsFa: '—', playsEn: '—', tagFa: 'لایو', tagEn: 'Live', live: true, tag: 'لایو' },
  { num: 18, showFa: 'مسیر هوشمند سرمایه', showEn: 'Smart Capital Path',   titleFa: 'گزارش فصلی — صنعت پتروشیمی در فصل تابستان', titleEn: 'Quarterly Report - Petrochemical Industry in Summer',     dateFa: '۱ هفته قبل', dateEn: '1 week ago',  durationFa: '۲۵:۴۰', durationEn: '25:40', playsFa: '۹٬۸۰۰', playsEn: '9,800', tagFa: 'گزارش', tagEn: 'Report', live: false, tag: 'گزارش' },
  { num: 8,  showFa: 'الفبای پرتفوی شخصی', showEn: 'Personal Portfolio Basics',    titleFa: 'تنوع‌بخشی واقعی — درس سوم دوره مدرسه', titleEn: 'True Diversification - Personal Finance School Lesson 3',         dateFa: '۲ هفته قبل', dateEn: '2 weeks ago', durationFa: '۲۸:۱۰', durationEn: '28:10', playsFa: '۴٬۸۰۰', playsEn: '4,800', tagFa: 'مدرسه', tagEn: 'School', live: false, tag: 'مدرسه' },
  { num: 22, showFa: 'اقتصاد دستوری و آزاد', showEn: 'Command vs Free Economy', titleFa: 'گفت‌وگو با مدیر یک صندوق پوشش ریسک ایرانی', titleEn: 'Interview with the Manager of an Iranian Hedge Fund',     dateFa: '۲ هفته قبل', dateEn: '2 weeks ago', durationFa: '۵۲:۳۰', durationEn: '52:30', playsFa: '۹٬۱۰۰', playsEn: '9,100', tagFa: 'ویژه', tagEn: 'Special', live: false, tag: 'ویژه' },
  { num: 17, showFa: 'مسیر هوشمند سرمایه', showEn: 'Smart Capital Path',   titleFa: 'کلاس دارایی طلا در سبد پرتفوی شخصی', titleEn: 'Gold Asset Class in Personal Portfolios',           dateFa: '۳ هفته قبل', dateEn: '3 weeks ago', durationFa: '۲۲:۱۵', durationEn: '22:15', playsFa: '۷٬۴۰۰', playsEn: '7,400', tagFa: 'گزارش', tagEn: 'Report', live: false, tag: 'گزارش' },
  { num: 7,  showFa: 'الفبای پرتفوی شخصی', showEn: 'Personal Portfolio Basics',    titleFa: 'ریسک سیستماتیک و غیرسیستماتیک — درس دوم', titleEn: 'Systematic vs Non-Systematic Risk - Lesson 2',       dateFa: '۳ هفته قبل', dateEn: '3 weeks ago', durationFa: '۲۶:۴۰', durationEn: '26:40', playsFa: '۳٬۹۰۰', playsEn: '3,900', tagFa: 'مدرسه', tagEn: 'School', live: false, tag: 'مدرسه' },
  { num: 21, showFa: 'اقتصاد دستوری و آزاد', showEn: 'Command vs Free Economy', titleFa: 'صندوق‌های قابل معامله — راهنمای سرمایه‌گذار تازه‌کار', titleEn: 'ETFs - A Beginner\'s Guide to Exchange Traded Funds', dateFa: '۱ ماه قبل', dateEn: '1 month ago', durationFa: '۴۲:۱۰', durationEn: '42:10', playsFa: '۸٬۲۰۰', playsEn: '8,200', tagFa: 'هفتگی', tagEn: 'Weekly', live: false, tag: 'هفتگی' },
];

const PODCAST_CATEGORIES = [
  { id: 'all',     labelFa: 'همه قسمت‌ها', labelEn: 'All Episodes' },
  { id: 'هفتگی',  labelFa: 'برنامه هفتگی', labelEn: 'Weekly Show' },
  { id: 'لایو',    labelFa: 'پخش زنده', labelEn: 'Live Broadcast' },
  { id: 'مدرسه',  labelFa: 'مدرسه اقتصاد', labelEn: 'Finance School' },
  { id: 'گزارش',   labelFa: 'گزارش‌ها', labelEn: 'Reports' },
  { id: 'ویژه',    labelFa: 'گفت‌وگوی ویژه', labelEn: 'Special Feature' },
];

const PODCAST_HOSTS = [
  { nameFa: 'دکتر امیر حسینی', nameEn: 'Dr. Amir Hosseini', roleFa: 'اقتصاددان مهمان', roleEn: 'Guest Economist', shows: 12 },
  { nameFa: 'فرشاد ملک', nameEn: 'Farshad Malek', roleFa: 'سردبیر اکوآذرین', roleEn: 'Chief Editor of EcoAzarin', shows: 24 },
  { nameFa: 'لیلا کاظمی', nameEn: 'Leila Kazemi', roleFa: 'تحلیلگر بازار', roleEn: 'Market Analyst', shows: 18 },
  { nameFa: 'مهدی شریفی', nameEn: 'Mehdi Sharifi', roleFa: 'مدرس مدرسه اقتصاد', roleEn: 'Finance Academy Lecturer', shows: 8 },
];

const PODCAST_PLATFORMS = [
  { name: 'Spotify',     hint: 'spotify.com/eco-azarin' },
  { name: 'Apple Podcasts', hint: 'apple.co/eco-azarin' },
  { name: 'Castbox',     hint: 'castbox.fm/eco-azarin' },
  { name: 'RSS',         hint: 'feed.eco-azarin.ir' },
];

window.PODCAST_SHOWS = PODCAST_SHOWS;
window.PODCAST_EPISODES = PODCAST_EPISODES;
window.PODCAST_CATEGORIES = PODCAST_CATEGORIES;
window.PODCAST_HOSTS = PODCAST_HOSTS;
window.PODCAST_PLATFORMS = PODCAST_PLATFORMS;

export { PODCAST_SHOWS, PODCAST_EPISODES, PODCAST_CATEGORIES, PODCAST_HOSTS, PODCAST_PLATFORMS };
