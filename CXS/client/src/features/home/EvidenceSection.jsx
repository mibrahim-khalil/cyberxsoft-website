import { FileCheck2, ShieldCheck } from "lucide-react";

import Button from "../../ui/Button";
import SectionHead from "../../ui/SectionHead";
import { ParallaxMedia, Reveal, WindowReveal } from "../../ui/motion";
import { pageMedia } from "../../config/media";

export default function EvidenceSection() {
  return (
    <section className="evidence" data-tone="dark" id="work" data-chapter="Selected work">
      <WindowReveal className="evidence__frame" from={6}>
        <ParallaxMedia name={pageMedia.work} className="media--bg" speed={0.12} position="72% 50%" />
        <div className="evidence__shade" aria-hidden="true" />
      </WindowReveal>

      <div className="container evidence__inner">
        <SectionHead
          label="Selected work"
          title="Evidence *rather than* generic statistics"
          description="CyberX Soft publishes project stories only when the engagement context, scope, deliverables, client relationship, and outcomes can be described accurately and responsibly."
        />

        <Reveal className="evidence__panel glass" delay={0.15} y={36}>
          <span className="evidence__badge">
            <FileCheck2 size={16} aria-hidden="true" />
            Approved project stories are being prepared
          </span>

          <h3 className="t-h3">Work should demonstrate what was actually delivered.</h3>

          <p>
            Each published case study will explain the operating context, challenge, scope, delivery
            approach, key deliverables, and verified outcome rather than relying on unsupported
            project counts, percentages, or generic performance claims.
          </p>

          <p className="evidence__assure">
            <ShieldCheck size={18} aria-hidden="true" />
            Client names, statistics, screenshots, and outcomes will only be published after the
            required approval and verification.
          </p>

          <div className="btn-row">
            <Button to="/case-studies" variant="primary">
              Explore Our Work
            </Button>
            <Button to="/contact" variant="glass">
              Discuss a Similar Requirement
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
