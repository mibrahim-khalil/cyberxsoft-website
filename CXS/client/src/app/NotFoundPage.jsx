import Button from "../ui/Button";
import Glass3D from "../ui/Glass3D";
import { Reveal, SplitTitle } from "../ui/motion";

import "../features/services/services.css";

export default function NotFoundPage() {
  return (
    <section className="notfound" data-tone="dark" data-scene-root>
      <div className="aurora" aria-hidden="true" />
      <Glass3D preset="hero" />

      <div className="container notfound__inner">
        <span className="notfound__code" aria-hidden="true">
          404
        </span>
        <SplitTitle as="h1" text="This page has *drifted away*" className="notfound__title" />
        <Reveal as="p" className="t-lead" delay={0.3}>
          The page you are looking for could not be found. It may have moved, or the address may be
          mistyped.
        </Reveal>
        <Reveal className="btn-row" delay={0.4} blur={0}>
          <Button to="/" variant="primary">
            Return to Home
          </Button>
          <Button to="/contact" variant="glass">
            Contact us
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
