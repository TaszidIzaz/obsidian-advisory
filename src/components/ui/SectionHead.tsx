import Eyebrow from "./Eyebrow";
import s from "./SectionHead.module.css";

type Props = {
  id?: string;
  eyebrow: string;
  serif: string;
  sans: string;
  aside?: string;
  /** Put the sans run on its own line (as the homepage services heading does). */
  breakLines?: boolean;
  className?: string;
};

/**
 * The recurring section opener: diamond eyebrow, 48px headline at x=80 and an optional grey
 * paragraph in the x=947 column (homepage "Strategic Advisory Across Modern Complexity").
 * Reveal attributes are picked up by the parent section's initReveals().
 */
export default function SectionHead({ id, eyebrow, serif, sans, aside, breakLines = true, className = "" }: Props) {
  return (
    <div className={`${s.head} ${className}`}>
      <div className={s.left}>
        <Eyebrow data-fade>{eyebrow}</Eyebrow>
        <h2 id={id} className={`${s.title} display`} data-split>
          {serif}
          {breakLines && <br />}
          <span className="sans">{sans}</span>
        </h2>
      </div>
      {aside && (
        <p className={`${s.aside} body`} data-fade data-delay="0.2">
          {aside}
        </p>
      )}
    </div>
  );
}
