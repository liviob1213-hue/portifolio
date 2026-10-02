"use client";

import { site } from "@/data/site";
import Marquee from "@/components/ui/Marquee";
import SplitWords from "@/components/ui/SplitWords";
import Reveal from "@/components/ui/Reveal";

/**
 * Stack de IA: duas faixas grandes correndo em direções opostas.
 * IA como alavanca, não como produto.
 */
export default function AIStack() {
  const half = Math.ceil(site.aiTools.length / 2);
  const first = site.aiTools.slice(0, half);
  const second = site.aiTools.slice(half);

  return (
    <section className="relative overflow-hidden border-b border-bone/10 bg-ink-2/40 py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-acid" />
          <span className="text-[10px] tracking-[0.45em] text-acid uppercase">{site.aiLabel}</span>
        </div>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SplitWords
            text={site.aiTitle}
            as="h2"
            className="display max-w-3xl text-[clamp(1.8rem,4.4vw,4rem)]"
          />
          <Reveal delay={0.1}>
            <p className="max-w-md text-sm leading-relaxed text-bone/65">{site.aiIntro}</p>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 border-y border-bone/10 py-8">
        <Marquee
          items={first}
          duration={32}
          itemClassName="display text-[clamp(2rem,7vw,6rem)] text-bone/90"
          separator="·"
        />
      </div>
      <div className="border-b border-bone/10 py-8">
        <Marquee
          items={second}
          duration={36}
          reverse
          itemClassName="display stroke-text-acid text-[clamp(2rem,7vw,6rem)]"
          separator="·"
        />
      </div>

      <div className="mx-auto mt-10 flex max-w-[1600px] flex-wrap gap-x-10 gap-y-3 px-5 sm:px-8">
        {["Velocidade", "Testes em paralelo", "Padrão de entrega", "Menos retrabalho"].map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-bone/55 uppercase"
          >
            <span className="h-1 w-1 rounded-full bg-acid" />
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
