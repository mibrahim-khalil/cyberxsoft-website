import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle2, ArrowUpRight } from "lucide-react";


import PageHero from "../../components/PageHero";
import CTASection from "../../components/CTASection";
import SectionHead from "../../ui/SectionHead";
import { Item, Stagger } from "../../ui/motion";
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
import "./workLogo.css";


/* Projects still using this placeholder show the CXS logo in its real colours. */
const CXS_LOGO = "/logos/company-logo.png";


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
  const location = useLocation();


  // Automatically scroll to the exact case study when clicked from home page
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          el.classList.add("work-card--highlighted");
          setTimeout(() => el.classList.remove("work-card--highlighted"), 2500);
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.hash]);


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


      <Block tone="dark" aurora id="case-studies">
        <SectionHead
          label="Case Studies"
          title="Project stories built around *verified evidence*"
          description="Detailed overview of our engagements, discovery workflows, architectures, and approved deliverables."
          center
        />


        {/* 9 Complete Case Studies */}
        <div className="work-full-list">
          {publishedCaseStudies.map((project) => (
            <article
              key={project.id}
              id={project.id}
              className="work-card glass spot"
            >
              <div className="work-card__header">
                <div className="work-card__brand">
                  {project.logo && (
                    <div
                      className={`work-card__logo-tile${
                        project.logo === CXS_LOGO ? " work-card__logo-tile--cxs" : ""
                      }`}
                    >
                      <img
                        src={project.logo}
                        alt={project.client}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <span className="work-card__tag">{project.tag}</span>
                    <h3 className="work-card__title">{project.title}</h3>
                  </div>
                </div>


                <span className="work-card__no">{project.number}</span>
              </div>


              <div className="work-card__body">
                {project.fullParagraphs.map((para, i) => (
                  <p key={i} className="work-card__text">
                    {para}
                  </p>
                ))}
              </div>


              <div className="work-card__footer">
                <ul className="work-card__deliverables">
                  {project.shortFeatures.map((f, i) => (
                    <li key={i}>
                      <span>✓</span> {f}
                    </li>
                  ))}
                </ul>


                <Link to="/contact" className="work-card__link">
                  Discuss similar project <ArrowUpRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
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