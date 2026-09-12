import axios from 'axios';
import { ENV } from './apiConfig';

export const apiNxd = axios.create({
  baseURL: ENV.NXD_API,
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  }
});

export const apiAuctoritas = axios.create({
  baseURL: ENV.AUCTORITAS_API,
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  }
});

/**
 * Função utilitária para limpar a sessão e redirecionar para o login
 * respeitando a subpasta do Vite/GitHub Pages (/omnibit_front)
 */
const tratarSessaoExpirada = () => {
  localStorage.removeItem('token');
  const pathPrefix = window.location.pathname.startsWith('/omnibit_front') ? '/omnibit_front' : '';
  window.location.href = `${pathPrefix}/login`;
};

// --- Interceptadores para NXD ---
apiNxd.interceptors.request.use(
  (config) => {
    config.headers['ngrok-skip-browser-warning'] = 'true';
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiNxd.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      tratarSessaoExpirada();
    }
    return Promise.reject(error);
  }
);

// --- Interceptadores para AUCTORITAS ---
apiAuctoritas.interceptors.request.use(
  (config) => {
    config.headers['ngrok-skip-browser-warning'] = 'true';
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiAuctoritas.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      tratarSessaoExpirada();
    }
    return Promise.reject(error);
  }
);