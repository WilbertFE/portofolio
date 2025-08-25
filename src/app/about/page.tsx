import Image from "next/image";
import { Hero } from "./components/Hero";
import { ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function About() {
  return (
    <div className="gap-y-4 flex flex-wrap px-6 py-24 container mx-auto">
      <Hero />
      <div className="w-full items-center flex pt-36 pb-32">
        <div className="w-1/2 space-y-4">
          <h1 className="text-5xl font-bold tracking-wider">
            What Can I Do For Your Needs
          </h1>
          <p className="text-muted-foreground">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi
            quisquam, expedita beatae pariatur cum molestias amet ullam
            blanditiis sed voluptatibus. Sunt magni adipisci inventore dolores
            assumenda debitis vel repudiandae quod!
          </p>
          <div className="flex flex-wrap space-y-4">
            <div className="w-1/2">
              <h1 className="text-3xl font-bold text-my-primary">250+</h1>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="w-1/2">
              <h1 className="text-3xl font-bold text-my-primary">250+</h1>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="w-1/2">
              <h1 className="text-3xl font-bold text-my-primary">250+</h1>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="w-1/2">
              <h1 className="text-3xl font-bold text-my-primary">250+</h1>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 space-y-4">
          <div className="flex items-center space-x-4">
            <Image src="/img/profile.png" width={128} height={128} alt="logo" />
            <div className="grow">
              <h1 className="text-3xl font-bold tracking-wider">
                UI/UX Design
              </h1>
              <p className="text-muted-foreground">117 projects</p>
            </div>
            <ArrowRight className="text-my-primary" />
          </div>
          <Separator />
          <div className="flex items-center space-x-4">
            <Image src="/img/profile.png" width={128} height={128} alt="logo" />
            <div className="grow">
              <h1 className="text-3xl font-bold tracking-wider">
                UI/UX Design
              </h1>
              <p className="text-muted-foreground">117 projects</p>
            </div>
            <ArrowRight className="text-my-primary" />
          </div>
          <Separator />
          <div className="flex items-center space-x-4">
            <Image src="/img/profile.png" width={128} height={128} alt="logo" />
            <div className="grow">
              <h1 className="text-3xl font-bold tracking-wider">
                UI/UX Design
              </h1>
              <p className="text-muted-foreground">117 projects</p>
            </div>
            <ArrowRight className="text-my-primary" />
          </div>
          <Separator />
        </div>
      </div>
    </div>
  );
}
