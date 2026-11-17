import { useEffect, useState } from "react";

import { scrollToTarget } from "../ui/SmoothScroll";

/*
 * Sticky in-page navigation for long pages. Builds itself from every
 * element with [data-nav-label][id] and highlights the current one.
 */
export default function SectionNav() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const nodes = [...document.querySelectorAll("[data-nav-label][id]")];
    const frame = requestAnimationFrame(() =>
      setItems(nodes.map((node) => ({ id: node.id, label: node.dataset.navLabel }))),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  if (items.length === 0) return <div className="section-nav-spacer" />;

  return (
    <nav className="section-nav" aria-label="On this page">
      <ul className="section-nav__list glass">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={`section-nav__btn ${active === item.id ? "is-active" : ""}`}
              aria-current={active === item.id ? "true" : undefined}
              onClick={() => scrollToTarget(document.getElementById(item.id), { offset: -90 })}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
