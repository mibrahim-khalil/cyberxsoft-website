import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";

import { lockScroll } from "../../ui/SmoothScroll";
import { getFullImage, getThumb, getVideoSrc } from "./galleryData";

function Media({ item }) {
  const [failed, setFailed] = useState(false);

  if (item.type === "image") {
    return <img className="glb__img" src={getFullImage(item)} alt={item.title} />;
  }

  if (item.video?.source === "youtube") {
    return (
      <iframe
        className="glb__frame"
        src={`https://www.youtube-nocookie.com/embed/${item.video.id}?autoplay=1&rel=0`}
        title={item.title}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  }

  if (failed) {
    return <p className="glb__fail">This video could not be loaded right now.</p>;
  }

  return (
    <video
      className="glb__video"
      src={getVideoSrc(item.video)}
      poster={getThumb(item, 1400) || undefined}
      controls
      autoPlay
      playsInline
      preload="metadata"
      onError={() => setFailed(true)}
    />
  );
}

export default function GalleryLightbox({ items, index, onClose, onNavigate }) {
  const item = items[index];
  const total = items.length;
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  /* Lock page scroll, move focus into the dialog, restore focus on close */
  useEffect(() => {
    const opener = document.activeElement;
    lockScroll(true);
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      lockScroll(false);
      if (opener instanceof HTMLElement) opener.focus({ preventScroll: true });
    };
  }, []);

  /* Keyboard: Esc closes, arrows navigate, Tab stays inside the dialog */
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), video[controls], iframe, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
        return;
      }

      if (total < 2) return;
      if (event.target?.tagName === "VIDEO") return; // let the player use the arrow keys
      if (event.key === "ArrowRight") onNavigate((index + 1) % total);
      if (event.key === "ArrowLeft") onNavigate((index - 1 + total) % total);
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, total, onClose, onNavigate]);

  return createPortal(
    <div className="glb" role="dialog" aria-modal="true" aria-label={item.title} data-lenis-prevent="">
      <div className="glb__backdrop" onClick={onClose} aria-hidden="true" />

      <div className="glb__dialog" ref={dialogRef}>
        <button
          ref={closeRef}
          type="button"
          className="glb__close"
          onClick={onClose}
          aria-label="Close viewer"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="glb__stagewrap">
          <div className="glb__stage">
            <Media key={item.id} item={item} />
          </div>

          {total > 1 && (
            <>
              <button
                type="button"
                className="glb__nav glb__nav--prev"
                onClick={() => onNavigate((index - 1 + total) % total)}
                aria-label="Previous item"
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="glb__nav glb__nav--next"
                onClick={() => onNavigate((index + 1) % total)}
                aria-label="Next item"
              >
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        <div className="glb__info">
          <div className="glb__text">
            <span className="glb__cat">{item.category}</span>
            <h2 className="glb__title">{item.title}</h2>
            {item.description && <p>{item.description}</p>}
          </div>

          <div className="glb__side">
            <span className="glb__count">
              {String(index + 1).padStart(2, "0")} <i>/ {String(total).padStart(2, "0")}</i>
            </span>
            {item.caseStudy && (
              <Link to={`/work#${item.caseStudy}`} className="glb__link" onClick={onClose}>
                Read the case study <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}