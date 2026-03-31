'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Building2, 
  Briefcase, 
  Mail, 
  Phone, 
  FileText,
  Save,
  Loader2
} from 'lucide-react';

function Linkedin(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
}
import { motion, AnimatePresence } from 'framer-motion';

interface EditLeadModalProps {
  lead: any;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export function EditLeadModal({ lead, isOpen, onClose, onUpdate }: EditLeadModalProps) {
  const [formData, setFormData] = useState<any>({
    fullName: '',
    company: '',
    jobTitle: '',
    emailOriginal: '',
    phoneOriginal: '',
    phoneSecondaryOriginal: '',
    linkedinOriginal: '',
    manualNote: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (lead && isOpen) {
      setFormData({
        fullName: lead.fullName || '',
        company: lead.company || '',
        jobTitle: lead.jobTitle || '',
        emailOriginal: lead.emailOriginal || '',
        phoneOriginal: lead.phoneOriginal || '',
        phoneSecondaryOriginal: lead.phoneSecondaryOriginal || '',
        linkedinOriginal: lead.linkedinOriginal || '',
        manualNote: lead.manualNote || '',
      });
    }
  }, [lead, isOpen]);

  if (!isOpen || !lead) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`http://localhost:3000/leads/${lead.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onUpdate();
        onClose();
      } else {
        const error = await response.json();
        alert(`Erro ao salvar: ${error.message || 'Erro desconhecido'}`);
      }
    } catch (err) {
      console.error(err);
      alert('Erro de conexão ao salvar alterações.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-slate-950 p-6 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2.5 rounded-2xl">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-black text-lg tracking-tight uppercase">Editar Dados do Lead</h3>
                <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">ID: {lead.code}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8 overflow-y-auto space-y-8 custom-scrollbar">
            {/* Seção Principal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  <User className="w-3 h-3" /> Nome Completo
                </label>
                <input 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Nome do Prospect"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  <Building2 className="w-3 h-3" /> Empresa
                </label>
                <input 
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Nome da Empresa"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  <Briefcase className="w-3 h-3" /> Cargo
                </label>
                <input 
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Ex: Diretor de Marketing"
                />
              </div>
            </div>

            {/* Seção de Contato */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-50">
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  <Mail className="w-3 h-3" /> E-mail
                </label>
                <input 
                  name="emailOriginal"
                  value={formData.emailOriginal}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  placeholder="email@empresa.com"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  <Phone className="w-3 h-3" /> Telefone Principal
                </label>
                <input 
                  name="phoneOriginal"
                  value={formData.phoneOriginal}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  <PlusPhoneIcon className="w-3 h-3" /> Telefone Secundário
                </label>
                <input 
                  name="phoneSecondaryOriginal"
                  value={formData.phoneSecondaryOriginal}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Adicionar outro número..."
                />
              </div>
            </div>

            {/* Redes e Notas */}
            <div className="space-y-6 pt-6 border-t border-slate-50">
              <div>
                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  <Linkedin className="w-3 h-3" /> Link do LinkedIn
                </label>
                <input 
                  name="linkedinOriginal"
                  value={formData.linkedinOriginal}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  placeholder="https://linkedin.com/in/perfil"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                  <FileText className="w-3 h-3" /> Notas Manuais
                </label>
                <textarea 
                  name="manualNote"
                  value={formData.manualNote}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-[28px] p-6 text-sm focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all h-32 resize-none shadow-inner"
                  placeholder="Adicione observações importantes sobre este lead..."
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-4 shrink-0 font-bold">
            <button 
              onClick={onClose}
              className="px-8 py-4 rounded-2xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all text-sm uppercase tracking-widest font-black"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-[24px] hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 disabled:opacity-50 text-sm uppercase tracking-widest font-black"
            >
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function PlusPhoneIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/><path d="M19 8h-6"/><path d="M16 5v6"/></svg>
  );
}
