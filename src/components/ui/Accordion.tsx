"use client";

import { useId, useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import s from "./Accordion.module.css";

type Item = { q: string; a: string };

/** Ruled question list; answers open with a height tween and the plus turns into a minus. */
export default function Accordion({ items }: { items: readonly Item[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>(`.${s.panel}`, root.current);
      panels.forEach((panel, i) => {
        const isOpen = i === open;
        gsap.to(panel, {
          height: isOpen ? "auto" : 0,
          duration: prefersReducedMotion() ? 0 : 0.8,
          ease: "expo.inOut",
          overwrite: true,
        });
      });
    },
    { scope: root, dependencies: [open] },
  );

  return (
    <div ref={root} className={s.accordion}>
      {items.map((item, i) => {
        const isOpen = i === open;
        return (
          <div key={item.q} className={s.item} data-open={isOpen || undefined} data-fade data-delay={i * 0.06}>
            <h3>
              <button
                type="button"
                className={s.trigger}
                aria-expanded={isOpen}
                aria-controls={`${uid}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className={s.question}>{item.q}</span>
                <span className={s.icon} aria-hidden="true" />
              </button>
            </h3>
            <div id={`${uid}-${i}`} className={s.panel} role="region" style={{ height: i === 0 ? "auto" : 0 }}>
              <p className={`${s.answer} body`}>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
