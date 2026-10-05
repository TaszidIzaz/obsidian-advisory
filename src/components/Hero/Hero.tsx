"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { BOOK_HREF } from "@/content/site";
import Button from "@/components/ui/Button";
import s from "./Hero.module.css";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      const q = gsap.utils.selector(el);
      gsap.set(q("[data-hero]"), { visibility: "visible" });
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({ delay: 0.3, defaults: { ease: "expo.out" } });

      // Statue rises out of a bottom-anchored mask.
      tl.fromTo(
        q(`.${s.statue}`),
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "expo.inOut" },
        0,
      ).from(q(`.${s.statue} img`), { yPercent: 18, scale: 1.08, duration: 2.2 }, 0.1);

      SplitText.create(q(`.${s.title}`)[0], {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => gsap.from(self.lines, { yPercent: 110, duration: 1.4, ease: "expo.out", stagger: 0.12, delay: 0.75 }),
      });

      tl.from(q(`.${s.aside} [data-rule]`), { scaleX: 0, transformOrigin: "left", duration: 1.6, ease: "expo.inOut" }, 0.7)
        .from(q(`.${s.aside} p, .${s.trust}`), { y: 20, autoAlpha: 0, duration: 1.2, stagger: 0.1 }, 1.1)
        .from(q(`.${s.aside} a`), { y: 16, autoAlpha: 0, duration: 1.1 }, 1.3);

      // Scroll: the statue drifts up slower than the page.
      gsap.to(q(`.${s.statue} img`), {
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });

      // Pointer: subtle depth on the statue.
      const xTo = gsap.quickTo(q(`.${s.float}`), "x", { duration: 1.2, ease: "power3.out" });
      const yTo = gsap.quickTo(q(`.${s.float}`), "y", { duration: 1.2, ease: "power3.out" });
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo(((e.clientX - r.left) / r.width - 0.5) * 18);
        yTo(((e.clientY - r.top) / r.height - 0.5) * 12);
      };
      el.addEventListener("pointermove", onMove);
      return () => el.removeEventListener("pointermove", onMove);
    },
    { scope: root },
  );

  return (
    <section ref={root} id="home" className={`${s.hero} surface-grain`}>
      <h1 className={`${s.title} display`} data-hero>
        Your Required Strategic Advisory <span className="sans">for</span>{" "}
        <span className="sans">Complex Decisions</span>
      </h1>

      <div className={s.statue} data-hero>
        <div className={s.float}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-justice.webp"
            alt="Blindfolded statue of Lady Justice raising her scales"
            width={826}
            height={924}
            fetchPriority="high"
          />
        </div>
      </div>

      <p className={s.trust} data-hero>
        Trusted by modern <em>businesses</em>, <em>founders</em>, and growth-focused <em>teams</em>.
      </p>

      <div className={s.aside} data-hero>
        <div className={s.intro}>
          <span className="rule" data-rule />
          <p className="body">
            Obsidian Advisory partners with founders, enterprises, and international clients navigating legal,
            operational, and structural complexity with clarity and precision.
          </p>
        </div>
        <Button href={BOOK_HREF} variant="sky">
          Schedule a Consultation
        </Button>
      </div>
    </section>
  );
}
