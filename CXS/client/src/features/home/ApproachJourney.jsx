import { useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "motion/react";

import SectionHead from "../../ui/SectionHead";
import { Reveal } from "../../ui/motion";
import { homeApproachSteps } from "./homeData";

function Step({ step }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });

  return (
    <li ref={ref} className={`journey__step ${inView ? "is-current" : ""}`}>
      <span className="journey__node" aria-hidden="true" />
      <span className="journey__no" aria-hidden="true">
        {step.number}
      </span>
      <div className="journey__body">
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </div>
    </li>
  );
}

/* A vertical journey whose line draws itself as you scroll */
export default function ApproachJourney() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 55%"] });
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <section className="section section--lift journey" data-tone="dark" id="approach" data-chapter="Approach">
      <div className="aurora" aria-hidden="true" />
      <div className="gridlines" aria-hidden="true" />

      <div className="container journey__grid">
        <div className="journey__intro">
          <SectionHead
            label="Our approach"
            title="A practical path from *requirement* to result"
          />
          <Reveal as="p" className="t-lead" delay={0.2}>
            We move from business context and scope definition through visible delivery, deployment,
            handover, and continuous improvement.
          </Reveal>
        </div>

        <div className="journey__track">
          <span className="journey__rail" aria-hidden="true">
            <motion.span style={{ scaleY: draw }} />
          </span>
          <ol ref={listRef} className="journey__list">
            {homeApproachSteps.map((step) => (
              <Step key={step.id} step={step} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
