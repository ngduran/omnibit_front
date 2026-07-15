
// Recupera as chaves do localStorage, caso existam, para uso com Ngrok
const ID_NXD = localStorage.getItem('NGROK_ID_NXD') || '';
const ID_AUCT = localStorage.getItem('NGROK_ID_AUCT') || '';

// CHAVE DE CONTROLE: Alterne para 'false' para usar localhost
const USE_NGROK = false; 

const NGROK_URL = (id) => `https://${id}.ngrok-free.app`;

export const ENV = {
  // Constrói as URLs base conforme sua lógica de desenvolvimento
  NXD_API: USE_NGROK && ID_NXD ? NGROK_URL(ID_NXD) : "http://127.0.0.1:8080",
  AUCTORITAS_API: USE_NGROK && ID_AUCT ? NGROK_URL(ID_AUCT) : "http://127.0.0.1:8085",
};