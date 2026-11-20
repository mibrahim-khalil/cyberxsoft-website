import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../layout/PublicLayout";
import RouteError from "./RouteError";

/*
 * Every page is code-split: the 3D scene, motion and page styles
 * load only when a visitor actually needs them.
 */
const page = (loader) => ({
  lazy: async () => ({ Component: (await loader()).default }),
});

const legal = (legalSlug) => ({
  path: legalSlug,
  lazy: async () => {
    const { default: LegalPage } = await import("../features/legal/LegalPage");
    return { Component: () => <LegalPage legalSlug={legalSlug} /> };
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <RouteError />,
    HydrateFallback: () => null,
    children: [
      { index: true, ...page(() => import("../features/home/HomePage")) },
      { path: "services", ...page(() => import("../features/services/ServicesPage")) },
      { path: "services/:serviceSlug", ...page(() => import("../features/services/ServiceDetailPage")) },
      { path: "work", ...page(() => import("../features/case-studies/WorkPage")) },
      { path: "case-studies", ...page(() => import("../features/case-studies/WorkPage")) },
      { path: "insights", ...page(() => import("../features/insights/InsightsPage")) },
      { path: "about", ...page(() => import("../features/about/AboutPage")) },
      { path: "contact", ...page(() => import("../features/contact/ContactPage")) },
      legal("privacy-policy"),
      legal("terms-and-conditions"),
      legal("cookie-policy"),
      legal("disclaimer"),
      { path: "*", ...page(() => import("./NotFoundPage")) },
    ],
  },
]);

export default router;