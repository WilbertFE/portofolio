import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";

export default function About() {
  return (
    <div className="gap-y-4 flex flex-wrap p-6 container">
      <div className="space-y-2 w-full items-center flex gap-x-16">
        <div className="w-1/3">
          <h1 className="text-4xl font-bold tracking-wider">
            Hello, I&apos;m
            <span className="text-cyan-400"> Wilbert Bernardi</span>
          </h1>
          <Separator className="min-h-[2px] my-4 bg-yellow-300" />
          <p className="max-w-full">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis
            dolor officiis cupiditate. Modi neque mollitia assumenda aliquid ut
            omnis vero!
          </p>
        </div>
        <div className="w-1/3 min-h-96">
          <AspectRatio className="w-full h-full" ratio={3 / 4}>
            <Image
              src="/img/profile.png"
              alt="Wilbert Bernardi"
              className="rounded-md object-cover h-full w-full"
              fill
            />
          </AspectRatio>
        </div>
        <div className="space-y-4 w-1/3">
          <p className="font-bold text-lg text-cyan-400">Web Developer</p>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
            omnis.
          </p>
          <div className="flex gap-x-2 text-yellow-300">
            <span>show more</span>
            <ArrowRight />
          </div>
          <div className="flex gap-x-8 mb-8">
            {sosmed.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="bg-foreground p-2 rounded-full"
              >
                <item.icon className="text-yellow-600" size={32} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const sosmed: { text: string; href: string; icon: IconType }[] = [
  {
    text: "Instagram",
    href: "https://www.instagram.com/bernardiwilberts/",
    icon: FaInstagram,
  },
  {
    text: "Youtube",
    href: "https://www.youtube.com/@WilbertBernardis",
    icon: FaYoutube,
  },
  {
    text: "Tiktok",
    href: "https://www.tiktok.com/@bernardiwilbert",
    icon: FaTiktok,
  },
  {
    text: "Github",
    href: "https://github.com/WilbertFE",
    icon: FaGithub,
  },
  {
    text: "Linkedin",
    href: "/",
    icon: FaLinkedin,
  },
];
