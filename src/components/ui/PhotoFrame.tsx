"use client";

import { useState } from "react";

type Props = {
  /** caminho da imagem em /public — ex: "/images/retrato.jpg" */
  src: string;
  /** capa mostrada enquanto a imagem não existe ou não carregou */
  fallback?: string;
  alt: string;
  className?: string;
  caption?: string;
  /** proporção da moldura */
  ratio?: "3/4" | "4/5" | "1/1";
};

const RATIO: Record<string, string> = {
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "1/1": "aspect-square",
};

/**
 * Moldura de foto com degradê de segurança: enquanto a imagem não estiver em
 * /public/images, aparece uma peça gráfica desenhada — nunca um quadrado quebrado.
 */
export default function PhotoFrame({
  src,
  fallback,
  alt,
  className = "",
  caption,
  ratio = "3/4",
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <figure className={className}>
      <div
        className={`relative overflow-hidden rounded-2xl border border-bone/12 bg-gradient-to-br from-[#1a1a1f] via-[#0a0a0d] to-[#050506] ${RATIO[ratio]}`}
      >
        {/* camada 1: fundo gráfico */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #f2efe9 1px, transparent 1px), linear-gradient(to bottom, #f2efe9 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden
        />

        {/* camada 2: capa desenhada */}
        {fallback && !loaded && (
          <img src={fallback} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        )}

        {/* camada 3: foto de verdade */}
        {!failed && (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* camada 4: tratamento de cor para combinar com o resto da página */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-0 mix-blend-soft-light bg-haze/10" aria-hidden />
      </div>

      {caption && (
        <figcaption className="mt-4 text-[10px] tracking-[0.3em] text-mute uppercase">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
