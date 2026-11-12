import "./globals.css";
import "./brand.css";
import { siteUrl } from "./site";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Christian Tiquis | Full-Stack Software Engineer",
  description: "Christian Tiquis builds small web tools with TypeScript and React, including BST Tools and TodoLizt. Open to remote opportunities.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Christian Tiquis | Full-Stack Software Engineer",
    description: "Small web tools that stay on your machine. BST Tools, TodoLizt, and a short note on the stack.",
    url: siteUrl,
    siteName: "Christian Tiquis",
    type: "website",
  },
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
