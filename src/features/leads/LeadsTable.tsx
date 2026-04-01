'use client';

import { useState } from 'react';
import { Pencil, Trash2, Mail, Phone, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

import { LinkedinIcon } from '@/components/icons/Linkedin';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { LeadForm } from './LeadForm';
import { deleteLead, deleteAllLeads } from '@/actions/leads';
import { formatDate, getLinkedinProfileUrl, getGmailComposeUrl } from '@/lib/utils';
import { ContactActionModal } from './ContactActionModal';
import { LEAD_SOURCE_MAP } from '@/lib/constants';
import type { Template, TemplateChannel } from '@prisma/client';
import type { Prisma } from '@prisma/client';

type LeadWithHistory = Prisma.LeadGetPayload<{
  include: { histories: true };
}>;

interface LeadsTableProps {
  leads: LeadWithHistory[];
  total: number;
  page: number;
  totalPages: number;
  templates: Template[];
  onPageChange: (page: number) => void;
}

export function LeadsTable({ leads, total, page, totalPages, templates, onPageChange }: LeadsTableProps) {
  const [editingLead, setEditingLead] = useState<LeadWithHistory | null>(null);
  const [creating, setCreating] = useState(false);
  const [contactModal, setContactModal] = useState<{ isOpen: boolean; lead: LeadWithHistory | null; channel: TemplateChannel }>({ 
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
        <div className="flex items-center gap-2">
          {leads.length > 0 && (
            <ConfirmDialog
              title="Limpar Base de Leads"
              description="Esta ação excluirá PERMANENTEMENTE todos os leads cadastrados no seu perfil. Esta ação não pode ser desfeita."
              onConfirm={async () => {
                await deleteAllLeads();
              }}
            >
              <button
                className="flex items-center gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 text-sm font-bold px-4 py-2.5 rounded-xl transition-all"
              >
                <Trash2 className="w-4 h-4" />
                Limpar Base
              </button>
            </ConfirmDialog>
          )}
          <button
            onClick={() => setCreating(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20"
          >
            <Plus className="w-4 h-4" />
            Novo Lead
          </button>
        </div>
      </div>

      {/* Tabela */}
      {leads.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center py-20 text-center transition-colors">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center mb-4 transition-colors">
            <Plus className="w-8 h-8 text-slate-300 dark:text-slate-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Nenhum lead encontrado</h3>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Adicione seu primeiro lead ou ajuste os filtros</p>
          <button
            onClick={() => setCreating(true)}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all"
          >
            Adicionar Lead
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 transition-colors">
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Lead</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Contato</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Origem</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Criado em</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                {leads.map((lead) => {
                  const sourceConfig = LEAD_SOURCE_MAP[lead.source];
                  const linkedinUrl = getLinkedinProfileUrl(lead.linkedinUrl);
                  const gmailUrl = getGmailComposeUrl(lead.email, lead.fullName);

                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors group">
                      {/* Lead info */}
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-slate-900 dark:text-slate-100">{lead.fullName}</p>
                          {lead.company && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{lead.company}</p>
                          )}
                          {lead.jobTitle && (
                            <p className="text-xs text-slate-400 dark:text-slate-500">{lead.jobTitle}</p>
                          )}
                        </div>
                      </td>

                      {/* Canais de contato */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {lead.linkedinUrl && (
                            <button
                              onClick={() => setContactModal({ isOpen: true, lead, channel: 'LINKEDIN' })}
                              className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                              title="LinkedIn"
                            >
                              <LinkedinIcon className="w-4 h-4" />
                            </button>
                          )}
                          {lead.email && (
                            <button
                              onClick={() => setContactModal({ isOpen: true, lead, channel: 'EMAIL' })}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                              title="Gmail"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                          )}
                          {lead.phone && (
                            <button
                              onClick={() => setContactModal({ isOpen: true, lead, channel: 'WHATSAPP' })}
                              className="p-1.5 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors"
                              title="WhatsApp"
                            >
                              <Phone className="w-4 h-4" />
                            </button>
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
                            className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-colors"
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
                              className="p-2 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors"
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
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-800 transition-colors">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Página {page} de {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onPageChange(page - 1)}
                  disabled={page <= 1}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onPageChange(page + 1)}
                  disabled={page >= totalPages}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
