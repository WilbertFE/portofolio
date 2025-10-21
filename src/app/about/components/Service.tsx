import { ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Service = {
  title: string;
  content: string;
  image: string;
};

const services: Service[] = [
  {
    title: "Company Profile",
    content: "simple website for company profile.",
    image: "/img/about/1.svg",
  },
  {
    title: "Landing Page",
    content: "simple website to promote products or services.",
    image: "/img/about/2.svg",
  },
  {
    title: "E-Commerce",
    content: "online store integrated with database and payment gateway.",
    image: "/img/about/3.svg",
  },
  {
    title: "Web Application",
    content: "Complex web applications with specific features.",
    image: "/img/about/4.svg",
  },
];

export default function Service() {
  return (
    <div id="service" className="w-full items-center gap-x-4 flex pt-36 pb-32">
      <div className="w-1/2 space-y-4">
        <h1 className="text-5xl font-bold tracking-wider leading-14">
          What I Can Provide for Your Needs
        </h1>
        <p className="text-muted-foreground">
          Website creation focused on a modern, simple, and flexible appearance.
          From simple to complex websites.
        </p>
        <div className="flex flex-wrap space-y-4">
          <div className="w-1/2">
            <h1 className="text-3xl font-bold text-my-primary">743+</h1>
            <p>Contributions since 2023 on Github.</p>
          </div>
          <div className="w-1/2">
            <h1 className="text-3xl font-bold text-my-primary">126+</h1>
            <p>Contribution streak day on Github.</p>
          </div>
          <div className="w-1/2">
            <h1 className="text-3xl font-bold text-my-primary">40+</h1>
            <p>Project completed.</p>
          </div>
          <div className="w-1/2">
            <h1 className="text-3xl font-bold text-my-primary">2+</h1>
            <p>Over two years of programming experience since 2023.</p>
          </div>
        </div>
        <Button
          asChild
          variant="secondary"
          className="w-full py-8 text-xl tracking-wide"
        >
          <Link href="/service">See more</Link>
        </Button>
      </div>
      <div className="w-1/2">
        {services.map((service, i) => (
          <div key={i}>
            <div className="flex items-center space-x-4">
              <Image src={service.image} width={164} height={164} alt="logo" />
              <div className="grow">
                <h1 className="text-3xl font-bold tracking-wider">
                  {service.title}
                </h1>
                <p className="text-muted-foreground">{service.content}</p>
              </div>
              <Link href="/service">
                <ArrowRight size={32} className="text-my-primary min-w-8" />
              </Link>
            </div>
            <Separator className="my-8" />
          </div>
        ))}
      </div>
    </div>
  );
}
