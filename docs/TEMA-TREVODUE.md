# Tema Visual TrevoDue

Design system e diretrizes para o TrevoDue — SaaS de controle de contratos e faturas.

## Diretrizes do produto

- **Foco em clareza, simplicidade e baixo esforço cognitivo**
- Interface entendida rapidamente, sem tutoriais
- Evitar aparência de sistema financeiro ou contábil
- Público: profissionais independentes e pequenos negócios de serviço

---

## Identidade visual

### Paleta: Modern Soft Mint

| Uso             | Token            | Valor   | Notas                             |
| --------------- | ---------------- | ------- | --------------------------------- |
| Primária        | `--primary`      | #2CB67D | Ações principais, links           |
| Primária suave  | `--primary-soft` | #EAF7F1 | Fundos discretos, navegação ativa |
| Acento          | `--accent`       | #7F5AF0 | Uso mínimo                        |
| Sucesso         | `--success`      | #2CB67D | Pago, assinado                    |
| Atenção         | `--warning`      | #FBBF24 | Pendente                          |
| Erro            | `--error`        | #EF4444 | Atrasado                          |
| Texto principal | `--foreground`   | #0F172A | Conteúdo                          |
| Fundo           | `--background`   | #FFFFFF | Página                            |

### Tipografia

- **Interface:** Inter — legível, neutra, amplamente suportada
- **Logo:** Manrope SemiBold — personalidade sutil sem exagero

### Tom visual

Moderno, calmo, profissional, amigável, não chamativo.

---

## Tokens de design

### Cores (globals.css)

Variáveis CSS em `:root` e `.dark` cobrem:

- Cores principais e semânticas
- Neutras (muted, border, input)
- Ring (foco para acessibilidade)

### Tipografia (layout + tailwind)

```css
--font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
--font-logo: var(--font-manrope), var(--font-inter), sans-serif;
```

Classes: `font-sans` (padrão), `font-logo` (somente logo).

### Espaçamentos

- Escala base: 0.25rem (4px) até 3rem (48px)
- Uso: `space-y-4`, `gap-4`, `p-6`, etc.

### Raios e sombras

- `--radius-sm`: 6px
- `--radius-md`: 8px
- `--radius-lg`: 10px
- `--radius-xl`: 12px
- Sombras leves: xs, sm, md, lg, soft

---

## Componentes

### Botões

- **Primário:** Verde (#2CB67D), ação principal
- **Secundário:** Fundo mint suave
- **Destrutivo:** Vermelho para exclusão
- **Outline/Ghost:** Baixo destaque
- Estados: hover, active, focus-visible, disabled

### Inputs e Select

- Altura 40px, bordas suaves, foco com ring verde
- Placeholder em `muted-foreground`
- Select nativo estilizado com chevron

### Badges de status

- **StatusBadge:** Ponto + texto (não depende só de cor)
- Variantes: success (Pago/Assinado), warning (Pendente), error (Atrasado), secondary (Rascunho)

### Modais e overlays

- Overlay escuro suave (50% opacity)
- Bordas arredondadas, sombra leve
- Sheet para mobile (bottom drawer)

### Estados vazios (EmptyState)

- Ícone em círculo
- Título e descrição
- Ação opcional (ex.: “Criar primeira fatura”)

### Skeleton

- `animate-pulse` + `bg-muted` para loading

---

## Princípios de usabilidade

1. **Pouco ruído visual** — sem decoração desnecessária
2. **Espaçamento generoso** — respiro entre elementos
3. **Cor só quando comunica** — status, ações primárias
4. **Ação principal clara** — botão primário destacado
5. **Não depender só de cor** — ícones/texto nos badges
6. **Acessível (WCAG AA)** — contraste e foco visível
7. **Formulários simples** — campos diretos, labels claros

---

## Justificativas principais

### Paleta Modern Soft Mint

- Verde mint transmite controle e calma, sem parecer financeiro
- Evita o azul genérico de SaaS
- Primária suave para destaque leve, sem cansaço visual

### Inter

- Alta legibilidade em UI
- Neutra e profissional
- Bem suportada em interfaces

### Manrope no logo

- Identidade diferenciada sem conflito com o restante da UI

### StatusBadge com ponto + texto

- Atende quem tem daltonismo
- Reforça o significado além da cor

### Sombras leves

- Sensação de profundidade sem sensação de “sistema pesado”
- Mantém o visual leve e moderno

### Espaçamento amplo

- Reduz cansaço cognitivo
- Facilita varredura visual

O resultado busca transmitir **controle, tranquilidade e clareza**, sem que a interface roube atenção do conteúdo.
