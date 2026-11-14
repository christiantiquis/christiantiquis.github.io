import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

/** @type {import('next').NextConfig} */
export default function nextConfig(phase) {
  return {
    output: "export",
    images: { unoptimized: true },
    // This single-page export has a small stylesheet: send it with the HTML
    // so first-time mobile visitors do not wait for another blocking request.
    experimental: { inlineCss: true },
    // Keep the development cache separate from production builds.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next/dev" : ".next",
  };
}
