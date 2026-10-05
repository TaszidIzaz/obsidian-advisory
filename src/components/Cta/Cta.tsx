"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { initReveals } from "@/lib/reveals";
import { BOOK_HREF } from "@/content/site";
import Button from "@/components/ui/Button";
import s from "./Cta.module.css";

type Props = {
  title?: string;
  text?: string;
  /** Figma indents the homepage heading and paragraph; other pages run them flush. */
  indent?: boolean;
  image?: string;
};

export default function Cta({
  title = "Advisory Built for Long-Term Confidence",
  text = "Whether navigating expansion, restructuring operations, or managing complex transitions, Obsidian Advisory provides strategic guidance designed for modern organizations.",
  indent = true,
  image = "/images/cta-justice.webp",
}: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      initReveals(root.current!);
      if (prefersReducedMotion()) return;
      // Image wipes in from the right edge, then settles from a slow zoom while scrolling.
      const media = root.current!.querySelector(`.${s.media}`);
      gsap.fromTo(
        media,
        { clipPath: "inset(0% 0% 0% 100%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.6,
          ease: "expo.inOut",
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        },
      );
      gsap.fromTo(
        `.${s.media} img`,
        { scale: 1.18 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className={`${s.cta} ${indent ? "" : s.flush}`} aria-labelledby="cta-title">
      <h2 id="cta-title" className={`${s.title} display`} data-split>
        {/* Inline spacer, not text-indent: SplitText wraps each line in a block, which would
            indent every line. */}
        {indent && <span className={s.indent} aria-hidden="true" />}
        {title}
      </h2>
      <p className={`${s.text} body`} data-fade data-delay="0.2">
        {text}
      </p>
      <div className={s.action} data-fade data-delay="0.35">
        <Button href={BOOK_HREF} variant="sky" padX={20}>
          Schedule a Consultation
        </Button>
      </div>
      <div className={s.media}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="Statue of Lady Justice holding scales" width={1420} height={1080} loading="lazy" />
      </div>
    </section>
  );
}
