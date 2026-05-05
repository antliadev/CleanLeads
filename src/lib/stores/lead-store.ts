import { create } from 'zustand';
import type { LeadWithHistory } from '@/features/leads/types';

// ═══════════════════════
// Lead Management Store
// Estado compartilhado entre Leads e Agenda
// ═══════════════════════

interface LeadState {
  // ── Dados ──
  leads: LeadWithHistory[];
  selectedLeadId: string | null;

  // ── UI: Editor ──
  isEditModalOpen: boolean;

  // ── UI: Filtros ──
  searchQuery: string;

  // ── Loading States ──
  isLoadingEdit: boolean;
  isSaving: boolean;

  // ── Actions: Dados ──
  setLeads: (leads: LeadWithHistory[]) => void;
  updateLeadInStore: (leadId: string, updates: Partial<LeadWithHistory>) => void;
  removeLeadFromStore: (leadId: string) => void;

  // ── Actions: Editor ──
  openLeadEditor: (leadId: string | null) => void;
  closeLeadEditor: () => void;

  // ── Actions: Loading ──
  setLoadingEdit: (loading: boolean) => void;
  setSaving: (saving: boolean) => void;

  // ── Actions: Busca ──
  setSearchQuery: (query: string) => void;
}

export const useLeadStore = create<LeadState>((set) => ({
  leads: [],
  selectedLeadId: null,
  isEditModalOpen: false,
  searchQuery: '',
  isLoadingEdit: false,
  isSaving: false,

  setLeads: (leads) => set({ leads }),

  updateLeadInStore: (leadId, updates) =>
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === leadId ? { ...lead, ...updates } : lead
      ),
    })),

  removeLeadFromStore: (leadId) =>
    set((state) => ({
      leads: state.leads.filter((lead) => lead.id !== leadId),
    })),

  openLeadEditor: (leadId) => set({ selectedLeadId: leadId, isEditModalOpen: true }),

  closeLeadEditor: () => set({ selectedLeadId: null, isEditModalOpen: false, isLoadingEdit: false }),

  setLoadingEdit: (isLoadingEdit) => set({ isLoadingEdit }),

  setSaving: (isSaving) => set({ isSaving }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));