import { useEffect, useState } from "react";

import PageHero from "../../components/PageHero";
import { Reveal } from "../../ui/motion";
import { scrollToTarget } from "../../ui/SmoothScroll";
import { pageMedia } from "../../config/media";

import NotFoundPage from "../../app/NotFoundPage";
import { getLegalPage } from "./legalData";

import "./legal.css";

const slugify = (text, index) => `s${index + 1}-${text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

export default function LegalPage({ legalSlug }) {
  const page = getLegalPage(legalSlug);
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!page) return undefined;
    const nodes = [...document.querySelectorAll(".legal-section")];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-30% 0px -60% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [page]);

  if (!page) return <NotFoundPage />;

  return (
    <>
      <PageHero
        compact
        scene={null}
        eyebrow={page.eyebrow}
        title={page.title}
        breadcrumbs={[{ label: page.title }]}
        image={pageMedia.contact}
        position="85% 40%"
      />

      <section className="section section--lift legal" data-tone="light">
        <div className="container legal__grid">
          <nav className="legal__toc" aria-label="On this page">
            <span className="legal__toc-title">On this page</span>
            <ol>
              {page.sections.map((section, index) => {
                const id = slugify(section.title, index);
                return (
                  <li key={id}>
                    <button
                      type="button"
                      className={active === id ? "is-active" : ""}
                      onClick={() => scrollToTarget(document.getElementById(id), { offset: -100 })}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {section.title}
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="legal__content">
            <p className="legal__updated">Last updated: {page.updated}</p>
            <p className="legal__intro t-lead">{page.intro}</p>

            {page.sections.map((section, index) => (
              <Reveal as="article" key={section.title} id={slugify(section.title, index)} className="legal-section" y={22} blur={0}>
                <h2>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {section.title}
                </h2>

                {section.paragraphs?.map((paragraph, i) => (
                  <p key={`${section.title}-p-${i}`}>{paragraph}</p>
                ))}

                {section.bullets?.length > 0 && (
                  <ul>
                    {section.bullets.map((bullet, i) => (
                      <li key={`${section.title}-b-${i}`}>
                        {bullet.label && <strong>{bullet.label}: </strong>}
                        {bullet.text}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
