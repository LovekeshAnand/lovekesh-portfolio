import type { Metadata, Viewport } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { site } from "@/data";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

const title = "Lovekesh Anand | Backend Engineer";
const description =
  "Backend engineer who researches and designs systems before building them. AI infrastructure, Node.js, FastAPI, AWS. 1st at Automate India (Microsoft), 4 hackathon podiums.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  keywords: ["Lovekesh Anand", "backend engineer", "AI infrastructure", "Node.js", "FastAPI", "llama.cpp", "portfolio", "New Delhi"],
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", title, description: "I research, design, then build. Lately: AI infrastructure.", siteName: site.name },
  twitter: { card: "summary_large_image", creator: "@LovekeshAnand07", title, description },
};

export const viewport: Viewport = { themeColor: "#f7f8fb" };

// structured data so search engines know who this page is about
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Backend Engineer",
  address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressCountry: "IN" },
  alumniOf: "Maharishi Dayanand University",
  sameAs: [site.github, site.linkedin, site.medium, site.x],
  knowsAbout: ["Backend engineering", "AI infrastructure", "Node.js", "FastAPI", "PostgreSQL", "AWS", "llama.cpp"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${jetbrains.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
