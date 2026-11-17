import { Compass, Workflow, SlidersHorizontal, Flag, ShieldCheck, Handshake } from "lucide-react";

import SectionHead from "../../ui/SectionHead";
import { Reveal, Stagger, Item } from "../../ui/motion";
import { whyChooseUsItems } from "./homeData";

const icons = [Compass, Workflow, SlidersHorizontal, Flag, ShieldCheck, Handshake];

export default function WhyUs() {
  return (
    <section className="section why" data-tone="light" id="why" data-chapter="Why CyberX Soft">
      <div className="container why__grid">
        <div className="why__intro">
          <SectionHead
            label="Why CyberX Soft"
            title="One team from *strategy* through delivery"
          />
          <Reveal as="p" className="t-lead why__lead" delay={0.2}>
            Complex initiatives often stall between strategy, creative execution, engineering,
            security, and operational handover. CyberX Soft coordinates these disciplines through a
            single delivery model, giving clients clearer ownership and fewer handoffs.
          </Reveal>
        </div>

        <Stagger className="why__cards" stagger={0.09}>
          {whyChooseUsItems.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Item key={item.id} className="why-card glass spot" y={30}>
                <span className="why-card__no">{String(index + 1).padStart(2, "0")}</span>
                <span className="icon-tile">
                  <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Item>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
