"use client";

import { Separator } from "@/components/ui/separator";
import { Header, LearningProjects, MainProjects } from "./components";

export default function page() {
  return (
    <div className="flex flex-wrap gap-y-16 px-8 pb-32 container mx-auto">
      <Header />
      <Separator className="my-12 lg:my-0" />
      <MainProjects />
      <LearningProjects />
    </div>
  );
}
