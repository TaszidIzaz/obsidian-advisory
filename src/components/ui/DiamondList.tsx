import { Diamond } from "./Eyebrow";
import s from "./DiamondList.module.css";

/** Bullet list using the brand diamond as the marker. */
export default function DiamondList({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`${s.list} ${className}`}>
      {items.map((item) => (
        <li key={item} className={s.item}>
          <Diamond className={s.marker} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
