'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  User, 
  Key, 
  Mail, 
  Shield, 
  Bell, 
  Save, 
  RefreshCw,
  Info,
  ExternalLink,
  Loader2,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ConfirmDeleteModal } from '@/components/ConfirmDeleteModal';

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('');
  const [linkedinConnected, setLinkedinConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Clear Base State
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const fetchSettings = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/me`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setApiKey(data.sendgridApiKey || '');
      setLinkedinConnected(data.linkedinConnected || false);
    } catch (err) {
      console.error('Erro ao buscar configurações:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    try {
      const response = await fetch(`http://localhost:3000/users/settings`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ sendgridApiKey: apiKey }),
      });
      
      if (response.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (err) {
      setSaveStatus('error');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleConnectLinkedin = async () => {
    setIsConnecting(true);
    try {
      // Registrar conexão no backend
      const response = await fetch(`http://localhost:3000/users/settings`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ 
          linkedinConnected: true,
          linkedinAccessToken: 'simulated_token_' + Date.now() 
        }),
      });
      
      if (response.ok) {
        setLinkedinConnected(true);
      }
    } catch (err) {
      console.error('Erro ao conectar LinkedIn:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleClearData = async () => {
    setIsClearing(true);
    try {
      const response = await fetch(`http://localhost:3000/leads/bulk-delete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        setIsClearModalOpen(false);
        window.location.href = '/dashboard/leads';
      } else {
        const error = await response.json().catch(() => ({}));
        alert(`Erro ao limpar base: ${error.message || 'Erro no servidor'}`);
      }
    } catch (err: any) {
      console.error('Erro ao limpar dados:', err);
      alert('Erro de conexão ao limpar base de leads.');
    } finally {
      setIsClearing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-4">
            <Settings className="w-10 h-10 text-indigo-600" />
            Configurações do Sistema
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Gerencie sua conta, integrações e segurança.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3.5 rounded-[20px] font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saveStatus === 'success' ? 'Salvo!' : 'Salvar Alterações'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="space-y-2">
          {[
            { icon: User, label: 'Perfil Geral', active: true },
            { icon: Key, label: 'Integrações & API', active: false },
            { icon: Bell, label: 'Notificações', active: false },
            { icon: Shield, label: 'Segurança', active: false },
          ].map((item, idx) => (
            <button 
              key={idx}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${
                item.active 
                  ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[48px] border border-slate-200 p-10 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                <Key className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Integrações de Envio</h3>
                <p className="text-sm text-slate-500">Configure as chaves para automação de e-mail e LinkedIn.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 group">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-slate-800" />
                    <span className="font-bold text-slate-900">SendGrid API Key</span>
                  </div>
                  {apiKey && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Configurado</span>
                  )}
                </div>
                <div className="relative">
                  <input 
                    type="password" 
                    value={apiKey} 
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="SG.XXXXXXXXXXX..."
                    className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-4 pr-12 text-sm text-slate-900 focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-300">
                    <Key className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-4 flex items-center gap-1 uppercase font-black tracking-widest">
                  <Info className="w-3 h-3" /> Necessário para templates de e-mail.
                </p>
              </div>

              <div 
                onClick={!linkedinConnected ? handleConnectLinkedin : undefined}
                className={`p-8 rounded-[32px] border transition-all flex items-center justify-between group cursor-pointer ${
                  linkedinConnected 
                    ? 'bg-blue-50/30 border-blue-100' 
                    : 'bg-slate-50 border-slate-100 border-dashed hover:border-indigo-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
                    linkedinConnected ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 group-hover:text-blue-600'
                  }`}>
                    {isConnecting ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">
                      {linkedinConnected ? 'LinkedIn Conectado' : 'Conectar LinkedIn (OAuth)'}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {linkedinConnected ? 'Seu perfil está pronto para automação direta.' : 'Habilite automação direta sem extensões.'}
                    </p>
                  </div>
                </div>
                {linkedinConnected ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <ExternalLink className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-all" />
                )}
              </div>
            </div>
          </motion.div>

          <div className="p-10 border-2 border-dashed border-rose-100 rounded-[48px] bg-rose-50/20 backdrop-blur-sm">
            <h4 className="text-rose-900 font-extrabold mb-2 uppercase tracking-widest text-xs">Zona de Perigo</h4>
            <p className="text-rose-600/60 text-sm mb-6 font-medium">Ações irreversíveis que impactam toda a rede de leads, interações e histórico de importação.</p>
            <button 
              onClick={() => setIsClearModalOpen(true)}
              className="flex items-center gap-3 bg-white border border-rose-200 text-rose-600 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-sm"
            >
              <Trash2 className="w-4 h-4" />
              Resetar Base de Leads
            </button>
          </div>
        </div>
      </div>

      <ConfirmDeleteModal 
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={handleClearData}
        isLoading={isClearing}
        title="Resetar Toda a Base?"
        description="Esta ação excluirá permanentemente TODOS os leads, interações, logs e configurações de importação. Você começará com uma base totalmente limpa."
      />
    </div>
  );
}
