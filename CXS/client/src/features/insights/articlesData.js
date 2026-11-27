/*
 * Article list. The text of each article lives in its own file:
 *   src/features/insights/articles/<slug>.js
 * A card shows "Read article" only when that file exists.
 */

const loaders = import.meta.glob("./articles/*.js");

const present = new Set(
  Object.keys(loaders).map((path) => path.split("/").pop().replace(/\.js$/, "")),
);

export const articles = [
  {
    id: 1,
    slug: "where-ai-creates-practical-value",
    category: "AI & Automation",
    title: "Where AI Can Create Practical Value in a Mid-Sized Organization",
    excerpt:
      "A decision framework for selecting AI use cases based on process friction, data readiness, risk, and measurable business benefit.",
    readTime: "5 min read",
    date: "",
  },
  {
    id: 2,
    slug: "before-replacing-business-critical-software",
    category: "Software & Platforms",
    title: "What to Assess Before Replacing a Business-Critical Software System",
    excerpt:
      "A practical checklist covering users, integrations, data, controls, migration, adoption, and operating continuity before replacing a critical system.",
    readTime: "5 min read",
    date: "",
  },
  {
    id: 3,
    slug: "cybersecurity-priorities-growing-organizations",
    category: "Cybersecurity & Governance",
    title: "Cybersecurity Priorities for Growing Organizations",
    excerpt:
      "A management-level view of identity, backups, endpoints, cloud configuration, monitoring, suppliers, and response readiness.",
    readTime: "5 min read",
    date: "",
  },
  {
    id: 4,
    slug: "why-dashboards-fail-to-improve-decisions",
    category: "Data & Business Intelligence",
    title: "Why Dashboards Fail to Improve Decisions",
    excerpt:
      "How inconsistent definitions, weak data ownership, delayed pipelines, and poor context can undermine business intelligence and management reporting.",
    readTime: "5 min read",
    date: "",
  },
  {
    id: 5,
    slug: "brand-system-that-scales-across-channels",
    category: "Brand Growth & Creative",
    title: "Building a Brand System That Can Scale Across Channels",
    excerpt:
      "How positioning, messaging, design rules, templates, and production governance can improve consistency and creative delivery speed.",
    readTime: "5 min read",
    date: "",
  },
  {
    id: 6,
    slug: "project-team-vs-staff-augmentation",
    category: "Delivery & Talent",
    title: "Choosing Between a Project Team and Staff Augmentation",
    excerpt:
      "How scope clarity, internal ownership, urgency, duration, and delivery risk should shape the engagement model.",
    readTime: "5 min read",
    date: "",
  },
];

export const articleBySlug = Object.fromEntries(articles.map((a) => [a.slug, a]));
export const articleById = Object.fromEntries(articles.map((a) => [a.id, a]));

/* True once the article's text file has been added */
export const isPublished = (slug) => Boolean(articleBySlug[slug]) && present.has(slug);

/* Loads the article text only when its page is opened */
export const loadBody = (slug) => loaders[`./articles/${slug}.js`]();