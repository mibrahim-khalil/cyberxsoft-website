export const body = [
  {
    type: "p",
    text: "Replacing a business-critical system is one of the riskiest technology decisions an organization makes. Whether it's an ERP, a CRM, a core operations platform or a custom application someone built years ago, the system probably supports daily work, holds years of data and connects to other tools in ways nobody fully documented.",
  },
  {
    type: "p",
    text: "The reasons to replace are usually real. The system is slow, hard to change, expensive to support, or no longer matches how the business works. Even so, many replacement projects run over budget or disrupt operations because important questions came up too late. These are the questions to answer before you commit.",
  },

  { type: "h3", text: "1. Be clear about why you're replacing it" },
  {
    type: "p",
    text: "Write down the specific problems the current system causes and what the new one has to deliver. Common reasons include the vendor ending support, processes that only work through heavy workarounds, reliability or security that no longer meets requirements, licensing or support costs that are hard to justify, and a business that has grown into new markets, products or ways of working.",
  },
  {
    type: "p",
    text: "If the real problems are poor configuration, missing training or broken processes, a new system may not fix them. Sometimes a targeted upgrade, a new integration or a process redesign gets you further with less risk.",
  },

  { type: "h3", text: "2. Find out who uses it, and how" },
  {
    type: "p",
    text: "People often depend on a system in ways no specification mentions. Map which departments, roles and outside parties use it and how often. Then watch people do their actual work, including the spreadsheets, shortcuts and manual steps around the system. Note the moments when a failure would hurt most, such as month-end close, payroll, peak sales periods or regulatory reporting dates. And find the long-serving staff who know the exceptions and edge cases that were never written down.",
  },
  {
    type: "p",
    text: "This discovery work shapes requirements, testing and training. Skipping it is one of the most common reasons go-lives fail.",
  },

  { type: "h3", text: "3. Map every integration" },
  {
    type: "p",
    text: "Critical systems rarely stand alone. They exchange data with finance tools, websites, payment providers, warehouses, reporting platforms, email systems and partner portals. For each connection, record what data moves, in which direction and how often; whether it runs through an API, a file transfer, a database link or a manual export; who owns the system on the other end and who supports the link; and what breaks downstream if the data arrives late, incomplete or wrong.",
  },
  {
    type: "p",
    text: "Hidden integrations cause a lot of surprises after go-live. A nightly export someone set up years ago is the classic example.",
  },

  { type: "h3", text: "4. Look hard at the data before you move it" },
  {
    type: "p",
    text: "Data migration is usually harder than expected. Decide how many years of records the new system really needs and what can be archived instead. Clean up duplicates, incomplete records, outdated codes and inconsistent formats before migration, not after. Work out how the old system's records and fields map onto the new design. And name the people in the business who will decide what's correct when records conflict.",
  },
  {
    type: "p",
    text: "Run at least one full trial migration, with business users checking the results, before the final cutover.",
  },

  { type: "h3", text: "5. Review controls, security and compliance" },
  {
    type: "p",
    text: "Critical systems often enforce rules that protect the organization: approval limits, segregation of duties, audit trails, access permissions and retention policies. Some of these exist only as configuration, so they're easy to miss. List them all and confirm the new system can enforce each one, or agree how you'll cover the gap. Design user roles and access from scratch rather than copying old permissions across. Check contractual, privacy and industry rules about where data can be stored and processed.",
  },
  {
    type: "p",
    text: "Bring in colleagues from finance, risk or compliance early, so controls are built in rather than bolted on after launch.",
  },

  { type: "h3", text: "6. Choose a migration approach" },
  {
    type: "p",
    text: "There are several ways to move from old to new, and each has trade-offs:",
  },
  {
    type: "table",
    head: ["Approach", "When it fits", "Main risk"],
    rows: [
      [
        "Single cutover",
        "Smaller scope, simpler data, strong testing",
        "Everything changes at once",
      ],
      [
        "Phased by module or site",
        "Large scope, several departments or locations",
        "Temporary integrations between old and new",
      ],
      [
        "Parallel running",
        "High-risk processes that need extra assurance",
        "Double workload for staff during the overlap",
      ],
    ],
  },
  {
    type: "p",
    text: "Whichever you choose, agree clear go/no-go criteria, a rollback plan, and who has the authority to make the final call.",
  },

  { type: "h3", text: "7. Plan for adoption" },
  {
    type: "p",
    text: "A new system only pays off if people use it well. Plan role-based training close to go-live, with a practice environment. Update procedures and write short reference guides. Pick a champion in each department to answer questions, add extra support for the first weeks after launch, and set up a way to collect issues and improvement requests.",
  },
  {
    type: "p",
    text: "Expect some resistance, especially from experienced users who were fast on the old system. Explain why the change is happening and what will get better for them.",
  },

  { type: "h3", text: "8. Keep the business running" },
  {
    type: "p",
    text: "Avoid going live during peak periods or around critical reporting dates. Keep the old system available in read-only mode for a set period. Confirm backups, support contacts and escalation paths for launch week, and watch your main business metrics daily after go-live so problems show up early.",
  },

  { type: "h3", text: "Deciding with confidence" },
  {
    type: "p",
    text: "A new system can bring real gains in efficiency, control and room to grow. The organizations that get there treat replacement as a business change supported by technology, not just an IT project. They spend time upfront on users, integrations, data and controls, and they plan migration and adoption as carefully as the build.",
  },
  {
    type: "cta",
    text: "CyberX Soft supports organizations with system assessments, platform selection, custom development, data migration and post-launch support. If you're thinking about replacing a critical system, we can help you weigh the options and plan a transition that keeps your operations running.",
  },
];