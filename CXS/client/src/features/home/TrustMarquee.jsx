import SectionHead from "../../ui/SectionHead";
import { Reveal, imageProps } from "../../ui/motion";
import { clientsPartners } from "./homeData";

/* Logos that ship on a dark plate keep their own background */
const darkPlates = {
  "/logos/tactical-trading-recreated-gray.png": "#656564",
};

function LogoTile({ client }) {
  const plate = darkPlates[client.logo];
  
  // Connect the logo to Cloudinary!
  const imgData = imageProps(client.logo);

  const isLagaam = client.name === "Lagaam";
  const isMediaBuzz = client.name === "Mediabuzz Global";
  const isAyur = client.name === "AYUR Essencia";
  const isGov = client.name === "Government of Pakistan (Ministry of Defence)";

  // Force Cloudinary cache refresh for updated images
  const freshSrc = (isLagaam || isMediaBuzz) ? `${imgData.src}?v=3` : imgData.src;

  return (
    <li className="logo-tile">
      <div 
        className="logo-tile__plate" 
        style={{
          background: plate ? plate : undefined, 
          borderColor: plate ? plate : undefined,
          overflow: "hidden",
          borderRadius: "16px",
        }}
      >
        <img 
          src={freshSrc} 
          alt="" 
          loading="lazy" 
          decoding="async" 
          style={{
            objectFit: "contain",
            width: "100%",
            height: "100%",
            transform: isLagaam ? "scale(1.2)" 
                    : isMediaBuzz ? "scale(1.2)" 
                    : isAyur ? "scale(1.2)" 
                    : isGov ? "scale(1.2)" 
                    : "scale(1.0)",
          }}
        />
      </div>
      <span>{client.name}</span>
    </li>
  );
}

export default function TrustMarquee() {
  return (
    <section className="section section--tight trust" data-tone="light" aria-labelledby="trust-title">
      <div className="container">
        <SectionHead
          label="Trusted by"
          title="Selected clients and *collaborations*"
          center
          titleClass="trust__title"
        />
      </div>

      <Reveal className="marquee trust__marquee" blur={0} delay={0.15} aria-label="Client and partner logos">
        {[0, 1].map((copy) => (
          <ul className="marquee__track" key={copy} aria-hidden={copy === 1}>
            {clientsPartners.map((client) => (
              <LogoTile key={`${copy}-${client.id}`} client={client} />
            ))}
          </ul>
        ))}
      </Reveal>
    </section>
  );
}