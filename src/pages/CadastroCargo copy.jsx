import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { toast } from 'sonner';

const cargoSchema = z.object({
  nome: z.string().min(3, "O nome do cargo deve ter pelo menos 3 caracteres"),
  descricao: z.string().optional(),
});

export default function CadastroCargo() {
  const navigate = useNavigate();
  const [activeTooltipId, setActiveTooltipId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [cargos, setCargos] = useState([
    { id: 1, nome: 'Gestor', descricao: 'Gestor principal do sistema e permissões' },
    { id: 2, nome: 'Coordenador', descricao: 'Coordenador de equipes e atividades' },
  ]);
  const [editingId, setEditingId] = useState(null);

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
    resolver: zodResolver(cargoSchema),
    mode: 'onBlur',
  });

  const handleCadastroCargo = async (data) => {
    try {
      setLoading(true);
      
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (editingId) {
        setCargos(cargos.map(c => c.id === editingId ? { ...c, ...data } : c));
        setEditingId(null);
        toast.success("Cargo atualizado com sucesso!");
      } else {
        const novoCargo = {
          id: Date.now(),
          ...data
        };
        setCargos([...cargos, novoCargo]);
        toast.success("Cargo cadastrado com sucesso!");
      }

      reset({ nome: '', descricao: '' });
    } catch (error) {
      console.error("Erro ao salvar cargo:", error);
      toast.error("Erro ao salvar o cargo.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cargo) => {
    setEditingId(cargo.id);
    setValue('nome', cargo.nome, { shouldValidate: true });
    setValue('descricao', cargo.descricao || '', { shouldValidate: true });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    reset({ nome: '', descricao: '' });
  };

  const handleDelete = (id) => {
    setCargos(cargos.filter(c => c.id !== id));
    if (editingId === id) {
      handleCancelEdit();
    }
    toast.success("Cargo apagado com sucesso!");
  };

  const nomeRegister = register('nome');

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] flex items-center justify-center p-4 font-sans antialiased">
      {/* [ALTERADO] Largura ajustada para max-w-2xl para melhor harmonia com o layout vertical */}
      <div className="max-w-2xl w-full bg-pastoral-card-bg rounded-3xl shadow-xl border border-pastoral-border overflow-hidden transition-all select-none">
        
        <div className="bg-pastoral-primary p-8 text-center text-pastoral-bg-soft flex flex-col items-center gap-2 select-none">
          <h1 className="text-2xl font-black tracking-wider uppercase">Gerenciamento de Cargos</h1>
          <p className="text-sm opacity-80">Cadastre e gerencie os os cargos</p>
        </div>

        {/* [ALTERADO] Substituído o grid de duas colunas por uma estrutura vertical (flex stack) */}
        <div className="p-8 space-y-8">
          
          {/* Seção do Formulário de Cadastro/Edição */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              {editingId ? 'Editar Cargo' : 'Novo Cargo'}
            </h2>
            <form onSubmit={handleSubmit(handleCadastroCargo)} className="space-y-6">
              <Input 
                label="Nome do Cargo"
                tooltip="Identificação única para o cargo no sistema (ex: Gestor, Coordenador)"
                isOpen={activeTooltipId === 'nome'}
                onToggle={() => toggleTooltip('nome')}
                placeholder="Ex: Gestor da Pastoral"
                {...nomeRegister}
                onChange={(e) => {
                  e.target.value = e.target.value.toLowerCase().replace(/(?:^|\s)\S/g, a => a.toUpperCase());
                  nomeRegister.onChange(e);
                }}
                error={errors.nome?.message}
                isValid={!errors.nome && touchedFields.nome}
              />
              
              <Input 
                label="Descrição"
                tooltip="Breve resumo das responsabilidades associadas a este cargo"
                isOpen={activeTooltipId === 'descricao'}
                onToggle={() => toggleTooltip('descricao')}
                placeholder="Descreva as funções do cargo..."
                {...register('descricao')}
                error={errors.descricao?.message}
                isValid={!errors.descricao && touchedFields.descricao}
              />
              
              <div className="flex gap-3">
                <Button type="submit" disabled={loading} className="flex-1 !py-3.5">
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-pastoral-bg-soft border-t-transparent rounded-full animate-spin mx-auto"></div>
                  ) : (editingId ? "Atualizar Cargo" : "Salvar Cargo")}
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
                className="w-full !py-3" 
                onClick={() => navigate(-1)}
                className="w-full border-2 border-pastoral-primary text-pastoral-primary hover:bg-pastoral-primary hover:!text-white !py-3"
              >
                Voltar
              </Button>
            </form>
          </div>

          {/* [ALTERADO] Seção da Tabela posicionada abaixo do formulário, separada por borda sutil */}
          <div className="pt-6 border-t border-slate-200">
            {/* <h2 className="text-lg font-bold text-slate-800 mb-4">Cargos</h2> */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm max-h-[350px] overflow-y-auto">
              {cargos.length === 0 ? (
                <p className="text-center text-slate-400 py-8 text-sm">Nenhum cargo cadastrado.</p>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      <th className="p-3">Cargo</th>
                      <th className="p-3">Descrição</th>
                      <th className="p-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {cargos.map((cargo) => (
                      <tr key={cargo.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-semibold text-slate-700">{cargo.nome}</td>
                        <td className="p-3 text-slate-500 truncate max-w-[250px]">{cargo.descricao || '-'}</td>
                        <td className="p-3 text-right space-x-2 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => handleEdit(cargo)}
                            title="Editar registro"
                            className="text-blue-600 hover:text-blue-800 font-medium text-xs bg-blue-50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(cargo.id)}
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