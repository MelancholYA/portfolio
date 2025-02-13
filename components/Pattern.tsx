"use client";
import { useEffect, useRef, useState } from "react";
import {
  BiCodeBlock,
  BiCodeCurly,
  BiGitBranch,
  BiGitCommit,
  BiGitMerge,
  BiGitPullRequest,
  BiTerminal,
} from "react-icons/bi";
import {
  BsBraces,
  BsBugFill,
  BsClipboardData,
  BsCodeSlash,
  BsCpu,
  BsDatabase,
  BsFileCode,
} from "react-icons/bs";
import {
  FaBug,
  FaCode,
  FaDatabase,
  FaLaptopCode,
  FaProjectDiagram,
  FaServer,
  FaTerminal,
  FaTools,
} from "react-icons/fa";
import {
  RiCodeBoxLine,
  RiCodeSSlashLine,
  RiComputerLine,
  RiGitBranchLine,
  RiGitCommitLine,
  RiGitMergeLine,
  RiGitPullRequestLine,
  RiTerminalBoxLine,
} from "react-icons/ri";

interface Position {
  x: number;
  y: number;
}

const generateRandomPositions = (count = 30, minDistance = 100): Position[] => {
  if (typeof window === "undefined") return [];

  const width = document.documentElement.scrollWidth;
  const height = document.documentElement.scrollHeight;

  const positions: Position[] = [];

  while (positions.length < count) {
    const newPosition: Position = {
      x: Math.random() * (width - 50), // Keep away from edges
      y: Math.random() * (height - 250),
    };

    // Ensure positions are not too close
    const isFarEnough = positions.every((pos) => {
      const distance = Math.hypot(pos.x - newPosition.x, pos.y - newPosition.y);
      return distance > minDistance;
    });

    if (isFarEnough) {
      positions.push(newPosition);
    }
  }

  return positions;
};

const Icons = [
  FaCode,
  FaLaptopCode,
  FaTerminal,
  FaDatabase,
  FaServer,
  FaBug,
  FaProjectDiagram,
  FaTools,
  BiCodeBlock,
  BiCodeCurly,
  BiTerminal,
  BiGitBranch,
  BiGitCommit,
  BiGitMerge,
  BiGitPullRequest,
  BsCodeSlash,
  BsFileCode,
  BsBraces,
  BsBugFill,
  BsClipboardData,
  BsCpu,
  BsDatabase,
  RiCodeBoxLine,
  RiCodeSSlashLine,
  RiTerminalBoxLine,
  RiGitBranchLine,
  RiGitCommitLine,
  RiGitMergeLine,
  RiGitPullRequestLine,
  RiComputerLine,
];

const PatternGrid: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    setPositions(generateRandomPositions());
  }, []);

  return (
    <div className="-z-[90] absolute top-0 left-0 w-full h-full overflow-hidden">
      {positions.map((position, index) => {
        const Icon = Icons[index % Icons.length];
        return <PatternItem key={index} position={position} Icon={Icon} />;
      })}
    </div>
  );
};

interface PatternItemProps {
  Icon: React.ComponentType;
  position: Position;
}

const PatternItem: React.FC<PatternItemProps> = ({ Icon, position }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (boxRef.current) {
        const rect = boxRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Apply inverse-square gravity effect
        const force = Math.min(50, 1000 / (distance + 10)); // Max pull strength 50px

        setOffset({
          x: dx * (force / distance),
          y: dy * (force / distance),
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <code
      ref={boxRef}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.2s ease-out",
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
      className="absolute rotate-45 text-xl opacity-35"
    >
      <Icon />
    </code>
  );
};

export default PatternGrid;
