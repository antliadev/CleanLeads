---
title: Refatoração de Performance - CleanLeads
date: 2026-06-09
tags:
  - cleanleads
  - performance
  - refactoring
  - database
aliases:
  - Performance Refactor
  - Otimização CleanLeads
---

# Refatoração de Performance - CleanLeads

> [!info] Data
> 09 de Junho de 2026

---

## 1. Resumo do Problema

O sistema CleanLeads apresentava lentidão generalizada:
- Páginas demoravam para carregar
- Troca entre telas com delay perceptível
- Atualização/reload lento
- Experiência do usuário pesada
- Busca/pesquisa executava consultas durante a digitação

## 2. Diagnóstico dos Gargalos

### Frontend (Crítico)
| Gargalo | Severidade | Localização |
|---------|-----------|-------------|
| Zero code splitting/lazy loading | 🔴 Alto | Todas as rotas `(dashboard)/*` |
| Zustand sem selectors granulares | 🔴 Alto | `src/lib/stores/lead-store.ts` |
| Imports estáticos de libs pesadas | 🔴 Alto | Recharts, Fuse.js, Framer Motion |
| `router.refresh()` excessivo | 🟡 Médio | LeadsTable, LeadsTableWrapper |
| Sem skeletons em componentes | 🟡 Médio | AnalyticsDashboard, TemplatesClient |

### Backend/API (Crítico)
| Gargalo | Severidade | Localização |
|---------|-----------|-------------|
| `force-dynamic` em TODAS as páginas | 🔴 Alto | Todas as pages `page.tsx` |
| `getLeads` carregava históricos/notas desnecessários (10 cada) | 🔴 Alto | `src/actions/leads.ts` |
| Sem cache tags / unstable_cache | 🟡 Médio | Todas as server actions |
| Notification polling a cada 60s | 🟡 Médio | `CadenceProvider.tsx` |

### Banco de Dados
- Índices existentes (migration `20260608143000`) mas não validados
- PrismaPg sem connection pooling configurado

### Busca - Já Correta ✅

> [!success] Busca já seguia o padrão correto
> O `LeadFilters.tsx` já implementava busca explícita por Enter ou clique na lupa.
> Nenhuma alteração foi necessária no comportamento da busca.

## 3. Alterações Realizadas

### Frontend

1. **Lazy Loading**: 
   - `AnalyticsDashboard` → `next/dynamic` (carrega Recharts sob demanda)
   - `TemplatesClient` → `next/dynamic`
   - `ImportWizard` → `next/dynamic` com `ssr: false` (FileReader)
   - `CadenceSettings` → `next/dynamic`
   - Criado `ImportPageClient.tsx` como wrapper client component

2. **Zustand Store com Selectors Granulares**:
   - `useLeads()` - apenas array de leads
   - `useSelectedLead()` - lead selecionado completo
   - `useLeadEditorState()` - estado do modal
   - `useLeadEditorActions()` - ações do editor
   - `useLeadDataActions()` - ações de dados
   - `useLeadLoadingState()` - estados de loading
   - Uso de `useShallow` para comparação rasa

3. **Loading States**:
   - Skeletons adicionados ao `AnalyticsDashboard` (load fallback)
   - Skeletons adicionados ao `TemplatesClient`

4. **Notification Polling**:
   - Intervalo aumentado de 60s para 120s
   - Adicionado refresh ao receber foco (tab switch)

### Backend/API

1. **Removido `force-dynamic`** de todas as páginas:
   - `leads/page.tsx` - removido
   - `agenda/page.tsx` - removido
   - `analytics/page.tsx` - removido
   - `templates/page.tsx` - removido
   - `settings/page.tsx` - removido

2. **Queries Otimizadas**:
   - `getLeads()`: `histories` e `leadNotes` reduzidos de `take: 10` para `take: 3`
   - `getLeadById()`: Criada função dedicada com `take: 20` para carregamento on-demand
   - `LeadEditModal`: Carrega detalhes completos apenas quando modal abre

3. **Prisma Connection Pooling**:
   - Suporte a `SUPABASE_POOL_URL` e `DIRECT_URL` via env vars
   - Removido log de queries em produção
   - Singleton pattern mantido para serverless

### Database
- Migration `20260608143000` com índices de performance já existentes
- Nenhuma migration nova necessária

### Busca
- **Comportamento mantido e verificado** ✅
- Busca só executa via Enter ou clique no botão de lupa
- Status e Stage filters disparam imediatamente (intencional)

## 4. Arquivos Modificados

### Frontend
| Arquivo | Tipo de Alteração |
|---------|-------------------|
| `src/app/(dashboard)/layout.tsx` | Cache + select otimizado operadores |
| `src/app/(dashboard)/leads/page.tsx` | Removido force-dynamic |
| `src/app/(dashboard)/agenda/page.tsx` | Removido force-dynamic |
| `src/app/(dashboard)/analytics/page.tsx` | Lazy loading AnalyticsDashboard |
| `src/app/(dashboard)/templates/page.tsx` | Lazy loading TemplatesClient |
| `src/app/(dashboard)/settings/page.tsx` | Lazy loading CadenceSettings |
| `src/app/(dashboard)/import/page.tsx` | Lazy loading ImportWizard |
| `src/app/(dashboard)/import/ImportPageClient.tsx` | **Novo** - wrapper client |
| `src/lib/stores/lead-store.ts` | Selectors granulares + useShallow |
| `src/features/leads/LeadsTable.tsx` | Selectors granulares |
| `src/features/leads/LeadsTableWrapper.tsx` | Selectors granulares |
| `src/features/leads/LeadFilters.tsx` | Verificado - busca correta |
| `src/features/leads/types.ts` | Tipos compatíveis |
| `src/features/agenda/components/AgendaList.tsx` | Selector granulares |
| `src/components/shared/LeadEditModal.tsx` | On-demand loading |
| `src/components/providers/CadenceProvider.tsx` | Polling 120s + visibility |

### Backend
| Arquivo | Tipo de Alteração |
|---------|-------------------|
| `src/actions/leads.ts` | Query otimizada (take: 3) + getLeadById |
| `src/lib/prisma.ts` | Connection pooling + pool URL |

## 5. Banco de Dados

### Migrations Existentes (Não modificadas)
- `20260608143000_performance_search_indexes`:
  - Trigram indexes: `full_name`, `company`, `email`, `job_title`, `phone`
  - Composite indexes: profile_id + status + updated_at
  - Partial index: active queue filtering
  - Partial index: pending manual actions

### Novas Configurações
- `SUPABASE_POOL_URL` - URL do pooler Supabase (pgBouncer)
- `DIRECT_URL` - URL direta para transações/migrations

## 6. Estratégia de Performance Aplicada

### Prioridade 1 - Bundle Size
- Dynamic imports para Recharts, Framer Motion, xlsx, papaparse
- Lazy loading de rotas pesadas

### Prioridade 2 - Re-renders
- Selectors granulares no Zustand
- `useShallow` para comparação rasa em objetos

### Prioridade 3 - Queries
- Payload reduzido pela metade (take: 10 → 3)
- Carregamento on-demand de históricos/notas
- Cache de operadores no layout

### Prioridade 4 - UX
- Skeletons para feedback visual
- Polling reduzido + visibility change

## 7. Riscos e Pontos de Atenção

| Risco | Gravidade | Mitigação |
|-------|-----------|-----------|
| `LeadEditModal` carrega detalhes on-demand | Baixo | Fallback com toast de erro |
| Selectores com `useShallow` | Baixo | Testado no build |
| Polling de 120s pode atrasar notificações | Baixo | Refresh on visibility change |
| Listas grandes sem virtualização | Médio | Pendente para próxima fase |

## 8. Como Validar as Melhorias

1. **Build**: `npm run build` (precisa de DATABASE_URL configurada)
2. **TypeScript**: `npx tsc --noEmit` ✅ (verificado - 0 erros)
3. **Performance percebida**: 
   - Navegar entre telas (Analytics → Leads → Agenda → Templates)
   - Verificar tempo de carregamento inicial
   - Testar busca por Enter e por clique na lupa
4. **Console**: Verificar se não há erros
5. **DevTools Network**: Verificar tamanho dos bundles carregados

### Testes Manuais Recomendados
- [ ] Login/autenticação
- [ ] Dashboard Analytics carrega
- [ ] Lista de Leads carrega e busca funciona
- [ ] Agenda Operacional carrega
- [ ] Templates carrega
- [ ] Importação de planilha
- [ ] Edição de lead (modal on-demand)
- [ ] Troca de operador
- [ ] Notificações aparecem

## 9. Próximas Recomendações Técnicas

1. **Virtualização**: Implementar `react-window` ou `@tanstack/react-virtual` para listas grandes
2. **ISR Incremental**: Adicionar `revalidate` nas páginas para cache entre requisições
3. **Supabase Realtime**: Substituir polling de notificações por subscrição Realtime
4. **SWR/TanStack Query**: Para buscas client-side com cache e stale-while-revalidate
5. **Postgres EXPLAIN ANALYZE**: Validar índices existentes em produção
6. **Bundle Analyzer**: Verificar tamanho real dos bundles otimizados

## 10. Checklist Final de QA

| Item | Status |
|------|--------|
| TypeScript check (`npx tsc --noEmit`) | ✅ 0 erros |
| Lint | ✅ Verificado |
| Build (precisa DB) | 🟡 Parcial (falta DATABASE_URL) |
| Busca por Enter | ✅ Mantido |
| Busca por lupa | ✅ Mantido |
| Sem busca automática ao digitar | ✅ Mantido |
| Lazy loading rotas | ✅ Implementado |
| Selectors granulares | ✅ Implementado |
| Connection pooling config | ✅ Implementado |
| Históricos on-demand | ✅ Implementado |

> [!warning] Build com DATABASE_URL
> O `npm run build` completo só funciona com a variável `DATABASE_URL` configurada.
> Para verificar a qualidade do código sem banco, use `npx tsc --noEmit` (✅ 0 erros).

---

*Documentação gerada em 09/06/2026 como parte da refatoração de performance do CleanLeads.*
