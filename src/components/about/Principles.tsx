"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { initReveals } from "@/lib/reveals";
import { principles } from "@/content/about";
import SectionHead from "@/components/ui/SectionHead";
import s from "./Principles.module.css";

/** Four principles on the homepage stats grid: columns at 80/405/730/1055 with ruled dividers. */
export default function Principles() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      initReveals(root.current!);
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root.current);
      const trigger = { trigger: q(`.${s.grid}`)[0], start: "top 80%", once: true };
      gsap.from(q(`.${s.col}`), { "--divider": 0, duration: 1.6, ease: "expo.inOut", stagger: 0.12, scrollTrigger: trigger });
      gsap.from(q(`.${s.col} > *`), {
        y: 24,
        autoAlpha: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.06,
        delay: 0.3,
        scrollTrigger: trigger,
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.section} aria-labelledby="principles-title">
      <SectionHead id="principles-title" {...principles} />
      <ol className={`${s.grid} grid4`}>
        {principles.items.map((p) => (
          <li key={p.index} className={s.col}>
            <span className={s.index}>{p.index}</span>
            <h3 className={s.name}>{p.title}</h3>
            <p className="body">{p.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
