/**
 * DATA, CYBERSECURITY & DIGITAL GOVERNANCE GALLERY  →  /gallery/data-cybersecurity
 *
 * Do NOT publish anything that shows confidential client or security details.
 *
 * HOW TO ADD WORK: copy an item, edit it. Use `draft: true` to hide an item.
 *   id          unique, lowercase, no spaces
 *   title       shown on the card and in the viewer
 *   category    "Dashboards" | "Assessments" | "Frameworks" | "Awareness"
 *               (a new name automatically gets its own filter button)
 *   type        "image" or "video"
 *   ratio       "wide" | "portrait" | "square"
 *   image       (type "image") Cloudinary public ID, full URL, or a site path like "/logos/x.png"
 *   logo        true = show the whole image on a light card (use for logos)
 *   video       (type "video") { source: "youtube", id: "VIDEO_ID" }
 *   caseStudy   (optional) id from workData.js
 *   draft       true = hidden from the live site
 *
 * To preview drafts locally set SHOW_DRAFTS to true. Set it back to false before committing.
 */

const SHOW_DRAFTS = false;

/* LOGO FILES: set the real file name from client/public/logos/ */
const LOGOS = {
  pemAir: "/logos/company-logo.png", // TODO: replace with the real Pem-Air logo file
};

const allItems = [
  {
    id: "pem-air-sap-assessment",
    title: "Pem-Air · SAP Business One Assessment and Gap Analysis",
    category: "Assessments",
    type: "image",
    ratio: "square",
    logo: true,
    description:
      "A six-week discovery and gap analysis of how SAP Business One supports aircraft engine overhaul, producing a gap report, a phased improvement roadmap, and a customised management dashboard.",
    image: LOGOS.pemAir,
    caseStudy: "pem-air",
  },

  /* TEMPLATE */
  {
    id: "data-sample-dashboard",
    draft: true,
    title: "Sample · Dashboard Visual",
    category: "Dashboards",
    type: "image",
    ratio: "wide",
    description: "Sample item. Replace with a real, non-confidential dashboard or framework visual.",
    image: "data-hero",
  },
];

export const dataGallery = {
  serviceSlug: "data-cybersecurity-digital-governance",
  serviceName: "Data, Cybersecurity & Digital Governance",
  categoryOrder: ["Dashboards", "Assessments", "Frameworks", "Awareness"],

  hero: {
    eyebrow: "Data & Security Gallery",
    title: "Data and security work, *made visible*",
    description:
      "Browse selected data, cybersecurity, and digital governance work from the CyberX Soft team.",
  },
  intro: {
    label: "Data & security gallery",
    title: "Selected *data, security* and governance work",
    description:
      "Filter by category and open any piece to view it full size. Where a piece belongs to a published project, the viewer links to its case study.",
  },
  cta: {
    title: "Want data and security work like *this* for your organization?",
    description:
      "Tell us what you want to build, launch, or improve. We can help define the scope and a practical starting point.",
    buttonLabel: "Book a Consultation",
    buttonPath: "/contact",
  },

  items: allItems.filter((item) => SHOW_DRAFTS || !item.draft),
};