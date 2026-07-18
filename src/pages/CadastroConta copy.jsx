import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function CadastroConta() {
  const [formData, setFormData] = useState({ 
    nome: '', 
    usuario: '', 
    email: '', 
    senha: '',
    origem: '' 
  });
  
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    const resultado = await register(formData);
    if (resultado.success) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] flex items-center justify-center p-4 font-sans antialiased">
      <div className="max-w-md w-full bg-pastoral-card-bg rounded-3xl shadow-xl border border-pastoral-border border-t-0 border-l-0 border-r-0 overflow-hidden transition-all select-none">
        
        <div className="bg-pastoral-primary p-8 text-center text-pastoral-bg-soft flex flex-col items-center gap-2 select-none">
          <h1 className="text-2xl font-black tracking-wider uppercase">Criar Nova Conta</h1>
          <p className="text-sm opacity-80">Junte-se ao OmniBit</p>
        </div>

        <form onSubmit={handleCadastro} className="p-8 space-y-6">
          <Input 
            label="Nome Completo"
            required
            placeholder="Seu nome"
            onChange={(e) => setFormData({...formData, nome: e.target.value})}
          />
          
          <Input 
            label="Nome de Usuário"
            required
            placeholder="Escolha um apelido"
            onChange={(e) => setFormData({...formData, usuario: e.target.value})}
          />

          <Input 
            label="E-mail"
            type="email"
            required
            placeholder="seu@email.com"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          
          <Input 
            label="Senha"
            type="password"
            required
            placeholder="Crie uma senha forte"
            onChange={(e) => setFormData({...formData, senha: e.target.value})}
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