import type { Metadata } from "next";
import PageHero from "@/components/PageHero/PageHero";
import ServiceDetails from "@/components/practice/ServiceDetails";
import EngagementModels from "@/components/practice/EngagementModels";
import Faq from "@/components/practice/Faq";
import Cta from "@/components/Cta/Cta";
import { servicesCta, servicesHero } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description: servicesHero.intro,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero {...servicesHero} />
      <ServiceDetails />
      <EngagementModels />
      <Faq />
      <Cta {...servicesCta} indent={false} image="/images/feature-rotunda.webp" />
    </>
  );
}
