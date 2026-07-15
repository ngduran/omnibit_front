import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner'; 
import { apiAuctoritas } from '../services/api'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await apiAuctoritas.post('/auth/login', credentials);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      setIsAuthenticated(true);
      
      // Feedback de sucesso centralizado no Contexto[cite: 1]
      toast.success('Bem-vindo de volta!');
      
      return { success: true };

    } catch (error) {
      const mensagemErro = error.response?.data?.message || 'Erro ao conectar com o servidor';
      
      // Feedback de erro centralizado no Contexto[cite: 1]
      toast.error('Falha no Login', {
        description: mensagemErro,
        duration: 4000,
      });

      return { 
        success: false, 
        message: mensagemErro 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);