"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { initReveals } from "@/lib/reveals";
import { services } from "@/content/site";
import Eyebrow from "@/components/ui/Eyebrow";
import s from "./Services.module.css";

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      initReveals(root.current!);
      if (prefersReducedMotion()) return;

      // Gentle in-frame parallax on each photo once it has been revealed.
      gsap.utils.toArray<HTMLElement>(`.${s.photo}`).forEach((photo) => {
        gsap.fromTo(
          photo.querySelector(`.${s.drift}`),
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: { trigger: photo, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="services" className={s.services} aria-labelledby="services-title">
      <div className={s.head}>
        <h2 id="services-title" className={`${s.title} display`} data-split>
          Strategic Advisory Across
          <br />
          <span className="sans">Modern Complexity</span>
        </h2>
        <p className={`${s.lede} body`} data-fade data-delay="0.2">
          Our advisory model is designed for organizations and individuals operating within evolving legal,
          operational, and international environments.
        </p>
      </div>

      <ol className={s.list}>
        {services.map((item) => (
          <li key={item.title} className={s.row}>
            <span className="rule rule--soft" data-rule />
            <div className={s.body}>
              <Eyebrow className={s.tag} data-fade>
                {item.tag}
              </Eyebrow>
              <div className={s.photo} data-clip>
                <div className={s.drift}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt="" width={824} height={478} loading="lazy" />
                </div>
              </div>
              <div className={s.copy}>
                <h3 className={s.name} data-fade data-delay="0.1">
                  {item.title}
                </h3>
                <p className="body" data-fade data-delay="0.2">
                  {item.body}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
