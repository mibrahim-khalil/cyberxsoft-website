import { CheckCircle2, UsersRound } from "lucide-react";

import Button from "../../ui/Button";
import SectionHead from "../../ui/SectionHead";
import Glass3D from "../../ui/Glass3D";
import { ParallaxMedia, Reveal, Stagger, Item, WindowReveal } from "../../ui/motion";
import { serviceMedia } from "../../config/media";
import { staffAugmentationHighlights } from "./homeData";

const media = serviceMedia["talent-augmentation-delivery-support"];

export default function CapacitySection() {
  return (
    <section className="capacity" data-tone="dark" id="capacity" data-chapter="Capacity" data-scene-root>
      <WindowReveal className="capacity__frame">
        <ParallaxMedia name={media.section} className="media--bg" speed={0.1} position="74% 50%" />
        <div className="capacity__shade" aria-hidden="true" />
        <Glass3D preset="soft" />
      </WindowReveal>

      <div className="container capacity__inner">
        <div className="capacity__copy">
          <SectionHead
            label="Staff augmentation"
            title="Extend your team *without waiting* for permanent recruitment"
          />

          <Reveal as="p" className="capacity__text t-lead" delay={0.2}>
            When a roadmap is moving faster than recruitment, CyberX Soft can provide one specialist,
            a dedicated remote team, a managed multidisciplinary pod, or a confidential white-label
            delivery team. Clients retain day-to-day control in a conventional augmentation model,
            while managed pods include greater CyberX Soft coordination, reporting, and quality
            oversight.
          </Reveal>

          <Reveal className="btn-row" delay={0.3} blur={0}>
            <Button to="/contact" variant="primary">
              Request Talent Profiles
            </Button>
            <Button to="/services/talent-augmentation-delivery-support" variant="glass">
              Explore Staff Augmentation
            </Button>
          </Reveal>
        </div>

        <Stagger className="capacity__panel glass" stagger={0.1}>
          <Item className="capacity__lead" y={24}>
            <span className="icon-tile">
              <UsersRound size={22} strokeWidth={1.7} aria-hidden="true" />
            </span>
            <div>
              <small>Flexible delivery capacity</small>
              <strong>Shape the team around the requirement</strong>
            </div>
          </Item>

          {staffAugmentationHighlights.map((point) => (
            <Item key={point.id} className="capacity__point" y={24}>
              <CheckCircle2 size={20} strokeWidth={1.8} aria-hidden="true" />
              <p>{point.text}</p>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
