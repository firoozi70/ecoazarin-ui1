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
import { ProfileMenu } from './ProfileMenu';


const AuthButtons = () => {
  const [user, setUser] = useUser();
  if (user) return <ProfileMenu user={user} onLogout={() => setUser(null)} />;
  return (
    <div className="flex items-center gap-2">
      <a
        href="auth.html"
        className="inline-flex items-center gap-1 sm:gap-1.5 h-8 px-3 sm:h-9 sm:px-4 rounded-lg sm:rounded-xl text-[12px] sm:text-[13px] font-medium bg-brand-green text-black hover:bg-brand-greenSoft transition shadow-[0_4px_14px_-6px_rgba(16,185,129,0.5)]"
        aria-label={t("login")}
      >
        {t("login")}
        <IconArrowLeft size={14} className="hidden sm:block" />
      </a>
    </div>
  );
};

export { AuthButtons };