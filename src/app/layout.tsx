import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Pratik Shah | Digital Marketing Team Leader & AI Strategist",
  description: "Official portfolio of Pratik Shah, Digital Marketing Team Leader & Manager. Helping brands scale lead generation, dominate organic search (SEO), and optimize performance campaigns (PPC) using Generative AI workflows.",
  keywords: [
    "Pratik Shah",
    "Digital Marketing Manager",
    "Digital Marketing Team Leader",
    "SEO Expert Vadodara",
    "PPC Specialist India",
    "Generative AI Marketing",
    "Lead Generation Strategist",
    "Performance Marketing Lead"
  ],
  authors: [{ name: "Pratik Shah" }],
  openGraph: {
    title: "Pratik Shah | Digital Marketing Team Leader & AI Strategist",
    description: "Official portfolio of Pratik Shah. Lead generation, SEO audits, PPC campaigns, and AI-powered marketing workflows.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable}`} style={{ scrollBehavior: 'smooth' }}>
      <body style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
