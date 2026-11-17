import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "motion/react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SiteMeta from "../components/SiteMeta";

import CustomCursor from "../ui/CustomCursor";
import SmoothScroll, { ScrollProgress } from "../ui/SmoothScroll";

function PublicLayout() {
  const { pathname } = useLocation();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <SiteMeta />
      <SmoothScroll />
      <ScrollProgress />
      <CustomCursor />

      <Header />

      <motion.main
        id="main"
        key={pathname}
        className="route"
        tabIndex={-1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
          <Outlet />
        </Suspense>
      </motion.main>

      <Footer />
    </>
  );
}

export default PublicLayout;
