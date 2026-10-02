"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registra os plugins no lado do cliente (registrar duas vezes é inofensivo).
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // ferramenta de depuração: no console você pode fazer ScrollTrigger.getAll()
  if (process.env.NODE_ENV !== "production") {
    (window as unknown as { ScrollTrigger?: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger;
    (window as unknown as { gsap?: typeof gsap }).gsap = gsap;
  }
}

gsap.defaults({ ease: "power3.out", duration: 1 });

export { gsap, ScrollTrigger };
