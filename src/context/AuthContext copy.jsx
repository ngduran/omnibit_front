import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner'; 
import { apiAuctoritas } from '../services/api'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await apiAuctoritas.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      setIsAuthenticated(true);
      toast.success('Bem-vindo de volta!');
      return { success: true };
    } catch (error) {
      const mensagemErro = error.response?.data?.message || 'Erro ao conectar com o servidor';
      toast.error('Falha no Login', { description: mensagemErro, duration: 4000 });
      return { success: false, message: mensagemErro };
    } finally {
      setLoading(false);
    }
  };

  // ATUALIZAÇÃO: Apontando para o UsuarioController (/usuario/create)
  const register = async (userData) => {
    setLoading(true);
    try {
      // userData deve conter campos como nome, email, senha e, opcionalmente, a origem (ex: "PASTORAL")
      await apiAuctoritas.post('/usuario/create', userData);
      
      toast.success('Conta criada com sucesso! Verifique seu e-mail para confirmar a ativação.');
      return { success: true };
    } catch (error) {
      const mensagemErro = error.response?.data || 'Erro ao realizar cadastro';
      toast.error('Falha no Cadastro', { description: mensagemErro, duration: 4000 });
      return { success: false, message: mensagemErro };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    toast.info('Sessão encerrada com sucesso.');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);