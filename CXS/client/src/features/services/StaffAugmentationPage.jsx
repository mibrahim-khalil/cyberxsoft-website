import { useState } from "react";
import { Briefcase, Check, CheckCircle2, ChevronDown, Globe2, ShieldCheck, UserRound, UsersRound, Workflow } from "lucide-react";

import PageHero from "../../components/PageHero";
import SectionNav from "../../components/SectionNav";
import FAQSection from "../../components/FAQSection";
import CTASection from "../../components/CTASection";
import Button from "../../ui/Button";
import SectionHead from "../../ui/SectionHead";
import { Item, Reveal, Stagger } from "../../ui/motion";
import { serviceMedia } from "../../config/media";

import { Band, Block, Callout, CardGrid, SplitLayout, Timeline } from "./ServiceBlocks";
import {
  staffingBenefits,
  staffingBuyerGroups,
  staffingChallenges,
  staffingCollaboration,
  staffingCommercialStructures,
  staffingFaqs,
  staffingModels,
  staffingOverviewPoints,
  staffingPerformance,
  staffingProcess,
  staffingResponsibilities,
  staffingSafeguards,
  staffingSpecializations,
} from "./staffAugmentationData";

import "./services.css";

const slug = "talent-augmentation-delivery-support";
const modelIcons = [UserRound, UsersRound, Workflow, Briefcase, Globe2];
const INITIAL = 6;

export default function StaffAugmentationPage() {
  const media = serviceMedia[slug];
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? staffingSpecializations : staffingSpecializations.slice(0, INITIAL);

  return (
    <>
      <PageHero
        eyebrow="Staff Augmentation and Delivery Support"
        title="IT staff augmentation and *dedicated remote teams*"
        description="CyberX Soft helps international organizations add technology, product, data, cybersecurity, cloud, quality, creative, and delivery professionals through individual assignments, dedicated remote teams, managed pods, and white-label offshore delivery."
        breadcrumbs={[{ label: "Services", path: "/services" }, { label: "Staff Augmentation and Delivery Support" }]}
        action={{ label: "Request Talent Profiles", path: "/contact" }}
        secondaryAction={{ label: "All services", path: "/services" }}
        image={media.hero}
        position={media.position}
      />

      <SectionNav />

      {/* Overview */}
      <Block tone="light" lift id="overview" label="Overview">
        <div className="overview">
          <div className="overview__copy">
            <SectionHead
              label="Service overview"
              title="Increase capacity *without losing delivery control*"
            />
            <Reveal as="p" className="overview__p t-lead" delay={0.15}>
              Organizations often need specialist skills faster than conventional recruitment can provide, or additional capacity for a defined delivery phase.
            </Reveal>
            <Reveal as="p" className="overview__p t-lead" delay={0.22}>
              Staff augmentation places external professionals into your delivery environment while your team normally retains day-to-day direction. CyberX Soft structures the engagement around required skills, responsibilities, working hours, security requirements, reporting, governance, and the level of management support required.
            </Reveal>
            <Reveal delay={0.3} blur={0}>
              <Button to="/contact" variant="ink">
                Schedule a Staff Augmentation Discussion
              </Button>
            </Reveal>
          </div>

          <div className="overview__outcomes">
            <Stagger className="outcomes" stagger={0.1}>
              {staffingOverviewPoints.map((point) => (
                <Item key={point.id} className="outcome glass spot" y={28}>
                  <CheckCircle2 size={22} strokeWidth={1.7} aria-hidden="true" />
                  <div>
                    <h3>{point.title}</h3>
                    <p>{point.description}</p>
                  </div>
                </Item>
              ))}
            </Stagger>
          </div>
        </div>
      </Block>

      {/* Audience */}
      <Band
        id="audience"
        image={media.section}
        position="74% 50%"
        label="Who it is for"
        title="Built for organizations that need *reliable delivery capacity*"
        description="The service is designed for international organizations that need specialist capability, commercial flexibility, confidentiality, suitable working-hour overlap, and a clear division of management responsibility."
        chips={staffingBuyerGroups}
        note="Engagements can support organizations in the United Kingdom, United States, Canada, United Arab Emirates, Saudi Arabia, and other international markets, subject to the agreed working model, availability, contractual requirements, and applicable jurisdictional considerations."
      />

      {/* Challenges */}
      <Block tone="dark" aurora id="challenges" label="Challenges">
        <SectionHead
          label="What buyers are usually trying to solve"
          title="Add capacity *where the delivery plan needs it*"
          description="Staff augmentation can be useful when recruitment, specialist availability, changing workloads, or delivery responsibilities are limiting progress."
        />
        <CardGrid items={staffingChallenges} cols={3} className="cards--spaced" />
      </Block>

      {/* Models */}
      <Block tone="light" id="models" label="Models">
        <SectionHead
          label="Five engagement models"
          title="Choose the operating model *that fits the requirement*"
          description="The right structure depends on the required skills, client control, delivery responsibility, duration, security needs, working arrangements, and level of CyberX Soft coordination."
        />
        <CardGrid items={staffingModels} cols={2} icons={modelIcons} numbered={false} className="cards--spaced cards--models">
          {(model) => (
            <>
              <span className="pill">{model.label}</span>
              <dl className="facts">
                <div>
                  <dt>Client control</dt>
                  <dd>{model.clientControl}</dd>
                </div>
                <div>
                  <dt>CyberX Soft role</dt>
                  <dd>{model.cyberxRole}</dd>
                </div>
                <div>
                  <dt>Best fit</dt>
                  <dd>{model.bestFit}</dd>
                </div>
              </dl>
            </>
          )}
        </CardGrid>
        <Callout
          eyebrow="White-label offshore delivery"
          title="Need confidential delivery capacity behind your brand?"
          description="Software firms, agencies, consultancies, managed-service providers, staffing firms, and system integrators can discuss confidential offshore delivery where branding, client interaction, responsibilities, ownership, and commercial terms are agreed before delivery begins."
          label="Explore White Label Offshore Delivery"
        />
      </Block>

      {/* Responsibilities */}
      <Block tone="dark" aurora id="responsibilities" label="Responsibilities">
        <SectionHead
          label="Clear responsibilities"
          title="Know who manages what *before delivery begins*"
          description="Responsibilities differ between conventional augmentation, managed pods, white-label delivery, placement, and EOR-supported arrangements. The agreement should make the division of responsibility explicit."
        />
        <CardGrid items={staffingResponsibilities} cols={2} numbered={false} className="cards--spaced">
          {(item) => (
            <ul className="ticks">
              {item.points.map((point) => (
                <li key={point}>
                  <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </CardGrid>
      </Block>

      {/* Benefits */}
      <Block tone="light" id="benefits" label="Benefits">
        <SectionHead
          label="Delivery benefits"
          title="Capacity should make delivery *easier to manage*"
          description="The goal is not simply to add more people. The engagement should provide useful capacity while maintaining visibility, accountability, and flexibility."
        />
        <CardGrid items={staffingBenefits} cols={4} className="cards--spaced" />
      </Block>

      {/* Specialisations */}
      <Block tone="dark" aurora id="specialists" label="Specialists">
        <SectionHead
          label="Specialist coverage"
          title="Build a focused role *or combine complementary skills*"
          description="CyberX Soft can discuss specialist requirements across technology, product, data, cybersecurity, cloud, quality, enterprise platforms, automation, design, growth, creative production, and delivery management."
        />

        <CardGrid items={visible} cols={3} className="cards--spaced cards--roles">
          {(item) => (
            <ul className="roles">
              {item.roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          )}
        </CardGrid>

        {staffingSpecializations.length > INITIAL && (
          <div className="more">
            <p>
              Showing <strong>{visible.length}</strong> of <strong>{staffingSpecializations.length}</strong> specialist areas
            </p>
            <button
              type="button"
              className="btn btn--glass btn--sm"
              aria-expanded={showAll}
              onClick={() => setShowAll((v) => !v)}
            >
              <span>{showAll ? "Show less" : `View all ${staffingSpecializations.length} specializations`}</span>
              <span className="btn__icon" aria-hidden="true">
                <ChevronDown size={16} style={{ transform: showAll ? "rotate(180deg)" : "none" }} />
              </span>
            </button>
          </div>
        )}
      </Block>

      {/* Collaboration */}
      <Block tone="light" id="collaboration" label="Collaboration">
        <SectionHead
          label="International collaboration"
          title="Flexible collaboration. *Extended delivery.*"
          description="Working arrangements can be structured around suitable overlap between your internal team and assigned remote specialists."
        />
        <CardGrid items={staffingCollaboration} cols={2} className="cards--spaced" />
        <Reveal as="p" className="note" delay={0.1}>
          Extended-hours or overnight progress depends on the agreed schedule, assigned specialists, and suitable time-zone arrangements. It is not an automatic feature of every engagement.
        </Reveal>
      </Block>

      {/* Safeguards */}
      <Block tone="dark" aurora id="safeguards" label="Safeguards">
        <SplitLayout
          head={
            <SectionHead
              label="Security & continuity"
              title="Client control supported by *clear safeguards*"
              description="Security, access, confidentiality, intellectual property, continuity, and offboarding requirements should be agreed before specialists enter the client environment."
            />
          }
        >
          <Stagger className="safeguards" stagger={0.1}>
            {staffingSafeguards.map((item) => (
              <Item key={item.id} className="safeguard glass spot" y={26}>
                <ShieldCheck size={24} strokeWidth={1.6} aria-hidden="true" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </Item>
            ))}
          </Stagger>
          <Reveal as="p" className="note" delay={0.1}>
            Regulatory and data-handling requirements are reviewed for relevant engagements. References to regulations, controls, or security practices do not represent a general CyberX Soft certification or guarantee of compliance.
          </Reveal>
        </SplitLayout>
      </Block>

      {/* Process */}
      <Block tone="light" alt id="process" label="Process">
        <SectionHead
          label="How it works"
          title="From requirement to *an agreed working team*"
          description="A structured process helps both sides understand the role, responsibilities, commercial structure, access requirements, working schedule, and delivery expectations before onboarding."
        />
        <Timeline steps={staffingProcess} />
        <Reveal as="p" className="note" delay={0.1}>
          Shortlisting and mobilisation timelines are confirmed after the required skills, seniority, availability, assessments, notice periods, security checks, contractual requirements, and onboarding arrangements are understood. No fixed public mobilisation target is being presented.
        </Reveal>
      </Block>

      {/* Performance */}
      <Block tone="dark" aurora id="performance" label="Performance">
        <SectionHead
          label="Performance management"
          title="Clear expectations. *Continuous oversight.*"
          description="Performance management should give clients visibility into delivery while identifying issues early enough to discuss appropriate action."
        />
        <CardGrid items={staffingPerformance} cols={4} className="cards--spaced" />
      </Block>

      {/* Commercial */}
      <Block tone="light" id="commercial" label="Commercial">
        <SplitLayout
          head={
            <SectionHead
              label="Commercial planning"
              title="Commercial structure built *around the requirement*"
              description="Depending on the role and operating model, an engagement can use one of several commercial structures."
            />
          }
        >
          <Reveal className="pricing glass" y={30} blur={0}>
            <ul className="ticks">
              {staffingCommercialStructures.map((structure) => (
                <li key={structure}>
                  <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                  <span>{structure}</span>
                </li>
              ))}
            </ul>
            <p>
              Pricing is prepared after the role, seniority, workload, duration, working-hour overlap, security needs, responsibilities, and level of management support are understood. No public rate or savings claim is being presented on this page.
            </p>
            <Button to="/contact" variant="ink">
              Request a Quote
            </Button>
          </Reveal>
        </SplitLayout>
      </Block>

      <FAQSection items={staffingFaqs} title="Staff Augmentation and Dedicated Remote Teams *FAQs*" tone="dark" lift id="faq" />

      <CTASection
        title="Tell us the role or team *you need*"
        description="Send the role or team requirement, core skills, seniority, number of resources, expected duration, preferred start date, working-hour overlap, and a short description of the work. We can then recommend a suitable sourcing and engagement route."
        buttonLabel="Request Talent Profiles"
        buttonPath="/contact"
      />
    </>
  );
}
