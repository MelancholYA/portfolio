"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import TestimonialsSection from "../sections/Testemonials";

const SectionLoader = dynamic(() => import("../components/section-loader"), {
  ssr: true,
});

const sections = {
  Hero: dynamic(() => import("../sections/Hero"), { ssr: true }),
  About: dynamic(() => import("../sections/About"), { ssr: true }),
  Projects: dynamic(() => import("../sections/Projects"), { ssr: true }),
  Technologies: dynamic(() => import("../sections/Technologies"), {
    ssr: true,
  }),
  Experience: dynamic(() => import("../sections/Experience"), {
    ssr: true,
  }),
  Contact: dynamic(() => import("../sections/contact"), { ssr: true }),
};

const Page = () => {
  const { Hero, About, Projects, Technologies, Experience, Contact } = sections;

  return (
    <main>
      <SectionLoader variant="pulse" />
      <Suspense>
        <Hero />
      </Suspense>
      <Suspense>
        <About />
      </Suspense>
      <Suspense>
        <Projects />
      </Suspense>
      <Suspense>
        <Technologies />
      </Suspense>
      <Suspense>
        <Experience />
      </Suspense>
      <Suspense>
        <TestimonialsSection />
      </Suspense>
      <Suspense>
        <Contact />
      </Suspense>
    </main>
  );
};

export default Page;
