import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";
import Footer from "../components/general/footer";

const GridBackground = dynamic(() => import("../components/general/Grid"), {
  loading: () => <div className="loader">Loading Grid...</div>,
});

const PatternGrid = dynamic(() => import("../components/general/Pattern"), {
  loading: () => <div className="loader">Loading Pattern...</div>,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Yacine Ouardi | Frontend Developer | React, Next.js, TypeScript",
    template: "%s | Yacine Ouardi",
  },
  description:
    "Frontend Developer skilled in React, Next.js & TypeScript. Explore my portfolio, projects, and skills.",
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Developer",
    "Portfolio",
  ],
  openGraph: {
    title: "Yacine Ouardi | Frontend Developer",
    description: "Frontend Developer skilled in React, Next.js & TypeScript.",
    url: "https://yacine-ouardi.com/",
    siteName: "Yacine Ouardi",
    images: [
      {
        url: "https://yacine-ouardi.com/me.png",
        width: 1200,
        height: 630,
        alt: "Yacine Ouardi Portfolio",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yacine Ouardi | Frontend Developer",
    description: "Frontend Developer skilled in React, Next.js & TypeScript.",
    images: ["https://yacine-ouardi.com/me.png"],
    creator: "@YacineOuardi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  authors: [
    {
      url: "https://yacine-ouardi.com/",
      name: "Yacine Ouardi",
    },
  ],
  alternates: {
    canonical: "https://yacine-ouardi.com",
  },
  metadataBase: new URL("https://yacine-ouardi.com"),
  themeColor: "#1a202c",
  category: "Portfolio",
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yacine Ouardi",
  jobTitle: "Frontend Developer",
  url: "https://yacine-ouardi.com/",
  sameAs: [
    "https://github.com/MelancholYA",
    "https://www.linkedin.com/in/yacine-ouardi",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5VMD7ZZGHK"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5VMD7ZZGHK');
            `,
          }}
        />
      </head>
      <body className={`${playfair.variable} ${poppins.variable} font-sans`}>
        {children}
        <Suspense fallback={<div className="loader">Loading...</div>}>
          <PatternGrid />
          <GridBackground />
        </Suspense>
        <script
          type="application/ld+json"
          defer
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
