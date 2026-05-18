import * as Recharts from 'recharts';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { motion, AnimatePresence } from 'motion/react';
import { LiveTicker, Header } from './Header';
import { ThemeToggle } from '../components/home/Misc';
import { Footer } from './Footer';

// =====================================================================
// page-shell.jsx — shared chrome wrapper (Ticker, Header, Footer)
// Each new page calls <PageShell slug="journal">{content}</PageShell>
// =====================================================================


const PageShell = ({ slug, children }) => {
  if (slug && typeof window !== 'undefined') window.PAGE_SLUG = slug;
  return (
    <div dir="rtl" lang="fa" className="min-h-screen bg-ink-900 text-white">
      <LiveTicker />
      <Header rightSlot={<ThemeToggle />} />
      <main className="pb-12 pt-6">{children}</main>
      <Footer />
    </div>
  );
};
window.PageShell = PageShell;

export { PageShell };
