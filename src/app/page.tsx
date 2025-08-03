import { Separator } from "@/components/ui/separator";
import { Header } from "./components/Header";
import { Skills } from "./components/Skills";
import { Service } from "./components/Service";

export default function Home() {
  return (
    <div className="space-y-4 h-full p-6 container">
      <Header />
      <Separator className="mb-4" />
      <Skills />
      <Separator className="my-4" />
      <Service />
    </div>
  );
}
