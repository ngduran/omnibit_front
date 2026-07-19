import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { passwordSchema, emailSchema, usuarioSchema } from '../utils/validations'; 

const loginSchema = z.object({
  // Permite e-mail ou o alias definido no usuarioSchema
  usuario: z.union([emailSchema, usuarioSchema]), 
  senha: passwordSchema,
});

export default function Login() {
  const [carregando, setCarregando] = useState(false);
  const [activeTooltipId, setActiveTooltipId] = useState(null); // Gerencia o tooltip ativo
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const toggleTooltip = (id) => {
    setActiveTooltipId(activeTooltipId === id ? null : id);
  };

  const { 
    register, 
    handleSubmit, 
    formState: { errors, touchedFields } 
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    setCarregando(true);
    const resultado = await login({ email: data.usuario, senha: data.senha });
    setCarregando(false);

    if (resultado.success) {
      navigate('/cargos');
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] flex items-center justify-center p-4 font-sans antialiased">
      <div className="max-w-md w-full bg-pastoral-card-bg rounded-3xl shadow-xl border border-pastoral-border border-t-0 border-l-0 border-r-0 overflow-hidden transition-all select-none">
        
        <div className="bg-pastoral-primary p-8 text-center text-pastoral-bg-soft flex flex-col items-center gap-2 select-none">
          <img src="/pastoral-logo.webp" alt="OmniBit Logo" className="w-16 h-16 object-contain drop-shadow-md mb-1" />
          <h1 className="text-2xl font-black tracking-wider uppercase mt-1">OmniBit</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <Input 
            label="Usuário ou E-mail"
            tooltip="Email utilizado para acessar o aplicativo"
            isOpen={activeTooltipId === 'usuario'}
            onToggle={() => toggleTooltip('usuario')}
            type="text"
            placeholder="seu@email.com"            
            {...register('usuario')}
            error={errors.usuario?.message}
            isValid={!errors.usuario && touchedFields.usuario}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            }
          />

          <div className="space-y-1.5">
            <Input 
              label="Senha de Acesso"
              tooltip="A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos."
              isOpen={activeTooltipId === 'senha'}
              onToggle={() => toggleTooltip('senha')}
              type="password"              
              placeholder="Digite a sua senha"
              {...register('senha')}
              error={errors.senha?.message}
              isValid={!errors.senha && touchedFields.senha}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              }
            />
            <div className="flex justify-end select-none">
              <a href="#recuperar" className="text-xs text-pastoral-primary-light font-semibold hover:underline">
                Esqueceu a senha?
              </a>
            </div>
          </div>

          <Button type="submit" disabled={carregando} className="w-full !py-3.5">
            {carregando ? <div className="w-5 h-5 border-2 border-pastoral-bg-soft border-t-transparent rounded-full animate-spin"></div> : "Entrar"}
          </Button>
          
          <div className="relative flex py-2 items-center select-none">
            <div className="flex-grow border-t border-pastoral-border/60"></div>
            <span className="flex-shrink mx-4 text-xs text-slate-400 font-medium">ou</span>
            <div className="flex-grow border-t border-pastoral-border/60"></div>
          </div>

          <div className="space-y-4 text-center">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => navigate('/cadastro-conta')} 
              className="w-full border-2 border-pastoral-primary text-pastoral-primary hover:bg-pastoral-primary hover:!text-white !py-3"
            >
              Criar Conta
            </Button>
            <a href="#reenviar-email" className="inline-block text-xs text-pastoral-primary-light font-semibold hover:underline">
              Reenviar email de confirmação
            </a>
          </div>
        </form>

        <div className="px-8 py-4 bg-pastoral-bg-soft/60 border-t border-pastoral-border text-center select-none">
          <p className="text-[11px] text-slate-400 font-medium">🛡️ Conexão segura</p>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-200">
          <details className="text-slate-500 text-xs">
            <summary className="cursor-pointer font-bold uppercase tracking-wider text-center">
              Configurações de Rede (Desenvolvimento)
            </summary>
            <div className="space-y-3 mt-4 bg-slate-50 p-4 rounded-lg">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-[10px]">Servidor de dados</label>
                <input 
                  className="border rounded p-1 text-sm"
                  defaultValue={localStorage.getItem('NGROK_ID_NXD') || ''}
                  onChange={(e) => localStorage.setItem('NGROK_ID_NXD', e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-[10px]">Servidor de Autenticação</label>
                <input 
                  className="border rounded p-1 text-sm"
                  defaultValue={localStorage.getItem('NGROK_ID_AUCT') || ''}
                  onChange={(e) => localStorage.setItem('NGROK_ID_AUCT', e.target.value)}
                />
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}