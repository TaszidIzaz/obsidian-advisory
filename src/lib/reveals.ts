"use client";

import { gsap, SplitText, prefersReducedMotion } from "./gsap";

const EASE = "expo.out";

/**
 * Wires the shared scroll reveals for everything inside `scope`. Call it from a section's useGSAP
 * so the tweens are reverted with the section.
 *
 * data-split     headline lines rise out of a mask
 * data-fade      fade + lift
 * data-rule      hairline draws left → right
 * data-clip      image wipes up while its inner <img> settles from a zoom
 * data-delay     optional stagger offset (seconds) for any of the above
 */
export function initReveals(scope: Element) {
  if (prefersReducedMotion()) return;
  const q = gsap.utils.selector(scope);
  const delayOf = (el: Element) => Number((el as HTMLElement).dataset.delay ?? 0);
  const trigger = (el: Element, start = "top 88%") => ({ trigger: el, start, once: true });

  q("[data-split]").forEach((el: Element) => {
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.3,
          ease: EASE,
          stagger: 0.1,
          delay: delayOf(el),
          scrollTrigger: trigger(el),
        }),
    });
  });

  q("[data-fade]").forEach((el: Element) => {
    gsap.from(el, {
      y: 24,
      autoAlpha: 0,
      duration: 1.1,
      ease: "power3.out",
      delay: delayOf(el),
      scrollTrigger: trigger(el, "top 92%"),
    });
  });

  q("[data-rule]").forEach((el: Element) => {
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.6,
      ease: "expo.inOut",
      delay: delayOf(el),
      scrollTrigger: trigger(el, "top 92%"),
    });
  });

  q("[data-clip]").forEach((el: Element) => {
    const img = el.querySelector("img");
    const tl = gsap.timeline({ delay: delayOf(el), scrollTrigger: trigger(el, "top 85%") });
    tl.fromTo(
      el,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" },
    );
    // clearProps returns the transform to CSS so hover zooms keep working afterwards.
    if (img) tl.from(img, { scale: 1.25, duration: 1.8, ease: EASE, clearProps: "transform" }, 0.1);
  });
}
