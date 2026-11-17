import { Handshake, Layers, ListChecks, ShieldCheck, Compass, Workflow } from "lucide-react";

import PageHero from "../../components/PageHero";
import FAQSection from "../../components/FAQSection";
import CTASection from "../../components/CTASection";
import SectionHead from "../../ui/SectionHead";
import { pageMedia } from "../../config/media";

import { Block, Callout, CardGrid } from "./ServiceBlocks";
import ServiceShowcase from "./ServiceShowcase";
import { services } from "./servicesData";
import { engagementModels, overviewCapabilities, overviewFaqs, startingPoints } from "./servicesOverviewData";

import "./services.css";

const whyIcons = [Compass, Layers, Workflow, ListChecks, ShieldCheck, Handshake];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Capabilities that work together *around your priorities*"
        description="CyberX Soft provides five connected service areas spanning strategy, creative execution, engineering, security, data, and delivery capacity. Engage one specialist team or combine services through a coordinated program."
        breadcrumbs={[{ label: "Services" }]}
        action={{ label: "Discuss Your Requirements", path: "/contact" }}
        image={pageMedia.services}
        position="68% 50%"
      />

      <Block tone="light" lift className="showcases">
        <div className="showcase-list">
          {services.map((service, index) => (
            <ServiceShowcase key={service.id} service={service} reverse={index % 2 !== 0} />
          ))}
        </div>
      </Block>

      <Block tone="dark" aurora>
        <SectionHead
          label="Why CyberX Soft"
          title="Practical delivery, *clear responsibilities*"
          description="Different projects need different skills and ways of working. We help bring the relevant capabilities together around an agreed scope, responsibilities, and delivery approach."
        />
        <CardGrid items={overviewCapabilities} cols={3} icons={whyIcons} className="cards--spaced" />
      </Block>

      <Block tone="light">
        <SectionHead
          label="Ways to work with us"
          title="Choose an engagement model *that fits your requirements*"
          description="You can work with CyberX Soft on a defined project, add individual specialists, or bring in a coordinated delivery team. The arrangement depends on your goals, internal capacity, and delivery responsibilities."
        />
        <CardGrid items={engagementModels} cols={3} className="cards--spaced" />

        <Callout
          eyebrow="Staff augmentation"
          title="Need more delivery capacity?"
          description="Explore how dedicated specialists, remote teams, managed pods, and white-label delivery can support your existing team."
          label="Explore Staff Augmentation"
          to="/services/talent-augmentation-delivery-support"
        />

        <div className="starting">
          <SectionHead
            label="Finding the right fit"
            title="How to choose the right *starting point*"
            description="Different requirements call for different ways of working. These examples can help you identify where to begin."
          />
          <CardGrid items={startingPoints} cols={4} numbered={false} className="cards--spaced" />
        </div>
      </Block>

      <FAQSection items={overviewFaqs} lift id="faq" />

      <CTASection
        title="Start with *the outcome*"
        description="You do not need to define the technology or delivery model before contacting us. Share the business objective, current constraint, timeline, and available internal capacity; we will help structure the engagement."
        buttonLabel="Book a Consultation"
        buttonPath="/contact"
      />
    </>
  );
}
