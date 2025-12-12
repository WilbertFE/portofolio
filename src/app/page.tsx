"use client";

import { Separator } from "@/components/ui/separator";
import { Header } from "./components/Header";
import { Skills } from "./components/Skills";
import { Service } from "./components/Service";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMessageSended, SetMessageSended] = useState(false);

  useEffect(() => {
    if (!isMessageSended) {
      toast.message("Temen-temen bisa memberi saran di halaman Contact");
      SetMessageSended(true);
    }
  }, []);
  return (
    <div className="space-y-4 h-full p-6 container mx-auto">
      <Header />
      <Separator className="mb-4" />
      <Skills />
      <Separator className="my-4" />
      <Service />
    </div>
  );
}
