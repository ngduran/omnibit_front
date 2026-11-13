import axios from 'axios';
import { ENV } from './apiConfig';
import { ROUTES } from '../config/routes';

// Instância para o Back-end principal (NXD)
export const apiNxd = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  }
});

// Instância para o Auctoritas
export const apiAuctoritas = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  }
});

/**
 * Trata sessões expiradas/inválidas (HTTP 401),
 * limpando o token, salvando a mensagem e redirecionando.
 */
const tratarSessaoExpirada = (error) => {
  const urlRequisicao = error.config?.url || '';
  const estaNaTelaDeLogin =
    typeof window !== 'undefined' && window.location.pathname.includes('/login');

  const ehRotaDeAutenticacao =
    urlRequisicao.includes('/login') || urlRequisicao.includes('/auth');

  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('token');
  }

  const mensagemBackend =
    error.response?.data?.mensagem || 'Sua sessão expirou. Faça login novamente.';

  if (ehRotaDeAutenticacao) {
    return;
  }

  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem('sessao_expirada_msg', mensagemBackend);
  }

  if (typeof window !== 'undefined' && !estaNaTelaDeLogin) {
    window.location.href = ROUTES.PUBLIC.LOGIN;
  }
};

// --- Interceptadores de Requisição ---

/**
 * Configura a URL dinamicamente em cada requisição.
 * Assim, alterações nas chaves do localStorage
 * são reconhecidas imediatamente pelo Axios.
 */
const configurarRequisicao = (getBaseURL) => (config) => {

  // Busca novamente a URL atual
  config.baseURL = getBaseURL();

  // Header do Ngrok
  config.headers['ngrok-skip-browser-warning'] = 'true';

  // Busca o token atualizado
  const token =
    typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
};

// Cada instância consulta sua própria URL atual
apiNxd.interceptors.request.use(
  configurarRequisicao(() => ENV.NXD_API),
  (error) => Promise.reject(error)
);

apiAuctoritas.interceptors.request.use(
  configurarRequisicao(() => ENV.AUCTORITAS_API),
  (error) => Promise.reject(error)
);

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
    if ( error.response?.status === 401 || error.response?.status === 403 ) {
      tratarSessaoExpirada(error);
    }

    return Promise.reject(error);
  }
);
