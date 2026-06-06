import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as Recharts from 'recharts';
const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { t, __ECO_LANG as ECO_LANG, getLang, LangToggle, useLang } from '../../i18n/index';
import { motion, AnimatePresence } from 'motion/react';
import { IconClose, IconArrowLeft } from '../ui/Icons';
import { TABS } from '../../data/mockData';
import { Avatar, useUser } from '../auth/AuthModals';
import { NotificationBell } from '../notifications/Notifications';
import { ModalShell } from './ModalShell';


import { SettingsModal } from './SettingsModal';
import { DashboardModal } from './DashboardModal';
import { UpgradeModal } from './UpgradeModal';

const ProfileMenu = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(null); // 'settings' | 'dashboard' | 'upgrade' | null
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  const openModal = (id) => {
    setOpen(false);
    setModal(id);
  };
  const lang = getLang();
  const ITEMS = [
    {
      id: "profile",
      fa: "پروفایل من",
      en: "My profile",
      icon: "👤",
      action: () => openModal("settings"),
    },
    {
      id: "dashboard",
      fa: "داشبورد من",
      en: "My dashboard",
      icon: "📊",
      action: () => openModal("dashboard"),
    },
    {
      id: "journal",
      fa: "ژورنال من",
      en: "My journal",
      icon: "📓",
      action: () => {
        location.href = "journal.html";
      },
    },
    {
      id: "settings",
      fa: "تنظیمات",
      en: "Settings",
      icon: "⚙",
      action: () => openModal("settings"),
    },
    {
      id: "upgrade",
      fa: "ارتقای حساب",
      en: "Upgrade",
      icon: "⭐",
      action: () => openModal("upgrade"),
      highlight: true,
    },
  ];
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 h-9 pe-1.5 ps-3 rounded-full bg-brand-green text-black hover:bg-brand-greenSoft transition shadow-[0_4px_14px_-6px_rgba(43,166,122,0.6)]"
      >
        <Avatar name={user.name} size={28} />
        <span
          className="text-[13px] font-bold leading-none flex items-center"
          style={{ paddingTop: 1 }}
        >
          {user.name}
        </span>
      </button>
      {open && (
        <div
          className="absolute top-11 start-0 w-[240px] bg-ink-800 border border-ink-500 rounded-xl shadow-2xl overflow-hidden z-50"
          style={{ animation: "fadein .15s ease-out both" }}
        >
          <div className="p-4 border-b border-ink-500 flex items-center gap-3">
            <Avatar name={user.name} size={42} />
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-bold leading-tight">
                {user.name}
              </div>
              <div className="text-[11px] text-zinc-500 mt-0.5 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400" />
                {lang === "EN" ? "Gold member" : "عضو طلایی"}
              </div>
            </div>
          </div>
          <ul className="p-2 grid gap-1 text-[13px]">
            {ITEMS.map((i) => (
              <li key={i.id}>
                <button
                  onClick={i.action}
                  className={`w-full text-end px-3 py-2 rounded-lg flex items-center gap-2.5 ${i.highlight ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 font-bold" : "hover:bg-ink-700 text-zinc-300"}`}
                >
                  <span className="text-[14px]">{i.icon}</span>
                  <span className="flex-1">{lang === "EN" ? i.en : i.fa}</span>
                </button>
              </li>
            ))}
            <li className="border-t border-ink-500/60 pt-1 mt-1">
              <button
                onClick={onLogout}
                className="w-full text-end px-3 py-2 rounded-lg hover:bg-brand-red/10 text-brand-redSoft flex items-center gap-2.5"
              >
                <span className="text-[14px]">↩</span>
                <span>{t("logout")}</span>
              </button>
            </li>
          </ul>
        </div>
      )}
      {modal === "settings" && (
        <SettingsModal user={user} onClose={() => setModal(null)} />
      )}
      {modal === "dashboard" && (
        <DashboardModal user={user} onClose={() => setModal(null)} />
      )}
      {modal === "upgrade" && <UpgradeModal onClose={() => setModal(null)} />}
    </div>
  );
};


export { ProfileMenu };