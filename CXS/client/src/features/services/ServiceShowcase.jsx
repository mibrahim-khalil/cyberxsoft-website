import { Link } from "react-router-dom";
import { Check } from "lucide-react";

import { Chapter } from "../../ui/SectionHead";
import { ParallaxMedia, Reveal, SplitTitle, WindowReveal } from "../../ui/motion";
import { LinkArrow } from "./ServiceBlocks";
import { serviceMedia } from "../../config/media";
import { serviceOverviewBySlug } from "./servicesOverviewData";

/* One service on the overview page: large panoramic image + copy */
export default function ServiceShowcase({ service, reverse = false }) {
  const overview = serviceOverviewBySlug[service.slug] || {};
  const media = serviceMedia[service.slug];
  const Icon = service.icon;
  const name = overview.name || service.name;

  return (
    <article className={`showcase ${reverse ? "showcase--rev" : ""}`}>
      <WindowReveal className="showcase__media">
        <Link
          to={`/services/${service.slug}`}
          className="showcase__link"
          data-cursor="Explore"
          aria-label={`Explore ${name}`}
        >
          <ParallaxMedia name={media.hero} position={media.position} className="media--bg" speed={0.08} />
          {/* Decorative number drawn with CSS content so it is not link text. */}
          <span className="showcase__no" aria-hidden="true" data-no={service.number} />
        </Link>
      </WindowReveal>

      <div className="showcase__copy">
        <Reveal blur={0} y={14}>
          <Chapter>{name}</Chapter>
        </Reveal>

        <div className="showcase__title-row">
          <Reveal className="icon-tile" blur={0} y={14}>
            {Icon && <Icon size={22} strokeWidth={1.7} aria-hidden="true" />}
          </Reveal>
          <SplitTitle as="h2" text={overview.showcaseTitle || service.showcaseTitle} className="showcase__title" />
        </div>

        <Reveal as="p" className="t-lead" delay={0.15} y={16}>
          {overview.showcaseDescription || service.showcaseDescription}
        </Reveal>

        <Reveal as="ul" className="showcase__features" delay={0.22} y={16} blur={0}>
          {(overview.features || service.features).map((feature) => (
            <li key={feature} className="chip">
              <Check size={14} strokeWidth={2.4} aria-hidden="true" />
              {feature}
            </li>
          ))}
        </Reveal>

        <Reveal delay={0.3} blur={0} y={12}>
          <LinkArrow to={`/services/${service.slug}`}>Explore this service</LinkArrow>
        </Reveal>
      </div>
    </article>
  );
}
