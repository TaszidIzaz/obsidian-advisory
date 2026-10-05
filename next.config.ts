import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Images are exported from Figma at 2x with their tint and grain baked in;
  // re-encoding would soften the grain, so serve them as-is.
  images: { unoptimized: true },
};

export default nextConfig;
