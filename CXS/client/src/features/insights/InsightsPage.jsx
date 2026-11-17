import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import PageHero from "../../components/PageHero";
import CTASection from "../../components/CTASection";
import SectionHead from "../../ui/SectionHead";
import { EASE, imageProps } from "../../ui/motion";
import { insightMedia, pageMedia } from "../../config/media";

import { Block } from "../services/ServiceBlocks";
import { insightCategories, insights } from "./insightsData";

import "./insights.css";

const ALL = "All Insights";

const descriptions = {
  [ALL]:
    "Explore practical perspectives across AI, software, cybersecurity, data, creative work, digital growth, and delivery.",
  "AI & Automation": "Use cases, readiness, data, governance, integration, risk, and adoption.",
  "Software & Platforms": "Product decisions, architecture, integration, modernization, quality, and maintainability.",
  "Cybersecurity & Governance": "Risk priorities, identity, cloud, resilience, compliance, and management accountability.",
  "Data & Business Intelligence": "Data foundations, reporting quality, dashboards, decision support, and responsible use.",
  "Brand Growth & Creative": "Positioning, campaign planning, content systems, design, animation, and performance.",
  "Delivery & Talent": "Team models, project controls, quality assurance, augmentation, and knowledge transfer.",
};

function Card({ insight }) {
  const media = insightMedia[insight.type] || "software-section";
  const soon = insight.date === "Coming soon";

  return (
    <motion.article
      layout
      className="insight glass spot"
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <div className="insight__media">
        <img {...imageProps(media, { sizes: "(max-width: 900px) 100vw, 400px" })} alt="" />
        <span className="insight__tag">{insight.category}</span>
      </div>

      <div className="insight__body">
        <h3>{insight.title}</h3>
        <p>{insight.excerpt}</p>
        <div className="insight__meta">
          <span className={soon ? "insight__soon" : ""}>{soon ? "Coming soon" : insight.date}</span>
          <span aria-hidden="true">·</span>
          <span>{insight.readTime}</span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </div>
      </div>
    </motion.article>
  );
}

export default function InsightsPage() {
  const [active, setActive] = useState(ALL);
  const categories = [ALL, ...insightCategories];

  const filtered = useMemo(
    () => (active === ALL ? insights : insights.filter((item) => item.type === active)),
    [active],
  );

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Practical thinking for *digital decisions*"
        description="Explore clear, experience-led perspectives on technology, security, data, creative work, digital growth, and delivery. Our aim is to help leaders understand the decision, the trade-offs, and the next practical step."
        breadcrumbs={[{ label: "Insights" }]}
        image={pageMedia.insights}
        position="70% 50%"
      />

      <Block tone="light" lift>
        <div className="insights-tabs" role="group" aria-label="Filter insights by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`insights-tabs__btn ${active === category ? "is-active" : ""}`}
              aria-pressed={active === category}
              onClick={() => setActive(category)}
            >
              {active === category && (
                <motion.span layoutId="insight-tab" className="insights-tabs__pill" transition={{ duration: 0.5, ease: EASE }} />
              )}
              <span>{category}</span>
            </button>
          ))}
        </div>

        <SectionHead
          label="Editorial focus"
          title={active === ALL ? "All *insights*" : active}
          description={descriptions[active]}
          className="insights-head"
        />

        <LayoutGroup>
          <motion.div layout className="insights-grid" aria-live="polite">
            <AnimatePresence mode="popLayout">
              {filtered.map((insight) => (
                <Card key={insight.id} insight={insight} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </Block>

      <CTASection
        title="Expert guidance for *a live requirement*"
        description="If an insight reflects a challenge inside your organization, speak with our team about the context, constraints, and next practical step."
        buttonLabel="Book a Consultation"
        buttonPath="/contact"
      />
    </>
  );
}
