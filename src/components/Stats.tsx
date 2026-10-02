"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { site } from "@/data/site";

export default function Stats() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count ?? 0);
        const obj = { value: 0 };
        gsap.to(obj, {
          value: end,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.value));
          },
        });
      });

      gsap.from(".stat-item", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 85%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative border-b border-bone/10 bg-ink-2/40 px-5 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-acid" />
          <span className="text-[10px] tracking-[0.45em] text-acid uppercase">
            {site.statsLabel}
          </span>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {site.stats.map((stat) => (
            <div key={stat.label} className="stat-item flex flex-col gap-3">
              <span className="display flex items-baseline text-[clamp(2.4rem,6vw,5.4rem)] tracking-tighter">
                {stat.prefix && <span className="text-mute">{stat.prefix}</span>}
                <span data-count={stat.value} className="tabular-nums">
                  0
                </span>
                {stat.suffix && <span className="text-acid">{stat.suffix}</span>}
              </span>
              <span className="max-w-[16rem] text-xs leading-relaxed tracking-[0.12em] text-bone/55 uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
