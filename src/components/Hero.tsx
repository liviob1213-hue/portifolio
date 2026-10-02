"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { site } from "@/data/site";
import VideoFrame from "@/components/ui/VideoFrame";
import Marquee from "@/components/ui/Marquee";
import { scrollToTarget } from "@/components/providers/SmoothScroll";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // a timeline da entrada nasce pausada e só toca quando o preloader sai
    let entrance: ReturnType<typeof gsap.timeline> | undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, paused: true });
      entrance = tl;

      tl.set(".hero-line span[data-inner]", { yPercent: 120 })

        .from(".hero-kicker", { y: 24, opacity: 0, duration: 1 }, 0)
        .to(
          ".hero-line span[data-inner]",
          { yPercent: 0, duration: 1.5, stagger: 0.12 },
          0.05,
        )
        .from(".hero-side", { x: 30, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.5)
        .from(".hero-bottom > *", { y: 26, opacity: 0, duration: 1, stagger: 0.1 }, 0.65)
        .fromTo(
          ".hero-scroll-bar",
          { scaleY: 0 },
          { scaleY: 1, duration: 1.4, ease: "power2.inOut", repeat: -1, transformOrigin: "top" },
          0.8,
        );

      // o hero sobe e escurece conforme a rolagem avança
      gsap.to(".hero-inner", {
        yPercent: -14,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 },
      });

      // o vídeo de fundo dá um zoom lento
      gsap.fromTo(
        mediaRef.current,
        { scale: 1.12 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1 },
        },
      );
    }, root);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyReady =
      (window as unknown as { __portfolioReady?: boolean }).__portfolioReady === true;

    const play = () => entrance?.play();

    if (reduce) entrance?.progress(1).pause();
    else if (alreadyReady) play();
    else window.addEventListener("portfolio:ready", play, { once: true });

    return () => {
      window.removeEventListener("portfolio:ready", play);
      ctx.revert();
    };
  }, []);

  const { lines } = site.hero;

  return (
    <section id="top" ref={rootRef} className="relative min-h-[100svh] overflow-hidden">
      {/* mídia de fundo */}
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        <VideoFrame
          src="/videos/hero.mp4"
          poster="/posters/hero.svg"
          autoPlay
          label=""
          sublabel="showreel"
          tone="haze"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/60 to-ink" aria-hidden />

      {/* conteúdo */}
      <div className="hero-inner relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-between px-5 pt-28 pb-6 sm:px-8 sm:pb-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <span className="hero-kicker text-[10px] tracking-[0.45em] text-acid uppercase">
            {site.hero.kicker}
          </span>
          <div className="hero-side hidden max-w-xs border-l border-bone/20 pl-5 lg:block">
            <p className="text-xs leading-relaxed text-bone/60">{site.role}</p>
          </div>
        </div>

        <div className="py-8">
          <h1 className="display text-[clamp(2.1rem,7.6vw,7.6rem)]">
            {lines.map((line, i) => (
              <span key={line} className="hero-line line-mask">
                <span
                  data-inner
                  className={
                    i === 2
                      ? "stroke-text block"
                      : i === lines.length - 1
                        ? "block font-serif text-[0.92em] normal-case italic tracking-[-0.02em]"
                        : "block"
                  }
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <div className="hero-bottom flex flex-col gap-7">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-bone/70 sm:text-base">
              {site.hero.sub}
            </p>

            <button
              onClick={() => scrollToTarget("#projetos")}
              data-cursor="VER"
              className="group flex shrink-0 items-center gap-3 self-start text-[11px] tracking-[0.28em] text-bone uppercase sm:self-auto"
            >
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-bone/25 transition-colors group-hover:border-acid">
                <span className="h-3.5 w-px bg-bone transition-transform duration-500 group-hover:translate-y-1 group-hover:bg-acid" />
              </span>
              {site.hero.scrollHint}
            </button>
          </div>

          <div className="hero-avail flex items-center gap-4">
            <span className="relative h-10 w-px overflow-hidden bg-bone/15">
              <span className="hero-scroll-bar absolute inset-0 origin-top bg-acid" />
            </span>
            <span className="text-[10px] tracking-[0.35em] text-bone/40 uppercase">
              {site.location} · disponível para novos projetos
            </span>
          </div>
        </div>
      </div>

      {/* faixa inferior */}
      <div className="relative z-10 border-y border-bone/10 bg-ink/70 py-4 backdrop-blur">
        <Marquee
          items={site.marquee}
          duration={30}
          itemClassName="display text-lg tracking-tight text-bone/85 sm:text-2xl"
        />
      </div>
    </section>
  );
}
