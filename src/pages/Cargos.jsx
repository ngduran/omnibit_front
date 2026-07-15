import React, { useState } from 'react';

export default function Cargos() {
  // 🎯 Estado que controla se o Modal está aberto ou fechado
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dados fictícios para povoar nossa tabela por enquanto
  const listaCargos = [
    { id: 1, nome: 'ADMIN', descricao: 'Acesso total a todas as configurações, relatórios e gerenciamento de usuários.', usuarios: 3, status: 'Ativo' },
    { id: 2, nome: 'PROFESSOR', descricao: 'Permissão para gerenciar turmas, lançar notas, conteúdos e avaliar atividades.', usuarios: 14, status: 'Ativo' },
    { id: 3, nome: 'USUARIO', descricao: 'Acesso básico ao painel, consulta de dados públicos e edição do próprio perfil.', usuarios: 128, status: 'Ativo' },
  ];

  // Lista fictícia de permissões que o Auctoritas controla
  const permissoesDisponiveis = [
    { id: 'auc_admin', label: 'Auctoritas: Acesso Total (Admin)' },
    { id: 'past_ler', label: 'Pastoral: Visualizar Dados' },
    { id: 'past_gravar', label: 'Pastoral: Criar e Editar Dados' },
    { id: 'past_deletar', label: 'Pastoral: Exclusão de Registros' },
    { id: 'fin_acesso', label: 'Financeiro: Acesso ao Módulo' },
    { id: 'rel_emitir', label: 'Relatórios: Emissão Geral' },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
      
      {/* Cabeçalho Interno */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-pastoral-primary">Gestão de Cargos e Permissões</h1>
          <p className="text-sm text-slate-500">Defina os papéis, níveis de acesso e hierarquias do sistema OmniBit.</p>
        </div>
        
        {/* 👇 Botão agora altera o estado para abrir o Modal */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-pastoral-primary text-pastoral-bg-soft px-5 py-2.5 rounded-xl font-bold shadow-md hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Novo Cargo
        </button>
      </div>

      {/* Tabela de Dados Contida no Card */}
      <div className="bg-pastoral-card-bg rounded-2xl border border-pastoral-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-pastoral-bg-soft border-b border-pastoral-border text-xs uppercase tracking-wider font-bold text-slate-500">
                <th className="px-6 py-4">Regra / Cargo</th>
                <th className="px-6 py-4">Descrição das Permissões</th>
                <th className="px-6 py-4 text-center">Qtd. Usuários</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pastoral-border text-sm">
              {listaCargos.map((cargo) => (
                <tr key={cargo.id} className="hover:bg-pastoral-bg-soft/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-block px-3 py-1 text-xs font-black rounded-lg bg-pastoral-primary text-pastoral-bg-soft tracking-wide">
                      {cargo.nome}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 max-w-md truncate md:whitespace-normal">
                    {cargo.descricao}
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-pastoral-primary">
                    {cargo.usuarios}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {cargo.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-xs font-medium">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-slate-500 hover:text-pastoral-primary hover:bg-pastoral-bg-soft rounded-lg transition-all cursor-pointer" title="Editar">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer" title="Excluir">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================
          🛑 MODAL DE NOVO CARGO (Sobreposição Dinâmica)
          ========================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Fundo Escuro com clique para fechar */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          {/* Corpo do Modal */}
          <div className="relative bg-pastoral-card-bg w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden">
            
            {/* Header do Modal */}
            <div className="px-6 py-5 border-b border-pastoral-border bg-pastoral-bg-soft/50 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-pastoral-primary">Criar Novo Cargo</h2>
                <p className="text-xs text-slate-500 mt-1">Configure os acessos deste papel no sistema Auctoritas.</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Miolo do Formulário (Com scroll se a tela for pequena) */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Nome do Cargo</label>
                  <input 
                    type="text" 
                    placeholder="Ex: COORDENADOR_GERAL"
                    className="w-full px-4 py-2.5 bg-pastoral-bg-soft border border-pastoral-border rounded-xl text-pastoral-text-dark focus:outline-none focus:border-pastoral-primary-light focus:ring-2 focus:ring-pastoral-primary-light/20 transition-all text-sm font-medium uppercase"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Status</label>
                  <select className="w-full px-4 py-2.5 bg-pastoral-bg-soft border border-pastoral-border rounded-xl text-pastoral-text-dark focus:outline-none focus:border-pastoral-primary-light focus:ring-2 focus:ring-pastoral-primary-light/20 transition-all text-sm font-medium cursor-pointer">
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Descrição (Para que serve este cargo?)</label>
                <textarea 
                  rows="2"
                  placeholder="Descreva brevemente as responsabilidades deste papel..."
                  className="w-full px-4 py-3 bg-pastoral-bg-soft border border-pastoral-border rounded-xl text-pastoral-text-dark focus:outline-none focus:border-pastoral-primary-light focus:ring-2 focus:ring-pastoral-primary-light/20 transition-all text-sm resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-pastoral-primary block mb-3 border-b border-pastoral-border pb-2">
                  Atribuição de Permissões (Auctoritas)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {permissoesDisponiveis.map((perm) => (
                    <label key={perm.id} className="flex items-center p-3 border border-pastoral-border rounded-xl hover:bg-pastoral-bg-soft transition-colors cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-pastoral-border text-pastoral-primary focus:ring-pastoral-primary-light accent-pastoral-primary cursor-pointer"
                      />
                      <span className="ml-3 text-sm font-medium text-slate-600 group-hover:text-pastoral-primary transition-colors">
                        {perm.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
            </div>

            {/* Footer do Modal com Botões de Ação */}
            <div className="px-6 py-4 border-t border-pastoral-border bg-pastoral-bg-soft flex items-center justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                onClick={() => setIsModalOpen(false)} // Por enquanto só fecha, no futuro salvará no backend
                className="px-6 py-2.5 bg-pastoral-primary text-pastoral-bg-soft text-sm font-bold rounded-xl shadow-md hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
              >
                Salvar Novo Cargo
              </button>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}