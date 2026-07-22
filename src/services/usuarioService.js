// src/services/usuarioService.js
import { apiNxd } from './api';

export const usuarioService = {
  /**
   * Salva ou atualiza o perfil do usuário no back-end OmniBit
   * @param {Object} dados - Dados do perfil (authUuid, cargoUuid)
   * @returns {Promise<Object>} Resposta da API ou erro tratado
   */
  async salvarOuAtualizar(dados) {
    try {
      const response = await apiNxd.post('/usuarios-perfis/create', dados);
      return { success: true, data: response.data };
    } catch (error) {
      const mensagemErro = error.response?.data || 'Erro ao salvar o perfil do usuário';
      return { success: false, message: mensagemErro };
    }
  },

  /**
   * Lista todos os perfis de usuários cadastrados
   * @returns {Promise<Object>} Lista de perfis ou erro tratado
   */
  async listar() {
    try {
      const response = await apiNxd.get('/usuarios-perfis');
      return { success: true, data: response.data };
    } catch (error) {
      const mensagemErro = error.response?.data || 'Erro ao buscar os perfis de usuários';
      return { success: false, message: mensagemErro };
    }
  }
};