export const body = [
  {
    type: "p",
    text: "As organizations grow, their cyber risk tends to grow faster than leadership expects. More staff, devices, cloud services, suppliers and data all mean more ways for something to go wrong. Yet security is often still handled informally, by one IT person or an outside provider, without priorities agreed at management level.",
  },
  {
    type: "p",
    text: "You don't need a large security team to be well protected. You need to focus on the controls that prevent the most common and most damaging incidents, and make sure someone owns each one. Here are seven areas every growing organization should have under control.",
  },

  { type: "h3", text: "1. Identity and access" },
  {
    type: "p",
    text: "Most serious incidents start with a compromised account: a phished password, a reused credential, or an old account nobody closed. That makes identity the first place to invest.",
  },
  {
    type: "p",
    text: "Turn on multi-factor authentication (MFA) for email, cloud services, remote access and admin accounts, with no exceptions for senior staff. Give everyone a company password manager so people stop reusing and sharing passwords. Have a proper process for joiners, movers and leavers, so access is granted when it's needed and removed promptly when someone changes role or leaves. Limit administrator rights to the few people who need them, and give those people separate admin accounts. Then review regularly who can reach sensitive systems and data.",
  },
  {
    type: "p",
    text: "If you only fund one security improvement this year, make it this one.",
  },

  { type: "h3", text: "2. Backups you have actually tested" },
  {
    type: "p",
    text: "Ransomware, accidental deletion, hardware failure and bad updates all have the same answer: reliable backups. Plenty of organizations only find out during an incident that their backups were incomplete, stored alongside the original data, or impossible to restore quickly.",
  },
  {
    type: "p",
    text: "A sensible standard is the 3-2-1 rule: three copies of important data, on two different types of storage, with one copy off-site. Ideally at least one copy is immutable or offline, so an attacker who gets in can't delete or encrypt it.",
  },
  {
    type: "p",
    text: "Test restores on a schedule, too. Ask how long it would take to bring a critical system back, and whether the business could cope with that.",
  },

  { type: "h3", text: "3. Endpoints and patching" },
  {
    type: "p",
    text: "Laptops, desktops, phones and servers are where malware lands and where unpatched flaws get exploited. Keep operating systems and applications on supported versions and apply updates promptly. Use endpoint protection that's monitored centrally rather than standalone antivirus. Encrypt laptops and mobile devices. Keep an up-to-date inventory so no unmanaged device touches company data, and set a clear policy for personal devices used for work.",
  },
  {
    type: "p",
    text: "Old, unsupported systems are a business risk. Give each one an owner and a plan instead of leaving it running indefinitely.",
  },

  { type: "h3", text: "4. Cloud configuration" },
  {
    type: "p",
    text: "Cloud platforms and software-as-a-service tools are secure when they're configured well and exposed when they aren't. The usual problems are storage shared publicly by mistake, default settings nobody changed, forgotten test environments and too many administrators.",
  },
  {
    type: "p",
    text: "A few questions for management: Do we know every cloud service we use, including the ones individual teams signed up for? Who owns the security settings for each? Are we applying and reviewing security baselines, for example through the platforms' built-in security scores and recommendations? Do we control how files and data are shared outside the organization?",
  },

  { type: "h3", text: "5. Monitoring and logging" },
  {
    type: "p",
    text: "You can't respond to what you can't see. Even basic monitoring makes it much more likely you'll catch an incident before it turns into a crisis.",
  },
  {
    type: "p",
    text: "At a minimum, collect and keep logs from identity systems, email, servers, firewalls and critical applications, and make sure high-risk alerts reach someone who will act on them. Sign-ins from unusual locations, new administrator accounts, mass file changes and disabled security tools are all worth an alert.",
  },
  {
    type: "p",
    text: "For many growing organizations, a managed detection service or a security monitoring platform is more realistic than building an in-house security operations team.",
  },

  { type: "h3", text: "6. Suppliers and third parties" },
  {
    type: "p",
    text: "Your security partly depends on your suppliers: IT providers, software vendors, payment processors, marketing agencies, anyone with access to your systems or data. A weakness on their side can become your incident.",
  },
  {
    type: "p",
    text: "Keep a list of suppliers who can access your systems or sensitive data. Ask the important ones about their security controls and certifications before you sign and again at renewal. Put security and incident notification requirements in contracts. Give suppliers only the access they need, and remove it when the work ends.",
  },

  { type: "h3", text: "7. Being ready to respond" },
  {
    type: "p",
    text: "Sooner or later every organization faces a security incident. Whether it stays contained or turns into a major disruption often comes down to preparation.",
  },
  {
    type: "p",
    text: "A simple response plan says who makes decisions, who leads the technical work and who talks to staff, customers and regulators. It lists the outside parties you'll call, such as your IT provider, legal advisers, insurer or forensic specialists. It covers how to isolate affected systems and preserve evidence, what you're obliged to report under privacy laws and contracts, and how the business keeps operating while systems are restored.",
  },
  {
    type: "p",
    text: "Run a short tabletop exercise at least once a year. Talking through a realistic scenario, like a ransomware attack or a compromised email account, shows the gaps quickly.",
  },

  { type: "h3", text: "Making security a management responsibility" },
  {
    type: "p",
    text: "Security affects revenue, reputation, contracts and legal obligations, so it needs an owner at management level. Assign an executive owner, agree a short list of priorities, review progress every quarter and keep training staff, since people are still the first line of defence. The table below works as a starting checklist for that quarterly review.",
  },
  {
    type: "table",
    head: ["Priority", "Question for management"],
    rows: [
      ["Identity", "Is MFA enforced everywhere it matters?"],
      ["Backups", "When did we last test a full restore?"],
      ["Endpoints", "Are all devices known, supported and patched?"],
      ["Cloud", "Who owns the security settings of each service?"],
      ["Monitoring", "Who receives and acts on security alerts?"],
      ["Suppliers", "Which suppliers can access our data?"],
      ["Response", "Do we have a plan, and have we tested it?"],
    ],
  },
  {
    type: "cta",
    text: "CyberX Soft helps growing organizations assess their security, put practical controls in place and build monitoring and response that fits their size. If you're not sure where to start, we can help you set priorities and a realistic plan.",
  },
];