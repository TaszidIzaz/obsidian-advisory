"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { initReveals } from "@/lib/reveals";
import Eyebrow from "@/components/ui/Eyebrow";
import s from "./Approach.module.css";

export default function Approach() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      initReveals(root.current!);
      if (prefersReducedMotion()) return;

      // Columns rise one after another, then drift with scroll.
      const cols = root.current!.querySelector(`.${s.columns} img`);
      gsap.fromTo(
        cols,
        { yPercent: 12 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true },
        },
      );
      // The second heading line slides in from the left to its 217px indent.
      gsap.from(`.${s.lineTwo}`, {
        x: -60,
        autoAlpha: 0,
        duration: 1.6,
        ease: "expo.out",
        delay: 0.2,
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.approach} aria-labelledby="approach-title">
      <Eyebrow className={s.eyebrow} data-fade>
        Our Approach
      </Eyebrow>

      <h2 id="approach-title" className={`${s.heading} display`}>
        <span className={s.lineOne} data-split>
          Built Around Precision,
        </span>
        <span className={`${s.lineTwo} sans`}>Not&nbsp; Just Volume</span>
      </h2>

      <div className={s.columns} data-clip>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/approach-columns.webp" alt="Three classical Corinthian columns" width={942} height={762} loading="lazy" />
      </div>

      <div className={s.textA}>
        <span className="rule" data-rule />
        <p className="body" data-fade data-delay="0.2">
          We operate with a focused advisory model designed for organizations that require strategic thinking,
          responsive counsel, and long-term alignment.
        </p>
      </div>

      <p className={`${s.textB} body`} data-fade data-delay="0.35">
        Every engagement is approached with discretion, clarity, and a deep understanding of risk, growth, and
        international operations.
      </p>
    </section>
  );
}
