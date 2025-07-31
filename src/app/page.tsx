import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Code2 } from "lucide-react";
import { IconType } from "react-icons";
import { BiLogoPostgresql, BiLogoTypescript } from "react-icons/bi";
import { BsFiletypeScss } from "react-icons/bs";
import { DiMongodb, DiRedis } from "react-icons/di";
import {
  FaBootstrap,
  FaCss3,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa6";
import { IoLogoFirebase, IoLogoVercel } from "react-icons/io5";
import {
  RiJavascriptFill,
  RiNextjsFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import { SiExpress, SiJest, SiSupabase, SiVite } from "react-icons/si";

type Skill = {
  text: string;
  icon: IconType;
  color: string;
};

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
];

const learningSkill: Skill[] = [
  {
    text: "Python",
    icon: FaPython,
    color: "#4584b6",
  },
  {
    text: "Supabase",
    icon: SiSupabase,
    color: "#34B27B",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4 h-full p-6">
      <div className="space-y-2 h-max">
        <h1 className="text-xl font-bold tracking-wider">
          Hi, I&apos;m Wilbert Bernardi
        </h1>
        <div className="flex gap-x-4">
          <span className="text-sm text-muted-foreground">
            &bull; Tinggal di Medan, Indonesia (ID)
          </span>
          <span className="text-sm text-muted-foreground">&bull; Remote</span>
        </div>
        <p className="text-xs font-extralight leading-loose">
          Seorang Web Developer yang menghadirkan pembuatan website dengan
          teknologi terbaru.
        </p>
      </div>
      <Separator />
      <div className="space-y-2 h-max">
        <div className="space-y-2">
          <div className="flex gap-x-2">
            <Code2 />
            <span>Skills</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Skill professional saya.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex gap-x-4">
            {skills1.map((skill, i) => (
              <Badge key={i} variant="secondary" className="p-2 rounded-full">
                <div className="flex gap-x-1 items-center">
                  {<skill.icon size={20} style={{ color: skill.color }} />}
                  <span className="tracking-wider">{skill.text}</span>
                </div>
              </Badge>
            ))}
          </div>
          <div className="flex gap-x-4">
            {skills2.map((skill, i) => (
              <Badge key={i} variant="secondary" className="p-2 rounded-full">
                <div className="flex gap-x-1 items-center">
                  {<skill.icon size={20} style={{ color: skill.color }} />}
                  <span className="tracking-wider">{skill.text}</span>
                </div>
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-2 h-max">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">
            Skill yang sedang saya pelajari.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex gap-x-4">
            {learningSkill.map((skill, i) => (
              <Badge key={i} variant="secondary" className="p-2 rounded-full">
                <div className="flex gap-x-1 items-center">
                  {<skill.icon size={20} style={{ color: skill.color }} />}
                  <span className="tracking-wider">{skill.text}</span>
                </div>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
