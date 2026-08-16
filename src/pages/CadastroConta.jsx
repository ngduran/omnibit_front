import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import TelefoneInput from '../components/ui/TelefoneInput';
import Button from '../components/ui/Button';
import { nomeSchema, usuarioSchema, emailSchema, passwordSchema, telefoneSchema } from '../utils/validations';

const cadastroSchema = z.object({
  nome: nomeSchema,
  usuario: usuarioSchema,
  email: emailSchema,
  telefone: telefoneSchema,
  senha: passwordSchema,
  confirmarSenha: z.string().min(1, "A confirmação é obrigatória"),
  tokenConvite: z.string().optional(),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem",
  path: ["confirmarSenha"],
});

export default function CadastroConta() {
  const { register: authRegister, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('tokenConvite'); // Captura o token da URL se ele existir
  const [activeTooltipId, setActiveTooltipId] = useState(null);

  const toggleTooltip = (id) => {
    setActiveTooltipId(activeTooltipId === id ? null : id);
  };

  const { 
    register, 
    handleSubmit, 
    setValue, 
    formState: { errors, touchedFields } 
  } = useForm({
    resolver: zodResolver(cadastroSchema),
    mode: 'onBlur',
  });

  const handleCadastro = async (data) => {
    const { confirmarSenha, ...dadosEnvio } = data;
    
    // Se houver um token na URL, ele é anexado ao payload enviado para o servidor.
    // Caso contrário, vai apenas com os dados padrão do formulário.
    //const payload = token ? { ...dadosEnvio, tokenConvite } : dadosEnvio;

    // Correção: Atribui explicitamente a variável 'token' à chave 'tokenConvite'
    const payload = token ? { ...dadosEnvio, tokenConvite: token } : dadosEnvio;

    const resultado = await authRegister(payload);
    if (resultado.success) {
      navigate('/login');
    }
  };

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
            tooltip="Nome para identificação dentro do sistema"
            isOpen={activeTooltipId === 'nome'}
            onToggle={() => toggleTooltip('nome')}
            placeholder="Seu nome"
            {...nomeRegister}
            onChange={(e) => {
              e.target.value = e.target.value.toLowerCase().replace(/(?:^|\s)\S/g, a => a.toUpperCase());
              nomeRegister.onChange(e);
            }}
            error={errors.nome?.message}
            isValid={!errors.nome && touchedFields.nome}
          />
          
          <Input 
            label="Nome de Usuário"
            tooltip="Utilizado para facilitar a entrada no sistema"
            isOpen={activeTooltipId === 'usuario'}
            onToggle={() => toggleTooltip('usuario')}
            placeholder="Escolha um apelido"
            {...register('usuario')}
            error={errors.usuario?.message}
            isValid={!errors.usuario && touchedFields.usuario}
          />

          <Input 
            label="E-mail"
            tooltip="Utilizado a entrada no sistema"
            isOpen={activeTooltipId === 'email'}
            onToggle={() => toggleTooltip('email')}
            type="email"
            placeholder="seu@email.com"
            {...register('email')}
            error={errors.email?.message}
            isValid={!errors.email && touchedFields.email}
          />
          
          <TelefoneInput 
            label="Telefone"
            tooltip="Utilizado para receber avisos importantes por meio de aplicativos de mensagens"
            isOpen={activeTooltipId === 'telefone'}
            onToggle={() => toggleTooltip('telefone')}
            placeholder="(00) 00000-0000"
            {...register('telefone')}
            onChange={(e) => setValue('telefone', e.target.value, { shouldValidate: true })}
            error={errors.telefone?.message}
            isValid={!errors.telefone && touchedFields.telefone}
          />
          
          <Input 
            label="Senha"
            tooltip="Utilizado acessar o sistema"
            isOpen={activeTooltipId === 'senha'}
            onToggle={() => toggleTooltip('senha')}
            type="password"
            placeholder="Crie uma senha forte"
            {...register('senha')}
            error={errors.senha?.message}
            isValid={!errors.senha && touchedFields.senha}
          />

          <Input 
            label="Confirmar Senha"
            tooltip="Uma forma de evitar que você erre a sua senha"
            isOpen={activeTooltipId === 'confirmarSenha'}
            onToggle={() => toggleTooltip('confirmarSenha')}
            type="password"
            placeholder="Repita sua senha"
            {...register('confirmarSenha')}
            error={errors.confirmarSenha?.message}
            isValid={!errors.confirmarSenha && touchedFields.confirmarSenha}
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