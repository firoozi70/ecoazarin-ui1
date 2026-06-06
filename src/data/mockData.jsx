import * as Recharts from 'recharts';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { motion, AnimatePresence } from 'motion/react';

// =====================================================================
// داده‌های ماک — همه استاتیک
// =====================================================================

const TICKER_DATA = [
  { sym: 'XAU/USD',  price: '2,341.50', change: '+0.62',  dir: 'up'   },
  { sym: 'BTC/USD',  price: '68,210',   change: '-1.04',  dir: 'down' },
  { sym: 'USD/JPY',  price: '154.88',   change: '-0.05',  dir: 'down' },
  { sym: 'GBP/USD',  price: '1.2511',   change: '+0.21',  dir: 'up'   },
  { sym: 'EUR/USD',  price: '1.0854',   change: '+0.18',  dir: 'up'   },
  { sym: 'USD/IRR',  price: '۵۸,۲۴۰',  priceEn: '58,240', change: '+0.34',  dir: 'up'   },
  { sym: 'WTI',      price: '78.42',    change: '-0.89',  dir: 'down' },
  { sym: 'ETH/USD',  price: '3,488',    change: '+2.11',  dir: 'up'   },
];

const NAV_ITEMS = [
  { fa: 'خانه',           en: 'Home',      href: '/',       slug: 'home' },
  { fa: 'اخبار',          en: 'News',      href: 'news.html',       slug: 'news' },
  { fa: 'ژورنال‌نویسی',   en: 'Journal',   href: 'journal.html',    slug: 'journal' },
  { fa: 'چارت',           en: 'Charts',    href: 'charts.html',     slug: 'charts' },
  { fa: 'مقالات',         en: 'Articles',  href: 'articles.html',   slug: 'articles' },
  { fa: 'پادکست',         en: 'Podcasts',  href: 'podcasts.html',   slug: 'podcasts' },
  { fa: 'محصولات',        en: 'Products',  href: 'products.html',   slug: 'products' },
  { fa: 'ابزارها',        en: 'Tools',     href: 'tools.html',      slug: 'tools' },
  { fa: 'آموزش',          en: 'Education', href: 'education.html',  slug: 'education' },
];

// Vertical news ticker headlines — auto-scroll line by line
const NEWS_TICKER = [
  { fa: 'مهم‌ترین خبرهای بازار امروز را دنبال کنید', en: 'Follow today\'s most important market news' },
  { fa: 'آخرین تغییرات اقتصاد ایران و جهان', en: 'Latest changes in Iranian and global economy' },
  { fa: 'تحلیل فوری بازار طلا، ارز و بورس', en: 'Instant analysis of gold, FX and stock market' },
  { fa: 'رخدادهای مهم مالی در یک نگاه', en: 'Major financial events at a glance' },
  { fa: 'تورم نقطه‌به‌نقطه به ۲۸٫۴ درصد رسید', en: 'Point-to-point inflation reached 28.4%' },
  { fa: 'بیت‌کوین به محدوده حمایتی نزدیک شد', en: 'Bitcoin approaches major support zone' },
];

const HERO_SLIDES = [
  {
    badge: 'پادکست صوتی ویژه', badgeEn: 'Special Audio Podcast',
    titleFa: 'اقتصاد دستوری و آزاد', titleEn: 'Command vs Free Economy',
    desc: 'گفت‌وگوی هفتگی با دو اقتصاددان درباره مرز قیمت‌گذاری دولتی و بازار آزاد در ایران', descEn: 'Weekly discussion with two economists about the boundaries of government pricing and free market in Iran',
    cta: 'ورود به اتاق', ctaEn: 'Enter Room',
    episode: 'قسمت ۲۴', episodeEn: 'Ep 24',
    duration: '۴۸ دقیقه', durationEn: '48 Min',
  },
  {
    badge: 'گزارش هفته', badgeEn: 'Weekly Report',
    titleFa: 'مسیر هوشمند سرمایه', titleEn: 'Smart Finance Path',
    desc: 'بررسی پنج کلاس دارایی پربازده در ماه گذشته و سناریوهای پیش‌رو', descEn: 'Reviewing 5 highly profitable asset classes in the past month and upcoming scenarios',
    cta: 'مشاهده گزارش', ctaEn: 'View Report',
    episode: 'قسمت ۲۳', episodeEn: 'Ep 23',
    duration: '۳۲ دقیقه', durationEn: '32 Min',
  },
  {
    badge: 'میزگرد زنده', badgeEn: 'Live Panel',
    titleFa: 'تورم، نرخ بهره، آینده', titleEn: 'Inflation, Interest Rates, Future',
    desc: 'ارزیابی سیاست‌های جدید بانک مرکزی و تأثیر آن بر دارایی‌ها', descEn: 'Evaluating new central bank policies and their impact on assets',
    cta: 'ورود به اتاق زنده', ctaEn: 'Join Live Room',
    episode: 'لایو', episodeEn: 'LIVE',
    duration: 'در حال پخش', durationEn: 'Broadcasting',
  },
];


const TABS = [
  { id: 'news',     label: 'اخبار',          icon: 'newspaper' },
  { id: 'edu',      label: 'آموزش',          icon: 'cap'       },
  { id: 'tools',    label: 'ابزارها',         icon: 'wrench'    },
  { id: 'products', label: 'محصولات',         icon: 'box'       },
  { id: 'journal',  label: 'ژورنال نویسی',    icon: 'book'      },
  { id: 'articles', label: 'مقالات',          icon: 'doc'       },
  { id: 'podcast',  label: 'پادکست',          icon: 'mic'       },
];

// محتوا برای هر تب — تغییر سکشن داینامیک
const TAB_CONTENT = {
  news: {
    eyebrowFa: 'تیتر یک — بازارهای کلان', eyebrowEn: 'Headline 1 — Macro Markets',
    titleFa: 'تیترهای اقتصادی امروز', titleEn: 'Today\'s Economic Headlines',
    descFa: 'مهم‌ترین رویدادهایی که فعالان بازار سرمایه و ارز نباید از دست بدهند.', descEn: 'The most important events that capital and currency market participants shouldn\'t miss.',
    items: [
      { tagFa: 'بازار طلا', tagEn: 'Gold Market', titleFa: 'اونس جهانی در آستانه ثبت رکورد جدید با تشدید تنش‌های ژئوپلیتیک', titleEn: 'Global ounce on the verge of a new record amid escalating geopolitical tensions', metaFa: '۳۲ دقیقه پیش', metaEn: '32 minutes ago', views: '۱٬۲۴۰' },
      { tagFa: 'ارز', tagEn: 'Currency', titleFa: 'دلار در صرافی‌های مجاز کانال جدید را تجربه کرد', titleEn: 'Dollar experienced a new channel in authorized exchanges', metaFa: '۱ ساعت پیش', metaEn: '1 hour ago', views: '۸۹۰' },
      { tagFa: 'بورس تهران', tagEn: 'Tehran Stock Exchange', titleFa: 'شاخص کل با رشد ۰٫۸ درصدی به مرز یک‌ونیم میلیون رسید', titleEn: 'Total index reached the 1.5 million border with a 0.8% growth', metaFa: '۳ ساعت پیش', metaEn: '3 hours ago', views: '۲٬۱۱۰' },
      { tagFa: 'کریپتو', tagEn: 'Crypto', titleFa: 'بیت‌کوین پس از اصلاح هفتگی به محدوده حمایتی نزدیک شد', titleEn: 'Bitcoin approached support level after weekly correction', metaFa: '۵ ساعت پیش', metaEn: '5 hours ago', views: '۴٬۵۰۰' },
      // Duplicate for carousel testing
      { tagFa: 'مسکن', tagEn: 'Housing', titleFa: 'ثبات نسبی در بازار مسکن پایتخت طی ماه گذشته', titleEn: 'Relative stability in the capital\'s housing market last month', metaFa: '۷ ساعت پیش', metaEn: '7 hours ago', views: '۳٬۲۰۰' },
      { tagFa: 'خودرو', tagEn: 'Automotive', titleFa: 'پیش‌فروش محصولات جدید خودروسازان آغاز شد', titleEn: 'Pre-sale of new automakers\' products started', metaFa: '۸ ساعت پیش', metaEn: '8 hours ago', views: '۱۲٬۰۰۰' },
      { tagFa: 'جهان', tagEn: 'Global', titleFa: 'تصمیم فدرال رزرو درباره نرخ بهره بازارهای جهانی را تکان داد', titleEn: 'Fed\'s decision on interest rates shook global markets', metaFa: '۱ روز پیش', metaEn: '1 day ago', views: '۱۵٬۰۰۰' },
      { tagFa: 'استارتاپ', tagEn: 'Startup', titleFa: 'جذب سرمایه استارتاپ‌های هوش مصنوعی رکورد شکست', titleEn: 'AI startups broken capital attraction records', metaFa: '۲ روز پیش', metaEn: '2 days ago', views: '۵٬۱۰۰' },
    ],
  },
  edu: {
    eyebrowFa: 'مدرسه اکوآذرین', eyebrowEn: 'EcoAzarin Academy',
    titleFa: 'یاد بگیر، سپس سرمایه‌گذاری کن', titleEn: 'Learn, then invest',
    descFa: 'دوره‌های ساختاریافته از مفاهیم پایه تا تحلیل تکنیکال پیشرفته.', descEn: 'Structured courses from basic concepts to advanced technical analysis.',
    items: [
      { tagFa: 'مقدماتی', tagEn: 'Beginner', titleFa: 'سرمایه‌گذاری از صفر — درس اول: تفاوت پس‌انداز و سرمایه‌گذاری', titleEn: 'Investing from Zero — Lesson 1: Difference between Saving and Investing', metaFa: 'دوره ۱۲ قسمتی', metaEn: '12-part course', views: '۸٬۲۰۰' },
      { tagFa: 'تکنیکال', tagEn: 'Technical', titleFa: 'الگوهای کلاسیک: سر و شانه، سقف و کف دوقلو', titleEn: 'Classic Patterns: Head and Shoulders, Double Top and Bottom', metaFa: 'دوره ۸ قسمتی', metaEn: '8-part course', views: '۵٬۴۰۰' },
      { tagFa: 'بنیادی', tagEn: 'Fundamental', titleFa: 'چگونه صورت سود و زیان شرکت‌ها را بخوانیم؟', titleEn: 'How to read companies\' income statements?', metaFa: 'دوره ۶ قسمتی', metaEn: '6-part course', views: '۳٬۹۰۰' },
      { tagFa: 'مدیریت ریسک', tagEn: 'Risk Mgmt', titleFa: 'حد ضرر هوشمند — چارچوب ۲ درصدی', titleEn: 'Smart Stop Loss — 2% Framework', metaFa: 'مینی‌کلاس', metaEn: 'Mini-class', views: '۲٬۷۰۰' },
    ],
  },
  tools: {
    eyebrowFa: 'جعبه‌ابزار اکوآذرین', eyebrowEn: 'EcoAzarin Toolkit',
    titleFa: 'ابزارهای تصمیم‌گیری در بازار', titleEn: 'Market Decision Tools',
    descFa: 'محاسبه‌گرها و داشبوردهایی که کنار شما تصمیم می‌گیرند.', descEn: 'Calculators and dashboards that help you make decisions.',
    items: [
      { tagFa: 'ماشین‌حساب', tagEn: 'Calculator', titleFa: 'محاسبه‌گر سود مرکب — نتیجه افق ۵ ساله سرمایه را ببینید', titleEn: 'Compound Interest Calculator — See the result of a 5-year investment horizon', metaFa: 'ابزار آنلاین', metaEn: 'Online tool', views: '۹٬۱۰۰', href: 'compound-calc.html', isFree: true },
      { tagFa: 'تبدیل ارز', tagEn: 'Converter', titleFa: 'مبدل لحظه‌ای با نرخ صرافی‌های مجاز', titleEn: 'Real-time converter with authorized exchange rates', metaFa: 'به‌روز هر ۳۰ ثانیه', metaEn: 'Updated every 30s', views: '۱۲٬۴۰۰' },
      { tagFa: 'پرتفوی', tagEn: 'Portfolio', titleFa: 'تحلیلگر سبد — بازده و ریسک واقعی شما', titleEn: 'Portfolio Analyzer — Your real return and risk', metaFa: 'مخصوص اعضا', metaEn: 'Members only', views: '۴٬۸۰۰' },
      { tagFa: 'هشدار قیمت', tagEn: 'Price Alert', titleFa: 'هشدارگذاری روی ۲۰۰ نماد بورسی و کریپتو', titleEn: 'Price alerts on 200 stock and crypto symbols', metaFa: 'جدید', metaEn: 'New', views: '۲٬۲۰۰' },
    ],
  },
  products: {
    eyebrowFa: 'محصولات اشتراکی', eyebrowEn: 'Subscription Products',
    titleFa: 'بسته‌های اطلاعاتی پرمیوم', titleEn: 'Premium Info Packages',
    descFa: 'گزارش‌های هفتگی، الرت‌های اختصاصی و دسترسی به اتاق تحلیلگران.', descEn: 'Weekly reports, exclusive alerts, and access to analysts\' room.',
    items: [
      { tagFa: 'هفتگی', tagEn: 'Weekly', titleFa: 'گزارش جامع هفته بازار — صبح شنبه روی میز شما', titleEn: 'Comprehensive Weekly Market Report — On your desk Saturday morning', metaFa: 'اشتراک ماهانه', metaEn: 'Monthly sub', views: '۲٬۸۰۰' },
      { tagFa: 'پلاس', tagEn: 'Plus', titleFa: 'اشتراک پلاس — دسترسی کامل به آرشیو پادکست‌ها', titleEn: 'Plus Subscription — Full access to podcast archive', metaFa: 'سالانه', metaEn: 'Yearly', views: '۱٬۹۰۰' },
      { tagFa: 'پرو', tagEn: 'Pro', titleFa: 'اتاق تحلیلگران اکوآذرین — جلسات هفتگی زنده', titleEn: 'EcoAzarin Analysts Room — Live weekly sessions', metaFa: 'محدود', metaEn: 'Limited', views: '۹۸۰' },
      { tagFa: 'کتاب', tagEn: 'Book', titleFa: 'مجموعه راهنمای سرمایه‌گذاری شخصی — ۴ جلد PDF', titleEn: 'Personal Investment Guide Collection — 4 PDF volumes', metaFa: 'یک‌بار خرید', metaEn: 'One-time purchase', views: '۳٬۲۰۰' },
    ],
  },
  journal: {
    eyebrowFa: 'دفتر سرمایه‌گذار', eyebrowEn: 'Investor\'s Notebook',
    titleFa: 'ژورنال نویسی، عادت سرمایه‌گذار حرفه‌ای', titleEn: 'Journaling, the Habit of a Pro Investor',
    descFa: 'هر معامله را ثبت کنید، الگوی رفتاری خود را کشف کنید.', descEn: 'Record every trade, discover your behavioral pattern.',
    items: [
      { tagFa: 'الگو', tagEn: 'Pattern', titleFa: 'چرا ثبت دلیل ورود مهم‌تر از قیمت ورود است؟', titleEn: 'Why recording entry reason is more important than entry price?', metaFa: 'مقاله', metaEn: 'Article', views: '۱٬۴۰۰' },
      { tagFa: 'تمپلیت', tagEn: 'Template', titleFa: 'تمپلیت ژورنال معاملاتی — قابل دانلود', titleEn: 'Trading Journal Template — Downloadable', metaFa: 'فایل اکسل', metaEn: 'Excel file', views: '۶٬۸۰۰' },
      { tagFa: 'تجربه', tagEn: 'Experience', titleFa: 'یک‌سال ژورنال‌نویسی، یک‌سال یاد گرفتن از خود', titleEn: 'One year of journaling, one year of learning from yourself', metaFa: 'یادداشت سردبیر', metaEn: 'Editor\'s Note', views: '۲٬۱۰۰' },
      { tagFa: 'روان‌شناسی', tagEn: 'Psychology', titleFa: 'سوگیری تأیید — چطور ژورنال جلویش را می‌گیرد', titleEn: 'Confirmation Bias — How a journal stops it', metaFa: 'مقاله', metaEn: 'Article', views: '۹۲۰' },
    ],
  },
  articles: {
    eyebrowFa: 'مقالات تحلیلی', eyebrowEn: 'Analytical Articles',
    titleFa: 'عمیق‌تر از تیتر روزنامه', titleEn: 'Deeper than the daily headlines',
    descFa: 'مقالات بلندِ تحلیلی از تیم پژوهش و کارشناسان مهمان.', descEn: 'Long-form analytical articles from our research team and guest experts.',
    items: [
      { tagFa: 'کلان', tagEn: 'Macro', titleFa: 'سرنوشت یارانه‌ها در بودجه ۱۴۰۵ — سه سناریو محتمل', titleEn: 'The fate of subsidies in the 2026 budget — Three likely scenarios', metaFa: 'پژوهش', metaEn: 'Research', views: '۳٬۴۰۰' },
      { tagFa: 'انرژی', tagEn: 'Energy', titleFa: 'گاز ایران در سال آینده؛ مازاد یا کسری؟', titleEn: 'Iran\'s gas next year; Surplus or Deficit?', metaFa: 'تحلیل', metaEn: 'Analysis', views: '۱٬۸۰۰' },
      { tagFa: 'مسکن', tagEn: 'Housing', titleFa: 'چرا سیاست‌های مسکن بدون نرخ بهره واقعی پیش نمی‌رود', titleEn: 'Why housing policies don\'t work without real interest rates', metaFa: 'یادداشت', metaEn: 'Note', views: '۲٬۶۰۰' },
      { tagFa: 'صنعت', tagEn: 'Industry', titleFa: 'فولاد ایران در گذرگاه قیمت‌گذاری دستوری', titleEn: 'Iran\'s steel at the crossroads of mandatory pricing', metaFa: 'پرونده', metaEn: 'File', views: '۱٬۲۵۰' },
    ],
  },
  podcast: {
    eyebrowFa: 'استودیو اکوآذرین', eyebrowEn: 'EcoAzarin Studio',
    titleFa: 'گوش بده، یاد بگیر، تصمیم بگیر', titleEn: 'Listen, Learn, Decide',
    descFa: 'مجموعه پادکست‌های تخصصی اقتصاد، بازار و رفتار سرمایه‌گذار.', descEn: 'A collection of specialized podcasts on economy, market, and investor behavior.',
    items: [
      { tagFa: 'هفتگی', tagEn: 'Weekly', titleFa: 'اقتصاد دستوری و آزاد — قسمت ۲۴', titleEn: 'Command vs. Free Economy — Episode 24', metaFa: '۴۸ دقیقه', metaEn: '48 mins', views: '۱۸٬۴۰۰' },
      { tagFa: 'ویژه', tagEn: 'Special', titleFa: 'گفت‌وگو با مدیر یک صندوق پوشش ریسک ایرانی', titleEn: 'Interview with an Iranian hedge fund manager', metaFa: '۵۲ دقیقه', metaEn: '52 mins', views: '۹٬۱۰۰' },
      { tagFa: 'لایو', tagEn: 'Live', titleFa: 'میزگرد لایو نرخ بهره — پخش زنده شنبه ۲۰:۳۰', titleEn: 'Live Interest Rate Roundtable — Saturday 20:30', metaFa: 'برنامه آینده', metaEn: 'Upcoming', views: '—' },
      { tagFa: 'مدرسه', tagEn: 'Academy', titleFa: 'الفبای پرتفوی شخصی — قسمت ۳: تنوع‌بخشی واقعی', titleEn: 'Personal Portfolio Alphabet — Part 3: Real Diversification', metaFa: '۲۸ دقیقه', metaEn: '28 mins', views: '۴٬۸۰۰' },
    ],
  },
};

// خبر بزرگ کاروسل
const FEATURED_NEWS = [
  { kickerFa: 'کلان اقتصاد', kickerEn: 'Macroeconomics', titleFa: 'مرکز آمار: تورم نقطه‌به‌نقطه به ۲۸٫۴ درصد رسید — کاهش پنجم متوالی', titleEn: 'Statistical Center: Point-to-point inflation reached 28.4% - fifth consecutive decrease', metaFa: 'گزارش روز • ۸ دقیقه پیش', metaEn: 'Report of the day • 8 mins ago', tone: 'red' },
  { kickerFa: 'بازار سرمایه', kickerEn: 'Capital Market', titleFa: 'ورود سنگین حقیقی‌ها به گروه فلزات اساسی در معاملات امروز', titleEn: 'Heavy influx of retail investors into the basic metals group in today\'s trading', metaFa: 'لحظه‌ای • ۲۲ دقیقه پیش', metaEn: 'Live • 22 mins ago', tone: 'green' },
  { kickerFa: 'ارز و طلا', kickerEn: 'Currency & Gold', titleFa: 'سکه امامی پس از سه روز اصلاح، در کانال ۴۲ میلیون تثبیت شد', titleEn: 'Emami gold coin stabilized in the 42 million channel after a three-day correction', metaFa: 'بازار • ۴۰ دقیقه پیش', metaEn: 'Market • 40 mins ago', tone: 'red' },
  { kickerFa: 'انرژی', kickerEn: 'Energy', titleFa: 'نشست اوپک پلاس به نتیجه نرسید؛ نفت برنت در محدوده ۸۲ دلار', titleEn: 'OPEC+ meeting reached no consensus; Brent crude remains in the $82 range', metaFa: 'بین‌الملل • ۱ ساعت پیش', metaEn: 'International • 1 hour ago', tone: 'green' },
  { kickerFa: 'فناوری', kickerEn: 'Technology', titleFa: 'استارتاپ‌های فین‌تک ایرانی در سه ماهه دوم ۲۸٪ رشد جذب سرمایه دیدند', titleEn: 'Iranian fintech startups saw 28% funding growth in the second quarter', metaFa: 'فناوری • ۲ ساعت پیش', metaEn: 'Tech • 2 hours ago', tone: 'red' },
];

// شبکه ۳ کارته
const NEWS_GRID = [
  { kickerFa: 'بورس', kickerEn: 'Stocks', titleFa: 'ورود نقدینگی ۹۲۰ میلیارد تومانی به گروه پتروشیمی در نیمه دوم بازار', titleEn: 'Inflow of 920 billion Tomans of liquidity into the petrochemical group in the second half of the market', views: 450, timeFa: '۲ روز قبل', timeEn: '2 days ago' },
  { kickerFa: 'کریپتو', kickerEn: 'Crypto', titleFa: 'تحلیل تکنیکال هفتگی بیت‌کوین — مرز ۶۵ هزار دلار همچنان حساس است', titleEn: 'Bitcoin weekly technical analysis - the 65,000 dollar boundary remains critical', views: 612, timeFa: '۱ روز قبل', timeEn: '1 day ago' },
  { kickerFa: 'بانکداری', kickerEn: 'Banking', titleFa: 'بانک مرکزی الزام سپرده‌گیری دیجیتال را به همه بانک‌ها ابلاغ کرد', titleEn: 'The Central Bank notified all banks of the digital deposit-taking requirement', views: 388, timeFa: '۲ روز قبل', timeEn: '2 days ago' },
];

// لیست‌های موبایل
const LATEST_LIST = [
  { titleFa: 'صادرات غیرنفتی ایران در فروردین ۱۸٪ رشد داشت', titleEn: 'Iran non-oil exports grew by 18% in the first month of the year', metaFa: '۲ روز قبل', metaEn: '2 days ago', views: '۴۵۰' },
  { titleFa: 'سهام شرکت‌های خودروساز در محدوده مقاومت سنگین ایستاد', titleEn: 'Automaker shares stayed in a heavy resistance zone', metaFa: '۲ روز قبل', metaEn: '2 days ago', views: '۳۸۸' },
  { titleFa: 'بلاک‌چین ایران؛ رگولاتور به دنبال چارچوب جدید مالیاتی است', titleEn: 'Iran Blockchain: Regulator looks for a new tax framework', metaFa: '۲ روز قبل', metaEn: '2 days ago', views: '۲۹۰' },
  { titleFa: 'بورس کالا میزبان عرضه گسترده محصولات فولادی شد', titleEn: 'Commodity exchange hosted wide supply of steel products', metaFa: '۳ روز قبل', metaEn: '3 days ago', views: '۲۱۰' },
  { titleFa: 'گزارش جدید بانک جهانی درباره چشم‌انداز اقتصاد منطقه', titleEn: 'New World Bank report on the regional economic outlook', metaFa: '۳ روز قبل', metaEn: '3 days ago', views: '۱۸۰' },
];

const POPULAR_LIST = [
  { titleFa: 'اقتصاد دستوری و آزاد — تحلیل کامل پادکست هفته', titleEn: 'Command vs Free Economy - Complete Podcast Review', metaFa: '۲ روز قبل', metaEn: '2 days ago', viewsFa: '۱۸٬۴۰۰', viewsEn: '18,400' },
  { titleFa: 'مسیر هوشمند سرمایه — مقاله جامع سردبیر', titleEn: 'Smart Capital Path - Chief Editor\'s Special Article', metaFa: '۴ روز قبل', metaEn: '4 days ago', viewsFa: '۱۲٬۲۰۰', viewsEn: '12,200' },
  { titleFa: '۵ خطای رایج تازه‌واردان بازار سرمایه', titleEn: '5 Common Mistakes of Stock Market Beginners', metaFa: '۱ هفته قبل', metaEn: '1 week ago', viewsFa: '۹٬۸۰۰', viewsEn: '9,800' },
  { titleFa: 'چرا تنوع‌بخشی واقعی، چیزی فراتر از داشتن چند سهم است', titleEn: 'Why Real Diversification is More Than Owning a Few Stocks', metaFa: '۱ هفته قبل', metaEn: '1 week ago', viewsFa: '۸٬۱۰۰', viewsEn: '8,100' },
  { titleFa: 'راهنمای کامل اشتراک طلایی اکوآذرین', titleEn: 'Complete Guide to EcoAzarin Gold Subscription', metaFa: '۲ هفته قبل', metaEn: '2 weeks ago', viewsFa: '۷٬۴۰۰', viewsEn: '7,400' },
];

const EDITORS_LIST = [
  { titleFa: 'گزارش ویژه: نقشه راه دلار در سال جدید', titleEn: 'Special Report: Dollar roadmap in the new year', metaFa: '۱ روز قبل', metaEn: '1 day ago', views: '۶٬۸۰۰' },
  { titleFa: 'پرونده مسکن — چرا قیمت‌ها چسبنده‌اند؟', titleEn: 'Housing portfolio - Why are prices sticky?', metaFa: '۲ روز قبل', metaEn: '2 days ago', views: '۴٬۲۰۰' },
  { titleFa: 'گفت‌وگوی اختصاصی با اقتصاددان مهمان این هفته', titleEn: 'Exclusive interview with this week\'s guest economist', metaFa: '۳ روز قبل', metaEn: '3 days ago', views: '۳٬۹۰۰' },
  { titleFa: 'یادداشت سردبیر — ژورنال‌نویسی یک‌ساله', titleEn: 'Editor\'s note - one-year of journal writing', metaFa: '۴ روز قبل', metaEn: '4 days ago', views: '۲٬۷۰۰' },
  { titleFa: 'تحلیل بنیادی صنعت پتروشیمی برای فصل تابستان', titleEn: 'Fundamental analysis of petrochemical industry for summer', metaFa: '۵ روز قبل', metaEn: '5 days ago', views: '۲٬۱۰۰' },
];

window.TICKER_DATA = TICKER_DATA;
window.NEWS_TICKER = NEWS_TICKER;
window.NAV_ITEMS = NAV_ITEMS;
window.HERO_SLIDES = HERO_SLIDES;
window.TABS = TABS;
window.TAB_CONTENT = TAB_CONTENT;
window.FEATURED_NEWS = FEATURED_NEWS;
window.NEWS_GRID = NEWS_GRID;
window.LATEST_LIST = LATEST_LIST;
window.POPULAR_LIST = POPULAR_LIST;
window.EDITORS_LIST = EDITORS_LIST;

export { TICKER_DATA, NAV_ITEMS, NEWS_TICKER, HERO_SLIDES, TABS, TAB_CONTENT, FEATURED_NEWS, NEWS_GRID, LATEST_LIST, POPULAR_LIST, EDITORS_LIST };
