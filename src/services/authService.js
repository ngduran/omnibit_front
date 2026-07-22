// src/services/authService.js
import { apiAuctoritas } from './api';

export const authService = {
  /**
   * Lista os usuários cadastrados no sistema Auctoritas
   * @returns {Promise<Object>} Lista de usuários ou erro tratado
   */
  async listarUsuarios(origem = 'OMNIBIT') {
    try {
      // Utiliza a instância centralizada conectada à porta 8085 (ou URL do Ngrok configurada)
      const response = await apiAuctoritas.get('/usuario/listar'); 
      return { success: true, data: response.data };
    } catch (error) {
      const mensagemErro = error.response?.data || 'Erro ao buscar usuários do Auctoritas';
      return { success: false, message: mensagemErro };
    }
  }
};