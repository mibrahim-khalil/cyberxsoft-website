import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";

import { mainNavigation } from "../config/navigation";
import { serviceMedia } from "../config/media";
import { services } from "../features/services/servicesData";
import { imageProps } from "../ui/motion";
import { lockScroll } from "../ui/SmoothScroll";
import Button from "../ui/Button";

import "./headerTall.css";

const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

function slugFromPath(path) {
  return path.split("/").pop();
}

export default function Header() {
  const { pathname } = useLocation();
  const { scrollY } = useScroll();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);

  const closeTimer = useRef(null);
  const [previousPath, setPreviousPath] = useState(pathname);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const goingDown = latest > previous;
    setScrolled(latest > 24);
    if (latest < 120) setHidden(false);
    else if (goingDown && latest - previous > 2) setHidden(true);
    else if (!goingDown && previous - latest > 2) setHidden(false);
  });

  /* Close menus when the route changes (derived during render) */
  if (previousPath !== pathname) {
    setPreviousPath(pathname);
    if (menuOpen) setMenuOpen(false);
    if (megaOpen) setMegaOpen(false);
    if (mobileServices) setMobileServices(false);
  }

  useEffect(() => {
    document.documentElement.classList.toggle("header-hidden", hidden && !menuOpen);
    return () => document.documentElement.classList.remove("header-hidden");
  }, [hidden, menuOpen]);

  useEffect(() => {
    lockScroll(menuOpen);
    return () => lockScroll(false);
  }, [menuOpen]);

  // The burger is hidden above 1080px (see layout.css). If the window is widened
  // or a tablet is rotated while the mobile menu is open, close it so the page
  // is not left covered by a full-screen menu with scrolling locked.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1081px)");
    const onChange = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMegaOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const openMega = () => {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };

  const closeMega = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  const servicesItem = mainNavigation.find((item) => item.children);
  const serviceLinks = servicesItem.children;
  const featured = serviceLinks[activeService] ?? serviceLinks[0];
  const featuredSlug = slugFromPath(featured.path);
  const featuredMedia = serviceMedia[featuredSlug];

  return (
    <header
      className={`site-header ${scrolled ? "is-scrolled" : ""} ${hidden && !menuOpen ? "is-hidden" : ""} ${menuOpen ? "is-menu-open" : ""}`}
    >
      <div className="container site-header__bar">
        <Link to="/" className="site-header__logo" aria-label="CyberX Soft — home">
          <img
            src="/logos/cxs-logo-light.png"
            alt=""
            width="349"
            height="252"
            decoding="async"
          />
        </Link>

        <nav className="site-header__nav" aria-label="Main navigation">
          {mainNavigation.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="site-header__has-mega"
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
                onFocus={openMega}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) closeMega();
                }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}
                >
                  {item.label}
                </NavLink>
                <button
                  type="button"
                  className={`nav-chevron ${megaOpen ? "is-open" : ""}`}
                  aria-label="Toggle services menu"
                  aria-expanded={megaOpen}
                  aria-controls="mega-menu"
                  onClick={() => setMegaOpen((open) => !open)}
                >
                  <ChevronDown size={15} strokeWidth={2} aria-hidden="true" />
                </button>

                <AnimatePresence>
                  {megaOpen && (
                    <motion.div
                      id="mega-menu"
                      className="mega glass"
                      initial={{ opacity: 0, y: 12, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.99 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ul className="mega__list">
                        {serviceLinks.map((child, index) => {
                          const slug = slugFromPath(child.path);
                          const service = serviceBySlug[slug];
                          const Icon = service?.icon;
                          return (
                            <li key={child.path}>
                              <NavLink
                                to={child.path}
                                className={`mega__item ${index === activeService ? "is-active" : ""}`}
                                onMouseEnter={() => setActiveService(index)}
                                onFocus={() => setActiveService(index)}
                              >
                                <span className="icon-tile">
                                  {Icon && <Icon size={20} strokeWidth={1.7} aria-hidden="true" />}
                                </span>
                                <span className="mega__text">
                                  <strong>{child.label}</strong>
                                  <small>{service?.homeDescription}</small>
                                </span>
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>

                      <div className="mega__preview">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={featuredSlug}
                            className="mega__image"
                            initial={{ opacity: 0, scale: 1.04 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35 }}
                          >
                            <img
                              {...imageProps(featuredMedia.section, { sizes: "340px" })}
                              style={{ objectPosition: featuredMedia.position }}
                              alt=""
                            />
                          </motion.div>
                        </AnimatePresence>
                        <Link to="/services" className="mega__all">
                          View all services <ArrowUpRight size={16} aria-hidden="true" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="site-header__actions">
          <Button to="/contact" size="sm" className="site-header__cta">
            Book a Consultation
          </Button>

          <button
            type="button"
            className="site-header__burger"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="mobile-menu__nav" aria-label="Mobile navigation">
              {mainNavigation.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + index * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item.children ? (
                    <div>
                      <div className="mobile-menu__row">
                        <NavLink to={item.path} className="mobile-menu__link">
                          {item.label}
                        </NavLink>
                        <button
                          type="button"
                          className="mobile-menu__toggle"
                          aria-label="Toggle services menu"
                          aria-expanded={mobileServices}
                          onClick={() => setMobileServices((open) => !open)}
                        >
                          <ChevronDown
                            size={22}
                            aria-hidden="true"
                            style={{ transform: mobileServices ? "rotate(180deg)" : "none" }}
                          />
                        </button>
                      </div>
                      {mobileServices && (
                        <div className="mobile-menu__sub">
                          {item.children.map((child) => (
                            <NavLink key={child.path} to={child.path}>
                              {child.label}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <NavLink to={item.path} className="mobile-menu__link">
                      {item.label}
                    </NavLink>
                  )}
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="mobile-menu__cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Button to="/contact" magnetic={false}>
                Book a Consultation
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}