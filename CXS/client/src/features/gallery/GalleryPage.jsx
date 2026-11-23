import { useEffect, useMemo, useState } from "react";
import { Play } from "lucide-react";

import PageHero from "../../components/PageHero";
import CTASection from "../../components/CTASection";
import SectionHead from "../../ui/SectionHead";
import { serviceMedia } from "../../config/media";
import { Block } from "../services/ServiceBlocks";

import GalleryLightbox from "./GalleryLightbox";
import {
  galleryCategories,
  galleryCta,
  galleryHero,
  galleryIntro,
  galleryItems,
  getThumb,
} from "./galleryData";

import "./gallery.css";

const SERVICE_PATH = "/services/creative-media-design-animation";
const heroMedia = serviceMedia["creative-media-design-animation"];

export default function GalleryPage() {
  const [category, setCategory] = useState("All");
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const filtered = useMemo(
    () => (category === "All" ? galleryItems : galleryItems.filter((item) => item.category === category)),
    [category],
  );

  const openIndex = openId ? filtered.findIndex((item) => item.id === openId) : -1;

  const countFor = (name) =>
    name === "All" ? galleryItems.length : galleryItems.filter((item) => item.category === name).length;

  return (
    <>
      <PageHero
        eyebrow={galleryHero.eyebrow}
        title={galleryHero.title}
        description={galleryHero.description}
        breadcrumbs={[
          { label: "Services", path: "/services" },
          { label: "Creative Media Design and Animation", path: SERVICE_PATH },
          { label: "Gallery" },
        ]}
        action={{ label: "Book a Consultation", path: "/contact" }}
        secondaryAction={{ label: "Back to service", path: SERVICE_PATH }}
        image={heroMedia.hero}
        position={heroMedia.position}
      />

      <Block tone="dark" aurora id="gallery">
        <SectionHead
          label={galleryIntro.label}
          title={galleryIntro.title}
          description={galleryIntro.description}
          center
        />

        <div className="gallery__filters" role="group" aria-label="Filter gallery by category">
          {galleryCategories.map((name) => (
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

        <ul className="gallery__grid" key={category}>
          {filtered.map((item, i) => {
            const thumb = getThumb(item, 900);
            return (
              <li key={item.id} className={`gcard gcard--${item.ratio || "wide"}`} style={{ "--i": i }}>
                <button
                  type="button"
                  className="gcard__btn"
                  onClick={() => setOpenId(item.id)}
                  data-cursor="View"
                  aria-label={`Open ${item.title}`}
                >
                  {thumb ? (
                    <img src={thumb} alt="" loading="lazy" decoding="async" />
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
      </Block>

      <CTASection
        title={galleryCta.title}
        description={galleryCta.description}
        buttonLabel={galleryCta.buttonLabel}
        buttonPath={galleryCta.buttonPath}
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