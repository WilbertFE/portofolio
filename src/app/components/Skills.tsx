import { Badge } from "@/components/ui/badge";
import { Code2 } from "lucide-react";
import { BiLogoPostgresql, BiLogoTypescript } from "react-icons/bi";
import { BsFiletypeScss } from "react-icons/bs";
import { DiMongodb, DiRedis } from "react-icons/di";
import {
  FaBootstrap,
  FaCss3,
  FaFlutter,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaNodeJs,
  FaReact,
} from "react-icons/fa6";
import { IoLogoFirebase, IoLogoVercel } from "react-icons/io5";
import {
  RiJavascriptFill,
  RiNextjsFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import {
  SiExpress,
  SiJest,
  SiShadcnui,
  SiSupabase,
  SiVite,
} from "react-icons/si";
import { IconType } from "react-icons";

type Skill = {
  text: string;
  icon: IconType;
  color: string;
};

export function Skills() {
  return (
    <div className="space-y-2 h-max max-w-full overflow-x-scroll">
      <div className="flex items-center gap-x-2">
        <Code2 size={32} />
        <span className="text-2xl tracking-wider">Skills</span>
      </div>
      <div className="flex gap-x-2 gap-y-2 flex-wrap">
        <div className="space-y-2">
          <div className="space-y-2">
            <p className="text-muted-foreground">My professional skills.</p>
          </div>
          <div className="space-y-4 py-4 w-[1000px] overflow-x-hidden rounded-lg border border-muted-foreground">
            <ul className="flex gap-x-4 animate-infinite-scroll">
              {skills1.map((skill, i) => (
                <li key={i}>
                  <Badge
                    variant="secondary"
                    className="p-2 rounded-full border-[.5px] border-muted-foreground"
                  >
                    <div className="flex gap-x-1 items-center">
                      {<skill.icon size={32} style={{ color: skill.color }} />}
                      <span className="tracking-wider text-lg">
                        {skill.text}
                      </span>
                    </div>
                  </Badge>
                </li>
              ))}
            </ul>
            <ul className="flex gap-x-4 animate-infinite-scroll-2">
              {skills2.map((skill, i) => (
                <li key={i}>
                  <Badge
                    variant="secondary"
                    className="p-2 rounded-full border-[.5px] border-muted-foreground"
                  >
                    <div className="flex gap-x-1 items-center">
                      {<skill.icon size={32} style={{ color: skill.color }} />}
                      <span className="tracking-wider text-lg">
                        {skill.text}
                      </span>
                    </div>
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-2 h-max">
          <div className="space-y-2">
            <p className="text-muted-foreground">
              The skill I am currently learning.
            </p>
          </div>
          <div className="space-y-4">
            <ul className="flex gap-x-4 flex-wrap">
              {learningSkill.map((skill, i) => (
                <li key={i}>
                  <Badge variant="outline" className="p-2 rounded-full">
                    <div className="flex gap-x-1 items-center">
                      {<skill.icon size={32} style={{ color: skill.color }} />}
                      <span className="tracking-wider text-lg">
                        {skill.text}
                      </span>
                    </div>
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const skills1: Skill[] = [
  {
    text: "TailwindCSS",
    icon: RiTailwindCssFill,
    color: "cyan",
  },
  {
    text: "React",
    icon: FaReact,
    color: "cyan",
  },
  {
    text: "NextJS",
    icon: RiNextjsFill,
    color: "black",
  },
  {
    text: "TypeScript",
    icon: BiLogoTypescript,
    color: "blue",
  },
  {
    text: "Javascript",
    icon: RiJavascriptFill,
    color: "yellow",
  },
  {
    text: "Firebase",
    icon: IoLogoFirebase,
    color: "orange",
  },
  {
    text: "ExpressJS",
    icon: SiExpress,
    color: "black",
  },
  {
    text: "MongoDB",
    icon: DiMongodb,
    color: "lime",
  },
  {
    text: "NodeJS",
    icon: FaNodeJs,
    color: "lime",
  },
  {
    text: "PostgreSQL",
    icon: BiLogoPostgresql,
    color: "#008bb9",
  },
];

const skills2: Skill[] = [
  {
    text: "CSS3",
    icon: FaCss3,
    color: "#663399",
  },
  {
    text: "SCSS/SAAS",
    icon: BsFiletypeScss,
    color: "#cc6699",
  },
  {
    text: "HTML5",
    icon: FaHtml5,
    color: "#E34C26",
  },
  {
    text: "GIT",
    icon: FaGitAlt,
    color: "#E34C26",
  },
  {
    text: "Jest",
    icon: SiJest,
    color: "#C21325",
  },
  {
    text: "Github",
    icon: FaGithub,
    color: "white",
  },
  {
    text: "Bootstrap",
    icon: FaBootstrap,
    color: "#563d7c",
  },
  {
    text: "Vercel",
    icon: IoLogoVercel,
    color: "black",
  },
  {
    text: "Vite",
    icon: SiVite,
    color: "#BD34FE",
  },
  {
    text: "Redis",
    icon: DiRedis,
    color: "#A41E11",
  },
  {
    text: "ShadCN UI",
    icon: SiShadcnui,
    color: "black",
  },
  {
    text: "Supabase",
    icon: SiSupabase,
    color: "#34B27B",
  },
];

const learningSkill: Skill[] = [
  {
    text: "Flutter",
    icon: FaFlutter,
    color: "cyan",
  },
];
