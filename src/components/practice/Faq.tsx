"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { initReveals } from "@/lib/reveals";
import { faqs } from "@/content/services";
import Eyebrow from "@/components/ui/Eyebrow";
import Accordion from "@/components/ui/Accordion";
import s from "./Faq.module.css";

export default function Faq() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => initReveals(root.current!), { scope: root });

  return (
    <section ref={root} className={s.section} aria-labelledby="faq-title">
      <div className={s.head}>
        <Eyebrow data-fade>Questions</Eyebrow>
        <h2 id="faq-title" className="display" data-split>
          Answered
          <br />
          <span className="sans">Plainly</span>
        </h2>
      </div>
      <div className={s.list}>
        <Accordion items={faqs} />
      </div>
    </section>
  );
}
