import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDown } from "lucide-react";

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
            <p className="px-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus, error.
            </p>
          </div>
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="bg-my-secondary text-white text-base"
            >
              Learning Projects
            </Badge>
            <p className="px-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus, error.
            </p>
          </div>
        </div>
        <div className="w-1/2 space-y-24">
          <p className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            labore, cum veritatis eaque esse optio reprehenderit fugiat sapiente
            nesciunt dicta.
          </p>
          <div className="flex gap-x-4">
            <Skeleton className="w-32 h-32" />
            <div className="flex flex-col justify-between">
              <h1 className="text-lg font-bold">Wilbert Storytelling</h1>
              <p className="text-muted-foreground">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque,
                vitae!
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
