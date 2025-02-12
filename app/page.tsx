"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import ExperienceSection from "../sections/Experience";

const Contact = dynamic(() => import("../sections/contact"));
const Hero = dynamic(() => import("../sections/Hero"));
const About = dynamic(() => import("../sections/About"));
const Projects = dynamic(() => import("../sections/Projects"));
const Technologies = dynamic(() => import("../sections/Technologies"));

const page = () => {
  return (
    <main>
      <Suspense
        fallback={
          <>
            <span className="fixed top-0 left-0 h-screen w-screen bg-black z-50"></span>
            <span className="fixed top-1/2 left-1/2 h-10 rounded-full w-10 -translate-x-1/2 -translate-y-1/2 bg-white z-50 blur-lg animate-pulse"></span>
            <span className="fixed top-1/2 left-1/2 h-5 rounded-full w-5 -translate-x-1/2 -translate-y-1/2 bg-white z-50 blur animate-pulse"></span>
          </>
        }
      >
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
