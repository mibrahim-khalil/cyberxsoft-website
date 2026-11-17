import FAQSection from "../../components/FAQSection";
import CTASection from "../../components/CTASection";

import HomeHero from "./HomeHero";
import NeedsSection from "./NeedsSection";
import CapabilitiesPanorama from "./CapabilitiesPanorama";
import CapacitySection from "./CapacitySection";
import TrustMarquee from "./TrustMarquee";
import WhyUs from "./WhyUs";
import ApproachJourney from "./ApproachJourney";
import EvidenceSection from "./EvidenceSection";
import ChapterRail from "./ChapterRail";

import { homeFaqs } from "./homeData";

import "./home.css";

function HomePage() {
  return (
    <>
      <ChapterRail />

      <HomeHero />
      <NeedsSection />
      <CapabilitiesPanorama />
      <CapacitySection />
      <TrustMarquee />
      <WhyUs />
      <ApproachJourney />
      <EvidenceSection />

      <FAQSection items={homeFaqs} lift id="faq" />

      <CTASection
        eyebrow="Start a conversation"
        title="Bring us the challenge *you need to solve*"
        description="Tell us what you are trying to improve, build, protect, or scale. We will help you define the right starting point and delivery approach."
        buttonLabel="Book a Consultation"
        buttonPath="/contact"
      />
    </>
  );
}

export default HomePage;
