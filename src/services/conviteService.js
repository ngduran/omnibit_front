import { apiAuctoritas } from './api';

export const conviteService = {
  /**
   * Gera um novo convite no back-end   * 
   * @returns {Promise<Object>} Resposta da API ou erro tratado
   */
  async gerar() {
    try {
      const response = await apiAuctoritas.post('/convites/gerar');
      return { success: true, data: response.data };
    } catch (error) {
      const mensagemErro = error.response?.data?.mensagem || error.response?.data || 'Erro ao gerar o convite';
      return { success: false, message: mensagemErro };
    }
  },

  /**
   * ADICIONADO: Consulta os detalhes do convite pelo código curto (ex: 'aB8x9Z2k')
   * Usado na página de Cadastro para pré-carregar os dados da Pastoral/Cargo
   * @param {string} codigoOuToken - Código ou token do convite
   * @returns {Promise<Object>} Detalhes do convite (pastoral, cargo, status)
   */
  async consultarPorCodigo(codigoOuToken) {
    try {
      const response = await apiAuctoritas.get(`/convites/validar/${codigoOuToken}`);
      return { success: true, data: response.data };
    } catch (error) {
      const mensagemErro = error.response?.data?.mensagem || 'Convite inválido ou expirado.';
      return { success: false, message: mensagemErro };
    }
  },

  /**
   * Lista todos os convites cadastrados
   * @returns {Promise<Object>} Lista de convites ou erro tratado
   */
  async listar() {
    try {
      const response = await apiAuctoritas.get('/convites');
      return { success: true, data: response.data };
    } catch (error) {
      const mensagemErro = error.response?.data?.mensagem || error.response?.data || 'Erro ao buscar os convites';
      return { success: false, message: mensagemErro };
    }
  },

  /**
   * Invalida um convite existente
   * @param {string|number} id - ID ou identificador do convite
   * @returns {Promise<Object>} Resposta da API ou erro tratado
   */
  async invalidar(id) {
    try {
      const response = await apiAuctoritas.patch(`/convites/invalidar/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.mensagem || error.response?.data || "Erro ao invalidar o convite" 
      };
    }
  }
};