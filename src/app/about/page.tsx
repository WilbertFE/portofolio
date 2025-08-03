import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMailchimp,
  FaTiktok,
  FaVoicemail,
  FaYoutube,
} from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

export default function About() {
  return (
    <div className="gap-y-4 flex flex-wrap p-6 container">
      <div className="space-y-2 w-full items-center flex gap-x-16">
        <div className="min-w-72 min-h-96">
          <AspectRatio className="w-full h-full" ratio={3 / 4}>
            <Image
              src="/img/profile.png"
              alt="Wilbert Bernardi"
              className="rounded-md object-cover h-full w-full"
              fill
            />
          </AspectRatio>
        </div>
        <div className="space-y-4 grow">
          <h1 className="text-4xl font-bold tracking-wider">ABOUT ME</h1>
          <p className="font-bold text-lg text-cyan-400">
            Wilbert Bernardi - Web Developer
          </p>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident
            obcaecati pariatur ad explicabo nisi laudantium cumque vitae ullam,
            voluptate possimus nihil! Ratione quidem at tempore iure eos
            voluptatum, eius qui hic cum. Illo optio, ut doloribus esse
            recusandae id dolorem, asperiores ducimus eum maiores debitis
            consequuntur sapiente similique, magni minima.
          </p>
          <div className="flex gap-x-8 mb-8">
            {sosmed.map((item, i) => (
              <Link key={i} href={item.href}>
                <item.icon size={32} />
              </Link>
            ))}
          </div>
          <Button className="text-lg p-6" asChild variant="outline">
            <Link href="/">More info</Link>
          </Button>
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
