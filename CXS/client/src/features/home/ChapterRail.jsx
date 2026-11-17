import { useEffect, useState } from "react";

import { scrollToTarget } from "../../ui/SmoothScroll";

/*
 * Side rail that shows where the visitor is in the story.
 * Reads every element carrying data-chapter inside the page.
 */
export default function ChapterRail() {
  const [chapters, setChapters] = useState([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const nodes = [...document.querySelectorAll("[data-chapter][id]")];
    const list = [
      { id: "top", label: "Introduction" },
      ...nodes.map((node) => ({ id: node.id, label: node.dataset.chapter })),
    ];
    const frame = requestAnimationFrame(() => setChapters(list));

    const targets = [document.getElementById("top"), ...nodes].filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    targets.forEach((node) => observer.observe(node));

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <nav className="chapter-rail" aria-label="Page chapters">
      {chapters.map((chapter) => (
        <button
          key={chapter.id}
          type="button"
          className={`chapter-rail__dot ${active === chapter.id ? "is-active" : ""}`}
          aria-label={`Go to ${chapter.label}`}
          aria-current={active === chapter.id}
          onClick={() => {
            const el = document.getElementById(chapter.id);
            if (el) scrollToTarget(el, { offset: chapter.id === "capabilities" ? 0 : -40 });
          }}
        >
          <span>{chapter.label}</span>
        </button>
      ))}
    </nav>
  );
}
