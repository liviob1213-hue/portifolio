"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Cursor customizado: ponto rápido + anel que atrasa.
 * Qualquer elemento com `data-cursor="PLAY"` faz o anel crescer e mostrar o texto.
 * Em telas de toque ele nem é montado.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;
    const labelText = label.querySelector("span");

    document.body.classList.add("has-custom-cursor");
    gsap.set([dot, ring, label], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
    const labelX = gsap.quickTo(label, "x", { duration: 0.5, ease: "power3" });
    const labelY = gsap.quickTo(label, "y", { duration: 0.5, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      labelX(e.clientX);
      labelY(e.clientY);
      gsap.to([dot, ring, label], { opacity: 1, duration: 0.3, overwrite: "auto" });
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      const text = target?.dataset.cursor ?? "";
      const isInteractive = text || (e.target as HTMLElement)?.closest?.("a, button, [role='button']");
      if (labelText && text) labelText.textContent = text;

      if (isInteractive) {
        gsap.to(ring, {
          scale: text ? 3.4 : 2.1,
          backgroundColor: text ? "rgba(212,255,79,0.94)" : "rgba(212,255,79,0.12)",
          borderColor: "rgba(212,255,79,0)",
          duration: 0.45,
          ease: "expo.out",
        });
        gsap.to(dot, { scale: text ? 0 : 0.5, duration: 0.35 });
        if (text) gsap.to(label, { opacity: 1, scale: 1, duration: 0.35, delay: 0.05 });
      } else {
        gsap.to(ring, {
          scale: 1,
          backgroundColor: "rgba(212,255,79,0)",
          borderColor: "rgba(242,239,233,0.45)",
          duration: 0.45,
          ease: "expo.out",
        });
        gsap.to(dot, { scale: 1, duration: 0.3 });
        gsap.to(label, { opacity: 0, scale: 0.6, duration: 0.2 });
      }
    };

    const onLeave = () => gsap.to([dot, ring, label], { opacity: 0, duration: 0.25 });
    const onDown = () => gsap.to(ring, { scale: 0.85, duration: 0.2 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.3 });

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] hidden md:block" aria-hidden>
      <div
        ref={ringRef}
        className="absolute top-0 left-0 h-9 w-9 rounded-full border border-bone/45 will-change-transform"
      />
      <div ref={dotRef} className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-acid" />
      <div
        ref={labelRef}
        className="absolute top-0 left-0 text-[10px] leading-none font-semibold tracking-[0.22em] text-ink opacity-0 will-change-transform"
      >
        <span>PLAY</span>
      </div>
    </div>
  );
}
