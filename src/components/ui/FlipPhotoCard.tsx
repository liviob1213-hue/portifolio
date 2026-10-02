"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { site } from "@/data/site";

type Props = {
  /** caminho da imagem em /public — ex: "/images/retrato.jpg" */
  src: string;
  /** capa desenhada mostrada enquanto a foto não existe */
  fallback?: string;
  alt: string;
  caption?: string;
  /** itens que aparecem nas costas do card */
  items: { id: string; title: string }[];
  className?: string;
};

/** Estilos de 3D inline (mais confiável que depender de utilitário de classe). */
const PERSPECTIVE: React.CSSProperties = { perspective: "1400px" };
const PRESERVE_3D: React.CSSProperties = {
  transformStyle: "preserve-3d",
  WebkitTransformStyle: "preserve-3d",
};
const FACE: React.CSSProperties = {
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};

/**
 * Card da foto: no mouse ele flutua e inclina acompanhando o cursor;
 * no clique ele gira 180° e mostra as especialidades nas costas.
 */
export default function FlipPhotoCard({
  src,
  fallback,
  alt,
  caption,
  items,
  className = "",
}: Props) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLButtonElement>(null);

  const [flipped, setFlipped] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [finePointer, setFinePointer] = useState(true);

  /** Card flutuante: sobe, inclina e ganha luz conforme o mouse se move. */
  useEffect(() => {
    const scene = sceneRef.current;
    const tilt = tiltRef.current;
    if (!scene || !tilt) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setFinePointer(fine);
    if (!fine || reduce) return;

    const glow = scene.querySelector<HTMLElement>("[data-glow]");
    const xTo = gsap.quickTo(tilt, "x", { duration: 0.7, ease: "power3" });
    const yTo = gsap.quickTo(tilt, "y", { duration: 0.7, ease: "power3" });
    const rotX = gsap.quickTo(tilt, "rotationX", { duration: 0.9, ease: "power3" });
    const rotY = gsap.quickTo(tilt, "rotationY", { duration: 0.9, ease: "power3" });
    // scaleX/scaleY separados: o GSAP não consegue resetar "scale" quando x, y e
    // rotações são animados em tweens distintos (e avisa no console).
    const scaleXTo = gsap.quickTo(tilt, "scaleX", { duration: 0.7, ease: "power3" });
    const scaleYTo = gsap.quickTo(tilt, "scaleY", { duration: 0.7, ease: "power3" });
    const glowTo = glow ? gsap.quickTo(glow, "opacity", { duration: 0.8, ease: "power3" }) : null;

    const onMove = (e: MouseEvent) => {
      const r = scene.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      xTo(px * 16);
      yTo(py * 16 - 12);
      rotX(-py * 15);
      rotY(px * 20);
      scaleXTo(1.03);
      scaleYTo(1.03);
      glowTo?.(1);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
      rotX(0);
      rotY(0);
      scaleXTo(1);
      scaleYTo(1);
      glowTo?.(0);
    };

    scene.addEventListener("mousemove", onMove, { passive: true });
    scene.addEventListener("mouseleave", onLeave);
    return () => {
      scene.removeEventListener("mousemove", onMove);
      scene.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const flip = () => {
    const card = cardRef.current;
    if (!card) return;
    const next = !flipped;
    setFlipped(next);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to(card, {
      rotationY: next ? 180 : 0,
      duration: reduce ? 0 : 1.05,
      ease: "power3.inOut",
    });
  };

  return (
    <figure className={className}>
      <div ref={sceneRef} style={PERSPECTIVE} className="relative">
        {/* luz que acende quando o card flutua */}
        <div
          data-glow
          aria-hidden
          className="glow pointer-events-none absolute -inset-8 bg-acid/25 opacity-0"
        />

        <div ref={tiltRef} style={PRESERVE_3D} className="relative will-change-transform">
          <button
            ref={cardRef}
            type="button"
            onClick={flip}
            aria-pressed={flipped}
            aria-label={
              flipped ? `Ver a foto de ${alt}` : `Ver as especialidades de ${site.name}`
            }
            data-cursor="VIRAR"
            style={PRESERVE_3D}
            className="group relative block aspect-[3/4] w-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-acid"
          >
            {/* ---------- FRENTE: a foto ---------- */}
            <div
              style={FACE}
              className="absolute inset-0 overflow-hidden rounded-2xl border border-bone/12 bg-gradient-to-br from-[#1a1a1f] via-[#0a0a0d] to-[#050506] [box-shadow:0_30px_80px_-30px_rgba(0,0,0,0.9)]"
            >
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #f2efe9 1px, transparent 1px), linear-gradient(to bottom, #f2efe9 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
                aria-hidden
              />

              {fallback && !loaded && (
                <img
                  src={fallback}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}

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

              <div
                className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-0 bg-haze/10 mix-blend-soft-light" aria-hidden />

              {/* etiqueta de instrução */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <span className="text-[10px] leading-relaxed tracking-[0.28em] text-bone/70 uppercase">
                  {finePointer ? site.photo.flipHint : "toque para ver as especialidades"}
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-bone/25 text-bone/80">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  >
                    <path d="M3 12a9 9 0 1 1 3 6.7" />
                    <path d="M3 19v-5h5" />
                  </svg>
                </span>
              </div>
            </div>

            {/* ---------- VERSO: especialidades ---------- */}
            <div
              style={{ ...FACE, transform: "rotateY(180deg)" }}
              className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-acid/35 bg-gradient-to-br from-[#101014] via-[#08080b] to-[#050506] p-5 text-left [box-shadow:0_30px_80px_-30px_rgba(0,0,0,0.9)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-20 -right-16 h-44 w-44 rounded-full bg-acid/12 blur-3xl"
              />

              <div className="relative flex items-center gap-3">
                <span className="h-px w-6 bg-acid" />
                <span className="text-[10px] tracking-[0.35em] text-acid uppercase">
                  {site.photo.flipBackTitle}
                </span>
              </div>

              <ol className="relative mt-5 flex flex-1 flex-col justify-between gap-2.5">
                {items.map((item, i) => (
                  <li key={item.id} className="flex items-baseline gap-3">
                    <span className="w-5 shrink-0 text-[10px] tabular-nums text-acid/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.8rem] leading-snug font-medium tracking-tight text-bone/90 sm:text-sm">
                      {item.title}
                    </span>
                  </li>
                ))}
              </ol>

              <span className="relative mt-4 border-t border-bone/10 pt-3 text-[9px] tracking-[0.3em] text-mute uppercase">
                {site.photo.flipBackHint}
              </span>
            </div>
          </button>
        </div>
      </div>

      {caption && (
        <figcaption className="mt-4 text-[10px] tracking-[0.3em] text-mute uppercase">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
