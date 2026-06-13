import React from 'react';

export default function Cargos() {
  // Dados fictícios para povoar nossa tabela por enquanto
  const listaCargos = [
    { id: 1, nome: 'ADMIN', descricao: 'Acesso total a todas as configurações, relatórios e gerenciamento de usuários.', usuarios: 3, status: 'Ativo' },
    { id: 2, nome: 'PROFESSOR', descricao: 'Permissão para gerenciar turmas, lançar notas, conteúdos e avaliar atividades.', usuarios: 14, status: 'Ativo' },
    { id: 3, nome: 'USUARIO', descricao: 'Acesso básico ao painel, consulta de dados públicos e edição do próprio perfil.', usuarios: 128, status: 'Ativo' },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-8">
      {/* Cabeçalho Interno */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-pastoral-primary">Gestão de Cargos e Permissões</h1>
          <p className="text-sm text-slate-500">Defina os papéis, níveis de acesso e hierarquias do sistema OmniBit.</p>
        </div>
        <button className="bg-pastoral-primary text-pastoral-bg-soft px-5 py-2.5 rounded-xl font-bold shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer">
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
                  {/* Nome do Cargo com Badge */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-block px-3 py-1 text-xs font-black rounded-lg bg-pastoral-primary text-pastoral-bg-soft tracking-wide">
                      {cargo.nome}
                    </span>
                  </td>
                  {/* Descrição */}
                  <td className="px-6 py-4 text-slate-600 max-w-md truncate md:whitespace-normal">
                    {cargo.descricao}
                  </td>
                  {/* Usuários Vinculados */}
                  <td className="px-6 py-4 text-center font-bold text-pastoral-primary">
                    {cargo.usuarios}
                  </td>
                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {cargo.status}
                    </span>
                  </td>
                  {/* Botões de Ação */}
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
    </main>
  );
}