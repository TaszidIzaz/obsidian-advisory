"use client";

import Link from "next/link";
import s from "./Button.module.css";

type Props = {
  children: string;
  variant?: "navy" | "sky";
  /** Horizontal padding in design px (Figma uses 16 and 20). */
  padX?: 16 | 20;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
} & Omit<React.HTMLAttributes<HTMLElement>, "onClick" | "children">;

/** Square-cornered CTA. On hover the label rolls up and a darker fill wipes in from below. */
export default function Button({
  children,
  variant = "sky",
  padX = 16,
  href,
  onClick,
  type = "button",
  disabled,
  className = "",
  ...rest
}: Props) {
  const cls = `${s.button} ${s[variant]} ${padX === 20 ? s.wide : ""} ${className}`;
  const inner = (
    <>
      <span className={s.fill} aria-hidden="true" />
      <span className={s.roll}>
        <span className={s.label}>{children}</span>
        <span className={s.label} aria-hidden="true">
          {children}
        </span>
      </span>
    </>
  );

  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={cls} onClick={onClick} {...rest}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled} {...rest}>
      {inner}
    </button>
  );
}
