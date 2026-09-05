
// Recupera as chaves do localStorage, caso existam, para uso com Ngrok
const ID_NXD = localStorage.getItem('NGROK_ID_NXD') || '';
const ID_AUCT = localStorage.getItem('NGROK_ID_AUCT') || '';

// CHAVE DE CONTROLE: Alterne para 'false' para usar localhost
const USE_NGROK = true; 

const NGROK_URL = (id) => `${id}.ngrok-free.app`;

// Pega dinamicamente o endereço da barra de URL ('localhost' no PC ou '192.168.1.4' no celular)
const currentHost = window.location.hostname;

console.log("==============================================");
console.log( currentHost );
console.log("==============================================");

// export const ENV = {
//   // Constrói as URLs base conforme sua lógica de desenvolvimento
//   NXD_API: USE_NGROK && ID_NXD ? NGROK_URL(ID_NXD) : "http://127.0.0.1:8080",
//   AUCTORITAS_API: USE_NGROK && ID_AUCT ? NGROK_URL(ID_AUCT) : "http://127.0.0.1:8085",
// };

export const ENV = {  
  NXD_API: USE_NGROK && ID_NXD ? NGROK_URL(ID_NXD) : `http://${currentHost}:8080`,
  AUCTORITAS_API: USE_NGROK && ID_AUCT ? NGROK_URL(ID_AUCT) : `http://${currentHost}:8085`,
};

// 2. O log que você queria
console.log("==============================================");
console.log("URL Final Auctoritas:", ENV.AUCTORITAS_API);
console.log("==============================================");