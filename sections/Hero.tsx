import Link from "next/link";
import { BsFillMouseFill } from "react-icons/bs";
import SkillsetGrid from "../components/Skills";

const Hero = () => {
  return (
    <section
      id=""
      className="relative  h-screen container md:pt-40 p-6 animate-fade w-full flex items-center justify-center flex-col text-center gap-3"
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl">Yacine Ouardi</h1>
      <h3 className="!font-sans text-primary text-xl md:text-2xl lg:text-3xl">
        Crafting Scalable, High-Performance Web Experiences
      </h3>
      <p className="md:w-6/12 text-primary/80 text-sm md:text-base lg:text-lg">
        Building intuitive, fast, and user-focused applications with React,
        Next.js, and Node.js. Passionate about creating seamless digital
        experiences that make a difference.
      </p>

      <SkillsetGrid />

      <div className="flex  flex-col md:flex-row gap-3 items-center mt-6">
        <Link href="/#contact" className="btn-primary w-full md:w-auto">
          Get in touch
        </Link>
        <Link href="/#projects" className="btn-secondary hue w-full md:w-auto">
          Check Projects
        </Link>
      </div>

      <BsFillMouseFill className="text-2xl mt-12 animate-bounce" />
    </section>
  );
};

export default Hero;
