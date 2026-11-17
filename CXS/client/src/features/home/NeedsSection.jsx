import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import SectionHead from "../../ui/SectionHead";
import { Reveal, Stagger, Item, imageProps } from "../../ui/motion";
import { serviceMedia } from "../../config/media";
import { services } from "../services/servicesData";
import { audienceNeeds } from "./homeData";

const slugOf = (path) => path.split("/").pop();

export default function NeedsSection() {
  const [active, setActive] = useState(0);

  const need = audienceNeeds[active];
  const slug = slugOf(need.path);
  const service = services.find((s) => s.slug === slug);
  const media = serviceMedia[slug];

  return (
    <section className="section section--lift needs" data-tone="light" id="where-to-start" data-chapter="Where to start">
      <div className="container">
        <div className="needs__head">
          <SectionHead
            label="Where to start"
            title="Support for the moments when *capacity and capability* matter most"
          />
          <Reveal as="p" className="needs__lead t-lead" delay={0.2}>
            CyberX Soft is suited to organizations facing a delivery deadline, a specialist skills
            gap, an underperforming digital channel, a security or data requirement, or a product
            opportunity that cannot wait for a long internal hiring cycle. Choose the situation
            closest to yours.
          </Reveal>
        </div>

        <div className="needs__body">
          <Stagger as="ul" className="needs__list" stagger={0.08}>
            {audienceNeeds.map((item, index) => (
              <Item as="li" key={item.id} y={20} blur={0}>
                <button
                  type="button"
                  className={`needs__row ${index === active ? "is-active" : ""}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  aria-pressed={index === active}
                >
                  <span className="needs__no">{String(index + 1).padStart(2, "0")}</span>
                  <span className="needs__text">{item.need}</span>
                  <span className="needs__arrow" aria-hidden="true">
                    <ArrowRight size={18} />
                  </span>
                </button>
              </Item>
            ))}
          </Stagger>

          <Reveal className="needs__preview" blur={0} y={30} delay={0.15}>
            <AnimatePresence mode="wait">
              <motion.div
                key={slug}
                className="needs__card"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="needs__image">
                  <img
                    {...imageProps(media.section, { sizes: "(max-width: 900px) 100vw, 640px" })}
                    style={{ objectPosition: media.position }}
                    alt=""
                  />
                </div>

                <div className="needs__info glass">
                  <span className="needs__kicker">Recommended starting point</span>
                  <h3>{need.service}</h3>
                  <p>{service?.homeDescription}</p>
                  <Link to={need.path} className="arrow-link">
                    Explore this service <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
