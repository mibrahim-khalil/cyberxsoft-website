import { Reveal, SplitTitle } from "./motion";

/* Section label: a plain pill, no numbering and no rule line */
export function Chapter({ children, className = "" }) {
  return <span className={`chapter ${className}`}>{children}</span>;
}

/**
 * Standard section heading: chapter label, split-text title, description.
 * Wrap emphasis in *asterisks* to get the serif accent word.
 */
export default function SectionHead({
  label,
  title,
  description,
  center = false,
  as = "h2",
  className = "",
  titleClass = "",
}) {
  return (
    <div className={`sh ${center ? "sh--center" : ""} ${className}`}>
      {label && (
        <Reveal blur={0} y={14}>
          <Chapter>{label}</Chapter>
        </Reveal>
      )}

      <SplitTitle as={as} text={title} className={`sh__title ${titleClass}`} delay={0.05} />

      {description && (
        <Reveal as="p" className="sh__desc" delay={0.25} y={18}>
          {description}
        </Reveal>
      )}
    </div>
  );
}
