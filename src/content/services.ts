// Services page copy. Service names, tags, summaries and images match the homepage (Figma 7:203);
// the detail copy is new and written in the same voice.

export const servicesHero = {
  eyebrow: "Services",
  serif: "Advisory Across Structure, ",
  sans: "Borders, and Risk",
  intro:
    "Four focused practice areas, delivered by one senior advisory team. Engagements are scoped to the decision — never padded to the hour.",
  image: "/images/feature-palace.webp",
  imageAlt: "Neoclassical palace facade with a row of columns, tinted blue",
};

export const serviceDetails = [
  {
    id: "corporate-structuring",
    tag: "Structure",
    title: "Corporate Structuring",
    summary:
      "Frameworks designed to support scalability, governance, operational clarity, and long-term resilience.",
    image: "/images/service-1.webp",
    covers: [
      "Holding and group structure design",
      "Governance frameworks and board readiness",
      "Shareholder and founder arrangements",
      "Restructuring ahead of investment or exit",
    ],
    for: "Founders and leadership teams preparing for growth, investment, or reorganization.",
  },
  {
    id: "international-advisory",
    tag: "Guidance",
    title: "International Advisory",
    summary: "Strategic guidance for globally operating organizations and distributed structures.",
    image: "/images/service-2.webp",
    covers: [
      "Market entry and jurisdiction selection",
      "Cross-border operating models",
      "Distributed team and entity coordination",
      "Regulatory alignment across regions",
    ],
    for: "Organizations expanding across borders or managing operations in several jurisdictions.",
  },
  {
    id: "risk-compliance",
    tag: "Risk",
    title: "Risk & Compliance",
    summary: "Operational clarity designed to minimize exposure while supporting growth.",
    image: "/images/service-3.webp",
    covers: [
      "Exposure mapping and risk prioritization",
      "Compliance programme design and review",
      "Policy, controls, and escalation paths",
      "Readiness for audits and due diligence",
    ],
    for: "Growing businesses whose operational footprint has outpaced their controls.",
  },
  {
    id: "private-advisory",
    tag: "Advisory",
    title: "Private Advisory",
    summary: "Confidential support for high-responsibility individuals and sensitive transitions.",
    image: "/images/service-4.webp",
    covers: [
      "Leadership and succession transitions",
      "Sensitive negotiations and disputes",
      "Personal and family structure matters",
      "Discreet counsel during periods of scrutiny",
    ],
    for: "Executives, founders, and families facing decisions that require absolute discretion.",
  },
] as const;

export const engagementModels = {
  eyebrow: "Engagement Models",
  serif: "Structured Around ",
  sans: "How You Operate",
  items: [
    {
      title: "Project Advisory",
      body: "A defined scope for a single decision — a restructuring, a market entry, a transaction.",
      term: "Fixed scope",
    },
    {
      title: "Retained Counsel",
      body: "An ongoing senior advisor for leadership, available as decisions arise throughout the year.",
      term: "Monthly retainer",
    },
    {
      title: "Private Mandate",
      body: "Confidential, principal-only support for sensitive personal or leadership matters.",
      term: "By referral",
    },
  ],
};

export const faqs = [
  {
    q: "How quickly can an engagement begin?",
    a: "Most engagements begin within a week of an initial consultation. Time-critical matters can be scoped and started within 48 hours.",
  },
  {
    q: "Do you work with organizations outside your home market?",
    a: "Yes. International organizations and cross-border structures are a core part of our practice, and we coordinate with local specialists where a jurisdiction requires it.",
  },
  {
    q: "How is confidentiality handled?",
    a: "Every engagement starts under a confidentiality agreement. Information is limited to the advisors working on your matter and is never shared without your explicit approval.",
  },
  {
    q: "How are engagements priced?",
    a: "Pricing follows the engagement model — fixed for defined projects, monthly for retained counsel, and agreed individually for private mandates. You receive a clear proposal before any work begins.",
  },
  {
    q: "Can you work alongside our existing legal and finance teams?",
    a: "Yes. We regularly work with in-house teams and external counsel, providing strategic direction while they handle execution within their remit.",
  },
];

export const servicesCta = {
  title: "Find the Right Advisory Fit",
  text: "Tell us about the decision ahead. We will recommend the practice area and engagement model that suits it best.",
};
