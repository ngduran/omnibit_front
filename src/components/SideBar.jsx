import React from 'react';

export default function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  return (
    <>
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-pastoral-primary text-pastoral-bg-soft p-5 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out
          md:static md:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#823a54]">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-pastoral-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
              <span className="text-xl font-black tracking-wider uppercase">OmniBit</span>
            </div>
            
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 rounded-lg hover:bg-[#823a54] md:hidden focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <nav className="space-y-2">
            <a href="#cargos" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-pastoral-accent text-pastoral-primary font-bold shadow-sm transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              Painel de Cargos
            </a>

            <a href="#usuarios" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#823a54] font-medium transition-all text-slate-300 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Usuários
            </a>

            <a href="#configuracoes" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#823a54] font-medium transition-all text-slate-300 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Configurações
            </a>
          </nav>
        </div>

        <div className="pt-4 border-t border-[#823a54] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-pastoral-accent flex items-center justify-center text-pastoral-primary font-bold">
            NB
          </div>
          <div className="overflow-hidden flex-1 hidden md:block">
            <h4 className="font-bold text-sm truncate">Norberto Note</h4>
            <p className="text-xs text-slate-300 truncate">Admin Sênior</p>
          </div>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}
    </>
  );
}