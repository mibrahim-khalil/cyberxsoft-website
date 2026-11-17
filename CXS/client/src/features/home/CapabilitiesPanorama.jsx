import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { useEffect } from "react";

import SectionHead from "../../ui/SectionHead";
import Button from "../../ui/Button";
import { imageProps, useMediaQuery } from "../../ui/motion";
import { serviceMedia } from "../../config/media";
import { services } from "../services/servicesData";

/* Capability panorama: pinned section that pans sideways while you scroll */

function Panel({ service, index, progress, pinned }) {
  const media = serviceMedia[service.slug];
  const Icon = service.icon;
  const reduce = useReducedMotion();

  // Image drifts the opposite way to the track for a panoramic parallax
  const imgX = useTransform(progress, [0, 1], [`${index * -3}%`, `${index * -3 + 8}%`]);

  return (
    <Link
      to={`/services/${service.slug}`}
      className="pano__panel"
      data-cursor="Explore"
    >
      <motion.img
        {...imageProps(media.hero, { sizes: "(max-width: 900px) 100vw, 1000px" })}
        alt=""
        className="pano__img"
        style={pinned && !reduce ? { x: imgX, objectPosition: media.position } : { objectPosition: media.position }}
      />
      <span className="pano__shade" aria-hidden="true" />

      <span className="pano__no" aria-hidden="true">
        {service.number}
      </span>

      <div className="pano__caption glass">
        <span className="pano__icon">{Icon && <Icon size={20} strokeWidth={1.7} aria-hidden="true" />}</span>
        <h3>{service.homeTitle}</h3>
        <p>{service.homeDescription}</p>
        <ul>
          {service.features.slice(0, 3).map((feature) => (
            <li key={feature}>
              <Check size={13} strokeWidth={2.4} aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
        <span className="pano__go">
          Explore this service <ArrowUpRight size={16} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export default function CapabilitiesPanorama() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const [range, setRange] = useState(0);
  const [current, setCurrent] = useState(0);
  const desktop = useMediaQuery("(min-width: 981px)");
  const reduce = useReducedMotion();
  const pinned = desktop && !reduce;

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -range]);
  const barScale = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setCurrent(Math.min(services.length - 1, Math.floor(value * services.length * 0.999)));
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const measure = () => {
      const gutter = Math.max(24, (window.innerWidth - Math.min(window.innerWidth - 96, 1240)) / 2);
      setRange(Math.max(0, track.scrollWidth - window.innerWidth + gutter));
    };

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  return (
    <section
      ref={wrapRef}
      className="pano"
      data-tone="dark"
      id="capabilities"
      data-chapter="Capabilities"
      style={pinned ? { height: `calc(100svh + ${range}px)` } : undefined}
    >
      <div className="aurora" aria-hidden="true" />

      <div className={`pano__sticky ${pinned ? "is-pinned" : ""}`}>
        <div className="container pano__head">
          <SectionHead
            label="Our services"
            title="Integrated capabilities for *digital growth* and delivery"
            description="Choose a focused service or combine capabilities into a coordinated program. Each engagement is shaped around your priorities, operating environment, timeline, and internal capacity."
          />

          <div className="pano__meta">
            <Button to="/services" variant="glass" size="sm">
              View All Services
            </Button>
            {pinned && (
              <div className="pano__progress" aria-hidden="true">
                <span className="pano__count">
                  {String(current + 1).padStart(2, "0")} <i>/ {String(services.length).padStart(2, "0")}</i>
                </span>
                <span className="pano__bar">
                  <motion.span style={{ scaleX: barScale }} />
                </span>
              </div>
            )}
          </div>
        </div>

        <motion.div ref={trackRef} className="pano__track" style={pinned ? { x } : undefined}>
          {services.map((service, index) => (
            <Panel
              key={service.id}
              service={service}
              index={index}
              progress={scrollYProgress}
              pinned={pinned}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
