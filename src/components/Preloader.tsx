"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { site } from "@/data/site";

/**
 * Abertura: contador de 0 a 100, marca aparecendo e duas cortinas que
 * se abrem para revelar o hero. Avisa o resto da página via evento
 * `portfolio:ready` para as animações do hero começarem no tempo certo.
 */
/** Garante que a abertura só roda uma vez por sessão (o StrictMode remonta os efeitos). */
let alreadyPlayed = false;

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.style.overflow = "hidden";

    const finish = () => {
      document.body.style.overflow = "";
      setGone(true);
      (window as unknown as { __portfolioReady?: boolean }).__portfolioReady = true;
      window.dispatchEvent(new Event("portfolio:ready"));
    };

    if (reduce || alreadyPlayed) {
      finish();
      return;
    }
    alreadyPlayed = true;

    const counter = { value: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });

      tl.to(counter, {
        value: 100,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => {
          if (numberRef.current)
            numberRef.current.textContent = String(Math.round(counter.value)).padStart(3, "0");
        },
      })
        .to(barRef.current, { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0)
        .to(".pre-mark", { yPercent: 0, opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.06 }, 0.15)
        .to(".pre-fade", { opacity: 0, duration: 0.4, ease: "power2.in" }, "+=0.15")
        .to(".pre-curtain", { yPercent: -100, duration: 1.05, ease: "expo.inOut" })
        .to(".pre-curtain-b", { yPercent: 100, duration: 1.05, ease: "expo.inOut" }, "<")
        .set(root, { display: "none" });
    }, root);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden"
      role="status"
      aria-live="polite"
    >
      {/* cortinas */}
      <div className="pre-curtain absolute inset-x-0 top-0 h-1/2 bg-ink" />
      <div className="pre-curtain pre-curtain-b absolute inset-x-0 bottom-0 h-1/2 bg-ink" />

      <div className="pre-fade relative z-10 flex flex-1 flex-col justify-between p-6 sm:p-10">
        <div className="flex items-start justify-between">
          <span className="pre-mark translate-y-6 text-[10px] uppercase tracking-[0.45em] text-mute opacity-0">
            {site.role}
          </span>
          <span className="pre-mark translate-y-6 text-[10px] uppercase tracking-[0.45em] text-mute opacity-0">
            {site.location}
          </span>
        </div>

        <div className="flex flex-col items-center gap-4">
          <span className="pre-mark display translate-y-10 text-[18vw] leading-none opacity-0 sm:text-[10vw]">
            {site.brand}
          </span>
          <span ref={barRef} className="h-px w-[min(70vw,520px)] origin-left scale-x-0 bg-acid" />
        </div>

        <div className="flex items-end justify-between">
          <span className="pre-mark translate-y-6 text-[10px] uppercase tracking-[0.45em] text-mute opacity-0">
            carregando
          </span>
          <span
            ref={numberRef}
            className="display pre-mark translate-y-6 text-5xl tracking-tighter tabular-nums opacity-0 sm:text-7xl"
          >
            000
          </span>
        </div>
      </div>
    </div>
  );
}
