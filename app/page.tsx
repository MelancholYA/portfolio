"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import ExperienceSection from "../sections/Experience";
import HomeLoader from "../components/loader";

const Contact = dynamic(() => import("../sections/contact"));
const Hero = dynamic(() => import("../sections/Hero"));
const About = dynamic(() => import("../sections/About"));
const Projects = dynamic(() => import("../sections/Projects"));
const Technologies = dynamic(() => import("../sections/Technologies"));

const page = () => {
  return (
    <main>
      <Suspense fallback={<HomeLoader />}>
        {/* Hero */}
        <Hero />
        {/* About */}
        <About />
        {/* Projects */}
        <Projects />
        {/* Technologies */}
        <Technologies />
        {/* Experience */}
        <ExperienceSection />
        <Contact />
      </Suspense>
    </main>
  );
};

export default page;
