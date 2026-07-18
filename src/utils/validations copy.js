import * as z from 'zod';

// Regex centralizada para reutilização
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

// Esquema de senha reutilizável
export const passwordSchema = z.string()
  .min(1, "A senha é obrigatória")
  .regex(passwordRegex, "Senha deve ter 8+ caracteres, maiúsculas, minúsculas, números e símbolos.");

// Esquema de e-mail reutilizável (opcional, mas recomendado)
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