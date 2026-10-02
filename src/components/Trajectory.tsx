"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { site } from "@/data/site";

/**
 * Trajetória: a seção trava na tela e os capítulos deslizam na horizontal
 * conforme você rola para baixo. O ScrollTrigger cuida do pin + do arrasto.
 */
export default function Trajectory() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      // esta é a animação que "carrega" os painéis na horizontal
      const scrollTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(
        ".traj-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
          },
        },
      );

      // cada cartão acorda ao entrar pela direita (dentro da animação horizontal)
      gsap.utils.toArray<HTMLElement>(".traj-card").forEach((card) => {
        gsap.fromTo(
          card,
          { yPercent: 10, opacity: 0.15, scale: 0.96 },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: "left 95%",
              once: true,
            },
          },
        );
      });

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="trajetoria" className="relative border-b border-bone/10">
      <div ref={rootRef} className="relative h-[100svh] overflow-hidden">
        {/* fundo */}
        <div className="glow pointer-events-none absolute top-1/2 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 bg-haze/20" />

        <div className="relative flex h-full flex-col justify-between py-20 sm:py-24">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-5 sm:px-8">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-acid" />
              <span className="text-[10px] tracking-[0.45em] text-acid uppercase">
                {site.trajectoryLabel}
              </span>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="display text-[clamp(1.8rem,4.4vw,4rem)]">
                {site.trajectoryTitle}
              </h2>
              <span className="text-[10px] tracking-[0.3em] text-mute uppercase">
                arraste a rolagem para avançar →
              </span>
            </div>
          </div>

          {/* trilho horizontal */}
          <div className="flex-1 overflow-hidden">
            <div
              ref={trackRef}
              className="flex h-full items-center gap-5 px-5 will-change-transform sm:gap-8 sm:px-8"
            >
              {site.steps.map((step) => (
                <article
                  key={step.id}
                  className="traj-panel flex h-full w-[80vw] shrink-0 items-center sm:w-[52vw] lg:w-[34vw]"
                >
                  <div className="traj-card glass flex h-[62vh] max-h-[34rem] w-full flex-col justify-between rounded-2xl border border-bone/12 p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-[10px] tracking-[0.35em] text-acid uppercase">
                        {step.label}
                      </span>
                      <span className="font-serif text-sm text-mute italic">{step.meta}</span>
                    </div>

                    <h3 className="display mt-6 text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[0.95]">
                      {step.title}
                    </h3>

                    <p className="mt-5 max-w-md text-sm leading-relaxed text-bone/70">
                      {step.text}
                    </p>

                    <div className="hairline mt-8" />
                  </div>
                </article>
              ))}

              {/* painel final: convite a continuar */}
              <article className="traj-panel flex h-full w-[80vw] shrink-0 items-center sm:w-[42vw]">
                <div className="flex h-[62vh] max-h-[34rem] w-full flex-col justify-center gap-5 rounded-2xl border border-acid/30 bg-acid/5 p-8">
                  <span className="text-[10px] tracking-[0.35em] text-acid uppercase">
                    o próximo capítulo
                  </span>
                  <p className="display text-[clamp(1.6rem,3vw,2.6rem)] leading-[0.95]">
                    é o seu
                    <br />
                    projeto.
                  </p>
                  <p className="max-w-sm text-sm text-bone/70">
                    A parte de baixo da página mostra o que já está no ar.
                  </p>
                </div>
              </article>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8">
            <div className="h-px w-full bg-bone/12">
              <div className="traj-progress h-px origin-left bg-acid" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
