import { IconType } from "react-icons";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TiLocationArrow } from "react-icons/ti";
import { DiCss3, DiHtml5 } from "react-icons/di";
import {
  RiJavascriptFill,
  RiNextjsFill,
  RiSupabaseFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import { Badge } from "@/components/ui/badge";
import { FaReact } from "react-icons/fa6";
import { IoLogoFirebase } from "react-icons/io5";
import { SiJest } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";

type Icon = {
  icon: IconType;
  color: string;
};

type Projects = {
  title: string;
  description: string;
  image: string;
  href: string;
  year: number;
  icons: Icon[];
};

export default function LearningProjects() {
  return (
    <div className="w-full space-y-8">
      <div className="flex justify-end">
        <Badge variant="outline" className="text-base my-4 justify-self-end">
          Learning Projects
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-8">
        {[...learningProjects]
          .sort((a: Projects, b: Projects) => b.year - a.year)
          .map((project, i) => (
            <div key={i} className="border bg-transparent p-1 rounded-xl">
              <Card className="px-4 py-6 h-full">
                <Skeleton className="max-w-full h-64" />
                <CardHeader className="space-x-4">
                  <CardTitle className="text-lg tracking-wider">
                    {project.title}{" "}
                    <span className="text-muted-foreground text-base">
                      {"["}
                      {project.year}
                      {"]"}
                    </span>
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                  <CardAction className="self-center">
                    <Button
                      asChild
                      variant="link"
                      className="tracking-wider font-bold text-my-primary"
                    >
                      <Link className="relative" href={project.href}>
                        Visit{" "}
                        <TiLocationArrow className="absolute top-0 -right-1" />
                      </Link>
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardFooter className="space-x-4">
                  {project.icons.map((icon, i) => (
                    <icon.icon key={i} size={32} color={icon.color} />
                  ))}
                </CardFooter>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}

const learningProjects: Projects[] = [
  {
    title: "Calculator",
    description:
      "Can perform basic arithmetic operations such as addition, subtraction, division, and multiplication.",
    image: "/img/projects/learning/calculator.png",
    href: "https://wilbertfe.github.io/Calculator/",
    year: 2023,
    icons: [
      { icon: DiHtml5, color: "red" },
      { icon: DiCss3, color: "lightblue" },
      { icon: RiJavascriptFill, color: "yellow" },
    ],
  },

  {
    title: "Portfolio V1",
    description: "My first personal portfolio website.",
    image: "/img/projects/learning/portofolio1.png",
    href: "https://wilbertfe.github.io/PortofolioV1/",
    year: 2023,
    icons: [
      { icon: DiHtml5, color: "red" },
      { icon: DiCss3, color: "lightblue" },
      { icon: RiJavascriptFill, color: "yellow" },
    ],
  },

  {
    title: "wBurger",
    description: "A website I built to practice layout design.",
    image: "/img/projects/learning/burger-web.png",
    href: "https://wilbertfe.github.io/burgerWeb/",
    year: 2023,
    icons: [
      { icon: DiHtml5, color: "red" },
      { icon: DiCss3, color: "lightblue" },
      { icon: RiJavascriptFill, color: "yellow" },
    ],
  },

  {
    title: "Jaaz",
    description:
      "A website I built to learn layouting and responsive design techniques.",
    image: "/img/projects/learning/Jaaz.png",
    href: "https://wilbertfe.github.io/Jaaz/",
    year: 2023,
    icons: [
      { icon: DiHtml5, color: "red" },
      { icon: RiTailwindCssFill, color: "cyan" },
      { icon: RiJavascriptFill, color: "yellow" },
    ],
  },

  {
    title: "To-do-list",
    description:
      "A simple to-do list project. Allows users to add, edit, delete, and track completed tasks.",
    image: "/img/projects/learning/to-do-list.png",
    href: "https://wilbertfe.github.io/To-Do-List/",
    year: 2023,
    icons: [
      { icon: DiHtml5, color: "red" },
      { icon: DiCss3, color: "lightblue" },
      { icon: RiJavascriptFill, color: "yellow" },
    ],
  },

  {
    title: "Tic-tac-toe Game",
    description: "A simple tic-tac-toe game built with React.",
    image: "/img/projects/learning/to-do-list.png",
    href: "https://tic-tac-toe-three-mu-27.vercel.app/",
    year: 2024,
    icons: [
      { icon: FaReact, color: "cyan" },
      { icon: DiCss3, color: "lightblue" },
      { icon: RiJavascriptFill, color: "yellow" },
    ],
  },

  {
    title: "Shopping Notes",
    description: "A simple shopping list app built with ReactJS.",
    image: "/img/projects/learning/to-do-list.png",
    href: "https://4-catatan-belanja.vercel.app/",
    year: 2024,
    icons: [
      { icon: FaReact, color: "cyan" },
      { icon: DiCss3, color: "lightblue" },
      { icon: RiJavascriptFill, color: "yellow" },
    ],
  },

  {
    title: "Rock-Paper-Scissors React",
    description: "A classic rock-paper-scissors game built with React.",
    image: "/img/projects/learning/to-do-list.png",
    href: "https://tebak-react.vercel.app/",
    year: 2024,
    icons: [
      { icon: FaReact, color: "cyan" },
      { icon: DiCss3, color: "lightblue" },
      { icon: RiJavascriptFill, color: "yellow" },
    ],
  },

  {
    title: "NextJS Login System",
    description:
      "A Next.js app with authentication and authorization using NextAuth, integrated with Google.",
    image: "/img/projects/learning/to-do-list.png",
    href: "https://my-next-app-router-five.vercel.app/",
    year: 2024,
    icons: [
      { icon: FaReact, color: "cyan" },
      { icon: RiTailwindCssFill, color: "cyan" },
      { icon: RiJavascriptFill, color: "yellow" },
      { icon: IoLogoFirebase, color: "orange" },
      { icon: SiJest, color: "red" },
      { icon: RiNextjsFill, color: "white" },
    ],
  },

  {
    title: "Next-Supabase",
    description: "A simple restaurant application integrated with Supabase.",
    image: "/img/projects/learning/to-do-list.png",
    href: "https://next-supabase-blush.vercel.app/",
    year: 2025,
    icons: [
      { icon: FaReact, color: "cyan" },
      { icon: RiTailwindCssFill, color: "cyan" },
      { icon: BiLogoTypescript, color: "blue" },
      { icon: RiSupabaseFill, color: "lightgreen" },
      { icon: RiNextjsFill, color: "white" },
    ],
  },
];
