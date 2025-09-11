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
import { DiCss3, DiFirebase, DiHtml5 } from "react-icons/di";
import {
  RiJavascriptFill,
  RiNextjsFill,
  RiSupabaseFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import { Badge } from "@/components/ui/badge";
import { FaReact } from "react-icons/fa6";
import { IoLogoFirebase } from "react-icons/io5";
import { SiJest, SiTypescript } from "react-icons/si";
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
        <Badge
          variant="secondary"
          className="bg-my-secondary text-white text-base my-4 justify-self-end"
        >
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
      "Dapat menyelesaikan operasi aritmatik sederhana seperti tambah, kurang, bagi, kali.",
    image: "/img/projects/learning/calculator.png",
    href: "https://wilbertfe.github.io/Calculator/",
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
  },

  {
    title: "Portofolio V1",
    description: "Website portofolio pertama saya.",
    image: "/img/projects/learning/portofolio1.png",
    href: "https://wilbertfe.github.io/PortofolioV1/",
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
  },
  {
    title: "wBurger",
    description: "Website yang saya buat untuk belajar layouting.",
    image: "/img/projects/learning/burger-web.png",
    href: "https://wilbertfe.github.io/burgerWeb/",
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
  },
  {
    title: "Jaaz",
    description:
      "Website yang saya buat untuk belajar layouting dan responsive design.",
    image: "/img/projects/learning/Jaaz.png",
    href: "https://wilbertfe.github.io/Jaaz/",
    year: 2023,
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
  },
  {
    title: "To-do-list",
    description:
      "Project to-do-list sederhana. Bisa menambahkan tugas, menghapus, mengedit, dan mengingat tugas yang telah ditambahkan.",
    image: "/img/projects/learning/to-do-list.png",
    href: "https://wilbertfe.github.io/To-Do-List/",
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
  },
  {
    title: "Tic-tac-toe Game",
    description: "Permainan tic-tac-toe",
    image: "/img/projects/learning/to-do-list.png",
    href: "https://tic-tac-toe-three-mu-27.vercel.app/",
    year: 2024,
    icons: [
      {
        icon: FaReact,
        color: "cyan",
      },
      {
        icon: DiCss3,
        color: "lightblue",
      },
      { icon: RiJavascriptFill, color: "yellow" },
    ],
  },
  {
    title: "Catatan Belanja",
    description: "Aplikasi belanja sederhana dengan ReactJS.",
    image: "/img/projects/learning/to-do-list.png",
    href: "https://4-catatan-belanja.vercel.app/",
    year: 2024,
    icons: [
      {
        icon: FaReact,
        color: "cyan",
      },
      {
        icon: DiCss3,
        color: "lightblue",
      },
      { icon: RiJavascriptFill, color: "yellow" },
    ],
  },
  {
    title: "Batu-Gunting-Kertas React",
    description: "Permainan batu gunting kertas.",
    image: "/img/projects/learning/to-do-list.png",
    href: "https://tebak-react.vercel.app/",
    year: 2024,
    icons: [
      {
        icon: FaReact,
        color: "cyan",
      },
      {
        icon: DiCss3,
        color: "lightblue",
      },
      { icon: RiJavascriptFill, color: "yellow" },
    ],
  },
  {
    title: "NextJS Login System",
    description:
      "Aplikasi NextJS dengan authentication and authorization dengan NextAuth. Terintegrasi dengan Google.",
    image: "/img/projects/learning/to-do-list.png",
    href: "https://my-next-app-router-five.vercel.app/",
    year: 2024,
    icons: [
      {
        icon: FaReact,
        color: "cyan",
      },
      {
        icon: RiTailwindCssFill,
        color: "cyan",
      },
      { icon: RiJavascriptFill, color: "yellow" },
      { icon: IoLogoFirebase, color: "orange" },
      { icon: SiJest, color: "red" },
      { icon: RiNextjsFill, color: "black" },
    ],
  },
  {
    title: "Next-Supabase",
    description: "Aplikasi restoran sederhana terintegrasi dengan Supabase.",
    image: "/img/projects/learning/to-do-list.png",
    href: "https://next-supabase-blush.vercel.app/",
    year: 2025,
    icons: [
      {
        icon: FaReact,
        color: "cyan",
      },
      {
        icon: RiTailwindCssFill,
        color: "cyan",
      },
      { icon: BiLogoTypescript, color: "blue" },
      { icon: RiSupabaseFill, color: "lightgreen" },
      { icon: RiNextjsFill, color: "black" },
    ],
  },
];
