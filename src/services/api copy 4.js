import axios from 'axios';
import { ENV } from './apiConfig';
import { ROUTES } from '../config/routes';

// Instância para o Back-end principal (NXD)
export const apiNxd = axios.create({
  baseURL: ENV.NXD_API,
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  }
});

// Instância para o Auctoritas
export const apiAuctoritas = axios.create({
  baseURL: ENV.AUCTORITAS_API,
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  }
});

/**
 * Trata sessões expiradas redirecionando para a rota de login unificada.
 * Evita o redirecionamento automático durante a tentativa de login para permitir a exibição de erros.
 */
const tratarSessaoExpirada = (error) => {
  const urlRequisicao = error.config?.url || '';
  const estaNaTelaDeLogin = typeof window !== 'undefined' && window.location.pathname.includes('/login');
  const ehRotaDeAutenticacao = urlRequisicao.includes('/login') || urlRequisicao.includes('/auth');

  // Não redireciona se a falha ocorreu no próprio form de login
  if (ehRotaDeAutenticacao || estaNaTelaDeLogin) {
    return;
  }

  if (typeof localStorage !== 'undefined') localStorage.removeItem('token');
  if (typeof window !== 'undefined') window.location.href = ROUTES.PUBLIC.LOGIN;
};

// --- Interceptadores de Requisição ---
const injetarTokenEHeaders = (config) => {
  config.headers['ngrok-skip-browser-warning'] = 'true';
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

apiNxd.interceptors.request.use(injetarTokenEHeaders, (error) => Promise.reject(error));
apiAuctoritas.interceptors.request.use(injetarTokenEHeaders, (error) => Promise.reject(error));

// --- Interceptadores de Resposta ---
apiNxd.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tratarSessaoExpirada(error);
    }
    return Promise.reject(error);
  }
);

apiAuctoritas.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tratarSessaoExpirada(error);
    }
    return Promise.reject(error);
  }
);