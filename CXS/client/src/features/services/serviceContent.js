/*
 * Page copy for the four standard service pages.
 * Source: CEO website content brief (headings re-cased, *word* = serif accent).
 * Lists live in the existing *Data.js files and are unchanged.
 */

import * as brand from "./brandStrategyData";
import * as creative from "./creativeMediaData";
import * as software from "./aiSoftwareData";
import * as data from "./dataCybersecurityData";

const sharedCta = {
  title: "Discuss your *requirements*",
  description:
    "Share the challenge, timeline, current capabilities, and expected outcome. We will recommend a practical starting point and engagement model.",
};

const pick = (mod, prefix) => ({
  outcomes: mod[`${prefix}Outcomes`],
  audiences: mod[`${prefix}Audiences`],
  useCases: mod[`${prefix}UseCases`],
  coreServices: mod[`${prefix}CoreServices`],
  capabilities: mod[`${prefix}Capabilities`],
  deliverables: mod[`${prefix}Deliverables`],
  engagementOptions: mod[`${prefix}EngagementOptions`],
  process: mod[`${prefix}Process`],
  faqs: mod[`${prefix}Faqs`],
});

export const serviceContent = {
  "brand-strategy-digital-growth": {
    name: "Brand Strategy & Digital Growth",
    hero: {
      title: "Build a clearer brand and a more *accountable growth engine*",
      description:
        "We combine market understanding, positioning, campaign strategy, performance marketing, content planning, and analytics to help organizations reach the right audience and improve commercial results.",
    },
    overview: {
      title: "Connect brand decisions to *growth priorities*",
      paragraphs: [
        "A strong brand gives customers a clear reason to choose you. A disciplined growth programme then turns that position into campaigns, content, channels, and measurable demand.",
        "CyberX Soft brings these activities together so strategy and execution reinforce each other.",
      ],
    },
    audience: {
      title: "For teams that need clearer positioning and *better growth decisions*",
      description:
        "This service is designed for organizations that need stronger alignment between brand strategy, marketing activity, and commercial priorities.",
    },
    useCases: {
      title: "Recognize the signals that strategy and growth need to *reconnect*",
      description:
        "The service becomes especially useful when customers, teams, or management are struggling with clarity, consistency, conversion, or performance visibility.",
    },
    core: {
      title: "What we *deliver*",
      description:
        "The work can combine positioning, digital strategy, campaign planning, content direction, performance marketing, and measurement.",
    },
    capabilities: {
      description:
        "The exact mix depends on the requirement, internal capability, commercial priorities, and stage of the engagement.",
    },
    deliverables: {
      title: "Practical outputs *your team can use*",
      description:
        "Deliverables are agreed according to the engagement, but may include the following strategy, campaign, conversion, and measurement outputs.",
    },
    engagement: {
      title: "Choose a starting point *that fits the requirement*",
      description:
        "The right structure depends on scope clarity, internal ownership, required skills, urgency, and the level of delivery responsibility CyberX Soft is expected to accept.",
    },
    callout: {
      eyebrow: "Not sure where to begin?",
      title: "Start with the business challenge",
      description:
        "Share the objective, timeline, current capabilities, and expected outcome. We can help define a practical starting point and engagement model.",
    },
    process: {
      title: "How we *work*",
      description:
        "The engagement begins with the objective, current environment, users, constraints, risks, and evidence of success before scope and delivery responsibilities are agreed.",
    },
    faqTitle: "Brand Strategy & Digital Growth *FAQs*",
    cta: sharedCta,
    ...{ data: pick(brand, "brandStrategy") },
  },

  "creative-media-design-animation": {
    name: "Creative Media Design and Animation",
    hero: {
      title: "Creative work that makes complex ideas *clear and memorable*",
      description:
        "Our designers, animators, writers, and producers translate strategy into brand systems, campaigns, interfaces, video, animation, and digital content designed for the channels where your audience engages.",
    },
    overview: {
      title: "Create with a *clear communication objective*",
      paragraphs: [
        "Effective creative work begins with the audience, message, and desired response.",
        "We establish the concept and visual system first, then apply it consistently across digital channels, campaigns, presentations, products, and ongoing content.",
      ],
    },
    audience: {
      title: "For teams with ongoing *creative and communication needs*",
      description:
        "This service is suited to organizations that need stronger visual consistency, campaign production, motion, video, design, or recurring content support.",
    },
    useCases: {
      title: "Recognize when creative delivery needs *more structure*",
      description:
        "The service becomes useful when brand consistency, complex communication, campaign production, or recurring creative demand begins to strain internal capacity.",
    },
    core: {
      title: "What we *deliver*",
      description:
        "Creative delivery can combine brand identity, campaign design, motion, animation, video, digital experience, and scalable content production.",
    },
    capabilities: {
      description:
        "The exact mix depends on the communication objective, channels, production requirements, internal capability, and expected volume of ongoing creative work.",
    },
    deliverables: {
      title: "Practical creative outputs for *reuse and delivery*",
      description:
        "Deliverables are agreed for each engagement but can include strategy, design systems, production assets, motion, video, templates, and structured handover materials.",
    },
    engagement: {
      title: "Choose a creative delivery model *that fits the work*",
      description:
        "The right structure depends on the clarity of the brief, required skills, production volume, internal ownership, urgency, and whether support is one-off or ongoing.",
    },
    callout: {
      eyebrow: "Recurring creative support",
      title: "Need a dedicated creative resource or pod?",
      description:
        "Designers, editors, motion specialists, animators, creative producers, and AI-assisted content professionals can be assigned individually or combined into a recurring production team.",
    },
    process: {
      title: "How we *work*",
      description:
        "Creative work begins with the communication objective and audience before concept development, production, review, and handover.",
    },
    faqTitle: "Creative Media Design and Animation *FAQs*",
    cta: sharedCta,
    data: pick(creative, "creativeMedia"),
  },

  "ai-software-digital-solutions": {
    name: "AI Software and Digital Solutions",
    hero: {
      title: "Build digital solutions that fit *the way your business works*",
      description:
        "CyberX Soft designs and develops software, AI-enabled workflows, web and mobile products, integrations, and digital platforms around real operational needs, user requirements, and measurable outcomes.",
    },
    overview: {
      title: "Start with the problem *before selecting the technology*",
      paragraphs: [
        "Good software reduces friction, improves visibility, and supports better decisions.",
        "We work from discovery and architecture through design, engineering, integration, testing, deployment, and support so the solution remains usable, secure, and maintainable.",
      ],
    },
    audience: {
      title: "For teams building, modernizing, or *connecting digital products*",
      description:
        "This service is designed for organizations creating new digital products, improving internal systems, integrating platforms, or validating practical AI opportunities.",
    },
    useCases: {
      title: "Recognize when the technology *needs to change*",
      description:
        "The service becomes useful when existing systems, workflows, applications, or product ideas are no longer supporting the way the organization needs to operate.",
    },
    core: {
      title: "What we *deliver*",
      description:
        "The work can combine software engineering, AI and automation, web and mobile development, integration, and enterprise platform delivery.",
    },
    capabilities: {
      description:
        "The exact mix depends on the problem, users, architecture, current systems, security needs, data, integrations, and delivery responsibilities.",
    },
    deliverables: {
      title: "Practical outputs from *discovery through release*",
      description:
        "Deliverables depend on the engagement but can cover discovery, architecture, working software, testing, documentation, release planning, and continuing improvement.",
    },
    engagement: {
      title: "Choose a delivery model *that fits the requirement*",
      description:
        "The right model depends on scope clarity, internal ownership, required capabilities, urgency, security, and the level of delivery responsibility CyberX Soft is expected to accept.",
    },
    callout: {
      eyebrow: "Discovery first",
      title: "Not every requirement should start with development",
      description:
        "When users, integrations, architecture, data, risk, or acceptance criteria are still unclear, a focused discovery can reduce uncertainty before larger implementation work begins.",
    },
    process: {
      title: "How we *work*",
      description:
        "The engagement begins with the objective, users, current environment, risks, constraints, and evidence of success before scope and technical direction are agreed.",
    },
    faqTitle: "AI Software and Digital Solutions *FAQs*",
    cta: sharedCta,
    data: pick(software, "aiSoftware"),
  },

  "data-cybersecurity-digital-governance": {
    name: "Data Cybersecurity and Digital Governance",
    hero: {
      title: "Use data with confidence and manage *digital risk with clarity*",
      description:
        "We help organizations improve data foundations, strengthen cybersecurity, secure cloud and identity environments, and establish governance that supports accountable digital operations.",
    },
    overview: {
      title: "Treat security, data and governance as *connected responsibilities*",
      paragraphs: [
        "Digital services depend on trusted data, controlled access, resilient infrastructure, clear accountability, and evidence that controls work.",
        "CyberX Soft addresses these requirements together, helping organizations prioritize material risks and improve decision visibility.",
      ],
    },
    audience: {
      title: "For teams responsible for data, risk, *security and accountability*",
      description:
        "This service supports organizations that need stronger decision visibility, better security controls, clearer ownership, or evidence that digital risks are being managed properly.",
    },
    useCases: {
      title: "Recognize when risk, data or governance *needs attention*",
      description:
        "The service becomes useful when visibility, security controls, ownership, reporting, or evidence no longer match the organization’s operating requirements.",
    },
    core: {
      title: "What we *deliver*",
      description:
        "The engagement can combine cybersecurity, data engineering, business intelligence, cloud and identity security, governance, risk, and compliance support.",
    },
    capabilities: {
      description:
        "The exact scope depends on the organization’s data environment, technology estate, risk profile, control maturity, assurance needs, and operating responsibilities.",
    },
    deliverables: {
      title: "Practical outputs for risk, data and *governance improvement*",
      description:
        "Deliverables can range from current-state assessments and control roadmaps to governed data, policies, remediation support, monitoring, and management reporting.",
    },
    engagement: {
      title: "Structure the work *around the requirement*",
      description:
        "The right engagement model depends on scope clarity, internal ownership, required skills, urgency, security, and the level of delivery responsibility CyberX Soft is expected to accept.",
    },
    callout: {
      eyebrow: "Assurance & readiness",
      title: "Prepare for assurance without making unsupported certification claims",
      description:
        "CyberX Soft can support assessment, control design, remediation, documentation, evidence preparation, and readiness activity. Formal certification or independent assurance remains the responsibility of an appropriately authorized external body.",
    },
    process: {
      title: "How we *work*",
      description:
        "We begin with the objective, current environment, users, constraints, risks, ownership, and evidence of success before agreeing the scope and delivery model.",
    },
    faqTitle: "Data Cybersecurity and Digital Governance *FAQs*",
    cta: sharedCta,
    data: pick(data, "dataCybersecurity"),
  },
};
