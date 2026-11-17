import { Link } from "react-router-dom";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";

import { serviceNavigation, mainNavigation } from "../config/navigation";
import { siteConfig } from "../config/siteConfig";
import { Reveal, imageProps } from "../ui/motion";
import { scrollToTarget } from "../ui/SmoothScroll";

export default function Footer() {
  const companyLinks = mainNavigation.filter((item) => item.label !== "Services");
  
  // Footer logo via Cloudinary
  const footerLogo = imageProps("/logos/cxs-logo-light.png");

  return (
    <footer className="site-footer" data-tone="dark">
      <div className="aurora" aria-hidden="true" />

      <div className="container site-footer__top">
        <Reveal className="site-footer__brand">
          <Link to="/" className="site-footer__logo" aria-label="CyberX Soft — home">
            <img src={footerLogo.src} alt="" width="349" height="252" loading="lazy" />
          </Link>

          <p>{siteConfig.description}</p>

          <ul className="site-footer__contact">
            <li>
              <a href={`mailto:${siteConfig.email}`}>
                <Mail size={16} aria-hidden="true" />
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                <Phone size={16} aria-hidden="true" />
                {siteConfig.phone}
              </a>
            </li>

            {/* Renders all office locations (Rawalpindi & Lahore) */}
            {siteConfig.offices && siteConfig.offices.length > 0 ? (
              siteConfig.offices.map((office) => (
                <li key={office.id}>
                  <span>
                    <MapPin size={16} aria-hidden="true" style={{ flexShrink: 0, marginTop: "3px" }} />
                    {office.address}
                  </span>
                </li>
              ))
            ) : (
              <li>
                <span>
                  <MapPin size={16} aria-hidden="true" />
                  {siteConfig.address}
                </span>
              </li>
            )}
          </ul>
        </Reveal>

        <Reveal className="site-footer__col" delay={0.08}>
          <h2>Services</h2>
          <ul>
            {serviceNavigation.map((service) => (
              <li key={service.path}>
                <Link to={service.path}>{service.label}</Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="site-footer__col" delay={0.16}>
          <h2>Company</h2>
          <ul>
            {companyLinks.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>

          <h2 className="site-footer__legal-title">Legal</h2>
          <ul>
            {siteConfig.legalLinks.map((item) => (
              <li key={item.id}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="site-footer__wordmark" aria-hidden="true">
        CyberX Soft
      </div>

      <div className="container site-footer__bottom">
        <p>© {new Date().getFullYear()} CyberX Soft (CXS). All rights reserved.</p>

        <button
          type="button"
          className="site-footer__top-btn"
          onClick={() => scrollToTarget(0, { duration: 1.6 })}
          aria-label="Back to top"
        >
          Back to top <ArrowUp size={16} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}