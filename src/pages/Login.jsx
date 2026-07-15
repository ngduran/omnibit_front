import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCarregando(true);

    // Simula uma piscada de meio segundo de rede/API do backend Java
    setTimeout(() => {
      setCarregando(false);
      onLogin(); // Avisa o App.jsx que o usuário passou!
    }, 600);
  };

  return (
    // <div className="min-h-screen bg-pastoral-bg-soft flex items-center justify-center p-4 font-sans antialiased">
    <div className="min-h-screen bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] flex items-center justify-center p-4 font-sans antialiased">
      <div className="max-w-md w-full bg-pastoral-card-bg rounded-3xl shadow-xl border border-pastoral-border border-t-0 border-l-0 border-r-0 overflow-hidden transition-all">
        
        
        

        {/* Banner Superior com a Identidade da Marca */}
        <div className="bg-pastoral-primary p-8 text-center text-pastoral-bg-soft flex flex-col items-center gap-2">
          
          {/* 👇 Sua nova logo aplicada de forma limpa e transparente */}
          <img 
            src="/pastoral-logo.webp" 
            alt="OmniBit Logo" 
            className="w-16 h-16 object-contain drop-shadow-md mb-1"
          />

          <h1 className="text-2xl font-black tracking-wider uppercase mt-1">OmniBit</h1>
          {/* <p className="text-xs text-slate-300">Painel de Controle e Gestão ERP</p> */}
        </div>

        {/* Formulário de Login */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Usuário ou E-mail
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </span>
              <input 
                type="text"
                required
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-pastoral-bg-soft border border-pastoral-border rounded-xl text-pastoral-text-dark focus:outline-none focus:border-pastoral-primary-light focus:ring-2 focus:ring-pastoral-primary-light/20 transition-all text-sm font-medium"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Senha de Acesso
              </label>
              <a href="#recuperar" className="text-xs text-pastoral-primary-light font-semibold hover:underline">
                Esqueceu?
              </a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </span>
              <input 
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-pastoral-bg-soft border border-pastoral-border rounded-xl text-pastoral-text-dark focus:outline-none focus:border-pastoral-primary-light focus:ring-2 focus:ring-pastoral-primary-light/20 transition-all text-sm font-medium"
                placeholder="Digite a sua senha"
              />
            </div>
          </div>

          {/* Manter Conectado */}
          <div className="flex items-center">
            <input 
              id="lembrar" 
              type="checkbox" 
              className="w-4 h-4 rounded border-pastoral-border text-pastoral-primary focus:ring-pastoral-primary-light accent-pastoral-primary"
            />
            <label htmlFor="lembrar" className="ml-2 text-xs font-medium text-slate-600 select-none cursor-pointer">
              Mostrar Senha
            </label>
          </div>

          {/* Botão de Entrar */}
          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-pastoral-primary text-pastoral-bg-soft py-3.5 rounded-xl font-bold shadow-md hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {carregando ? (
              <div className="w-5 h-5 border-2 border-pastoral-bg-soft border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Entrar</span>
                {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> */}
                  {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path> */}
                {/* </svg> */}
              </>
            )}
          </button>

          {/* Divisória sutil ou espaçamento para separar as ações */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-pastoral-border/60"></div>
            <span className="flex-shrink mx-4 text-xs text-slate-400 font-medium">ou</span>
            <div className="flex-grow border-t border-pastoral-border/60"></div>
          </div>

          {/* Novo Bloco: Criar Conta e Reenviar E-mail */}
          <div className="space-y-4 text-center">
            <button
              type="button"
              onClick={() => alert('Ir para tela de cadastro')} // Substitua pela sua lógica de navegação
              className="w-full bg-transparent text-pastoral-primary border-2 border-pastoral-primary py-3 rounded-xl font-bold hover:bg-pastoral-primary hover:text-pastoral-bg-soft active:scale-[0.99] transition-all flex items-center justify-center cursor-pointer"
            >
              Criar Conta
            </button>

            <a 
              href="#reenviar-email" 
              className="inline-block text-xs text-pastoral-primary-light font-semibold hover:underline"
            >
              Reenviar email de confirmação
            </a>
          </div>



        </form>

        {/* Rodapé de Informação */}
        <div className="px-8 py-4 bg-pastoral-bg-soft/60 border-t border-pastoral-border text-center">
          <p className="text-[11px] text-slate-400 font-medium">🛡️ Conexão segura</p>
        </div>

      </div>
    </div>
  );
}