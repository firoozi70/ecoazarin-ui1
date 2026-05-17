// =====================================================================
// Auth — sign in, sign up, password recovery
// =====================================================================
const { useState, useEffect } = React;
const { BrandMark, ThemeToggle, LangToggle } = window;

const isEn = () => (typeof localStorage !== 'undefined' && localStorage.getItem('eco-lang') === 'EN');
const grad = () => (isEn() ? 'bg-gradient-to-r' : 'bg-gradient-to-l');

function AcceptTerms() {
  const raw = window.t('acceptTerms');
  const [before, restAfterRules] = raw.split('{rules}');
  const [between, after] = (restAfterRules || '').split('{privacy}');
  const linkCls = 'text-zinc-300 light:text-zinc-700 font-bold hover:text-white light:hover:text-zinc-900 underline decoration-zinc-600 light:decoration-zinc-300 underline-offset-4 transition-colors';
  return (
    <p className="text-center text-[11.5px] text-zinc-500 mt-10 tab-anim-soft leading-relaxed font-medium">
      {before}
      <a href="#" className={linkCls}>{window.t('rules')}</a>
      {between}
      <a href="#" className={linkCls}>{window.t('privacy')}</a>
      {after}
    </p>
  );
}

function AuthApp() {
  const [view, setView] = useState('login');
  const [method, setMethod] = useState('password');
  const [context, setContext] = useState('');
  const [mobile, setMobile] = useState('');
  const otpRefs = React.useRef([]);

  useEffect(() => {
    const lang = localStorage.getItem('eco-lang') || 'FA';
    document.documentElement.setAttribute('lang', lang === 'EN' ? 'en' : 'fa');
    document.documentElement.setAttribute('dir', lang === 'EN' ? 'ltr' : 'rtl');
    document.title = window.t('authPageTitle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const renderForm = () => {
    switch (view) {
      case 'login':
      case 'register':
        return (
          <div className="tab-anim">
            <div className="flex bg-ink-900/50 light:bg-zinc-100 p-1.5 rounded-2xl mb-8 border border-ink-500/50 light:border-zinc-200 shadow-inner">
              <button
                onClick={() => setView('login')}
                className={`flex-1 py-2.5 text-[13.5px] font-bold rounded-xl transition-all duration-300 ${view === 'login' ? 'bg-ink-700 light:bg-white shadow-[0_4px_12px_-4px_rgba(0,0,0,0.5)] light:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] text-white light:text-zinc-900' : 'text-zinc-500 light:text-zinc-400 hover:text-white light:hover:text-zinc-600'}`}>
                {window.t('login')}
              </button>
              <button
                onClick={() => setView('register')}
                className={`flex-1 py-2.5 text-[13.5px] font-bold rounded-xl transition-all duration-300 ${view === 'register' ? 'bg-ink-700 light:bg-white shadow-[0_4px_12px_-4px_rgba(0,0,0,0.5)] light:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.1)] text-white light:text-zinc-900' : 'text-zinc-500 light:text-zinc-400 hover:text-white light:hover:text-zinc-600'}`}>
                {window.t('signup')}
              </button>
            </div>

            {view === 'login' ? (
              <div className="space-y-5 tab-anim">
                <div className="flex items-center gap-6 mb-2">
                  <label className="flex items-center gap-2.5 text-[13px] cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input type="radio" name="loginMethod" checked={method === 'password'} onChange={() => setMethod('password')} className="peer sr-only" />
                      <div className="w-4 h-4 rounded-full border-2 border-zinc-600 peer-checked:border-brand-red transition-colors" />
                      <div className="absolute w-2 h-2 rounded-full bg-brand-red scale-0 peer-checked:scale-100 transition-transform" />
                    </div>
                    <span className={method === 'password' ? 'text-white light:text-zinc-900 font-bold' : 'text-zinc-400 group-hover:text-zinc-300 transition-colors'}>{window.t('password')}</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-[13px] cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input type="radio" name="loginMethod" checked={method === 'otp'} onChange={() => setMethod('otp')} className="peer sr-only" />
                      <div className="w-4 h-4 rounded-full border-2 border-zinc-600 peer-checked:border-brand-red transition-colors" />
                      <div className="absolute w-2 h-2 rounded-full bg-brand-red scale-0 peer-checked:scale-100 transition-transform" />
                    </div>
                    <span className={method === 'otp' ? 'text-white light:text-zinc-900 font-bold' : 'text-zinc-400 group-hover:text-zinc-300 transition-colors'}>{window.t('otp')}</span>
                  </label>
                </div>

                <div>
                  <label className="block text-[12.5px] font-medium text-zinc-400 mb-2">{window.t('mobileNumber')}</label>
                  <input type="tel" dir="ltr" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="0912 345 6789" className="w-full h-12 bg-ink-900/60 light:bg-zinc-50 border border-ink-500 light:border-zinc-300 rounded-xl px-4 text-left font-mono text-[15px] text-white light:text-zinc-900 outline-none focus:border-brand-red/60 focus:bg-ink-900 light:focus:bg-white focus:shadow-[0_0_0_4px_rgba(230,57,70,0.1)] transition-all placeholder-stripe placeholder:opacity-50" />
                </div>

                {method === 'password' && (
                  <div className="tab-anim-soft">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-[12.5px] font-medium text-zinc-400">{window.t('password')}</label>
                      <button type="button" onClick={() => setView('forgot')} className="text-[11.5px] font-bold text-brand-redSoft hover:text-brand-red transition-colors">{window.t('forgotPass')}</button>
                    </div>
                    <input type="password" dir="ltr" placeholder="••••••••" className="w-full h-12 bg-ink-900/60 light:bg-zinc-50 border border-ink-500 light:border-zinc-300 rounded-xl px-4 text-left font-mono text-[15px] text-white light:text-zinc-900 outline-none focus:border-brand-red/60 focus:bg-ink-900 light:focus:bg-white focus:shadow-[0_0_0_4px_rgba(230,57,70,0.1)] transition-all placeholder-stripe placeholder:opacity-50" />
                  </div>
                )}

                <button
                  onClick={() => {
                    if (method === 'otp') { setContext('login'); setView('otp'); }
                    else { alert(window.t('loginSuccess')); }
                  }}
                  className={`w-full h-12 mt-4 ${grad()} from-brand-green to-emerald-400 text-black text-[14.5px] font-extrabold rounded-xl shadow-[0_8px_20px_-6px_rgba(16,185,129,0.5)] hover:shadow-[0_8px_24px_-4px_rgba(16,185,129,0.6)] transition-all hover:-translate-y-0.5`}>
                  {method === 'password' ? window.t('enterAccount') : window.t('sendOtp')}
                </button>
              </div>
            ) : (
              <div className="space-y-5 tab-anim">
                <div>
                  <label className="block text-[12.5px] font-medium text-zinc-400 mb-2">{window.t('registerMobileLabel')}</label>
                  <input type="tel" dir="ltr" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="0912 345 6789" className="w-full h-12 bg-ink-900/60 light:bg-zinc-50 border border-ink-500 light:border-zinc-300 rounded-xl px-4 text-left font-mono text-[15px] text-white light:text-zinc-900 outline-none focus:border-brand-green/60 focus:bg-ink-900 light:focus:bg-white focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)] transition-all placeholder-stripe placeholder:opacity-50" />
                </div>
                <button
                  onClick={() => { setContext('register'); setView('otp'); }}
                  className={`w-full h-12 mt-4 ${grad()} from-brand-green to-emerald-400 text-black text-[14.5px] font-extrabold rounded-xl shadow-[0_8px_20px_-6px_rgba(16,185,129,0.5)] hover:shadow-[0_8px_24px_-4px_rgba(16,185,129,0.6)] transition-all hover:-translate-y-0.5`}>
                  {window.t('sendVerifyCode')}
                </button>
              </div>
            )}
          </div>
        );

      case 'forgot':
        return (
          <div className="tab-anim space-y-5">
            <button onClick={() => setView('login')} className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-zinc-400 hover:text-white light:hover:text-zinc-800 transition-colors mb-2 bg-ink-800/50 light:bg-zinc-100 px-3 py-1.5 rounded-lg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={isEn() ? '' : 'scale-x-[-1]'}><path d="M9 18l6-6-6-6" /></svg>
              {window.t('backToLogin')}
            </button>
            <div>
              <h2 className="text-xl md:text-2xl font-black mb-2">{window.t('forgotTitle')}</h2>
              <p className="text-[13px] text-zinc-400 leading-relaxed">{window.t('forgotDesc')}</p>
            </div>
            <div>
              <label className="block text-[12.5px] font-medium text-zinc-400 mb-2">{window.t('mobileNumber')}</label>
              <input type="tel" dir="ltr" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="0912 345 6789" className="w-full h-12 bg-ink-900/60 light:bg-zinc-50 border border-ink-500 light:border-zinc-300 rounded-xl px-4 text-left font-mono text-[15px] text-white light:text-zinc-900 outline-none focus:border-brand-red/60 focus:bg-ink-900 light:focus:bg-white focus:shadow-[0_0_0_4px_rgba(230,57,70,0.1)] transition-all placeholder-stripe placeholder:opacity-50" />
            </div>
            <button
              onClick={() => { setContext('forgot'); setView('otp'); }}
              className={`w-full h-12 mt-2 ${grad()} from-brand-redDark to-brand-red text-white text-[14.5px] font-extrabold rounded-xl shadow-[0_8px_20px_-6px_rgba(230,57,70,0.6)] hover:-translate-y-0.5 transition-all`}>
              {window.t('sendRecovery')}
            </button>
          </div>
        );

      case 'otp':
        return (
          <div className="tab-anim space-y-6 text-center py-2">
            <button onClick={() => setView(context === 'register' ? 'register' : context === 'forgot' ? 'forgot' : 'login')} className="absolute top-5 end-5 w-8 h-8 flex items-center justify-center rounded-full bg-ink-800/50 light:bg-zinc-100 text-zinc-400 hover:text-white light:hover:text-zinc-800 transition-colors" aria-label={window.t('close')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={isEn() ? '' : 'scale-x-[-1]'}><path d="M9 18l6-6-6-6" /></svg>
            </button>
            <div>
              <div className={`mx-auto w-12 h-12 mb-4 rounded-full flex items-center justify-center ${context === 'register' ? 'bg-brand-green/10 text-brand-green' : 'bg-brand-red/10 text-brand-red'}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
              </div>
              <h2 className="text-xl md:text-2xl font-black mb-2">{window.t('verifyMobile')}</h2>
              <p className="text-[13px] text-zinc-400 leading-relaxed max-w-[280px] mx-auto">
                {window.t('verifyDesc', { mobile: mobile || '…' })}
              </p>
            </div>

            <div className="flex justify-center gap-2 md:gap-3 my-8" dir="ltr">
              {[0, 1, 2, 3, 4].map((i) => (
                <input
                  key={i}
                  ref={(el) => { otpRefs.current[i] = el; }}
                  type="text"
                  maxLength="1"
                  onChange={(e) => {
                    if (e.target.value && i < 4) otpRefs.current[i + 1].focus();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !e.target.value && i > 0) otpRefs.current[i - 1].focus();
                  }}
                  className={`w-11 h-14 md:w-12 md:h-16 bg-ink-900/60 light:bg-zinc-50 border border-ink-500 light:border-zinc-300 rounded-xl text-center text-xl md:text-2xl font-black font-mono text-white light:text-zinc-900 outline-none transition-all placeholder-stripe placeholder:opacity-30
                  ${context === 'register' ? 'focus:border-brand-green/60 focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)] bg-brand-green/5' : 'focus:border-brand-red/60 focus:shadow-[0_0_0_4px_rgba(230,57,70,0.1)]'}`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                if (context === 'register') setView('profile');
                else if (context === 'forgot') setView('reset');
                else alert(window.t('otpLoginSuccess'));
              }}
              className={`w-full h-12 text-[14.5px] font-extrabold rounded-xl shadow-lg transition-all hover:-translate-y-0.5 ${context === 'register' ? `${grad()} from-brand-green to-emerald-400 text-black shadow-[0_8px_20px_-6px_rgba(16,185,129,0.5)]` : `${grad()} from-brand-redDark to-brand-red text-white shadow-[0_8px_20px_-6px_rgba(230,57,70,0.6)]`}`}>
              {window.t('verifyAction')}
            </button>

            <div className="mt-6 text-[12.5px] text-zinc-500 flex items-center justify-center gap-2 flex-wrap">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              <span>{window.t('resendOtpPrefix')}</span>
              <span className="font-mono text-white light:text-zinc-900 font-bold tracking-widest ltr-num mx-1">01:59</span>
              {window.t('resendOtpSuffix') ? <span>{window.t('resendOtpSuffix')}</span> : null}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="tab-anim space-y-5">
            <div>
              <h2 className="text-xl md:text-2xl font-black mb-2 text-brand-greenSoft">{window.t('completeProfile')}</h2>
              <p className="text-[13px] text-zinc-400 leading-relaxed">{window.t('profileDesc')}</p>
            </div>
            <div className="pt-2">
              <label className="block text-[12.5px] font-medium text-zinc-400 mb-2">{window.t('fullName')}</label>
              <input type="text" placeholder={window.t('fullNamePlaceholder')} className="w-full h-12 bg-ink-900/60 light:bg-zinc-50 border border-ink-500 light:border-zinc-300 rounded-xl px-4 text-white light:text-zinc-900 outline-none focus:border-brand-green/60 focus:bg-ink-900 light:focus:bg-white focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)] transition-all placeholder-stripe placeholder:opacity-50" />
            </div>
            <div>
              <label className="block text-[12.5px] font-medium text-zinc-400 mb-2">{window.t('usernameEn')}</label>
              <div className="relative flex items-center">
                <span className="absolute start-4 text-zinc-500 font-mono text-[14px]">@</span>
                <input type="text" dir="ltr" placeholder={window.t('usernamePlaceholder')} className="w-full h-12 bg-ink-900/60 light:bg-zinc-50 border border-ink-500 light:border-zinc-300 rounded-xl px-4 ps-9 text-left font-mono text-[15px] text-white light:text-zinc-900 outline-none focus:border-brand-green/60 focus:bg-ink-900 light:focus:bg-white focus:shadow-[0_0_0_4px_rgba(16,185,129,0.1)] transition-all placeholder-stripe placeholder:opacity-50" />
              </div>
            </div>
            <button
              onClick={() => alert(window.t('signupSuccess'))}
              className={`w-full h-12 mt-4 ${grad()} from-brand-green to-emerald-400 text-black text-[14.5px] font-extrabold rounded-xl shadow-[0_8px_20px_-6px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-0.5`}>
              {window.t('completeAction')}
            </button>
          </div>
        );

      case 'reset':
        return (
          <div className="tab-anim space-y-5">
            <div>
              <h2 className="text-xl md:text-2xl font-black mb-2">{window.t('resetTitle')}</h2>
              <p className="text-[13px] text-zinc-400 leading-relaxed">{window.t('resetDesc')}</p>
            </div>
            <div className="pt-2">
              <label className="block text-[12.5px] font-medium text-zinc-400 mb-2">{window.t('newPass')}</label>
              <input type="password" dir="ltr" placeholder="••••••••" className="w-full h-12 bg-ink-900/60 light:bg-zinc-50 border border-ink-500 light:border-zinc-300 rounded-xl px-4 text-left font-mono text-[15px] text-white light:text-zinc-900 outline-none focus:border-brand-red/60 focus:bg-ink-900 light:focus:bg-white focus:shadow-[0_0_0_4px_rgba(230,57,70,0.1)] transition-all placeholder-stripe placeholder:opacity-50" />
            </div>
            <div>
              <label className="block text-[12.5px] font-medium text-zinc-400 mb-2">{window.t('confirmPass')}</label>
              <input type="password" dir="ltr" placeholder="••••••••" className="w-full h-12 bg-ink-900/60 light:bg-zinc-50 border border-ink-500 light:border-zinc-300 rounded-xl px-4 text-left font-mono text-[15px] text-white light:text-zinc-900 outline-none focus:border-brand-red/60 focus:bg-ink-900 light:focus:bg-white focus:shadow-[0_0_0_4px_rgba(230,57,70,0.1)] transition-all placeholder-stripe placeholder:opacity-50" />
            </div>
            <button
              onClick={() => { alert(window.t('resetSuccess')); setView('login'); }}
              className={`w-full h-12 mt-4 ${grad()} from-brand-redDark to-brand-red text-white text-[14.5px] font-extrabold rounded-xl shadow-[0_8px_20px_-6px_rgba(230,57,70,0.6)] transition-all hover:-translate-y-0.5`}>
              {window.t('resetAction')}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-ink-900 light:bg-white text-white light:text-zinc-900 overflow-hidden transition-colors duration-300">

      <div className="hidden lg:flex lg:w-1/2 flex-col relative bg-ink-850 light:bg-[#F5F5F7] border-e border-ink-500/50 light:border-zinc-300/50 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full orb-red opacity-30 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full orb-green opacity-20 blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 dotted-bg opacity-30 light:opacity-50 pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center opacity-30 light:opacity-20 pointer-events-none">
          <svg className="w-[150%] h-[150%] animate-[spin_120s_linear_infinite]" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <circle cx="400" cy="400" r="300" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 20" />
            <circle cx="400" cy="400" r="200" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 15" />
            <circle cx="400" cy="400" r="100" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 8" />
          </svg>
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-12">
          <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-48 h-8 bg-brand-green/20 blur-xl rounded-[100%]" />
            <div className="relative z-10 w-[360px] h-[360px] drop-shadow-2xl animate-softPulse" style={{ animationDuration: '4s', animationDirection: 'alternate' }}>
              <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-brand-green">
                <defs>
                  <linearGradient id="charGrad" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#10B981" />
                    <stop offset="1" stopColor="#047857" />
                  </linearGradient>
                  <linearGradient id="charGrad2" x1="400" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#E63946" />
                    <stop offset="1" stopColor="#10B981" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="15" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <rect x="80" y="220" width="40" height="100" rx="8" fill="url(#charGrad)" opacity="0.4" />
                <rect x="140" y="160" width="40" height="160" rx="8" fill="url(#charGrad)" opacity="0.6" />
                <rect x="200" y="240" width="40" height="80" rx="8" fill="url(#charGrad2)" opacity="0.5" />
                <rect x="260" y="100" width="40" height="220" rx="8" fill="url(#charGrad)" opacity="0.9" />
                <circle cx="200" cy="120" r="45" fill="currentColor" opacity="0.9" filter="url(#glow)" />
                <path d="M120 320 C120 220, 280 220, 280 320" fill="none" stroke="currentColor" strokeWidth="60" strokeLinecap="round" opacity="0.8" />
                <circle cx="160" cy="220" r="25" fill="white" opacity="0.1" />
                <path d="M300 80 L320 60 L340 80" fill="none" stroke="url(#charGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M320 60 L320 110" fill="none" stroke="url(#charGrad)" strokeWidth="6" strokeLinecap="round" />
                <circle cx="80" cy="100" r="10" fill="url(#charGrad2)" opacity="0.8" />
              </svg>
            </div>

            <div className="absolute top-[10%] end-[-10%] bg-ink-800/90 light:bg-white backdrop-blur-xl border border-ink-500 light:border-zinc-200 rounded-2xl p-4 shadow-2xl animate-[fadeinUp_1s_ease-out_both] z-20" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                </div>
                <div className="text-[14px] font-black">{window.t('smartAlert')}</div>
              </div>
              <div className="text-[11.5px] text-zinc-400 mt-1 max-w-[140px] leading-relaxed">{window.t('smartAlertDesc')}</div>
            </div>

            <div className="absolute top-[40%] start-[-15%] bg-ink-800/90 light:bg-white backdrop-blur-xl border border-ink-500 light:border-zinc-200 rounded-2xl p-4 shadow-2xl animate-[fadeinUp_1s_ease-out_both] z-20" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-brand-red/20 flex items-center justify-center text-brand-red">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                </div>
                <div className="text-[14px] font-black">{window.t('specialistEdu')}</div>
              </div>
              <div className="text-[11.5px] text-zinc-400 mt-1 max-w-[140px] leading-relaxed">{window.t('specialistEduDesc')}</div>
            </div>

            <div className="absolute bottom-[5%] start-[10%] bg-ink-800/90 light:bg-white backdrop-blur-xl border border-ink-500 light:border-zinc-200 rounded-2xl p-4 shadow-2xl animate-[fadeinUp_1s_ease-out_both] z-20" style={{ animationDelay: '500ms' }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[15px] font-black">{window.t('technicalAnalysis')}</span>
                <span className="text-[10px] font-bold text-brand-green flex items-center ltr-num" dir="ltr">{window.t('successRate')}</span>
              </div>
              <svg width="160" height="60" viewBox="0 0 160 60" className="text-brand-green drop-shadow-[0_4px_8px_rgba(16,185,129,0.5)] mt-2">
                <line x1="0" y1="15" x2="160" y2="15" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity="0.1" />
                <line x1="0" y1="30" x2="160" y2="30" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity="0.1" />
                <line x1="0" y1="45" x2="160" y2="45" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity="0.1" />
                <path d="M5 50 Q 25 50 35 30 T 65 35 T 95 15 T 125 25 T 155 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 50 Q 25 50 35 30 T 65 35 T 95 15 T 125 25 T 155 5 L 155 60 L 5 60 Z" fill="currentColor" opacity="0.1" />
                <circle cx="155" cy="5" r="4" fill="currentColor" className="animate-pulse" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col relative z-50">
        <header className="w-full px-6 md:px-10 py-6 flex justify-between items-center bg-transparent">
          <a href="hero.html" className="flex items-center gap-2 md:gap-3 transition-transform hover:scale-105">
            <BrandMark size={32} />
            <div>
              <div className="text-[16px] font-black tracking-tight leading-none">eco azarin</div>
              <div className="text-[10.5px] font-medium text-zinc-500 mt-1 tracking-wider">{window.t('siteTagline')}</div>
            </div>
          </a>
          <div className="flex items-center gap-3">
            <a href="hero.html" className="text-[12.5px] font-bold text-zinc-400 hover:text-white light:hover:text-zinc-800 transition-colors hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-ink-800 light:hover:bg-zinc-100">
              {window.t('home')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isEn() ? 'rotate-180' : ''}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
            </a>
            {LangToggle ? <LangToggle alwaysVisible /> : null}
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-[400px] relative">
            <div className="mb-8">
              <h1 className="text-2xl md:text-[28px] font-black mb-3 text-white light:text-zinc-900 tracking-tight">{window.t('authWelcome')}</h1>
              <p className="text-[13.5px] text-zinc-400 leading-relaxed font-medium">{window.t('authDesc')}</p>
            </div>
            <div className="relative z-10 bg-transparent">{renderForm()}</div>
            <AcceptTerms />
          </div>
        </main>

        <footer className="w-full py-6 px-6 text-center text-[11px] text-zinc-500 font-medium">
          {window.t('copyright')}
        </footer>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AuthApp />);
