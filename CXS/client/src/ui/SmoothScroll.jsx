import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import Lenis from "lenis";

import "lenis/dist/lenis.css";

/** Lock / unlock page scrolling (used by the mobile menu). */
export function lockScroll(locked) {
  if (window.__lenis) {
    if (locked) window.__lenis.stop();
    else window.__lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export function scrollToTarget(target, options = {}) {
  if (window.__lenis) {
    window.__lenis.scrollTo(target, { duration: 1.4, ...options });
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else if (target instanceof Element) {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

export default function SmoothScroll() {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });

    window.__lenis = lenis;

    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.__lenis;
    };
  }, [reduce]);

  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
