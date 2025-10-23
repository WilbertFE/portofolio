"use client";

import { Separator } from "@/components/ui/separator";
import { Github, Header, Youtube } from "./components";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-4 mx-auto h-full container">
      <Header />
      <Separator className="my-4" />
      <Github />
      <Youtube />
    </div>
  );
}
