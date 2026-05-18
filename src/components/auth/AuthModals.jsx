import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import * as Recharts from 'recharts';
const { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } = Recharts;
import { t } from '../../i18n/index';
import { motion, AnimatePresence } from 'motion/react';
import { LangToggle } from '../../i18n/index';
import { IconClose } from '../ui/Icons';

// ============== AUTH ==============
const DEFAULT_USERS = [{ name: "EDI", pass: "123456789" }];
const useUser = () => {
  const [user, setUser] = useState(() => {
    try {
      const v = localStorage.getItem("eco-user");
      return v ? JSON.parse(v) : null;
    } catch (e) {
      return null;
    }
  });
  useEffect(() => {
    try {
      user
        ? localStorage.setItem("eco-user", JSON.stringify(user))
        : localStorage.removeItem("eco-user");
    } catch (e) {}
  }, [user]);
  return [user, setUser];
};
const Avatar = ({ name, size = 24, src }) => (
  <span
    className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-brand-greenSoft to-brand-green text-black font-bold shrink-0 overflow-hidden ring-1 ring-black/10"
    style={{ width: size, height: size, fontSize: size * 0.42, lineHeight: 1 }}
  >
    {src ? (
      <img src={src} className="w-full h-full object-cover" alt="" />
    ) : (
      (name || "?").slice(0, 2).toUpperCase()
    )}
  </span>
);
const AuthModal = ({ mode: initialMode, onClose, onLogin }) => {
  const [mode, setMode] = useState(initialMode || "login");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      const ok = DEFAULT_USERS.find(
        (u) =>
          u.name.toLowerCase() === name.trim().toLowerCase() && u.pass === pass,
      );
      if (!ok) {
        setErr(t("loginErr1"));
        return;
      }
      onLogin({ name: ok.name });
      onClose();
    } else {
      if (!name.trim() || pass.length < 4) {
        setErr(t("loginErr2"));
        return;
      }
      onLogin({ name: name.trim() });
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ animation: "fadein .18s ease-out both" }}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-[420px] bg-ink-800 border border-ink-500 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 pt-6 pb-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[18px] font-bold">
              {mode === "login" ? t("loginTitle") : t("signupTitle")}
            </h3>
            <div className="flex items-center gap-2">
              <LangToggle className="flex bg-ink-700/60 rounded-full p-0.5 text-[11px] font-mono" />
              <button
                onClick={onClose}
                className="h-8 w-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-ink-700"
              >
                <IconClose size={16} />
              </button>
            </div>
          </div>
          <p className="text-[12.5px] text-zinc-400 leading-6 mb-4">
            {t("loginHint")}
          </p>
        </div>
        <form onSubmit={submit} className="px-6 pb-6 grid gap-3">
          <label className="block">
            <span className="text-[12px] text-zinc-400 block mb-1.5">
              {t("username")}
            </span>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErr("");
              }}
              className="w-full h-11 px-3 rounded-lg bg-ink-900 border border-ink-500 text-white text-[14px] outline-none focus:border-brand-red"
              placeholder="EDI"
              autoFocus
            />
          </label>
          <label className="block">
            <span className="text-[12px] text-zinc-400 block mb-1.5">
              {t("password")}
            </span>
            <input
              type="password"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
                setErr("");
              }}
              className="w-full h-11 px-3 rounded-lg bg-ink-900 border border-ink-500 text-white text-[14px] outline-none focus:border-brand-red ltr-num"
              placeholder="••••••••"
            />
          </label>
          {err && (
            <div className="text-[12px] text-brand-redSoft bg-brand-red/10 border border-brand-red/30 rounded-lg px-3 py-2">
              {err}
            </div>
          )}
          <button
            type="submit"
            className="h-11 rounded-xl bg-brand-green text-black font-bold text-[14px] hover:bg-brand-greenSoft transition"
          >
            {mode === "login" ? t("enter") : t("signupAction")}
          </button>
          <div className="text-center text-[12.5px] text-zinc-400 pt-1">
            {mode === "login" ? (
              <>
                {t("noAccount")}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setErr("");
                  }}
                  className="text-brand-redSoft hover:text-brand-red font-semibold"
                >
                  {t("signupAction")}
                </button>
              </>
            ) : (
              <>
                {t("haveAccount")}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setErr("");
                  }}
                  className="text-brand-redSoft hover:text-brand-red font-semibold"
                >
                  {t("enter")}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};


export { DEFAULT_USERS, useUser, Avatar, AuthModal };
