import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Christian Tiquis | Software Engineer",
  description: "Portfolio of Christian Tiquis, a Software Engineer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body
        className={"antialiased"}
        key="root-layout"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
