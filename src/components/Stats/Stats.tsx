"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { initReveals } from "@/lib/reveals";
import { stats } from "@/content/site";
import Eyebrow from "@/components/ui/Eyebrow";
import s from "./Stats.module.css";

const rem = (px: number) => `${px / 10}rem`;

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      initReveals(root.current!);
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root.current);
      const once = (trigger: Element | string, start = "top 80%") => ({ trigger, start, once: true });

      // Column dividers grow up from the baseline, then the numbers count up.
      gsap.from(q(`.${s.divider}`), {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 1.6,
        ease: "expo.inOut",
        stagger: 0.12,
        scrollTrigger: once(q(`.${s.figures}`)[0], "top 85%"),
      });

      q("[data-count]").forEach((el: HTMLElement, i: number) => {
        const target = Number(el.dataset.count);
        const counter = { v: 0 };
        el.textContent = "0";
        gsap.to(counter, {
          v: target,
          duration: 2,
          ease: "power3.out",
          delay: 0.2 + i * 0.12,
          onUpdate: () => {
            el.textContent = String(Math.round(counter.v));
          },
          scrollTrigger: once(el, "top 88%"),
        });
      });

      // The band captions step down the staircase one by one.
      gsap.from(q(`.${s.caption}`), {
        y: 20,
        autoAlpha: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: once(q(`.${s.band}`)[0], "top 85%"),
      });
      gsap.from(q(`.${s.bandDivider}`), {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.4,
        ease: "expo.inOut",
        stagger: 0.1,
        scrollTrigger: once(q(`.${s.band}`)[0], "top 90%"),
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.stats} aria-labelledby="stats-title">
      <div className={s.top}>
        <div className={s.head}>
          <Eyebrow data-fade>Numbers to Display</Eyebrow>
          <h2 id="stats-title" className="display" data-split>
            We support founders, operators, and modern organizations navigating growth
          </h2>
        </div>

        <p className={`${s.aside} body`} data-fade data-delay="0.2">
          Built for Organizations Operating at Scale. international operations, and structural complexity with strategic
          clarity.
        </p>

        <span className={`${s.divider} ${s.dividerTall}`} style={{ left: rem(1035) }} aria-hidden="true" />
        <span className={s.divider} style={{ left: rem(386) }} aria-hidden="true" />
        <span className={s.divider} style={{ left: rem(709) }} aria-hidden="true" />

        <dl className={s.figures}>
          {stats.map((st) => (
            <div key={st.label} className={s.figure} style={{ left: rem(st.x) }}>
              <dt className={s.label}>{st.label}</dt>
              <dd className={s.value}>
                <span data-count={st.value}>{st.value}</span>
                {st.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={s.band}>
        {[386, 709, 1035].map((x) => (
          <span key={x} className={s.bandDivider} style={{ left: rem(x) }} aria-hidden="true" />
        ))}
        {stats.map((st) => (
          <p key={st.caption} className={s.caption} style={{ left: rem(st.x), top: rem(st.captionTop) }}>
            {st.caption}
          </p>
        ))}
      </div>
    </section>
  );
}
