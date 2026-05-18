import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as Recharts from 'recharts';
const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { motion, AnimatePresence } from 'motion/react';





const FA_DICT = {
  login: "ورود",
  signup: "ثبت نام",
  search: "جستجو",
  notifs: "اعلان‌ها",
  logout: "خروج از حساب",
  profile: "پروفایل من",
  dashboard: "داشبورد من",
  settings: "تنظیمات",
  upgrade: "ارتقای حساب",
  journal: "ژورنال من",
  langLabel: "زبان",
  loginTitle: "ورود به حساب",
  signupTitle: "ساخت حساب جدید",
  username: "نام کاربری",
  password: "رمز عبور",
  loginHint: "برای ورود سریع از نام EDI و رمز ۱۲۳۴۵۶۷۸۹ استفاده کنید.",
  haveAccount: "قبلاً ثبت‌نام کرده‌ای؟",
  noAccount: "حساب نداری؟",
  enter: "ورود",
  signupAction: "ثبت‌نام",
  allNotifs: "همهٔ اعلان‌ها",
  markAll: "علامت همه به‌عنوان خوانده",
  seeAllNotifs: "دیدن همهٔ اعلان‌ها",
  nothingFound: "چیزی یافت نشد",
  memberOf: "عضو اکوآذرین",
  newBadge: "جدید",
  close: "بستن",
  loginErr1: "نام کاربری یا رمز عبور اشتباه است.",
  loginErr2: "نام و رمز معتبر وارد کنید (حداقل ۴ کاراکتر).",
  breakingNews: "خبر فوری",
  allNews: "همه اخبار",
  appTitle: "eco azarin",
  appSubtitle: "مسیر هوشمند سرمایه",
  searchAll: "جستجو در همهٔ بخش‌های سایت…",
  seeAll: "بیشتر ‹",
  results: "نتیجه",
  tabNews: "اخبار",
  tabEdu: "آموزش",
  tabTools: "ابزارها",
  tabProducts: "محصولات",
  tabJournal: "ژورنال نویسی",
  tabArticles: "مقالات",
  tabPodcast: "پادکست",

  acceptTerms: "با ثبت‌نام در اکوآذرین، {rules} و {privacy} را می‌پذیرم.",
  rules: "قوانین سایت",
  privacy: "حریم خصوصی",
  authPageTitle: "ورود و ثبت‌نام — اکوآذرین",
  otp: "رمز یکبارمصرف",
  mobileNumber: "شماره موبایل",
  forgotPass: "فراموشی رمز؟",
  enterAccount: "ورود به حساب",
  sendOtp: "ارسال کد",
  registerMobileLabel: "شماره موبایل",
  sendVerifyCode: "دریافت کد تایید",
  backToLogin: "بازگشت به ورود",
  forgotTitle: "بازیابی رمز عبور",
  forgotDesc: "برای بازیابی حساب، شماره موبایل خود را وارد کنید.",
  sendRecovery: "ارسال لینک بازیابی",
  verifyMobile: "تایید شماره موبایل",
  verifyDesc: "کد ۵ رقمی پیامک شده به {mobile} را وارد کنید.",
  verifyAction: "تایید کد",
  otpLoginSuccess: "ورود با موفقیت انجام شد!",
  resendOtpPrefix: "ارسال مجدد کد پس از",
  resendOtpSuffix: "دقیقه دیگر امکان‌پذیر است.",
  completeProfile: "تکمیل اطلاعات فردی",
  profileDesc: "لطفاً برای ادامه، نام و یک شناسه انتخاب کنید.",
  fullName: "نام و نام خانوادگی",
  fullNamePlaceholder: "مثال: علیرضا فیروزی",
  usernameEn: "شناسه کاربری (انگلیسی)",
  usernamePlaceholder: "alireza",
  signupSuccess: "ثبت‌نام با موفقیت انجام شد!",
  completeAction: "تکمیل و ورود",
  resetTitle: "رمز عبور جدید",
  resetDesc: "لطفاً رمز عبور جدید خود را وارد کنید.",
  newPass: "رمز عبور جدید",
  confirmPass: "تکرار رمز عبور",
  resetSuccess: "رمز عبور تغییر کرد.",
  resetAction: "تغییر رمز عبور",
  smartAlert: "هشدارهای هوشمند",
  smartAlertDesc: "دریافت سیگنال‌های لحظه‌ای و تغییرات بازار در کم‌ترین زمان",
  specialistEdu: "آموزش تخصصی",
  specialistEduDesc: "دسترسی به دوره‌ها و مقالات ویژه معامله‌گری حرفه‌ای",
  technicalAnalysis: "تحلیل تکنیکال",
  successRate: "%۸۲ موفقیت",
  siteTagline: "مسیر هوشمند سرمایه",
  home: "خانه",
  authWelcome: "ورود به دنیای بازارهای مالی",
  authDesc:
    "برای دسترسی به تمام امکانات پیشرفته و ابزارهای تحلیلی، ابتدا وارد حساب کاربری خود شوید یا ثبت‌نام کنید.",
  copyright: `© ${new Date().getFullYear()} تمامی حقوق مادی و معنوی محفوظ است.`
};
const EN_DICT = {
  login: "Sign in",
  signup: "Sign up",
  search: "Search",
  notifs: "Notifications",
  logout: "Sign out",
  profile: "My profile",
  dashboard: "My dashboard",
  settings: "Settings",
  upgrade: "Upgrade plan",
  journal: "My journal",
  langLabel: "Language",
  loginTitle: "Sign in",
  signupTitle: "Create account",
  username: "Username",
  password: "Password",
  loginHint: "Quick sign-in: use name EDI and password 123456789.",
  haveAccount: "Already have an account?",
  noAccount: "No account yet?",
  enter: "Sign in",
  signupAction: "Create",
  allNotifs: "All notifications",
  markAll: "Mark all as read",
  seeAllNotifs: "See all notifications",
  nothingFound: "Nothing found",
  memberOf: "EcoAzarin member",
  newBadge: "new",
  close: "Close",
  loginErr1: "Incorrect username or password.",
  loginErr2: "Enter valid name and password (min 4 bounds).",
  breakingNews: "Breaking News",
  allNews: "All News",
  appTitle: "eco azarin",
  appSubtitle: "smart finance hub",
  searchAll: "Search across the site...",
  seeAll: "See all ‹",
  results: "results",
  tabNews: "News",
  tabEdu: "Education",
  tabTools: "Tools",
  tabProducts: "Products",
  tabJournal: "Journal",
  tabArticles: "Articles",
  tabPodcast: "Podcast",

  acceptTerms: "By signing up, I agree to the {rules} and {privacy}.",
  rules: "Terms of Service",
  privacy: "Privacy Policy",
  authPageTitle: "Sign In / Sign Up — EcoAzarin",
  otp: "One-Time Password (OTP)",
  mobileNumber: "Mobile Number",
  forgotPass: "Forgot password?",
  enterAccount: "Sign In",
  sendOtp: "Send OTP",
  registerMobileLabel: "Mobile Number",
  sendVerifyCode: "Get Verification Code",
  backToLogin: "Back to Sign In",
  forgotTitle: "Recover Password",
  forgotDesc: "Enter your mobile number to recover your account.",
  sendRecovery: "Send Recovery Link",
  verifyMobile: "Verify Mobile",
  verifyDesc: "Enter the 5-digit code sent to {mobile}.",
  verifyAction: "Verify Code",
  otpLoginSuccess: "Successfully signed in!",
  resendOtpPrefix: "Resend code in",
  resendOtpSuffix: "seconds",
  completeProfile: "Complete Profile",
  profileDesc: "Please choose a name and username to continue.",
  fullName: "Full Name",
  fullNamePlaceholder: "e.g. John Doe",
  usernameEn: "Username",
  usernamePlaceholder: "johndoe",
  signupSuccess: "Sign up successful!",
  completeAction: "Complete & Sign In",
  resetTitle: "New Password",
  resetDesc: "Please enter your new password.",
  newPass: "New Password",
  confirmPass: "Confirm Password",
  resetSuccess: "Password has been reset.",
  resetAction: "Change Password",
  smartAlert: "Smart Alerts",
  smartAlertDesc: "Get real-time signals and market changes instantly",
  specialistEdu: "Specialist Education",
  specialistEduDesc: "Access exclusive courses and articles for pro trading",
  technicalAnalysis: "Technical Analysis",
  successRate: "82% Success",
  siteTagline: "Smart Finance Hub",
  home: "Home",
  authWelcome: "Enter the financial world",
  authDesc:
    "To access all advanced features and analytical tools, please sign in or create an account first.",
  copyright: `© ${new Date().getFullYear()} All rights reserved.`,
};

// ============== i18n DICTIONARY ==============
const DICT = {
  get FA() { 
    return FA_DICT; 
  },
  get EN() { return EN_DICT; },
};
const getLang = () => {
  try {
    return localStorage.getItem("eco-lang") || "FA";
  } catch (e) {
    return "FA";
  }
};
export const t = (k) => {
  const L = getLang();
  const val = (DICT[L] && DICT[L][k]) || DICT.FA[k] || k;
  // console.log("translate:", k, "->", val, "Lang:", L);
  return val;
};
window.t = t;
export const __ECO_LANG = getLang();
window.__ECO_LANG = __ECO_LANG;

// ============== USE LANG HOOK ==============
const useLang = () => {
  const [lang, setLang] = useState(getLang);
  useEffect(() => {
    try {
      localStorage.setItem("eco-lang", lang);
    } catch (e) {}
    document.documentElement.setAttribute("lang", lang === "EN" ? "en" : "fa");
    document.documentElement.setAttribute("dir", lang === "EN" ? "ltr" : "rtl");
    window.__ECO_LANG = lang;
    window.dispatchEvent(new CustomEvent("eco-lang-change", { detail: lang }));
  }, [lang]);
  return [lang, setLang];
};
// Force re-render of any component when lang changes
const useLangRefresh = () => {
  const [, force] = useState(0);
  useEffect(() => {
    const onChange = () => force((n) => n + 1);
    window.addEventListener("eco-lang-change", onChange);
    return () => window.removeEventListener("eco-lang-change", onChange);
  }, []);
};

const LangToggle = ({ className }) => {
  const [lang, setLang] = useLang();
  const onPick = (l) => {
    setLang(l);
    setTimeout(() => window.location.reload(), 60);
  };
  return (
    <div
      className={className || ""}
      role="group"
      aria-label={DICT[lang] && DICT[lang].langLabel}
    >
      <div className="hidden sm:flex bg-ink-700 light:bg-zinc-100/80 rounded-full p-1 text-[11px] font-mono">
        {["EN", "FA"].map((l) => (
          <button
            key={l}
            onClick={() => onPick(l)}
            aria-pressed={lang === l}
            className={`px-3 py-1 rounded-full transition-all duration-200 ${lang === l ? "bg-white light:bg-white text-black shadow-sm light:shadow-[0_1px_3px_rgba(0,0,0,0.05)] light:ring-1 light:ring-black/5 font-medium" : "text-zinc-400 light:text-zinc-500 hover:text-white light:hover:text-zinc-800"}`}
          >
            {l}
          </button>
        ))}
      </div>
      <div className="flex sm:hidden">
        <button
          onClick={() => onPick(lang === "EN" ? "FA" : "EN")}
          className="flex items-center justify-center h-8 w-8 rounded-lg bg-ink-700 light:bg-zinc-100/80 text-[11px] font-mono font-medium text-zinc-300 light:text-zinc-700 hover:bg-white light:hover:bg-white hover:text-black transition-all"
        >
          {lang === "EN" ? "FA" : "EN"}
        </button>
      </div>
    </div>
  );
};


export { DICT, getLang, useLang, useLangRefresh, LangToggle };
