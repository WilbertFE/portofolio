import { Hero } from "./components/Hero";
import Service from "./components/Service";
import CTA from "./components/CTA";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MoveDownRight } from "lucide-react";

export default function About() {
  return (
    <div className="gap-y-4 flex flex-wrap px-8 py-0 pb-32 container mx-auto">
      <Hero />
      <Service />
      <div className="w-full pb-32 pt-36 space-x-8 space-y-16">
        <div className="flex items-center">
          <div className="w-3/5 space-y-8">
            <h1 className="text-5xl font-bold tracking-wider leading-14">
              Capturing Life Beautiful <i>Moments</i>
            </h1>
            <p className="text-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos est
              inventore ex ad in repudiandae aliquam, qui, unde deleniti
              dignissimos fugiat esse tenetur quo! Vero tempora facere
              doloremque dignissimos modi doloribus temporibus nam odio
              praesentium voluptas dolorum minima ut, minus consectetur, vitae
              ducimus deserunt aspernatur assumenda. Doloremque minus veritatis
              necessitatibus.
            </p>
          </div>
          <div className="w-2/5 flex flex-col items-end">
            <p className="text-muted-foreground">Photographer</p>
            <p className="text-muted-foreground">Videographer</p>
            <p className="text-muted-foreground">Freelancer</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-x-4">
            <MoveDownRight size={64} />
            <p className="text-sm w-[200px]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
              laboriosam!
            </p>
          </div>
          <div className="w-full max-w-sm">
            <AspectRatio ratio={16 / 9}>
              <Image
                src="/img/profile.png"
                alt="profile"
                fill
                className="object-cover"
              />
            </AspectRatio>
          </div>
        </div>
        <div className="flex gap-x-16">
          <p className="w-2/5">01. About Me</p>
          <p className="grow text-5xl font-light text-muted-foreground text-justify tracking-wider leading-14">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis minus deleniti magni cupiditate facere dolor illo ex
            ullam laudantium. Facilis?
          </p>
        </div>
        <div className="flex justify-between">
          <div className="w-full max-w-xs">
            <AspectRatio ratio={3 / 4}>
              <Image
                src="/img/profile.png"
                alt="profile"
                fill
                className="object-cover"
              />
            </AspectRatio>
          </div>
          <div className="flex items-center gap-x-4">
            <p className="text-sm w-[200px] text-justify">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum,
              laboriosam!
            </p>
          </div>
        </div>
      </div>
      <CTA />
    </div>
  );
}
