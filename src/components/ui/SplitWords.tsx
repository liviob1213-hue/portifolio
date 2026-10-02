"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  text: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  start?: string;
  /** 0 = sobe da máscara · 1 = roda em 3D */
  variant?: 0 | 1;
};

/**
 * Quebra o texto em palavras e revela cada uma saindo de trás de uma máscara,
 * conforme entra na viewport. Sem plugin externo: funciona em qualquer fonte.
 */
export default function SplitWords({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 0.055,
  start = "top 85%",
  variant = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.set(words, {
        yPercent: 115,
        opacity: 0,
        rotateX: variant === 1 ? -75 : 0,
        transformPerspective: 800,
        transformOrigin: "50% 100%",
      });

      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: variant === 1 ? 1.3 : 1.05,
        ease: "power4.out",
        stagger,
        delay,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, stagger, start, variant]);

  const parts = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {parts.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.14em] mb-[-0.14em] align-bottom">
            <span data-word className="inline-block will-change-transform">
              {word}
            </span>
          </span>
          {i < parts.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
