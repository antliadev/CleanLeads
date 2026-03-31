'use client';

import { useState } from 'react';
import * as xlsx from 'xlsx';
import Papa from 'papaparse';
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { validateImportData, LeadImportRow, ImportValidationResult } from '@/lib/validations/lead-import';
import { extractSmartEmail, extractSmartText } from '@/lib/utils';
import { processImportChunk } from '@/actions/import';
import { useRouter } from 'next/navigation';

export function ImportWizard() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [file, setFile] = useState<File | null>(null);
  
  // Dados brutos lidos
  const [rawData, setRawData] = useState<any[]>([]);
  // Colunas originais da planilha
  const [columns, setColumns] = useState<string[]>([]);
  
  // Mapeamento: "Propriedade Obrigatória" -> "Nome da coluna na planilha"
  const [mapping, setMapping] = useState<Record<string, string>>({
    fullName: '',
    email: '',
    company: '',
    jobTitle: '',
    phone: '',
    linkedinUrl: '',
    notes: '',
  });

  // Resultado da validação antes do submit
  const [validation, setValidation] = useState<ImportValidationResult | null>(null);
  
  // Submit state
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  // ────────────────────────────────────────────────────────
  // STEP 1: UPLOAD
  // ────────────────────────────────────────────────────────
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (file.name.endsWith('.csv')) {
        Papa.parse(data as string, {
          header: true,
          complete: (results: Papa.ParseResult<any>) => {
            if (results.meta.fields) {
              setColumns(results.meta.fields);
            }
            setRawData(results.data);
            autoMapColumns(results.meta.fields || []);
            setStep(2);
          },
        });
      } else {
        const workbook = xlsx.read(data, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Extração customizada para capturar Hyperlinks (.l)
        const range = xlsx.utils.decode_range(worksheet['!ref'] || 'A1');
        const customData: any[] = [];
        const headerRow: string[] = [];

        // Identifica os headers na linha 0
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const address = xlsx.utils.encode_cell({ r: range.s.r, c: C });
          const cell = worksheet[address];
          headerRow.push(cell ? String(cell.v).trim() : `Coluna_${C + 1}`);
        }

        // Lê as linhas de dados
        for (let R = range.s.r + 1; R <= range.e.r; ++R) {
          const row: any = {};
          let hasData = false;
          for (let C = range.s.c; C <= range.e.c; ++C) {
            const address = xlsx.utils.encode_cell({ r: R, c: C });
            const cell = worksheet[address];
            if (cell && cell.v !== undefined) {
              const header = headerRow[C - range.s.c];
              // Em vez de mesclar destrutivamente link || valor, guarda os dois
              // para uma extração verdadeiramente inteligente posterior:
              row[header] = { text: cell.v, link: cell.l?.Target };
              hasData = true;
            }
          }
          if (hasData) customData.push(row);
        }
        
        if (headerRow.length > 0) {
          setColumns(headerRow);
          setRawData(customData);
          autoMapColumns(headerRow);
        }
        setStep(2);
      }
    };

    if (file.name.endsWith('.csv')) {
      reader.readAsText(file, 'utf-8');
    } else {
      reader.readAsBinaryString(file);
    }
  };

  const autoMapColumns = (cols: string[]) => {
    const lowCols = cols.map(c => c.toLowerCase());
    const newMapping = { ...mapping };
    
    // Rudimentar guess
    const findMatch = (terms: string[]) => {
      const idx = lowCols.findIndex(lc => terms.some(t => lc.includes(t)));
      return idx >= 0 ? cols[idx] : '';
    };

    newMapping.fullName = findMatch(['nome', 'name', 'full name', 'fullname']);
    newMapping.email = findMatch(['email', 'e-mail', 'mail']);
    newMapping.company = findMatch(['empresa', 'company', 'org']);
    newMapping.jobTitle = findMatch(['cargo', 'job', 'title', 'role']);
    newMapping.phone = findMatch(['telefone', 'phone', 'celular']);
    newMapping.linkedinUrl = findMatch(['linkedin', 'url linkedin', 'perfil']);
    newMapping.notes = findMatch(['obs', 'notas', 'anota']);

    setMapping(newMapping);
  };

  // ────────────────────────────────────────────────────────
  // STEP 2: MAPEAMENTO E VALIDAÇÃO
  // ────────────────────────────────────────────────────────
  const handleValidate = () => {
    // Transforma os dados brutos nos objetos esperados usando os extratores inteligentes
    const mappedData = rawData.map(row => {
      return {
        fullName: mapping.fullName ? extractSmartText(row[mapping.fullName]) : undefined,
        email: mapping.email ? extractSmartEmail(row[mapping.email]) : undefined,
        company: mapping.company ? extractSmartText(row[mapping.company]) : undefined,
        jobTitle: mapping.jobTitle ? extractSmartText(row[mapping.jobTitle]) : undefined,
        phone: mapping.phone ? extractSmartText(row[mapping.phone]) : undefined,
        linkedinUrl: mapping.linkedinUrl ? extractSmartText(row[mapping.linkedinUrl]) : undefined,
        notes: mapping.notes ? extractSmartText(row[mapping.notes]) : undefined,
      };
    }).filter(row => Object.keys(row).some(k => row[k as keyof typeof row] !== undefined)); // Remove linhas totalmente vazias

    const result = validateImportData(mappedData);
    setValidation(result);
  };

  // ────────────────────────────────────────────────────────
  // STEP 3: SUBMIT CHUNKS
  // ────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!validation?.validLeads?.length) return;
    
    setProcessing(true);
    const CHUNK_SIZE = 250;
    const leads = validation.validLeads;
    const totalChunks = Math.ceil(leads.length / CHUNK_SIZE);
    const batchId = `import_${Date.now()}`;

    for (let i = 0; i < totalChunks; i++) {
        const chunk = leads.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
        await processImportChunk(chunk, batchId);
        setProgress(Math.round(((i + 1) / totalChunks) * 100));
    }

    setProcessing(false);
    setStep(3);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8">
      {/* HEADER STEPS */}
      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>1</div>
        <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-slate-100'}`} />
        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>2</div>
        <div className={`flex-1 h-1 rounded-full ${step >= 3 ? 'bg-indigo-600' : 'bg-slate-100'}`} />
        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 3 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>3</div>
      </div>

      {step === 1 && (
        <div className="text-center py-12">
          <FileSpreadsheet className="w-16 h-16 text-indigo-200 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Importar Planilha</h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            Faça upload do seu arquivo Excel ou CSV. O lead será importado se possuir pelo menos uma forma de contato (E-mail, Telefone ou LinkedIn).
          </p>
          <label className="cursor-pointer bg-indigo-50 border-2 border-dashed border-indigo-200 hover:bg-indigo-100 transition-colors rounded-2xl p-8 flex flex-col items-center max-w-lg mx-auto">
            <Upload className="w-8 h-8 text-indigo-500 mb-2" />
            <span className="text-indigo-700 font-medium">Clique para selecionar ou arraste o arquivo</span>
            <input type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Mapear Colunas</h2>
            <p className="text-slate-500">Relacione as colunas da sua planilha ({columns.length} colunas encontradas) com os dados do LimpaLeads.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries({
               fullName: 'Nome Completo (*)',
               email: 'E-mail',
               company: 'Empresa',
               jobTitle: 'Cargo',
               phone: 'Telefone',
               linkedinUrl: 'URL LinkedIn',
               notes: 'Observações'
            }).map(([key, label]) => (
              <div key={key} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
                <select 
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500"
                  value={mapping[key]}
                  onChange={e => {
                    setMapping({...mapping, [key]: e.target.value});
                    setValidation(null);
                  }}
                >
                  <option value="">-- Ignorar este campo --</option>
                  {columns.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button 
              onClick={handleValidate}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-colors"
            >
              Validar Dados
            </button>
          </div>

          {/* Resultado da Validação */}
          {validation && (
             <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-800">Resultado da Análise</h3>
                  <div className="flex gap-4">
                    <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-bold text-sm">
                      {validation.validLeads.length} Registros Válidos
                    </span>
                    <span className="text-rose-600 bg-rose-50 px-3 py-1 rounded-full font-bold text-sm">
                      {validation.invalidRows.length} com Erro
                    </span>
                  </div>
                </div>

                {validation.invalidRows.length > 0 && (
                  <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 mb-6 max-h-[300px] overflow-auto">
                    <div className="flex items-center gap-2 text-rose-800 font-bold mb-3">
                      <AlertCircle className="w-5 h-5" /> Estas linhas serão ignoradas:
                    </div>
                    {validation.invalidRows.slice(0, 50).map((err, i) => (
                      <div key={i} className="text-sm text-rose-700 mb-2 border-b border-rose-100 pb-2">
                        <span className="font-bold">Linha {err.row}:</span> {err.errors.join(' • ')} <br/>
                        <span className="text-rose-400 text-xs">{(err.data[mapping.email] || err.data[mapping.fullName] || 'Sem identificação visível')}</span>
                      </div>
                    ))}
                    {validation.invalidRows.length > 50 && (
                      <div className="text-sm font-bold text-rose-500 mt-2">... e mais {validation.invalidRows.length - 50} linhas com erros.</div>
                    )}
                  </div>
                )}

                <div className="flex justify-end">
                  <button 
                    onClick={handleSubmit}
                    disabled={validation.validLeads.length === 0 || processing}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {processing ? `Processando ${progress}%...` : `Importar ${validation.validLeads.length} Leads Validados`}
                    {!processing && <ChevronRight className="w-5 h-5" />}
                  </button>
                </div>
             </div>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Importação Concluída!</h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            {validation?.validLeads.length} leads foram importados e mesclados com sucesso no seu banco de dados.
          </p>
          <button 
            onClick={() => router.push('/leads')}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
          >
            Ir para Lista de Leads
          </button>
        </div>
      )}
    </div>
  );
}
