import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
import { PageShell } from '../layouts/PageShell';
import { useLangRefresh } from '../i18n';

const JOBS = [
  { 
    titleEn: 'Domestic Market Analyst', titleFa: 'تحلیلگر بازار سرمایه داخلی', 
    typeEn: 'Full-time / On-site', typeFa: 'تمام‌وقت / حضوری', 
    deptEn: 'Data Analysis', deptFa: 'تحلیل داده', 
    descEn: 'Proficient in reading the board, fundamental & technical of Iran Bourse. Min 3 years experience.', 
    descFa: 'مسلط به تابلوخوانی، تکنیکال و فاندامنتال بورس ایران. حداقل ۳ سال سابقه کار.' 
  },
  { 
    titleEn: 'Senior Front-end Developer', titleFa: 'برنامه‌نویس ارشد Front-end', 
    typeEn: 'Remote', typeFa: 'دورکاری', 
    deptEn: 'Technical', deptFa: 'فنی', 
    descEn: 'Master of React, TypeScript, TailwindCSS. Familiar with live charts and real-time data.', 
    descFa: 'تسلط کامل به React, TypeScript, TailwindCSS. آشنایی با چارت‌ها و داده‌های لحظه‌ای (WebSockets).' 
  },
  { 
    titleEn: 'Financial Content Creator', titleFa: 'کارشناس تولید محتوای مالی', 
    typeEn: 'Part-time', typeFa: 'پاره‌وقت', 
    deptEn: 'Content', deptFa: 'محتوا', 
    descEn: 'Creating textual & audio content focusing on economic news for social networks.', 
    descFa: 'تولید محتوای متنی و صوتی برای شبکه‌های اجتماعی با محوریت اخبار اقتصادی و بورس.' 
  },
  { 
    titleEn: 'Algo-Trading Developer', titleFa: 'توسعه‌دهنده الگوریتم‌تریدینگ', 
    typeEn: 'Hybrid', typeFa: 'هیبریدی', 
    deptEn: 'Quant', deptFa: 'کوانت', 
    descEn: 'Proficient in Python, exchange APIs, bot making, and backtesting.', 
    descFa: 'مسلط به پایتون و API صرافی‌ها، تجربه ساخت بات‌های معاملاتی و بک‌تست گیری.' 
  }
];

function CareersContent() {
  useLangRefresh();
  const isEn = window.__ECO_LANG === 'EN';
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <section className="px-4 md:px-6 max-w-[1400px] mx-auto py-12" data-screen-label="Careers">
      <div className="bg-ink-850 light:bg-white light:shadow-sm border border-ink-500 light:border-zinc-200 rounded-3xl p-8 md:p-14 mb-12 relative overflow-hidden text-center z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/15 light:from-brand-red/10 via-transparent to-transparent -z-10" />
        <div className="absolute top-[-50px] right-20 w-80 h-80 rounded-full orb-red opacity-30 pointer-events-none -z-10" />
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 relative z-10">
          {isEn ? 'Join Our Team' : 'به تیم ما بپیوندید'}
        </h1>
        <p className="text-zinc-300 light:text-zinc-600 text-[15px] max-w-2xl mx-auto font-medium leading-[1.8] relative z-10">
          {isEn
           ? 'We are always looking for top talents. If you are passionate about financial markets and tech, your place is with us.'
           : 'ما همیشه در پی یافتن استعدادهای برتر هستیم. اگر به بازارهای مالی، تکنولوژی و پیشرفت علاقه‌مندید، جای شما خالیست.'}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">{isEn ? 'Open Positions' : 'فرصت‌های شغلی باز'}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {JOBS.map((job, i) => (
            <div key={i} className="bg-ink-850 light:bg-white light:shadow-sm border border-ink-500 light:border-zinc-200 rounded-2xl p-6 hover:border-ink-400 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-[17px] font-bold group-hover:text-brand-green transition-colors">{isEn ? job.titleEn : job.titleFa}</h3>
                  <span className="text-[11px] font-medium bg-ink-700 text-zinc-300 light:text-zinc-600 px-2 py-1 rounded-md">{isEn ? job.deptEn : job.deptFa}</span>
                </div>
                <p className="text-[13px] text-zinc-400 light:text-zinc-500 leading-relaxed mb-4">{isEn ? job.descEn : job.descFa}</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-ink-500 light:border-zinc-200/60">
                <span className="text-[12px] text-zinc-500">{isEn ? job.typeEn : job.typeFa}</span>
                <button 
                  onClick={() => setSelectedJob(isEn ? job.titleEn : job.titleFa)}
                  className="text-[12.5px] font-bold text-brand-green bg-brand-green/10 px-4 py-1.5 rounded-full hover:bg-brand-green hover:text-black transition-colors"
                >
                  {isEn ? 'Send Resume' : 'ارسال رزومه'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-ink-800 light:bg-zinc-50 border border-ink-500 light:border-zinc-200 rounded-2xl p-8 md:p-12 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">{isEn ? 'Our Values' : 'ارزش‌های سازمانی ما'}</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-ink-700 flex items-center justify-center text-2xl mb-4">🚀</div>
            <h3 className="font-bold mb-2">{isEn ? 'Continuous Growth' : 'رشد مستمر'}</h3>
            <p className="text-[12.5px] text-zinc-400 light:text-zinc-500 leading-relaxed">
              {isEn ? 'Learning is a part of our daily job. We support training courses.' : 'یادگیری جزئی از کار روزانه ماست و شرکت در دوره‌های آموزشی حمایت می‌شود.'}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-ink-700 flex items-center justify-center text-2xl mb-4">🤝</div>
            <h3 className="font-bold mb-2">{isEn ? 'Empathetic Environment' : 'محیطی همدلانه'}</h3>
            <p className="text-[12.5px] text-zinc-400 light:text-zinc-500 leading-relaxed">
              {isEn ? 'We are a team growing together and respecting each other.' : 'ما یک تیم هستیم که در کنار هم رشد می‌کنیم و به ایده‌های هم احترام می‌گذاریم.'}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-ink-700 flex items-center justify-center text-2xl mb-4">💡</div>
            <h3 className="font-bold mb-2">{isEn ? 'Innovation' : 'خلاقیت و نوآوری'}</h3>
            <p className="text-[12.5px] text-zinc-400 light:text-zinc-500 leading-relaxed">
              {isEn ? 'Breaking the frames and trying new things is in our DNA.' : 'شکستن چارچوب‌ها و آزمودن راه‌های جدید در دی‌ان‌ای ماست.'}
            </p>
          </div>
        </div>
      </div>

      {selectedJob && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-ink-900 light:bg-zinc-50 border border-ink-500 light:border-zinc-200 rounded-3xl p-8 w-full max-w-md relative tab-anim-card">
            <button 
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-ink-800 light:bg-zinc-50 hover:bg-ink-700 transition"
            >✕</button>
            <h3 className="text-xl font-bold mb-2">{isEn ? 'Send Resume' : 'ارسال رزومه'}</h3>
            <p className="text-[13px] text-brand-green mb-6 font-medium">{isEn ? 'For position:' : 'برای موقعیت:'} {selectedJob}</p>
            
            <form onSubmit={e => { e.preventDefault(); alert(isEn ? 'Resume sent successfully!' : 'رزومه شما با موفقیت ارسال شد!'); setSelectedJob(null); }} className="space-y-4">
              <div>
                <input type="text" placeholder={isEn ? "Full Name" : "نام و نام خانوادگی"} required className="w-full bg-ink-800 light:bg-zinc-50 border border-ink-500 light:border-zinc-200 rounded-xl px-4 py-2.5 text-[14px] text-zinc-100 light:text-zinc-900 outline-none focus:border-brand-green" />
              </div>
              <div>
                <input type="email" placeholder={isEn ? "Email" : "ایمیل"} required className="w-full bg-ink-800 light:bg-zinc-50 border border-ink-500 light:border-zinc-200 rounded-xl px-4 py-2.5 text-[14px] text-zinc-100 light:text-zinc-900 outline-none focus:border-brand-green" />
              </div>
              <div>
                <input type="text" placeholder={isEn ? "LinkedIn / GitHub (optional)" : "لینک لینکدین یا گیت‌هاب (اختیاری)"} className="w-full bg-ink-800 light:bg-zinc-50 border border-ink-500 light:border-zinc-200 rounded-xl px-4 py-2.5 text-[14px] text-zinc-100 light:text-zinc-900 outline-none focus:border-brand-green" />
              </div>
              <div>
                <label className="block w-full border-2 border-dashed border-ink-500 light:border-zinc-200 rounded-xl p-6 text-center cursor-pointer hover:border-brand-green transition-colors bg-ink-800 light:bg-zinc-50 ">
                  <span className="text-[24px] block mb-2">📎</span>
                  <span className="text-[13px] text-zinc-400 light:text-zinc-500 font-medium">
                    {isEn ? "Select PDF File" : "فایل رزومه (PDF) را انتخاب کنید"}
                  </span>
                  <input type="file" accept=".pdf" className="hidden" required />
                </label>
              </div>
              <button type="submit" className="w-full h-11 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors">
                {isEn ? "Submit Request" : "ارسال درخواست"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

function App() {
  return (
    <PageShell slug="careers">
      <CareersContent />
    </PageShell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
