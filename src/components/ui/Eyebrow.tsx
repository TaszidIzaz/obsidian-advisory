import s from "./Eyebrow.module.css";

/** Small serif label preceded by the brand diamond (Figma "Frame 17"). */
export default function Eyebrow({
  children,
  className = "",
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={`${s.eyebrow} ${className}`} {...rest}>
      <Diamond />
      <span className={s.label}>{children}</span>
    </span>
  );
}

export function Diamond({ className = "" }: { className?: string }) {
  return (
    <span className={`${s.diamond} ${className}`} aria-hidden="true">
      <span className={s.diamondInner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/diamond.svg" alt="" />
      </span>
    </span>
  );
}
