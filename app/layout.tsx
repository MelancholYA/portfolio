import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Nav from "../components/Nav";

const GridBackground = dynamic(() => import("../components/Grid"), {
  ssr: true,
});
const PatternGrid = dynamic(() => import("../components/Pattern"), {
  ssr: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Yacine Ouardi | Frontend Developer | React, Next.js, TypeScript",
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
    url: "https://yacine-ouardi.vercel.app/",
    siteName: "Yacine Ouardi",
    images: [
      {
        url: "https://yacine-ouardi.vercel.app/me.png",
        width: 1200,
        height: 630,
        alt: "Yacine Ouardi Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yacine Ouardi | Frontend Developer",
    description: "Frontend Developer skilled in React, Next.js & TypeScript.",
    images: ["https://yacine-ouardi.vercel.app/me.png"],
  },
  robots: "index, follow",
  authors: {
    url: "https://yacine-ouardi.vercel.app/",
    name: "Yacine Ouardi",
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yacine Ouardi",
  jobTitle: "Frontend Developer",
  url: "https://yacine-ouardi.vercel.app/",
  sameAs: [
    "https://github.com/MelancholYA",
    "https://www.linkedin.com/in/yacine-ouardi",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${poppins.variable} font-sans relative`}
      >
        <Nav />
        {children}
        <Suspense>
          <PatternGrid />
          <GridBackground />
        </Suspense>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
        <footer className="py-8 border-t border-gray-100 hue">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500">© 2025 Yacine Ouardi</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a
                  href="https://github.com/melancholYA/"
                  className="text-primary hover:text-white"
                >
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/yacine-ouardi/"
                  className="text-primary hover:text-white"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
