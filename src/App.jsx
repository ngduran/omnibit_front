import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Cargos from './pages/Cargos';
import Login from './pages/Login';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Se o usuário não passou pela portaria, exibe apenas a tela de Login
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-pastoral-bg-soft text-pastoral-text-dark flex font-sans antialiased">
      
      {/* Nosso Menu Lateral Componentizado */}
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      {/* Lado Direito: Barra de Topo + Página Atual */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar setIsMobileMenuOpen={setIsMobileMenuOpen} />
        
        {/* Nossa Página de Controle de Cargos com a Tabela */}
        <Cargos />
      </div>

    </div>
  );
}