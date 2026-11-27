import { services } from "../services/servicesData";
import { publishedCaseStudies } from "../case-studies/workData";
import { articleBySlug } from "../insights/articlesData";

const PAGE_KEY = "cxs:last-page";
const LEAD_KEY = "cxs:lead";
const TALENT_SLUG = "talent-augmentation-delivery-support";

const serviceBySlug = Object.fromEntries(services.map((service) => [service.slug, service]));

/* Which service each case study belongs to (same as the galleries) */
const studyService = {
  "pem-air": "data-cybersecurity-digital-governance",
  "zara-aur-mimo": "creative-media-design-animation",
  "khwabon-wala-darwaza": "creative-media-design-animation",
  "mod-it-department": "creative-media-design-animation",
  "guide-to-pakistan": "ai-software-digital-solutions",
  lagaam: "ai-software-digital-solutions",
  "ayur-essencia": "ai-software-digital-solutions",
  "mediabuzz-global": "brand-strategy-digital-growth",
  "belgium-elite-pigeon-auctions": "ai-software-digital-solutions",
};

/* Which service each insight category points to */
const categoryService = {
  "AI & Automation": "ai-software-digital-solutions",
  "Software & Platforms": "ai-software-digital-solutions",
  "Cybersecurity & Governance": "data-cybersecurity-digital-governance",
  "Data & Business Intelligence": "data-cybersecurity-digital-governance",
  "Brand Growth & Creative": "brand-strategy-digital-growth",
  "Delivery & Talent": TALENT_SLUG,
};

/* Gallery pages and the service each one belongs to */
const galleryToService = {
  "/gallery": "creative-media-design-animation",
  "/gallery/brand-strategy": "brand-strategy-digital-growth",
  "/gallery/ai-software": "ai-software-digital-solutions",
  "/gallery/data-cybersecurity": "data-cybersecurity-digital-governance",
};

const pageLabels = {
  "/": "Home page",
  "/services": "Services overview",
  "/work": "Case studies",
  "/case-studies": "Case studies",
  "/insights": "Insights",
  "/about": "About us",
  "/privacy-policy": "Privacy Policy",
  "/terms-and-conditions": "Terms & Conditions",
  "/cookie-policy": "Cookie Policy",
  "/disclaimer": "Disclaimer",
};

const normalize = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const cleanPath = (path) => (path ? path.replace(/\/+$/, "") || "/" : "");

export function serviceLabel(slug) {
  if (slug === TALENT_SLUG) return "Staff Augmentation & Delivery Support";
  return serviceBySlug[slug]?.name ?? "";
}

function findCaseStudy(text) {
  const wanted = normalize(text);
  if (!wanted) return null;
  return (
    publishedCaseStudies.find(
      (study) =>
        normalize(study.title) === wanted ||
        normalize(study.name) === wanted ||
        normalize(study.client) === wanted,
    ) || null
  );
}

/* Name (and service, if any) for a page address */
function pageInfo(path) {
  if (!path) return { label: "", serviceSlug: "" };

  if (path.startsWith("/services/")) {
    const slug = path.split("/").pop();
    if (serviceBySlug[slug]) {
      return { label: `${serviceLabel(slug)} page`, serviceSlug: slug };
    }
  }

  if (path.startsWith("/insights/")) {
    const article = articleBySlug[path.split("/").pop()];
    return {
      label: "Insights article",
      serviceSlug: article ? categoryService[article.category] || "" : "",
    };
  }

  if (galleryToService[path]) {
    const slug = galleryToService[path];
    return { label: `${serviceLabel(slug)} gallery`, serviceSlug: slug };
  }

  if (pageLabels[path]) return { label: pageLabels[path], serviceSlug: "" };

  return { label: `Page ${path}`, serviceSlug: "" };
}

/* ---------- Storage ---------- */

function store(key, value) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    /* storage can be blocked by the browser; the form still works */
  }
}

function read(key) {
  try {
    return window.sessionStorage.getItem(key) || "";
  } catch {
    return "";
  }
}

function remove(key) {
  try {
    window.sessionStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

function readLead() {
  try {
    return JSON.parse(read(LEAD_KEY)) || null;
  } catch {
    return null;
  }
}

/* Called on every page change. Any older button click is forgotten once the
   visitor lands on a new page. The contact page itself is never stored. */
export function rememberPage(pathname) {
  if (pathname.startsWith("/contact")) return;
  store(PAGE_KEY, pathname);
  remove(LEAD_KEY);
}

/* ---------- Click tracking ---------- */

function headingSpot(link) {
  // Buttons inside these areas just report the page name
  if (link.closest(".site-header, .site-footer, header, footer, nav, .page-hero, .cta")) {
    return "";
  }

  const main = document.getElementById("main");
  let element = link.parentElement;

  while (element && element !== main && element !== document.body) {
    const heading = element.querySelector("h2, h3, h4");
    if (heading) {
      return heading.textContent.replace(/\s+/g, " ").trim().slice(0, 90);
    }
    element = element.parentElement;
  }

  return "";
}

function onClick(event) {
  const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
  if (!link) return;

  let url;
  try {
    url = new URL(link.href, window.location.origin);
  } catch {
    return;
  }

  if (url.origin !== window.location.origin) return;
  if (cleanPath(url.pathname) !== "/contact") return;

  const explicit = link.closest("[data-lead]")?.getAttribute("data-lead");
  const spot = explicit || headingSpot(link);

  store(
    LEAD_KEY,
    JSON.stringify({ path: cleanPath(window.location.pathname), spot }),
  );
}

/* Watches every link to /contact on the whole site. Returns a cleanup function. */
export function trackContactClicks() {
  document.addEventListener("click", onClick, true);
  return () => document.removeEventListener("click", onClick, true);
}

/* ---------- Detection ---------- */

/**
 * Works out where the visitor came from.
 * Returns { path, spot, label, serviceSlug }.
 */
export function detectSource(serviceParam) {
  const lead = readLead();
  const path = cleanPath(lead?.path || read(PAGE_KEY));
  const spot = lead?.spot || "";

  const page = pageInfo(path);
  let label = page.label;
  let serviceSlug = page.serviceSlug;

  if (spot) {
    const study = findCaseStudy(spot);
    if (study) {
      label = `${label || "Case studies"} › ${study.title}`;
      serviceSlug = serviceSlug || studyService[study.id] || "";
    } else if (normalize(spot) !== normalize(label)) {
      label = label ? `${label} › ${spot}` : spot;
    }
  }

  /* An explicit /contact?service=slug always wins for the service chip */
  if (serviceParam && serviceBySlug[serviceParam]) {
    serviceSlug = serviceParam;
    if (!label) label = `${serviceLabel(serviceParam)} (from a button)`;
  }

  if (!label) label = "Direct visit";

  return { path, spot, label, serviceSlug };
}