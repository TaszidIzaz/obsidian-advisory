"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { initReveals } from "@/lib/reveals";
import s from "./QuoteBand.module.css";

/** Figma "Frame 35" — the monuments slide in from either edge as the band crosses the viewport. */
type Props = { serif?: string; sans?: string };

export default function QuoteBand({ serif = "Precision is often invisible ", sans = "until it matters." }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      initReveals(root.current!);
      if (prefersReducedMotion()) return;

      const st = { trigger: root.current, start: "top bottom", end: "center center", scrub: 1 };
      gsap.fromTo(`.${s.liberty}`, { xPercent: -28, yPercent: 10 }, { xPercent: 0, yPercent: 0, ease: "none", scrollTrigger: st });
      gsap.fromTo(`.${s.capitol}`, { xPercent: 28, yPercent: 10 }, { xPercent: 0, yPercent: 0, ease: "none", scrollTrigger: st });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.band} aria-label={`${serif}${sans}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={s.liberty} src="/images/quote-liberty.webp" alt="" width={778} height={1168} loading="lazy" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={s.capitol} src="/images/quote-capitol.webp" alt="" width={986} height={1182} loading="lazy" />
      <p className={`${s.quote} display display--tight`} data-split>
        {serif}
        <span className="sans">{sans}</span>
      </p>
    </section>
  );
}
