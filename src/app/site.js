const configured = process.env.SITE_URL || "https://christiquis.pw";
const origin = new URL(configured);
if (origin.protocol !== "https:" || origin.pathname !== "/" || origin.search || origin.hash || origin.username || origin.password) {
  throw new Error("SITE_URL must be an HTTPS origin without a path or credentials.");
}
export const siteUrl = origin.origin;
