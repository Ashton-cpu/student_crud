import React, { useState } from 'react';
import { GraduationCap, Database, Server, Settings, Check, X } from 'lucide-react';
import { getApiRoot } from '../services/studentService';

export function Navbar({ totalCount, onRefresh }) {
  const [showConfig, setShowConfig] = useState(false);
  const [apiUrl, setApiUrl] = useState(getApiRoot());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveConfig = (e) => {
    e.preventDefault();
    if (apiUrl.trim()) {
      localStorage.setItem('CUSTOM_API_BASE_URL', apiUrl.trim());
    } else {
      localStorage.removeItem('CUSTOM_API_BASE_URL');
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setShowConfig(false);
      onRefresh();
    }, 800);
  };

  const isLive = Boolean(getApiRoot() || import.meta.env.VITE_API_BASE_URL);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2.5 rounded-xl text-white shadow-sm flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                Student Portal
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Vite + React + Spring Boot CRUD System
              </p>
            </div>
          </div>

          {/* Quick Metrics & Mode Indicator */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
              Total Students: <span className="text-indigo-600 ml-1">{totalCount}</span>
            </span>

            {/* Connection Mode Pill */}
            <button
              onClick={() => setShowConfig(!showConfig)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition border cursor-pointer ${
                isLive
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
              }`}
              title="Click to configure API connection"
            >
              {isLive ? <Server className="w-3.5 h-3.5" /> : <Database className="w-3.5 h-3.5" />}
              <span>{isLive ? 'Connected / Live API' : 'Local Mock Mode'}</span>
              <Settings className="w-3 h-3 opacity-60 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Expandable API Config Drawer (No Modal, inline under Navbar) */}
        {showConfig && (
          <div className="py-3 px-4 mb-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Settings className="w-3.5 h-3.5 text-indigo-600" />
                Backend API URL Override
              </span>
              <button
                type="button"
                onClick={() => setShowConfig(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveConfig} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                placeholder="e.g. https://student-backend-xxxx.onrender.com or leave empty"
                className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-xs"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition flex items-center justify-center gap-1 shrink-0 cursor-pointer"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Saved!
                  </>
                ) : (
                  'Apply URL'
                )}
              </button>
            </form>
            <p className="mt-1.5 text-[11px] text-slate-500">
              On Render, this is automatically injected via Render Blueprint. Leave blank for local development proxy.
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
