import ImageDistorion from "../components/ImageDistorion";

const myJourney = {
  title: "My Journey",
  subtitle: "From Self-Taught Developer to Product Builder",
  intro:
    "My journey into web development wasn’t conventional—it was fueled by curiosity, passion, and relentless learning. I started as a self-taught developer, diving deep into JavaScript, TypeScript, and the React ecosystem, crafting projects that pushed my limits.",
  sections: [
    {
      title: "Early Days – Building the Foundation",
      content:
        "I began by reverse-engineering complex UIs, breaking down intricate designs into reusable React components. My first hands-on experience came with freelance projects, where I transformed Figma designs into high-performance web applications.",
    },
    {
      title: "Breaking into the Industry",
      content:
        "I landed my first major role at Legal Doctrine, where I refined my skills in Next.js, React Query, and API integrations, working on an AI-powered legal research platform. This experience shaped my approach to performance optimization and scalable architectures.",
    },
    {
      title: "Growth & Innovation",
      content:
        "Working with IDAA Academy gave me insights into e-learning platforms, crafting interactive dashboards and seamless UX/UI experiences. But I wanted more—I wanted to build something from scratch.",
    },
    {
      title: "Lexonate – My Vision in Action",
      content:
        "I founded Lexonate, a CMS designed for scalable content and internalization, solving real-world challenges in multilingual web apps. Here, I combined full-stack expertise (Next.js, Node.js, Tailwind, Express) with my deep understanding of role-based access control (RBAC) to create a seamless product.",
    },
    {
      title: "What’s Next?",
      content:
        "I’m always seeking challenges that push boundaries—whether it's optimizing performance, crafting intuitive interfaces, or building products that make an impact.",
    },
  ],
};

const About = () => {
  return (
    <section className="container my-24 mb-36">
      <div className="flex flex-col lg:flex-row items-center lg:space-x-8">
        <div className="w-full lg:w-5/12 shrink-0 h-full mb-8 lg:mb-0">
          <ImageDistorion />
        </div>
        <div className="w-full lg:w-7/12 backdrop-blur p-6 rounded">
          <h2>{myJourney.title}</h2>
          <h3 className="text-base text-primary mt-1">{myJourney.subtitle}</h3>
          <p className="my-2">{myJourney.intro}</p>
          <ul>
            {myJourney.sections.map((section, i) => (
              <li className="list-none mb-4" key={`section-${i}`}>
                <h4 className="font-semibold mb-1">🔹 {section.title}</h4>
                <p className="!text-sm font-light">{section.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
