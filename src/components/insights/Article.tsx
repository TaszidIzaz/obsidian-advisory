"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { initReveals } from "@/lib/reveals";
import { formatDate, type Insight } from "@/content/insights";
import Eyebrow from "@/components/ui/Eyebrow";
import s from "./Article.module.css";

export default function Article({ article, more }: { article: Insight; more: Insight[] }) {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      initReveals(root.current!);
      if (prefersReducedMotion()) return;
      // Hero image drifts slower than the page; a hairline tracks reading progress.
      gsap.fromTo(
        `.${s.hero} img`,
        { yPercent: -6 },
        { yPercent: 6, ease: "none", scrollTrigger: { trigger: `.${s.hero}`, start: "top bottom", end: "bottom top", scrub: true } },
      );
      gsap.fromTo(
        `.${s.progress}`,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: `.${s.content}`, start: "top 60%", end: "bottom 60%", scrub: true } },
      );
    },
    { scope: root },
  );

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — leave the label as is */
    }
  };

  return (
    <article ref={root} className={s.article}>
      <span className={s.progress} aria-hidden="true" />

      <header className={`${s.header} surface-grain`}>
        <Link href="/insights" className={s.back} data-fade>
          <span className={s.backArrow} aria-hidden="true" />
          All insights
        </Link>
        <div className={s.headMain}>
          <Eyebrow data-fade>{article.category}</Eyebrow>
          <h1 className={`${s.title} display`} data-split>
            {article.title}
          </h1>
        </div>
        <div className={s.meta} data-fade data-delay="0.3">
          <span className="rule" />
          <dl className={s.metaList}>
            <div>
              <dt>Published</dt>
              <dd>{formatDate(article.date)}</dd>
            </div>
            <div>
              <dt>Reading time</dt>
              <dd>{article.readTime}</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className={s.hero} data-clip>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.image} alt="" />
      </div>

      <div className={s.content}>
        <aside className={s.side}>
          <Eyebrow>Share</Eyebrow>
          <button type="button" className={s.share} onClick={copyLink}>
            {copied ? "Link copied" : "Copy link"}
          </button>
        </aside>
        <div className={s.body}>
          <p className={s.lede} data-fade>
            {article.excerpt}
          </p>
          {article.body.map((block, i) => (
            <section key={i} className={s.block} data-fade>
              {block.heading && <h2 className={s.subhead}>{block.heading}</h2>}
              <p>{block.text}</p>
            </section>
          ))}
        </div>
      </div>

      <section className={s.more} aria-labelledby="more-title">
        <div className={s.moreHead}>
          <span className="rule" data-rule />
          <h2 id="more-title" className={s.moreTitle} data-fade>
            More Insights
          </h2>
        </div>
        <div className={s.cards}>
          {more.map((a, i) => (
            <Link key={a.slug} href={`/insights/${a.slug}`} className={s.card} data-fade data-delay={i * 0.1}>
              <span className={s.cardMedia}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.image} alt="" loading="lazy" />
              </span>
              <span className={s.cardMeta}>
                <Eyebrow>{a.category}</Eyebrow>
                <span>{formatDate(a.date)}</span>
              </span>
              <span className={s.cardTitle}>{a.title}</span>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
