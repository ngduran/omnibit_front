// src/services/pastoralService.js
import { apiNxd } from './api';

export const pastoralService = {
  /**
   * Cria uma nova pastoral no back-end
   * @param {Object} pastoralData - Dados da pastoral (ex: nome, descricao)
   * @returns {Promise<Object>} Resposta da API ou erro tratado
   */
  async criar(pastoralData) {
    try {
      const response = await apiNxd.post('/pastoral/create', pastoralData);
      return { success: true, data: response.data };
    } catch (error) {
      const mensagemErro = error.response?.data || 'Erro ao criar a pastoral';
      return { success: false, message: mensagemErro };
    }
  },

  /**
   * Lista todas as pastorais cadastradas
   * @returns {Promise<Object>} Lista de pastorais ou erro tratado
   */
  async listar() {
    try {
      const response = await apiNxd.get('/pastoral');
      return { success: true, data: response.data };
    } catch (error) {
      const mensagemErro = error.response?.data || 'Erro ao buscar as pastorais';
      return { success: false, message: mensagemErro };
    }
  },

  /**
   * Atualiza uma pastoral existente usando o UUID
   * @param {string} uuid - UUID da pastoral
   * @param {Object} dados - Dados atualizados
   * @returns {Promise<Object>} Resposta da API ou erro tratado
   */
  async atualizar(uuid, dados) {
    try {
      const response = await apiNxd.put(`/pastoral/${uuid}`, dados);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data || "Erro ao atualizar a pastoral" 
      };
    }
  },

  /**
   * Deleta uma pastoral usando o UUID
   * @param {string} uuid - UUID da pastoral
   * @returns {Promise<Object>} Resposta da API ou erro tratado
   */
  async deletar(uuid) {
    try {
      await apiNxd.delete(`/pastoral/${uuid}`);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data || "Erro ao deletar a pastoral" 
      };
    }
  }
};