import { useEffect, useMemo, useState } from "react";
import { Play } from "lucide-react";


import PageHero from "../../components/PageHero";
import CTASection from "../../components/CTASection";
import SectionHead from "../../ui/SectionHead";
import { serviceMedia } from "../../config/media";
import { Block } from "../services/ServiceBlocks";
import { publishedCaseStudies } from "../case-studies/workData";


import GalleryLightbox from "./GalleryLightbox";
import { getThumb } from "./galleryData";


import "./gallery.css";
import "./galleryEven.css";
import "./galleryLogo.css";


/* The CXS logo is used whenever a project has no logo file of its own. */
const CXS_LOGO = "/logos/company-logo.png";


/* caseStudy id -> logo path, read straight from workData.js */
const logoByCaseStudy = Object.fromEntries(
  publishedCaseStudies.map((study) => [study.id, study.logo]),
);


/* Logo cards take the logo of their case study, so it is only defined in workData.js. */
function withClientLogo(item) {
  if (!item.logo) return item;
  const own = item.caseStudy ? logoByCaseStudy[item.caseStudy] : null;
  return own ? { ...item, image: own } : item;
}


export default function GalleryView({ gallery }) {
  const { items: rawItems, categoryOrder = [], hero, intro, cta, serviceName, serviceSlug } = gallery;


  const items = useMemo(() => rawItems.map(withClientLogo), [rawItems]);


  const servicePath = `/services/${serviceSlug}`;
  const heroMedia = serviceMedia[serviceSlug];


  const [category, setCategory] = useState("All");
  const [openId, setOpenId] = useState(null);
  const [failedIds, setFailedIds] = useState(() => new Set());


  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);


  const categories = useMemo(() => {
    const present = [...new Set(items.map((item) => item.category))];
    return [
      "All",
      ...categoryOrder.filter((c) => present.includes(c)),
      ...present.filter((c) => !categoryOrder.includes(c)),
    ];
  }, [items, categoryOrder]);


  const filtered = useMemo(
    () => (category === "All" ? items : items.filter((item) => item.category === category)),
    [category, items],
  );


  const openIndex = openId ? filtered.findIndex((item) => item.id === openId) : -1;


  const countFor = (name) =>
    name === "All" ? items.length : items.filter((item) => item.category === name).length;


  const markFailed = (id) =>
    setFailedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });


  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumbs={[
          { label: "Services", path: "/services" },
          { label: serviceName, path: servicePath },
          { label: "Gallery" },
        ]}
        action={{ label: "Book a Consultation", path: "/contact" }}
        secondaryAction={{ label: "Back to service", path: servicePath }}
        image={heroMedia.hero}
        position={heroMedia.position}
      />


      <Block tone="dark" aurora id="gallery">
        <SectionHead label={intro.label} title={intro.title} description={intro.description} center />


        {items.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "48px 16px",
              color: "rgba(255,255,255,0.75)",
              fontSize: "1.05rem",
              lineHeight: 1.6,
            }}
          >
            <p style={{ margin: 0 }}>
              Selected work for this service is being added. Check back soon, or get in touch
              to see examples relevant to your project.
            </p>
          </div>
        ) : (
          <>
            <div className="gallery__filters" role="group" aria-label="Filter gallery by category">
              {categories.map((name) => (
                <button
                  key={name}
                  type="button"
                  className={`gfilter ${category === name ? "is-active" : ""}`}
                  aria-pressed={category === name}
                  onClick={() => setCategory(name)}
                >
                  {name}
                  <small>{countFor(name)}</small>
                </button>
              ))}
            </div>


            <p className="gallery__count" aria-live="polite">
              Showing {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
              {category !== "All" ? ` in ${category}` : ""}
            </p>


            <ul className="gallery__grid gallery__grid--even" key={category}>
              {filtered.map((item, i) => {
                /* If a logo file is missing, swap to the CXS logo instead of a blank card. */
                const thumb = item.logo && failedIds.has(item.id) ? CXS_LOGO : getThumb(item, 900);
                return (
                  <li
                    key={item.id}
                    className={`gcard gcard--${item.ratio || "wide"}${item.logo ? " gcard--logo" : ""}`}
                    style={{ "--i": i }}
                  >
                    <button
                      type="button"
                      className="gcard__btn"
                      onClick={() => setOpenId(item.id)}
                      data-cursor="View"
                      aria-label={`Open ${item.title}`}
                    >
                      {thumb ? (
                        <img
                          src={thumb}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          onError={item.logo ? () => markFailed(item.id) : undefined}
                        />
                      ) : (
                        <span className="gcard__fallback" aria-hidden="true" />
                      )}
                      <span className="gcard__shade" aria-hidden="true" />


                      {item.type === "video" && (
                        <span className="gcard__play" aria-hidden="true">
                          <Play size={18} fill="currentColor" strokeWidth={0} />
                        </span>
                      )}


                      <span className="gcard__meta">
                        <span className="gcard__cat">{item.category}</span>
                        <span className="gcard__title">{item.title}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </Block>


      <CTASection
        title={cta.title}
        description={cta.description}
        buttonLabel={cta.buttonLabel}
        buttonPath={cta.buttonPath}
      />


      {openIndex >= 0 && (
        <GalleryLightbox
          items={filtered}
          index={openIndex}
          onClose={() => setOpenId(null)}
          onNavigate={(next) => setOpenId(filtered[next].id)}
        />
      )}
    </>
  );
}