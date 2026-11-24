/**
 * AI, SOFTWARE & DIGITAL SOLUTIONS GALLERY  →  /gallery/ai-software
 *
 * HOW TO ADD WORK: copy an item, edit it. Use `draft: true` to hide an item.
 *   id          unique, lowercase, no spaces
 *   title       shown on the card and in the viewer
 *   category    "Websites" | "Apps & Platforms" | "AI Solutions" | "Demos"
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

/* LOGO FILES: set the real file names from client/public/logos/ */
const LOGOS = {
  guideToPakistan: "/logos/company-logo.png", // TODO: replace with the real Guide to Pakistan logo file
  ayurEssencia: "/logos/company-logo.png", // TODO: replace with the real Ayur Essencia logo file
  belgiumPigeon: "/logos/company-logo.png", // TODO: replace with the real Belgium Elite Pigeon Auctions logo file
  lagaam: "/logos/company-logo.png", // TODO: replace with the real Lagaam logo file
};

const allItems = [
  /* ---------- Websites ---------- */
  {
    id: "guide-to-pakistan-portal",
    title: "Guide to Pakistan · Travel Discovery and Tour Enquiry Portal",
    category: "Websites",
    type: "image",
    ratio: "square",
    logo: true,
    description:
      "One online portal that brings destination guides and tour planning together, moving visitors from general research to a tour enquiry.",
    image: LOGOS.guideToPakistan,
    caseStudy: "guide-to-pakistan",
  },
  {
    id: "ayur-essencia-storefront",
    title: "Ayur Essencia · Shopify E-commerce Concept",
    category: "Websites",
    type: "image",
    ratio: "square",
    logo: true,
    description:
      "A storefront concept for a fragrance and personal-care brand, with clear collections, fuller product descriptions, and a mobile-friendly purchase journey.",
    image: LOGOS.ayurEssencia,
    caseStudy: "ayur-essencia",
  },
  {
    id: "belgium-elite-pigeon-auctions-portal",
    title: "Belgium Elite Pigeon Auctions · Catalogue and Auction Portal",
    category: "Websites",
    type: "image",
    ratio: "square",
    logo: true,
    description:
      "A phased portal plan for a Belgian racing pigeon business, starting with a branded catalogue and adding online auction operations.",
    image: LOGOS.belgiumPigeon,
    caseStudy: "belgium-elite-pigeon-auctions",
  },

  /* ---------- AI Solutions ---------- */
  {
    id: "lagaam-story-studio",
    title: "Lagaam Story Studio · AI-assisted Writing Tool",
    category: "AI Solutions",
    type: "image",
    ratio: "square",
    logo: true,
    description:
      "An AI-assisted writing tool with a writer's guide that supports work in Urdu, English, and Roman Urdu, from an initial pitch to a draft script.",
    image: LOGOS.lagaam,
    caseStudy: "lagaam",
  },

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