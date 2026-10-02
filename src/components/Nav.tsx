"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { scrollToTarget } from "@/components/providers/SmoothScroll";
import { site } from "@/data/site";

const LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Trajetória", href: "#trajetoria" },
  { label: "Projetos", href: "#projetos" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Parcerias", href: "#parcerias" },
];

export default function Nav() {
  const barRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // entra depois do preloader
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    gsap.set(el, { y: -40, opacity: 0 });
    const show = () =>
      gsap.to(el, { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.15 });
    window.addEventListener("portfolio:ready", show, { once: true });
    return () => window.removeEventListener("portfolio:ready", show);
  }, []);

  // esconde ao descer, mostra ao subir
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 320);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // trava a rolagem do fundo enquanto o menu está aberto
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } })
      .__lenis;
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open]);

  // fecha no Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    scrollToTarget(href);
  };

  return (
    <>
      <header
        ref={barRef}
        className={`fixed inset-x-0 top-0 z-[80] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="glass border-b border-bone/10">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
            <button
              onClick={() => scrollToTarget("#top")}
              className="group flex items-center gap-3"
              aria-label="Voltar ao topo"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
              </span>
              <span className="display text-sm tracking-tight">{site.name}</span>
            </button>

            <nav className="hidden items-center gap-1 lg:flex">
              {LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  className="group relative px-3.5 py-2 text-[11px] tracking-[0.2em] text-bone/65 uppercase transition-colors hover:text-bone"
                >
                  {link.label}
                  <span className="absolute inset-x-3.5 bottom-1.5 h-px origin-left scale-x-0 bg-acid transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="hidden rounded-full border border-acid/40 bg-acid/10 px-4 py-2 text-[11px] tracking-[0.2em] text-acid uppercase transition-colors hover:bg-acid hover:text-ink sm:inline-block"
              >
                Fazer orçamento
              </a>
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Abrir menu"
                aria-expanded={open}
                className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-bone/15 lg:hidden"
              >
                <span
                  className={`h-px w-4 bg-bone transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
                />
                <span
                  className={`h-px w-4 bg-bone transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[79] flex flex-col justify-end bg-ink-2/98 px-6 pb-12 pt-28 lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {[...LINKS, { label: "Contato", href: "#contato" }].map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => go(link.href)}
                  className="display border-b border-bone/10 py-4 text-left text-4xl"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-8 rounded-full bg-acid py-4 text-center text-xs font-semibold tracking-[0.25em] text-ink uppercase"
            >
              Falar no WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
