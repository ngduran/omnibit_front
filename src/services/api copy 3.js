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
 * Função auxiliar para tratar expiração de sessão apenas em rotas autenticadas
 */
const tratarSessaoExpirada = (error) => {
  const urlRequisicao = error.config?.url || '';
  const estaNaTelaDeLogin = window.location.pathname.includes('/login');

  // Relação de URLs do back-end que NÃO devem redirecionar automaticamente (ex: tentativas de login)
  const ehRotaDeAutenticacao = urlRequisicao.includes('/login') || urlRequisicao.includes('/auth');

  // Se o erro 401 ocorreu durante o login ou já estamos na tela de login,
  // NÃO redireciona. Rejeita o erro para o `catch` da tela exibir o modal/toast.
  if (ehRotaDeAutenticacao || estaNaTelaDeLogin) {
    return;
  }

  // Para chamadas autenticadas no meio da navegação com token expirado:
  localStorage.removeItem('token');
  const pathPrefix = window.location.pathname.startsWith('/omnibit_front') ? '/omnibit_front' : '';
  window.location.href = `${pathPrefix}/login`;
};

// --- Interceptadores NXD ---
apiNxd.interceptors.request.use(
  (config) => {
    config.headers['ngrok-skip-browser-warning'] = 'true';
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiNxd.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      tratarSessaoExpirada(error);
    }
    return Promise.reject(error);
  }
);

// --- Interceptadores AUCTORITAS ---
apiAuctoritas.interceptors.request.use(
  (config) => {
    config.headers['ngrok-skip-browser-warning'] = 'true';
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiAuctoritas.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      tratarSessaoExpirada(error);
    }
    // Sempre rejeita a promessa para que o try/catch do componente possa tratar e exibir a mensagem
    return Promise.reject(error);
  }
);