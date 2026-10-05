import localFont from "next/font/local";

// Season (TRIAL) by Displaay — the trial licence does not cover a public launch; swap in the
// licensed WOFF2 files here before going live.
export const seasonSerif = localFont({
  src: [{ path: "../fonts/SeasonSerifTRIAL-Regular.otf", weight: "400", style: "normal" }],
  variable: "--font-serif",
  display: "swap",
});

export const seasonSans = localFont({
  src: [
    { path: "../fonts/SeasonSansTRIAL-Light.otf", weight: "300", style: "normal" },
    { path: "../fonts/SeasonSansTRIAL-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/SeasonSansTRIAL-Medium.otf", weight: "500", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});
