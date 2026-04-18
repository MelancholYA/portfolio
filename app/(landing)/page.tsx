import dynamic from "next/dynamic";
import { Suspense } from "react";
import { FeaturedPosts } from "../../components/general/featured-posts";

const Loader = () => (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black z-[9999]">
    <span className="loader"></span>
  </div>
);

const sections = {
  Hero: dynamic(() => import("../../sections/Hero"), { ssr: true }),
  About: dynamic(() => import("../../sections/About"), { ssr: true }),
  Projects: dynamic(() => import("../../sections/Projects"), { ssr: true }),
  Technologies: dynamic(() => import("../../sections/Technologies"), {
    ssr: true,
  }),
  Experience: dynamic(() => import("../../sections/Experience"), {
    ssr: true,
  }),
  Testimonials: dynamic(() => import("../../sections/Testemonials"), {
    ssr: true,
  }),
  Contact: dynamic(() => import("../../sections/contact"), { ssr: true }),
};

const Page = () => {
  const {
    Hero,
    About,
    Projects,
    Technologies,
    Experience,
    Testimonials,
    Contact,
  } = sections;

  return (
    <main>
      <Suspense fallback={<Loader />}>
        <Hero />
        <About />
        <Projects />
        <Technologies />
        <Experience />
        <section className="py-12 bg-primary/10 hue">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-light mb-8 text-center">
              Featured Articles
            </h2>
            <FeaturedPosts />
          </div>
        </section>
        <Testimonials />
        <Contact />
      </Suspense>
    </main>
  );
};

export default Page;
