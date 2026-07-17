// src/services/api.js
import axios from 'axios';
import { ENV } from './apiConfig';

// Instância para o seu Back-end principal (NXD)
export const apiNxd = axios.create({
  baseURL: ENV.NXD_API,
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Instância para o Auctoritas
export const apiAuctoritas = axios.create({
  baseURL: ENV.AUCTORITAS_API,
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para adicionar o token automaticamente nas requisições da NXD
apiNxd.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar tokens expirados (401)
apiNxd.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expirou ou é inválido: limpa o storage e redireciona
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);