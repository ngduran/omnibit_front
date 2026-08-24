import Swal from 'sweetalert2';

export const Mensagem = {
    // Função auxiliar privada para lidar com o Swal no React
    async _executarSwal(configuracoesSwal, ehConfirmacao = false) {
        try {
            const resultado = await Swal.fire(configuracoesSwal);
            return ehConfirmacao ? resultado.isConfirmed : resultado;
        } catch (error) {
            console.error("Erro ao executar SweetAlert2:", error);
            return ehConfirmacao ? false : null;
        }
    },

    async sucesso(texto) {        
        return await this._executarSwal({
            icon: 'success', 
            title: 'Sucesso', 
            text: texto, 
            confirmButtonColor: '#28a745'
        });
    },

    async erro(status, texto) {
        return await this._executarSwal({
            icon: 'error',
            title: `Erro ${status}`,
            text: texto,                          
            confirmButtonColor: '#dc3545'
        });
    },

    async aviso(texto) {
        return await this._executarSwal({
            icon: 'warning',
            title: 'Atenção',
            text: texto,
            confirmButtonColor: '#d39e00' // Melhor contraste
        });
    },

    // Método genérico para diálogos de confirmação
    async _confirmarGenerico(titulo, texto, textoBotaoConfirmar = 'Sim') {
        return await this._executarSwal({
            icon: 'question',
            title: titulo,
            text: texto,
            showCancelButton: true,
            confirmButtonText: textoBotaoConfirmar,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#1748AF', // Azul primário do seu projeto
            cancelButtonColor: '#BCBDC1'  // Cinza de borda do seu projeto
        }, true);
    },

    async confirmar(texto) {
        return await this._confirmarGenerico('Você tem certeza?', texto, 'Sim, substituir');
    },

    async confirmarAdicionar(texto) {
        return await this._confirmarGenerico('Adicionar aula?', texto, 'Sim');
    },

    async criarConta(texto) {
        return await this._confirmarGenerico('Criar conta?', texto, 'Sim');
    }
};