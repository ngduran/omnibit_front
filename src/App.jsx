import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import Login from './pages/Login';
import Cargos from './pages/Cargos';
import { UIProvider } from './context/UIContext'; // Importe o novo provider
import { Toaster } from 'sonner';
import AppToaster from './components/layout/AppToaster';
import CadastroConta from './pages/CadastroConta';
import CadastroCargo from './pages/CadastroCargo';

// Páginas de rascunho temporárias
const Dashboard = () => <div className="p-8 text-pastoral-text-dark font-bold"><h1>Tela de Dashboard</h1></div>;
const Usuarios = () => <div className="p-8 text-pastoral-text-dark font-bold"><h1>Tela de Usuários</h1></div>;

// 💡 CRIAMOS UM EMPACOTADOR PARA FACILITAR
// Ele garante que quem acessar as rotas abaixo passará pela verificação e receberá o Layout
const ProtectedRoute = ({ children }) => {
  return (
    <PrivateRoute>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </PrivateRoute>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <UIProvider> {/* Envolvendo a aplicação */}
        <AppToaster />
        <BrowserRouter>
          <Routes>
            {/* Rota Pública */}
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro-conta" element={<CadastroConta />} />

            {/* Rotas Protegidas (Todas no mesmo nível, sem confusão de caminhos) */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/cargos" element={<ProtectedRoute><Cargos /></ProtectedRoute>} />
            <Route path="/usuarios" element={<ProtectedRoute><Usuarios /></ProtectedRoute>} />
            <Route path="/cad-cargos" element={<ProtectedRoute><CadastroCargo /></ProtectedRoute>} />
            
            {/* Redirecionamento Padrão */}
            <Route path="/" element={<Navigate to="/cargos" replace />} />
          </Routes>
        </BrowserRouter>
      </UIProvider>
    </AuthProvider>
  );
}