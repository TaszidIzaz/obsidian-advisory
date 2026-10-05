// Homepage copy is verbatim from Figma (file t2EK07MKFTvZMxG0Y48Hi8, frame 1:63). The other
// pages (About, Services, Insights, Book a Call) have no Figma frames; their copy lives in the
// sibling content files and follows the same voice.

export const CONTACT_EMAIL = "hello@obsidianadvisory.com";
export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}`;
export const BOOK_HREF = "/book-a-call";

// Order and labels follow the Figma header with Insights (frame 6:29).
export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/insights" },
] as const;

export const features = [
  {
    id: "faster",
    image: "/images/feature-palace.webp",
    alt: "Neoclassical palace facade with a row of columns, tinted blue",
    eyebrow: "Our Approach",
    serif: "Modern organizations move ",
    sans: "faster than traditional systems",
    tone: "mist",
    width: 62.9,
  },
  {
    id: "precision",
    image: "/images/feature-justice.webp",
    alt: "Statue of Lady Justice holding scales against a dark sky",
    serif: "Precision is often invisible ",
    sans: "until it matters.",
    tone: "white",
    width: 49.4,
  },
  {
    id: "resilience",
    image: "/images/feature-rotunda.webp",
    alt: "Interior of a domed rotunda with columned balconies",
    serif: "Long-term resilience begins ",
    sans: "with intentional structure.",
    tone: "mist",
    width: 62.9,
    breakAfterSerif: true,
  },
] as const;

export const services = [
  {
    tag: "Structure",
    title: "1. Corporate Structuring",
    body: "Frameworks designed to support scalability, governance, operational clarity, and long-term resilience.",
    image: "/images/service-1.webp",
  },
  {
    tag: "Guidance",
    title: "2. International Advisory",
    body: "Strategic guidance for globally operating organizations and distributed structures.",
    image: "/images/service-2.webp",
  },
  {
    tag: "Risk",
    title: "3. Risk & Compliance",
    body: "Operational clarity designed to minimize exposure while supporting growth.",
    image: "/images/service-3.webp",
  },
  {
    tag: "Advisory",
    title: "4. Private Advisory",
    body: "Confidential support for high-responsibility individuals and sensitive transitions.",
    image: "/images/service-4.webp",
  },
] as const;

// x positions (in design px) of the four stat columns, and the band caption offsets.
export const stats = [
  {
    value: 50,
    suffix: "+",
    label: "Strategic Engagements Supported",
    caption: "Advisory across operational, international, and organizational matters.",
    x: 80,
    captionTop: 16,
  },
  {
    value: 12,
    suffix: "+",
    label: "Cross-Border Markets Navigated",
    caption: "Supporting organizations operating across evolving international environments.",
    x: 406,
    captionTop: 72,
  },
  {
    value: 95,
    suffix: "%",
    label: "Long-Term Client Retention",
    caption: "Built through trust, responsiveness, and strategic alignment.",
    x: 729,
    captionTop: 128,
  },
  {
    value: 100,
    suffix: "%",
    label: "Strategic Responsiveness",
    caption: "Because critical decisions rarely happen on schedule.",
    x: 1055,
    captionTop: 184,
  },
] as const;

export const footerNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: BOOK_HREF },
] as const;
