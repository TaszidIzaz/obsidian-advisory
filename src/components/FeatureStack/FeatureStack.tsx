"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { initReveals } from "@/lib/reveals";
import { features } from "@/content/site";
import Eyebrow from "@/components/ui/Eyebrow";
import s from "./FeatureStack.module.css";

/**
 * The three 600px statement panels. Each panel is sticky, so the next one slides up over it;
 * the covered panel sinks back and dims, and each image settles from a zoom into its exact
 * Figma framing as its panel reaches the top.
 */
type Item = {
  id: string;
  image: string;
  alt: string;
  eyebrow?: string;
  serif: string;
  sans: string;
  tone: "mist" | "white";
  width: number;
  breakAfterSerif?: boolean;
};

export default function FeatureStack({ items = features as readonly Item[] }: { items?: readonly Item[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      initReveals(root.current!);
      if (prefersReducedMotion()) return;

      const panels = gsap.utils.toArray<HTMLElement>(`.${s.panel}`);
      panels.forEach((panel, i) => {
        const img = panel.querySelector(`.${s.media} img`);
        gsap.fromTo(
          img,
          { scale: 1.2, yPercent: 6 },
          {
            scale: 1,
            yPercent: 0,
            ease: "none",
            scrollTrigger: { trigger: panel, start: "top bottom", end: "top top", scrub: true },
          },
        );

        const next = panels[i + 1];
        if (!next) return;
        const cover = { trigger: next, start: "top bottom", end: "top top", scrub: true };
        gsap.to(panel.querySelector(`.${s.inner}`), { scale: 0.94, yPercent: -4, ease: "none", scrollTrigger: cover });
        gsap.to(panel.querySelector(`.${s.shade}`), { opacity: 0.45, ease: "none", scrollTrigger: cover });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={s.stack}>
      {items.map((f, i) => (
        <section
          key={f.id}
          className={`${s.panel} ${f.tone === "mist" ? "surface-grain" : s.white}`}
          style={{ zIndex: i + 1 }}
          aria-label={`${f.serif}${f.sans}`}
        >
          <div className={`${s.inner} ${f.tone === "mist" ? "surface-grain" : s.white}`}>
            {f.eyebrow && (
              <Eyebrow className={s.eyebrow} data-fade>
                {f.eyebrow}
              </Eyebrow>
            )}

            <div className={s.media}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.image} alt={f.alt} width={1420} height={1200} loading="lazy" />
            </div>

            <div className={s.copy}>
              <span className="rule" data-rule />
              <h2 className="display display--tight" style={{ width: `${f.width}rem` }} data-split>
                {f.serif}
                {f.breakAfterSerif && <br />}
                <span className={`sans ${i === 0 ? s.ink : ""}`}>{f.sans}</span>
              </h2>
            </div>
          </div>
          <span className={s.shade} aria-hidden="true" />
        </section>
      ))}
    </div>
  );
}
