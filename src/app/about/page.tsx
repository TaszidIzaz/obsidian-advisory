import type { Metadata } from "next";
import PageHero from "@/components/PageHero/PageHero";
import Principles from "@/components/about/Principles";
import Process from "@/components/about/Process";
import FeatureStack from "@/components/FeatureStack/FeatureStack";
import QuoteBand from "@/components/QuoteBand/QuoteBand";
import Cta from "@/components/Cta/Cta";
import { aboutCta, aboutHero, aboutQuote, aboutStatements } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description: aboutHero.intro[0],
};

export default function AboutPage() {
  return (
    <>
      <PageHero {...aboutHero} />
      <Principles />
      <FeatureStack items={aboutStatements} />
      <Process />
      <QuoteBand {...aboutQuote} />
      <Cta {...aboutCta} indent={false} image="/images/feature-palace.webp" />
    </>
  );
}
