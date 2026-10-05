import type { Metadata } from "next";
import BookCall from "@/components/book/BookCall";
import QuoteBand from "@/components/QuoteBand/QuoteBand";
import { bookHero } from "@/content/book";

export const metadata: Metadata = {
  title: "Book a Call",
  description: bookHero.intro,
};

export default function BookACallPage() {
  return (
    <>
      <BookCall />
      <QuoteBand serif="Confidential Inquiries. " sans="Global Engagements." />
    </>
  );
}
