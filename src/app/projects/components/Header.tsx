import { Separator } from "@/components/ui/separator";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <div className="space-y-12 w-full pb-32 pt-12">
      <h1 className="lg:text-[164px] text-6xl font-bold tracking-wide flex items-end relative">
        <span className="lg:text-[180px]">P</span>rojects{" "}
        <div className="lg:w-8 lg:h-8 w-4 h-4 bg-white absolute lg:bottom-4 lg:right-112 right-13 bottom-1"></div>
      </h1>
      <div className="flex gap-x-12 h-[500px]">
        <div className="w-1/2 space-y-12">
          <div className="space-y-4">
            <h1 className="lg:text-2xl text-xl text-my-primary font-bold tracking-wide">
              Main Projects
            </h1>
            <p className="px-4">My main project.</p>
          </div>
          <div className="space-y-4">
            <h1 className="lg:text-2xl text-xl text-my-primary font-bold tracking-wide">
              Learning Projects
            </h1>
            <p className="px-4">
              Projects that I create along with learning new things.
            </p>
          </div>
          <div className="flex gap-x-4 flex-col lg:flex-row gap-y-4 lg:gap-y-0">
            <div className="w-32 h-32 relative rounded-md overflow-hidden">
              <Image
                src="/img/projects/1.png"
                alt="Wilbert Bernardi"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="flex flex-col justify-between gap-y-4 lg:gap-y-0">
              <h1 className="lg:text-lg text-sm font-bold tracking-wide">
                Wilbert Bernardi
              </h1>
              <p className="text-muted-foreground lg:text-base text-sm">
                Hi, here are some of my projects. Please take a look!
              </p>
            </div>
          </div>
        </div>
        <Separator orientation="vertical" className="hidden lg:block" />
        <div className="w-1/2 space-y-24">
          <p className="lg:text-xl text-lg tracking-wide">
            Creating websites with the latest technology. Using a modern and
            responsive (UI). Prioritizing user experience (UX).
          </p>
        </div>
      </div>
      {/* <ArrowDown
        size={64}
        className="mx-auto rounded-full border animate-bounce p-1 text-my-light"
      /> */}
    </div>
  );
}
