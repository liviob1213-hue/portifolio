"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { site } from "@/data/site";
import SplitWords from "@/components/ui/SplitWords";

/**
 * Método: os cartões grudam no topo e o próximo passa por cima,
 * encolhendo o anterior — efeito de baralho.
 */
export default function Process() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".proc-card");

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.93,
          opacity: 0.3,
          filter: "blur(3px)",
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top 18%",
            scrub: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative border-b border-bone/10 px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-acid" />
              <span className="text-[10px] tracking-[0.45em] text-acid uppercase">
                {site.processLabel}
              </span>
            </div>
            <SplitWords
              text={site.processTitle}
              as="h2"
              className="display mt-6 text-[clamp(1.8rem,4.6vw,4.2rem)]"
            />
          </div>
          <span className="text-[10px] tracking-[0.3em] text-mute uppercase">
            do diagnóstico ao aprimoramento
          </span>
        </div>

        <div className="relative mt-16">
          {site.process.map((step, i) => (
            <div
              key={step.id}
              className="sticky mb-6"
              style={{ top: `calc(6rem + ${i * 1.5}rem)`, zIndex: i + 1 }}
            >
              <article
                className="proc-card glass flex flex-col gap-6 rounded-2xl border border-bone/12 p-7 will-change-transform sm:p-10"
                style={{ transformOrigin: "50% 0%" }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[10px] tracking-[0.35em] text-acid uppercase">
                    {step.label}
                  </span>
                  <span className="font-serif text-sm text-mute italic">{step.meta}</span>
                </div>

                <h3 className="display text-[clamp(1.6rem,4vw,3.4rem)] leading-[0.95]">
                  {step.title}
                </h3>

                <p className="max-w-2xl text-sm leading-relaxed text-bone/70">{step.text}</p>

                <div className="hairline" />

                <span className="display text-right text-[clamp(3rem,10vw,8rem)] leading-none text-bone/8">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
