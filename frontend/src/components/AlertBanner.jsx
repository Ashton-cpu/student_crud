import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function AlertBanner({ alert, onClose }) {
  if (!alert) return null;

  const styles = {
    success: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    },
    error: {
      bg: 'bg-rose-50 border-rose-200 text-rose-800',
      icon: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    },
    info: {
      bg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
      icon: <Info className="w-5 h-5 text-indigo-600 shrink-0" />,
    },
  }[alert.type || 'info'];

  return (
    <div
      className={`border rounded-xl px-4 py-3 flex items-start justify-between gap-3 shadow-xs transition-all duration-200 ${styles.bg}`}
      role="alert"
    >
      <div className="flex items-center gap-3">
        {styles.icon}
        <p className="text-sm font-medium">{alert.message}</p>
      </div>
      <button
        onClick={onClose}
        className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-black/5 transition"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
