"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { initReveals } from "@/lib/reveals";
import { CONTACT_EMAIL, CONTACT_HREF } from "@/content/site";
import { areas, bookHero, bookSteps, formats, timeWindows } from "@/content/book";
import Eyebrow, { Diamond } from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import s from "./BookCall.module.css";

type Errors = Partial<Record<"name" | "email" | "consent" | "form", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Left: what to expect. Right: the request form on a white card over the grain surface. */
export default function BookCall() {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [firstName, setFirstName] = useState("");

  useGSAP(
    () => {
      initReveals(root.current!);
      if (prefersReducedMotion()) return;
      gsap.from(card.current, { y: 60, autoAlpha: 0, duration: 1.4, ease: "expo.out", delay: 0.3 });
    },
    { scope: root },
  );

  // Swap to the confirmation with a short cross-fade once the request is accepted.
  useGSAP(
    () => {
      if (status !== "sent" || prefersReducedMotion()) return;
      gsap.from(`.${s.confirm} > *`, { y: 24, autoAlpha: 0, duration: 1, ease: "power3.out", stagger: 0.08 });
    },
    { scope: root, dependencies: [status] },
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      organization: String(fd.get("organization") ?? "").trim(),
      role: String(fd.get("role") ?? "").trim(),
      area: fd.get("area"),
      format: fd.get("format"),
      time: fd.get("time"),
      message: String(fd.get("message") ?? "").trim(),
      consent: fd.get("consent") === "on",
    };

    const next: Errors = {};
    if (!payload.name) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(payload.email)) next.email = "Please enter a valid email address.";
    if (!payload.consent) next.consent = "Please confirm we may contact you.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = e.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setErrors(json.errors ?? { form: "Something went wrong. Please try again." });
        setStatus("idle");
        return;
      }
      setFirstName(payload.name.split(" ")[0]);
      setStatus("sent");
    } catch {
      setErrors({ form: `We couldn't send your request. Please email ${CONTACT_EMAIL} instead.` });
      setStatus("idle");
    }
  };

  const clear = (key: keyof Errors) => errors[key] && setErrors((e) => ({ ...e, [key]: undefined }));

  return (
    <section ref={root} className={`${s.section} surface-grain`} aria-labelledby="book-title">
      <div className={s.info}>
        <div className={s.head}>
          <Eyebrow data-fade>{bookHero.eyebrow}</Eyebrow>
          <h1 id="book-title" className="display" data-split>
            {bookHero.serif}
            <br />
            <span className="sans">{bookHero.sans}</span>
          </h1>
          <p className={`${s.intro} body`} data-fade data-delay="0.3">
            {bookHero.intro}
          </p>
        </div>

        <ol className={s.steps}>
          {bookSteps.map((step, i) => (
            <li key={step.index} className={s.step} data-fade data-delay={0.4 + i * 0.1}>
              <span className={s.stepIndex}>{step.index}</span>
              <div>
                <h2 className={s.stepTitle}>{step.title}</h2>
                <p className="body">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className={s.direct} data-fade data-delay="0.7">
          <span className="rule" />
          <p className="body">
            Prefer email? Write to{" "}
            <a href={CONTACT_HREF} className={s.mail}>
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>

      <div ref={card} className={s.card}>
        {status === "sent" ? (
          <div className={s.confirm} role="status">
            <Diamond className={s.confirmMark} />
            <h2 className="display">
              Thank you, <span className="sans">{firstName}.</span>
            </h2>
            <p className="body">
              Your request is with us. A senior advisor will reply within one business day to arrange a time that suits
              you.
            </p>
            <Button href="/insights" variant="sky">
              Read our Insights
            </Button>
          </div>
        ) : (
          <form className={s.form} onSubmit={onSubmit} noValidate>
            <div className={s.row}>
              <Field label="Full name" name="name" required autoComplete="name" error={errors.name} onInput={() => clear("name")} />
              <Field
                label="Email"
                name="email"
                type="email"
                required
                autoComplete="email"
                error={errors.email}
                onInput={() => clear("email")}
              />
            </div>
            <div className={s.row}>
              <Field label="Organization" name="organization" autoComplete="organization" />
              <Field label="Role" name="role" autoComplete="organization-title" />
            </div>

            <Choice legend="Area of interest" name="area" options={areas} />
            <div className={s.row}>
              <Choice legend="Preferred format" name="format" options={formats} />
              <Choice legend="Best time" name="time" options={timeWindows} />
            </div>

            <label className={s.field}>
              <span className={s.label}>A few words on the matter (optional)</span>
              <textarea name="message" rows={4} className={s.input} />
              <span className={s.line} aria-hidden="true" />
            </label>

            <label className={s.consent}>
              <input
                type="checkbox"
                name="consent"
                aria-invalid={!!errors.consent}
                aria-describedby="consent-error"
                onChange={() => clear("consent")}
              />
              <span className={s.box} aria-hidden="true" />
              <span>I agree to be contacted about this request. Everything shared is treated as confidential.</span>
            </label>
            <p id="consent-error" className={s.error} aria-live="polite">
              {errors.consent ?? ""}
            </p>

            {errors.form && (
              <p className={s.error} role="alert">
                {errors.form}
              </p>
            )}

            <div className={s.submit}>
              <Button type="submit" variant="navy" padX={20} disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Request a Consultation"}
              </Button>
              <span className={s.note}>Reply within one business day.</span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  error,
  onInput,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
  onInput?: () => void;
}) {
  const errId = `${name}-error`;
  return (
    <label className={s.field}>
      <span className={s.label}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className={s.input}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        onInput={onInput}
      />
      <span className={s.line} aria-hidden="true" />
      <span id={errId} className={s.error} aria-live="polite">
        {error ?? ""}
      </span>
    </label>
  );
}

function Choice({ legend, name, options }: { legend: string; name: string; options: readonly string[] }) {
  return (
    <fieldset className={s.choice}>
      <legend className={s.label}>{legend}</legend>
      <div className={s.chips}>
        {options.map((opt, i) => (
          <label key={opt} className={s.chip}>
            <input type="radio" name={name} value={opt} defaultChecked={i === 0} />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
