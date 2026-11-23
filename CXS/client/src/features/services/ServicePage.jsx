import { ClipboardCheck, Handshake, SearchCheck, Settings2, UserRound, UsersRound } from "lucide-react";

import PageHero from "../../components/PageHero";
import SectionNav from "../../components/SectionNav";
import FAQSection from "../../components/FAQSection";
import CTASection from "../../components/CTASection";
import SectionHead from "../../ui/SectionHead";
import { serviceMedia } from "../../config/media";

import { Band, Block, Callout, CardGrid, CheckChips, Overview, Rows, SplitLayout, Timeline } from "./ServiceBlocks";
import { serviceContent } from "./serviceContent";

import "./services.css";

const engagementIcons = [SearchCheck, ClipboardCheck, UserRound, UsersRound, Settings2, Handshake];

/* Each service has its own separate gallery page */
const galleryPaths = {
  "creative-media-design-animation": "/gallery",
  "brand-strategy-digital-growth": "/gallery/brand-strategy",
  "ai-software-digital-solutions": "/gallery/ai-software",
  "data-cybersecurity-digital-governance": "/gallery/data-cybersecurity",
};

/* One template, four services — copy lives in serviceContent.js */
export default function ServicePage({ slug }) {
  const content = serviceContent[slug];
  const media = serviceMedia[slug];
  const { data } = content;

  const galleryPath = galleryPaths[slug];

  return (
    <>
      <PageHero
        eyebrow={content.name}
        title={content.hero.title}
        description={content.hero.description}
        breadcrumbs={[{ label: "Services", path: "/services" }, { label: content.name }]}
        action={{ label: "Book a Consultation", path: "/contact" }}
        secondaryAction={{ label: "All services", path: "/services" }}
        tertiaryAction={galleryPath ? { label: "View Gallery", path: galleryPath } : null}
        image={media.hero}
        position={media.position}
      />

      <SectionNav />

      <Overview
        id="overview"
        title={content.overview.title}
        paragraphs={content.overview.paragraphs}
        outcomesTitle="What the engagement should produce"
        outcomes={data.outcomes}
      />

      <Band
        id="audience"
        image={media.section}
        position={media.position}
        label="Who it is for"
        title={content.audience.title}
        description={content.audience.description}
        chips={data.audiences}
      />

      <Block tone="dark" aurora id="signals" label="When it helps">
        <SectionHead
          label="When it becomes useful"
          title={content.useCases.title}
          description={content.useCases.description}
        />
        <CardGrid items={data.useCases} cols={2} className="cards--spaced" />
      </Block>

      <Block tone="light" id="deliver" label="What we deliver">
        <SplitLayout
          head={
            <SectionHead
              label="Core services"
              title={content.core.title}
              description={content.core.description}
            />
          }
        >
          <Rows items={data.coreServices} />
        </SplitLayout>
      </Block>

      <Block tone="dark" aurora id="scope" label="Scope">
        <SplitLayout
          head={
            <SectionHead
              label="Capabilities"
              title="Scope available *within this service*"
              description={content.capabilities.description}
            />
          }
        >
          <CheckChips items={data.capabilities} />
        </SplitLayout>
      </Block>

      <Block tone="light" id="deliverables" label="Deliverables">
        <SectionHead
          label="Typical deliverables"
          title={content.deliverables.title}
          description={content.deliverables.description}
        />
        <CardGrid items={data.deliverables} cols="mosaic" className="cards--spaced" />
      </Block>

      <Block tone="dark" aurora id="engagement" label="Engagement">
        <SectionHead
          label="Engagement options"
          title={content.engagement.title}
          description={content.engagement.description}
        />
        <CardGrid
          items={data.engagementOptions}
          cols={3}
          icons={engagementIcons}
          numbered={false}
          className="cards--spaced"
        />
        <Callout {...content.callout} />
      </Block>

      <Block tone="light" alt id="process" label="Process">
        <SectionHead
          label="Delivery"
          title={content.process.title}
          description={content.process.description}
        />
        <Timeline steps={data.process} />
      </Block>

      <FAQSection items={data.faqs} title={content.faqTitle} eyebrow="FAQ" lift id="faq" />

      <CTASection
        title={content.cta.title}
        description={content.cta.description}
        buttonLabel="Book a Consultation"
        buttonPath="/contact"
      />
    </>
  );
}