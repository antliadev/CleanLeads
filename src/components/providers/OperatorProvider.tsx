'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { UserCircle2, Loader2, Plus, ArrowLeft, X } from 'lucide-react';
import Cookies from 'js-cookie';
import { createOperator } from '@/actions/operators';

export type Operator = {
  id: string;
  name: string;
  isActive: boolean;
};

interface OperatorContextType {
  activeOperator: Operator | null;
  setActiveOperator: (operator: Operator | null) => void;
  operators: Operator[];
}

const OperatorContext = createContext<OperatorContextType | undefined>(undefined);

export function useOperator() {
  const context = useContext(OperatorContext);
  if (!context) {
    throw new Error('useOperator deve ser usado dentro de um OperatorProvider');
  }
  return context;
}

interface OperatorProviderProps {
  children: ReactNode;
  operators: Operator[];
}

export function OperatorProvider({ children, operators: initialOperators }: OperatorProviderProps) {
  const [activeOperator, setActiveOperator] = useState<Operator | null>(null);
  const [rememberedOperator, setRememberedOperator] = useState<Operator | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [localOperators, setLocalOperators] = useState<Operator[]>(initialOperators);
  
  // Estados para o formulário de criação
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorForm, setErrorForm] = useState<string | null>(null);

  // Sincroniza operadores locais quando a prop muda (ex: revalidatePath)
  useEffect(() => {
    setLocalOperators(initialOperators);
  }, [initialOperators]);

  // Filtra apenas operadores ativos para seleção
  const activeOperators = useMemo(() => 
    localOperators.filter(op => op.isActive),
  [localOperators]);

  useEffect(() => {
    // 1. Tenta recuperar do localStorage (persistente pelo browser)
    const storedId = localStorage.getItem('limpaleads_operator_active');
    if (storedId) {
      const found = localOperators.find(op => op.id === storedId && op.isActive);
      if (found) {
        setActiveOperator(found);
      } else {
        localStorage.removeItem('limpaleads_operator_active');
        Cookies.remove('limpaleads_operator_id');
      }
    }
    setIsInitializing(false);
  }, [localOperators]);

  const handleSelectOperator = (operator: Operator | null) => {
    // Se estivermos "desativando" o operador (trocar), salvamos quem era
    if (!operator && activeOperator) {
      setRememberedOperator(activeOperator);
    } else if (operator) {
      setRememberedOperator(null);
    }

    setActiveOperator(operator);
    if (operator) {
      localStorage.setItem('limpaleads_operator_active', operator.id);
      Cookies.set('limpaleads_operator_id', operator.id, { expires: 365, path: '/' });
    } else {
      localStorage.removeItem('limpaleads_operator_active');
      Cookies.remove('limpaleads_operator_id');
    }
  };

  const handleCreateNewOperator = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsSubmitting(true);
    setErrorForm(null);

    try {
      const formData = new FormData();
      formData.append('name', newName.trim());
      
      const result = await createOperator(formData);
      
      if (result.success && result.operator) {
        const newOp = {
          id: result.operator.id,
          name: result.operator.name,
          isActive: result.operator.isActive
        };
        
        setLocalOperators(prev => [newOp, ...prev]);
        handleSelectOperator(newOp);
        setNewName('');
        setIsAdding(false);
      } else {
        setErrorForm(result.error || 'Erro ao criar operador');
      }
    } catch (err) {
      setErrorForm('Erro de conexão com o servidor');
    } finally {
      setIsSubmitting(false);
    }
  };

  const blocked = !isInitializing && !activeOperator;

  return (
    <OperatorContext.Provider value={{ activeOperator, setActiveOperator: handleSelectOperator, operators: localOperators }}>
      {children}

      {blocked && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-sm p-8 shadow-2xl border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600" />
            
            {/* Botão de Fechar (apenas se puder desistir da troca) */}
            {rememberedOperator && (
              <button
                onClick={() => handleSelectOperator(rememberedOperator)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
                title="Desistir de trocar"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            
            <div className="mx-auto w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mb-4">
              <UserCircle2 className="w-8 h-8" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Quem está operando?</h2>
            
            {!isAdding && activeOperators.length > 0 ? (
              <>
                <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
                  Selecione o operador responsável por este dispositivo para garantir a rastreabilidade.
                </p>
                
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                  {activeOperators.map(op => (
                    <button
                      key={op.id}
                      onClick={() => handleSelectOperator(op)}
                      className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all font-medium text-slate-700 dark:text-slate-200 group"
                    >
                      <span>{op.name}</span>
                      <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        →
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setIsAdding(true)}
                    className="flex items-center justify-center gap-2 w-full p-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Não estou na lista / Criar novo
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
                  {activeOperators.length === 0 
                    ? "Nenhum operador encontrado. Comece cadastrando o primeiro operador deste dispositivo."
                    : "Digite o nome para cadastrar um novo operador."}
                </p>

                <form onSubmit={handleCreateNewOperator} className="space-y-4">
                  {errorForm && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded-lg text-left">
                      {errorForm}
                    </div>
                  )}
                  
                  <div className="text-left space-y-1">
                    <label htmlFor="op-name" className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">
                      Nome do Operador
                    </label>
                    <input
                      id="op-name"
                      type="text"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                      placeholder="Ex: João Silva"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      autoFocus
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    {activeOperators.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setIsAdding(false)}
                        className="flex-1 px-4 py-3 text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center justify-center gap-2"
                        disabled={isSubmitting}
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Voltar
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting || !newName.trim()}
                      className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        activeOperators.length === 0 ? "Criar e Começar" : "Cadastrar e Selecionar"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </OperatorContext.Provider>
  );
}
