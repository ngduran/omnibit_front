import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Cargos from './pages/Cargos';
import Login from './pages/Login';

// Páginas rascunho rápidas para o sistema não dar erro ao clicar na Sidebar
const Dashboard = () => (
  <div className="p-8">
    <h1 className="text-2xl font-black text-pastoral-primary mb-2">📊 Dashboard Geral</h1>
    <p className="text-slate-500 font-medium text-sm">Esta tela do OmniBit está em fase de planejamento.</p>
  </div>
);

const Usuarios = () => (
  <div className="p-8">
    <h1 className="text-2xl font-black text-pastoral-primary mb-2">👥 Gestão de Usuários</h1>
    <p className="text-slate-500 font-medium text-sm">Esta tela do OmniBit está em fase de planejamento.</p>
  </div>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 🎯 Estado que controla qual página deve aparecer no miolo do ERP
  const [telaAtual, setTelaAtual] = useState('cargos');

  // Se o usuário não passou pela portaria, exibe apenas a tela de Login
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  // Função auxiliadora que escolhe dinamicamente qual componente renderizar
  const renderizarTela = () => {
    switch (telaAtual) {
      case 'dashboard':
        return <Dashboard />;
      case 'usuarios':
        return <Usuarios />;
      case 'cargos':
        return <Cargos />;
      default:
        return <Cargos />;
    }
  };

  return (
    <div className="min-h-screen bg-pastoral-bg-soft text-pastoral-text-dark flex font-sans antialiased">
      
      {/* Nosso Menu Lateral Componentizado */}
      {/* 🎯 Passamos a tela atual, a função de mudar de tela e a ação de Logout */}
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
        telaAtual={telaAtual}
        setTelaAtual={setTelaAtual}
        onLogout={() => setIsAuthenticated(false)}
      />

      {/* Lado Direito: Barra de Topo + Página Atual */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar setIsMobileMenuOpen={setIsMobileMenuOpen} />
        
        {/* O conteúdo principal do ERP agora é dinâmico! */}
        <main className="flex-1 overflow-y-auto">
          {renderizarTela()}
        </main>
      </div>

    </div>
  );
}