"use client";

import React from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { IconType } from "react-icons";
import { DiCss3, DiHtml5 } from "react-icons/di";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RiJavascriptFill, RiTailwindCssFill } from "react-icons/ri";
import { TiLocationArrow } from "react-icons/ti";

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

export default function page() {
  return (
    <div className="flex flex-wrap gap-y-16 px-8 pb-32 pt-16 container mx-auto">
      <div className="w-full space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold tracking-wider">Main Projects</h1>
          <p className="text-lg tracking-wide">Proyek yang saya buat.</p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {mainProjects.map((project, i) => (
            <div key={i} className="border bg-transparent p-1 rounded-xl">
              <Card className="px-4 py-6 h-full">
                <div className="max-w-full h-64 relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-center rounded-sm"
                  />
                </div>
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
      <div className="w-full space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold tracking-wider">
            Learning Projects
          </h1>
          <p className="text-lg tracking-wide">
            Proyek yang saya buat untuk belajar.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {learningProjects.map((project, i) => (
            <div key={i} className="border bg-transparent p-1 rounded-xl">
              <Card className="px-4 py-6 h-full">
                <div className="max-w-full h-64 relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-center rounded-sm"
                  />
                </div>
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
];

const mainProjects: Projects[] = [
  {
    title: "Weather Forecast",
    description:
      "Aplikasi yang dapat memprediksi cuaca saat ini dan meramal cuaca di masa depan. Terkoneksi dengan API OpenWeatherMap.",
    image: "/img/projects/learning/weatherapp.png",
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
  },
  {
    title: "Github Search",
    description:
      "Terhubung dengan API Github. Aplikasi untuk Menemukan profile user github dan repository.",
    image: "/img/projects/learning/github-search.png",
    href: "https://wilbertfe.github.io/Jaaz/",
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
  },
  {
    title: "Portofolio V2",
    description: "Website portofolio kedua saya.",
    image: "/img/projects/learning/portofolio2.png",
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
  },
];
