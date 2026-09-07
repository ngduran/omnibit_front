// Recupera as chaves do localStorage, caso existam, para uso com Ngrok
const ID_NXD = localStorage.getItem('NGROK_ID_NXD') || '';
const ID_AUCT = localStorage.getItem('NGROK_ID_AUCT') || '';

// CHAVE DE CONTROLE: Alterne para 'false' para usar localhost / IP da rede local
const USE_NGROK = true; 

/**
 * ALTERAÇÃO 1: Função NGROK_URL aprimorada.
 * - Adiciona o protocolo 'https://' explicitamente para evitar erros de 'Mixed Content'.
 * - Sanitiza o ID removendo 'https://', 'http://' ou '.ngrok-free.app' colados por engano.
 */
const NGROK_URL = (id) => {
  if (!id) return '';
  const cleanId = id
    .replace(/^https?:\/\//i, '')          // Remove http:// ou https://
    .replace(/\.ngrok-free\.app.*$/i, '')  // Remove .ngrok-free.app do final
    .trim();
  return `https://${cleanId}.ngrok-free.app`; // Monta a URL HTTPS correta
};

// Pega dinamicamente o endereço da barra de URL ('localhost' no PC ou '192.168.1.4' no celular)
const currentHost = window.location.hostname;

console.log("==============================================");
console.log("Host Atual:", currentHost);
console.log("==============================================");

/**
 * ALTERAÇÃO 2: Montagem das variáveis de ambiente.
 * Se USE_NGROK for true e houver chave no localStorage, usa a função NGROK_URL sanitizada.
 * Caso contrário, faz o fallback para o servidor local no IP atual.
 */
export const ENV = {  
  NXD_API: USE_NGROK && ID_NXD ? NGROK_URL(ID_NXD) : `http://${currentHost}:8080`,
  AUCTORITAS_API: USE_NGROK && ID_AUCT ? NGROK_URL(ID_AUCT) : `http://${currentHost}:8085`,
};

// ALTERAÇÃO 3: Logs de depuração no DevTools para conferir ambas as URLs montadas
console.log("==============================================");
console.log("URL Final NXD:", ENV.NXD_API);
console.log("URL Final Auctoritas:", ENV.AUCTORITAS_API);
console.log("==============================================");