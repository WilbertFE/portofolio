import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div className="space-y-4 h-full p-6 container">
      <div className="space-y-2 flex w-max bg-green-300">
        <AspectRatio className="w-72 h-96" ratio={3 / 4}>
          <Image
            src="/img/profile.png"
            alt="Wilbert Bernardi"
            className="rounded-md object-cover h-full w-full"
            fill
          />
        </AspectRatio>
        <div>
          <h1>ABOUT ME</h1>
        </div>
      </div>
    </div>
  );
}
