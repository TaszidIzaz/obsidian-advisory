"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { BOOK_HREF, nav } from "@/content/site";
import { Diamond } from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Logo from "./Logo";
import s from "./Header.module.css";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export default function Header() {
  const root = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const el = root.current!;

      // Intro: bar slides down, items settle in. Runs once — the header lives in the root layout.
      if (!prefersReducedMotion()) {
        // clearProps hands transform back to CSS so [data-hidden] can take over afterwards.
        gsap.from(el, { yPercent: -100, duration: 1.2, ease: "expo.out", delay: 0.1, clearProps: "transform" });
        gsap.from(el.querySelectorAll("[data-header-item]"), {
          y: -12,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.35,
        });
      }

      // Hide on scroll down, reveal on scroll up.
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const hide = self.direction === 1 && self.scroll() > 240;
          el.toggleAttribute("data-hidden", hide);
          el.toggleAttribute("data-scrolled", self.scroll() > 8);
        },
      });
    },
    { scope: root },
  );

  return (
    <header ref={root} className={s.header}>
      <Link href="/" className={s.logo} aria-label="Obsidian Advisory — home" data-header-item>
        <Logo />
      </Link>

      <nav className={s.nav} aria-label="Primary">
        {nav.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={s.link}
              data-active={active || undefined}
              aria-current={active ? "page" : undefined}
              data-header-item
            >
              <Diamond className={s.marker} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <Button href={BOOK_HREF} variant="navy" className={s.cta} data-header-item>
        Book a Call
      </Button>
    </header>
  );
}
