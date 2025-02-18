import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import GridBackground from "../components/Grid";
import PatternGrid from "../components/Pattern";
import HomeLoader from "../components/loader";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${poppins.variable} font-sans relative `}
      >
        <PatternGrid />
        <HomeLoader />
        <GridBackground />

        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Yacine Ouardi",
              jobTitle: "Frontend Developer",
              url: "https://yacine-ouardi.vercel.app/",
              sameAs: [
                "https://github.com/MelancholYA",
                "https://www.linkedin.com/in/yacine-ouardi",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
