import Image from "next/image";

const experiences = [
  {
    company: "Legal Doctrine",
    period: "February 2023 – Present",
    description:
      "As a Frontend Engineer at Legal Doctrine, I’m shaping the future of legal research through cutting-edge web applications. Legal professionals rely on our platform for fast, reliable, and secure access to critical case law and legal data.",
    achievements: [
      "Developed internal dashboards using Next.js & TypeScript, improving usability and workflow efficiency for legal teams.",
      "Refactored existing React components, reducing complexity and improving maintainability while enhancing performance.",
      "Implemented UI/UX enhancements, ensuring an intuitive and responsive experience for end users.",
      "Optimized API integrations, reducing data-fetching overhead and improving application responsiveness.",
      "Worked on accessibility improvements, ensuring compliance with best practices for user-friendly design.",
      "Improved accessibility & compliance with ARIA standards, ensuring a smooth experience for all users.",
    ],
    image: {
      src: "/ld.png",
      alt: "legal doctrine",
    },
  },
  {
    company: "Tokio Studio",
    period: "April 2021 – December 2022",
    description:
      "At Tokio Studio, I worked as a Frontend Developer, translating complex Figma designs into pixel-perfect, highly interactive React and React Native applications. This fast-paced environment sharpened my ability to write clean, maintainable code while collaborating with designers and backend teams.",
    achievements: [
      "Transformed high-fidelity UI/UX designs into fully functional React components, ensuring 1:1 design accuracy.",
      "Developed full-scale React Native applications, consuming RESTful APIs to fetch and display dynamic content.",
      "Implemented advanced animations and transitions, using Framer Motion and Lottie for a seamless user experience.",
      "Delivered scalable, real-time features with WebSocket integration and automated deployment pipelines through CI/CD workflows with GitHub Actions, ensuring seamless product updates.",
      "Optimized performance on mobile and web platforms, reducing load times and improving Lighthouse scores.",
      "Worked closely with a remote international team, collaborating in an Agile environment to meet tight deadlines.",
    ],
    image: {
      src: "/tokio.jpg",
      alt: "Tokio studio",
    },
  },
];

const Experience = () => {
  return (
    <section id="experience" className="container p-6">
      <h2 className="mb-12 text-2xl md:text-3xl lg:text-4xl">Experience</h2>
      {experiences.map((exp, index) => (
        <div
          key={exp.company}
          className={`flex flex-col md:flex-row items-start relative gap-3 ${
            index % 2 !== 0 ? "md:flex-row-reverse my-6" : ""
          }`}
        >
          <Image
            src={exp.image.src}
            alt={exp.image.alt}
            width={600}
            height={315}
            className="md:opacity-70 hue shadow-lg shadow-primary/10 brightness-125 sticky z-50 top-0 rounded w-full md:w-1/2"
          />
          <div className="p-6 rounded hue w-full md:w-1/2">
            <h3 className="font-bold text-xl md:text-2xl">{exp.company}</h3>
            <h4 className="text-lg font-semibold my-4">{exp.period}</h4>
            <p className="text-sm font-light">{exp.description}</p>
            <p className="font-semibold my-3">Key Achievements:</p>
            <ul className="list-disc list-inside">
              {exp.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Experience;
