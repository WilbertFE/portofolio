import { Hero } from "./components/Hero";
import Service from "./components/Service";
import CTA from "./components/CTA";
import Image from "next/image";

export default function About() {
  return (
    <div className="gap-y-4 flex flex-wrap px-8 py-0 pb-32 container mx-auto">
      <Hero />
      <Service />
      {/* <div className="w-full pb-32 pt-36 flex space-x-8">
        <Image src="/img/profile.png" alt="profile" width={500} height={500} />
        <div className="">
          <p className="text-muted-foreground">About Me</p>
          <h1>About Our Lovely Team and Work Culture</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni
            reiciendis aut odit reprehenderit, tempore ullam voluptates
            aspernatur minima non cum vero accusamus ab aliquam quia blanditiis
            cupiditate harum ut vitae magnam minus excepturi culpa rerum!
            Commodi aperiam excepturi optio eaque hic praesentium laudantium
            voluptate iure a quam? Iure, unde dolores.
          </p>
        </div>
      </div> */}
      <CTA />
    </div>
  );
}
