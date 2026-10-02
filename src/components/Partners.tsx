"use client";

import { site } from "@/data/site";
import SplitWords from "@/components/ui/SplitWords";
import Reveal from "@/components/ui/Reveal";

export default function Partners() {
  return (
    <section
      id="parcerias"
      className="relative border-b border-bone/10 px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-acid" />
            <span className="text-[10px] tracking-[0.45em] text-acid uppercase">
              {site.partnersLabel}
            </span>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SplitWords
              text={site.partnersTitle}
              as="h2"
              className="display text-[clamp(1.8rem,4.6vw,4.2rem)]"
            />
            <Reveal delay={0.1}>
              <p className="max-w-md text-sm leading-relaxed text-bone/65">
                {site.partnersIntro}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.partners.map((partner, i) => (
            <Reveal key={partner.name} delay={i * 0.08}>
              <a
                href={partner.href ?? "#contato"}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-bone/12 bg-ink-2/50 p-6 transition-colors duration-500 hover:border-acid/40"
              >
                <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-acid/0 blur-3xl transition-colors duration-700 group-hover:bg-acid/20" />

                <span className="display relative flex h-16 w-16 items-center justify-center rounded-xl border border-bone/15 text-2xl transition-colors duration-500 group-hover:border-acid/50 group-hover:text-acid">
                  {partner.monogram}
                </span>

                <div className="relative mt-10">
                  <h3 className="text-base font-medium tracking-tight">{partner.name}</h3>
                  {partner.role && (
                    <p className="mt-1 text-[10px] tracking-[0.28em] text-acid/80 uppercase">
                      {partner.role}
                    </p>
                  )}
                  {partner.note && (
                    <p className="mt-4 text-xs leading-relaxed text-bone/55">{partner.note}</p>
                  )}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
