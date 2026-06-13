import React from 'react';

export default function Topbar({ setIsMobileMenuOpen }) {
  return (
    <header className="h-16 bg-pastoral-card-bg border-b border-pastoral-border px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 rounded-xl border border-pastoral-border hover:bg-pastoral-bg-soft md:hidden text-pastoral-primary focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <h2 className="text-xl font-bold text-pastoral-primary hidden sm:block">Painel Administrativo ERP</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex gap-1.5 text-lg bg-pastoral-bg-soft p-1.5 rounded-xl border border-pastoral-border">
          <span className="cursor-pointer hover:scale-110 transition-transform" title="PT-BR">🇧🇷</span>
          <span className="cursor-pointer hover:scale-110 transition-transform" title="PY">🇵🇾</span>
        </div>
        
        <div className="relative p-2 text-slate-500 hover:text-pastoral-primary cursor-pointer rounded-xl hover:bg-pastoral-bg-soft transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
      </div>
    </header>
  );
}