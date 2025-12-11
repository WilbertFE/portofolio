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
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type Icon = {
  icon: IconType;
  color: string;
};

type Projects = {
  id: number;
  title: string;
  description: string;
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
      <div className="grid lg:grid-cols-2 gap-8">
        {[...mainProjects]
          .sort((a: Projects, b: Projects) => b.year - a.year)
          .map((project, i) => (
            <div key={i} className="border bg-transparent p-1 rounded-xl">
              <Card className="px-4 py-6 h-full relative">
                <AspectRatio
                  ratio={16 / 9}
                  className="relative lg:h-64 overflow-hidden"
                >
                  {project.id ? (
                    <Image
                      src={`/img/projects/mockups/${project.id}.png`}
                      alt={project.title}
                      fill
                      className="object-center object-cover rounded-lg"
                    />
                  ) : (
                    <Skeleton className="max-w-full h-64" />
                  )}
                </AspectRatio>
                <CardHeader className="lg:space-x-4 flex flex-col gap-y-4 px-1">
                  <CardTitle className="text-lg tracking-wider w-full flex items-center gap-x-2">
                    <div className="flex flex-1 items-center gap-x-4">
                      <h1 className="line-clamp-1 ">{project.title}</h1>
                      <span className="text-muted-foreground text-base">
                        {"["}
                        {project.year}
                        {"]"}
                      </span>
                    </div>
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
    id: 1,
    title: "Weather Forecast",
    description:
      "An application that predicts current weather and forecasts future conditions. Connected to the OpenWeatherMap API.",
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
    id: 2,
    title: "Habit Tracker",
    description:
      "My first React application. It helps users build new habits by allowing them to add, complete, and delete tasks of various types.",
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
    id: 3,
    title: "NimeKu",
    description:
      "A frontend anime website integrated with the MyAnimeList (MAL) API.",
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
    id: 4,
    title: "Github Search",
    description:
      "Connected to the GitHub API. An application to search for GitHub user profiles and repositories.",
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
    id: 5,
    title: "Portofolio V2",
    description:
      "My second portfolio website, connected to Google Spreadsheet for data integration.",
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
    id: 6,
    title: "Methonam OSIS Website",
    description:
      "A website I built for the school's student council (OSIS) and students.",
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
    id: 7,
    title: "Portofolio V3",
    description: "The latest version of my personal portfolio website.",
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
