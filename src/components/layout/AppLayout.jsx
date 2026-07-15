import React from 'react';
// Supondo que seus componentes de Sidebar e Topbar já existam ou estejam na pasta components/layout/
// Se não, vamos ajustar conforme você tem aí.
import Sidebar from './Sidebar'; 
import Topbar from './Topbar'; 

export default function AppLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar Fixo */}
      <Sidebar />

      {/* Área Principal */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Topbar />
        
        {/* Conteúdo Dinâmico (onde as páginas vão aparecer) */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}