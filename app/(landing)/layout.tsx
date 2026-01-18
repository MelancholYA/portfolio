import Nav from "../../components/general/Nav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yacine Ouardi | Frontend Engineer & Designer",
  description:
    "Welcome to the personal website of Yacine Ouardi, a frontend engineer and designer. Explore projects, experience, and get in touch.",
  keywords: [
    "Yacine Ouardi",
    "Frontend Engineer",
    "Frontend Developer",
    "Designer",
    "Portfolio",
    "Web Developer",
    "React",
    "Next.js",
    "Personal Website",
  ],
  openGraph: {
    title: "Yacine Ouardi | Frontend Engineer & Designer",
    description:
      "Welcome to the personal website of Yacine Ouardi, a frontend engineer and designer. Explore projects, experience, and get in touch.",
    url: "https://yacine-ouardi.com",
    siteName: "Yacine Ouardi",
    images: [
      {
        url: "https://yacine-ouardi.com/me.png",
        width: 1200,
        height: 630,
        alt: "Yacine Ouardi",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yacine Ouardi | Frontend Engineer & Designer",
    description:
      "Welcome to the personal website of Yacine Ouardi, frontend engineer & designer.",
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
};

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};

export default layout;
