// src/services/cargoService.js
import { apiNxd } from './api';

export const cargoService = {
  /**
   * Cria um novo cargo no back-end OmniBit
   * @param {Object} cargoData - Dados do cargo (ex: nome, descricao)
   * @returns {Promise<Object>} Resposta da API ou erro tratado
   */
  async criar(cargoData) {
    try {
      const response = await apiNxd.post('/cargos/create', cargoData);
      return { success: true, data: response.data };
    } catch (error) {
      const mensagemErro = error.response?.data || 'Erro ao criar o cargo';
      return { success: false, message: mensagemErro };
    }
  },

  /**
   * Lista todos os cargos cadastrados
   * @returns {Promise<Object>} Lista de cargos ou erro tratado
   */
  async listar() {
    try {
      const response = await apiNxd.get('/cargos');
      return { success: true, data: response.data };
    } catch (error) {
      const mensagemErro = error.response?.data || 'Erro ao buscar os cargos';
      return { success: false, message: mensagemErro };
    }
  },

  async atualizar (id, dados) {
    try {
      const response = await apiNxd.put(`/cargos/${id}`, dados);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data || "Erro ao atualizar o cargo" 
      };
    }
  },

  async deletar (id) {
    try {
      await apiNxd.delete(`/cargos/${id}`);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data || "Erro ao deletar o cargo" 
      };
    }
  }

};