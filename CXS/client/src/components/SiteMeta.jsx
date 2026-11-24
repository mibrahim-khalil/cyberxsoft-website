import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { services } from "../features/services/servicesData";
import { getLegalPage } from "../features/legal/legalData";

const staticMeta = {
  "/": {
    title:
      "CyberX Soft | Technology, Software, Cybersecurity and Digital Growth",
    description:
      "CyberX Soft helps organizations build digital products, strengthen cybersecurity, grow brands, use data and AI, and extend delivery capacity.",
  },

  "/services": {
    title:
      "Digital and Technology Services | CyberX Soft",
    description:
      "Explore CyberX Soft services across brand growth, creative production, AI and software, data and cybersecurity, and specialist delivery support.",
  },

  "/services/brand-strategy-digital-growth": {
    title:
      "Brand Strategy and Digital Growth | CyberX Soft",
    description:
      "Clarify your brand position, build demand, improve campaign performance, and connect digital marketing activity to business goals.",
  },

  "/services/creative-media-design-animation": {
    title:
      "Creative Media Design and Animation | CyberX Soft",
    description:
      "Build coherent brand experiences through identity, campaign design, user experience, video, motion graphics, animation, and scalable content production.",
  },

  "/services/ai-software-digital-solutions": {
    title:
      "AI Software and Digital Solutions | CyberX Soft",
    description:
      "Design and build secure software, AI-enabled workflows, web and mobile applications, integrations, automation, and enterprise digital platforms.",
  },

  "/services/data-cybersecurity-digital-governance": {
    title:
      "Data Cybersecurity and Digital Governance | CyberX Soft",
    description:
      "Improve data visibility, assess cyber risk, secure cloud and identity environments, and establish practical digital governance and compliance controls.",
  },

  "/services/talent-augmentation-delivery-support": {
    title:
      "IT Staff Augmentation and Dedicated Remote Teams | CyberX Soft",
    description:
      "Add technology, creative, data, cybersecurity, quality, and project specialists through dedicated resources, remote teams, managed pods, and white-label offshore delivery.",
  },

  "/case-studies": {
    title:
      "Selected Work and Case Studies | CyberX Soft",
    description:
      "See how CyberX Soft applies strategy, technology, creative, data, cybersecurity, and delivery capabilities to practical client and platform needs.",
  },

  "/gallery": {
    title:
      "Creative Gallery | Animation, Motion Graphics and Design | CyberX Soft",
    description:
      "Browse 2D animation, motion graphics, video, and poster design produced by the CyberX Soft creative team.",
  },

  "/gallery/brand-strategy": {
    title:
      "Brand Strategy and Growth Gallery | CyberX Soft",
    description:
      "Browse selected brand, campaign, and digital growth work produced by the CyberX Soft team.",
  },

  "/gallery/ai-software": {
    title:
      "AI and Software Gallery | CyberX Soft",
    description:
      "Browse selected software, platform, and AI-enabled solutions built by the CyberX Soft team.",
  },

  "/gallery/data-cybersecurity": {
    title:
      "Data and Cybersecurity Gallery | CyberX Soft",
    description:
      "Browse selected data, cybersecurity, and digital governance work from the CyberX Soft team.",
  },

  "/insights": {
    title:
      "Insights on AI Software Cybersecurity and Digital Growth | CyberX Soft",
    description:
      "Practical perspectives from CyberX Soft on AI, software, cybersecurity, data, digital governance, brand growth, creative production, and delivery.",
  },

  "/about": {
    title:
      "About CyberX Soft | Integrated Technology and Digital Delivery",
    description:
      "Learn how CyberX Soft combines business understanding, software, AI, cybersecurity, data, creative capability, and specialist delivery support.",
  },

  "/contact": {
    title:
      "Contact CyberX Soft | Book a Consultation",
    description:
      "Contact CyberX Soft to discuss software, AI, cybersecurity, data, creative, digital growth, or specialist delivery requirements.",
  },
};

function getPageMeta(pathname) {
  const staticPage = Object.hasOwn(staticMeta, pathname)
    ? staticMeta[pathname]
    : undefined;

  if (staticPage) {
    return staticPage;
  }

  if (pathname.startsWith("/services/")) {
    const slug = pathname.replace(
      "/services/",
      ""
    );

    const service = services.find(
      (item) => item.slug === slug
    );

    if (service) {
      return {
        title: `${service.name} | CyberX Soft`,
        description:
          service.detail?.heroDescription ||
          service.homeDescription,
      };
    }
  }

  const legalSlug = pathname.replace("/", "");

  const legalPage = getLegalPage(legalSlug);

  if (legalPage) {
    return {
      title: `${legalPage.title} | CyberX Soft`,
      description: legalPage.intro,
    };
  }

  return {
    notFound: true,
    title: "Page Not Found | CyberX Soft",
    description:
      "The page you requested could not be found on the CyberX Soft website.",
  };
}

/*
 * Set VITE_SITE_URL (for example https://cyberxsoft.net) at build time to
 * add canonical and absolute social-preview URLs. Without it those tags
 * are left out rather than guessed.
 */
const siteUrl = (import.meta.env.VITE_SITE_URL || "").replace(/\/+$/, "");

function setTag(selector, create, value) {
  let tag = document.querySelector(selector);

  if (value === null) {
    tag?.remove();
    return;
  }

  if (!tag) {
    tag = create();
    document.head.appendChild(tag);
  }

  tag.setAttribute(tag.tagName === "LINK" ? "href" : "content", value);
}

const metaTag = (attr, key) => () => {
  const el = document.createElement("meta");
  el.setAttribute(attr, key);
  return el;
};

function SiteMeta() {
  const { pathname: rawPathname } = useLocation();

  // "/services/" and "/services" are the same page.
  const pathname = (
    rawPathname.length > 1
      ? rawPathname.replace(/\/+$/, "")
      : rawPathname
  ).toLowerCase();

  useEffect(() => {
    const meta = getPageMeta(pathname);

    document.title = meta.title;

    // Keep error pages out of search results.
    setTag(
      'meta[name="robots"]',
      metaTag("name", "robots"),
      meta.notFound ? "noindex" : null
    );

    if (siteUrl) {
      const url = siteUrl + (pathname === "/" ? "" : pathname);

      setTag(
        'link[rel="canonical"]',
        () => {
          const el = document.createElement("link");
          el.setAttribute("rel", "canonical");
          return el;
        },
        meta.notFound ? null : url
      );
      setTag('meta[property="og:url"]', metaTag("property", "og:url"), url);
      setTag(
        'meta[property="og:image"]',
        metaTag("property", "og:image"),
        `${siteUrl}/images/home-hero.webp`
      );
    }

    setTag(
      'meta[property="og:title"]',
      metaTag("property", "og:title"),
      meta.title
    );
    setTag(
      'meta[property="og:description"]',
      metaTag("property", "og:description"),
      meta.description
    );

    let descriptionTag =
      document.querySelector(
        'meta[name="description"]'
      );

    if (!descriptionTag) {
      descriptionTag =
        document.createElement("meta");

      descriptionTag.setAttribute(
        "name",
        "description"
      );

      document.head.appendChild(
        descriptionTag
      );
    }

    descriptionTag.setAttribute(
      "content",
      meta.description
    );
  }, [pathname]);

  return null;
}

export default SiteMeta;