// // Recupera as chaves do localStorage, caso existam, para uso com Ngrok
// const ID_NXD = typeof localStorage !== 'undefined' ? (localStorage.getItem('NGROK_ID_NXD') || '') : '';
// const ID_AUCT = typeof localStorage !== 'undefined' ? (localStorage.getItem('NGROK_ID_AUCT') || '') : '';

// // CHAVE DE CONTROLE: Alterne para 'false' para usar localhost
// const USE_NGROK = true; 

// const NGROK_URL = (id) => `https://${id}.ngrok-free.app`;

// // Pega dinamicamente o endereço da barra de URL ('localhost' no PC ou '192.168.1.4' no celular)
// const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';

// console.log("==============================================");
// console.log( currentHost );
// console.log("==============================================");

// export const ENV = {  
//   NXD_API: USE_NGROK && ID_NXD ? NGROK_URL(ID_NXD) : `http://${currentHost}:8080`,
//   AUCTORITAS_API: USE_NGROK && ID_AUCT ? NGROK_URL(ID_AUCT) : `http://${currentHost}:8085`,
// };

// // 2. O log que você queria
// console.log("==============================================");
// console.log("URL Final Auctoritas:", ENV.AUCTORITAS_API);
// console.log("==============================================");


// apiConfig.js refatorado com getters
const USE_NGROK = true; 
const NGROK_URL = (id) => `https://${id}.ngrok-free.app`;

const getHost = () => typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const getProtocol = () => typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'https:' : 'http:';

const getIdNxd = () => typeof localStorage !== 'undefined' ? (localStorage.getItem('NGROK_ID_NXD') || '') : '';
const getIdAuct = () => typeof localStorage !== 'undefined' ? (localStorage.getItem('NGROK_ID_AUCT') || '') : '';

export const ENV = {  
  get NXD_API() {
    const id = getIdNxd();
    return USE_NGROK && id ? NGROK_URL(id) : `${getProtocol()}//${getHost()}:8080`;
  },
  get AUCTORITAS_API() {
    const id = getIdAuct();
    return USE_NGROK && id ? NGROK_URL(id) : `${getProtocol()}//${getHost()}:8085`;
  }
};