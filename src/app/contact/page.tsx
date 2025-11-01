"use client";

import { Separator } from "@/components/ui/separator";
import { Header, Info, Message } from "./components";

export default function ContactPage() {
  return (
    <div className="p-6 space-y-4 mx-auto h-full container">
      <Header />
      <Separator className="my-4" />
      <Info />
      <Separator className="my-4" />
      <Message />
    </div>
  );
}
