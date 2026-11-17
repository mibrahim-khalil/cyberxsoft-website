import { CheckCircle2, Lightbulb, ShieldCheck, Sparkles, Target, Users, Workflow } from "lucide-react";

import PageHero from "../../components/PageHero";
import CTASection from "../../components/CTASection";
import Button from "../../ui/Button";
import SectionHead from "../../ui/SectionHead";
import { Item, ParallaxMedia, Reveal, Stagger, WindowReveal } from "../../ui/motion";
import { pageMedia } from "../../config/media";

import { Block, CardGrid, Timeline } from "../services/ServiceBlocks";
import { companyOverview, companyValues, deliveryProcess, foundationPillars } from "./aboutData";

import "./about.css";

const pillarIcons = [Lightbulb, Target, Workflow];
const valueIcons = [Users, CheckCircle2, ShieldCheck, Sparkles];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About CyberX Soft"
        title="A practical partner for *digital growth and delivery*"
        description="CyberX Soft brings technology, cybersecurity, data, creative, marketing, and delivery capability into one coordinated team. We work with organizations that need to build, improve, protect, or scale digital operations without adding unnecessary complexity."
        breadcrumbs={[{ label: "About" }]}
        action={{ label: "Explore Our Work", path: "/case-studies" }}
        image={pageMedia.about}
        position="70% 50%"
      />

      <Block tone="light" lift>
        <div className="about-overview">
          <WindowReveal className="about-overview__media">
            <ParallaxMedia name={pageMedia.aboutOverview} className="media--bg" speed={0.09} position="66% 50%" />
          </WindowReveal>

          <div className="about-overview__copy">
            <SectionHead
              label={companyOverview.eyebrow}
              title="Business understanding *with hands-on delivery*"
            />
            <Reveal as="p" className="t-lead" delay={0.15}>
              {companyOverview.description}
            </Reveal>
            <Reveal as="p" className="t-lead" delay={0.22}>
              {companyOverview.secondaryDescription}
            </Reveal>
            <Reveal delay={0.3} blur={0}>
              <Button to={companyOverview.actionPath} variant="ink">
                {companyOverview.actionLabel}
              </Button>
            </Reveal>
          </div>
        </div>
      </Block>

      <Block tone="dark" aurora>
        <SectionHead
          label="Our foundation"
          title="Our purpose and *working principles*"
        />

        <CardGrid items={foundationPillars} cols={3} icons={pillarIcons} numbered={false} className="cards--spaced" />

        <Stagger className="values" stagger={0.1}>
          {companyValues.map((value, index) => {
            const Icon = valueIcons[index % valueIcons.length];
            return (
              <Item key={value.id} className="value glass spot" y={26}>
                <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </Item>
            );
          })}
        </Stagger>
      </Block>

      <Block tone="light" alt>
        <SectionHead
          label="Our process"
          title="How we *work*"
          description="From understanding your requirements to delivery and ongoing improvement, our approach keeps priorities, responsibilities, and progress clear."
        />
        <Timeline steps={deliveryProcess} />
      </Block>

      <CTASection
        title="Discuss your *next initiative*"
        description="Tell us what you need to build, improve, secure, or scale. We will help define a practical route forward."
        buttonLabel="Contact CyberX Soft"
        buttonPath="/contact"
      />
    </>
  );
}
