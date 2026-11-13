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
 * Trata sessões expiradas/inválidas (HTTP 401), limpando o token, salvando a mensagem
 * retornada pelo backend no sessionStorage e redirecionando para a rota de login.
 */
const tratarSessaoExpirada = (error) => {
  const urlRequisicao = error.config?.url || '';
  const estaNaTelaDeLogin = typeof window !== 'undefined' && window.location.pathname.includes('/login');
  const ehRotaDeAutenticacao = urlRequisicao.includes('/login') || urlRequisicao.includes('/auth');

  // ALTERAÇÃO: Sempre removemos o token expirado/inválido do localStorage imediatamente,
  // garantindo que não permaneçam credenciais antigas salvas.
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('token');
  }

  // ADICIONADO: Extrai a mensagem enviada pelo backend (ex: "Sua sessão expirou. Faça login novamente.")
  const mensagemBackend = error.response?.data?.mensagem || 'Sua sessão expirou. Faça login novamente.';

  /* CÓDIGO ANTERIOR RETIRADO/REATORADO:
   * O 'return' antecipado impedia o salvamento da mensagem e a limpeza do token quando a requisição falhava.
   *
   * if (ehRotaDeAutenticacao || estaNaTelaDeLogin) {
   *   return;
   * }
   */

  // ALTERAÇÃO: Se a requisição foi disparada pelo próprio formulário de login (POST /auth/login),
  // interrompemos aqui para que o componente do formulário exiba a mensagem diretamente na tela.
  if (ehRotaDeAutenticacao) {
    return;
  }

  // ADICIONADO: Armazena a mensagem temporariamente no sessionStorage para que a tela de Login
  // possa lê-la e exibi-la ao usuário após o redirecionamento.
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem('sessao_expirada_msg', mensagemBackend);
  }

  // ALTERAÇÃO: Redireciona para o login apenas se o usuário ainda não estiver na tela de login.
  if (typeof window !== 'undefined' && !estaNaTelaDeLogin) {
    window.location.href = ROUTES.PUBLIC.LOGIN;
  }
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
    if (error.response?.status === 401 || error.response?.status === 403) {
      tratarSessaoExpirada(error);
    }
    return Promise.reject(error);
  }
);