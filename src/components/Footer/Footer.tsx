"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { initReveals } from "@/lib/reveals";
import Link from "next/link";
import { CONTACT_EMAIL, CONTACT_HREF, footerNav } from "@/content/site";
import s from "./Footer.module.css";

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      initReveals(root.current!);
      if (prefersReducedMotion()) return;
      const st = { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true };
      // The emblem turns into place and the column rises as the footer arrives.
      gsap.fromTo(`.${s.emblem}`, { rotate: -120, scale: 0.8 }, { rotate: 0, scale: 1, ease: "none", scrollTrigger: st });
      gsap.fromTo(`.${s.column}`, { yPercent: 35 }, { yPercent: 0, ease: "none", scrollTrigger: st });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className={s.footer}>
      <div className={s.top}>
        <p className={s.wordmark} data-fade>
          <span className="serif">Obsidian</span>
          <span className={s.light}>Advisory</span>
        </p>
        <p className={s.about} data-fade data-delay="0.1">
          Obsidian Advisory provides strategic advisory for modern organizations navigating complexity, growth, and
          international operations.
        </p>
        <span className={`${s.ruleTop} rule rule--soft`} data-rule />
      </div>

      <div className={s.contact} data-fade>
        <h2 className={s.heading}>Contact</h2>
        <a href={CONTACT_HREF} className={s.link}>
          {CONTACT_EMAIL}
        </a>
      </div>

      <div className={s.navCol} data-fade data-delay="0.1">
        <h2 className={s.heading}>Navigation</h2>
        <ul className={s.navList}>
          {footerNav.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className={s.link}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className={s.tagline} data-fade>
        Confidential <span className={s.accent}>Inquiries.</span> Global <span className={s.accent}>Engagements.</span>
      </p>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={s.emblem} src="/images/logo-mark-footer.svg" alt="" width={305} height={305} loading="lazy" />

      <span className={`${s.ruleBottom} rule rule--soft`} data-rule />

      <p className={s.copyright}>© 2026 Obsidian Advisory. All rights reserved.</p>
      <a href="#" className={`${s.legal} ${s.legalA}`}>
        Privacy Policy
      </a>
      <a href="#" className={`${s.legal} ${s.legalB}`}>
        Privacy Policy
      </a>

      <div className={s.column}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/footer-column.webp" alt="" width={710} height={800} loading="lazy" />
      </div>
    </footer>
  );
}
