import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { notify } from '../utils/notify'; 

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);

    const resultado = await login({ email: usuario, senha });
    
    setCarregando(false);

    if (resultado.success) {
      navigate('/cargos');
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] flex items-center justify-center p-4 font-sans antialiased">
      <div className="max-w-md w-full bg-pastoral-card-bg rounded-3xl shadow-xl border border-pastoral-border border-t-0 border-l-0 border-r-0 overflow-hidden transition-all select-none">
        
        {/* Container do Logo e Título */}
        <div className="bg-pastoral-primary p-8 text-center text-pastoral-bg-soft flex flex-col items-center gap-2 select-none">
          <img 
            src="/pastoral-logo.webp" 
            alt="OmniBit Logo" 
            className="w-16 h-16 object-contain drop-shadow-md mb-1"
          />
          <h1 className="text-2xl font-black tracking-wider uppercase mt-1">OmniBit</h1>
        </div>

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
            <div className="flex items-center justify-between select-none">
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

          <div className="flex items-center select-none">
            <input id="lembrar" type="checkbox" className="w-4 h-4 rounded border-pastoral-border text-pastoral-primary focus:ring-pastoral-primary-light accent-pastoral-primary" />
            <label htmlFor="lembrar" className="ml-2 text-xs font-medium text-slate-600 cursor-pointer">
              Mostrar Senha
            </label>
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
        
               {/* Seção de Debug/Configuração */}
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
                  placeholder="ex: abcd-1234"
                  onChange={(e) => localStorage.setItem('NGROK_ID_NXD', e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-[10px]">Servidor de Autenticação</label>
                <input 
                  className="border rounded p-1 text-sm"
                  defaultValue={localStorage.getItem('NGROK_ID_AUCT') || ''}
                  placeholder="ex: xyzw-5678"
                  onChange={(e) => localStorage.setItem('NGROK_ID_AUCT', e.target.value)}
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-2 italic text-center">
                *Recarregue a página após alterar as chaves.
              </p>
            </div>
          </details>
        </div>
        




      </div>
    </div>
  );
}