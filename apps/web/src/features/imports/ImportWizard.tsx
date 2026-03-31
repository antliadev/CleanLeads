'use client';

import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ArrowLeft,
  Loader2,
  Table as TableIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { id: 'upload', label: 'Upload' },
  { id: 'mapping', label: 'Mapeamento' },
  { id: 'confirm', label: 'Confirmação' },
];

const TARGET_FIELDS = [
  { key: 'company', label: 'Empresa', required: true },
  { key: 'fullName', label: 'Nome Completo', required: true },
  { key: 'emailOriginal', label: 'E-mail', required: false },
  { key: 'phoneOriginal', label: 'Telefone/WhatsApp', required: false },
  { key: 'linkedinOriginal', label: 'LinkedIn', required: false },
];

export function ImportWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [fileData, setFileData] = useState<any>(null);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Aqui simularíamos a chamada para a nossa API (apps/api)
      // Substituir pelo endpoint correto futuramente
      const response = await fetch(`http://localhost:3000/imports/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Falha no upload do arquivo');

      const data = await response.json();
      setFileData(data);
      
      // Auto-mapeamento sugerido
      const initialMapping: Record<string, string> = {};
      data.headers.forEach((header: string) => {
        const h = header.toLowerCase();
        if (h.includes('empresa') || h.includes('company')) initialMapping['company'] = header;
        if (h.includes('nome') || h.includes('name')) initialMapping['fullName'] = header;
        if (h.includes('email')) initialMapping['emailOriginal'] = header;
        if (h.includes('tel') || h.includes('fone') || h.includes('phone') || h.includes('whats')) initialMapping['phoneOriginal'] = header;
        if (h.includes('linked')) initialMapping['linkedinOriginal'] = header;
      });
      setMapping(initialMapping);
      
      setCurrentStep(1);
    } catch (err: any) {
      setError(err.message || 'Erro ao processar arquivo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleConfirm = async () => {
    setIsUploading(true);
    try {
      const response = await fetch(`http://localhost:3000/imports/${fileData.batchId}/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(mapping),
      });

      if (!response.ok) throw new Error('Falha ao confirmar importação');
      
      setCurrentStep(2);
    } catch (err: any) {
      setError(err.message || 'Erro ao confirmar importação');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-12 relative px-4">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -z-10 -translate-y-1/2 mx-10" />
        {STEPS.map((step, idx) => (
          <div key={step.id} className="flex flex-col items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
              idx <= currentStep 
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'bg-white border-slate-200 text-slate-400'
            }`}>
              {idx < currentStep ? <CheckCircle2 className="w-6 h-6" /> : idx + 1}
            </div>
            <span className={`text-xs font-bold uppercase tracking-wider ${
              idx <= currentStep ? 'text-indigo-600' : 'text-slate-400'
            }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <motion.div 
            key="step-upload"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-[32px] border-2 border-dashed border-slate-200 p-12 text-center"
          >
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Upload className="w-10 h-10 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Importar Base de Leads</h2>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">
              Selecione uma planilha (.xlsx, .xls ou .csv) para iniciar o tratamento automático e a automação.
            </p>
            
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleUpload}
              className="hidden" 
              accept=".xlsx,.xls,.csv"
            />

            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all flex items-center gap-3 mx-auto disabled:opacity-50"
            >
              {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ChevronRight className="w-5 h-5" />}
              {isUploading ? 'Processando...' : 'Selecionar Arquivo'}
            </button>

            {error && (
              <div className="mt-6 p-4 bg-rose-50 text-rose-600 rounded-2xl flex items-center gap-3 text-sm font-medium border border-rose-100">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div 
            key="step-mapping"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Mapeamento de Colunas</h3>
                  <p className="text-sm text-slate-500 mt-1">Vincule as colunas da sua planilha aos campos do sistema.</p>
                </div>
                <div className="bg-slate-100 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 border border-slate-200 flex items-center gap-2">
                  <TableIcon className="w-4 h-4" />
                  {fileData?.totalRows} Linhas detectadas
                </div>
              </div>

              <div className="space-y-4">
                {TARGET_FIELDS.map((field) => (
                  <div key={field.key} className="flex items-center gap-6 p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        {field.label}
                        {field.required && <span className="text-rose-500">*</span>}
                      </p>
                    </div>
                    <div className="w-64">
                      <select 
                        value={mapping[field.key] || ''}
                        onChange={(e) => setMapping({...mapping, [field.key]: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                      >
                        <option value="">Nenhuma coluna...</option>
                        {fileData?.headers.map((h: string) => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex items-center justify-between">
                <button 
                  onClick={() => setCurrentStep(0)}
                  className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </button>
                <button 
                  onClick={handleConfirm}
                  disabled={isUploading}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  Confirmar Importação
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div 
            key="step-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[40px] border border-slate-200 shadow-xl overflow-hidden p-12 text-center"
          >
            <div className="w-24 h-24 bg-emerald-50 rounded-[40px] flex items-center justify-center mx-auto mb-8 shadow-inner">
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Importação Concluída!</h2>
            <p className="text-slate-500 mb-10 max-w-sm mx-auto">
              Os leads foram processados e já estão disponíveis para tratamento e automação imediata.
            </p>
            
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-10">
              <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase">Válidos</p>
                <p className="text-2xl font-bold text-slate-900">{fileData?.totalRows}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase">Processados</p>
                <p className="text-2xl font-bold text-slate-900">100%</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 max-w-xs mx-auto">
              <button 
                onClick={() => window.location.href = '/dashboard/leads'}
                className="w-full bg-slate-950 text-white py-4 rounded-2xl font-bold hover:bg-slate-900 transition-all"
              >
                Visualizar Leads
              </button>
              <button 
                onClick={() => setCurrentStep(0)}
                className="text-indigo-600 font-bold hover:underline"
              >
                Importar novo arquivo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
