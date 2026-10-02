"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { site } from "@/data/site";
import SplitWords from "@/components/ui/SplitWords";
import Reveal, { Parallax } from "@/components/ui/Reveal";

/** Botão que "gruda" no cursor quando o mouse passa perto. */
function Magnetic({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(relX, relY);
      const radius = Math.max(rect.width, rect.height) * 0.9;
      const pull = dist < radius ? 1 : 0;
      xTo(relX * 0.32 * pull);
      yTo(relY * 0.32 * pull);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}

export default function Contact() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden border-b border-bone/10 px-5 py-24 sm:px-8 sm:py-36"
    >
      <Parallax speed={14} className="pointer-events-none absolute -bottom-52 -left-40 h-[40rem] w-[40rem]">
        <div className="glow h-full w-full bg-acid/12" />
      </Parallax>

      <div className="relative mx-auto flex max-w-[1600px] flex-col items-center text-center">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-acid" />
          <span className="text-[10px] tracking-[0.45em] text-acid uppercase">
            {site.contactLabel}
          </span>
        </div>

        <SplitWords
          text={site.contactTitle}
          as="h2"
          className="display mt-8 max-w-5xl text-[clamp(2rem,6vw,5.6rem)]"
        />

        <Reveal delay={0.12}>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-bone/70">
            {site.contactText}
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col items-center gap-8">
          <Magnetic>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              data-cursor="ABRIR"
              className="group relative flex items-center gap-4 rounded-full bg-acid px-9 py-5 text-ink transition-colors hover:bg-bone"
            >
              <span className="text-xs font-semibold tracking-[0.25em] uppercase">
                {site.contactCta}
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink/12">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 19L19 5M19 5H9M19 5v10" />
                </svg>
              </span>
            </a>
          </Magnetic>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
            <a
              href={`mailto:${site.email}`}
              className="text-sm tracking-[0.08em] text-bone/75 underline decoration-bone/25 underline-offset-[6px] transition-colors hover:text-acid hover:decoration-acid"
            >
              {site.email}
            </a>
            <span className="hidden h-4 w-px bg-bone/20 sm:block" />
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-sm tracking-[0.08em] text-bone/75 underline decoration-bone/25 underline-offset-[6px] transition-colors hover:text-acid hover:decoration-acid"
            >
              {site.instagramLabel}
            </a>
            <span className="hidden h-4 w-px bg-bone/20 sm:block" />
            <span className="text-sm tracking-[0.08em] text-bone/60">{site.whatsappLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
