import ReactDOM from 'react-dom/client';
import React from 'react';
import { PageShell } from '../layouts/PageShell';
import { useLang } from '../i18n';
import { Shield, Cookie, Settings, Fingerprint } from 'lucide-react';
import { motion } from 'motion/react';

function CookiesContent() {
  const [lang] = useLang();
  const isEn = lang === 'EN';

  const sections = [
    {
      icon: <Cookie className="w-6 h-6" />,
      title_en: 'What is a Cookie?',
      title_fa: 'کوکی چیست؟',
      text_en: 'Cookies are small data files placed on your device. They act as a memory for the website, allowing it to remember you and your preferences over time.',
      text_fa: 'کوکی‌ها فایل‌های دادهٔ کوچکی هستند که در هنگام بازدید وب‌سایت در دستگاه شما ذخیره می‌شوند و مانند یک حافظه برای وب‌سایت عمل می‌کنند.'
    },
    {
      icon: <Fingerprint className="w-6 h-6" />,
      title_en: 'Essential Cookies',
      title_fa: 'کوکی‌های ضروری',
      text_en: 'These are required for basic site functionality such as user authentication and maintaining secure sessions. They cannot be disabled.',
      text_fa: 'این کوکی‌ها برای عملکردهای پایه مانند ورود به سیستم و حفظ امنیت نشست الزامی هستند و غیرقابل غیرفعال‌سازی می‌باشند.'
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title_en: 'Personalization',
      title_fa: 'شخصی‌سازی (Preferences)',
      text_en: 'We use these to remember your settings—like your preferred language, chart configurations, and dark/light mode choices.',
      text_fa: 'ما از این کوکی‌ها برای حفظ تنظیمات شما مانند زبان، چیدمان چارت‌ها و حالت تاریک/روشن استفاده می‌کنیم.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title_en: 'Cookie Control',
      title_fa: 'کنترل کوکی‌ها',
      text_en: 'You can manage or delete cookies via your browser settings at any time, though some features of our platform might be limited if you do.',
      text_fa: 'شما می‌توانید کوکی‌ها را از تنظیمات مرورگر خود حذف یا مدیریت کنید؛ البته در این صورت ممکن است برخی از بخش‌های پلتفرم ما به درستی کار نکنند.'
    }
  ];

  return (
    <section className="px-4 md:px-6 max-w-5xl mx-auto py-16" data-screen-label="Cookies">
      <div className="mb-16 text-center max-w-2xl mx-auto">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-6 text-brand-green"
        >
          <Cookie size={32} />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-zinc-900 dark:text-white">
          {isEn ? 'Cookie Policy' : 'سیاست کوکی‌ها'}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-[15px] leading-relaxed">
          {isEn ? 'Learn how EcoAzarin uses cookies to ensure you get the best and most secure trading experience.' 
                : 'بیاموزید که اکوآذرین چگونه از کوکی‌ها برای ایجاد بهترین و امن‌ترین تجربه معاملاتی استفاده می‌کند.'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((sec, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-8 rounded-2xl bg-white dark:bg-ink-850 border border-zinc-200 dark:border-ink-500/50 shadow-sm hover:border-brand-green/30 dark:hover:border-brand-green/30 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-900 dark:text-white mb-6 group-hover:scale-110 group-hover:text-brand-green group-hover:bg-brand-green/10 transition-all">
              {sec.icon}
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
              {isEn ? sec.title_en : sec.title_fa}
            </h3>
            <p className="text-[14.5px] leading-loose text-zinc-600 dark:text-zinc-400">
              {isEn ? sec.text_en : sec.text_fa}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 p-6 rounded-2xl bg-brand-green/5 dark:bg-brand-green/10 border border-brand-green/20 text-center"
      >
        <p className="text-[14px] text-zinc-700 dark:text-zinc-300">
          {isEn ? 'By continuing to use EcoAzarin, you agree to our use of cookies.' : 'با ادامه استفاده از اکوآذرین، با خط‌مشی استفاده از کوکی‌های ما موافقت می‌کنید.'}
        </p>
        <p className="mt-2 text-[13px] text-zinc-500">
          {isEn ? 'Questions? ' : 'سوالات بیشتر؟ '}
          <a href="/contact.html" className="text-brand-green hover:underline">
            {isEn ? 'Contact our support' : 'تماس با پشتیبانی'}
          </a>
        </p>
      </motion.div>
    </section>
  );
}

function App() {
  return (
    <PageShell slug="cookies">
      <CookiesContent />
    </PageShell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
