import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiSass,
  SiRedux,
  SiReactquery,
  SiNodedotjs,
  SiExpress,
  SiCypress,
  SiGithubactions,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiMongodb,
  SiGit,
} from "react-icons/si";

// Array of technology objects with name and icon
const baseTechnologies = [
  { name: "React.js", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Cypress", icon: SiCypress },
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
];

// Component to render the skillset grid
const SkillsetGrid = ({ isFullSet = false }: { isFullSet?: boolean }) => {
  const technologies = [
    ...baseTechnologies,
    ...(isFullSet
      ? [
          { name: "Tailwind CSS", icon: SiTailwindcss },
          { name: "SCSS", icon: SiSass },
          { name: "Redux", icon: SiRedux },
          { name: "React Query", icon: SiReactquery },
          { name: "Express.js", icon: SiExpress },
          { name: "CI/CD ", icon: SiGithubactions },
          { name: "HTML5", icon: SiHtml5 },
          { name: "CSS3", icon: SiCss3 },
          { name: "MongoDB", icon: SiMongodb },
          { name: "Git", icon: SiGit },
        ]
      : []),
  ];
  return (
    <div className="flex items-center justify-center gap-4 mt-6 flex-wrap w-full">
      {technologies.map(({ name, icon: Icon }, index) => (
        <div
          key={index}
          className="flex rounded flex-col items-center p-3 hover:scale-110 hue w-24 sm:w-28 text-center transition-all duration-300"
        >
          <Icon className="text-white text-lg sm:text-xl mb-2 sm:mb-3" />
          <span className="text-white font-semibold tracking-wide whitespace-nowrap text-sm sm:text-base">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SkillsetGrid;
