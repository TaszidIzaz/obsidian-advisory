import type { Metadata } from "next";
import PageHero from "@/components/PageHero/PageHero";
import InsightsIndex from "@/components/insights/InsightsIndex";
import Newsletter from "@/components/insights/Newsletter";
import { insightsHero } from "@/content/insights";

export const metadata: Metadata = {
  title: "Insights",
  description: insightsHero.intro,
};

export default function InsightsPage() {
  return (
    <>
      <PageHero {...insightsHero} />
      <InsightsIndex />
      <Newsletter />
    </>
  );
}
