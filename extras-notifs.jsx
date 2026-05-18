// ============== NOTIFICATIONS ==============
const MOCK_NOTIFS_DEFAULT = [
  {
    id: 1,
    kind: "news",
    title: "هشدار قیمت طلا",
    body: "اونس جهانی به کانال جدید رسید — ۲٬۳۴۸ دلار.",
    time: "۲ دقیقه پیش",
    read: false,
  },
  {
    id: 2,
    kind: "edu",
    title: "دورهٔ جدید پایتون",
    body: "فصل ۳ دورهٔ پایتون برای بازار سرمایه منتشر شد.",
    time: "۱ ساعت پیش",
    read: false,
  },
  {
    id: 3,
    kind: "system",
    title: "گزارش هفتگی شما آماده است",
    body: "خلاصهٔ عملکرد هفتهٔ گذشتهٔ پرتفوی شما را ببینید.",
    time: "دیروز",
    read: false,
  },
  {
    id: 4,
    kind: "news",
    title: "بیت‌کوین به محدودهٔ حمایتی نزدیک شد",
    body: "کاهش ۲٫۱٪ در ۲۴ ساعت گذشته.",
    time: "۲ روز پیش",
    read: true,
  },
  {
    id: 5,
    kind: "system",
    title: "ورود جدید به حساب",
    body: "ورود از مرورگر کروم تأیید شد.",
    time: "هفتهٔ گذشته",
    read: true,
  },
];
const NotifIcon = ({ kind }) => {
  const cls = "h-8 w-8 rounded-lg flex items-center justify-center shrink-0";
  if (kind === "edu")
    return (
      <span
        className={`${cls} bg-emerald-500/15 text-emerald-300 border border-emerald-500/25`}
      >
        🎓
      </span>
    );
  if (kind === "system")
    return (
      <span
        className={`${cls} bg-zinc-500/15 text-zinc-300 border border-zinc-500/25`}
      >
        ⚙
      </span>
    );
  return (
    <span
      className={`${cls} bg-brand-red/15 text-brand-redSoft border border-brand-red/25`}
    >
      📰
    </span>
  );
};
const NotificationBell = () => {
  const [open, setOpen] = _us(false);
  const [modal, setModal] = _us(false);
  const [items, setItems] = _us(() => {
    try {
      const v = localStorage.getItem("eco-notifs");
      if (v) return JSON.parse(v);
    } catch (e) {}
    return MOCK_NOTIFS_DEFAULT;
  });
  _ue(() => {
    try {
      localStorage.setItem("eco-notifs", JSON.stringify(items));
    } catch (e) {}
  }, [items]);
  const wrapRef = _ur(null);
  _ue(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  const unread = items.filter((n) => !n.read).length;
  const markAll = () => setItems(items.map((n) => ({ ...n, read: true })));
  const toggleRead = (id) =>
    setItems(items.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));

  const Item = ({ n, big }) => (
    <button
      onClick={() => toggleRead(n.id)}
      className={`w-full text-right flex items-start gap-3 ${big ? "p-4" : "p-3"} rounded-xl border transition ${n.read ? "bg-ink-800/40 border-ink-500/60 opacity-60 hover:opacity-90" : "bg-ink-800 border-ink-500 hover:border-ink-400"}`}
    >
      <NotifIcon kind={n.kind} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {!n.read && (
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red shrink-0 shadow-[0_0_8px_currentColor]" />
          )}
          <h4
            className={`text-[13.5px] ${n.read ? "text-zinc-400 font-medium" : "text-white font-bold"} leading-6 line-clamp-1`}
          >
            {n.title}
          </h4>
        </div>
        <p
          className={`text-[12px] mt-1 leading-5 ${n.read ? "text-zinc-500" : "text-zinc-300"} ${big ? "" : "line-clamp-2"}`}
        >
          {n.body}
        </p>
        <div className="text-[10.5px] text-zinc-500 mt-1.5">{n.time}</div>
      </div>
    </button>
  );

  return (
    <div className="relative" ref={wrapRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative inline-flex items-center justify-center h-9 w-9 rounded-lg text-zinc-400 hover:text-white hover:bg-ink-700 transition"
        aria-label={t("notifs")}
      >
        <IconBell size={18} />
        {unread > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-brand-red ring-2 ring-ink-900 text-[9.5px] font-bold leading-[16px] text-white tabular-nums">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div
          className="fixed top-16 left-2 right-2 max-w-[400px] mx-auto sm:absolute sm:top-11 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto sm:w-[360px] sm:max-w-[none] bg-ink-800 border border-ink-500 rounded-xl shadow-2xl overflow-hidden z-50"
          style={{ animation: "fadein .18s ease-out both" }}
        >
          <div className="px-4 py-3 border-b border-ink-500 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IconBell size={14} />
              <span className="text-[13.5px] font-bold">{t("notifs")}</span>
              {unread > 0 && (
                <span className="label-peyda px-1.5 py-0 rounded-full bg-brand-red/20 text-brand-redSoft border border-brand-red/30">
                  {unread}
                </span>
              )}
            </div>
            <button
              onClick={markAll}
              className="text-[11.5px] text-zinc-400 hover:text-white"
            >
              {t("markAll")}
            </button>
          </div>
          <ul className="p-2 grid gap-2 max-h-[380px] overflow-auto scrollbar-hide">
            {items.slice(0, 5).map((n) => (
              <li key={n.id}>
                <Item n={n} />
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              setOpen(false);
              setModal(true);
            }}
            className="w-full px-4 py-3 text-[12.5px] text-brand-redSoft hover:bg-ink-700/60 border-t border-ink-500 transition"
          >
            {t("seeAllNotifs")}
          </button>
        </div>
      )}
      {modal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ animation: "fadein .2s ease-out both" }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setModal(false)}
          />
          <div className="relative w-full max-w-[640px] max-h-[85vh] bg-ink-800 border border-ink-500 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-ink-500 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <IconBell size={18} />
                <h3 className="text-[16px] font-bold">{t("allNotifs")}</h3>
                {unread > 0 && (
                  <span className="label-peyda px-2 py-0.5 rounded-full bg-brand-red/20 text-brand-redSoft border border-brand-red/30">
                    {unread} {t("newBadge")}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={markAll}
                  className="text-[12px] text-zinc-400 hover:text-white"
                >
                  {t("markAll")}
                </button>
                <button
                  onClick={() => setModal(false)}
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-ink-700"
                >
                  <IconClose size={16} />
                </button>
              </div>
            </div>
            <ul className="p-4 grid gap-2.5 overflow-auto scrollbar-hide">
              {items.map((n) => (
                <li key={n.id}>
                  <Item n={n} big />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

