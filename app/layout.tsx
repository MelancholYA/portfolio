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
  title: "Yacine Ouardi | Frontend Software Engineer ",
  description:
    "Passionate Frontend Engineer crafting high-performance web apps with React, Next.js, and TypeScript. Expert in building interactive UIs, scalable architectures, and delivering seamless user experiences. Available for remote work and visa-sponsored opportunities.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Engineer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Web Performance Optimization",
    "UI/UX Development",
    "SEO-friendly Websites",
    "Remote Frontend Developer",
    "Visa Sponsorship Developer",
    "Interactive Web Applications",
    "Scalable Frontend Architectures",
    "Full-Stack JavaScript",
    "MERN Stack Developer",
  ],
  openGraph: {
    title: "Yacine Ouardi | Expert Frontend Developer",
    description:
      "I specialize in building dynamic, scalable, and high-performance web apps using React, Next.js, and TypeScript. Let's build something great together.",
    url: "https://yacine-ouardi.vercel.app",
    type: "website",
    images: [
      {
        url: "https://yacine-ouardi.vercel.app/me.png",
        width: 1200,
        height: 630,
        alt: "Yacine Ouardi - Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourTwitterHandle",
    title: "Yacine Ouardi | Frontend Engineer & React Specialist",
    description:
      "Frontend Engineer with expertise in React, Next.js, and TypeScript. Building cutting-edge, performance-optimized web applications.",
    images: "https://yacine-ouardi.vercel.app/me.png",
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
      </body>
    </html>
  );
}
