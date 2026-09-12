// Remove a barra final do BASE_URL para evitar barras duplas (ex: //login)
const BASE_PATH = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

export const ROUTES = {
  // Rotas Públicas
  PUBLIC: {
    LOGIN: `${BASE_PATH}/login`,
    CADASTRO: `${BASE_PATH}/cadastro-conta`,
  },

  // Rotas Autenticadas
  PRIVATE: {
    DASHBOARD: `${BASE_PATH}/`,
    GERENCIAR_CONVITES: `${BASE_PATH}/convites`,
    PERFIL: `${BASE_PATH}/perfil`,
  },

  // Rotas Dinâmicas (Funções que recebem parâmetros)
  DYNAMIC: {
    PASTORAL_DETALHES: (uuid) => `${BASE_PATH}/pastoral/${uuid}`,
    USUARIO_EDITAR: (id) => `${BASE_PATH}/usuarios/${id}`,
  },

  // Gerador de URLs externas/compartilháveis (com dominio completo)
  BUILD_EXTERNAL_LINK: (token) => {
    const origin = window.location.origin;
    return `${origin}${BASE_PATH}/cadastro-conta?tokenConvite=${token}`;
  }
};