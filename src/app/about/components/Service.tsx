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
    content: "website sederhana untuk profil perusahaan.",
    image: "/img/company-profile-website.jpg",
  },
  {
    title: "Landing Page",
    content: "website sederhana untuk mempromosikan produk atau jasa.",
    image: "/img/landing-page-website.jpg",
  },
  {
    title: "E-Commerce",
    content:
      "toko online yang terintegrasi dengan database dan payment gateway.",
    image: "/img/e-commerce-website.jpg",
  },
  {
    title: "Web Application",
    content: "Aplikasi web kompleks dengan fitur tertentu.",
    image: "/img/complex-website.jpg",
  },
];

export default function Service() {
  return (
    <div className="w-full items-center gap-x-4 flex pt-36 pb-32">
      <div className="w-1/2 space-y-4">
        <h1 className="text-5xl font-bold tracking-wider leading-14">
          Yang Bisa Saya Berikan untuk Keperluan Anda
        </h1>
        <p className="text-muted-foreground">
          Pembuatan website yang berfokus dengan tampilan modern, simple, dan
          fleksibel. Mulai dari website sederhana hingga kompleks.
        </p>
        <div className="flex flex-wrap space-y-4">
          <div className="w-1/2">
            <h1 className="text-3xl font-bold text-my-primary">743+</h1>
            <p>Kontribusi sejak 2023 di Github.</p>
          </div>
          <div className="w-1/2">
            <h1 className="text-3xl font-bold text-my-primary">126+</h1>
            <p>Hari kontribusi beruntun di Github.</p>
          </div>
          <div className="w-1/2">
            <h1 className="text-3xl font-bold text-my-primary">40+</h1>
            <p>Proyek selesai.</p>
          </div>
          <div className="w-1/2">
            <h1 className="text-3xl font-bold text-my-primary">2+</h1>
            <p>
              Lebih dari dua tahun pengalaman dalam dunia programming sejak
              2023.
            </p>
          </div>
        </div>
        <Button
          asChild
          variant="secondary"
          className="w-full py-8 text-xl tracking-wide"
        >
          <Link href="/service">Lihat lebih banyak</Link>
        </Button>
      </div>
      <div className="w-1/2">
        {services.map((service, i) => (
          <div key={i}>
            <div className="flex items-center space-x-4">
              <Image src={service.image} width={128} height={128} alt="logo" />
              <div className="grow">
                <h1 className="text-3xl font-bold tracking-wider">
                  {service.title}
                </h1>
                <p className="text-muted-foreground">{service.content}</p>
              </div>
              <ArrowRight size={32} className="text-my-primary min-w-8" />
            </div>
            <Separator className="my-8" />
          </div>
        ))}
      </div>
    </div>
  );
}
