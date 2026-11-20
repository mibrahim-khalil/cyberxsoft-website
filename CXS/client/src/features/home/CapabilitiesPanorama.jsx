import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight } from "lucide-react";

import SectionHead from "../../ui/SectionHead";
import Button from "../../ui/Button";
import { imageProps } from "../../ui/motion";
import { serviceMedia } from "../../config/media";
import { services } from "../services/servicesData";

function Panel({ service }) {
  const media = serviceMedia[service.slug];
  const Icon = service.icon;

  return (
    <Link
      to={`/services/${service.slug}`}
      className="pano__panel"
      data-cursor="Explore"
    >
      <img
        {...imageProps(media.hero, { sizes: "(max-width: 900px) 100vw, 1000px" })}
        alt=""
        className="pano__img"
        style={{ objectPosition: media.position }}
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
  const trackRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < maxScroll - 20);

    const childWidth = el.firstElementChild ? el.firstElementChild.clientWidth + 24 : 1;
    const index = Math.round(scrollLeft / childWidth);
    setCurrent(Math.min(services.length - 1, Math.max(0, index)));
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    updateScrollState();
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollByAmount = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.firstElementChild ? el.firstElementChild.clientWidth + 28 : 500;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <section
      className="pano"
      data-tone="dark"
      id="capabilities"
      data-chapter="Capabilities"
    >
      <div className="aurora" aria-hidden="true" />

      <div className="pano__content">
        <div className="container pano__head">
          <SectionHead
            label="Our services"
            title="Integrated capabilities for *digital growth* and delivery"
            description="Choose a focused service or combine capabilities into a coordinated program. Each engagement is shaped around your priorities, operating environment, timeline, and internal capacity."
          />

          <div className="pano__meta">
            <div className="pano__controls">
              <Button to="/services" variant="glass" size="sm">
                View All Services
              </Button>
              <div className="pano__nav-arrows">
                <button
                  type="button"
                  className="pano__nav-btn"
                  onClick={() => scrollByAmount(-1)}
                  disabled={!canScrollLeft}
                  aria-label="Previous service"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  className="pano__nav-btn"
                  onClick={() => scrollByAmount(1)}
                  disabled={!canScrollRight}
                  aria-label="Next service"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="pano__progress" aria-hidden="true">
              <span className="pano__count">
                {String(current + 1).padStart(2, "0")} <i>/ {String(services.length).padStart(2, "0")}</i>
              </span>
              <span className="pano__bar">
                <span 
                  style={{ 
                    width: `${((current + 1) / services.length) * 100}%`,
                    transition: "width 0.3s ease"
                  }} 
                />
              </span>
            </div>
          </div>
        </div>

        <div ref={trackRef} className="pano__track">
          {services.map((service) => (
            <Panel key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}