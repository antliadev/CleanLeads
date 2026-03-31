'use client';

import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Mail,
  ChevronRight,
  Edit2,
  Copy,
  X,
  PlusCircle,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConfirmDeleteModal } from '@/components/ConfirmDeleteModal';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [channel, setChannel] = useState('LINKEDIN');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  // Delete State
  const [templateToDeleteId, setTemplateToDeleteId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
       // Note: Usando 127.0.0.1:3000 para a API
      const response = await fetch(`http://localhost:3000/templates`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setTemplates(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Erro ao buscar templates:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleOpenModal = (template?: any) => {
    if (template) {
      setEditingTemplate(template);
      setName(template.name);
      setChannel(template.channel);
      setSubject(template.subjectTemplate || '');
      setBody(template.bodyTemplate);
    } else {
      setEditingTemplate(null);
      setName('');
      setChannel('LINKEDIN');
      setSubject('');
      setBody('');
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!name || !body) return alert('Nome e corpo são obrigatórios');
    
    setIsSaving(true);
    try {
      const url = editingTemplate 
        ? `http://localhost:3000/templates/${editingTemplate.id}` 
        : `http://localhost:3000/templates`;
      
      const response = await fetch(url, {
        method: editingTemplate ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name,
          channel,
          templateType: 'INITIAL',
          subjectTemplate: subject,
          bodyTemplate: body,
        }),
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchTemplates();
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Erro ao salvar: ${errorData.message || 'Erro desconhecido no servidor'}`);
      }
    } catch (err: any) {
      console.error('Erro ao salvar template:', err);
      alert(`Falha na rede: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!templateToDeleteId) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:3000/templates/${templateToDeleteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setIsDeleteModalOpen(false);
        setTemplateToDeleteId(null);
        fetchTemplates();
      } else {
        const error = await response.json().catch(() => ({}));
        alert(`Erro ao excluir template: ${error.message || 'Erro no servidor'}`);
      }
    } catch (err: any) {
      console.error('Erro ao excluir:', err);
      alert('Erro de conexão ao excluir template.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleMagicFix = async () => {
    if (!body || body.trim().length < 5) {
      return alert('Escreva um pouco mais de texto para que eu possa ajustá-lo!');
    }
    
    setIsSaving(true);
    try {
      console.log('Solicitando Ajuste Mágico à API...');
      const response = await fetch(`http://localhost:3000/templates/magic-fix`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ text: body })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.fixed) {
        setBody(data.fixed);
        console.log('Mágica concluída com sucesso!');
        // No alert here to let the text update be the feedback, but console log is kept.
      } else {
        alert(`Falha no Ajuste Mágico: ${data.message || 'Erro no servidor'}`);
      }
    } catch (err: any) {
      console.error('Erro de rede no ajuste:', err);
      alert(`Falha Crítica de Rede: ${err.message}\nCertifique-se de que a API está rodando.`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-4">
            <Layout className="w-10 h-10 text-indigo-600" />
            Templates de Mensagem
          </h1>
          <p className="text-slate-500 mt-2 text-lg italic">Personalize sua cadência comercial com modelos de alta conversão.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-[24px] font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Novo Template
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : templates.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-[48px] p-20 text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
            <PlusCircle className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Comece a automatizar</h3>
          <p className="text-slate-500 mt-2 mb-8 max-w-sm mx-auto">Você ainda não criou nenhum template. Crie modelos para LinkedIn ou E-mail para iniciar suas campanhas.</p>
          <button 
            onClick={() => handleOpenModal()}
            className="text-indigo-600 font-bold hover:text-indigo-700 underline underline-offset-4 decoration-2"
          >
            Criar meu primeiro modelo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {templates.map((template) => (
              <motion.div 
                key={template.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 transition-all group flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${
                    template.channel === 'LINKEDIN' 
                      ? 'bg-blue-50 text-blue-600 border-blue-100' 
                      : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                  }`}>
                    {template.channel}
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => handleOpenModal(template)}
                      className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => { setTemplateToDeleteId(template.id); setIsDeleteModalOpen(true); }}
                      className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all z-50 hover:scale-110"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 truncate">{template.name}</h3>
                <div className="flex-1">
                  <p className="text-slate-500 text-sm line-clamp-4 leading-relaxed italic border-l-2 border-slate-100 pl-4">
                    "{template.bodyTemplate}"
                  </p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Copy className="w-4 h-4" />
                    <span className="text-[10px] font-bold">V{template.version || 1}</span>
                  </div>
                  <button className="text-indigo-600 text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
                    Visualizar <ChevronRight className="w-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-[48px] p-10 w-full max-w-xl shadow-2xl border border-slate-100"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                  <FileText className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {editingTemplate ? 'Editar Template' : 'Criar Novo Modelo'}
                </h2>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-50 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Nome Identificador</label>
                <input 
                  placeholder="Ex: Prospecção Inicial LinkedIn" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Canal</label>
                  <select 
                    value={channel} 
                    onChange={(e) => setChannel(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none appearance-none"
                  >
                    <option value="LINKEDIN">LinkedIn</option>
                    <option value="EMAIL">E-mail</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Tipo de Gatilho</label>
                  <div className="w-full bg-slate-100/50 border border-slate-100 rounded-2xl p-4 text-sm text-slate-400 cursor-not-allowed">
                    Abordagem Inicial
                  </div>
                </div>
              </div>

              {channel === 'EMAIL' && (
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Assunto do E-mail</label>
                  <input 
                    placeholder="Assunto que desperta curiosidade..." 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none" 
                  />
                </div>
              )}

              <div className="relative group">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Corpo da Mensagem (Use {"{{firstName}}"})</label>
                <textarea 
                  placeholder="Escreva sua mensagem aqui..." 
                  value={body} 
                  onChange={(e) => setBody(e.target.value)} 
                  className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none h-48 resize-none shadow-inner" 
                />
                <button 
                  onClick={handleMagicFix}
                  disabled={isSaving}
                  className="absolute bottom-4 right-4 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-900 transition-all shadow-lg disabled:opacity-50"
                >
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  {isSaving ? 'Ajustando...' : 'Mágica do Ajuste'}
                </button>
              </div>

              <button 
                onClick={handleSave} 
                disabled={isSaving} 
                className="w-full bg-slate-900 text-white py-5 rounded-[24px] font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-100 mt-4 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isSaving ? <PlusCircle className="w-5 h-5 animate-spin" /> : null}
                {isSaving ? 'Processando...' : editingTemplate ? 'Salvar Alterações' : 'Criar Template'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <ConfirmDeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Excluir este Template?"
        description="Você está prestes a remover permanentemente este modelo de abordagem comercial. Esta ação não pode ser desfeita."
      />
    </div>
  );
}

function Zap(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.71 13 3l-2.02 8.29H20L11 21l2.02-8.29H4Z"/></svg>
}
