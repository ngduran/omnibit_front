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