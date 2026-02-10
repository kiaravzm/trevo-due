# Plano de melhorias de UX e responsividade — AgencyDocs

Este documento consolida o checklist de UX solicitado, a análise do projeto e as sugestões adicionais para implementação.

---

## 1. Checklist UX (solicitado)

### 1.1 Navegação clara

**Estado atual**
- Sidebar no dashboard com links: Dashboard, Clients, Invoices, Contracts, Settings.
- Destaque do item ativo com `bg-accent` e `text-accent-foreground`.
- Header público: quando logado mostra apenas "Dashboard"; quando não logado, "Sign in".
- Não há ícones na navegação nem breadcrumbs.

**Ações recomendadas**

| # | Tarefa | Onde | Prioridade |
|---|--------|------|------------|
| 1.1.1 | Adicionar ícones aos itens da navegação (ex.: lucide-react) | `components/dashboard-nav.tsx` | Alta |
| 1.1.2 | Incluir breadcrumbs nas páginas do dashboard (ex.: Dashboard > Clients) | Layout ou por página | Média |
| 1.1.3 | Garantir que o header (quando logado) também permita voltar ao dashboard e deixe claro que é a área autenticada | `components/site-header.tsx` | Média |
| 1.1.4 | Em mobile, transformar sidebar em drawer/menu hamburger (ver seção Responsividade) | `app/(protected)/dashboard/layout.tsx` + `DashboardNav` | Alta |

---

### 1.2 Botões de ação sempre na cor primária

**Estado atual**
- `Button` com `variant="default"` já usa cor primária (`bg-primary`).
- Inconsistências encontradas:
  - **Dashboard (Quick actions):** só "Manage clients" está em primary; "Manage contracts" = secondary, "Manage invoices" = outline, "Billing" e "Settings" = ghost.
  - **Settings:** "Manage subscription" está como `variant="secondary"`.
  - **SiteHeader:** "Dashboard" usa `Button asChild` sem `variant` (default = primary) ✓; "Sign in" usa `variant="default"` ✓.

**Convenção sugerida**
- **Ação principal da tela ou do bloco:** sempre `variant="default"` (primária).
- **Ações secundárias (cancelar, ver mais, link menos importante):** `secondary` ou `outline`.
- **Ações terciárias (link discreto):** `ghost` ou `link`.

**Ações recomendadas**

| # | Tarefa | Arquivo | Alteração |
|---|--------|---------|-----------|
| 1.2.1 | Quick actions: usar primary para a ação mais importante por contexto; manter hierarquia (ex.: 1 primary, demais secondary/outline) | `app/(protected)/dashboard/page.tsx` | Definir 1 CTA principal (ex. "Manage clients" ou "Manage invoices") como default; demais secondary/outline |
| 1.2.2 | Settings: se "Manage subscription" for a ação principal do card, usar `variant="default"` | `app/(protected)/dashboard/settings/page.tsx` | Trocar para default se for CTA principal |
| 1.2.3 | Auditoria em formulários: garantir que submit/CTA principal use `variant="default"` (já ok em login, client create, checkout) | Vários | Apenas revisar |

---

### 1.3 Logout claro

**Estado atual**
- **Não existe fluxo de logout** no projeto (nenhuma chamada a `signOut` ou equivalente).
- Em Settings, o bloco "User information" mostra apenas email e user ID, sem opção de sair da conta.

**Ações recomendadas**

| # | Tarefa | Onde | Prioridade |
|---|--------|------|------------|
| 1.3.1 | Implementar ação de logout (Supabase `auth.signOut()` + redirect para `/` ou `/login`) | Nova server action ou client handler | Alta |
| 1.3.2 | Botão "Sair" / "Log out" na página Settings, dentro do card "User information" (cor secundária ou outline para não competir com primary) | `app/(protected)/dashboard/settings/page.tsx` + componente de UserSummary ou ao lado | Alta |
| 1.3.3 | Opcional: link/botão de logout no header quando logado ou no rodapé da sidebar do dashboard | `site-header.tsx` e/ou `dashboard/layout.tsx` | Média |

---

## 2. Responsividade das telas

**Estado atual**
- Sidebar fixa `w-56` no layout do dashboard; em viewports pequenos ocupa espaço demais e não há menu colapsável.
- Uso de `container`, `grid`, `md:grid-cols-*` e `lg:grid-cols-*` em várias páginas (bom).
- `tailwind.config.ts`: container só define `2xl: 1200px`; não há `screens` sm/md/lg customizados (Tailwind usa os defaults).
- Login e páginas internas usam `px-4` ou `container`; conteúdo não quebra de forma orientada a mobile na sidebar.

**Ações recomendadas**

| # | Tarefa | Onde | Descrição |
|---|--------|------|-----------|
| 2.1 | Sidebar responsiva | `app/(protected)/dashboard/layout.tsx`, `dashboard-nav.tsx` | Em mobile (ex.: `< md`): esconder sidebar; mostrar botão hamburger que abre drawer/sheet com a mesma `DashboardNav`. Manter sidebar visível em desktop. |
| 2.2 | Header do dashboard em mobile | Layout dashboard | Em mobile, exibir header com logo + hamburger (e opcionalmente logout), para não depender só da sidebar. |
| 2.3 | Container e padding | `tailwind.config.ts`, páginas | Garantir `container` com padding menor em mobile (ex.: `px-4` em sm) e adequado em telas maiores; revisar se há overflow horizontal. |
| 2.4 | Tabelas/listas | Páginas com listas (clients, invoices, contracts) | Em mobile, considerar cards empilhados ou lista simplificada em vez de tabela larga; garantir toque fácil em linhas/actions. |
| 2.5 | Touch targets | Global | Botões e links críticos com altura mínima ~44px em mobile (já próximo com `h-10`/`h-11`; validar em telas pequenas). |

---

## 3. Outras melhorias sugeridas (análise do projeto)

### 3.1 Navegação e orientação
- **Breadcrumbs:** Dashboard > Clients / Invoices / etc., para contexto e navegação rápida.
- **Título da página no layout:** Garantir `<title>` ou heading consistente por rota (já há h1 nas páginas; conferir metadata por página se necessário).

### 3.2 Feedback e estados
- **Loading:** Login já tem "Loading sign-in..."; outras rotas podem usar Suspense + skeleton ou spinner ao carregar dados.
- **Estados vazios:** Mensagens como "No clients yet" estão ok; pode-se enriquecer com ilustração ou CTA claro ("Add your first client" com destaque).
- **Sucesso/erro em formulários:** Manter e, se quiser, toast ou mensagem mais visível após submit.

### 3.3 Acessibilidade e usabilidade
- **Focus visible:** Botões já usam `focus-visible:ring-2`; manter em novos componentes.
- **Labels e inputs:** Formulários analisados têm `label` associado; seguir esse padrão.
- **Contraste:** Cores atuais (primary, muted, destructive) parecem adequadas; validar em ferramentas de contraste se necessário.

### 3.4 Consistência visual
- **Hierarquia de botões:** Documentar em guia de estilo: 1 primary por seção; demais secondary/outline/ghost.
- **Cards e espaçamento:** Uso de `shadow-soft`, `space-y-*` e `container` está consistente; manter.

### 3.5 Performance e SEO
- **Metadata:** Root layout já tem title/description; considerar `generateMetadata` em rotas importantes (dashboard, login, settings).
- **Lazy loading:** Formulários pesados ou modais podem ser carregados sob demanda.

---

## 4. Ordem sugerida de implementação

1. **Logout (1.3)** — essencial para segurança e expectativa do usuário.  
2. **Botões primários (1.2)** — mudanças pontuais e rápidas.  
3. **Sidebar responsiva + menu mobile (2.1, 2.2)** — maior impacto em usabilidade em dispositivos móveis.  
4. **Ícones na navegação (1.1.1)** — melhora reconhecimento visual.  
5. **Logout no header ou sidebar (1.3.3)** — segundo ponto de saída.  
6. **Breadcrumbs (1.1.2)** e **ajustes de container/listas (2.3, 2.4)**.  
7. **Estados de loading e estados vazios (3.2)** e **melhorias opcionais (3.3–3.5)**.

---

## 5. Resumo do checklist

| Item | Status atual | Ação |
|------|----------------|------|
| Navegação clara | Parcial (sidebar ok, sem ícones e sem mobile) | Ícones, breadcrumbs, sidebar responsiva |
| Botões de ação na cor primária | Inconsistente em Quick actions e Settings | Padronizar CTA principal = default |
| Logout claro | Não existe | Implementar signOut + botão em Settings (e opcional no header/sidebar) |
| Responsividade | Sidebar fixa, sem menu mobile | Drawer/sheet em mobile; header com hamburger |

Este plano pode ser usado como backlog; cada tarefa pode virar issue ou item de sprint conforme a prioridade do time.
