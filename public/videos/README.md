# Onde colocar os vídeos

Joga os arquivos aqui dentro com **exatamente estes nomes** e eles aparecem na página
sozinhos — não precisa mexer em código nenhum.

| Arquivo | Onde aparece |
| --- | --- |
| `hero.mp4` | fundo da primeira dobra (loop, sem som) |
| `showreel.mp4` | bloco grande de vídeo antes da lista de projetos |
| `projeto-01.mp4` | Páginas de Venda |
| `projeto-02.mp4` | Sites Profissionais |
| `projeto-03.mp4` | Cardápios Digitais |
| `projeto-04.mp4` | Automação & Integração |
| `projeto-05.mp4` | Agentes de WhatsApp |
| `projeto-06.mp4` | Estrutura 360° |

Se um arquivo não existir, a capa em `/public/posters` continua aparecendo — nada quebra.

## Recomendações técnicas

- **Formato:** MP4 (H.264) — é o que funciona em todos os navegadores.
- **Tamanho:** até ~5 MB por vídeo. Acima disso, comprima.
- **Resolução:** 1920×1080 (16:9) é o ideal. O vídeo do hero aceita vertical também.
- **Duração:** 8–20 s em loop para o hero; 20–60 s para os projetos.
- **Sem áudio:** os players são mudos de propósito (autoplay exige isso).

## Como comprimir rápido

```bash
# precisa do ffmpeg instalado
ffmpeg -i original.mp4 -vcodec libx264 -crf 28 -preset slow -an -vf "scale=1920:-2" projeto-01.mp4
```

`-an` remove o áudio, `-crf 28` controla a qualidade (menor = melhor e mais pesado).

## Quer trocar o nome dos arquivos?

Edite os campos `video:` em [`src/data/site.ts`](../../src/data/site.ts).
