import React, { createContext, useContext, useState } from 'react';
import { apiNxd } from '../services/api'; // Importando a instância configurada

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  // A função login agora recebe as credenciais e é assíncrona (async)
  const login = async (credentials) => {
    setLoading(true);
    try {
      // Faz a chamada real para o endpoint. 
      // Certifique-se que '/auth/login' é o caminho correto no seu back-end!
      const response = await apiNxd.post('/auth/login', credentials);
      
      // Se deu certo (status 200-299), o código continua aqui
      // Supondo que seu back-end retorne um token ou dados do usuário
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      // Caso ocorra erro (senha errada, servidor offline), capturamos aqui
      console.error("Erro na tentativa de login:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Erro ao conectar com o servidor' 
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