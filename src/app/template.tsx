"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Re-mounts on every navigation: each page settles in with a short fade and lift. */
export default function Template({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(root.current, { autoAlpha: 0, y: 24, duration: 0.9, ease: "power3.out", clearProps: "all" });
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
