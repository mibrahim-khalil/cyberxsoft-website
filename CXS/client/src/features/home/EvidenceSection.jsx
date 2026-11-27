import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight } from "lucide-react";



import SectionHead from "../../ui/SectionHead";
import Button from "../../ui/Button";
import { imageProps } from "../../ui/motion";
import { caseStudyMedia } from "../../config/media";
import { publishedCaseStudies } from "../case-studies/workData";


import "./homeLogo.css";



/* Projects still using this placeholder show the CXS logo in its real colours. */
const CXS_LOGO = "/logos/company-logo.png";



function CaseStudyPanel({ project }) {
  // Cloudinary background (same method as the service cards)
  const media = caseStudyMedia[project.id];



  // Fallback: support whichever image property is defined in your workData
  const projectImage =
    project.image ||
    project.heroImage ||
    project.cover ||
    project.coverImage ||
    project.thumbnail ||
    project.img;



  const features = project.shortFeatures || project.features || [];



  // true when the project has no logo of its own (placeholder CXS logo)
  const isCxsLogo = project.logo === CXS_LOGO;



  return (
    <Link
      to={`/work#${project.id}`}
      className="pano__panel"
      data-cursor="Explore"
    >
      {/* Background Project Image */}
      {media?.image ? (
        <img
          {...imageProps(media.image, { sizes: "(max-width: 900px) 100vw, 1000px" })}
          alt=""
          className="pano__img"
          style={{ objectPosition: media.position }}
        />
      ) : projectImage ? (
        <img
          src={typeof projectImage === "string" ? projectImage : (projectImage?.src || projectImage)}
          alt={project.title || project.client || ""}
          className="pano__img"
          loading="lazy"
        />
      ) : (
        <div
          className="pano__img"
          style={{
            background:
              "linear-gradient(135deg, rgba(8, 22, 51, 0.95) 0%, rgba(4, 13, 32, 0.98) 100%)",
          }}
        />
      )}



      {/* Ambient Dark Gradient Shade for text contrast */}
      <span className="pano__shade" aria-hidden="true" />



      {/* Top Header: Logo on the Left of the Big Outline Number */}
      <div className="pano__top-badge" aria-hidden="true">
        {project.logo && (
          <div className={`pano__brand-logo${isCxsLogo ? " pano__brand-logo--cxs" : ""}`}>
            <img
              src={project.logo}
              alt={project.client || ""}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}
        <span className="pano__no">{project.number}</span>
      </div>



      {/* Glass Caption Card */}
      <div className="pano__caption glass">
        <span className={`pano__icon${isCxsLogo ? " pano__icon--cxs" : ""}`}>
          {project.logo ? (
            <img
              src={project.logo}
              alt={project.client}
              style={{
                maxWidth: isCxsLogo ? "36px" : "28px",
                maxHeight: isCxsLogo ? "36px" : "28px",
                objectFit: "contain",
                filter: isCxsLogo ? "none" : "brightness(0) invert(1)",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <span style={{ fontSize: "0.75rem", fontWeight: "700" }}>
              {project.number}
            </span>
          )}
        </span>



        <span
          style={{
            fontSize: "0.72rem",
            fontWeight: "600",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--green-400)",
          }}
        >
          {project.client} · {project.tag}
        </span>



        <h3>{project.title}</h3>
        <p>{project.shortDescription}</p>



        <ul>
          {features.map((feature) => (
            <li key={feature}>
              <Check size={13} strokeWidth={2.4} aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>



        <span className="pano__go">
          Explore case study <ArrowUpRight size={16} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}



export default function EvidenceSection() {
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



    const childWidth = el.firstElementChild
      ? el.firstElementChild.clientWidth + 24
      : 1;
    const index = Math.round(scrollLeft / childWidth);
    setCurrent(Math.min(publishedCaseStudies.length - 1, Math.max(0, index)));
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
    const amount = el.firstElementChild
      ? el.firstElementChild.clientWidth + 28
      : 500;
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };



  return (
    <section
      className="pano"
      data-tone="dark"
      id="work"
      data-chapter="Selected work"
    >
      <div className="aurora" aria-hidden="true" />



      <div className="pano__content">
        <div className="container pano__head">
          <SectionHead
            label="Selected work"
            title="Project stories built around *verified evidence*"
            description="Published work should make the client context, CyberX Soft responsibilities, delivered solution, and approved outcome clear without overstating the engagement."
          />



          <div className="pano__meta">
            <div className="pano__controls">
              <Button to="/work" variant="glass" size="sm">
                View All Case Studies
              </Button>
              <div className="pano__nav-arrows">
                <button
                  type="button"
                  className="pano__nav-btn"
                  onClick={() => scrollByAmount(-1)}
                  disabled={!canScrollLeft}
                  aria-label="Previous case study"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  className="pano__nav-btn"
                  onClick={() => scrollByAmount(1)}
                  disabled={!canScrollRight}
                  aria-label="Next case study"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>



            <div className="pano__progress" aria-hidden="true">
              <span className="pano__count">
                {String(current + 1).padStart(2, "0")}{" "}
                <i>/ {String(publishedCaseStudies.length).padStart(2, "0")}</i>
              </span>
              <span className="pano__bar">
                <span
                  style={{
                    width: `${
                      ((current + 1) / publishedCaseStudies.length) * 100
                    }%`,
                    transition: "width 0.3s ease",
                  }}
                />
              </span>
            </div>
          </div>
        </div>



        <div ref={trackRef} className="pano__track">
          {publishedCaseStudies.map((project) => (
            <CaseStudyPanel key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}