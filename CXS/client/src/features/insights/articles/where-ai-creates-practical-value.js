export const body = [
  {
    type: "p",
    text: "Most mid-sized organizations don't have an AI problem. They have a prioritization problem. Leadership keeps hearing that AI will change everything, vendors book demos, and different teams start trying tools on their own. Six months on, there are a handful of pilots, a few people who love them, and not much anyone can point to in the numbers.",
  },
  {
    type: "p",
    text: "The organizations that get real results tend to start somewhere duller. They look for the places where work is slow, repetitive or prone to mistakes, and they're honest about whether their data and processes can support automation. Here is a simple way to choose AI use cases that are worth the money and the effort.",
  },

  { type: "h3", text: "Start with friction, not technology" },
  {
    type: "p",
    text: "\"Where can we use AI?\" is the wrong first question. A better one is \"Where does work get stuck?\"",
  },
  {
    type: "p",
    text: "Good candidates usually share a few traits. The task happens often, hundreds or thousands of times a month: sorting documents, answering the same customer questions, pulling data out of forms, writing standard replies. The inputs and outputs are predictable, so a person receives something, applies judgment within known rules and produces something you can check. Delays or errors cost something visible, whether that's frustrated customers, rework, or skilled people stuck on low-value tasks. And there are often workarounds already in place. A process held together by spreadsheets, copy and paste and manual checklists is usually ready for improvement.",
  },
  {
    type: "p",
    text: "One exercise works well here: ask each department head which three tasks their team would most like to stop doing by hand. You'll often learn more from those answers than from any vendor's list of use cases.",
  },

  { type: "h3", text: "Check whether your data is ready" },
  {
    type: "p",
    text: "An AI system can only be as reliable as the information it works from. Before committing to a use case, ask four questions.",
  },
  {
    type: "ol",
    items: [
      "Does the data exist, or does the information live in people's heads and email threads?",
      "Can you get to it from the systems where it sits, with the right permissions? Or is it locked in scanned PDFs and disconnected tools?",
      "Is it consistent? Do teams use the same categories, names and formats, and have they done so over time?",
      "Are you allowed to use it? Privacy rules, client contracts or internal policies may limit how the data can be used or where it can be processed.",
    ],
  },
  {
    type: "p",
    text: "A use case with high business value and poor data readiness isn't necessarily a bad idea. It may just need a clean-up or integration phase first, and that phase belongs in the plan and the budget.",
  },

  { type: "h3", text: "Be honest about risk" },
  {
    type: "p",
    text: "Some tasks shouldn't be automated even when they can be. A wrong answer in an internal summary costs very little. A wrong answer when approving a payment, giving medical or legal guidance, or screening job candidates can cost a great deal.",
  },
  {
    type: "p",
    text: "Many of the strongest use cases keep a person involved: the AI prepares the work and someone approves it. That approach often keeps most of the time saving while removing most of the risk. It's also worth asking whether you could explain to a customer, auditor or regulator how a result was produced, and where your data goes once it leaves your systems. Who can see it? Is it stored, or used to train someone else's model?",
  },
  {
    type: "p",
    text: "A good rule of thumb: start where mistakes are easy to spot and cheap to fix, and only move to higher-stakes decisions once you trust the results.",
  },

  { type: "h3", text: "Decide how you'll measure success before you build" },
  {
    type: "p",
    text: "Every AI project needs a short, specific answer to \"How will we know this worked?\" Depending on the process, that might be time saved per transaction or per week, faster turnaround for customers or internal requests, fewer errors or escalations, capacity freed up for more useful work, or better satisfaction scores for the process involved.",
  },
  {
    type: "p",
    text: "Measure the starting point before the pilot begins. Without a baseline, results turn into opinions, and promising projects can lose funding while weaker ones survive on enthusiasm.",
  },

  { type: "h3", text: "A simple way to score options" },
  {
    type: "p",
    text: "To compare ideas side by side, score each one from 1 to 5 on four dimensions:",
  },
  {
    type: "table",
    head: ["Dimension", "What a high score means"],
    rows: [
      ["Process friction", "High volume, repetitive, slow or error-prone today"],
      ["Data readiness", "Data exists, is accessible, consistent and permitted for use"],
      ["Risk", "Errors are easy to detect and cheap to correct"],
      ["Measurable benefit", "Clear baseline and a benefit the business cares about"],
    ],
  },
  {
    type: "p",
    text: "Ideas that score well on all four make good first projects. If something scores high on benefit but low on data readiness, treat it as a second-phase project with data work attached. If errors would be hard to catch or expensive, design in human review, or wait.",
  },

  { type: "h3", text: "Where mid-sized organizations often find early wins" },
  {
    type: "p",
    text: "Every organization is different, but a few use cases come up again and again: pulling fields out of invoices, contracts or application forms; helping staff find answers in policies, procedures and old project documents; drafting replies to common customer questions for staff to check and send; turning meeting notes, support tickets or survey responses into structured summaries; and flagging missing or inconsistent records before they reach reports.",
  },
  {
    type: "p",
    text: "What these have in common is that they cut manual effort in processes people already understand, they keep people in control, and the results are easy to measure.",
  },

  { type: "h3", text: "Mistakes to avoid" },
  {
    type: "p",
    text: "The most common failure is a pilot with no business owner. A technical team can build the tool, but someone in the business has to be accountable for adoption and results. Close behind is automating a broken process, which only makes it fail faster, so fix the workflow first. Staff also need to know what the tool does, where it falls short and how their role will change, or adoption stalls. Finally, decide in advance what result would justify scaling a pilot and what result would mean stopping it.",
  },

  { type: "h3", text: "A practical way forward" },
  {
    type: "p",
    text: "For most mid-sized organizations, the answer isn't a large transformation program. It's a steady sequence: find the friction, check the data, manage the risk, measure the results, and scale what works.",
  },
  {
    type: "cta",
    text: "CyberX Soft works with organizations to assess AI opportunities, get their data and processes ready, and build solutions tied to clear business outcomes. If you're working out where AI fits in your organization, we can help you put together a realistic, prioritized roadmap.",
  },
];