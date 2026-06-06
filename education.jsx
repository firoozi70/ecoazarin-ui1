// education.jsx — آموزش جامع
const { useState: eUS } = React;
const E_TRACKS = [
  { id:'beginner', l:'تازه‌کار', d:'از صفر تا اولین معامله', color:'#10B981', courses:18, hours:120, icon:'🌱' },
  { id:'inter',    l:'متوسط',   d:'تحلیل تکنیکال و فاندامنتال', color:'#3B82F6', courses:24, hours:180, icon:'📊' },
  { id:'pro',      l:'حرفه‌ای',  d:'استراتژی و مدیریت سرمایه', color:'#F59E0B', courses:16, hours:140, icon:'⚡' },
  { id:'algo',     l:'کوانت',   d:'برنامه‌نویسی و الگوریتم', color:'#A855F7', courses:12, hours:160, icon:'⚙' },
];
const E_TOPICS = ['تحلیل تکنیکال','تحلیل بنیادی','مدیریت ریسک','روان‌شناسی بازار','پرایس اکشن','پایتون برای بازار','الگوریتمیک','اقتصاد کلان','مشتقه','اختیار معامله','صندوق‌ها','بک‌تست','بازار طلا','کریپتو','فارکس','بورس'];
const E_COURSES = [
  { title:'پرایس اکشن از صفر تا صد', inst:'فرشید شیرافکن', hours:42, lessons:86, level:'متوسط', price:'۸۹۰٬۰۰۰', oldPrice:'۱٬۸۰۰٬۰۰۰', off:'-۵۰٪', students:'۱۲٬۴۰۰', rating:4.8, badge:'پرفروش‌ترین' },
  { title:'مدیریت ریسک و سرمایه پیشرفته', inst:'علی محمدی', hours:18, lessons:32, level:'حرفه‌ای', price:'۵۹۰٬۰۰۰', oldPrice:'۹۸۰٬۰۰۰', off:'-۴۰٪', students:'۸٬۲۰۰', rating:4.9, badge:null },
  { title:'پایتون برای معامله‌گران', inst:'پژمان اقبالی', hours:36, lessons:74, level:'کوانت', price:'۱٬۲۹۰٬۰۰۰', oldPrice:null, off:null, students:'۵٬۶۰۰', rating:4.7, badge:'جدید' },
  { title:'تحلیل بنیادی بازار سرمایه', inst:'مهرداد سعدی', hours:28, lessons:54, level:'متوسط', price:'۶۹۰٬۰۰۰', oldPrice:'۹۸۰٬۰۰۰', off:'-۳۰٪', students:'۷٬۸۰۰', rating:4.6, badge:null },
  { title:'روان‌شناسی معامله‌گر', inst:'دکتر سارا اکبری', hours:14, lessons:28, level:'تازه‌کار', price:'۳۹۰٬۰۰۰', oldPrice:null, off:null, students:'۹٬۸۰۰', rating:4.9, badge:null },
  { title:'استراتژی‌های اسکالپ روزانه', inst:'حسام رنجبر', hours:22, lessons:46, level:'حرفه‌ای', price:'۸۹۰٬۰۰۰', oldPrice:'۱٬۲۸۰٬۰۰۰', off:'-۳۰٪', students:'۴٬۲۰۰', rating:4.5, badge:null },
];
const LEVEL_COLOR = { 'تازه‌کار':'#10B981', 'متوسط':'#3B82F6', 'حرفه‌ای':'#F59E0B', 'کوانت':'#A855F7' };

function EducationContent(){
  const [track, setTrack] = eUS('all');
  const [topic, setTopic] = eUS('');
  const filtered = E_COURSES.filter(c => (!topic || c.title.includes(topic) || c.inst.includes(topic)));
  return (
    <section className="px-4 md:px-6 max-w-[1400px] mx-auto" data-screen-label="Education">
      {/* hero */}
      <div className="bg-gradient-to-bl from-brand-green/15 via-ink-800 to-ink-800 border border-ink-500 rounded-2xl p-7 md:p-10 mb-6 relative overflow-hidden">
        <div className="absolute top-4 start-6 w-40 h-40 rounded-full orb-green opacity-40" />
        <div className="relative grid md:grid-cols-[1fr_auto] items-center gap-6">
          <div>
            <span className="text-[11px] px-2.5 py-1 rounded-md bg-brand-green/15 border border-brand-green/30 text-brand-green font-bold">🎓 آکادمی اکوآذرین</span>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-3 tracking-tight leading-tight">بازار رو نه با حدس، با دانش معامله کن.</h1>
            <p className="text-zinc-300 text-[13.5px] mt-3 max-w-xl leading-7">۷۰+ دوره از مبتدی تا پیشرفته، توسط تحلیلگران و مدرس‌های شناخته‌شدهٔ بازار. با گواهی‌نامهٔ معتبر.</p>
            <div className="flex gap-2 mt-5"><button className="h-11 px-5 rounded-xl bg-brand-green text-black font-bold text-[13px] hover:bg-brand-greenSoft transition">شروع رایگان</button><button className="h-11 px-5 rounded-xl border border-ink-400 text-white text-[13px] hover:bg-ink-700 transition">مشاهدهٔ دوره‌ها</button></div>
          </div>
          <div className="grid grid-cols-3 gap-4 md:gap-6 text-center">
            <div><div className="text-[28px] font-extrabold stat-num text-brand-green">۷۰+</div><div className="text-[11px] text-zinc-400">دوره</div></div>
            <div><div className="text-[28px] font-extrabold stat-num text-brand-green">۲۸K</div><div className="text-[11px] text-zinc-400">دانشجو</div></div>
            <div><div className="text-[28px] font-extrabold stat-num text-brand-green">۹۸٪</div><div className="text-[11px] text-zinc-400">رضایت</div></div>
          </div>
        </div>
      </div>

      {/* tracks */}
      <h2 className="text-[15px] font-bold mb-3 mt-2">مسیرهای یادگیری</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {E_TRACKS.map(tr=>(
          <button key={tr.id} onClick={()=>setTrack(tr.id)} className={`text-end bg-ink-800 border rounded-xl p-4 transition hover:border-ink-400 ${track===tr.id?'border-2':'border'}`} style={{ borderColor: track===tr.id?tr.color:undefined }}>
            <div className="flex items-center gap-3 mb-3"><span className="h-10 w-10 rounded-xl flex items-center justify-center text-[20px]" style={{ background: tr.color+'20', border:`1px solid ${tr.color}40` }}>{tr.icon}</span><div className="flex-1"><div className="text-[14px] font-extrabold" style={{ color: tr.color }}>{tr.l}</div><div className="text-[10.5px] text-zinc-500">{tr.d}</div></div></div>
            <div className="flex items-center justify-between text-[11px] text-zinc-400"><span>{tr.courses} دوره</span><span>{tr.hours} ساعت</span></div>
          </button>
        ))}
      </div>

      {/* topics */}
      <div className="flex items-center gap-2 flex-wrap mb-5">
        <span className="text-[11.5px] text-zinc-500">موضوع:</span>
        <button onClick={()=>setTopic('')} className={`px-3 py-1 rounded-full text-[11.5px] border transition ${!topic?'bg-white text-black border-white font-bold':'bg-ink-800 text-zinc-300 border-ink-500 hover:border-ink-400'}`}>همه</button>
        {E_TOPICS.map(tp=><button key={tp} onClick={()=>setTopic(tp)} className={`px-3 py-1 rounded-full text-[11.5px] border transition ${topic===tp?'bg-white text-black border-white font-bold':'bg-ink-800 text-zinc-300 border-ink-500 hover:border-ink-400'}`}>{tp}</button>)}
      </div>

      {/* courses grid */}
      <h2 className="text-[15px] font-bold mb-3">دوره‌های منتخب</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filtered.map((c,i)=>(
          <article key={i} className="bg-ink-800 border border-ink-500 rounded-xl overflow-hidden hover:border-ink-400 transition group flex flex-col">
            <div className="relative aspect-[16/9] overflow-hidden" style={{ background:`linear-gradient(135deg, ${LEVEL_COLOR[c.level]}30, ${LEVEL_COLOR[c.level]}05)` }}>
              <div className="absolute inset-0 dotted-bg opacity-40" />
              <div className="absolute top-2.5 end-2.5 flex gap-1.5">{c.badge && <span className="label-peyda px-2 py-0.5 rounded-md bg-brand-red text-white">{c.badge}</span>}{c.off && <span className="label-peyda px-2 py-0.5 rounded-md bg-brand-green text-black">{c.off}</span>}</div>
              <div className="absolute bottom-2.5 start-2.5 px-2 py-0.5 rounded-md text-[10.5px] font-bold" style={{ background: LEVEL_COLOR[c.level]+'30', color:LEVEL_COLOR[c.level], border:`1px solid ${LEVEL_COLOR[c.level]}50` }}>{c.level}</div>
              <div className="absolute inset-0 flex items-center justify-center"><span className="h-12 w-12 rounded-full bg-white/90 text-black flex items-center justify-center text-[20px] group-hover:scale-110 transition">▶</span></div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-center gap-1 text-[10.5px] text-amber-400 mb-1">★★★★★ <span className="text-zinc-400 me-1">{c.rating} ({c.students})</span></div>
              <h3 className="text-[14.5px] font-bold leading-7 line-clamp-2 group-hover:text-brand-green transition flex-1">{c.title}</h3>
              <div className="text-[11.5px] text-zinc-400 mt-1.5">مدرس: {c.inst}</div>
              <div className="flex items-center gap-3 mt-2 text-[10.5px] text-zinc-500"><span>⏱ {c.hours} ساعت</span><span>📺 {c.lessons} درس</span></div>
              <div className="flex items-end justify-between mt-3 pt-3 border-t border-ink-500/60">
                <div>
                  {c.oldPrice && <div className="text-[10.5px] text-zinc-500 line-through num-display">{c.oldPrice}</div>}
                  <div className="text-[15px] font-extrabold stat-num text-brand-green">{c.price}<span className="text-[10px] font-medium text-zinc-500 me-1">تومان</span></div>
                </div>
                <button className="h-9 px-3 rounded-lg bg-ink-700 text-white text-[11.5px] font-bold hover:bg-brand-green hover:text-black transition">ثبت‌نام</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* free resources */}
      <div className="grid md:grid-cols-3 gap-3 mb-6">
        {[
          {i:'🎬', t:'وبینارهای رایگان', d:'هر چهارشنبه ساعت ۲۰ — تحلیل زنده بازار', cta:'ثبت‌نام در وبینار بعدی'},
          {i:'📖', t:'کتابخانهٔ منابع', d:'۲۰۰+ مقاله و چیت‌شیت رایگان', cta:'مرور کتابخانه'},
          {i:'🎙', t:'پادکست هفتگی', d:'گفت‌وگو با تحلیلگران بازار', cta:'گوش کن'}
        ].map((r,i)=>(
          <a href="#" key={i} className="bg-ink-800 border border-ink-500 rounded-xl p-5 hover:border-ink-400 transition flex items-start gap-4">
            <span className="text-[28px]">{r.i}</span>
            <div className="flex-1"><div className="text-[14px] font-bold mb-1">{r.t}</div><div className="text-[12px] text-zinc-400 leading-6 mb-2">{r.d}</div><div className="text-[11.5px] text-brand-green font-bold">{r.cta} ›</div></div>
          </a>
        ))}
      </div>
    </section>
  );
}
function App(){ return <PageShell slug="education"><EducationContent /></PageShell>; }
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
