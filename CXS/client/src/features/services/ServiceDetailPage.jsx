import { useParams } from "react-router-dom";

import NotFoundPage from "../../app/NotFoundPage";

import ServicePage from "./ServicePage";
import StaffAugmentationPage from "./StaffAugmentationPage";
import { serviceContent } from "./serviceContent";

export default function ServiceDetailPage() {
  // The router matches paths case-insensitively, so match the content the same way.
  const serviceSlug = (useParams().serviceSlug || "").toLowerCase();

  if (serviceSlug === "talent-augmentation-delivery-support") {
    return <StaffAugmentationPage />;
  }

  if (Object.hasOwn(serviceContent, serviceSlug)) {
    return <ServicePage key={serviceSlug} slug={serviceSlug} />;
  }

  return <NotFoundPage />;
}
