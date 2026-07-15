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
        <span className="text-xl font-black tracking-wider uppercase text-white">OmniBit</span>
      </div>
      
      <button 
        onClick={() => setIsMobileMenuOpen(false)}
        className="p-1 rounded-lg hover:bg-pastoral-primary-light md:hidden focus:outline-none cursor-pointer text-white"
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
function MenuItem({ icon, label, onClick, subItems, isActive }) {
  // Inicializa aberto se tiver filhos ativos para uma melhor experiência do usuário
  const [isOpen, setIsOpen] = useState(isActive);
  const hasSubItems = subItems && subItems.length > 0;

  const handleTrigger = (e) => {
    e.preventDefault();
    if (hasSubItems) {
      setIsOpen(!isOpen);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div className="space-y-1">
      <button 
        onClick={handleTrigger}
        className={`
          w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all cursor-pointer group
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
      </button>

      {hasSubItems && (
        <div className={`pl-9 space-y-1 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
          {subItems.map((sub, index) => (
            <button
              key={index}
              onClick={sub.onClick}
              className={`
                w-full text-left block px-4 py-2 text-sm rounded-lg transition-all text-slate-400 hover:text-white hover:bg-pastoral-primary-light/50
                ${sub.isActive ? 'text-pastoral-accent font-bold bg-pastoral-primary-light/30' : ''}
              `}
            >
              {sub.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 3️⃣ SUB-COMPONENTE: MENU DE NAVEGAÇÃO COMPLETO
// ============================================================================
function NavigationMenu({ telaAtual, setTelaAtual }) {
  return (
    <nav className="space-y-2 flex-1 overflow-y-auto">
      <MenuItem 
        label="Início" 
        onClick={() => setTelaAtual('dashboard')}
        isActive={telaAtual === 'dashboard'}
        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 00-1-1h-3a1 1 0 00-1 1v4a1 1 0 001 1m6 0v9"></path></svg>} 
      />

      <MenuItem 
        label="Controle de Acesso"
        isActive={telaAtual === 'cargos' || telaAtual === 'usuarios'}
        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>}
        subItems={[
          { 
            label: 'Painel de Cargos', 
            onClick: () => setTelaAtual('cargos'), 
            isActive: telaAtual === 'cargos' 
          },
          { 
            label: 'Usuários', 
            onClick: () => setTelaAtual('usuarios'), 
            isActive: telaAtual === 'usuarios' 
          },
        ]}
      />

      <MenuItem 
        label="Configurações" 
        onClick={() => setTelaAtual('configuracoes')}
        isActive={telaAtual === 'configuracoes'}
        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>} 
      />
    </nav>
  );
}

// ============================================================================
// 4️⃣ SUB-COMPONENTE: RODAPÉ DE PERFIL DO USUÁRIO
// ============================================================================
function UserProfileFooter({ onLogout }) {
  return (
    <div className="pt-4 border-t border-pastoral-primary-light flex items-center justify-between gap-3 mt-auto">
      <div className="flex items-center gap-3 overflow-hidden flex-1">
        <div className="w-10 h-10 rounded-full bg-pastoral-accent flex items-center justify-center text-pastoral-primary font-bold shadow-sm shrink-0">
          NB
        </div>
        <div className="overflow-hidden hidden md:block">
          <h4 className="font-bold text-sm truncate text-white">Norberto Note</h4>
          <p className="text-xs text-slate-300 truncate">Admin Sênior</p>
        </div>
      </div>

      {/* 👇 Botão de Sair adicionado de forma minimalista e elegante */}
      <button 
        onClick={onLogout}
        title="Sair do Sistema"
        className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-pastoral-primary-light transition-all cursor-pointer shrink-0"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
        </svg>
      </button>
    </div>
  );
}

// ============================================================================
// 🛑 COMPONENTE PRINCIPAL
// ============================================================================
export default function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen, telaAtual, setTelaAtual, onLogout }) {
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
        <NavigationMenu telaAtual={telaAtual} setTelaAtual={setTelaAtual} />
        <UserProfileFooter onLogout={onLogout} />
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