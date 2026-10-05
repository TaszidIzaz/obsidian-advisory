"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { initReveals } from "@/lib/reveals";
import { process } from "@/content/about";
import SectionHead from "@/components/ui/SectionHead";
import Eyebrow from "@/components/ui/Eyebrow";
import s from "./Process.module.css";

/** Engagement steps as ruled rows — the homepage services list without photos. */
export default function Process() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => initReveals(root.current!), { scope: root });

  return (
    <section ref={root} className={s.section} aria-labelledby="process-title">
      <SectionHead id="process-title" {...process} />
      <ol className={s.list}>
        {process.steps.map((step) => (
          <li key={step.title} className={s.row}>
            <span className="rule rule--soft" data-rule />
            <div className={`${s.body} grid4`}>
              <Eyebrow className={s.tag} data-fade>
                {step.tag}
              </Eyebrow>
              <h3 className={s.name} data-fade data-delay="0.1">
                {step.title}
              </h3>
              <p className={`${s.text} body`} data-fade data-delay="0.2">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
