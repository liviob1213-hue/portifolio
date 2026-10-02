"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  start?: string;
  duration?: number;
};

/** Sobe e aparece quando entra na tela. */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 42,
  start = "top 88%",
  duration = 1.1,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [delay, y, start, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Move o elemento em velocidade diferente do scroll. */
export function Parallax({
  children,
  className = "",
  speed = 12,
  rotate = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** quanto maior, mais o elemento "atrasa" em relação ao scroll */
  speed?: number;
  rotate?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: speed, rotate },
        {
          yPercent: -speed,
          rotate: -rotate,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [speed, rotate]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Revela um bloco com clip-path, estilo cortina. */
export function ClipReveal({
  children,
  className = "",
  start = "top 85%",
}: {
  children: React.ReactNode;
  className?: string;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(0% 0% 100% 0%)", scale: 1.06 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start, once: true },
          // solta o recorte no fim: com ele fixo, filhos que "flutuam" (o card da
          // foto, por exemplo) ficariam cortados na borda.
          onComplete: () => gsap.set(el, { clipPath: "none" }),
        },
      );
    }, el);
    return () => ctx.revert();
  }, [start]);

  return (
    <div ref={ref} className={className} style={{ willChange: "clip-path, transform" }}>
      {children}
    </div>
  );
}
