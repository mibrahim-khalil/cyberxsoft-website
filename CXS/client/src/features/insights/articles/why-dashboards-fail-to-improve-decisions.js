export const body = [
  {
    type: "p",
    text: "Most organizations have more dashboards than ever. Modern business intelligence tools make it easy to connect data sources and publish charts within days. Yet many leadership teams still make big decisions from spreadsheets, gut feel, or numbers someone pulled together by hand the night before the meeting.",
  },
  {
    type: "p",
    text: "The technology is rarely to blame. Dashboards fail when the foundations underneath them are weak: people don't agree on what the numbers mean, nobody owns the data, information arrives too late, or the charts give no context to act on. Below are the most common causes and what to do about each.",
  },

  { type: "h3", text: "1. Everyone defines the numbers differently" },
  {
    type: "p",
    text: "Ask three departments how many active customers you have and you may get three answers. Sales counts anyone with an open opportunity. Finance counts anyone invoiced in the last year. Operations counts anyone with an active service.",
  },
  {
    type: "p",
    text: "Each definition can be reasonable. But when they sit side by side in reports with no explanation, people stop trusting the numbers, and meetings turn into arguments about whose figure is right rather than what to do next.",
  },
  {
    type: "p",
    text: "The fix is a short business glossary for the metrics that matter, with a plain-language definition, the calculation, the data source and an owner for each. Agree the definitions of decision-driving metrics such as revenue, margin, active customers, churn and utilization at management level. Show the definition inside the dashboard, as a tooltip or footnote. When a definition changes, record what changed and when.",
  },

  { type: "h3", text: "2. Nobody owns the data" },
  {
    type: "p",
    text: "Data quality problems usually start where the data is created: in a CRM, a finance system, an operations tool or a spreadsheet. If nobody is responsible for keeping that data accurate and complete, the errors flow into every report built on it. You see it as missing fields, duplicate records, inconsistent categories, and manual corrections made in reports instead of at the source.",
  },
  {
    type: "p",
    text: "Give each main data area, such as customers, products, finance and people, a business owner who sets quality rules and gets issues fixed at the source. Add simple validation in source systems, like required fields and drop-down lists instead of free text. Publish a handful of data quality indicators so problems are visible to everyone.",
  },
  {
    type: "p",
    text: "This is a business role, not only an IT task. The people closest to a process know what its data should look like.",
  },

  { type: "h3", text: "3. The data arrives late, or breaks quietly" },
  {
    type: "p",
    text: "A dashboard is only useful if its data is fresh enough for the decision it supports. Daily operational decisions need daily or near-real-time data. A monthly review can work with monthly data, as long as it arrives on time.",
  },
  {
    type: "p",
    text: "Many reporting setups depend on manual exports, scheduled scripts that fail without telling anyone, or spreadsheets passed between teams. When something breaks, users often don't know the data is stale and make decisions on old figures.",
  },
  {
    type: "p",
    text: "Agree how fresh each dashboard needs to be, based on how it's used. Automate data flows from source systems where you can, so there are fewer manual steps. Monitor the pipelines and alert the data team when a load fails or runs late. And show a clear \"last updated\" time on every dashboard.",
  },

  { type: "h3", text: "4. The numbers have no context" },
  {
    type: "p",
    text: "A number on its own rarely tells you what to do. This month's revenue means little until you know how it compares with target, with last month, with the same period last year and with the forecast. Plenty of dashboards show what happened without helping anyone judge whether it's good, bad or unusual, or why.",
  },
  {
    type: "p",
    text: "Show metrics against targets, trends and comparisons, and use the same visual cues for performance against target everywhere. Let people drill down from a summary into regions, products, teams or customers to find the cause. For management reports, add a few lines of written commentary that explain the main movements and the actions being taken.",
  },

  { type: "h3", text: "5. Too many dashboards" },
  {
    type: "p",
    text: "When every request becomes a new dashboard, you end up with dozens of overlapping reports, many of them unused. People can't find what they need and aren't sure which version to trust.",
  },
  {
    type: "p",
    text: "Start from the decisions each audience makes and design dashboards around those decisions. Keep executive dashboards to a small number of metrics. Check usage regularly and retire or merge reports nobody opens. Mark the certified dashboards clearly so people know which ones are official.",
  },

  { type: "h3", text: "6. Dashboards sit outside the way the business runs" },
  {
    type: "p",
    text: "Even a well-built dashboard gets ignored if it isn't part of how the organization operates. If weekly meetings still run on slides made by hand, the dashboard is an optional extra.",
  },
  {
    type: "p",
    text: "Build dashboards into regular operating meetings, use them live, and assign owners to follow up on what they show. Over time, people start fixing data problems themselves, because they know the numbers will be discussed.",
  },

  { type: "h3", text: "A quick checklist" },
  {
    type: "table",
    head: ["Question", "Why it matters"],
    rows: [
      [
        "Are key metrics defined and agreed?",
        "Prevents debates about whose number is right",
      ],
      [
        "Does every data domain have an owner?",
        "Keeps quality issues fixed at the source",
      ],
      [
        "Is the data fresh enough for the decision?",
        "Avoids decisions based on outdated figures",
      ],
      [
        "Does each metric have context?",
        "Helps people judge performance and act",
      ],
      [
        "Is each dashboard tied to a decision or meeting?",
        "Ensures it is actually used",
      ],
    ],
  },

  { type: "h3", text: "From reports to better decisions" },
  {
    type: "p",
    text: "Business intelligence pays off when people trust the numbers, understand what they mean and act on them. That depends far more on definitions, ownership, reliable data flows and a meeting rhythm built around the data than on chart design.",
  },
  {
    type: "cta",
    text: "CyberX Soft helps organizations design data models, build reliable pipelines, define metrics and deliver dashboards that support real decisions. If your reporting isn't leading to action, we can help you find the gaps and close them.",
  },
];