// src/pages/CadastroUsuario.jsx
import React, { useState, useEffect } from 'react';
import { usuarioService } from '../services/usuarioService';
import { cargoService } from '../services/cargoService';
// Importe o serviço responsável por buscar os usuários do Auctoritas (ajuste o caminho se necessário)
import { authService } from '../services/authService'; 
import { toast } from 'sonner';

export default function CadastroUsuario() {
  const [abaAtiva, setAbaAtiva] = useState('vinculos');
  const [cargos, setCargos] = useState([]);
  const [usuariosAuctoritas, setUsuariosAuctoritas] = useState([]);
  const [perfisVinculados, setPerfisVinculados] = useState([]);
  const [loading, setLoading] = useState(false);

  // Estados para o formulário de vínculo direto
  const [authUuidInput, setAuthUuidInput] = useState('');
  const [cargoUuidInput, setCargoUuidInput] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    const [resCargos, resPerfis, resUsuariosAuth] = await Promise.all([
      cargoService.listar(),
      usuarioService.listar(),
      authService.listarUsuarios() // Busca os usuários cadastrados no Auctoritas
    ]);

    if (resCargos.success) setCargos(resCargos.data);
    if (resPerfis.success) setPerfisVinculados(resPerfis.data);
    if (resUsuariosAuth.success) setUsuariosAuctoritas(resUsuariosAuth.data);
    
    setLoading(false);
  };

  const handleSalvarVinculo = async (e) => {
    e.preventDefault();
    if (!authUuidInput || !cargoUuidInput) {
      toast.warning('Selecione um usuário e um cargo.');
      return;
    }

    const payload = { authUuid: authUuidInput, cargoUuid: cargoUuidInput };
    const resultado = await usuarioService.salvarOuAtualizar(payload);

    if (resultado.success) {
      toast.success('Vínculo realizado com sucesso!');
      setAuthUuidInput('');
      setCargoUuidInput('');
      carregarDados();
    } else {
      toast.error('Erro ao vincular', { description: resultado.message });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      
      {/* Cabeçalho da Página */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-800 uppercase tracking-wide">
            Controle de Acessos e Perfis
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Gerencie os vínculos entre usuários do Auctoritas e os cargos corporativos do OmniBit.
          </p>
        </div>

        {/* Navegação por Abas */}
        <div className="flex bg-slate-100 p-1 rounded-xl self-start md:self-auto">
          <button
            onClick={() => setAbaAtiva('vinculos')}
            className={`px-4 py-2 text-xs md:text-sm font-bold rounded-lg transition-all cursor-pointer ${
              abaAtiva === 'vinculos' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Vínculos Ativos ({perfisVinculados.length})
          </button>
          <button
            onClick={() => setAbaAtiva('cargos')}
            className={`px-4 py-2 text-xs md:text-sm font-bold rounded-lg transition-all cursor-pointer ${
              abaAtiva === 'cargos' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cargos OmniBit ({cargos.length})
          </button>
        </div>
      </div>

      {/* Seção de Novo Vínculo (Com os Combos de Usuário e Cargo) */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
        <h2 className="text-sm font-extrabold text-slate-700 uppercase mb-4 tracking-wider">
          Atribuir Novo Cargo a Usuário
        </h2>
        <form onSubmit={handleSalvarVinculo} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          
          {/* Combo de Usuários do Auctoritas */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Usuário (Auctoritas)
            </label>
            <select
              value={authUuidInput}
              onChange={(e) => setAuthUuidInput(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              required
            >
              <option value="" disabled>Selecione um usuário...</option>
              {usuariosAuctoritas.map((user) => (
                <option key={user.uuid || user.id} value={user.uuid || user.authUuid}>
                  {user.nome} {user.email ? `(${user.email})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Combo de Cargos do OmniBit */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Selecionar Cargo OmniBit
            </label>
            <select
              value={cargoUuidInput}
              onChange={(e) => setCargoUuidInput(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              required
            >
              <option value="" disabled>Selecione um cargo...</option>
              {cargos.map((cargo) => (
                <option key={cargo.uuid} value={cargo.uuid}>
                  {cargo.nome}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            Salvar Vínculo
          </button>
        </form>
      </div>

      {/* Conteúdo Dinâmico Baseado na Aba Selecionada */}
      {abaAtiva === 'vinculos' ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 border-b border-slate-100 font-bold text-slate-700 text-sm">
            Lista de Associações Registradas
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase border-b border-slate-200">
                  <th className="p-4">Auth UUID (Usuário)</th>
                  <th className="p-4">Cargo Atribuído (UUID)</th>
                  <th className="p-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="3" className="p-8 text-center text-slate-400">Carregando registros...</td>
                  </tr>
                ) : perfisVinculados.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="p-8 text-center text-slate-400">Nenhum vínculo encontrado.</td>
                  </tr>
                ) : (
                  perfisVinculados.map((perfil, index) => (
                    <tr key={index} className="hover:bg-slate-50/80">
                      <td className="p-4 font-mono text-xs text-slate-600">{perfil.authUuid}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold">
                          {perfil.cargoUuid}
                        </span>
                      </td>
                      <td className="p-4 text-right text-xs text-slate-400">Ativo</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 border-b border-slate-100 font-bold text-slate-700 text-sm">
            Cargos Cadastrados no OmniBit (Porta 8080)
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 text-xs font-bold text-slate-500 uppercase border-b border-slate-200">
                  <th className="p-4">Nome do Cargo</th>
                  <th className="p-4">Descrição</th>
                  <th className="p-4">UUID do Cargo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cargos.map((cargo) => (
                  <tr key={cargo.uuid} className="hover:bg-slate-50/80">
                    <td className="p-4 font-bold text-slate-800">{cargo.nome}</td>
                    <td className="p-4 text-slate-600">{cargo.descricao || 'Sem descrição'}</td>
                    <td className="p-4 font-mono text-xs text-slate-400">{cargo.uuid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}