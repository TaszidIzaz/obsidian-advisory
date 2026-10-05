"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { initReveals } from "@/lib/reveals";
import { serviceDetails } from "@/content/services";
import Eyebrow from "@/components/ui/Eyebrow";
import DiamondList from "@/components/ui/DiamondList";
import s from "./ServiceDetails.module.css";

/**
 * One block per practice area, on the homepage services row geometry (tag at x=80, photo from
 * x=297, copy in the x=947 column) scaled up into a full detail view. The index counter on the
 * left stays pinned while its block scrolls.
 */
export default function ServiceDetails() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      initReveals(root.current!);
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(`.${s.photo}`).forEach((photo) => {
        gsap.fromTo(
          photo.querySelector(`.${s.drift}`),
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: photo, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.section} aria-label="Practice areas">
      {serviceDetails.map((svc, i) => (
        <article key={svc.id} id={svc.id} className={s.block}>
          <span className="rule" data-rule />
          <div className={s.body}>
            <div className={s.side}>
              <Eyebrow data-fade>{svc.tag}</Eyebrow>
              <span className={s.index} data-fade data-delay="0.1">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className={s.photo} data-clip>
              <div className={s.drift}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={svc.image} alt="" loading="lazy" />
              </div>
            </div>

            <div className={s.copy}>
              <h2 className={s.title} data-fade>
                {svc.title}
              </h2>
              <p className="body" data-fade data-delay="0.1">
                {svc.summary}
              </p>
              <div className={s.group} data-fade data-delay="0.2">
                <Eyebrow>What we cover</Eyebrow>
                <DiamondList items={svc.covers} />
              </div>
              <div className={s.group} data-fade data-delay="0.3">
                <Eyebrow>Best suited for</Eyebrow>
                <p className="body">{svc.for}</p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
