import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Cargos from './pages/Cargos';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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