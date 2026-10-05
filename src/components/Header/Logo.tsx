import s from "./Logo.module.css";

/** Logo lockup (Figma "Logo" 3:90): exported mark + Season Serif / Sans Light wordmark. */
export default function Logo() {
  return (
    <span className={s.logo}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={s.mark} src="/images/logo-mark.svg" alt="" width={39} height={39} />
      <span className={s.word}>
        <span className={s.obsidian}>Obsidian</span>
        <span className={s.advisory}>Advisory</span>
      </span>
    </span>
  );
}
