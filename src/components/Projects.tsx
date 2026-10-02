"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { site } from "@/data/site";
import VideoFrame from "@/components/ui/VideoFrame";
import SplitWords from "@/components/ui/SplitWords";
import { ClipReveal, Parallax } from "@/components/ui/Reveal";
import { useIsDesktop } from "@/lib/useMediaQuery";

const TONES = ["acid", "haze", "ember"] as const;

/**
 * Projetos:
 *  1. showreel em tela cheia (clip reveal + parallax)
 *  2. lista interativa: no desktop um player flutuante segue o cursor e dá
 *     play no vídeo; no celular a linha abre com o vídeo dentro dela.
 */
export default function Projects() {
  const rootRef = useRef<HTMLElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    const float = floatRef.current;
    if (!float) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    gsap.set(float, { opacity: 0, scale: 0.85, xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(float, "x", { duration: 0.7, ease: "power3" });
    const yTo = gsap.quickTo(float, "y", { duration: 0.7, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX + 40);
      yTo(e.clientY - 20);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const float = floatRef.current;
    if (!float) return;
    gsap.to(float, {
      opacity: active === null ? 0 : 1,
      scale: active === null ? 0.85 : 1,
      duration: 0.5,
      ease: "expo.out",
    });
  }, [active]);

  // no celular o toque abre/fecha o projeto (e o vídeo)
  const onRowClick = (e: React.MouseEvent, i: number) => {
    if (isDesktop) return;
    e.preventDefault();
    setActive((prev) => (prev === i ? null : i));
  };

  const current = active === null ? null : site.projects[active];

  return (
    <section id="projetos" ref={rootRef} className="relative border-b border-bone/10">
      {/* ---------- showreel ---------- */}
      <div className="relative px-5 pt-20 sm:px-8 sm:pt-28">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-acid" />
            <span className="text-[10px] tracking-[0.45em] text-acid uppercase">
              {site.projectsLabel}
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SplitWords
              text={site.projectsTitle}
              as="h2"
              className="display text-[clamp(2rem,5.6vw,5.2rem)]"
            />
            <p className="max-w-md text-sm leading-relaxed text-bone/65">{site.projectsIntro}</p>
          </div>
        </div>

        <ClipReveal className="mt-12">
          <div className="relative mx-auto aspect-[16/9] max-w-[1600px] overflow-hidden rounded-2xl border border-bone/12">
            <Parallax speed={5} className="absolute inset-0 -top-[6%] h-[112%]">
              <VideoFrame
                src="/videos/showreel.mp4"
                poster="/posters/showreel.svg"
                autoPlay
                label="Showreel"
                sublabel="vídeo principal"
                tone="acid"
              />
            </Parallax>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink to-transparent p-5 sm:p-8">
              <span className="display text-xl sm:text-3xl">tudo começou com uma dor</span>
              <span className="hidden text-[10px] tracking-[0.35em] text-bone/70 uppercase sm:block">
                // troque por /public/videos/showreel.mp4
              </span>
            </div>
          </div>
        </ClipReveal>
      </div>

      {/* ---------- lista interativa ---------- */}
      <div className="mx-auto mt-16 max-w-[1600px] px-5 pb-20 sm:mt-24 sm:px-8 sm:pb-28">
        <ul className="border-t border-bone/12">
          {site.projects.map((project, i) => {
            const isOpen = active === i;
            const href = project.href ?? "#contato";

            return (
              <li key={project.id} className="border-b border-bone/12">
                <div
                  className="group relative block"
                  onMouseEnter={isDesktop ? () => setActive(i) : undefined}
                  onMouseLeave={isDesktop ? () => setActive(null) : undefined}
                  onClick={(e) => onRowClick(e, i)}
                >
                  {/* link esticado: cobre a linha inteira e mantém o HTML válido */}
                  <a
                    href={href}
                    aria-label={`${project.title} — ${project.category}`}
                    data-cursor={isDesktop ? "PLAY" : undefined}
                    className="absolute inset-0 z-10"
                  />

                  <div
                    className={`flex flex-col gap-4 py-6 transition-opacity duration-500 sm:flex-row sm:items-center sm:gap-8 sm:py-8 ${
                      active !== null && active !== i ? "sm:opacity-35" : "opacity-100"
                    }`}
                  >
                    <span
                      className={`w-12 shrink-0 text-[11px] tracking-[0.3em] tabular-nums transition-colors duration-500 ${
                        isOpen ? "text-acid" : "text-mute"
                      }`}
                    >
                      {project.index}
                    </span>

                    <span className="flex flex-1 items-center gap-4 overflow-hidden">
                      <span
                        className={`display text-[clamp(1.5rem,4vw,3.4rem)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isOpen ? "translate-x-3 sm:translate-x-6" : "translate-x-0"
                        }`}
                      >
                        {project.title}
                      </span>
                    </span>

                    <span className="flex shrink-0 items-center gap-5">
                      <span className="text-[10px] tracking-[0.3em] text-bone/55 uppercase">
                        {project.category}
                      </span>
                      <span className="font-serif text-sm text-mute italic">{project.year}</span>
                    </span>
                  </div>

                  {/* detalhe abre quando a linha está ativa */}
                  <div
                    className="grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-4 pb-8 sm:pl-20">
                        <p className="max-w-2xl text-sm leading-relaxed text-bone/75">
                          {project.summary}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-bone/15 px-3 py-1.5 text-[10px] tracking-[0.2em] text-bone/70 uppercase"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* no celular o vídeo entra na própria linha, montado só quando abre */}
                        {!isDesktop && isOpen && (
                          <div className="relative z-20 mt-2 flex flex-col gap-4">
                            <div className="aspect-video w-full overflow-hidden rounded-xl border border-bone/12">
                              <VideoFrame
                                src={project.video}
                                poster={project.poster}
                                label={project.index}
                                playing
                                tone={TONES[i % TONES.length]}
                              />
                            </div>

                            <a
                              href={href}
                              className="w-fit rounded-full border border-acid/50 px-5 py-2.5 text-[10px] tracking-[0.25em] text-acid uppercase"
                            >
                              quero algo assim →
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ---------- player flutuante (desktop) ---------- */}
      <div
        ref={floatRef}
        className={`pointer-events-none fixed top-0 left-0 z-[70] w-[26rem] ${
          isDesktop ? "block" : "hidden"
        }`}
        aria-hidden
      >
        <div className="aspect-video overflow-hidden rounded-xl border border-bone/15 shadow-2xl shadow-black/60">
          {isDesktop && current && (
            <VideoFrame
              key={current.id}
              src={current.video}
              poster={current.poster}
              label={current.index}
              playing
              tone={TONES[(active ?? 0) % TONES.length]}
            />
          )}
        </div>
      </div>
    </section>
  );
}
