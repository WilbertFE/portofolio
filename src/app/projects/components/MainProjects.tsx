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
import { RiJavascriptFill, RiTailwindCssFill } from "react-icons/ri";
import { TiLocationArrow } from "react-icons/ti";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

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
    <div className="w-full pb-32">
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
      "Aplikasi yang dapat memprediksi cuaca saat ini dan meramal cuaca di masa depan. Terkoneksi dengan API OpenWeatherMap.",
    image: "/img/projects/main/weatherapp.png",
    href: "https://wilbertfe.github.io/weatherapp/",
    year: 2023,
    icons: [
      {
        icon: DiHtml5,
        color: "red",
      },
      {
        icon: DiCss3,
        color: "lightblue",
      },
      { icon: RiJavascriptFill, color: "yellow" },
    ],
    badges: ["API Integration", "Responsive"],
  },
  {
    title: "Github Search",
    description:
      "Terhubung dengan API Github. Aplikasi untuk Menemukan profile user github dan repository.",
    image: "/img/projects/main/github-search.png",
    href: "https://wilbertfe.github.io/githubsearch/",
    year: 2024,
    icons: [
      {
        icon: DiHtml5,
        color: "red",
      },
      {
        icon: RiTailwindCssFill,
        color: "cyan",
      },
      { icon: RiJavascriptFill, color: "yellow" },
    ],
    badges: ["API Integration", "Responsive"],
  },
  {
    title: "Portofolio V2",
    description:
      "Website portofolio kedua saya. Terhubung dengan google spreadsheet.",
    image: "/img/projects/main/portofolio2.png",
    href: "https://wilbertfe.github.io/PortofolioV-2.0/",
    year: 2024,
    icons: [
      {
        icon: DiHtml5,
        color: "red",
      },
      {
        icon: RiTailwindCssFill,
        color: "cyan",
      },
      { icon: RiJavascriptFill, color: "yellow" },
    ],
    badges: ["Frontend", "Responsive", "Data Integration"],
  },
];
