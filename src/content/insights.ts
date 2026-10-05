// Insights — placeholder articles written for the build so the index, filters and article
// template have real content to render. Replace with the client's own writing (or a CMS) before launch.

export type Insight = {
  slug: string;
  category: Category;
  title: string;
  excerpt: string;
  date: string; // ISO
  readTime: string;
  image: string;
  body: { heading?: string; text: string }[];
};

export const categories = ["All", "Structuring", "International", "Risk", "Private"] as const;
export type Category = Exclude<(typeof categories)[number], "All">;

export const insightsHero = {
  eyebrow: "Insights",
  serif: "Perspectives on Structure, ",
  sans: "Risk, and Growth",
  intro:
    "Considered notes from our advisory practice — written for founders, operators, and leadership teams navigating consequential decisions.",
};

export const insights: Insight[] = [
  {
    slug: "structure-before-scale",
    category: "Structuring",
    title: "Structure Before Scale: Why Growth Exposes Weak Foundations",
    excerpt:
      "Rapid growth rarely creates structural problems. It reveals the ones that were already there — usually at the least convenient moment.",
    date: "2026-09-18",
    readTime: "6 min read",
    image: "/images/feature-palace.webp",
    body: [
      {
        text: "Most organizations do not choose their structure. They accumulate it — an entity formed for a first contract, a shareholder arrangement drafted in a weekend, a governance process that exists mainly in the founder's head. For a while, this works.",
      },
      {
        heading: "Growth is a stress test",
        text: "Investment, new markets, and senior hires all place weight on the same foundations. Investors ask who owns what. New jurisdictions ask where decisions are made. Senior hires ask how authority is delegated. Each question is simple; answering it under time pressure is not.",
      },
      {
        heading: "What a sound structure does",
        text: "A well-designed structure makes ownership legible, keeps liability where it belongs, and lets leadership make decisions without renegotiating the basics each time. It is not about complexity — the best structures are often the simplest ones that still hold.",
      },
      {
        heading: "Where to begin",
        text: "Start with the decisions you expect to make in the next eighteen months, then work backwards. The right structure is the one that makes those decisions easier, not the one that looks most sophisticated on a diagram.",
      },
    ],
  },
  {
    slug: "entering-new-jurisdictions",
    category: "International",
    title: "Entering New Jurisdictions Without Losing Operational Clarity",
    excerpt:
      "International expansion multiplies entities, rules, and reporting lines. Clarity has to be designed in from the start.",
    date: "2026-08-27",
    readTime: "7 min read",
    image: "/images/service-2.webp",
    body: [
      {
        text: "Expansion plans usually focus on the market: customers, partners, talent. The operating model that will support that market tends to be decided later, often by default.",
      },
      {
        heading: "Choose the jurisdiction deliberately",
        text: "Where an entity sits shapes tax position, hiring, contracting, and how easily it can be restructured later. Convenience today can become friction for years.",
      },
      {
        heading: "Decide where decisions live",
        text: "Distributed teams need clear lines of authority. Which entity signs which contracts? Who approves spending locally? Ambiguity here creates both operational drag and regulatory exposure.",
      },
      {
        heading: "Build one view of the group",
        text: "Leadership should be able to see the whole organization — entities, obligations, and key dates — in one place. That single view is what keeps expansion from turning into fragmentation.",
      },
    ],
  },
  {
    slug: "risk-is-an-operating-question",
    category: "Risk",
    title: "Risk Is an Operating Question, Not a Compliance Exercise",
    excerpt:
      "Compliance programmes fail when they sit beside the business. The strongest ones are built into how decisions are already made.",
    date: "2026-08-04",
    readTime: "5 min read",
    image: "/images/service-3.webp",
    body: [
      {
        text: "Many organizations treat risk as a document set: policies written once, reviewed annually, and consulted rarely. The result is a programme that satisfies an audit but does little to change outcomes.",
      },
      {
        heading: "Map exposure to decisions",
        text: "Risk becomes manageable when it is tied to specific decisions — entering a contract, launching a product, hiring in a new region. That is where controls belong.",
      },
      {
        heading: "Make escalation obvious",
        text: "People do not escalate what they cannot recognize. Clear thresholds and named owners do more than any policy library.",
      },
      {
        heading: "Review as you grow",
        text: "A control framework designed for twenty people will not fit two hundred. Revisit it at each stage of growth, not only when something goes wrong.",
      },
    ],
  },
  {
    slug: "leadership-transitions",
    category: "Private",
    title: "Navigating Leadership Transitions With Discretion",
    excerpt:
      "Succession, departures, and changes of control are among the most sensitive moments an organization faces. How they are handled is remembered.",
    date: "2026-07-15",
    readTime: "6 min read",
    image: "/images/feature-justice.webp",
    body: [
      {
        text: "Leadership transitions combine personal, legal, and operational stakes in a single moment. They are rarely planned as carefully as they deserve to be.",
      },
      {
        heading: "Sequence matters",
        text: "Who is told, in what order, and with what message determines whether a transition reads as stability or uncertainty — to teams, partners, and investors alike.",
      },
      {
        heading: "Protect the individuals involved",
        text: "Discretion is not only about the organization. Outgoing and incoming leaders both deserve a process that respects their position and their privacy.",
      },
      {
        heading: "Plan for continuity",
        text: "Authority, relationships, and institutional knowledge all need a deliberate handover. The aim is a transition that the wider organization barely notices.",
      },
    ],
  },
  {
    slug: "governance-for-founder-led-companies",
    category: "Structuring",
    title: "Governance for Founder-Led Companies",
    excerpt:
      "Good governance does not slow founders down. It gives them a framework for delegating authority without losing direction.",
    date: "2026-06-23",
    readTime: "5 min read",
    image: "/images/approach-columns.webp",
    body: [
      {
        text: "Founder-led companies often resist formal governance, associating it with bureaucracy. In practice, the right framework protects the founder's ability to lead.",
      },
      {
        heading: "Start with decision rights",
        text: "Define which decisions sit with the board, which with leadership, and which with individual teams. Most friction comes from these lines being unclear.",
      },
      {
        heading: "Build the board you will need",
        text: "A board should be shaped by the next stage of the company, not the last one. Independent perspective is most valuable before it is required.",
      },
    ],
  },
  {
    slug: "due-diligence-readiness",
    category: "Risk",
    title: "Preparing for Due Diligence Before It Begins",
    excerpt:
      "The best time to prepare for scrutiny is long before anyone asks. Readiness turns a stressful process into a straightforward one.",
    date: "2026-05-30",
    readTime: "4 min read",
    image: "/images/service-1.webp",
    body: [
      {
        text: "Investment, acquisition, and major partnerships all bring due diligence. Organizations that prepare in advance negotiate from a stronger position.",
      },
      {
        heading: "Know what will be asked",
        text: "Ownership records, material contracts, compliance history, and governance documents form the core of most reviews. Gaps here are the most common source of delay.",
      },
      {
        heading: "Resolve issues early",
        text: "Problems found by your own team can be fixed calmly. Problems found by a counterparty become negotiating leverage.",
      },
    ],
  },
];

export const getInsight = (slug: string) => insights.find((i) => i.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
