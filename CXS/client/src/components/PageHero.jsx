import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import Button from "../ui/Button";
import Glass3D from "../ui/Glass3D";
import { EASE, SplitTitle, imageProps } from "../ui/motion";
import { Chapter } from "../ui/SectionHead";

/**
 * Inner-page hero. Full-bleed panoramic image with a camera-style
 * dolly on scroll (zoom + drift), glass breadcrumb, split-text title.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  action = null,
  secondaryAction = null,
  image,
  position = "70% 50%",
  scene = "soft",
  compact = false,
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.32]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className={`page-hero ${compact ? "page-hero--compact" : ""}`} data-tone="dark" data-scene-root>
      <motion.div
        className="page-hero__bg"
        aria-hidden="true"
        style={reduce ? undefined : { scale, y: bgY }}
      >
        <img {...imageProps(image, { eager: true })} alt="" style={{ objectPosition: position }} />
      </motion.div>

      <div className="page-hero__shade" aria-hidden="true" />
      <div className="page-hero__fade" aria-hidden="true" />

      {scene && <Glass3D preset={scene} delay={1500} />}

      <div className="container page-hero__inner">
        <motion.div
          className="page-hero__content"
          style={reduce ? undefined : { y: textY, opacity: textOpacity }}
        >
          <motion.nav
            className="crumbs glass"
            aria-label="Breadcrumb"
            initial={reduce ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            <Link to="/" aria-label="Home">
              <Home size={14} aria-hidden="true" />
            </Link>
            {breadcrumbs.map((item) => (
              <span className="crumbs__item" key={item.label}>
                <ChevronRight size={13} aria-hidden="true" />
                {item.path ? <Link to={item.path}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
              </span>
            ))}
          </motion.nav>

          {eyebrow && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            >
              <Chapter>{eyebrow}</Chapter>
            </motion.div>
          )}

          <SplitTitle as="h1" text={title} className="page-hero__title" delay={0.25} stagger={0.055} />

          {description && (
            <motion.p
              className="page-hero__lead"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
            >
              {description}
            </motion.p>
          )}

          {(action || secondaryAction) && (
            <motion.div
              className="btn-row"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
            >
              {action && (
                <Button to={action.path} variant="primary">
                  {action.label}
                </Button>
              )}
              {secondaryAction && (
                <Button to={secondaryAction.path} variant="glass">
                  {secondaryAction.label}
                </Button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
