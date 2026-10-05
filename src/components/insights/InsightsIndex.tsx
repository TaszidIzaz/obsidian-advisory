"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, Flip, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { initReveals } from "@/lib/reveals";
import { categories, formatDate, insights, type Category } from "@/content/insights";
import Eyebrow from "@/components/ui/Eyebrow";
import s from "./InsightsIndex.module.css";

type Filter = (typeof categories)[number];

/**
 * Featured article + filterable editorial list. Filtering is animated with GSAP Flip; on
 * hover-capable devices a preview of the article image follows the cursor over the list.
 */
export default function InsightsIndex() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const [featured, ...rest] = insights;
  const visible = rest.filter((a) => filter === "All" || a.category === (filter as Category));

  useGSAP(
    () => {
      initReveals(root.current!);
      if (prefersReducedMotion() || !window.matchMedia("(hover: hover)").matches) return;

      // Cursor-follow preview over the list.
      const el = preview.current!;
      gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 });
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
      const onMove = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };
      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: root },
  );

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to(preview.current, {
        autoAlpha: hovered ? 1 : 0,
        scale: hovered ? 1 : 0.6,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      });
    },
    { dependencies: [hovered] },
  );

  // Flip: capture row positions before the filter changes, animate from them after render.
  const changeFilter = (next: Filter) => {
    if (next === filter) return;
    if (list.current && !prefersReducedMotion()) {
      flipState.current = Flip.getState(list.current.querySelectorAll("[data-row]"));
    }
    setFilter(next);
  };

  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state || !list.current) return;
    flipState.current = null;
    Flip.from(state, {
      targets: list.current.querySelectorAll("[data-row]"),
      duration: 0.8,
      ease: "expo.inOut",
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7, delay: 0.25 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, duration: 0.3 }),
    });
  }, [filter]);

  const hoveredImage = insights.find((a) => a.slug === hovered)?.image ?? featured.image;

  return (
    <section ref={root} className={s.section} aria-label="Articles">
      {/* Featured */}
      <article className={s.featured}>
        <Link href={`/insights/${featured.slug}`} className={s.featuredMedia} data-clip aria-hidden="true" tabIndex={-1}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={featured.image} alt="" />
        </Link>
        <div className={s.featuredCopy}>
          <div className={s.meta} data-fade>
            <Eyebrow>Featured · {featured.category}</Eyebrow>
            <span className={s.date}>{formatDate(featured.date)}</span>
          </div>
          <h2 className={s.featuredTitle} data-fade data-delay="0.1">
            <Link href={`/insights/${featured.slug}`}>{featured.title}</Link>
          </h2>
          <p className="body" data-fade data-delay="0.2">
            {featured.excerpt}
          </p>
          <Link href={`/insights/${featured.slug}`} className={s.more} data-fade data-delay="0.3">
            <span>Read article</span>
            <span className={s.arrow} aria-hidden="true" />
          </Link>
        </div>
      </article>

      {/* Filters */}
      <div className={s.toolbar} data-fade>
        <h2 className={s.listTitle}>All Insights</h2>
        <div className={s.filters} role="group" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={s.chip}
              aria-pressed={filter === c}
              onClick={() => changeFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <ol ref={list} className={s.list} onPointerLeave={() => setHovered(null)}>
        {visible.map((a) => (
          <li
            key={a.slug}
            className={s.row}
            data-row
            data-flip-id={a.slug}
            onPointerEnter={() => setHovered(a.slug)}
          >
            <Link href={`/insights/${a.slug}`} className={`${s.rowLink} grid4`}>
              <span className={s.rowDate}>{formatDate(a.date)}</span>
              <span className={s.rowTitle}>{a.title}</span>
              <span className={s.rowMeta}>
                <Eyebrow>{a.category}</Eyebrow>
                <span className={s.read}>{a.readTime}</span>
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={s.rowThumb} src={a.image} alt="" loading="lazy" />
            </Link>
          </li>
        ))}
        {visible.length === 0 && <li className={s.empty}>No articles in this category yet.</li>}
      </ol>

      <div ref={preview} className={s.preview} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={hoveredImage} alt="" />
      </div>
    </section>
  );
}
