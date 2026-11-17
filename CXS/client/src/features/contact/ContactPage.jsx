import { Building2, CheckCircle2, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

import PageHero from "../../components/PageHero";
import FAQSection from "../../components/FAQSection";
import SectionHead from "../../ui/SectionHead";
import { Item, ParallaxMedia, Reveal, Stagger } from "../../ui/motion";
import { pageMedia } from "../../config/media";
import { siteConfig } from "../../config/siteConfig";

import { Block } from "../services/ServiceBlocks";
import ContactForm from "./ContactForm";
import { contactDetails, contactFaqs, offices } from "./contactData";

import "./contact.css";

const steps = [
  {
    id: "01",
    title: "Share your requirement",
    description: "Tell us about the objective, challenge, timeline, and what support you may need.",
  },
  {
    id: "02",
    title: "We review the details",
    description:
      "We consider the context, relevant capabilities, and any information needed to clarify the requirement.",
  },
  {
    id: "03",
    title: "Agree a starting point",
    description:
      "If there is a suitable fit, we discuss an appropriate next step, such as discovery, assessment, or a defined scope.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you need to build, improve *or secure*"
        description="Share the objective, current challenge, expected timeline, and any important constraints. Our team will review the requirement and respond with the most useful next step."
        breadcrumbs={[{ label: "Contact" }]}
        image={pageMedia.contact}
        position="75% 50%"
        compact
      />

      <section className="section section--lift contact-main" data-tone="dark">
        <ParallaxMedia name={pageMedia.contact} className="media--bg contact-main__bg" speed={0.06} position="80% 40%" />
        <div className="contact-main__shade" aria-hidden="true" />

        <div className="container">
          <SectionHead
            label="Start a conversation"
            title="Let’s talk about *your requirements*"
            description="Whether you have a defined project, need additional specialists, or are exploring the right solution, tell us what you’re working towards."
          />

          <div className="contact-main__layout">
            <Reveal blur={0} y={36}>
              <ContactForm />
            </Reveal>

            <div className="contact-main__side">
              <Reveal className="contact-info glass" y={36} blur={0} delay={0.1}>
                <span className="contact-info__kicker">Direct contact</span>
                <h2 className="t-h3">Get in touch</h2>
                <p>{contactDetails.responseTime}</p>

                <a href={`mailto:${siteConfig.email}`} className="contact-link" data-cursor="Email">
                  <span className="icon-tile">
                    <Mail size={20} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span>
                    <small>Email us</small>
                    <strong>{siteConfig.email}</strong>
                  </span>
                </a>

                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="contact-link" data-cursor="Call">
                  <span className="icon-tile">
                    <Phone size={20} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span>
                    <small>Phone and WhatsApp</small>
                    <strong>{siteConfig.phone}</strong>
                  </span>
                </a>

                <p className="contact-info__note">
                  <ShieldCheck size={18} aria-hidden="true" />
                  For sensitive requirements, you can keep your initial enquiry high-level until
                  appropriate confidentiality arrangements are discussed.
                </p>
              </Reveal>

              <Stagger className="contact-steps glass" stagger={0.12}>
                <h2 className="contact-steps__title">What happens next?</h2>
                <ol>
                  {steps.map((step) => (
                    <Item as="li" key={step.id} y={20} blur={0}>
                      <span className="contact-steps__no">{step.id}</span>
                      <div>
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                      </div>
                    </Item>
                  ))}
                </ol>
                <p className="contact-steps__note">
                  <CheckCircle2 size={18} aria-hidden="true" />
                  You can begin with an initial objective, even if the full scope is not yet defined.
                </p>
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      <Block tone="light">
        <SectionHead label="Our office" title="Visit *our office*" />
        <Stagger className="offices" stagger={0.1}>
          {offices.map((office) => (
            <Item key={office.id} className="office glass spot" y={28}>
              <span className="icon-tile">
                <Building2 size={22} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div>
                <h3 className="t-h3">{office.city}</h3>
                <span className="office__country">{office.countryCode}</span>
              </div>
              <ul>
                <li>
                  <MapPin size={17} aria-hidden="true" />
                  {office.address}
                </li>
                <li>
                  <Phone size={17} aria-hidden="true" />
                  <a href={`tel:${office.phone.replace(/\s/g, "")}`}>{office.phone}</a>
                </li>
              </ul>
            </Item>
          ))}
        </Stagger>
      </Block>

      <FAQSection items={contactFaqs} title="Contact *FAQ*" tone="dark" lift id="faq" />
    </>
  );
}
