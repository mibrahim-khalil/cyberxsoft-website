import {
  Fragment,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";
import {
  motion,
  motionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

export const EASE = [0.22, 1, 0.36, 1];

/* -----------------------------------------------------
   Media query as an external store (no effect/setState)
----------------------------------------------------- */
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (notify) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", notify);
      return () => mql.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/* -----------------------------------------------------
   Shared pointer position (-1..1) for parallax layers
----------------------------------------------------- */
const pointer = { x: null, y: null, ready: false };

function ensurePointer() {
  if (pointer.ready || typeof window === "undefined") return;
  pointer.ready = true;
  pointer.x = motionValue(0);
  pointer.y = motionValue(0);
  window.addEventListener(
    "pointermove",
    (event) => {
      pointer.x.set((event.clientX / window.innerWidth) * 2 - 1);
      pointer.y.set((event.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true },
  );
}

export function usePointerParallax(strength = 1, spring = { stiffness: 70, damping: 20, mass: 0.6 }) {
  ensurePointer();
  const x = useSpring(useTransform(pointer.x, (v) => v * strength), spring);
  const y = useSpring(useTransform(pointer.y, (v) => v * strength), spring);
  return { x, y };
}

/* -----------------------------------------------------
   Reveal — fade / rise / de-blur when entering view
----------------------------------------------------- */
export function Reveal({
  as = "div",
  delay = 0,
  y = 28,
  blur = 6,
  duration = 0.95,
  amount = 0.2,
  className,
  children,
  ...rest
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;

  return (
    <Tag
      className={className}
      initial={
        reduce
          ? false
          : { opacity: 0, y, filter: blur ? `blur(${blur}px)` : "none" }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount, margin: "0px 0px -8% 0px" }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const groupVariants = (stagger, delay) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const itemVariants = (y, blur) => ({
  hidden: { opacity: 0, y, filter: blur ? `blur(${blur}px)` : "none" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
});

export function Stagger({
  as = "div",
  stagger = 0.09,
  delay = 0,
  amount = 0.15,
  className,
  children,
  ...rest
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;

  return (
    <Tag
      className={className}
      variants={groupVariants(stagger, delay)}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount, margin: "0px 0px -6% 0px" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Item({ as = "div", y = 26, blur = 5, className, children, ...rest }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag className={className} variants={itemVariants(y, blur)} {...rest}>
      {children}
    </Tag>
  );
}

/* -----------------------------------------------------
   SplitTitle — word-by-word mask reveal
----------------------------------------------------- */
export function parseEmphasis(text) {
  const words = [];
  String(text)
    .split(/(\*[^*]+\*|\|)/g)
    .filter(Boolean)
    .forEach((chunk) => {
      if (chunk === "|") {
        words.push({ br: true });
        return;
      }
      const em = chunk.startsWith("*") && chunk.endsWith("*");
      const clean = em ? chunk.slice(1, -1) : chunk;
      clean
        .split(/\s+/)
        .filter(Boolean)
        .forEach((w) => words.push({ w, em }));
    });
  return words;
}

export function plainText(text) {
  return String(text).replace(/\*/g, "").replace(/\|/g, " ");
}

export function SplitTitle({
  as: Tag = "h2",
  text,
  className,
  delay = 0,
  stagger = 0.05,
  id,
}) {
  const reduce = useReducedMotion();
  const words = useMemo(() => parseEmphasis(text), [text]);

  return (
    <Tag className={`split ${className || ""}`} id={id} aria-label={plainText(text)}>
      <motion.span
        className="split__inner"
        aria-hidden="true"
        initial={reduce ? "show" : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
      >
        {words.map((item, index) =>
          item.br ? (
            <br key={`br-${index}`} />
          ) : (
          <Fragment key={`${item.w}-${index}`}>
            <span className="split__mask">
              <motion.span
                className="split__word"
                variants={{
                  hidden: { y: "118%", rotate: 4 },
                  show: { y: 0, rotate: 0, transition: { duration: 1, ease: EASE } },
                }}
              >
                {item.w}
              </motion.span>
            </span>{" "}
          </Fragment>
          ),
        )}
      </motion.span>
    </Tag>
  );
}

/* -----------------------------------------------------
   Picture helpers (Smart Cloudinary CDN Connected)
----------------------------------------------------- */
const USE_CLOUDINARY = true; 
const CLOUDINARY_BASE = "https://res.cloudinary.com/uao8z2fi/image/upload/f_auto,q_auto";

export function imageProps(name, { sizes = "100vw", eager = false } = {}) {
  if (!name) return {};

  // Clean the file path (removes /images/ or /logos/)
  const cleanName = String(name).replace(/^\/?(images|logos)\//, "");
  
  // Check if file is a PNG logo or standard WebP image
  const hasExtension = /\.(png|jpg|jpeg|svg|webp)$/i.test(cleanName);
  const baseName = hasExtension ? cleanName.replace(/\.[^/.]+$/, "") : cleanName;
  const ext = hasExtension ? cleanName.match(/\.[^/.]+$/)[0] : ".webp";

  if (USE_CLOUDINARY) {
    return {
      src: `${CLOUDINARY_BASE}/${baseName}${ext}`,
      srcSet: hasExtension 
        ? undefined // Logos don't need srcSet
        : `${CLOUDINARY_BASE}/${baseName}-sm.webp 960w, ${CLOUDINARY_BASE}/${baseName}.webp 1920w`,
      sizes: hasExtension ? undefined : sizes,
      loading: eager ? "eager" : "lazy",
      decoding: "async",
      fetchPriority: eager ? "high" : "auto",
    };
  }

  // Local fallback
  return {
    src: hasExtension ? `/logos/${cleanName}` : `/images/${name}.webp`,
    sizes,
    loading: eager ? "eager" : "lazy",
    decoding: "async",
  };
}

/* Image that drifts as the page scrolls */
export function ParallaxMedia({
  name,
  alt = "",
  speed = 0.12,
  scale,
  position = "70% 50%",
  className = "",
  eager = false,
  sizes,
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : [`${-speed * 100}%`, `${speed * 100}%`],
  );

  return (
    <div ref={ref} className={`media ${className}`}>
      <motion.img
        {...imageProps(name, { eager, sizes })}
        alt={alt}
        style={{ y, scale: reduce ? 1 : (scale ?? 1 + speed * 2 + 0.02), objectPosition: position }}
      />
    </div>
  );
}

/* Frame that “opens” (clip-path) while it scrolls into view */
export function WindowReveal({ children, className = "", from = 8 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 96%", "start 38%"],
  });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      `inset(${from}% ${from + 3}% ${from}% ${from + 3}% round 44px)`,
      "inset(0% 0% 0% 0% round 28px)",
    ],
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { clipPath }}
    >
      {children}
    </motion.div>
  );
}

/* -----------------------------------------------------
   Magnetic wrapper — element leans toward the pointer
----------------------------------------------------- */
export function Magnetic({ children, strength = 0.28, className }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const ref = useRef(null);

  const onMove = (event) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: "inline-flex" }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.span>
  );
}

/* -----------------------------------------------------
   3D tilt card with moving glare
----------------------------------------------------- */
export function TiltCard({ children, className = "", max = 8, as = "div", ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 16 });
  const sry = useSpring(ry, { stiffness: 160, damping: 16 });
  const ref = useRef(null);

  const onMove = (event) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}