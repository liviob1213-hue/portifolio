"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Scroll suave (Lenis) sincronizado com o GSAP ScrollTrigger.
 * Isso é o que faz os efeitos de rolagem parecerem "manteiga".
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // deixa acessível para âncoras do menu
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    ScrollTrigger.refresh();

    // depois que o preloader sai, as medidas da página já estão corretas
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("portfolio:ready", refresh);
    window.addEventListener("resize", refresh);

    // e de novo quando as fontes terminam de carregar (as alturas mudam)
    if (document.fonts?.ready) document.fonts.ready.then(refresh).catch(() => {});

    // se o preloader já tinha terminado antes deste efeito montar
    if ((window as unknown as { __portfolioReady?: boolean }).__portfolioReady) refresh();

    return () => {
      window.removeEventListener("portfolio:ready", refresh);
      window.removeEventListener("resize", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}

/** Rola suavemente até um elemento (usado pelos links do menu). */
export function scrollToTarget(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) lenis.scrollTo(el as HTMLElement, { duration: 1.5, offset: 0 });
  else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
}
