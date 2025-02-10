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
  title: "Create Next App",
  description: "Generated by create next app",
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
        <HomeLoader />
        <PatternGrid />
        <GridBackground />

        {children}
      </body>
    </html>
  );
}
