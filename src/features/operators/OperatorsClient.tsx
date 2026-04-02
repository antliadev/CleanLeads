'use client';

import { useState } from 'react';
import { Plus, User, Trash2, Edit2, CheckCircle2, XCircle } from 'lucide-react';
import { createOperator, updateOperator, toggleOperatorStatus, deleteOperator } from '@/actions/operators';

type Operator = {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
};

interface OperatorsClientProps {
  initialOperators: Operator[];
}

export function OperatorsClient({ initialOperators }: OperatorsClientProps) {
  const [operators, setOperators] = useState<Operator[]>(initialOperators);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOperator, setEditingOperator] = useState<Operator | null>(null);
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenModal = (operator?: Operator) => {
    if (operator) {
      setEditingOperator(operator);
      setName(operator.name);
    } else {
      setEditingOperator(null);
      setName('');
    }
    setError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingOperator(null);
    setName('');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('name', name);

    try {
      if (editingOperator) {
        const res = await updateOperator(editingOperator.id, formData);
        if (res.success && res.operator) {
          setOperators(ops => ops.map(op => op.id === res.operator.id ? res.operator : op));
          handleCloseModal();
        } else {
          setError(res.error || 'Erro ao atualizar operador');
        }
      } else {
        const res = await createOperator(formData);
        if (res.success && res.operator) {
          setOperators(ops => [res.operator, ...ops]);
          handleCloseModal();
        } else {
          setError(res.error || 'Erro ao criar operador');
        }
      }
    } catch (err) {
      setError('Ocorreu um erro no servidor');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (operator: Operator) => {
    const res = await toggleOperatorStatus(operator.id, !operator.isActive);
    if (res.success && res.operator) {
      setOperators(ops => ops.map(op => op.id === res.operator.id ? res.operator : op));
    } else {
      alert(res.error || 'Erro ao alterar status do operador');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Você tem certeza que deseja excluir permanentemente este operador? Considere desativá-lo, caso ele já possua ações no histórico.')) return;
    
    const res = await deleteOperator(id);
    if (res.success) {
      setOperators(ops => ops.filter(op => op.id !== id));
    } else {
      alert(res.error || 'Erro ao excluir operador');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-500" />
            Operadores
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Cadastre os membros da sua equipe para rastrear quem atende cada lead no dispositivo.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Operador
        </button>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {operators.length === 0 ? (
          <div className="p-8 text-center text-slate-500 dark:text-slate-400">
            Nenhum operador cadastrado.
          </div>
        ) : (
          operators.map((operator) => (
            <div key={operator.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${operator.isActive ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'}`}>
                  <span className="font-semibold">{operator.name.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className={`font-medium ${operator.isActive ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>
                    {operator.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {operator.isActive ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Ativo
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                        <XCircle className="w-3 h-3" />
                        Inativo
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleStatus(operator)}
                  className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  {operator.isActive ? 'Desativar' : 'Ativar'}
                </button>
                <button
                  onClick={() => handleOpenModal(operator)}
                  className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                  title="Editar operador"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(operator.id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Excluir operador"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {editingOperator ? 'Editar Operador' : 'Novo Operador'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Nome do Operador
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: João Silva"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors dark:text-slate-100"
                  autoFocus
                  required
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl font-medium transition-colors"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !name.trim()}
                  className="flex-1 px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
