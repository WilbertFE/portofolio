import { Badge } from "@/components/ui/badge";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <div className="space-y-12 w-full">
      <h1 className="text-[164px] font-bold tracking-wide flex items-end relative">
        <span className="text-[180px]">P</span>rojects{" "}
        <div className="w-8 h-8 bg-white absolute bottom-14 right-112"></div>
      </h1>
      <div className="flex">
        <div className="w-1/2 space-y-6">
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="bg-my-secondary text-white text-base"
            >
              Main Projects
            </Badge>
            <p className="px-4">My main project.</p>
          </div>
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="bg-my-secondary text-white text-base"
            >
              Learning Projects
            </Badge>
            <p className="px-4">
              Projects that I create along with learning new things.
            </p>
          </div>
        </div>
        <div className="w-1/2 space-y-24">
          <p className="text-xl">
            Creating websites with the latest technology. Using a modern and
            responsive (UI). Prioritizing user experience (UX).
          </p>
          <div className="flex gap-x-4">
            <div className="w-32 h-32 relative rounded-md overflow-hidden">
              <Image
                src="/img/projects/1.png"
                alt="wilbert bernardi"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="flex flex-col justify-between">
              <h1 className="text-lg font-bold">Wilbert Bernardi</h1>
              <p className="text-muted-foreground">
                Hi, here are some of my projects. Please take a look!
              </p>
            </div>
          </div>
        </div>
      </div>
      <ArrowDown
        size={64}
        className="mx-auto rounded-full border animate-bounce p-1 text-my-light"
      />
    </div>
  );
}
