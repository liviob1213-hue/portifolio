# Portfólio — Vibe Coder

Portfólio pessoal com foco em movimento: vídeo dos projetos, trajetória em rolagem
horizontal, acordeão de especialidades, marquees de IA e um método que empilha cartões.

## Rodar

```bash
npm install
npm run dev        # http://localhost:4311
npm run build      # valida tipos e gera a versão de produção
npm run typecheck  # só a checagem de tipos
```

> **"localhost recusou a conexão"?** Isso só quer dizer que o servidor está parado —
nada é servido com o `npm run dev` desligado. Rode `npm run dev` de novo e recarregue a
página. A porta (4311) está fixada no `package.json` para o endereço ser sempre o mesmo.

## Onde eu mexo

**Todo o conteúdo está em um arquivo só:** [`src/data/site.ts`](src/data/site.ts).
Nome, textos, projetos, especialidades, IAs, parcerias, método e contato saem de lá.
Os campos marcados com `TODO:` estão esperando você.

| Quero mudar... | Arquivo |
| --- | --- |
| Textos, nome, contatos, projetos, parcerias, links | [`src/data/site.ts`](src/data/site.ts) |
| Itens das costas do card da foto | [`src/data/site.ts`](src/data/site.ts) — array `expertise` |
| Cores e fontes | [`src/app/globals.css`](src/app/globals.css) (bloco `@theme`) |
| Ordem das seções | [`src/app/page.tsx`](src/app/page.tsx) |
| Vídeos | [`public/videos/`](public/videos/README.md) |
| Imagens | [`public/images/`](public/images/README.md) |
| Capas de fallback | [`public/posters/`](public/posters/) |

## Vídeos

Jogue os arquivos em `public/videos` com os nomes listados em
[`public/videos/README.md`](public/videos/README.md) e eles aparecem sozinhos.

Enquanto um vídeo não existe, a página mostra uma capa desenhada (SVG) no lugar —
nada de ícone quebrado. Os vídeos são mudos e só carregam quando aparecem na tela.

## As animações

| Efeito | Onde | Como |
| --- | --- | --- |
| Scroll suave | página inteira | Lenis (`SmoothScroll.tsx`) |
| Abertura com contador 0→100 | `Preloader.tsx` | GSAP timeline + cortinas |
| Cursor customizado | `Cursor.tsx` | GSAP `quickTo` + `data-cursor="PLAY"` |
| Título gigante entrando por máscara | `Hero.tsx` | timeline pausada, liberada no evento `portfolio:ready` |
| Texto que acende palavra por palavra | `Manifesto.tsx` | ScrollTrigger com `scrub` |
| Trajetória em rolagem horizontal | `Trajectory.tsx` | `pin: true` + `containerAnimation` |
| Números que contam | `Stats.tsx` | tween em objeto + ScrollTrigger |
| Card da foto que flutua e vira | `ui/FlipPhotoCard.tsx` | `quickTo` no hover + `rotationY: 180` no clique revela as especialidades |
| Player que segue o cursor | `Projects.tsx` | `quickTo` + troca de `key` no vídeo |
| Cartões empilhando | `Process.tsx` | `position: sticky` + `scale` por scroll |
| Botão magnético | `Contact.tsx` | atração pelo cursor via `quickTo` |

## Evento interno

O preloader dispara `portfolio:ready` no `window` quando termina. O Hero, o menu e o
ScrollTrigger esperam esse evento para começar — é assim que a abertura encaixa com a
primeira dobra sem atraso artificial.

## Acessibilidade

- `prefers-reduced-motion` desliga o scroll suave e pula a abertura.
- O cursor customizado só é montado em telas com mouse.
- Menu e acordeões usam `aria-expanded` e fecham com `Esc`.

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · GSAP 3 + ScrollTrigger ·
Framer Motion 13 · Lenis
