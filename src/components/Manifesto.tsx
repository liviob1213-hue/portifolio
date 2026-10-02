"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { site } from "@/data/site";
import SplitWords from "@/components/ui/SplitWords";
import Reveal, { Parallax, ClipReveal } from "@/components/ui/Reveal";
import FlipPhotoCard from "@/components/ui/FlipPhotoCard";

/**
 * Manifesto: parágrafos que acendem palavra por palavra conforme a rolagem,
 * como num texto sendo sublinhado por uma luz.
 */
export default function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".manifesto-p").forEach((p) => {
        const words = p.querySelectorAll<HTMLElement>("[data-w]");
        gsap.set(words, { opacity: 0.14 });
        gsap.to(words, {
          opacity: 1,
          ease: "none",
          stagger: 0.6,
          scrollTrigger: {
            trigger: p,
            start: "top 78%",
            end: "bottom 45%",
            scrub: 0.8,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="sobre"
      ref={rootRef}
      className="relative overflow-hidden border-b border-bone/10 px-5 py-24 sm:px-8 sm:py-36"
    >
      {/* brilho de fundo */}
      <Parallax speed={18} className="pointer-events-none absolute -top-40 -right-40 h-[46rem] w-[46rem]">
        <div className="glow h-full w-full bg-haze/25" />
      </Parallax>

      <div className="relative mx-auto max-w-[1600px]">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-acid" />
          <span className="text-[10px] tracking-[0.45em] text-acid uppercase">
            {site.manifesto.label}
          </span>
        </div>

        <SplitWords
          text={site.manifesto.title}
          as="h2"
          className="mt-8 max-w-5xl text-[clamp(1.5rem,3.6vw,3.4rem)] leading-[1.06] font-medium tracking-[-0.03em]"
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div className="flex flex-col gap-7">
            {site.manifesto.paragraphs.map((text, i) => {
              const words = text.split(" ");
              return (
                <p
                  key={i}
                  className="manifesto-p max-w-2xl text-base leading-relaxed text-bone/85 sm:text-lg"
                >
                  {words.map((w, wi) => (
                    <span key={`${w}-${wi}`} data-w className="inline-block">
                      {w}
                      {wi < words.length - 1 ? "\u00A0" : ""}
                    </span>
                  ))}
                </p>
              );
            })}
          </div>

          <div className="flex flex-col justify-between gap-10">
            <ClipReveal>
              <FlipPhotoCard
                src={site.photo.portrait}
                fallback="/posters/retrato.svg"
                alt={`Retrato de ${site.name}`}
                caption={site.photo.caption}
                items={site.expertise}
                className="mx-auto w-full max-w-sm"
              />
            </ClipReveal>

            <Reveal>
              <figure className="relative border-l border-acid/40 pl-6">
                <blockquote className="font-serif text-2xl leading-snug italic sm:text-3xl">
                  “{site.manifesto.closing}”
                </blockquote>
                <figcaption className="mt-5 text-[10px] tracking-[0.35em] text-mute uppercase">
                  — {site.name}, {site.brand}
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.15}>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-bone/10 pt-8">
                <div>
                  <dt className="text-[10px] tracking-[0.3em] text-mute uppercase">Base</dt>
                  <dd className="mt-1.5 text-sm text-bone/90">{site.location}</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-[0.3em] text-mute uppercase">Foco</dt>
                  <dd className="mt-1.5 text-sm text-bone/90">B2B · sob medida</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-[0.3em] text-mute uppercase">Método</dt>
                  <dd className="mt-1.5 text-sm text-bone/90">IA como alavanca</dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-[0.3em] text-mute uppercase">Entrega</dt>
                  <dd className="mt-1.5 text-sm text-bone/90">Do cardápio à estrutura 360°</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
