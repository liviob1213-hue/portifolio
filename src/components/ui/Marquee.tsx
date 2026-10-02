"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  items: string[];
  /** duração de um ciclo completo — menor = mais rápido */
  duration?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
  separator?: string;
  pauseOnHover?: boolean;
};

/**
 * Faixa infinita. O conteúdo é duplicado e o GSAP anima xPercent até -50,
 * o que faz o loop ser perfeitamente contínuo (sem salto).
 */
export default function Marquee({
  items,
  duration = 26,
  reverse = false,
  className = "",
  itemClassName = "",
  separator = "/",
  pauseOnHover = true,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        track,
        { xPercent: reverse ? -50 : 0 },
        {
          xPercent: reverse ? 0 : -50,
          duration,
          ease: "none",
          repeat: -1,
        },
      );

      if (pauseOnHover) {
        const slow = () => gsap.to(tween, { timeScale: 0.15, duration: 0.5 });
        const normal = () => gsap.to(tween, { timeScale: 1, duration: 0.5 });
        track.addEventListener("mouseenter", slow);
        track.addEventListener("mouseleave", normal);
        return () => {
          track.removeEventListener("mouseenter", slow);
          track.removeEventListener("mouseleave", normal);
        };
      }
      return undefined;
    }, track);

    return () => ctx.revert();
  }, [duration, reverse, pauseOnHover]);

  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={`${key}-${i}`} className={`flex shrink-0 items-center ${itemClassName}`}>
          {item}
          <span className="mx-6 inline-block text-acid/70 sm:mx-10">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`edge-fade w-full overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
