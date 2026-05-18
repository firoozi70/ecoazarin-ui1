import ReactDOM from 'react-dom/client';
import React from 'react';
import { PageShell } from '../layouts/PageShell';
import { useLangRefresh } from '../i18n';

function CookiesContent() {
  useLangRefresh();
  const isEn = window.__ECO_LANG === 'EN';

  return (
    <section className="px-4 md:px-6 max-w-[900px] mx-auto py-12" data-screen-label="Cookies">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
          {isEn ? 'Cookie Policy' : 'سیاست استفاده از کوکی‌ها'}
        </h1>
        <p className="text-zinc-400 light:text-zinc-500 text-[14px]">
          {isEn ? 'Last updated: May 2026' : 'آخرین بروزرسانی: اردیبهشت 1405'}
        </p>
      </div>

      <article className="max-w-none text-[14.5px] leading-loose text-zinc-300 light:text-zinc-600 text-start">
        <div className="bg-ink-850 light:bg-white light:shadow-sm border border-ink-500 light:border-zinc-200 rounded-2xl p-6 md:p-8 space-y-8 text-start">
          <section>
            <h2 className="text-xl font-bold text-zinc-100 light:text-zinc-900 mb-4 flex items-center gap-2"><span className="text-brand-green">1.</span> {isEn ? 'What is a Cookie?' : 'کوکی چیست؟'}</h2>
            <p>
              {isEn ? 'Cookies are small text files placed on your device to help us recognize you and optimize your experience.' : 'کوکی‌ها فایل‌های متنی کوچکی هستند که در هنگام بازدید از وب‌سایت در دستگاه شما ذخیره می‌شوند و ترجیحات شما را حفظ می‌کنند.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 light:text-zinc-900 mb-4 flex items-center gap-2"><span className="text-brand-green">2.</span> {isEn ? 'Why we use Cookies' : 'چرا از کوکی استفاده می‌کنیم؟'}</h2>
            <ul className={`list-disc space-y-2 text-zinc-400 light:text-zinc-500 marker:text-brand-green ${isEn ? 'ml-5' : 'pr-5'}`}>
              <li><strong>{isEn ? 'Essential:' : 'عملکرد ضروری:'}</strong> {isEn ? 'To maintain sessions and auth.' : 'برای حفظ نشست کاربران و احراز هویت.'}</li>
              <li><strong>{isEn ? 'Analytics:' : 'تحلیل و آمار:'}</strong> {isEn ? 'To understand traffic with tools like Google Analytics.' : 'برای درک بهتر نحوه تعامل کاربران با بخش‌های مختلف.'}</li>
              <li><strong>{isEn ? 'Personalization:' : 'شخصی‌سازی:'}</strong> {isEn ? 'To remember your dark mode settings and chart themes.' : 'برای به خاطر سپردن تنظیماتی نظیر تم روشن/تاریک یا ترجیحات ظاهری.'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 light:text-zinc-900 mb-4 flex items-center gap-2"><span className="text-brand-green">3.</span> {isEn ? 'Controlling Cookies' : 'کنترل کوکی‌ها توسط کاربر'}</h2>
            <p>
              {isEn ? 'You can disable cookies from browser settings, but it will break your sign in module.' : 'شما همواره می‌توانید از طریق تنظیمات مرورگر استفاده از کوکی‌ها را مسدود کنید. با این حال این کار ممکن است در ورود به سیستم اختلال ایجاد کند.'}
            </p>
          </section>
        </div>
      </article>
      
      <div className="mt-8 text-center text-[13px] text-zinc-500">
        {isEn ? 'If you have any questions, ' : 'در صورت داشتن هرگونه سوال، با '} 
        <a href="/contact.html" className="text-brand-green hover:underline">
          {isEn ? 'Contact us' : 'ما تماس بگیرید'}
        </a>.
      </div>
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
