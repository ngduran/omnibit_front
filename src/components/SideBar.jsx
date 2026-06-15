import React, { useState } from 'react';

// ============================================================================
// 1️⃣ SUB-COMPONENTE: LOGOTIPO E BOTÃO FECHAR (MOBILE)
// ============================================================================
function SidebarHeader({ setIsMobileMenuOpen }) {
  return (
    <div className="flex items-center justify-between mb-8 pb-4 border-b border-pastoral-primary-light">
      <div className="flex items-center gap-3">
        <img 
          src="/pastoral-logo.webp" 
          alt="OmniBit Logo" 
          className="w-9 h-9 object-contain drop-shadow-sm"
        />

        <span className="text-xl font-black tracking-wider uppercase">OmniBit</span>
      </div>
      
      <button 
        onClick={() => setIsMobileMenuOpen(false)}
        className="p-1 rounded-lg hover:bg-pastoral-primary-light md:hidden focus:outline-none cursor-pointer"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  );
}

// ============================================================================
// 2️⃣ SUB-COMPONENTE: ITEM DE MENU INDIVIDUAL (SUPORTA SUB-MENUS)
// ============================================================================
function MenuItem({ icon, label, href, subItems, isActive }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubItems = subItems && subItems.length > 0;

  const handleTrigger = (e) => {
    if (hasSubItems) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="space-y-1">
      <a 
        href={href || '#'} 
        onClick={handleTrigger}
        className={`
          flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all cursor-pointer group
          ${isActive && !hasSubItems
            ? 'bg-pastoral-accent text-pastoral-primary font-bold shadow-sm' 
            : 'text-slate-300 hover:bg-pastoral-primary-light hover:text-white'}
        `}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
        </div>

        {hasSubItems && (
          <svg 
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        )}
      </a>

      {hasSubItems && (
        <div className={`pl-9 space-y-1 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
          {subItems.map((sub, index) => (
            <a
              key={index}
              href={sub.href}
              className={`
                block px-4 py-2 text-sm rounded-lg transition-all text-slate-400 hover:text-white hover:bg-pastoral-primary-light/50
                ${sub.isActive ? 'text-pastoral-accent font-bold' : ''}
              `}
            >
              {sub.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 3️⃣ SUB-COMPONENTE: MENU DE NAVEGAÇÃO COMPLETO
// ============================================================================
function NavigationMenu() {
  return (
    <nav className="space-y-2 flex-1 overflow-y-auto">
      <MenuItem 
        label="Início" 
        href="#dashboard"
        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 00-1-1h-3a1 1 0 00-1 1v4a1 1 0 001 1m6 0v9"></path></svg>} 
      />

      <MenuItem 
        label="Controle de Acesso"
        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>}
        subItems={[
          { label: 'Painel de Cargos', href: '#cargos', isActive: true },
          { label: 'Usuários', href: '#usuarios' },
        ]}
      />

      <MenuItem 
        label="Configurações" 
        href="#configuracoes"
        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>} 
      />
    </nav>
  );
}

// ============================================================================
// 4️⃣ SUB-COMPONENTE: RODAPÉ DE PERFIL DO USUÁRIO
// ============================================================================
function UserProfileFooter() {
  return (
    <div className="pt-4 border-t border-pastoral-primary-light flex items-center gap-3 mt-auto">
      <div className="w-10 h-10 rounded-full bg-pastoral-accent flex items-center justify-center text-pastoral-primary font-bold shadow-sm">
        NB
      </div>
      <div className="overflow-hidden flex-1 hidden md:block">
        <h4 className="font-bold text-sm truncate text-white">Norberto Note</h4>
        <p className="text-xs text-slate-300 truncate">Admin Sênior</p>
      </div>
    </div>
  );
}

// ============================================================================
// 🛑 COMPONENTE PRINCIPAL
// ============================================================================
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
        <SidebarHeader setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <NavigationMenu />
        <UserProfileFooter />
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