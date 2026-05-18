import React from 'react';
import { IconClose } from '../ui/Icons';
const ModalShell = ({ onClose, title, icon, children, max = "820px" }) => (
  <div
    className="fixed inset-0 z-[110] flex items-center justify-center p-4"
    style={{ animation: "fadein .18s ease-out both" }}
  >
    <div
      className="absolute inset-0 bg-black/72 backdrop-blur-sm"
      onClick={onClose}
    />
    <div
      className="relative w-full bg-ink-800 border border-ink-500 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      style={{ maxWidth: max, maxHeight: "88vh" }}
    >
      <div className="px-5 py-4 border-b border-ink-500 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          {icon}
          <h3 className="text-[16px] font-bold">{title}</h3>
        </div>
        <button
          onClick={onClose}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-ink-700"
        >
          <IconClose size={16} />
        </button>
      </div>
      <div className="flex-1 overflow-auto scrollbar-hide">{children}</div>
    </div>
  </div>
);

// --- Settings ---

export { ModalShell };
