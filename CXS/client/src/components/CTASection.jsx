import { useRef } from "react";

import Button from "../ui/Button";
import Glass3D from "../ui/Glass3D";
import { Chapter } from "../ui/SectionHead";
import { ParallaxMedia, Reveal, SplitTitle } from "../ui/motion";
import { pageMedia } from "../config/media";

/**
 * Closing call-to-action. Panoramic parallax image, soft 3D glass,
 * and a frosted panel carrying the message.
 */
export default function CTASection({
  eyebrow = "Start a conversation",
  title,
  description,
  buttonLabel,
  buttonPath,
  secondaryLabel,
  secondaryPath,
  image = pageMedia.homeCta,
  position = "68% 50%",
}) {
  const ref = useRef(null);

  return (
    <section ref={ref} className="cta section--lift" data-tone="dark" data-scene-root>
      <ParallaxMedia name={image} className="media--bg cta__bg" speed={0.1} position={position} />
      <div className="cta__shade" aria-hidden="true" />
      <Glass3D preset="soft" />

      <div className="container cta__inner">
        <div className="cta__panel glass">
          <Reveal blur={0} y={14}>
            <Chapter>{eyebrow}</Chapter>
          </Reveal>

          <SplitTitle as="h2" text={title} className="cta__title" />

          {description && (
            <Reveal as="p" className="cta__text" delay={0.25} y={16}>
              {description}
            </Reveal>
          )}

          <Reveal className="btn-row" delay={0.35} y={16} blur={0}>
            {buttonLabel && buttonPath && (
              <Button to={buttonPath} variant="primary">
                {buttonLabel}
              </Button>
            )}
            {secondaryLabel && secondaryPath && (
              <Button to={secondaryPath} variant="glass">
                {secondaryLabel}
              </Button>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
