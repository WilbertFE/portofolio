import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaReact } from "react-icons/fa6";
import { SiShadcnui, SiSupabase } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { IoLogoFirebase } from "react-icons/io5";
import { DiMongodb } from "react-icons/di";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdOutlineWorkOutline, MdWork } from "react-icons/md";
import { Badge } from "@/components/ui/badge";

type Skill = {
  text: string;
  icon: IconType;
  color: string;
};

export function Hero() {
  return (
    <div className="w-full flex relative flex-col">
      <div className="space-y-2 relative w-full items-center flex gap-x-4">
        <div className="w-1/4 space-y-4">
          <h2 className="text-4xl font-bold tracking-wider">I&apos;m</h2>
          <h1 className="text-my-primary text-8xl text-shadow-lg leading-tight font-bold tracking-wider">
            {" "}
            Wilbert Bernardi
          </h1>
          <Separator className="min-h-[3px] my-4 bg-my-dark" />
          <p className="max-w-full">
            Seorang Web Developer yang fokus membangun website modern, cepat,
            dan responsif. Cocok untuk personal, bisnis, maupun brand.
          </p>
        </div>
        <div className="grow">
          <AspectRatio className="w-full h-full" ratio={1 / 1}>
            <Image
              src="/img/about.png"
              alt="Wilbert Bernardi"
              className="rounded-md object-cover h-full w-full"
              fill
            />
          </AspectRatio>
        </div>
        <div className="flex flex-col w-1/4 self-start mt-12 space-y-8">
          <div className="space-y-4">
            <p className="font-bold text-lg text-my-primary">
              Full-Stack Web Developer
            </p>
            <p className="text-xl">Modern Web Solutions, Built for You.</p>
            <Button variant="link" asChild>
              <Link href="/" className="flex gap-x-2 text-lg">
                <span>show more</span>
                <ArrowRight />
              </Link>
            </Button>
            <div className="flex flex-wrap gap-x-8 mb-8">
              {sosmed.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="bg-white p-2 rounded-full"
                >
                  <item.icon className="text-black" size={32} />
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-4 text-right">
            <p className="font-bold text-lg text-my-primary">Tech Stack</p>
            <p className="text-xl">Teknologi utama yang sering digunakan.</p>
            <Button variant="link" asChild>
              <Link href="/" className="flex justify-self-end gap-x-2 text-lg">
                <ArrowLeft />
                <span>show more</span>
              </Link>
            </Button>
            <div className="flex gap-x-8 mb-8 flex-wrap gap-y-4">
              {skills.map((skill, i) => (
                <div className="border rounded-full p-4" key={i}>
                  <skill.icon size={32} style={{ color: skill.color }} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <svg
          className="absolute -z-10 w-[60%] left-1/5"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#5e936c"
            d="M44,-76.2C58,-68,71.2,-58.4,79.5,-45.4C87.8,-32.5,91.3,-16.2,91.4,0C91.4,16.3,87.9,32.5,79.6,45.6C71.4,58.6,58.3,68.5,44.2,75.1C30.1,81.8,15.1,85.3,0,85.3C-15,85.2,-30.1,81.6,-43.1,74.4C-56.2,67.1,-67.2,56.2,-76.3,43.2C-85.4,30.1,-92.4,15.1,-92.6,-0.1C-92.9,-15.3,-86.2,-30.7,-77.7,-44.6C-69.2,-58.6,-58.9,-71.3,-45.6,-79.9C-32.3,-88.6,-16.2,-93.1,-0.6,-92.1C15,-91.1,29.9,-84.4,44,-76.2Z"
            transform="translate(100 93)"
          />
        </svg>
      </div>
      <div className="px-4 py-6 flex gap-x-4 justify-around absolute border shadow-lg bottom-16 bg-muted rounded-lg left-1/2 -translate-x-1/2">
        <Badge variant="outline" className="text-base">
          Continuous Learner
        </Badge>
        <Badge variant="outline" className="text-base">
          Full-Stack Web Developer
        </Badge>
        <Badge variant="outline" className="text-base">
          Tech Enthusiast
        </Badge>
      </div>
    </div>
  );
}

const sosmed: { text: string; href: string; icon: IconType }[] = [
  {
    text: "Github",
    href: "https://github.com/WilbertFE",
    icon: FaGithub,
  },
  {
    text: "Linkedin",
    href: "https://www.linkedin.com/in/wilbert-bernardi-13683a2a7/",
    icon: FaLinkedin,
  },
  {
    text: "Fastwork",
    href: "https://fastwork.id/user/wilbertbernardi",
    icon: MdWork,
  },
];

const skills: Skill[] = [
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
    color: "white",
  },
  {
    text: "TypeScript",
    icon: BiLogoTypescript,
    color: "blue",
  },
  {
    text: "Supabase",
    icon: SiSupabase,
    color: "#34B27B",
  },
  {
    text: "Firebase",
    icon: IoLogoFirebase,
    color: "orange",
  },
  {
    text: "ShadCN UI",
    icon: SiShadcnui,
    color: "white",
  },
  {
    text: "MongoDB",
    icon: DiMongodb,
    color: "lime",
  },
];
