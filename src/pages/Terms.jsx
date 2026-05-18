import ReactDOM from 'react-dom/client';
import React from 'react';
import { PageShell } from '../layouts/PageShell';
import { useLangRefresh } from '../i18n';

function TermsContent() {
  useLangRefresh();
  const isEn = window.__ECO_LANG === 'EN';

  return (
    <section className="px-4 md:px-6 max-w-[900px] mx-auto py-12" data-screen-label="Terms">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
          {isEn ? 'Terms of Service' : 'شرایط و قوانین استفاده'}
        </h1>
        <p className="text-zinc-400 light:text-zinc-500 text-[14px]">
          {isEn ? 'Last updated: May 2026' : 'آخرین بروزرسانی: اردیبهشت 1405'}
        </p>
      </div>

      <article className="max-w-none text-[14.5px] leading-loose text-zinc-300 light:text-zinc-600 text-start">
        <div className="bg-ink-850 light:bg-white light:shadow-sm border border-ink-500 light:border-zinc-200 rounded-2xl p-6 md:p-8 space-y-8 text-start">
          <section>
            <h2 className="text-xl font-bold text-zinc-100 light:text-zinc-900 mb-4 flex items-center gap-2"><span className="text-brand-green">1.</span> {isEn ? 'Acceptance of Terms' : 'پذیرش شرایط'}</h2>
            <p>
              {isEn ? 'By using EcoAzarin, you agree to these terms. These may be updated in the future.' : 'با ثبت نام و استفاده از خدمات اکوآذرین، شما موافقت خود را با تمامی این شرایط و قوانین اعلام می‌کنید.'}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 light:text-zinc-900 mb-4 flex items-center gap-2"><span className="text-brand-green">2.</span> {isEn ? 'User Account' : 'حساب کاربری'}</h2>
            <ul className={`list-disc space-y-2 text-zinc-400 light:text-zinc-500 marker:text-brand-green ${isEn ? 'ml-5' : 'pr-5'}`}>
              <li>{isEn ? 'You are responsible for your account security.' : 'کاربر مسئول حفظ امنیت رمز عبور و اطلاعات حساب است.'}</li>
              <li>{isEn ? 'EcoAzarin has no liability for negligence.' : 'اکوآذرین مسئولیتی در قبال دسترسی‌های غیرمجاز ناشی از سهل‌انگاری کاربر ندارد.'}</li>
              <li>{isEn ? 'Automated bots/crawlers are strictly forbidden.' : 'استفاده از سیستم‌های خودکار (بات، اسکریپت) برای دسترسی اکیداً ممنوع است.'}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 light:text-zinc-900 mb-4 flex items-center gap-2"><span className="text-brand-green">3.</span> {isEn ? 'Financial Disclaimer' : 'سلب مسئولیت مالی'}</h2>
            <p>
              {isEn ? 'All reports and analyses are purely educational. EcoAzarin does not accept liability for financial losses. Trading decisions are yours alone.' : 'تمامی تحلیل‌ها و گزارش‌ها جنبه آموزشی دارند. اکوآذرین مسئولیتی در قبال زیان‌های مالی نمی‌پذیرد. تصمیمات معاملاتی منحصراً بر عهده خود سرمایه‌گذار است.'}
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-zinc-100 light:text-zinc-900 mb-4 flex items-center gap-2"><span className="text-brand-green">4.</span> {isEn ? 'Intellectual Property' : 'مالکیت معنوی'}</h2>
            <p>
              {isEn ? 'All content is heavily copyrighted. Copying without permission is strictly prohibited.' : 'کلیه حقوق مادی و معنوی محتوا متعلق به شرکت پلتفرم اکوآذرین می‌باشد. هرگونه کپی‌برداری پیگرد است.'}
            </p>
          </section>
        </div>
      </article>
      
      <div className="mt-8 text-center text-[13px] text-zinc-500">
        {isEn ? 'If you have any questions, ' : 'در صورت داشتن هرگونه ابهام درباره شرایط استفاده، با '} 
        <a href="/contact.html" className="text-brand-green hover:underline">
          {isEn ? 'Contact us' : 'ما تماس بگیرید'}
        </a>.
      </div>
    </section>
  );
}

function App() {
  return (
    <PageShell slug="terms">
      <TermsContent />
    </PageShell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
