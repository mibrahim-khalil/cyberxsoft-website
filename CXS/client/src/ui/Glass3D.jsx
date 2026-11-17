import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

const FloatingGlass = lazy(() => import("./FloatingGlass"));

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Lazy-loaded WebGL layer. Mounts once near the viewport, is skipped
 * entirely for reduced-motion users or when WebGL is unavailable.
 * The parent should be position: relative and carry data-scene-root.
 */
export default function Glass3D({ preset = "hero", intensity = 1, className = "", delay = 0 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const near = useInView(ref, { margin: "300px", once: true });
  const [supported] = useState(() => (typeof document === "undefined" ? false : hasWebGL()));
  const [ready, setReady] = useState(delay <= 0);

  // Building the scene (environment map, physical-material shaders) occupies the
  // main thread for a second or more. Hero scenes pass a delay so the headline
  // and intro text paint first; the glass then fades in behind them.
  useEffect(() => {
    if (ready || !near) return undefined;
    const timer = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(timer);
  }, [ready, near, delay]);

  return (
    <div ref={ref} className={`glass3d ${className}`} aria-hidden="true">
      {near && ready && supported && !reduce && (
        <Suspense fallback={null}>
          <FloatingGlass preset={preset} intensity={intensity} />
        </Suspense>
      )}
    </div>
  );
}
