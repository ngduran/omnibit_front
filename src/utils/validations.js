import * as z from 'zod';

// Regex centralizada para reutilização
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

// Esquema de senha reutilizável
export const passwordSchema = z.string()
  .min(1, "A senha é obrigatória")
  .regex(passwordRegex, "Senha deve ter 8+ caracteres, maiúsculas, minúsculas, números e símbolos.");

// Esquema de e-mail reutilizável (opcional, mas recomendado)
export const emailSchema = z.string().email("Por favor, insira um e-mail válido");