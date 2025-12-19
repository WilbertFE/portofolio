import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaGithub, FaInstagram, FaReact, FaYoutube } from "react-icons/fa6";
import { SiShadcnui, SiSupabase } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { IoLogoFirebase } from "react-icons/io5";
import { DiMongodb } from "react-icons/di";
import { Badge } from "@/components/ui/badge";

type Skill = {
  text: string;
  icon: IconType;
  color: string;
};

export default function Hero() {
  return (
    <div className="w-full flex relative flex-col pb-32">
      <div className="space-y-2 relative w-full items-center flex gap-x-4 flex-col lg:flex-row">
        <div className="w-full lg:w-1/4 space-y-4">
          <h2 className="lg:text-4xl text-xl font-bold tracking-wider">
            I&apos;m
          </h2>
          <h1 className="text-my-primary lg:text-8xl text-4xl text-shadow-lg leading-tight font-bold tracking-wider">
            {" "}
            Wilbert Bernardi
          </h1>
          <Separator className="min-h-[3px] my-4 bg-my-dark" />
          <p className="max-w-full lg:text-base text-sm">
            Ready to build modern, fast, and responsive websites. Suitable for
            personal, business, and brand use.
          </p>
        </div>
        <div className="w-full lg:grow">
          <AspectRatio className="w-full h-full" ratio={1 / 1}>
            <Image
              src="/img/about/about.png"
              alt="Wilbert Bernardi"
              className="rounded-md object-cover h-full w-full"
              fill
            />
          </AspectRatio>
        </div>
        <div className="flex flex-col lg:w-1/2 mt-46 lg:mt-0 self-start space-y-8">
          <div className="space-y-4">
            <p className="font-bold text-lg text-my-primary">
              Full-Stack Web Developer
            </p>
            <p className="text-xl">Modern Web Solutions, Built for You.</p>
            <Button variant="link" asChild>
              <Link href="/dashboard" className="flex gap-x-2 text-lg">
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
            <p className="text-xl">
              The main technologies that are frequently used.
            </p>
            <Button variant="link" asChild>
              <Link
                href="/projects"
                className="flex justify-self-end gap-x-2 text-lg"
              >
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
          className="absolute -z-10 lg:w-[60%] lg:left-[20%] w-full lg:top-[10%] top-[15%]"
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
      <div className="px-2 py-6 gap-y-4 gap-x-4 flex-wrap flex lg:block lg:flex-nowrap justify-around absolute lg:border shadow-lg top-[33%] lg:top-[75%] bg-transparent lg:bg-muted rounded-lg lg:left-1/2 lg:-translate-x-1/2">
        <Badge
          variant="outline"
          className="lg:text-base text-xs tracking-wide border-4 border-my-primary rounded-full"
        >
          Continuous Learner
        </Badge>
        <Badge
          variant="outline"
          className="lg:text-base text-xs tracking-wide border-4 border-my-primary rounded-full"
        >
          Full-Stack Web Developer
        </Badge>
        <Badge
          variant="outline"
          className="lg:text-base text-xs tracking-wide border-4 border-my-primary rounded-full"
        >
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
    text: "Youtube",
    href: "https://www.youtube.com/@WilbertBernardis",
    icon: FaYoutube,
  },
  {
    text: "Instagram",
    href: "https://www.instagram.com/bernardiwilberts/",
    icon: FaInstagram,
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
