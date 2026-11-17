import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import Button from "../../ui/Button";
import Glass3D from "../../ui/Glass3D";
import { Chapter } from "../../ui/SectionHead";
import { EASE, SplitTitle, imageProps, usePointerParallax } from "../../ui/motion";
import { pageMedia } from "../../config/media";
import { services } from "../services/servicesData";

/* Short labels for the floating capability chips */
const chips = [
  { slug: "ai-software-digital-solutions", label: "AI & Software", depth: 1.0, top: "4%", left: "30%" },
  { slug: "data-cybersecurity-digital-governance", label: "Data & Security", depth: 1.6, top: "27%", left: "62%" },
  { slug: "brand-strategy-digital-growth", label: "Brand & Growth", depth: 0.8, top: "50%", left: "18%" },
  { slug: "creative-media-design-animation", label: "Creative & Motion", depth: 1.4, top: "70%", left: "56%" },
  { slug: "talent-augmentation-delivery-support", label: "Talent & Delivery", depth: 1.1, top: "90%", left: "26%" },
];

function FloatingChip({ chip, index }) {
  const service = services.find((s) => s.slug === chip.slug);
  const Icon = service?.icon;
  const { x, y } = usePointerParallax(chip.depth * 18);

  return (
    <motion.div
      className="hero-chip-wrap"
      style={{ top: chip.top, left: chip.left, x, y }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.1 + index * 0.12, duration: 0.9, ease: EASE }}
    >
      <Link
        to={`/services/${chip.slug}`}
        className="hero-chip glass"
        style={{ animationDelay: `${index * -1.3}s` }}
      >
        <span className="hero-chip__icon">{Icon && <Icon size={18} strokeWidth={1.8} aria-hidden="true" />}</span>
        <span>{chip.label}</span>
        <ArrowUpRight size={15} aria-hidden="true" />
      </Link>
    </motion.div>
  );
}

export default function HomeHero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  /* Camera-style dolly: image pushes in and drifts while the copy lifts away */
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.36]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section ref={ref} className="home-hero" data-tone="dark" data-scene-root id="top">
      <motion.div className="home-hero__bg" aria-hidden="true" style={reduce ? undefined : { scale, y: bgY }}>
        <img {...imageProps(pageMedia.home, { eager: true })} alt="" />
      </motion.div>
      <div className="home-hero__shade" aria-hidden="true" />
      <div className="page-hero__fade" aria-hidden="true" />

      <Glass3D preset="hero" delay={2000} />

      <div className="container home-hero__grid">
        <motion.div className="home-hero__copy" style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          >
            <Chapter>Technology · Creative · Delivery</Chapter>
          </motion.div>

          <SplitTitle
            as="h1"
            text="Technology and Creative Capability|*Built Around Your Business*"
            className="home-hero__title"
            delay={0.3}
            stagger={0.06}
          />

          <motion.p
            className="home-hero__lead"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.95 }}
          >
            CyberX Soft helps organizations design, build, secure, and scale digital solutions. Our
            teams bring together software, AI, data, cybersecurity, brand growth, creative
            production, and specialist delivery support under one accountable engagement.
          </motion.p>

          <motion.div
            className="btn-row"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
          >
            <Button to="/services" variant="primary">
              Explore Our Services
            </Button>
            <Button to="/contact" variant="glass">
              Book a Consultation
            </Button>
          </motion.div>
        </motion.div>

        <div className="home-hero__chips" aria-label="Service areas">
          {chips.map((chip, index) => (
            <FloatingChip key={chip.slug} chip={chip} index={index} />
          ))}
        </div>
      </div>

      <motion.div
        className="home-hero__cue"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <span>Scroll</span>
        <i />
      </motion.div>
    </section>
  );
}
