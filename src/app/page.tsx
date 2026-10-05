import Hero from "@/components/Hero/Hero";
import Approach from "@/components/Approach/Approach";
import FeatureStack from "@/components/FeatureStack/FeatureStack";
import Services from "@/components/Services/Services";
import QuoteBand from "@/components/QuoteBand/QuoteBand";
import Stats from "@/components/Stats/Stats";
import Cta from "@/components/Cta/Cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Approach />
      <FeatureStack />
      <Services />
      <QuoteBand />
      <Stats />
      <Cta />
    </>
  );
}
