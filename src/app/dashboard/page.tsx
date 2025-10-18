"use client";

import { Separator } from "@/components/ui/separator";
import { Github, Header } from "./components";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-4 mx-auto h-full container">
      <Header />
      <Separator className="my-4" />
      <Github />
      <Separator className="my-4" />
      <div className="flex px-10 gap-x-8 pt-36 pb-64 items-center justify-between">
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-shadow-lg leading-tight tracking-widest">
            Hi There 👋
          </h3>
          <h1 className="text-6xl text-shadow-lg leading-tight font-bold tracking-wider">
            I&apos;m <span className="text-my-primary ">Wilbert Bernardi</span>
          </h1>
          <div className="text-muted-foreground justify-between flex items-center gap-x-2">
            <Separator className="max-w-[45%]" />
            <p>Content Creator | Creative | Developer</p>
          </div>
          <div className="flex gap-x-4">
            <Button
              variant="destructive"
              size="lg"
              asChild
              className="shadow-xs shadow-white font-bold tracking-wider"
            >
              <Link href="/">Download Portofolio</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="shadow-xs shadow-white font-bold tracking-wider"
            >
              <Link href="/">Download CV</Link>
            </Button>
          </div>
        </div>
        <div className="relative">
          <Avatar className="w-72 h-72 border-4 border-white">
            <AvatarImage
              className="object-cover object-center"
              src="/img/pixel-profile.png"
            />
            <AvatarFallback>WB</AvatarFallback>
          </Avatar>
          <Image
            src="/img/sun.png"
            alt="sun"
            className="absolute -top-12 -right-12"
            width={164}
            height={164}
          />
          <Image
            src="/img/blue.png"
            alt="blue"
            className="absolute -bottom-8 -left-8"
            width={164}
            height={164}
          />
        </div>
      </div>
    </div>
  );
}

{
  /* <a href="https://www.vecteezy.com/free-vector/sun">Sun Vectors by Vecteezy</a> */
}
