import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { nomeSchema, usuarioSchema, emailSchema, passwordSchema } from '../utils/validations';

const cadastroSchema = z.object({
  nome: nomeSchema,
  usuario: usuarioSchema,
  email: emailSchema,
  senha: passwordSchema,
});

export default function CadastroConta() {
  const { register: authRegister, loading } = useAuth();
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    formState: { errors, touchedFields } 
  } = useForm({
    resolver: zodResolver(cadastroSchema),
    mode: 'onBlur',
  });

  const handleCadastro = async (data) => {
    const resultado = await authRegister(data);
    if (resultado.success) {
      navigate('/login');
    }
  };

  // Interceptador para formatação de nome (Title Case)
  const nomeRegister = register('nome');

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] flex items-center justify-center p-4 font-sans antialiased">
      <div className="max-w-md w-full bg-pastoral-card-bg rounded-3xl shadow-xl border border-pastoral-border border-t-0 border-l-0 border-r-0 overflow-hidden transition-all select-none">
        
        <div className="bg-pastoral-primary p-8 text-center text-pastoral-bg-soft flex flex-col items-center gap-2 select-none">
          <h1 className="text-2xl font-black tracking-wider uppercase">Criar Nova Conta</h1>
          <p className="text-sm opacity-80">Junte-se ao OmniBit</p>
        </div>

        <form onSubmit={handleSubmit(handleCadastro)} className="p-8 space-y-6">
          <Input 
            label="Nome Completo"
            placeholder="Seu nome"
            {...nomeRegister}
            onChange={(e) => {
              // Aplica a formatação desejada antes de enviar para o Hook Form
              e.target.value = e.target.value.toLowerCase().replace(/(?:^|\s)\S/g, a => a.toUpperCase());
              nomeRegister.onChange(e);
            }}
            error={errors.nome?.message}
            isValid={!errors.nome && touchedFields.nome}
          />
          
          <Input 
            label="Nome de Usuário"
            placeholder="Escolha um apelido"
            {...register('usuario')}
            error={errors.usuario?.message}
            isValid={!errors.usuario && touchedFields.usuario}
          />

          <Input 
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            {...register('email')}
            error={errors.email?.message}
            isValid={!errors.email && touchedFields.email}
          />
          
          <Input 
            label="Senha"
            type="password"
            placeholder="Crie uma senha forte"
            {...register('senha')}
            error={errors.senha?.message}
            isValid={!errors.senha && touchedFields.senha}
          />
          
          <Button type="submit" disabled={loading} className="w-full !py-3.5">
            {loading ? (
              <div className="w-5 h-5 border-2 border-pastoral-bg-soft border-t-transparent rounded-full animate-spin"></div>
            ) : "Confirmar Cadastro"}
          </Button>
          
          <Button 
            type="button" 
            variant="ghost" 
            className="w-full !py-3" 
            onClick={() => navigate('/login')}
          >
            Voltar ao Login
          </Button>
        </form>

        <div className="px-8 py-4 bg-pastoral-bg-soft/60 border-t border-pastoral-border text-center">
          <p className="text-[11px] text-slate-400 font-medium">🛡️ Processo de registro seguro</p>
        </div>
      </div>
    </div>
  );
}