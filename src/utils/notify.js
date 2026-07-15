// src/utils/notify.js
import { toast } from 'sonner';
import Swal from 'sweetalert2';

export const notify = {
  // Notificações modernas (Toasts)
  sucesso: (texto) => toast.success(texto),
  erro: (texto) => toast.error(texto),
  aviso: (texto) => toast.warning(texto),

  // Modais de confirmação (usando SweetAlert2 moderno)
  confirmar: async (texto, titulo = 'Você tem certeza?') => {
    const result = await Swal.fire({
      title: titulo,
      text: texto,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#1748AF', // Seu Azul Primário
      cancelButtonColor: '#BCBDC1',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    });
    return result.isConfirmed;
  }
};