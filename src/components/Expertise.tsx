"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";
import SplitWords from "@/components/ui/SplitWords";
import Reveal from "@/components/ui/Reveal";

/**
 * Especialidades em acordeão: um item aberto por vez, com o texto entrando
 * suave. Usa Framer Motion para o layout e o conteúdo.
 */
export default function Expertise() {
  const [open, setOpen] = useState<string | null>(site.expertise[0]?.id ?? null);

  return (
    <section
      id="especialidades"
      className="relative border-b border-bone/10 px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* coluna esquerda, grudenta no desktop */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-acid" />
              <span className="text-[10px] tracking-[0.45em] text-acid uppercase">
                {site.expertiseLabel}
              </span>
            </div>

            <SplitWords
              text={site.expertiseTitle}
              as="h2"
              className="display mt-8 text-[clamp(2rem,5vw,4.6rem)]"
            />

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-bone/65">
                Não vendo pacote. Cada frente abaixo existe porque um cliente bateu numa parede
                específica — e a parede virou entrega.
              </p>
            </Reveal>

            <div className="mt-10 hidden gap-8 lg:flex">
              <div>
                <span className="display text-4xl">{site.expertise.length}</span>
                <p className="mt-1 text-[10px] tracking-[0.3em] text-mute uppercase">
                  frentes de entrega
                </p>
              </div>
              <div>
                <span className="display text-4xl">B2B</span>
                <p className="mt-1 text-[10px] tracking-[0.3em] text-mute uppercase">
                  público principal
                </p>
              </div>
            </div>
          </div>

          {/* acordeão */}
          <div className="flex flex-col">
            {site.expertise.map((item, i) => {
              const isOpen = open === item.id;
              return (
                <div key={item.id} className="border-b border-bone/12 first:border-t">
                  <button
                    onClick={() => setOpen(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-5 py-6 text-left sm:gap-8"
                  >
                    <span
                      className={`text-[11px] tracking-[0.3em] tabular-nums transition-colors ${
                        isOpen ? "text-acid" : "text-mute"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={`display flex-1 text-[clamp(1.25rem,2.8vw,2.3rem)] transition-colors duration-500 ${
                        isOpen ? "text-bone" : "text-bone/70 group-hover:text-bone"
                      }`}
                    >
                      {item.title}
                    </span>

                    <span className="relative h-4 w-4 shrink-0">
                      <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-bone/70" />
                      <motion.span
                        animate={{ rotate: isOpen ? 0 : 90, scaleX: isOpen ? 0 : 1 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-acid"
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-5 pb-8 sm:pl-[3.6rem]">
                          <p className="max-w-xl text-sm leading-relaxed text-bone/75">
                            {item.text}
                          </p>
                          <ul className="flex flex-wrap gap-x-6 gap-y-2">
                            {item.bullets.map((b) => (
                              <li
                                key={b}
                                className="flex items-center gap-2 text-[11px] tracking-[0.18em] text-bone/60 uppercase"
                              >
                                <span className="h-1 w-1 rounded-full bg-acid" />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
