import Image from "next/image";
import Link from "next/link";
import { RxExternalLink } from "react-icons/rx";

const projects = [
  {
    title: "Lexonate – CMS for Scalable Content & Internalization",
    role: "Founder & Solo Developer",
    image: "/projects/lexonate.png",
    featured: true,
    link: "https://lexonate-web.vercel.app/",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MUI",
      "React Query",
      "Node.js",
      "Express.js",
    ],
    briefe:
      "Lexonate is a lightweight yet powerful CMS that simplifies content management & internalization for multilingual web apps. I built it from scratch, focusing on:",
    tasks: [
      "Seamless internalization features for multi-language support",
      "Granular role-based access control (RBAC) for editors & admins",
      "Modern UI & effortless user experience using MUI & Tailwind CSS",
      "Scalable backend infrastructure with Node.js & Express",
    ],
  },
  {
    title: "Legal Doctrine – AI-Powered Legal Research Platform",
    image: "/projects/LD.png",
    link: "https://legal-doctrine.com/",
    role: "Frontend Developer",
    stack: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux",
      "React Query",
      "Node.js",
      "Express.js",
    ],
    briefe:
      "Legal Doctrine is an advanced AI-driven legal research platform that streamlines legal workflows. My contributions include:",
    tasks: [
      "Developed a dynamic internal dashboard using React and Redux",
      "Boosted SEO & performance with Next.js for a seamless experience",
      "Integrated REST APIs to process legal documents in real time",
      "Refactored UI components for better maintainability and scalability",
    ],
  },
  {
    title: "IDAA Academy – E-Learning Platform for AI & Data Science",
    role: "Frontend Engineer",
    link: "https://idaa.academy/",
    image: "/projects/idaa.png",
    stack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
    briefe:
      "IDAA Academy is a premier e-learning platform offering AI and data science courses. My contributions include:",
    tasks: [
      "Built an intuitive, high-performance learning dashboard with Next.js & Tailwind CSS",
      "Designed a responsive, accessible UI for seamless student engagement",
      "Optimized API integrations for course management and progress tracking",
      "Implemented interactive elements to enhance the user experience",
    ],
  },
];

const Projects = () => {
  return (
    <section className="container p-6" id="projects">
      <h2 className="mb-12 text-center text-2xl md:text-4xl">
        Featured Projects
      </h2>
      {projects.map((item, i) => (
        <div
          key={item.title}
          className={`flex flex-col md:flex-row group gap-3 my-24 ${
            i % 2 !== 0 ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          <div className="relative w-full md:w-1/2">
            <Image
              src={item.image}
              alt={item.title}
              width={600}
              height={350}
              className="rounded w-full h-full group-hover:opacity-80 transition-all backdrop-blur-lg object-cover"
            />
            <div className="absolute duration-300 overflow-hidden group-hover:opacity-100 bottom-0 left-0 w-full h-full opacity-0 transition-all bg-black/60 flex items-center justify-center">
              <Link href={item.link} target="_blank">
                <RxExternalLink className="text-4xl mx-auto font-bold text-center text-white" />
                <p className="text-lg font-semibold text-center text-white">
                  Visit Website
                </p>
              </Link>
            </div>
          </div>

          <div className="backdrop-blur-3xl p-3 rounded w-full md:w-7/12 shrink-0">
            <h3 className="font-bold text-xl md:text-2xl">{item.title}</h3>
            <p className="mt-3">
              <span className="font-semibold">Role: </span>
              {item.role}
            </p>
            <p className="mb-3">
              <span className="font-semibold">Tech Stack:</span>
              {item.stack.map((skill, i) => (
                <span
                  className="inline-block px-2 bg-primary/15 rounded m-1"
                  key={skill + i}
                >
                  {skill}
                </span>
              ))}
            </p>
            <p>{item.briefe}</p>
            <ul className="ps-2">
              {item.tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Projects;
