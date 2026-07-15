import React, { useState } from 'react'; // 1. Adicionamos o useState aqui
import Sidebar from '../Sidebar';
import Topbar from '../Topbar';
import { useAuth } from '../../context/AuthContext'; // Assumindo que você tem um hook de auth

export default function DashboardLayout({ children }) {
  // 2. O estado agora vive aqui dentro, resolvendo o problema do "undefined"
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth(); // 3. Se onLogout vier do seu AuthContext, use o hook

  return (
    <div className="min-h-screen bg-pastoral-bg-soft text-pastoral-text-dark flex font-sans antialiased">
      
      {/* Sidebar - Agora usa o estado interno */}
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
        onLogout={logout}
      />

      {/* Lado Direito */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar setIsMobileMenuOpen={setIsMobileMenuOpen} />
        
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}