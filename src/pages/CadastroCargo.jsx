import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { toast } from 'sonner';
import { cargoNomeSchema, cargoDescricaoSchema } from '../utils/validations';
import { cargoService } from '../services/cargoService';
import * as z from 'zod';

const cadastroCargoSchema = z.object({
  nome: cargoNomeSchema,
  descricao: cargoDescricaoSchema,
});

export default function CadastroCargo() {
  const navigate = useNavigate();
  const [activeTooltipId, setActiveTooltipId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [cargos, setCargos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    carregarCargos();
  }, []);

  const carregarCargos = async () => {
    const resultado = await cargoService.listar();
    if (resultado.success) {
      setCargos(resultado.data || []);
    } else {
      toast.error("Erro ao carregar cargos", { description: resultado.message });
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
    resolver: zodResolver(cadastroCargoSchema),
    mode: 'onBlur',
  });

  // const handleCadastroCargo = async (data) => {
  //   setLoading(true);
  //   try {
  //     const resultado = await cargoService.criar(data);
  //     if (resultado.success) {
  //       toast.success("Cargo cadastrado com sucesso!");
  //       await carregarCargos();
  //       reset();
  //     } else {
  //       toast.error("Falha ao cadastrar cargo", { description: resultado.message });
  //     }
  //   } catch (error) {
  //     toast.error("Erro inesperado ao processar a requisição.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleCadastroCargo = async (data) => {
    setLoading(true);
    try {
      let resultado;
      if (editingId) {
        resultado = await cargoService.atualizar(editingId, data);
      } else {
        resultado = await cargoService.criar(data);
      }

      if (resultado.success) {
        toast.success(editingId ? "Cargo atualizado com sucesso!" : "Cargo cadastrado com sucesso!");
        await carregarCargos();
        handleCancelEdit(); // Limpa o formulário e reseta o editingId
      } else {
        toast.error(editingId ? "Falha ao atualizar cargo" : "Falha ao cadastrar cargo", { 
          description: resultado.message 
        });
      }
    } catch (error) {
      toast.error("Erro inesperado ao processar a requisição.");
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

  const handleDelete = async (id) => {
    try {
      const resultado = await cargoService.deletar(id);
      if (resultado.success) {
        toast.success("Cargo apagado com sucesso!");
        await carregarCargos();
        if (editingId === id) {
          handleCancelEdit();
        }
      } else {
        toast.error("Erro ao apagar cargo", { description: resultado.message });
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
          <h1 className="text-2xl font-black tracking-wider uppercase">Gerenciamento de Cargos</h1>
          <p className="text-sm opacity-80">Cadastre e gerencie os cargos do sistema</p>
        </div>

        <div className="p-8 space-y-8">
          
          {/* Seção do Formulário de Cadastro/Edição */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              {editingId ? 'Editar Cargo' : 'Novo Cargo'}
            </h2>
            <form onSubmit={handleSubmit(handleCadastroCargo)} className="space-y-6">
              <Input 
                label="Nome do Cargo"
                tooltip="Identificação única para o cargo no sistema (ex: GESTOR, COORDENADOR)"
                isOpen={activeTooltipId === 'nome'}
                onToggle={() => toggleTooltip('nome')}
                placeholder="Ex: GESTOR DA PASTORAL"
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
                onClick={() => navigate(-1)}
                className="w-full border-2 border-pastoral-primary text-pastoral-primary hover:bg-pastoral-primary hover:!text-white !py-3"
              >
                Voltar
              </Button>
            </form>
          </div>
          
          {/* Seção da Tabela posicionada abaixo do formulário */}
          <div className="pt-6 border-t border-slate-200">
            <div className="border border-slate-200 rounded-xl bg-white shadow-sm max-h-[350px] overflow-y-auto overflow-x-auto">
              {cargos.length === 0 ? (
                <p className="text-center text-slate-400 py-8 text-sm">Nenhum cargo cadastrado.</p>
              ) : (
                <table className="w-full min-w-[400px] text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      <th className="p-3">Cargo</th>
                      <th className="p-3">Descrição</th>
                      <th className="p-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {cargos.map((cargo, index) => (
                      <tr key={cargo.id || `cargo-${index}`} className="hover:bg-slate-50/80 transition-colors">
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