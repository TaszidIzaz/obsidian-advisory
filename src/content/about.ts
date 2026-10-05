// About page copy. The hero text is the Figma About overlay (frame 6:100); the rest is new copy
// written in the same voice for sections that have no Figma frame.

export const aboutHero = {
  eyebrow: "About Obsidian",
  serif: "Strategic Advisory for Organizations ",
  sans: "Navigating Modern Complexity",
  intro: [
    "Obsidian Advisory supports founders, enterprises, and internationally operating organizations navigating evolving legal, operational, and structural environments through strategic clarity, discretion, and long-term advisory alignment.",
    "Every engagement is approached with a deep understanding of organizational growth, operational exposure, international frameworks, and the importance of building resilient structures designed for long-term confidence.",
  ],
  image: "/images/modal-justice.webp",
  imageAlt: "Statue of Lady Justice holding scales against a dark sky",
};

export const principles = {
  eyebrow: "Principles",
  serif: "Built on Principles, ",
  sans: "Not Just Process",
  aside:
    "Four commitments shape how we advise, how we communicate, and how we measure whether an engagement has done its work.",
  items: [
    {
      index: "01",
      title: "Discretion",
      body: "Sensitive matters stay contained. Information is shared on a need-to-know basis, inside and outside the engagement.",
    },
    {
      index: "02",
      title: "Clarity",
      body: "Complex positions are reduced to clear options, trade-offs, and recommendations that leadership can act on.",
    },
    {
      index: "03",
      title: "Alignment",
      body: "Advice is anchored to your long-term objectives, not to the volume of work an engagement can generate.",
    },
    {
      index: "04",
      title: "Resilience",
      body: "Structures are designed to hold under pressure — across jurisdictions, growth stages, and leadership change.",
    },
  ],
};

export const aboutStatements = [
  {
    id: "understanding",
    image: "/images/feature-rotunda.webp",
    alt: "Interior of a domed rotunda with columned balconies",
    eyebrow: "Our Perspective",
    serif: "Every engagement begins ",
    sans: "with understanding.",
    tone: "mist",
    width: 56,
  },
] as const;

export const process = {
  eyebrow: "How We Engage",
  serif: "A Measured Process for ",
  sans: "Consequential Decisions",
  aside:
    "Each engagement follows the same disciplined arc, scaled to the size of the decision and the pace your organization needs.",
  steps: [
    {
      tag: "Discover",
      title: "1. Confidential Assessment",
      body: "We map the decision in front of you — the structure, the exposure, the stakeholders, and the timeline that matters.",
    },
    {
      tag: "Structure",
      title: "2. Strategic Framework",
      body: "Options are framed against risk, cost, and long-term fit, so leadership can compare paths with confidence.",
    },
    {
      tag: "Advise",
      title: "3. Guided Execution",
      body: "We stay alongside your team through negotiation, implementation, and the moments that need a steady counterpart.",
    },
    {
      tag: "Sustain",
      title: "4. Long-Term Alignment",
      body: "Structures are reviewed as your organization grows, so today's decisions keep serving tomorrow's position.",
    },
  ],
};

export const aboutQuote = { serif: "Confidential by default. ", sans: "Global by design." };

export const aboutCta = {
  title: "Begin With a Confidential Conversation",
  text: "Share the decision in front of you. We will respond within one business day with a clear view of how we can help.",
};
