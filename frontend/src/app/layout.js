import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "StackOrbitAI | Next-Gen AI Automation & Full-Stack Agency",
  description: "Scale your business with autonomous AI agents, n8n/Zapier workflows, CRM syncs, and custom Next.js/React web, mobile, and software development. Claim your free 7-day trial and booking slot.",
  metadataBase: new URL("https://stackorbitai.com"),
  openGraph: {
    title: "StackOrbitAI | Premium AI Automation Agency",
    description: "Scale your business with autonomous AI agents, n8n workflows, CRM syncs, and custom React/Next.js and Flutter mobile applications.",
    url: "https://stackorbitai.com",
    siteName: "StackOrbitAI",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "StackOrbitAI Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
