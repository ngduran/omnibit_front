// src/services/conviteService.js
import { apiAuctoritas } from './api';

export const conviteService = {
  /**
   * Gera um novo convite no back-end
   * @param {Object} payload - Dados do convite (pessoaId, pastoralId, cargoUuid)
   * @returns {Promise<Object>} Resposta da API ou erro tratado
   */
  async gerar(payload) {
    try {
      const response = await apiAuctoritas.post('/convites/gerar', payload);
      return { success: true, data: response.data };
    } catch (error) {
      const mensagemErro = error.response?.data || 'Erro ao gerar o convite';
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
      const mensagemErro = error.response?.data || 'Erro ao buscar os convites';
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
        message: error.response?.data || "Erro ao invalidar o convite" 
      };
    }
  }

};