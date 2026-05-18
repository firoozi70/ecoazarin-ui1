import * as Recharts from 'recharts';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { motion, AnimatePresence } from 'motion/react';

// =====================================================================
// داده پادکست‌ها
// =====================================================================

const PODCAST_SHOWS = [
  { id: 'eqa', title: 'اقتصاد دستوری و آزاد', host: 'دکتر امیر حسینی و فرشاد ملک', tag: 'هفتگی', episodes: 24, color: 'from-brand-redDark to-[#7a1923]' },
  { id: 'msm', title: 'مسیر هوشمند سرمایه',   host: 'لیلا کاظمی',                    tag: 'گزارش',  episodes: 18, color: 'from-emerald-700 to-emerald-900' },
  { id: 'tnf', title: 'تورم، نرخ بهره، آینده', host: 'تیم تحلیل اکوآذرین',           tag: 'لایو',   episodes: 12, color: 'from-amber-700 to-amber-900' },
  { id: 'apf', title: 'الفبای پرتفوی شخصی',    host: 'مهدی شریفی',                    tag: 'مدرسه', episodes: 8,  color: 'from-indigo-700 to-indigo-900' },
];

const PODCAST_EPISODES = [
  { num: 24, show: 'اقتصاد دستوری و آزاد', title: 'مرز قیمت‌گذاری دولتی و بازار آزاد در ایران', date: '۲ روز قبل', duration: '۴۸:۲۰', plays: '۱۸٬۴۰۰', tag: 'هفتگی', live: false, featured: true },
  { num: 23, show: 'اقتصاد دستوری و آزاد', title: 'پنج کلاس دارایی پربازده اردیبهشت — بررسی کامل',  date: '۹ روز قبل', duration: '۳۲:۰۵', plays: '۱۲٬۲۰۰', tag: 'هفتگی', live: false },
  { num: 7,  show: 'تورم، نرخ بهره، آینده', title: 'سیاست جدید بانک مرکزی و اثر آن بر سپرده‌ها',  date: 'لایو • شنبه ۲۰:۳۰', duration: 'پخش زنده', plays: '—', tag: 'لایو', live: true },
  { num: 18, show: 'مسیر هوشمند سرمایه',   title: 'گزارش فصلی — صنعت پتروشیمی در فصل تابستان',     date: '۱ هفته قبل',  duration: '۲۵:۴۰', plays: '۹٬۸۰۰', tag: 'گزارش', live: false },
  { num: 8,  show: 'الفبای پرتفوی شخصی',    title: 'تنوع‌بخشی واقعی — درس سوم دوره مدرسه',         date: '۲ هفته قبل', duration: '۲۸:۱۰', plays: '۴٬۸۰۰', tag: 'مدرسه', live: false },
  { num: 22, show: 'اقتصاد دستوری و آزاد', title: 'گفت‌وگو با مدیر یک صندوق پوشش ریسک ایرانی',     date: '۲ هفته قبل', duration: '۵۲:۳۰', plays: '۹٬۱۰۰', tag: 'ویژه', live: false },
  { num: 17, show: 'مسیر هوشمند سرمایه',   title: 'کلاس دارایی طلا در سبد پرتفوی شخصی',           date: '۳ هفته قبل', duration: '۲۲:۱۵', plays: '۷٬۴۰۰', tag: 'گزارش', live: false },
  { num: 7,  show: 'الفبای پرتفوی شخصی',    title: 'ریسک سیستماتیک و غیرسیستماتیک — درس دوم',       date: '۳ هفته قبل', duration: '۲۶:۴۰', plays: '۳٬۹۰۰', tag: 'مدرسه', live: false },
  { num: 21, show: 'اقتصاد دستوری و آزاد', title: 'صندوق‌های قابل معامله — راهنمای سرمایه‌گذار تازه‌کار', date: '۱ ماه قبل', duration: '۴۲:۱۰', plays: '۸٬۲۰۰', tag: 'هفتگی', live: false },
];

const PODCAST_CATEGORIES = [
  { id: 'all',     label: 'همه قسمت‌ها' },
  { id: 'هفتگی',  label: 'برنامه هفتگی' },
  { id: 'لایو',    label: 'پخش زنده' },
  { id: 'مدرسه',  label: 'مدرسه اقتصاد' },
  { id: 'گزارش',   label: 'گزارش‌ها' },
  { id: 'ویژه',    label: 'گفت‌وگوی ویژه' },
];

const PODCAST_HOSTS = [
  { name: 'دکتر امیر حسینی', role: 'اقتصاددان مهمان', shows: 12 },
  { name: 'فرشاد ملک', role: 'سردبیر اکوآذرین', shows: 24 },
  { name: 'لیلا کاظمی', role: 'تحلیلگر بازار', shows: 18 },
  { name: 'مهدی شریفی', role: 'مدرس مدرسه اقتصاد', shows: 8 },
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
