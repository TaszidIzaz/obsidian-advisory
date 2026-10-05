"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { initReveals } from "@/lib/reveals";
import { engagementModels } from "@/content/services";
import Eyebrow from "@/components/ui/Eyebrow";
import s from "./EngagementModels.module.css";

/** Sky band from the homepage stats (#b3cfdd, white column dividers) carrying the three models. */
export default function EngagementModels() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      initReveals(root.current!);
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root.current);
      const st = { trigger: root.current, start: "top 75%", once: true };
      gsap.from(q(`.${s.card}`), { y: 40, autoAlpha: 0, duration: 1.2, ease: "power3.out", stagger: 0.12, scrollTrigger: st });
      gsap.from(q(`.${s.divider}`), { scaleY: 0, transformOrigin: "top", duration: 1.4, ease: "expo.inOut", stagger: 0.1, scrollTrigger: st });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.band} aria-labelledby="models-title">
      {[386, 709, 1035].map((x) => (
        <span key={x} className={s.divider} style={{ left: `${x / 10}rem` }} aria-hidden="true" />
      ))}
      <div className={`${s.inner} grid4`}>
        <div className={s.head}>
          <Eyebrow data-fade>{engagementModels.eyebrow}</Eyebrow>
          <h2 id="models-title" className={`${s.title} display`} data-split>
            {engagementModels.serif}
            <span className="sans">{engagementModels.sans}</span>
          </h2>
        </div>
        {engagementModels.items.map((m) => (
          <article key={m.title} className={s.card}>
            <span className={s.term}>{m.term}</span>
            <h3 className={s.name}>{m.title}</h3>
            <p className={s.text}>{m.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
