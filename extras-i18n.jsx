const { useState: _us, useEffect: _ue, useRef: _ur } = window.React;

const FA_FALLBACK = {
  login: "ورود",
  breakingNews: "خبر فوری",
  appTitle: "eco azarin",
  appSubtitle: "مسیر هوشمند سرمایه",
  allNews: "همه اخبار",
  logout: "خروج",
  search: "جستجو",
};

// ============== i18n DICTIONARY ==============
const DICT = {
  get FA() { 
    return window.DICT_FA || FA_FALLBACK; 
  },
  get EN() { return window.DICT_EN || {}; },
};
const getLang = () => {
  try {
    return localStorage.getItem("eco-lang") || "FA";
  } catch (e) {
    return "FA";
  }
};
window.t = (k) => {
  const L = getLang();
  const val = (DICT[L] && DICT[L][k]) || DICT.FA[k] || k;
  // console.log("translate:", k, "->", val, "Lang:", L);
  return val;
};
window.__ECO_LANG = getLang();

// ============== USE LANG HOOK ==============
const useLang = () => {
  const [lang, setLang] = _us(getLang);
  _ue(() => {
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
  const [, force] = _us(0);
  _ue(() => {
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

