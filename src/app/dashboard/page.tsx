"use client";

import { Separator } from "@/components/ui/separator";
import { Contributions, Header, WeeklyStatistics } from "./components";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-4 mx-auto h-full container">
      <Header />
      <Separator />
      <Contributions />
      <Separator />
      <WeeklyStatistics />
    </div>
  );
}
