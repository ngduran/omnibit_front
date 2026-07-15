import Sidebar from '../Sidebar';
import Topbar from '../Topbar';
import { useAuth } from '../../context/AuthContext';

export default function DashboardLayout({ children }) {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-pastoral-bg-soft text-pastoral-text-dark flex font-sans antialiased">
      {/* Sidebar não recebe mais props de estado */}
      <Sidebar onLogout={logout} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar não recebe mais props de estado */}
        <Topbar />
        
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}