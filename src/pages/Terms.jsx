import ReactDOM from 'react-dom/client';
import React from 'react';
import { PageShell } from '../layouts/PageShell';
import { useLang } from '../i18n';
import { FileText, UserCheck, AlertTriangle, Copyright, Scale } from 'lucide-react';
import { motion } from 'motion/react';

function TermsContent() {
  const [lang] = useLang();
  const isEn = lang === 'EN';

  const sections = [
    {
      icon: <Scale className="w-6 h-6" />,
      title_en: 'Acceptance of Terms',
      title_fa: 'پذیرش شرایط',
      text_en: 'By using EcoAzarin, you agree to these terms. These may be updated in the future. Continued use indicates acceptance.',
      text_fa: 'با ثبت نام و استفاده از خدمات اکوآذرین، شما موافقت خود را با تمامی این شرایط و قوانین اعلام می‌کنید. این شرایط ممکن است در آینده بروزرسانی شوند.'
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title_en: 'User Account',
      title_fa: 'حساب کاربری',
      text_en: 'You are responsible for your account security. Automated bots/crawlers are strictly forbidden. We hold no liability for negligence.',
      text_fa: 'مسئولیت حفظ امنیت رمز عبور و اطلاعات حساب با کاربر است. استفاده از سیستم‌های خودکار (بات‌ها و اسکریپت‌ها) برای دسترسی اکیداً ممنوع است.'
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title_en: 'Financial Disclaimer',
      title_fa: 'سلب مسئولیت مالی',
      text_en: 'All reports and analyses are purely educational. EcoAzarin does not accept liability for financial losses. Trading decisions are yours alone.',
      text_fa: 'تمامی تحلیل‌ها و گزارش‌ها جنبه آموزشی دارند. اکوآذرین مسئولیتی در قبال زیان‌های مالی نمی‌پذیرد. تصمیمات معاملاتی منحصراً بر عهده خود سرمایه‌گذار است.'
    },
    {
      icon: <Copyright className="w-6 h-6" />,
      title_en: 'Intellectual Property',
      title_fa: 'مالکیت معنوی',
      text_en: 'All content is heavily copyrighted. Copying, scraping, or redistributing without express permission is strictly prohibited.',
      text_fa: 'کلیه حقوق مادی و معنوی محتوا متعلق به پلتفرم اکوآذرین می‌باشد. هرگونه کپی‌برداری یا بازنشر بدون مجوز کتبی پیگرد قانونی دارد.'
    }
  ];

  return (
    <section className="px-4 md:px-6 max-w-5xl mx-auto py-16" data-screen-label="Terms">
      <div className="mb-16 text-center max-w-2xl mx-auto">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-6 text-brand-green"
        >
          <FileText size={32} />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-zinc-900 dark:text-white">
          {isEn ? 'Terms of Service' : 'شرایط و قوانین'}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-[15px] leading-relaxed">
          {isEn ? 'Please read these terms carefully before using the EcoAzarin platform.' 
                : 'لطفاً پیش از استفاده از پلتفرم اکوآذرین، شرایط و قوانین زیر را به دقت مطالعه فرمایید.'}
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
          {isEn ? 'By continuing to use EcoAzarin, you agree to our terms of service.' : 'استفاده مداوم شما از اکوآذرین به منزله پذیرش این شرایط است.'}
        </p>
        <p className="mt-2 text-[13px] text-zinc-500">
          {isEn ? 'Questions? ' : 'سوالات بیشتر؟ '}
          <a href="/contact.html" className="text-brand-green hover:underline">
            {isEn ? 'Contact our team' : 'تماس با تیم ما'}
          </a>
        </p>
      </motion.div>
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
