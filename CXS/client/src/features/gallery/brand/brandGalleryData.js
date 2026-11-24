/**
 * BRAND STRATEGY & DIGITAL GROWTH GALLERY  →  /gallery/brand-strategy
 *
 * HOW TO ADD WORK: copy an item, edit it. Use `draft: true` to hide an item.
 *   id          unique, lowercase, no spaces
 *   title       shown on the card and in the viewer
 *   category    "Campaigns" | "Brand Identity" | "Social Media" | "Reports & Insights" | "Programmes"
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
  mediabuzz: "/logos/company-logo.png", // TODO: replace with the real MediaBuzz Global logo file
};

const allItems = [
  {
    id: "mediabuzz-global-programme",
    title: "MediaBuzz Global · Capacity Building and Training Programme",
    category: "Programmes",
    type: "image",
    ratio: "square",
    logo: true,
    description:
      "A training concept that helps teams apply digital tools and consistent working practices across business functions, using short demonstrations, guided exercises, and reusable templates.",
    image: LOGOS.mediabuzz,
    caseStudy: "mediabuzz-global",
  },

  /* TEMPLATE */
  {
    id: "brand-sample-campaign",
    draft: true,
    title: "Sample · Campaign Creative",
    category: "Campaigns",
    type: "image",
    ratio: "wide",
    description: "Sample item. Replace with a real campaign or brand piece.",
    image: "brand-hero",
  },
];

export const brandGallery = {
  serviceSlug: "brand-strategy-digital-growth",
  serviceName: "Brand Strategy & Digital Growth",
  categoryOrder: ["Campaigns", "Brand Identity", "Social Media", "Reports & Insights", "Programmes"],

  hero: {
    eyebrow: "Brand & Growth Gallery",
    title: "Brand and growth work, *in focus*",
    description:
      "Browse selected brand, campaign, and digital growth work produced by the CyberX Soft team.",
  },
  intro: {
    label: "Brand & growth gallery",
    title: "Selected *brand, campaign* and growth work",
    description:
      "Filter by category and open any piece to view it full size. Where a piece belongs to a published project, the viewer links to its case study.",
  },
  cta: {
    title: "Want brand and growth work like *this* for your business?",
    description:
      "Tell us what you want to build, launch, or improve. We can help define the scope and a practical starting point.",
    buttonLabel: "Book a Consultation",
    buttonPath: "/contact",
  },

  items: allItems.filter((item) => SHOW_DRAFTS || !item.draft),
};