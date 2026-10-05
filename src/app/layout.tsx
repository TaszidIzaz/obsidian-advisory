import type { Metadata, Viewport } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { seasonSans, seasonSerif } from "./fonts";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: {
    default: "Obsidian Advisory — Strategic Advisory for Complex Decisions",
    template: "%s — Obsidian Advisory",
  },
  description:
    "Obsidian Advisory partners with founders, enterprises, and international clients navigating legal, operational, and structural complexity with clarity and precision.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${seasonSerif.variable} ${seasonSans.variable}`}>
      <body>
        <SmoothScroll />
        <Header />
        <main className="page">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
