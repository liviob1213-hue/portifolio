# Onde colocar as imagens

| Arquivo | Onde aparece | Tamanho ideal |
| --- | --- | --- |
| `retrato.jpg` | sua foto na seção "Quem sou" | 900×1200 (vertical 3:4) |

Se o arquivo não existir, aparece o placeholder gráfico em `/public/posters/retrato.svg` —
nada quebra e nada fica com quadrado de imagem faltando.

## Dicas

- **Formato:** JPG para foto, PNG ou SVG para logo com fundo transparente.
- **Peso:** até 400 KB. Use <https://squoosh.app> para comprimir sem perder qualidade.
- **Cor:** não precisa tratar nada — a página já aplica um degradê escuro e um toque
  de violeta por cima para a foto casar com o resto do layout.
- **Foto:** fundo escuro ou neutro funciona melhor que fundo branco. Se puder, escolha
  uma luz lateral e evite foto de perfil frente para a câmera.

## Logos das parcerias

As parcerias por enquanto usam monogramas (P1, P2, P3...) definidos em
[`src/data/site.ts`](../../src/data/site.ts). Quando você me mandar os logos, a seção
passa a exibir as marcas em vez das iniciais.

## Quer trocar o nome do arquivo?

Edite o campo `photo.portrait` em [`src/data/site.ts`](../../src/data/site.ts).
