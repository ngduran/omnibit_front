
// Recupera as chaves do localStorage, caso existam, para uso com Ngrok
const ID_NXD = localStorage.getItem('NGROK_ID_NXD') || '';
const ID_AUCT = localStorage.getItem('NGROK_ID_AUCT') || '';

// CHAVE DE CONTROLE: Alterne para 'false' para usar localhost
const USE_NGROK = true; 

const NGROK_URL = (id) => `https://${id}.ngrok-free.app`;

console.log("==============================================");
console.log(NGROK_URL);
console.log("==============================================");

// Pega dinamicamente o endereço da barra de URL ('localhost' no PC ou '192.168.1.4' no celular)
const currentHost = window.location.hostname;

// export const ENV = {
//   // Constrói as URLs base conforme sua lógica de desenvolvimento
//   NXD_API: USE_NGROK && ID_NXD ? NGROK_URL(ID_NXD) : "http://127.0.0.1:8080",
//   AUCTORITAS_API: USE_NGROK && ID_AUCT ? NGROK_URL(ID_AUCT) : "http://127.0.0.1:8085",
// };

export const ENV = {
  // Se USE_NGROK for falso, ele usa automaticamente o IP/host atual da rede
  NXD_API: USE_NGROK && ID_NXD ? NGROK_URL(ID_NXD) : `http://${currentHost}:8080`,
  AUCTORITAS_API: USE_NGROK && ID_AUCT ? NGROK_URL(ID_AUCT) : `http://${currentHost}:8085`,
};