// src/config/routes.js
const getBaseUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) {
    return import.meta.env.BASE_URL;
  }
  return '/omnibit_front/';
};

const BASE_PATH = getBaseUrl().replace(/\/$/, '');

export const ROUTES = {
  PUBLIC: {
    LOGIN: `${BASE_PATH}/login`,
    CADASTRO: `${BASE_PATH}/cadastro-conta`,
  },
  PRIVATE: {
    DASHBOARD: `${BASE_PATH}/`,
    GERENCIAR_CONVITES: `${BASE_PATH}/convites`,
  },
  DYNAMIC: {
    PASTORAL_DETALHES: (uuid) => `${BASE_PATH}/pastoral/${uuid}`,
  },
  BUILD_EXTERNAL_LINK: (token) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return `${origin}${BASE_PATH}/cadastro-conta?tokenConvite=${token}`;
  }
};