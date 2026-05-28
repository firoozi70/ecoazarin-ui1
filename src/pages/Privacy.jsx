import ReactDOM from 'react-dom/client';
import React from 'react';
import { PageShell } from '../layouts/PageShell';
import { useLang } from '../i18n';

function PrivacyContent() {
  const [lang] = useLang();
  const isEn = lang === 'EN';

  return (
    <section className="px-4 md:px-6 max-w-[900px] mx-auto py-12" data-screen-label="Privacy">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
          {isEn ? 'Privacy Policy' : 'حریم خصوصی و قوانین'}
        </h1>
        <p className="text-zinc-400 light:text-zinc-500 text-[14px]">
          {isEn ? 'Last updated: May 2026' : 'آخرین بروزرسانی: اردیبهشت 1405'}
        </p>
      </div>

      <article className="max-w-none text-[14.5px] leading-loose text-zinc-300 light:text-zinc-600 text-start">
        <div className="bg-ink-850 light:bg-white light:shadow-sm border border-ink-500 light:border-zinc-200 rounded-2xl p-6 md:p-8 space-y-8 text-start">
          <section>
            <h2 className="text-xl font-bold text-zinc-100 light:text-zinc-900 mb-4 flex items-center gap-2"><span className="text-brand-green">1.</span> {isEn ? 'Information We Collect' : 'اطلاعاتی که جمع‌آوری می‌کنیم'}</h2>
            <p>
              {isEn ? 'We collect some of your information to provide better services, such as name, email during sign up, as well as IP and cookies automatically.' : 'ما در اکوآذرین برای ارائه خدمات بهتر، برخی از اطلاعات شما را جمع‌آوری می‌کنیم. این اطلاعات شامل مواردی است که شما مستقیماً در هنگام ثبت‌نام به ما می‌دهید و همچنین اطلاعاتی که به صورت خودکار ثبت می‌شود.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 light:text-zinc-900 mb-4 flex items-center gap-2"><span className="text-brand-green">2.</span> {isEn ? 'How We Use Information' : 'نحوه استفاده از اطلاعات'}</h2>
            <p className="mb-3">{isEn ? 'Your information will only be used for:' : 'اطلاعات شما صرفاً برای مقاصد زیر استفاده خواهد شد:'}</p>
            <ul className={`list-disc space-y-2 text-zinc-400 light:text-zinc-500 marker:text-brand-green ${isEn ? 'ml-5' : 'pr-5'}`}>
              <li>{isEn ? 'Creating and managing your account' : 'ایجاد و مدیریت حساب کاربری شما.'}</li>
              <li>{isEn ? 'Personalizing your experience' : 'شخصی‌سازی تجربه کاربری و نمایش تحلیل‌های مرتبط.'}</li>
              <li>{isEn ? 'Sending important notices' : 'ارسال اطلاع‌رسانی‌های مهم.'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 light:text-zinc-900 mb-4 flex items-center gap-2"><span className="text-brand-green">3.</span> {isEn ? 'Data Protection' : 'حفاظت از داده‌ها'}</h2>
            <p>
              {isEn ? 'The security of your information is critical. We use organizational encryption standards. Passwords are hashed.' : 'امنیت اطلاعات شما برای ما بسیار مهم است. ما از بالاترین استانداردهای رمزنگاری سازمانی استفاده می‌کنیم. کلمات عبور شما به صورت Hash شده ذخیره می‌شوند.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 light:text-zinc-900 mb-4 flex items-center gap-2"><span className="text-brand-green">4.</span> {isEn ? 'Third-party Sharing' : 'اشتراک‌گذاری با اشخاص ثالث'}</h2>
            <p>
              {isEn ? 'We DO NOT share your info to 3rd parties unless legally required by authorities.' : 'ما تحت هیچ شرایطی اطلاعات هویتی و مالی شما را به اشخاص ثالث نمی‌فروشیم و به اشتراک نمی‌گذاریم مگر با حکم قضایی معتبر.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 light:text-zinc-900 mb-4 flex items-center gap-2"><span className="text-brand-green">5.</span> {isEn ? 'User Rights' : 'حقوق کاربر'}</h2>
            <p>
              {isEn ? 'You have the right to edit, view, or delete your data at any time.' : 'شما در هر زمان حق دارید نسبت به مشاهده، ویرایش یا درخواست حذف کامل داده‌های خود اقدام کنید.'}
            </p>
          </section>
        </div>
      </article>
      
      <div className="mt-8 text-center text-[13px] text-zinc-500">
        {isEn ? 'If you have any questions, ' : 'در صورت داشتن هرگونه ابهام، لطفاً با '} 
        <a href="/contact.html" className="text-brand-green hover:underline">
          {isEn ? 'Contact us' : 'ما تماس بگیرید'}
        </a>.
      </div>
    </section>
  );
}

function App() {
  return (
    <PageShell slug="privacy">
      <PrivacyContent />
    </PageShell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
