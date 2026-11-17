import { ArrowUpRight, Check, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../../ui/Button";
import Glass3D from "../../ui/Glass3D";
import SectionHead from "../../ui/SectionHead";
import { Item, ParallaxMedia, Reveal, Stagger, WindowReveal } from "../../ui/motion";

import "./services.css";

/* Reusable, tone-aware building blocks for every service page */

export function Block({ tone = "light", alt = false, lift = false, id, label, aurora = false, className = "", children }) {
  return (
    <section
      id={id}
      data-tone={tone}
      data-nav-label={label}
      className={`section block ${alt ? "block--alt" : ""} ${lift ? "section--lift" : ""} ${className}`}
    >
      {aurora && (
        <>
          <div className="aurora" aria-hidden="true" />
          <div className="gridlines" aria-hidden="true" />
        </>
      )}
      <div className="container">{children}</div>
    </section>
  );
}

/* Heading on the left (sticky) + content on the right */
export function SplitLayout({ head, children, className = "" }) {
  return (
    <div className={`split-layout ${className}`}>
      <div className="split-layout__head">{head}</div>
      <div className="split-layout__body">{children}</div>
    </div>
  );
}

/* Numbered cards in a responsive grid */
export function CardGrid({ items, cols = 3, icons, numbered = true, className = "", children }) {
  return (
    <Stagger className={`cards cards--${cols} ${className}`} stagger={0.08}>
      {items.map((item, index) => {
        const Icon = icons?.[index % icons.length];
        return (
          <Item key={item.id ?? item.title} className="card glass spot" y={28}>
            <div className="card__top">
              {Icon ? (
                <span className="icon-tile">
                  <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                </span>
              ) : null}
              {numbered && <span className="card__no">{String(index + 1).padStart(2, "0")}</span>}
            </div>
            <h3>{item.title}</h3>
            {item.description && <p>{item.description}</p>}
            {children?.(item, index)}
          </Item>
        );
      })}
    </Stagger>
  );
}

/* Big numbered rows (what we deliver) */
export function Rows({ items }) {
  return (
    <Stagger as="ol" className="rows" stagger={0.1}>
      {items.map((item, index) => (
        <Item as="li" key={item.id ?? item.title} className="rows__item" y={26}>
          <span className="rows__no">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </Item>
      ))}
    </Stagger>
  );
}

/* Glass pills with a check */
export function CheckChips({ items }) {
  return (
    <Stagger as="ul" className="chips" stagger={0.045}>
      {items.map((item) => (
        <Item as="li" key={item} className="chip chip--lg" y={16} blur={0}>
          <Check size={15} strokeWidth={2.4} aria-hidden="true" />
          {item}
        </Item>
      ))}
    </Stagger>
  );
}

/* Horizontal process timeline */
export function Timeline({ steps }) {
  return (
    <Stagger as="ol" className="timeline" stagger={0.12}>
      {steps.map((step, index) => (
        <Item as="li" key={step.id ?? step.title} className="timeline__step" y={26}>
          <span className="timeline__node">{String(index + 1).padStart(2, "0")}</span>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </Item>
      ))}
    </Stagger>
  );
}

/* Image band that carries a heading and a chip list */
export function Band({ image, position, label, title, description, chips, note, id }) {
  return (
    <section className="band" data-tone="dark" id={id} data-nav-label={label} data-scene-root>
      <WindowReveal className="band__frame">
        <ParallaxMedia name={image} className="media--bg" speed={0.1} position={position} />
        <div className="band__shade" aria-hidden="true" />
        <Glass3D preset="soft" />
      </WindowReveal>

      <div className="container band__inner">
        <SectionHead label={label} title={title} description={description} />
        {chips && <CheckChips items={chips} />}
        {note && (
          <Reveal as="p" className="band__note" delay={0.2}>
            {note}
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* Frosted call-out with a button */
export function Callout({ eyebrow, title, description, label = "Discuss Your Requirements", to = "/contact" }) {
  return (
    <Reveal className="callout glass" y={34} blur={0}>
      <div>
        <span className="callout__eyebrow">{eyebrow}</span>
        <h3 className="t-h3">{title}</h3>
        <p>{description}</p>
      </div>
      <Button to={to} variant="primary">
        {label}
      </Button>
    </Reveal>
  );
}

/* Overview: copy + frosted outcome list */
export function Overview({ title, paragraphs, actionLabel = "Discuss Your Requirements", outcomesTitle, outcomes, id }) {
  return (
    <Block tone="light" lift id={id} label="Overview">
      <div className="overview">
        <div className="overview__copy">
          <SectionHead label="Service overview" title={title} />
          {paragraphs.map((text, i) => (
            <Reveal as="p" className="overview__p t-lead" key={text} delay={0.15 + i * 0.08}>
              {text}
            </Reveal>
          ))}
          <Reveal delay={0.3} blur={0}>
            <Button to="/contact" variant="ink">
              {actionLabel}
            </Button>
          </Reveal>
        </div>

        <div className="overview__outcomes">
          {outcomesTitle && (
            <Reveal as="h3" className="overview__outcomes-title" blur={0} y={14}>
              {outcomesTitle}
            </Reveal>
          )}
          <Stagger className="outcomes" stagger={0.1}>
            {outcomes.map((outcome) => (
              <Item key={outcome.id ?? outcome.title} className="outcome glass spot" y={28}>
                <CheckCircle2 size={22} strokeWidth={1.7} aria-hidden="true" />
                <div>
                  <h4>{outcome.title}</h4>
                  <p>{outcome.description}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </div>
    </Block>
  );
}

export function LinkArrow({ to, children }) {
  return (
    <Link to={to} className="arrow-link">
      {children} <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}
