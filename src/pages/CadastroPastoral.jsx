import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { toast } from 'sonner';
import { pastoralNomeSchema, pastoralDescricaoSchema } from '../utils/validations';
import { pastoralService } from '../services/pastoralService';
import * as z from 'zod';

const cadastroPastoralSchema = z.object({
  nome: pastoralNomeSchema,
  descricao: pastoralDescricaoSchema,
});

export default function CadastroPastoral() {
  const navigate = useNavigate();
  const [activeTooltipId, setActiveTooltipId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [pastorais, setPastorais] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    carregarPastorais();
  }, []);

  const carregarPastorais = async () => {
    const resultado = await pastoralService.listar();
    if (resultado.success) {
      setPastorais(resultado.data || []);
    } else {
      toast.error("Erro ao carregar pastorais", { description: resultado.message });
    }
  };

  const toggleTooltip = (id) => {
    setActiveTooltipId(activeTooltipId === id ? null : id);
  };

  const { 
    register, 
    handleSubmit, 
    reset,
    setValue,
    formState: { errors, touchedFields } 
  } = useForm({
    resolver: zodResolver(cadastroPastoralSchema),
    mode: 'onBlur',
  });

  const handleCadastroPastoral = async (data) => {
    setLoading(true);
    try {
      let resultado;
      if (editingId) {
        resultado = await pastoralService.atualizar(editingId, data);
      } else {
        resultado = await pastoralService.criar(data);
      }

      if (resultado.success) {
        toast.success(editingId ? "Pastoral atualizada com sucesso!" : "Pastoral cadastrada com sucesso!");
        await carregarPastorais();
        handleCancelEdit(); 
      } else {
        toast.error(editingId ? "Falha ao atualizar pastoral" : "Falha ao cadastrar pastoral", { 
          description: resultado.message 
        });
      }
    } catch (error) {
      toast.error("Erro inesperado ao processar a requisição.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pastoral) => {
    setEditingId(pastoral.id);
    setValue('nome', pastoral.nome, { shouldValidate: true });
    setValue('descricao', pastoral.descricao || '', { shouldValidate: true });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    reset({ nome: '', descricao: '' });
  };

  const handleDelete = async (id) => {
    try {
      const resultado = await pastoralService.deletar(id);
      if (resultado.success) {
        toast.success("Pastoral apagada com sucesso!");
        await carregarPastorais();
        if (editingId === id) {
          handleCancelEdit();
        }
      } else {
        toast.error("Erro ao apagar pastoral", { description: resultado.message });
      }
    } catch (error) {
      toast.error("Erro inesperado ao processar a requisição.");
    }
  };

  const nomeRegister = register('nome');

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] flex items-center justify-center p-4 font-sans antialiased">
      <div className="max-w-2xl w-full bg-pastoral-card-bg rounded-3xl shadow-xl border border-pastoral-border overflow-hidden transition-all select-none">
        
        <div className="bg-pastoral-primary p-8 text-center text-pastoral-bg-soft flex flex-col items-center gap-2 select-none">
          <h1 className="text-2xl font-black tracking-wider uppercase">Gerenciamento de Pastorais</h1>
          <p className="text-sm opacity-80">Cadastre e gerencie as pastorais do sistema</p>
        </div>

        <div className="p-8 space-y-8">
          
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              {editingId ? 'Editar Pastoral' : 'Nova Pastoral'}
            </h2>
            <form onSubmit={handleSubmit(handleCadastroPastoral)} className="space-y-6">
              <Input 
                label="Nome da Pastoral"
                tooltip="Identificação da pastoral no sistema (ex: PASTORAL DA CRIANÇA)"
                isOpen={activeTooltipId === 'nome'}
                onToggle={() => toggleTooltip('nome')}
                placeholder="Ex: PASTORAL DA CRIANÇA"
                {...nomeRegister}
                onChange={(e) => {
                  e.target.value = e.target.value.toUpperCase();
                  nomeRegister.onChange(e);
                }}
                error={errors.nome?.message}
                isValid={!errors.nome && touchedFields.nome}
              />
              
              <Input 
                label="Descrição"
                tooltip="Breve resumo sobre a atuação desta pastoral"
                isOpen={activeTooltipId === 'descricao'}
                onToggle={() => toggleTooltip('descricao')}
                placeholder="Descreva as funções da pastoral..."
                {...register('descricao')}
                error={errors.descricao?.message}
                isValid={!errors.descricao && touchedFields.descricao}
              />
              
              <div className="flex gap-3">
                <Button type="submit" disabled={loading} className="flex-1 !py-3.5">
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-pastoral-bg-soft border-t-transparent rounded-full animate-spin mx-auto"></div>
                  ) : (editingId ? "Atualizar Pastoral" : "Salvar Pastoral")}
                </Button>

                {editingId && (
                  <Button type="button" variant="ghost" onClick={handleCancelEdit} className="!py-3.5">
                    Cancelar
                  </Button>
                )}
              </div>
              
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => navigate(-1)}
                className="w-full border-2 border-pastoral-primary text-pastoral-primary hover:bg-pastoral-primary hover:!text-white !py-3"
              >
                Voltar
              </Button>
            </form>
          </div>
          
          <div className="pt-6 border-t border-slate-200">
            <div className="border border-slate-200 rounded-xl bg-white shadow-sm max-h-[350px] overflow-y-auto overflow-x-auto">
              {pastorais.length === 0 ? (
                <p className="text-center text-slate-400 py-8 text-sm">Nenhuma pastoral cadastrada.</p>
              ) : (
                <table className="w-full min-w-[400px] text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      <th className="p-3">Pastoral</th>
                      <th className="p-3">Descrição</th>
                      <th className="p-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {pastorais.map((pastoral, index) => (
                      <tr key={pastoral.id || `pastoral-${index}`} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-semibold text-slate-700">{pastoral.nome}</td>
                        <td className="p-3 text-slate-500 truncate max-w-[250px]">{pastoral.descricao || '-'}</td>
                        <td className="p-3 text-right space-x-2 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleEdit(pastoral)}
                            title="Editar registro"
                            className="text-blue-600 hover:text-blue-800 font-medium text-xs bg-blue-50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(pastoral.id)}
                            title="Apagar registro"
                            className="text-red-600 hover:text-red-800 font-medium text-xs bg-red-50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                          >
                            Apagar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

        </div>

        <div className="px-8 py-4 bg-pastoral-bg-soft/60 border-t border-pastoral-border text-center">
          <p className="text-[11px] text-slate-400 font-medium">🛡️ Painel Administrativo de Gestão</p>
        </div>
      </div>
    </div>
  );
}