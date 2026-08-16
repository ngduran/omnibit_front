import React, { useState, useEffect } from 'react';
import { cargoService } from '../services/cargoService';
import { conviteService } from '../services/conviteService';
import { usuarioService } from '../services/usuarioService';
import { pastoralService } from '../services/pastoralService'; 
import { authService } from '../services/authService'; 
import { toast } from 'sonner';

export default function GerenciarConvites() {
  const [cargos, setCargos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [pastorais, setPastorais] = useState([]); 
  const [convites, setConvites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Estados do formulário
  const [pessoaInput, setPessoaInput] = useState('');
  const [pastoralInput, setPastoralInput] = useState('');
  const [cargoUuidInput, setCargoUuidInput] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [resCargos, resConvites, resUsuarios, resPastorais] = await Promise.all([
        cargoService.listar(),
        conviteService.listar(),       
        authService.listarUsuarios(),
        pastoralService?.listar ? pastoralService.listar() : Promise.resolve({ success: true, data: [] }) 
      ]);

      if (resCargos.success) setCargos(resCargos.data);
      if (resConvites.success) setConvites(resConvites.data);
      if (resUsuarios.success) setUsuarios(resUsuarios.data);
      if (resPastorais.success) setPastorais(resPastorais.data);
    } catch (error) {
      toast.error('Erro ao carregar dados da tela.');
    } finally {
      setLoading(false);
    }
  };

  const handleGerarConvite = async (e) => {
    e.preventDefault();
    // Correção: Pessoa removida da obrigatoriedade
    if (!cargoUuidInput || !pastoralInput) {
      toast.warning('Selecione uma pastoral e um cargo.');
      return;
    }

    const payload = {
      pessoaUuid: pessoaInput || null, // Se estiver vazio, envia null explicitamente
      pastoralUuid: pastoralInput,
      cargoUuid: cargoUuidInput,
    };

    const resultado = await conviteService.gerar(payload);

    if (resultado.success) {
      toast.success('Link gerado com sucesso!');
      setPessoaInput('');
      setPastoralInput('');
      setCargoUuidInput('');
      carregarDados();
    } else {
      toast.error('Erro ao gerar convite', { description: resultado.message });
    }
  };

  // const copiarLink = (token) => {
  //   const link = `https://proftime.com/cadastro?token=${token}`;
  //   navigator.clipboard.writeText(link);
  //   toast.success('Link copiado!');
  // };

  const copiarLink = (token) => {
    const link = `http://localhost:5173/cadastro-conta?tokenConvite=${token}`;
    navigator.clipboard.writeText(link);
    toast.success('Link copiado!');
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

  const obterIniciais = (nome) => {
    if (!nome) return 'US';
    const partes = nome.trim().split(' ');
    if (partes.length >= 2) {
      return `${partes[0][0]}${partes[1][0]}`.toUpperCase();
    }
    return nome.slice(0, 2).toUpperCase();
  };

  const renderizarStatusBadge = (status) => {
    switch (status) {
      case 'ACEITO':
      case 'CONCLUIDO':
        return <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold border border-emerald-100">Aceito</span>;
      case 'PENDENTE':
        return <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold border border-amber-100">Pendente</span>;
      case 'INVALIDADO':
      case 'EXPIRADO':
        return <span className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-bold border border-rose-100">Invalidado</span>;
      default:
        return <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-xs font-bold border border-slate-200">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 font-sans">
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-8">
        
        {/* Topo: Título e Bandeiras (Estilo texto BR PY) */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="w-12" /> {/* Espaçador para balancear e centralizar o título */}
          <h1 className="text-xl md:text-2xl font-bold text-[#6b2142] tracking-wide text-center">
            Convite
          </h1>
          <div className="flex items-center gap-3 text-xs font-bold text-slate-500 w-12 justify-end">
            <span className="cursor-pointer hover:text-[#6b2142] transition-colors">BR</span>
            <span className="cursor-pointer hover:text-[#6b2142] transition-colors">PY</span>
          </div>
        </div>

        {/* Formulário: Layout correspondente à image_ff181f.png */}
        <form onSubmit={handleGerarConvite} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          
          {/* Campo Pastoral (col-span-3) - Primeiro Campo */}
          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1 flex items-center gap-1 tracking-wide">
              Pastoral <span className="text-slate-400 font-normal">?</span>
            </label>
            <select
              value={pastoralInput}
              onChange={(e) => setPastoralInput(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6b2142] cursor-pointer text-slate-700"
              required
            >
              <option value="" disabled>Selecione a pastoral</option>
              {pastorais.map((p) => (
                <option key={p.uuid} value={p.uuid}>
                  {p.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Campo Pessoa (col-span-4) - Segundo Campo */}
          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1 flex items-center gap-1 tracking-wide">
              Pessoa <span className="text-slate-400 font-normal">?</span>
            </label>
            <select
              value={pessoaInput}
              onChange={(e) => setPessoaInput(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6b2142] cursor-pointer text-slate-700"              
            >
              <option value="" disabled>Selecione a pessoa</option>
              {usuarios.map((u) => (
                <option key={u.id || u.uuid} value={u.id || u.uuid}>
                  {u.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Campo Cargo (col-span-3) - Terceiro Campo */}
          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1 flex items-center gap-1 tracking-wide">
              Cargo <span className="text-slate-400 font-normal">?</span>
            </label>
            <select
              value={cargoUuidInput}
              onChange={(e) => setCargoUuidInput(e.target.value)}
              className="w-full p-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6b2142] cursor-pointer text-slate-700"
              required
            >
              <option value="" disabled>Selecione o cargo</option>
              {cargos.map((cargo) => (
                <option key={cargo.uuid} value={cargo.uuid}>
                  {cargo.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Botão Gerar Link (col-span-2) */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-[11px] px-4 bg-[#6b2142] hover:bg-[#581c38] text-white font-bold rounded-xl transition-colors cursor-pointer text-sm text-center"
            >
              Gerar Convite
            </button>
          </div>
        </form>

        {/* Tabela de Convites */}
        <div className="overflow-x-auto pt-4">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="text-[11px] font-bold text-[#7ca2bc] uppercase border-b border-slate-100 tracking-wider">
                <th className="p-4 whitespace-nowrap">Convidado</th>
                <th className="p-4 whitespace-nowrap">Atribuição (Pastoral / Cargo)</th>
                <th className="p-4 whitespace-nowrap">Token / Link</th>
                <th className="p-4 whitespace-nowrap">Data</th>
                <th className="p-4 whitespace-nowrap">Status</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400">Carregando convites...</td>
                </tr>
              ) : convites.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-[#7ca2bc]">Nenhum convite registrado.</td>
                </tr>
              ) : (
                convites.map((convite, index) => {
                  const isAtivo = convite.status === 'PENDENTE';
                  return (
                    <tr key={convite.id || index} className="hover:bg-slate-50/60 transition-colors">
                      
                      {/* Nome com Avatar */}
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#6b2142] text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {obterIniciais(convite.nomeConvidado)}
                        </div>
                        <span className={`font-bold ${isAtivo ? 'text-slate-800' : 'text-slate-400'}`}>
                          {convite.nomeConvidado}
                        </span>
                      </td>

                      {/* Atribuição (Pastoral e Cargo) */}
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className={`font-bold ${isAtivo ? 'text-slate-700' : 'text-slate-400'}`}>
                            {convite.pastoral?.nome || 'Pastoral não informada'}
                          </span>
                          <span className="text-xs text-slate-500">
                            {convite.cargo?.nome || 'Cargo'}
                          </span>
                        </div>
                      </td>

                      {/* Token / Link Pill */}
                      <td className="p-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg max-w-[200px] truncate">
                          <span className="text-slate-400 text-xs">🔗</span>
                          <span className="text-xs font-mono text-slate-500 truncate">
                            https://proftime.com/cadastro?token={convite.token}
                          </span>
                        </div>
                      </td>

                      {/* Data */}
                      <td className="p-4 text-xs text-slate-500 whitespace-nowrap">
                        {new Date(convite.dataCriacao || convite.dataExpiracao).toLocaleDateString('pt-BR')}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        {renderizarStatusBadge(convite.status)}
                      </td>

                      {/* Ações */}
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => copiarLink(convite.token)}
                            disabled={!isAtivo}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                              isAtivo 
                                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-pointer shadow-sm' 
                                : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                            }`}
                          >
                            📋 Copiar
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => invalidarConvite(convite.id)}
                            disabled={!isAtivo}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                              isAtivo 
                                ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 cursor-pointer shadow-sm' 
                                : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
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