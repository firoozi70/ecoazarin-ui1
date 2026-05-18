import ReactDOM from 'react-dom/client';
import React from 'react';
import { PageShell } from '../layouts/PageShell';

function PrivacyContent() {
  return (
    <section className="px-4 md:px-6 max-w-[900px] mx-auto py-12" data-screen-label="Privacy">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">حریم خصوصی و قوانین</h1>
        <p className="text-zinc-400 light:text-zinc-500 text-[14px]">آخرین بروزرسانی: اردیبهشت 1405</p>
      </div>

      <article className="max-w-none text-[14.5px] leading-loose text-zinc-300 light:text-zinc-600">
        <div className="bg-ink-850 light:bg-white light:shadow-sm border border-ink-500 light:border-zinc-200 rounded-2xl p-6 md:p-8 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-zinc-100 light:text-zinc-900 mb-4 flex items-center gap-2"><span className="text-brand-green">۱.</span> اطلاعاتی که جمع‌آوری می‌کنیم</h2>
            <p>
              ما در اکوآذرین برای ارائه خدمات بهتر، برخی از اطلاعات شما را جمع‌آوری می‌کنیم. این اطلاعات شامل مواردی است که شما مستقیماً در هنگام ثبت‌نام (مانند نام، ایمیل، و شماره تماس) به ما می‌دهید و همچنین اطلاعاتی که به صورت خودکار هنگام استفاده از پلتفرم (مانند آدرس IP، نوع مرورگر، و کوکی‌ها) ثبت می‌شود.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 light:text-zinc-900 mb-4 flex items-center gap-2"><span className="text-brand-green">۲.</span> نحوه استفاده از اطلاعات</h2>
            <p className="mb-3">اطلاعات شما صرفاً برای مقاصد زیر استفاده خواهد شد:</p>
            <ul className="list-disc pl-5 pr-5 space-y-2 text-zinc-400 light:text-zinc-500 marker:text-brand-green">
              <li>ایجاد و مدیریت حساب کاربری شما.</li>
              <li>شخصی‌سازی تجربه کاربری و نمایش تحلیل‌های مرتبط.</li>
              <li>ارسال اطلاع‌رسانی‌های مهم، خبرنامه‌ها و پیشنهادات ویژه (با امکان لغو اشتراک).</li>
              <li>بهبود مستمر عملکرد و امنیت پلتفرم.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 light:text-zinc-900 mb-4 flex items-center gap-2"><span className="text-brand-green">۳.</span> حفاظت از داده‌ها</h2>
            <p>
              امنیت اطلاعات شما برای ما بسیار مهم است. ما از بالاترین استانداردهای رمزنگاری سازمانی و پروتکل‌های امنیتی برای محافظت از داده‌های شما در برابر دسترسی غیرمجاز، تغییر یا نشت اطلاعات استفاده می‌کنیم. کلمات عبور شما به صورت Hash شده ذخیره می‌شوند و حتی پرسنل اکوآذرین نیز به آن‌ها دسترسی ندارند.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 light:text-zinc-900 mb-4 flex items-center gap-2"><span className="text-brand-green">۴.</span> اشتراک‌گذاری با اشخاص ثالث</h2>
            <p>
              ما تحت هیچ شرایطی اطلاعات هویتی و مالی شما را به اشخاص ثالث یا شرکت‌های تبلیغاتی نمی‌فروشیم و به اشتراک نمی‌گذاریم. در موارد خاص نظیر حکم قضایی معتبر، اطلاعات متناسب با قانون در اختیار مراجع ذی‌صلاح قرار خواهد گرفت.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-100 light:text-zinc-900 mb-4 flex items-center gap-2"><span className="text-brand-green">۵.</span> حقوق کاربر</h2>
            <p>
              شما در هر زمان حق دارید نسبت به مشاهده، ویرایش یا درخواست حذف کامل داده‌های خود از سیستم‌های ما اقدام کنید. برای این منظور می‌توانید از بخش تنظیمات حساب کاربری اقدام نموده و یا با پشتیبانی تماس بگیرید.
            </p>
          </section>
        </div>
      </article>
      
      <div className="mt-8 text-center text-[13px] text-zinc-500">
        در صورت داشتن هرگونه ابهام درباره سیاست حفظ حریم خصوصی، لطفاً با <a href="/contact.html" className="text-brand-green hover:underline">ما تماس بگیرید</a>.
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
