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
    <div className="w-full pb-12">
      <Badge
        variant="secondary"
        className="bg-my-secondary text-white text-base my-4"
      >
        Main Projects
      </Badge>
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
    image: "",
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
    title: "Website Kampanye OSIS (SIKAT)",
    description:
      "Website yang saya buat ketika mencalonkan diri sebagai Ketua OSIS di sekolah saya.",
    image: "/img/projects/main/portofolio2.png",
    href: "https://tri-sakti.vercel.app/",
    year: 2024,
    icons: [
      {
        icon: RiTailwindCssFill,
        color: "cyan",
      },
      { icon: FaReact, color: "cyan" },
      {
        icon: BiLogoTypescript,
        color: "blue",
      },
    ],
    badges: ["Frontend", "Responsive", "Local Data"],
  },
  {
    title: "Habit Tracker",
    description:
      "Aplikasi React pertama saya. Aplikasi yang membantu dalam membentuk kebiasaan baru. Mampu menambahkan tugas dengan tipe tertentu, meningat tugas yang sudah diselesaikan, menghapus tugas.",
    image: "/img/projects/main/portofolio2.png",
    href: "https://wilbertfe.github.io/habittracker/",
    year: 2024,
    icons: [
      {
        icon: RiTailwindCssFill,
        color: "cyan",
      },
      { icon: FaReact, color: "cyan" },
      {
        icon: RiJavascriptFill,
        color: "yellow",
      },
    ],
    badges: ["Frontend", "Responsive", "Local Data"],
  },
  {
    title: "NimeKu",
    description:
      "Aplikasi FrontEnd website anime. Terintegrasi dengan API MyAnimeList (MAL)",
    image: "/img/projects/main/portofolio2.png",
    href: "https://wilbertfe.github.io/nimeku/",
    year: 2024,
    icons: [
      {
        icon: RiTailwindCssFill,
        color: "cyan",
      },
      { icon: FaReact, color: "cyan" },
      {
        icon: RiJavascriptFill,
        color: "yellow",
      },
    ],
    badges: ["Frontend", "Responsive", "API Integration"],
  },
  {
    title: "Github Search",
    description:
      "Terhubung dengan API Github. Aplikasi untuk Menemukan profile user github dan repository.",
    image: "",
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
  {
    title: "Website OSIS Methonam",
    description: "Website OSIS yang saya buat untuk sekolah dan para siswa.",
    image: "/img/projects/main/portofolio2.png",
    href: "https://web-osis-five.vercel.app/",
    year: 2025,
    icons: [
      {
        icon: RiTailwindCssFill,
        color: "cyan",
      },
      { icon: RiNextjsFill, color: "black" },
      {
        icon: BiLogoTypescript,
        color: "blue",
      },

      {
        icon: IoLogoFirebase,
        color: "orange",
      },
    ],
    badges: ["Fullstack", "Responsive"],
  },
  {
    title: "Portofolio V3",
    description: "Website portofolio terbaru.",
    image: "/img/projects/main/portofolio2.png",
    href: "https://wilbertbernardi.vercel.app/",
    year: 2025,
    icons: [
      {
        icon: RiTailwindCssFill,
        color: "cyan",
      },
      { icon: RiNextjsFill, color: "black" },
      {
        icon: BiLogoTypescript,
        color: "blue",
      },
      {
        icon: RiSupabaseFill,
        color: "lightgreen",
      },
    ],
    badges: ["Fullstack", "Responsive"],
  },
];
