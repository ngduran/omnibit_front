import Swal from 'sweetalert2';

// Substituindo o alert por algo visual
export const Mensagem = {
    async sucesso(texto) {        

        if (typeof Swal !== 'undefined') {
            return await Swal.fire({ 
                            icon: 'success', 
                            title: 'Sucesso', 
                            text: texto, 
                            confirmButtonColor: '#28a745' 
                        });
        } else {
            console.warn("SweetAlert não carregado. Usando alert comum.");
            alert(texto);
            return Promise.resolve();
        }      
    },

    // erro: async (status, mensagem) => {
    //     return Swal.fire({
    //     toast: true,                      // <-- Transforma em uma notificação discreta
    //     position: 'bottom-start',              // <-- Aparece no canto superior direito (ou 'top' para o centro)
    //     icon: 'error',
    //     title: mensagem,                  // <-- Coloca a mensagem direto no título para leitura rápida
    //     showConfirmButton: false,         // <-- Remove o botão "OK"
    //     timer: 3500,                      // <-- Some sozinho em 3.5 segundos
    //     timerProgressBar: true,           // <-- Mostra uma barrinha de tempo acabando
    //     width: 'auto',                    // <-- Ajusta o tamanho ao texto
    //     padding: '1em'
    //     });
    // },



    async erro(status, texto) {
        if (typeof Swal !== 'undefined') {
            return await Swal.fire({
                            icon: 'error',
                            title: `Erro ${status}`,
                            text: texto,
                            // width: '320px',        // <-- Reduz a largura total do popup
                            // padding: '1.5em',      // <-- Reduz o espaço em branco ao redor do conteúdo                          
                            confirmButtonColor: '#dc3545'
                        });        
        } else {
            console.warn("SweetAlert não carregado. Usando alert comum.");
            alert(texto);
            return Promise.resolve();
        }  
    },

    async aviso(texto) {
        if (typeof Swal !== 'undefined') {
            return await Swal.fire({
                            icon: 'warning',
                            title: 'Atenção',
                            text: texto,
                            confirmButtonColor: '#dfeb43ff'
                        });        
        } else {
            console.warn("SweetAlert não carregado. Usando alert comum.");
            alert(texto);
            return Promise.resolve();
        }  
    },

    async confirmar(texto) {
        if (typeof Swal !== 'undefined') {
            const resultado = await Swal.fire({
                icon: 'question',
                title: 'Você tem certeza?',
                text: texto,
                showCancelButton: true,
                confirmButtonText: 'Sim, substituir',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#1748AF', // Seu Azul Primário
                cancelButtonColor: '#BCBDC1'  // Seu Cinza de Borda
            });
            
            return resultado.isConfirmed; // Retorna true se clicou em Sim
        } else {
            return confirm(texto); // Fallback caso o Swal falhe
        }
    },


    async confirmarAdicionar(texto) {
        if (typeof Swal !== 'undefined') {
            const resultado = await Swal.fire({
                icon: 'question',
                title: 'Adicionar aula?',
                text: texto,
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#1748AF', // Seu Azul Primário
                cancelButtonColor: '#BCBDC1'  // Seu Cinza de Borda
            });
            
            return resultado.isConfirmed; // Retorna true se clicou em Sim
        } else {
            return confirm(texto); // Fallback caso o Swal falhe
        }
    },

    async criarConta(texto) {
        if (typeof Swal !== 'undefined') {
            const resultado = await Swal.fire({
                icon: 'question',
                title: 'Criar conta?',
                text: texto,
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#1748AF', // Seu Azul Primário
                cancelButtonColor: '#BCBDC1'  // Seu Cinza de Borda
            });
            
            return resultado.isConfirmed; // Retorna true se clicou em Sim
        } else {
            return confirm(texto); // Fallback caso o Swal falhe
        }
    },
};