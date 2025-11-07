import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconType } from "react-icons";
import { DiCss3, DiHtml5 } from "react-icons/di";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  RiJavascriptFill,
  RiNextjsFill,
  RiSupabaseFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import { TiLocationArrow } from "react-icons/ti";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { FaReact } from "react-icons/fa6";
import { BiLogoTypescript } from "react-icons/bi";
import { IoLogoFirebase } from "react-icons/io5";

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
  badges: string[];
};

export default function MainProjects() {
  return (
    <div className="w-full pb-12 space-y-12">
      <h1 className="text-2xl text-my-primary font-bold tracking-wide">
        Main Projects
      </h1>
      <div className="grid grid-cols-2 gap-8">
        {[...mainProjects]
          .sort((a: Projects, b: Projects) => b.year - a.year)
          .map((project, i) => (
            <div key={i} className="border bg-transparent p-1 rounded-xl">
              <Card className="px-4 py-6 h-full">
                <Skeleton className="max-w-full h-64" />
                <CardHeader className="space-x-4">
                  <CardTitle className="text-lg tracking-wider flex items-center gap-x-2">
                    <h1>{project.title}</h1>
                    <span className="text-muted-foreground text-base">
                      {"["}
                      {project.year}
                      {"]"}
                    </span>
                  </CardTitle>
                  <CardDescription className="space-y-4">
                    <div className="space-x-2">
                      {project.badges.map((badge, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-blue-500 text-white dark:bg-blue-600"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                    <p>{project.description}</p>
                  </CardDescription>
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

const mainProjects: Projects[] = [
  {
    title: "Weather Forecast",
    description:
      "An application that predicts current weather and forecasts future conditions. Connected to the OpenWeatherMap API.",
    image: "",
    href: "https://wilbertfe.github.io/weatherapp/",
    year: 2023,
    icons: [
      { icon: DiHtml5, color: "red" },
      { icon: DiCss3, color: "lightblue" },
      { icon: RiJavascriptFill, color: "yellow" },
    ],
    badges: ["API Integration", "Responsive"],
  },

  {
    title: "Habit Tracker",
    description:
      "My first React application. It helps users build new habits by allowing them to add, complete, and delete tasks of various types.",
    image: "/img/projects/main/portofolio2.png",
    href: "https://wilbertfe.github.io/habittracker/",
    year: 2024,
    icons: [
      { icon: RiTailwindCssFill, color: "cyan" },
      { icon: FaReact, color: "cyan" },
      { icon: RiJavascriptFill, color: "yellow" },
    ],
    badges: ["Frontend", "Responsive", "Local Data"],
  },

  {
    title: "NimeKu",
    description:
      "A frontend anime website integrated with the MyAnimeList (MAL) API.",
    image: "/img/projects/main/portofolio2.png",
    href: "https://wilbertfe.github.io/nimeku/",
    year: 2024,
    icons: [
      { icon: RiTailwindCssFill, color: "cyan" },
      { icon: FaReact, color: "cyan" },
      { icon: RiJavascriptFill, color: "yellow" },
    ],
    badges: ["Frontend", "Responsive", "API Integration"],
  },

  {
    title: "Github Search",
    description:
      "Connected to the GitHub API. An application to search for GitHub user profiles and repositories.",
    image: "",
    href: "https://wilbertfe.github.io/githubsearch/",
    year: 2024,
    icons: [
      { icon: DiHtml5, color: "red" },
      { icon: RiTailwindCssFill, color: "cyan" },
      { icon: RiJavascriptFill, color: "yellow" },
    ],
    badges: ["API Integration", "Responsive"],
  },

  {
    title: "Portofolio V2",
    description:
      "My second portfolio website, connected to Google Spreadsheet for data integration.",
    image: "/img/projects/main/portofolio2.png",
    href: "https://wilbertfe.github.io/PortofolioV-2.0/",
    year: 2024,
    icons: [
      { icon: DiHtml5, color: "red" },
      { icon: RiTailwindCssFill, color: "cyan" },
      { icon: RiJavascriptFill, color: "yellow" },
    ],
    badges: ["Frontend", "Responsive", "Data Integration"],
  },

  {
    title: "Methonam OSIS Website",
    description:
      "A website I built for the school's student council (OSIS) and students.",
    image: "/img/projects/main/portofolio2.png",
    href: "https://web-osis-five.vercel.app/",
    year: 2025,
    icons: [
      { icon: FaReact, color: "cyan" },
      { icon: RiTailwindCssFill, color: "cyan" },
      { icon: RiNextjsFill, color: "white" },
      { icon: BiLogoTypescript, color: "blue" },
      { icon: IoLogoFirebase, color: "orange" },
    ],
    badges: ["Fullstack", "Responsive"],
  },

  {
    title: "Portofolio V3",
    description: "The latest version of my personal portfolio website.",
    image: "/img/projects/main/portofolio2.png",
    href: "https://wilbertbernardi.vercel.app/",
    year: 2025,
    icons: [
      { icon: FaReact, color: "cyan" },
      { icon: RiTailwindCssFill, color: "cyan" },
      { icon: RiNextjsFill, color: "white" },
      { icon: BiLogoTypescript, color: "blue" },
      { icon: RiSupabaseFill, color: "lightgreen" },
    ],
    badges: ["Fullstack", "Responsive"],
  },
];
