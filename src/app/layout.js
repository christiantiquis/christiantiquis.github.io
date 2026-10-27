import "./globals.css";
import { siteUrl } from "./site";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Christian Tiquis | Full-Stack Software Engineer",
  description: "Christian Tiquis is a software engineer and full-stack developer working with TypeScript, React, Java, and Spring Boot. Open to remote opportunities.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Christian Tiquis | Full-Stack Software Engineer",
    description: "Full-stack development, AI, and automation. Explore my stack and connect with me.",
    url: siteUrl,
    siteName: "Christian Tiquis",
    type: "website",
  },
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
