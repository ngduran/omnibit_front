// src/pages/GerenciarConvites.jsx
import React, { useState, useEffect } from 'react';
import { cargoService } from '../services/cargoService';
// import { conviteService } from '../services/conviteService';
import { usuarioService } from '../services/usuarioService'; // Para listar as pessoas do Auctoritas/OmniBit
import { toast } from 'sonner';

export default function GerenciarConvites() {
  const [cargos, setCargos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [convites, setConvites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Estados do formulário
  const [pessoaInput, setPessoaInput] = useState('');
  const [cargoUuidInput, setCargoUuidInput] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [resCargos, resConvites, resUsuarios] = await Promise.all([
        cargoService.listar(),
        conviteService.listar(),
        usuarioService.listarUsuarios ? usuarioService.listarUsuarios() : Promise.resolve({ success: true, data: [] })
      ]);

      if (resCargos.success) setCargos(resCargos.data);
      if (resConvites.success) setConvites(resConvites.data);
      if (resUsuarios.success) setUsuarios(resUsuarios.data);
    } catch (error) {
      toast.error('Erro ao carregar dados da tela.');
    } finally {
      setLoading(false);
    }
  };

  const handleGerarConvite = async (e) => {
    e.preventDefault();
    if (!pessoaInput || !cargoUuidInput) {
      toast.warning('Selecione uma pessoa e um cargo.');
      return;
    }

    const payload = {
      pessoaId: pessoaInput,
      cargoUuid: cargoUuidInput,
    };

    const resultado = await conviteService.gerar(payload);

    if (resultado.success) {
      toast.success('Link de convite gerado com sucesso!');
      setPessoaInput('');
      setCargoUuidInput('');
      carregarDados();
    } else {
      toast.error('Erro ao gerar convite', { description: resultado.message });
    }
  };

  const copiarLink = (token) => {
    const link = `https://proftime.com/cadastro?token=${token}`;
    navigator.clipboard.writeText(link);
    toast.success('Link de convite copiado!');
  };

  const invalidarConvite = async (id) => {
    const resultado = await conviteService.invalidar(id);
    if (resultado.success) {
      toast.success('Convite invalidado com sucesso.');
      carregarDados();
    } else {
      toast.error('Erro ao invalidar convite.');
    }
  };

  // Helper para gerar as iniciais do avatar (ex: Marcos Almeida -> MA)
  const obterIniciais = (nome) => {
    if (!nome) return 'US';
    const partes = nome.trim().split(' ');
    if (partes.length >= 2) {
      return `${partes[0][0]}${partes[1][0]}`.toUpperCase();
    }
    return nome.slice(0, 2).toUpperCase();
  };

  // Renderizador de Status customizado conforme o layout
  const renderizarStatusBadge = (status) => {
    switch (status) {
      case 'ACEITO':
      case 'CONCLUIDO':
        return <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold">Aceito</span>;
      case 'PENDENTE':
        return <span className="px-3 py-1 bg-amber-50 text-amber-500 rounded-full text-xs font-bold">Pendente</span>;
      case 'INVALIDADO':
      case 'EXPIRADO':
        return <span className="px-3 py-1 bg-rose-50 text-rose-500 rounded-full text-xs font-bold">Invalidado</span>;
      default:
        return <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      
      {/* Card Principal */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
        
        {/* Topo: Título e Bandeiras de Idioma */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="w-6" /> {/* Espaçador para centralizar o título */}
          <h1 className="text-xl md:text-2xl font-bold text-rose-950 tracking-wide text-center">
            Convite
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-lg cursor-pointer" title="Português">🇧🇷</span>
            <span className="text-lg cursor-pointer" title="Espanhol">🇵🇾</span>
          </div>
        </div>

        {/* Formulário de Geração de Convite */}
        <form onSubmit={handleGerarConvite} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-2">
          
          {/* Campo Pessoa */}
          <div className="md:col-span-5">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
              Pessoa <span className="text-slate-400 font-normal">?</span>
            </label>
            <select
              value={pessoaInput}
              onChange={(e) => setPessoaInput(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-900 cursor-pointer"
              required
            >
              <option value="" disabled>Selecione uma pessoa</option>
              {usuarios.map((u) => (
                <option key={u.id || u.uuid} value={u.id || u.uuid}>
                  {u.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Campo Cargo */}
          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
              Cargo <span className="text-slate-400 font-normal">?</span>
            </label>
            <select
              value={cargoUuidInput}
              onChange={(e) => setCargoUuidInput(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-900 cursor-pointer"
              required
            >
              <option value="" disabled>Selecione um cargo</option>
              {cargos.map((cargo) => (
                <option key={cargo.uuid} value={cargo.uuid}>
                  {cargo.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Botão Gerar Link */}
          <div className="md:col-span-3">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#6b2142] hover:bg-[#581c38] text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-sm"
            >
              Gerar Link Convite
            </button>
          </div>
        </form>

        {/* Tabela de Convites */}
        <div className="overflow-x-auto pt-4">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="text-xs font-bold text-slate-400 uppercase border-b border-slate-100">
                <th className="p-4">Nome</th>
                <th className="p-4">Cargo</th>
                <th className="p-4">Token / Link</th>
                <th className="p-4">Data</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400">Carregando convites...</td>
                </tr>
              ) : convites.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400">Nenhum convite registrado.</td>
                </tr>
              ) : (
                convites.map((convite, index) => {
                  const isAtivo = convite.status === 'PENDENTE';
                  return (
                    <tr key={convite.id || index} className="hover:bg-slate-50/60 transition-colors">
                      {/* Nome com Avatar */}
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {obterIniciais(convite.nomeConvidado)}
                        </div>
                        <span className={`font-bold ${isAtivo ? 'text-slate-800' : 'text-slate-400'}`}>
                          {convite.nomeConvidado}
                        </span>
                      </td>

                      {/* Cargo */}
                      <td className={`p-4 ${isAtivo ? 'text-slate-600' : 'text-slate-400'}`}>
                        {convite.cargo?.nome || 'Cargo'}
                      </td>

                      {/* Token / Link Pill */}
                      <td className="p-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg max-w-[240px] truncate">
                          <span className="text-slate-400 text-xs">🔗</span>
                          <span className="text-xs font-mono text-slate-500 truncate">
                            https://proftime.com/cadastro?token={convite.token}
                          </span>
                        </div>
                      </td>

                      {/* Data */}
                      <td className="p-4 text-xs text-slate-500">
                        {new Date(convite.dataCriacao || convite.dataExpiracao).toLocaleDateString('pt-BR')}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        {renderizarStatusBadge(convite.status)}
                      </td>

                      {/* Ações */}
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => copiarLink(convite.token)}
                            disabled={!isAtivo}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                              isAtivo 
                                ? 'bg-emerald-400 hover:bg-emerald-500 text-white cursor-pointer shadow-sm' 
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            📋 Copiar Link
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => invalidarConvite(convite.id)}
                            disabled={!isAtivo}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                              isAtivo 
                                ? 'bg-rose-400 hover:bg-rose-500 text-white cursor-pointer shadow-sm' 
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            🚫 Invalidar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}