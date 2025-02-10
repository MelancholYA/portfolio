import { BsFillMouseFill } from "react-icons/bs";
import SkillsetGrid from "../components/Skills";
import Image from "next/image";
import { RxExternalLink } from "react-icons/rx";
import Link from "next/link";

const projects = [
  {
    title: "Lexonate – CMS for Scalable Content & Internalization",
    role: "Founder & Lead Developer",
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

const page = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-screen container p-6 animate-fade w-full flex items-center justify-center flex-col text-center gap-3">
        <h1>Yacine Ouardi</h1>
        <h3 className="!font-sans text-primary">
          Crafting Scalable, High-Performance Web Experiences
        </h3>
        <p className="md:w-6/12 text-primary/80">
          Building intuitive, fast, and user-focused applications with React,
          Next.js, and Node.js. Passionate about creating seamless digital
          experiences that make a difference.
        </p>

        <SkillsetGrid />

        <div className="flex gap-3 items-center mt-6">
          <Link href="/#projects" className="btn-primary">
            Get in touch
          </Link>
          <Link href="/#projects" className="btn-secondary">
            Check Projects
          </Link>
        </div>

        <BsFillMouseFill
          className=" text-2xl mt-12
      animate-bounce"
        />
      </section>

      {/* Experience */}

      <section className="container p-6 ">
        <h2 className="mb-12">Experience</h2>
        <div className="flex items-start relative gap-3">
          <Image
            src="/ld.png"
            alt="legal doctrine"
            width={600}
            height={315}
            className="opacity-70 backdrop-blur-lg brightness-125 sticky top-0"
          />
          <div className="p-6 rounded backdrop-blur-2xl">
            <h3 className="font-bold">Legal Doctrine</h3>
            <h4 className="text-lg font-semibold my-4">
              February 2023 – Present
            </h4>
            <p className="text-sm font-light">
              As a Frontend Engineer at Legal Doctrine, I’m shaping the future
              of legal research through cutting-edge web applications. Legal
              professionals rely on our platform for fast, reliable, and secure
              access to critical case law and legal data.
            </p>
            <p className="font-semibold my-3"> Key Achievements:</p>
            <ul>
              <li>
                Developed internal dashboards using Next.js & TypeScript,
                improving usability and workflow efficiency for legal teams.
              </li>

              <li>
                Refactored existing React components, reducing complexity and
                improving maintainability while enhancing performance.
              </li>

              <li>
                Implemented UI/UX enhancements, ensuring an intuitive and
                responsive experience for end users.
              </li>

              <li>
                Optimized API integrations, reducing data-fetching overhead and
                improving application responsiveness.
              </li>

              <li>
                Worked on accessibility improvements, ensuring compliance with
                best practices for user-friendly design.
              </li>

              <li>
                Improved accessibility & compliance with ARIA standards,
                ensuring a smooth experience for all users.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-start flex-row-reverse relative gap-3 my-6">
          <Image
            src="/tokio.jpg"
            alt="Tokio studio "
            width={600}
            height={315}
            className="opacity-70 backdrop-blur-lg shadow-lg shadow-primary/10 sticky top-0 rounded"
          />
          <div className="p-6 rounded backdrop-blur-2xl">
            <h3 className="font-bold">Tokio Studio</h3>
            <h4 className="text-lg font-semibold my-4">
              April 2021 – December 2022
            </h4>
            <p className="text-sm font-light">
              At Tokio Studio, I worked as a Frontend Developer, translating
              complex Figma designs into pixel-perfect, highly interactive React
              and React Native applications. This fast-paced environment
              sharpened my ability to write clean, maintainable code while
              collaborating with designers and backend teams.
            </p>
            <p className="font-semibold my-3"> Key Achievements:</p>
            <ul>
              <li>
                Transformed high-fidelity UI/UX designs into fully functional
                React components, ensuring 1:1 design accuracy.
              </li>

              <li>
                Developed full-scale React Native applications, consuming
                RESTful APIs to fetch and display dynamic content.
              </li>

              <li>
                Implemented advanced animations and transitions, using Framer
                Motion and Lottie for a seamless user experience.
              </li>
              <li>
                Delivered scalable, real-time features with WebSocket
                integration and automated deployment pipelines through CI/CD
                workflows with GitHub Actions, ensuring seamless product
                updates.
              </li>

              <li>
                Optimized performance on mobile and web platforms, reducing load
                times and improving Lighthouse scores.
              </li>

              <li>
                Worked closely with a remote international team, collaborating
                in an Agile environment to meet tight deadlines.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Technologies */}

      <section className="container p-6 my-24">
        <h2 className="mb-12 text-center">Technologies</h2>
        <SkillsetGrid isFullSet />
      </section>

      {/* Projects */}

      <section className="container p-6 mt-6" id="projects">
        <h2 className="mb-12 ">Featured Projects</h2>
        {projects.map((item, i) => (
          <div
            key={item.title}
            className={`flex group gap-3  my-12 ${
              i % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <div className="w-6/12 aspect-video shrink-0 relative ">
              <Image
                src={item.image}
                alt="Lexonate"
                width={600}
                height={350}
                className="rounded w-full h-full group-hover:opacity-25 transition-all backdrop-blur-lg object-cover "
              />
              <div className="absolute duration-300 overflow-hidden group-hover:opacity-100 bottom-0 left-0 w-full h-full opacity-0 transition-all bg-black/15 flex items-center justify-center">
                <Link href={item.link} target="_blank">
                  <RxExternalLink className="text-4xl mx-auto font-bold text-center text-white" />
                  <p className="text-lg font-semibold text-center text-white">
                    Visit Website
                  </p>
                </Link>
              </div>
            </div>

            <div className=" backdrop-blur-3xl p-3 rounded">
              <h3 className="font-bold ">{item.title}</h3>
              <p className="mt-3">
                <span className="font-semibold">Role : </span>
                {item.role}
              </p>
              <p className="mb-3">
                <span className="font-semibold"> Tech Stack :</span>
                {item.stack.map((skill, i) => (
                  <span
                    className="inline-block px-2 bg-primary/15 rounded m-1 "
                    key={skill + i}
                  >
                    {skill}
                  </span>
                ))}{" "}
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
    </main>
  );
};

export default page;
