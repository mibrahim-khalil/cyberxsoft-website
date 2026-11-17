import { useState } from "react";

import SectionHead from "../ui/SectionHead";
import { Reveal } from "../ui/motion";
import Button from "../ui/Button";

/**
 * Accordion FAQ — sticky intro on the left, questions on the right.
 * The first question starts open.
 */
export default function FAQSection({
  items = [],
  eyebrow = "FAQ",
  title = "Frequently Asked *Questions*",
  tone = "light",
  lift = false,
  id,
}) {
  const [openId, setOpenId] = useState(items[0]?.id ?? null);

  return (
    <section
      id={id}
      className={`section faq-section ${lift ? "section--lift" : ""}`}
      data-tone={tone}
    >
      <div className="container faq-section__grid">
        <div className="faq-section__intro">
          <SectionHead label={eyebrow} title={title} />

          <Reveal delay={0.2} className="faq-section__aside">
            <p>Can’t find what you are looking for? Tell us about your requirement.</p>
            <Button to="/contact" variant={tone === "light" ? "ink" : "primary"}>
              Book a Consultation
            </Button>
          </Reveal>
        </div>

        <Reveal className="faq" delay={0.1} blur={0}>
          {items.map((item) => {
            const open = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            return (
              <div key={item.id} className={`faq__item ${open ? "faq__item--open" : ""}`}>
                <h3>
                  <button
                    type="button"
                    className="faq__trigger"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : item.id)}
                  >
                    <span>{item.question}</span>
                    <span className="faq__plus" aria-hidden="true" />
                  </button>
                </h3>
                <div id={panelId} className="faq__panel" role="region" aria-hidden={!open}>
                  <div>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
