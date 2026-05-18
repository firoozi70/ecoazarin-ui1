import ReactDOM from 'react-dom/client';
import React from 'react';
import { PageShell } from '../layouts/PageShell';

const TEAM = [
  { name: 'Amin Azari', faName: 'امین آذری', role: 'Team Leader', faRole: 'سرگروه تیم', img: 'https://i.pravatar.cc/150?u=amin' },
  { name: 'Ali Edrisi', faName: 'علی ادریسی', role: 'Content Production Manager', faRole: 'مدیر تولید محتوا', img: 'https://i.pravatar.cc/150?u=ali' },
  { name: 'Mohammad Mazarei', faName: 'محمد مزارعی', role: 'Trader', faRole: 'تریدر', img: 'https://i.pravatar.cc/150?u=mohammad' },
  { name: 'Alireza Golabi', faName: 'علیرضا گلابی', role: 'Trader', faRole: 'تریدر', img: 'https://i.pravatar.cc/150?u=alireza' },
  { name: 'Yasin Hosseini', faName: 'یاسین حسینی', role: 'Trader', faRole: 'تریدر', img: 'https://i.pravatar.cc/150?u=yasin' },
  { name: 'Pouria Khademi', faName: 'پوریا خادمی', role: 'Trader', faRole: 'تریدر', img: 'https://i.pravatar.cc/150?u=pouria' },
  { name: 'Nima Najafi', faName: 'نیما نجفی', role: 'Team Member', faRole: 'عضو تیم', img: 'https://i.pravatar.cc/150?u=nima' },
  { name: 'Mohammad Firoozi', faName: 'محمد فیروزی', role: 'Developer', faRole: 'توسعه دهنده', img: 'https://i.pravatar.cc/150?u=firoozi' }
];

function AboutContent() {
  return (
    <section className="px-4 md:px-6 max-w-[1400px] mx-auto py-12" data-screen-label="About Us">
      {/* Hero Section */}
      <div className="bg-ink-850 light:bg-white light:shadow-sm border border-ink-500 light:border-zinc-200 rounded-3xl p-8 md:p-14 mb-16 relative overflow-hidden text-center z-0">
        <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/15 light:from-emerald-500/10 via-transparent to-transparent -z-10" />
        <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-80 h-80 rounded-full orb-green opacity-40 pointer-events-none -z-10" />
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">درباره اکو آذرین</h1>
        <p className="text-zinc-300 light:text-zinc-600 text-[15px] md:text-[16px] leading-[1.8] max-w-3xl mx-auto font-medium">
          اکوآذرین یک مسیر هوشمند و نوین برای فعالان بازار سرمایه، ارز، طلا و کریپتو در ایران است. ما با تلفیق تکنولوژی و دانش مالی، در تلاشیم تا تجربه‌ایشفاف، سریع و مطمئن را برای کاربرانمان رقم بزنیم. هدف ما ارتقای سطح آگاهی عمومی و ارائه ابزارهای کارآمد برای سرمایه‌گذاری بهتر است.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="bg-ink-850 light:bg-white light:shadow-sm border border-ink-500 light:border-zinc-200 rounded-2xl p-8 hover:border-ink-400 transition-colors">
          <div className="w-14 h-14 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green text-3xl mb-6">🎯</div>
          <h2 className="text-xl font-bold mb-4">ماموریت ما</h2>
          <p className="text-zinc-400 light:text-zinc-500 text-[14.5px] leading-relaxed">
            ارائه ابزارهای تحلیل دقیق، آموزش مستمر و بستری امن برای کمک به معامله‌گران در اتخاذ تصمیمات مالی هوشمندانه و داده‌محور.
          </p>
        </div>
        <div className="bg-ink-850 light:bg-white light:shadow-sm border border-ink-500 light:border-zinc-200 rounded-2xl p-8 hover:border-ink-400 transition-colors">
          <div className="w-14 h-14 rounded-2xl bg-brand-red/10 flex items-center justify-center text-brand-red text-3xl mb-6">👁️</div>
          <h2 className="text-xl font-bold mb-4">چشم‌انداز ما</h2>
          <p className="text-zinc-400 light:text-zinc-500 text-[14.5px] leading-relaxed">
            تبدیل شدن به مرجع اول خاورمیانه در حوزه‌ی فین‌تک، تحلیل بازارهای مالی و آموزش کاربردی سرمایه‌گذاری تا سال ۱۴۰۵.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-4">تیم ما</h2>
        <p className="text-zinc-400 light:text-zinc-500 text-[14.5px] max-w-xl mx-auto">
          ما یک تیم از متخصصان، تحلیل‌گران و توسعه‌دهندگان هستیم که با اشتیاق برای ساخت بهترین ابزارهای مالی تلاش می‌کنیم.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {TEAM.map((member, i) => (
          <div key={i} className="bg-ink-800/50 border border-ink-500 light:border-zinc-200 rounded-2xl p-6 text-center hover:bg-ink-800 light:hover:bg-zinc-100 light:bg-zinc-50 transition-colors group">
            <div className="relative w-24 h-24 mx-auto mb-5">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-green to-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
              <img 
                src={member.img} 
                alt={member.faName} 
                className="relative w-full h-full object-cover rounded-full border-2 border-ink-500 light:border-zinc-200 group-hover:border-brand-green transition-colors grayscale group-hover:grayscale-0"
              />
            </div>
            <h3 className="text-[16px] font-bold mb-1 group-hover:text-brand-green transition-colors">{member.faName}</h3>
            <p className="text-[12.5px] text-zinc-500 mb-1">{member.name}</p>
            <div className="inline-block mt-2 px-3 py-1 bg-ink-900 light:bg-zinc-50 rounded-full text-[11px] font-medium text-zinc-300 light:text-zinc-600 border border-ink-500 light:border-zinc-200">
              {member.faRole}
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
