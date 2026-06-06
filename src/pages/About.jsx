import ReactDOM from 'react-dom/client';
import React from 'react';
import { PageShell } from '../layouts/PageShell';
import { useLang } from '../i18n';

const TEAM = [
  { name: 'Amin Azari', faName: 'امین آذری', role: 'Team Leader', faRole: 'سرگروه تیم', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80' },
  { name: 'Ali Edrisi', faName: 'علی ادریسی', role: 'Content Production', faRole: 'مدیر تولید محتوا', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80' },
  { name: 'Mohammad Mazarei', faName: 'محمد مزارعی', role: 'Trader', faRole: 'تریدر', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&h=400&q=80' },
  { name: 'Alireza Golabi', faName: 'علیرضا گلابی', role: 'Trader', faRole: 'تریدر', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&h=400&q=80' },
  { name: 'Yasin Hosseini', faName: 'یاسین حسینی', role: 'Trader', faRole: 'تریدر', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&h=400&q=80' },
  { name: 'Pouria Khademi', faName: 'پوریا خادمی', role: 'Trader', faRole: 'تریدر', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80' },
  { name: 'Nima Najafi', faName: 'نیما نجفی', role: 'Team Member', faRole: 'عضو تیم', img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&h=400&q=80' },
  { name: 'Mohammad Firoozi', faName: 'محمد فیروزی', role: 'Developer', faRole: 'توسعه دهنده', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80' }
];

function AboutContent() {
  const [lang] = useLang();
  const isEn = lang === 'EN';

  return (
    <section className="px-4 md:px-6 max-w-[1400px] mx-auto py-12" data-screen-label="About Us">
      {/* Hero Section */}
      <div className="bg-ink-850 light:bg-white light:shadow-sm border border-ink-500 light:border-zinc-200 rounded-3xl p-8 md:p-14 mb-16 relative overflow-hidden text-center z-0">
        <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/15 light:from-emerald-500/10 via-transparent to-transparent -z-10" />
        <div className="absolute top-[-50px] start-1/2 -translate-x-1/2 w-80 h-80 rounded-full orb-green opacity-40 pointer-events-none -z-10" />
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
          {isEn ? 'About Eco Azarin' : 'درباره اکو آذرین'}
        </h1>
        <p className="text-zinc-300 light:text-zinc-600 text-[15px] md:text-[16px] leading-[1.8] max-w-3xl mx-auto font-medium">
          {isEn 
            ? 'EcoAzarin is a modern and smart path for capital, currency, gold, and crypto market players in Iran. By leveraging technology and financial knowledge, we strive to bring a transparent, fast, and secure experience.' 
            : 'اکوآذرین یک مسیر هوشمند و نوین برای فعالان بازار سرمایه، ارز، طلا و کریپتو در ایران است. ما با تلفیق تکنولوژی و دانش مالی، در تلاشیم تا تجربه‌ای شفاف، سریع و مطمئن را رقم بزنیم.'}
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="bg-ink-850 light:bg-white light:shadow-sm border border-ink-500 light:border-zinc-200 rounded-2xl p-8 hover:border-ink-400 transition-colors">
          <div className="w-14 h-14 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green text-3xl mb-6">🎯</div>
          <h2 className="text-xl font-bold mb-4">{isEn ? 'Our Mission' : 'ماموریت ما'}</h2>
          <p className="text-zinc-400 light:text-zinc-500 text-[14.5px] leading-relaxed">
            {isEn 
              ? 'Providing accurate analytical tools, ongoing education, and a secure platform to help traders make smart decisions.' 
              : 'ارائه ابزارهای تحلیل دقیق، آموزش مستمر و بستری امن برای کمک به معامله‌گران در اتخاذ تصمیمات مالی هوشمندانه و داده‌محور.'}
          </p>
        </div>
        <div className="bg-ink-850 light:bg-white light:shadow-sm border border-ink-500 light:border-zinc-200 rounded-2xl p-8 hover:border-ink-400 transition-colors">
          <div className="w-14 h-14 rounded-2xl bg-brand-red/10 flex items-center justify-center text-brand-red text-3xl mb-6">👁️</div>
          <h2 className="text-xl font-bold mb-4">{isEn ? 'Our Vision' : 'چشم‌انداز ما'}</h2>
          <p className="text-zinc-400 light:text-zinc-500 text-[14.5px] leading-relaxed">
            {isEn 
              ? 'To become the leading hub for FinTech, financial market analysis, and practical investment training by 2026.' 
              : 'تبدیل شدن به مرجع اول خاورمیانه در حوزه‌ی فین‌تک، تحلیل بازارهای مالی و آموزش کاربردی سرمایه‌گذاری تا سال ۱۴۰۵.'}
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-4">{isEn ? 'Our Team' : 'تیم ما'}</h2>
        <p className="text-zinc-400 light:text-zinc-500 text-[14.5px] max-w-xl mx-auto">
          {isEn 
            ? 'We are a dedicated team of experts, analysts, and developers working passionately to build top financial tools.' 
            : 'ما یک تیم از متخصصان، تحلیل‌گران و توسعه‌دهندگان هستیم که با اشتیاق برای ساخت بهترین ابزارهای مالی تلاش می‌کنیم.'}
        </p>
      </div>

      <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
        {TEAM.map((member, i) => (
          <div key={i} className="items-center bg-ink-850 light:bg-zinc-50 rounded-2xl shadow sm:flex border border-ink-500 light:border-zinc-200 group">
              <div className="w-full sm:w-[220px] shrink-0 h-[260px] sm:h-full min-h-[220px]">
                  <img 
                    className="w-full h-full object-cover rounded-t-2xl sm:rounded-none rtl:sm:rounded-r-2xl ltr:sm:rounded-l-2xl grayscale group-hover:grayscale-0 transition-opacity duration-300" 
                    src={member.img} 
                    alt={isEn ? member.name : member.faName} 
                  />
              </div>
              <div className="p-5 flex-1 text-start">
                  <h3 className="text-xl font-bold tracking-tight text-white light:text-zinc-900">
                      {isEn ? member.name : member.faName}
                  </h3>
                  <span className="text-[14px] text-zinc-400 light:text-zinc-500">{isEn ? member.role : member.faRole}</span>
                  <p className="mt-3 mb-4 font-light text-[14.5px] text-zinc-400 light:text-zinc-500">
                      {isEn 
                        ? `${member.name} drives the conceptual strategy and operations for the platform's vision.` 
                        : `${member.faName} از اعضای کلیدی در توسعه و پیشبرد اهداف پلتفرم اکوآذرین می‌باشد.`}
                  </p>
                  <ul className="flex gap-4 sm:mt-0">
                      <li>
                          <a href="#" className="text-zinc-500 hover:text-brand-green transition-colors">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                          </a>
                      </li>
                      <li>
                          <a href="#" className="text-zinc-500 hover:text-brand-green transition-colors">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                          </a>
                      </li>
                      <li>
                          <a href="#" className="text-zinc-500 hover:text-brand-green transition-colors">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                          </a>
                      </li>
                      <li>
                          <a href="#" className="text-zinc-500 hover:text-brand-green transition-colors">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" /></svg>
                          </a>
                      </li>
                  </ul>
              </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function App() {
  return (
    <PageShell slug="about">
      <AboutContent />
    </PageShell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
