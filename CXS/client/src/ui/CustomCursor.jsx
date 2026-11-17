import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

import { useMediaQuery } from "./motion";

const INTERACTIVE =
  "a, button, summary, label, select, [role='button'], [data-hover]";

/**
 * Custom cursor (dot + ring + optional label) and the global
 * pointer effect that drives card spotlights. Only enabled for
 * fine pointers and when reduced motion is not requested.
 */
export default function CustomCursor() {
  const reduce = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const enabled = finePointer && !reduce;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });

  const [mode, setMode] = useState("idle"); // idle | hover | label
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const lastTarget = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    if (enabled) root.classList.add("cursor-on");
    return () => root.classList.remove("cursor-on");
  }, [enabled]);

  useEffect(() => {
    const onMove = (event) => {
      // Spotlight variables for any .spot card under the pointer
      const spot = event.target.closest?.(".spot");
      if (spot) {
        const rect = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        spot.style.setProperty("--my", `${event.clientY - rect.top}px`);
      }

      if (!enabled) return;

      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target;
      if (target === lastTarget.current) return;
      lastTarget.current = target;

      const labelled = target.closest?.("[data-cursor]");
      if (labelled) {
        setMode("label");
        setLabel(labelled.getAttribute("data-cursor"));
      } else if (target.closest?.(INTERACTIVE)) {
        setMode("hover");
      } else {
        setMode("idle");
      }
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringScale = mode === "hover" ? 1.7 : mode === "label" ? 0 : 1;

  return (
    <div className={`cursor ${visible ? "cursor--visible" : ""}`} aria-hidden="true">
      <motion.div className="cursor__ring" style={{ x: ringX, y: ringY, position: "fixed" }} animate={{ scale: ringScale }} transition={{ duration: 0.25 }} />
      <motion.div className="cursor__dot" style={{ x, y, position: "fixed" }} animate={{ scale: mode === "label" ? 0 : 1 }} />
      <motion.div
        className="cursor__label"
        style={{ x: ringX, y: ringY, position: "fixed" }}
        animate={{ scale: mode === "label" ? 1 : 0, opacity: mode === "label" ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {label}
      </motion.div>
    </div>
  );
}
