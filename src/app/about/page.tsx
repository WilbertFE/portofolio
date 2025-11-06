import { Hero, Service, AboutMe, CTA } from "./components";

export default function About() {
  return (
    <div className="gap-y-4 flex flex-wrap px-8 py-0 pb-32 container mx-auto">
      <Hero />
      {/* <Service /> */}
      <AboutMe />
      <CTA />
    </div>
  );
}
