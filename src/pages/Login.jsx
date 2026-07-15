import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { notify } from '../utils/notify'; // Seu novo mensageiro moderno

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);

    // Chama a função login do AuthContext
    const resultado = await login({ email: usuario, senha });
    
    setCarregando(false);

    if (resultado.success) {
      notify.sucesso('Bem-vindo de volta!');
      navigate('/cargos');
    } else {
      // Exibe a mensagem de erro amigável caso algo falhe
      notify.erro(resultado.message || 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] flex items-center justify-center p-4 font-sans antialiased">
      <div className="max-w-md w-full bg-pastoral-card-bg rounded-3xl shadow-xl border border-pastoral-border border-t-0 border-l-0 border-r-0 overflow-hidden transition-all">
        
        {/* Banner Superior */}
        <div className="bg-pastoral-primary p-8 text-center text-pastoral-bg-soft flex flex-col items-center gap-2">
          <img 
            src="/pastoral-logo.webp" 
            alt="OmniBit Logo" 
            className="w-16 h-16 object-contain drop-shadow-md mb-1"
          />
          <h1 className="text-2xl font-black tracking-wider uppercase mt-1">OmniBit</h1>
        </div>

        {/* Formulário de Login */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          <Input 
            label="Usuário ou E-mail"
            type="text"
            required
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="seu@email.com"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            }
          />

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Senha de Acesso
              </label>
              <a href="#recuperar" className="text-xs text-pastoral-primary-light font-semibold hover:underline">
                Esqueceu?
              </a>
            </div>
            <Input 
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite a sua senha"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              }
            />
          </div>

          <div className="flex items-center">
            <input id="lembrar" type="checkbox" className="w-4 h-4 rounded border-pastoral-border text-pastoral-primary focus:ring-pastoral-primary-light accent-pastoral-primary" />
            <label htmlFor="lembrar" className="ml-2 text-xs font-medium text-slate-600 select-none cursor-pointer">
              Mostrar Senha
            </label>
          </div>

          <Button
            type="submit"
            disabled={carregando}
            className="w-full !py-3.5"
          >
            {carregando ? (
              <div className="w-5 h-5 border-2 border-pastoral-bg-soft border-t-transparent rounded-full animate-spin"></div>
            ) : "Entrar"}
          </Button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-pastoral-border/60"></div>
            <span className="flex-shrink mx-4 text-xs text-slate-400 font-medium">ou</span>
            <div className="flex-grow border-t border-pastoral-border/60"></div>
          </div>

          <div className="space-y-4 text-center">
            <Button
              type="button"
              variant="ghost"
              onClick={() => notify.aviso('Funcionalidade de cadastro em breve!')}
              className="w-full border-2 border-pastoral-primary text-pastoral-primary hover:bg-pastoral-primary hover:text-pastoral-bg-soft !py-3"
            >
              Criar Conta
            </Button>

            <a href="#reenviar-email" className="inline-block text-xs text-pastoral-primary-light font-semibold hover:underline">
              Reenviar email de confirmação
            </a>
          </div>
        </form>

        <div className="px-8 py-4 bg-pastoral-bg-soft/60 border-t border-pastoral-border text-center">
          <p className="text-[11px] text-slate-400 font-medium">🛡️ Conexão segura</p>
        </div>
      </div>
    </div>
  );
}