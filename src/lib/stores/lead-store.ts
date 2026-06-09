import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';
import type { LeadWithHistory } from '@/features/leads/types';

// ═══════════════════════
// Lead Management Store
// Estado compartilhado entre Leads e Agenda
// Otimizado com selectors granulares para evitar re-renders desnecessários
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

const useLeadStoreBase = create<LeadState>((set) => ({
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

// ═══════════════════════
// Selectors Granulares - Evitam re-renders desnecessários
// Use estes em vez de `useLeadStore()` direto
// ═══════════════════════

/** Selector apenas para leads (array) */
export const useLeads = () => useLeadStoreBase((state) => state.leads);

/** Selector para lead selecionado (objeto completo) */
export const useSelectedLead = () => useLeadStoreBase(
  useShallow((state) => state.leads.find((l) => l.id === state.selectedLeadId) ?? null)
);

/** Selector apenas para ID do lead selecionado */
export const useSelectedLeadId = () => useLeadStoreBase((state) => state.selectedLeadId);

/** Selector para estado do modal de edição */
export const useLeadEditorState = () => useLeadStoreBase(
  useShallow((state) => ({ isOpen: state.isEditModalOpen, isLoading: state.isLoadingEdit }))
);

/** Selector para actions de edição */
export const useLeadEditorActions = () => useLeadStoreBase(
  useShallow((state) => ({
    openLeadEditor: state.openLeadEditor,
    closeLeadEditor: state.closeLeadEditor,
    setLoadingEdit: state.setLoadingEdit,
    setSaving: state.setSaving,
  }))
);

/** Selector para actions de dados (leads array) */
export const useLeadDataActions = () => useLeadStoreBase(
  useShallow((state) => ({
    setLeads: state.setLeads,
    updateLeadInStore: state.updateLeadInStore,
    removeLeadFromStore: state.removeLeadFromStore,
  }))
);

/** Selector para loading/saving states */
export const useLeadLoadingState = () => useLeadStoreBase(
  useShallow((state) => ({ isLoadingEdit: state.isLoadingEdit, isSaving: state.isSaving }))
);

/** Selector para search query */
export const useLeadSearchQuery = () => useLeadStoreBase((state) => state.searchQuery);
export const useSetLeadSearchQuery = () => useLeadStoreBase((state) => state.setSearchQuery);

// Export compat para migração gradual
export const useLeadStore = useLeadStoreBase;
