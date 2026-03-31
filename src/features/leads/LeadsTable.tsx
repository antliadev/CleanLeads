'use client';

import { useState } from 'react';
import { Pencil, Trash2, Mail, Phone, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

import { LinkedinIcon } from '@/components/icons/Linkedin';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { LeadForm } from './LeadForm';
import { deleteLead } from '@/actions/leads';
import { formatDate, getLinkedinProfileUrl, getGmailComposeUrl } from '@/lib/utils';
import { ContactActionModal } from './ContactActionModal';
import { LEAD_SOURCE_MAP } from '@/lib/constants';
import type { Lead, Template, TemplateChannel } from '@prisma/client';

interface LeadsTableProps {
  leads: Lead[];
  total: number;
  page: number;
  totalPages: number;
  templates: Template[];
  onPageChange: (page: number) => void;
}

export function LeadsTable({ leads, total, page, totalPages, templates, onPageChange }: LeadsTableProps) {
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [creating, setCreating] = useState(false);
  const [contactModal, setContactModal] = useState<{ isOpen: boolean; lead: Lead | null; channel: TemplateChannel }>({ 
    isOpen: false, lead: null, channel: 'LINKEDIN' 
  });

  async function handleDelete(id: string) {
    await deleteLead(id);
  }

  return (
    <div className="space-y-4">
      {/* Barra de ações */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 font-medium">
          {total} {total === 1 ? 'lead encontrado' : 'leads encontrados'}
        </p>
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20"
        >
          <Plus className="w-4 h-4" />
          Novo Lead
        </button>
      </div>

      {/* Tabela */}
      {leads.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
            <Plus className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">Nenhum lead encontrado</h3>
          <p className="text-sm text-slate-400 mt-1">Adicione seu primeiro lead ou ajuste os filtros</p>
          <button
            onClick={() => setCreating(true)}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all"
          >
            Adicionar Lead
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Lead</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Contato</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Origem</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Criado em</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {leads.map((lead) => {
                  const sourceConfig = LEAD_SOURCE_MAP[lead.source];
                  const linkedinUrl = getLinkedinProfileUrl(lead.linkedinUrl, lead.fullName);
                  const gmailUrl = getGmailComposeUrl(lead.email, lead.fullName);

                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/60 transition-colors group">
                      {/* Lead info */}
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-slate-900">{lead.fullName}</p>
                          {lead.company && (
                            <p className="text-xs text-slate-500 mt-0.5">{lead.company}</p>
                          )}
                          {lead.jobTitle && (
                            <p className="text-xs text-slate-400">{lead.jobTitle}</p>
                          )}
                        </div>
                      </td>

                      {/* Canais de contato */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {lead.linkedinUrl && (
                            <button
                              onClick={() => setContactModal({ isOpen: true, lead, channel: 'LINKEDIN' })}
                              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                              title="LinkedIn"
                            >
                              <LinkedinIcon className="w-4 h-4" />
                            </button>
                          )}
                          {lead.email && (
                            <button
                              onClick={() => setContactModal({ isOpen: true, lead, channel: 'EMAIL' })}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                              title="Gmail"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                          )}
                          {lead.phone && (
                            <a
                              href={`tel:${lead.phone}`}
                              className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                              title={lead.phone}
                            >
                              <Phone className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <StatusBadge status={lead.status} />
                      </td>

                      {/* Origem */}
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${sourceConfig.color}`}>
                          {sourceConfig.label}
                        </span>
                      </td>

                      {/* Data */}
                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                        {formatDate(lead.createdAt)}
                      </td>

                      {/* Ações */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setEditingLead(lead)}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                            title="Editar"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <ConfirmDialog
                            title="Excluir lead"
                            description={`Tem certeza que deseja excluir "${lead.fullName}"? Esta ação não pode ser desfeita.`}
                            onConfirm={() => handleDelete(lead.id)}
                          >
                            <button
                              className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                              title="Excluir"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </ConfirmDialog>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                Página {page} de {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onPageChange(page - 1)}
                  disabled={page <= 1}
                  className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onPageChange(page + 1)}
                  disabled={page >= totalPages}
                  className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modais */}
      {creating && <LeadForm onClose={() => setCreating(false)} />}
      {editingLead && <LeadForm lead={editingLead} onClose={() => setEditingLead(null)} />}

      <ContactActionModal
        isOpen={contactModal.isOpen}
        onClose={() => setContactModal(prev => ({ ...prev, isOpen: false }))}
        lead={contactModal.lead}
        channel={contactModal.channel}
        templates={templates}
      />
    </div>
  );
}
