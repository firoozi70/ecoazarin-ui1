import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
import { PageShell } from '../layouts/PageShell';
import { useLang } from '../i18n';

function ContactContent() {
  const [lang] = useLang();
  const isEn = lang === 'EN';

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section className="px-4 md:px-6 max-w-[1400px] mx-auto py-12" data-screen-label="Contact Us">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
          {isEn ? "Contact Us" : "تماس با ما"}
        </h1>
        <p className="text-zinc-400 light:text-zinc-500 text-[15px] max-w-xl mx-auto">
          {isEn ? "Have a question or need assistance? Get in touch with us. We are always ready to help." : "آیا سوالی دارید یا نیازمند راهنمایی هستید؟ با ما در ارتباط باشید. ما همیشه آماده پاسخگویی به شما هستیم."}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Contact Info & Map */}
        <div className="space-y-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-ink-850 light:bg-white light:shadow-sm p-6 rounded-2xl border border-ink-500 light:border-zinc-200">
              <div className="w-10 h-10 rounded-xl bg-ink-700 flex items-center justify-center text-xl mb-4 text-brand-green">📍</div>
              <h3 className="font-bold mb-2 text-start">{isEn ? "Head Office" : "آدرس دفتر مرکزی"}</h3>
              <p className="text-[13px] text-zinc-400 light:text-zinc-500 leading-relaxed text-start">
                {isEn 
                  ? "2nd Floor, No 15, Alley 1, Eram Sq, Eram Blvd, Shiraz, Iran" 
                  : "شیراز، بلوار ارم، میدان ارم، کوچه ۱، پلاک ۱۵، طبقه ۲"}
              </p>
            </div>
            <div className="bg-ink-850 light:bg-white light:shadow-sm p-6 rounded-2xl border border-ink-500 light:border-zinc-200">
              <div className="w-10 h-10 rounded-xl bg-ink-700 flex items-center justify-center text-xl mb-4 text-brand-red">📞</div>
              <h3 className="font-bold mb-2">{isEn ? "Contact Info" : "اطلاعات تماس"}</h3>
              <p className="text-[13px] text-zinc-400 light:text-zinc-500 mb-1 ltr-num" dir="ltr">+98 71 3222 7777</p>
              <p className="text-[13px] text-zinc-400 light:text-zinc-500 mb-1 ltr-num" dir="ltr">+98 71 3222 6666</p>
              <a href="mailto:info@ecoazarin.com" className="text-[13px] text-brand-green hover:underline">info@ecoazarin.com</a>
            </div>
          </div>

          <div className="bg-ink-850 light:bg-white light:shadow-sm rounded-2xl border border-ink-500 light:border-zinc-200 overflow-hidden h-[300px] relative">
            {/* Mock Map iframe (Google Maps embed for Shiraz) */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111075.6179373979!2d52.45781465225103!3d29.620021319200424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fb2120025dcdcdb%3A0xe67dbed609fba502!2sShiraz%2C%20Fars%20Province%2C%20Iran!5e0!3m2!1sen!2sus!4v1683056082987!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 opacity-80 map-iframe"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-ink-850 light:bg-white light:shadow-sm border border-ink-500 light:border-zinc-200 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-6">{isEn ? "Send a Message" : "ارسال پیام"}</h2>
          
          {submitted ? (
            <div className="bg-brand-green/10 border border-brand-green/30 text-brand-green p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-bold text-lg mb-2">{isEn ? "Message sent successfully" : "پیام شما با موفقیت ارسال شد"}</h3>
              <p className="text-[13px]">{isEn ? "Our experts will contact you soon." : "کارشناسان ما به زودی با شما تماس خواهند گرفت."}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[13px] text-zinc-400 light:text-zinc-500 mb-2 font-medium">{isEn ? "Full Name" : "نام و نام خانوادگی"}</label>
                <input 
                  type="text" 
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full bg-ink-900 light:bg-zinc-50 border border-ink-500 light:border-zinc-200 rounded-xl px-4 py-3 text-[14px] text-zinc-100 light:text-zinc-900 focus:outline-none focus:border-brand-green transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-[13px] text-zinc-400 light:text-zinc-500 mb-2 font-medium">{isEn ? "Email or Phone" : "ایمیل یا شماره تماس"}</label>
                <input 
                  type="text" 
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className="w-full bg-ink-900 light:bg-zinc-50 border border-ink-500 light:border-zinc-200 rounded-xl px-4 py-3 text-[14px] text-zinc-100 light:text-zinc-900 focus:outline-none focus:border-brand-green transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-[13px] text-zinc-400 light:text-zinc-500 mb-2 font-medium">{isEn ? "Message Body" : "متن پیام"}</label>
                <textarea 
                  required
                  rows="5"
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className="w-full bg-ink-900 light:bg-zinc-50 border border-ink-500 light:border-zinc-200 rounded-xl px-4 py-3 text-[14px] text-zinc-100 light:text-zinc-900 focus:outline-none focus:border-brand-green transition-colors resize-none disabled:opacity-50"
                  disabled={isSubmitting}
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-12 bg-brand-green text-black font-bold rounded-xl hover:bg-brand-greenSoft transition-colors flex items-center justify-center gap-2 disabled:opacity-70 border-none outline-none"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    {isEn ? "Sending..." : "در حال ارسال..."}
                  </>
                ) : (isEn ? "Send Message" : 'ارسال پیام')}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <PageShell slug="contact">
      <ContactContent />
    </PageShell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
