import * as z from 'zod';

// Regex centralizada para reutilização
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;



// Esquema de senha reutilizável
export const passwordSchema = z.string()
  .min(1, "A senha é obrigatória")
  .regex(passwordRegex, "Senha deve ter 8+ caracteres, maiúsculas, minúsculas, números e símbolos.");

// Esquema de e-mail reutilizável
export const emailSchema = z.string().email("Por favor, insira um e-mail válido");

// Novo: Esquema de nome
export const nomeSchema = z.string()
  .min(3, "O nome deve ter pelo menos 3 caracteres")
  .max(100, "O nome não pode exceder 100 caracteres")
  .regex(/^[A-Za-zÀ-ÿ\s]+$/, "Nome inválido (apenas letras e espaços)");

// Novo: Esquema de usuário
export const usuarioSchema = z.string()
  .min(3, "O usuário deve ter pelo menos 3 caracteres")
  .regex(/^[a-zA-Z0-9_-]+$/, "Usuário inválido (use apenas letras, números, _ ou -)");

// Novo: Esquema de telefone (limpa a máscara e valida o comprimento)
export const telefoneSchema = z.string()
  .transform((val) => val.replace(/\D/g, "")) // Remove qualquer caractere não numérico
  .refine((val) => val.length >= 10 && val.length <= 11, {
    message: "Telefone inválido (mínimo 10 dígitos)",
  });

// --- Novos Esquemas para Gestão de Cargos ---

export const cargoNomeSchema = z.string()
  .min(2, "O nome do cargo deve ter pelo menos 2 caracteres")
  .max(50, "O nome do cargo não pode exceder 50 caracteres")
  .transform((val) => val.toUpperCase().trim());

export const cargoDescricaoSchema = z.string()
  .max(255, "A descrição não pode exceder 255 caracteres")
  .optional()
  .or(z.literal(''));  