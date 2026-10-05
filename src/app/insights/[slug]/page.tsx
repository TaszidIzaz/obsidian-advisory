import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Article from "@/components/insights/Article";
import Cta from "@/components/Cta/Cta";
import { getInsight, insights } from "@/content/insights";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const article = getInsight((await params).slug);
  return article ? { title: article.title, description: article.excerpt } : {};
}

export default async function ArticlePage({ params }: Params) {
  const article = getInsight((await params).slug);
  if (!article) notFound();

  const related = insights.filter((a) => a.slug !== article.slug && a.category === article.category);
  const more = [...related, ...insights.filter((a) => a.slug !== article.slug && !related.includes(a))].slice(0, 2);

  return (
    <>
      <Article article={article} more={more} />
      <Cta
        title="Discuss This With an Advisor"
        text="If this note touches a decision in front of you, we would be glad to talk it through in confidence."
        indent={false}
      />
    </>
  );
}
