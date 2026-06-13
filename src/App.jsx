import React, { useState } from 'react';

export default function App() {
  // ==========================================
  // ⚙️ CONTROLE DE ESTADO (STATE MANAGEMENT)
  // ==========================================
  // Controla se o menu lateral está visível ou escondido em dispositivos móveis (celular/tablet)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    // Container principal que ocupa 100% da tela e usa o fundo suave da paleta pastoral
    <div className="min-h-screen bg-pastoral-bg-soft text-pastoral-text-dark flex font-sans antialiased">
      
      {/* ========================================================================
        🛑 BLOCO 1: MENU LATERAL (FUTURO COMPONENTE <Sidebar />)
        ========================================================================
        Explicação da responsividade aqui:
        - No mobile: usa 'fixed' e se move no eixo X baseado no estado 'isMobileMenuOpen'.
        - No desktop (md:): vira 'static', fica sempre visível e assume largura fixa de 64 (w-64).
      */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-pastoral-primary text-pastoral-bg-soft p-5 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out
          md:static md:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Topo do Menu: Logotipo e Botão de Fechar (Mobile) */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#823a54]">
            <div className="flex items-center gap-3">
              {/* Ícone do Logo (Simbolizando dados/ERP) */}
              <svg className="w-8 h-8 text-pastoral-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
              <span className="text-xl font-black tracking-wider uppercase">OmniBit</span>
            </div>
            
            {/* Botão de fechar o menu - Só aparece no celular */}
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 rounded-lg hover:bg-[#823a54] md:hidden focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          {/* Links de Navegação (Futuro Componente <NavigationMenu />) */}
          <nav className="space-y-2">
            {/* Link Ativo (Simulando a tela atual de Cargos) */}
            <a href="#cargos" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-pastoral-accent text-pastoral-primary font-bold shadow-sm transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              Painel de Cargos
            </a>

            <a href="#usuarios" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#823a54] font-medium transition-all text-slate-300 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              Usuários
            </a>

            <a href="#configuracoes" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#823a54] font-medium transition-all text-slate-300 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              Configurações
            </a>
          </nav>
        </div>

        {/* Rodapé do Menu: Dados do Usuário Logado */}
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

      {/* Background escuro de overlay - Só aparece no Mobile quando o menu está aberto */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* ========================================================================
        ÁREA DIREITA: JUNÇÃO DA TOPBAR + CONTEÚDO DA TELA
        ========================================================================
      */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* ======================================================================
          🛑 BLOCO 2: BARRA SUPERIOR (FUTURO COMPONENTE <Topbar />)
          ======================================================================
        */}
        <header className="h-16 bg-pastoral-card-bg border-b border-pastoral-border px-6 flex items-center justify-between shadow-sm">
          
          {/* Lado Esquerdo: Hambúrguer para abrir o menu no Celular */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-xl border border-pastoral-border hover:bg-pastoral-bg-soft md:hidden text-pastoral-primary focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <h2 className="text-xl font-bold text-pastoral-primary hidden sm:block">Painel Administrativo ERP</h2>
          </div>

          {/* Lado Direito: Notificações, Idiomas e Status */}
          <div className="flex items-center gap-4">
            {/* Seletor de Idiomas */}
            <div className="flex gap-1.5 text-lg bg-pastoral-bg-soft p-1.5 rounded-xl border border-pastoral-border">
              <span className="cursor-pointer hover:scale-110 transition-transform" title="PT-BR">🇧🇷</span>
              <span className="cursor-pointer hover:scale-110 transition-transform" title="PY">🇵🇾</span>
            </div>
            
            {/* Botão de Notificação fictício */}
            <div className="relative p-2 text-slate-500 hover:text-pastoral-primary cursor-pointer rounded-xl hover:bg-pastoral-bg-soft transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
          </div>
        </header>

        {/* ======================================================================
          🛑 BLOCO 3: CONTEÚDO DA PÁGINA (FUTURO COMPONENTE <CargosPage />)
          ======================================================================
        */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          
          {/* Cabeçalho Interno da Tela */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-pastoral-primary">Gestão de Cargos e Permissões</h1>
              <p className="text-sm text-slate-500">Defina os papéis, níveis de acesso e hierarquias do sistema.</p>
            </div>
            <button className="bg-pastoral-primary text-pastoral-bg-soft px-5 py-2.5 rounded-xl font-bold shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              Novo Cargo
            </button>
          </div>

          {/* Card Centralizador do Conteúdo da Tela */}
          <div className="bg-pastoral-card-bg rounded-2xl border border-pastoral-border shadow-sm p-6">
            <p className="text-slate-600">
              O esqueleto estrutural do seu ERP está montado! Aqui dentro desta área branca (representada pela tag {"<main>"}) é onde as tabelas de dados, formulários de cadastro e listagens de cargos nascerão.
            </p>
            <div className="mt-6 p-4 bg-pastoral-bg-soft rounded-xl border border-dashed border-pastoral-cell-key text-center text-sm text-slate-500">
              [Área reservada para o painel de listagem de cargos e grid de dados]
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}