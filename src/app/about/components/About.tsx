import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight, MoveDownRight, Redo } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
  return (
    <div className="w-full pb-32 pt-36 space-x-8 space-y-16">
      <div className="flex items-center">
        <div className="w-3/5 space-y-8">
          <h1 className="lg:text-5xl text-2xl font-bold tracking-wider leading-14">
            About <i>Me</i>
          </h1>
          <p className="text-base">
            Hi, I&apos;m Wilbert Bernardi, a Full-Stack Web Developer. I focus
            on developing modern web applications using technologies like React
            and Next.js. My primary focus is creating modern, fast, responsive,
            and easy-to-use applications.
          </p>
        </div>
        <div className="w-2/5 flex flex-col text-end">
          <p className="text-muted-foreground lg:text-base text-xs">
            Freelancer
          </p>
          <p className="text-muted-foreground lg:text-base text-xs">
            Full-Stack Web Developer
          </p>
          <p className="text-muted-foreground lg:text-base text-xs">
            Content Creator
          </p>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col-reverse gap-y-6 justify-between">
        <div className="flex items-center gap-x-4 self-end">
          <MoveDownRight className="lg:w-16 lg:h-16 w-8 h-8" />
          <p className="text-sm lg:w-[300px] w-[200px]">
            Additionally, I enjoy learning new things and constantly adapting to
            the latest technology. If you&apos;re looking for a developer who
            can focus on quality, let&apos;s chat!
          </p>
        </div>
        <div className="w-full max-w-sm">
          <AspectRatio ratio={4 / 3}>
            <div className="max-w-xs">
              <Image
                src="/img/profile1.png"
                alt="profile"
                fill
                className="object-cover rounded-sm object-center border"
              />
            </div>
          </AspectRatio>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col gap-y-6 lg:gap-y-0 lg:gap-x-16">
        <div className="w-2/5 items-center flex gap-x-4">
          <p className="w-full">Work Philosophy</p>
          <ArrowRight size={64} />
        </div>
        <p className="grow text-5xl font-light text-muted-foreground text-justify tracking-wider leading-14">
          I believe that a website with a good design{" "}
          <span className="text-my-primary">modern</span> and{" "}
          <span className="text-my-primary">easy to use</span> can create a
          maximum user experience.
        </p>
      </div>
      <div className="flex lg:justify-between lg:flex-row flex-col items-center gap-y-6 lg:gap-y-0">
        <div className="w-full max-w-60">
          <AspectRatio ratio={3 / 4}>
            <Image
              src="/img/profile2.png"
              alt="profile"
              fill
              className="object-cover rounded-lg bg-center"
            />
          </AspectRatio>
        </div>
        <div className="relative">
          <Redo className="absolute bottom-8 right-52 rotate-5 lg:w-32 lg:h-32 w-16 h-16" />
          <div className="flex flex-col justify-center gap-y-4">
            <p className="text-sm w-[200px] text-justify">
              Don&apos;t hesitate to contact me!
            </p>
            <Button asChild size="lg" variant="secondary" className="mx-auto">
              <Link href="/contact">Here!</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
