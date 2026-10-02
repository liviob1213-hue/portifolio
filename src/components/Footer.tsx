"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import Marquee from "@/components/ui/Marquee";
import { scrollToTarget } from "@/components/providers/SmoothScroll";

/** Só aparece o que estiver preenchido em `src/data/site.ts`. */
const SOCIALS = [
  { label: "Instagram", href: site.instagram },
  { label: "LinkedIn", href: site.linkedin },
  { label: "GitHub", href: site.github },
].filter((social) => Boolean(social.href));

export default function Footer() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className="relative overflow-hidden pt-16 sm:pt-20">
      {/* marca gigante em faixa, com o último traço vazado */}
      <Marquee
        items={[site.brand, "DISPONÍVEL PARA PROJETOS"]}
        duration={30}
        itemClassName="display text-[clamp(2.5rem,9vw,8rem)] text-bone/12"
        separator="—"
      />

      <div className="mx-auto mt-14 grid max-w-[1600px] gap-10 px-5 pb-12 sm:px-8 lg:grid-cols-4">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <span className="display text-2xl">{site.name}</span>
          <p className="max-w-sm text-sm leading-relaxed text-bone/55">
            {site.role}. {site.footerNote}
          </p>
          <button
            onClick={() => scrollToTarget("#top")}
            className="mt-2 w-fit text-[10px] tracking-[0.3em] text-acid uppercase transition-opacity hover:opacity-60"
          >
            ↑ voltar ao topo
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[10px] tracking-[0.35em] text-mute uppercase">Navegar</span>
          {[
            { label: "Sobre", href: "#sobre" },
            { label: "Trajetória", href: "#trajetoria" },
            { label: "Projetos", href: "#projetos" },
            { label: "Especialidades", href: "#especialidades" },
            { label: "Parcerias", href: "#parcerias" },
          ].map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToTarget(link.href)}
              className="w-fit text-sm text-bone/70 transition-colors hover:text-acid"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[10px] tracking-[0.35em] text-mute uppercase">Onde me achar</span>
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="w-fit text-sm text-bone/70 transition-colors hover:text-acid"
            >
              {social.label}
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="w-fit text-sm text-bone/70 transition-colors hover:text-acid"
          >
            {site.email}
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="w-fit text-sm text-bone/70 transition-colors hover:text-acid"
          >
            {site.whatsappLabel}
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 border-t border-bone/10 px-5 py-6 text-[10px] tracking-[0.25em] text-mute uppercase sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span>
          © {new Date().getFullYear()} {site.name} — todos os direitos reservados
        </span>
        <span className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-acid" />
          {site.location} · {time || "--:--:--"}
        </span>
      </div>
    </footer>
  );
}
