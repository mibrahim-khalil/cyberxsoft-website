import { CheckCircle2, FileCheck2 } from "lucide-react";

import PageHero from "../../components/PageHero";
import CTASection from "../../components/CTASection";
import SectionHead from "../../ui/SectionHead";
import { Item, Reveal, Stagger } from "../../ui/motion";
import { pageMedia } from "../../config/media";

import { Block, Rows, SplitLayout } from "../services/ServiceBlocks";
import {
  caseStudyStructure,
  publishedCaseStudies,
  workCta,
  workHero,
  workIntro,
  workPublishingPrinciples,
} from "./workData";

import "./work.css";

function Principles() {
  return (
    <Stagger as="ul" className="principles" stagger={0.09}>
      {workPublishingPrinciples.map((principle) => (
        <Item as="li" key={principle} className="principle glass spot" y={22}>
          <CheckCircle2 size={20} strokeWidth={1.8} aria-hidden="true" />
          <span>{principle}</span>
        </Item>
      ))}
    </Stagger>
  );
}

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow={workHero.eyebrow}
        title="Selected work shaped around *real operating needs*"
        description={workHero.description}
        breadcrumbs={[{ label: "Work" }]}
        action={{ label: "Discuss a Similar Requirement", path: "/contact" }}
        image={pageMedia.work}
        position="72% 50%"
      />

      <Block tone="light" lift>
        <SplitLayout
          head={
            <SectionHead
              label={workIntro.eyebrow}
              title="Evidence *before claims*"
              description={workIntro.description}
            />
          }
        >
          <Principles />
        </SplitLayout>
      </Block>

      <Block tone="dark" aurora>
        <SectionHead
          label="Selected work"
          title="Project stories built around *verified evidence*"
          description="Published work should make the client context, CyberX Soft responsibilities, delivered solution, and approved outcome clear without overstating the engagement."
          center
        />

        {publishedCaseStudies.length > 0 ? (
          <div className="work-grid">
            {publishedCaseStudies.map((project) => (
              <article key={project.id} className="card glass spot">
                <span className="pill">{project.context}</span>
                <h3>{project.name}</h3>
                {project.summary && <p>{project.summary}</p>}
              </article>
            ))}
          </div>
        ) : (
          <Reveal className="empty glass" y={34} blur={0}>
            <span className="icon-tile">
              <FileCheck2 size={24} strokeWidth={1.7} aria-hidden="true" />
            </span>
            <h3 className="t-h3">Approved project stories are being prepared</h3>
            <p>
              Selected engagements will be published here once project scope, client approval,
              supporting evidence, and any publishable outcomes have been confirmed.
            </p>
          </Reveal>
        )}
      </Block>

      <Block tone="light">
        <SplitLayout
          head={
            <SectionHead
              label="Case study approach"
              title="What every published project story *should explain*"
              description="Each case study should help the reader understand the operating context, challenge, CyberX Soft role, delivery approach, solution, and evidence-backed result."
            />
          }
        >
          <Rows items={caseStudyStructure} />
        </SplitLayout>
      </Block>

      <CTASection
        title="Discuss a *similar requirement*"
        description={workCta.description}
        buttonLabel={workCta.buttonLabel}
        buttonPath={workCta.buttonPath}
      />
    </>
  );
}
