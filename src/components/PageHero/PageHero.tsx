"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { initReveals } from "@/lib/reveals";
import Eyebrow from "@/components/ui/Eyebrow";
import s from "./PageHero.module.css";

type Props = {
  eyebrow: string;
  serif: string;
  sans: string;
  intro: string | readonly string[];
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
};

/**
 * Inner-page hero, built from the homepage hero's parts: grain-on-mist surface, 48px two-run
 * headline at x=80, a ruled intro, and (optionally) a portrait image in the x=947 column.
 */
export default function PageHero({ eyebrow, serif, sans, intro, image, imageAlt = "", children }: Props) {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => initReveals(root.current!), { scope: root });
  const paragraphs = typeof intro === "string" ? [intro] : intro;

  return (
    <section ref={root} className={`${s.hero} ${image ? s.withImage : s.textOnly} surface-grain`}>
      <div className={s.head}>
        <Eyebrow data-fade>{eyebrow}</Eyebrow>
        <h1 className={`${s.title} display`} data-split>
          {serif}
          <span className="sans">{sans}</span>
        </h1>
      </div>

      <div className={s.intro}>
        <span className="rule" data-rule data-delay="0.3" />
        {paragraphs.map((p, i) => (
          <p key={i} className="body" data-fade data-delay={0.4 + i * 0.1}>
            {p}
          </p>
        ))}
        {children && (
          <div className={s.extra} data-fade data-delay="0.6">
            {children}
          </div>
        )}
      </div>

      {image && (
        <div className={s.media} data-clip data-delay="0.2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={imageAlt} fetchPriority="high" />
        </div>
      )}
    </section>
  );
}
