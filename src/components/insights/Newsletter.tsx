"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@/lib/gsap";
import { initReveals } from "@/lib/reveals";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import s from "./Newsletter.module.css";

/**
 * Sky band sign-up. There is no mailing-list provider yet, so a valid address only flips the
 * band into its confirmation state — connect the submit handler to the provider before launch.
 */
export default function Newsletter() {
  const root = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  useGSAP(() => initReveals(root.current!), { scope: root });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setState(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "done" : "error");
  };

  return (
    <section ref={root} className={s.band} aria-labelledby="newsletter-title">
      <div className={s.copy}>
        <Eyebrow data-fade>Quarterly Briefing</Eyebrow>
        <h2 id="newsletter-title" className="display" data-split>
          Considered Notes,
          <br />
          <span className="sans">Four Times a Year</span>
        </h2>
      </div>

      {state === "done" ? (
        <p className={s.done} role="status">
          Thank you. The next briefing will arrive in your inbox.
        </p>
      ) : (
        <form className={s.form} onSubmit={submit} noValidate data-fade data-delay="0.2">
          <label htmlFor="newsletter-email" className={s.label}>
            Email address
          </label>
          <div className={s.field}>
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder="name@organization.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state === "error") setState("idle");
              }}
              aria-invalid={state === "error"}
              aria-describedby="newsletter-error"
            />
            <Button type="submit" variant="navy">
              Subscribe
            </Button>
          </div>
          <p id="newsletter-error" className={s.error} aria-live="polite">
            {state === "error" ? "Please enter a valid email address." : ""}
          </p>
        </form>
      )}
    </section>
  );
}
