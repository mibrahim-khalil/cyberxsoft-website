/**
 * AI, SOFTWARE & DIGITAL SOLUTIONS GALLERY  →  /gallery/ai-software
 *
 * HOW TO ADD WORK: copy the template item, edit it, and delete `draft: true`.
 *   id          unique, lowercase, no spaces
 *   title       shown on the card and in the viewer
 *   category    "Websites" | "Apps & Platforms" | "AI Solutions" | "Demos"
 *               (a new name automatically gets its own filter button)
 *   type        "image" or "video"
 *   ratio       "wide" | "portrait" | "square"
 *   image       (type "image") Cloudinary public ID
 *   video       (type "video") { source: "youtube", id: "VIDEO_ID" }
 *               or { source: "cloudinary", id: "..." } or { source: "file", src: "https://..." }
 *   caseStudy   (optional) id from workData.js
 *   draft       true = hidden from the live site
 *
 * To preview drafts locally set SHOW_DRAFTS to true. Set it back to false before committing.
 */

const SHOW_DRAFTS = false;

const allItems = [
  /* TEMPLATE */
  {
    id: "software-sample-platform",
    draft: true,
    title: "Sample · Platform Screens",
    category: "Apps & Platforms",
    type: "image",
    ratio: "wide",
    description: "Sample item. Replace with a real product screenshot or demo.",
    image: "software-hero",
    // caseStudy: "case-study-id-from-workData",
  },
];

export const aiGallery = {
  serviceSlug: "ai-software-digital-solutions",
  serviceName: "AI, Software & Digital Solutions",
  categoryOrder: ["Websites", "Apps & Platforms", "AI Solutions", "Demos"],

  hero: {
    eyebrow: "Software Gallery",
    title: "Software and AI work, *in action*",
    description:
      "Browse selected software, platform, and AI-enabled solutions built by the CyberX Soft team.",
  },
  intro: {
    label: "Software & AI gallery",
    title: "Selected *software, platform* and AI work",
    description:
      "Filter by category and open any piece to view it full size or watch it. Where a piece belongs to a published project, the viewer links to its case study.",
  },
  cta: {
    title: "Want software or AI solutions like *these* for your organization?",
    description:
      "Tell us what you want to build, launch, or improve. We can help define the scope and a practical starting point.",
    buttonLabel: "Book a Consultation",
    buttonPath: "/contact",
  },

  items: allItems.filter((item) => SHOW_DRAFTS || !item.draft),
};