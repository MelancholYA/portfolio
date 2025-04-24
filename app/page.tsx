"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
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
      <Suspense fallback={<div>Loading Hero...</div>}>
        <Hero />
      </Suspense>
      <Suspense fallback={<div>Loading About...</div>}>
        <About />
      </Suspense>
      <Suspense fallback={<div>Loading Projects...</div>}>
        <Projects />
      </Suspense>
      <Suspense fallback={<div>Loading Technologies...</div>}>
        <Technologies />
      </Suspense>
      <Suspense fallback={<div>Loading Experience...</div>}>
        <Experience />
      </Suspense>
      <Suspense fallback={<div>Loading Contact...</div>}>
        <Contact />
      </Suspense>
    </main>
  );
};

export default Page;
