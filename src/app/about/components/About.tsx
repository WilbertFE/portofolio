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
          <h1 className="text-5xl font-bold tracking-wider leading-14">
            About <i>Me</i>
          </h1>
          <p className="text-sm">
            Halo, saya Wilbert Bernardi, seorang Full-Stack Web Developer. Saya
            berfokus pada pengembangan aplikasi web modern dengan teknologi
            seperti React dan Next.js. Fokus utama saya adalah menciptakan
            aplikasi yang modern, cepat, responsif, dan mudah digunakan.
          </p>
        </div>
        <div className="w-2/5 flex flex-col items-end">
          <p className="text-muted-foreground">Freelancer</p>
          <p className="text-muted-foreground">Full-Stack Web Developer</p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-x-4 self-end">
          <MoveDownRight size={64} />
          <p className="text-sm w-[300px]">
            Selain itu, saya senang belajar hal baru dan terus beradaptasi
            dengan teknologi terkini. Jika kamu mencari developer yang bisa
            fokus pada kualitas, mari kita ngobrol!
          </p>
        </div>
        <div className="w-full max-w-sm">
          <AspectRatio ratio={16 / 9}>
            <div className="max-w-xs">
              <Image
                src="/img/menjadi.png"
                alt="profile"
                fill
                className="object-cover rounded-sm bg-center border"
              />
            </div>
          </AspectRatio>
        </div>
      </div>
      <div className="flex gap-x-16">
        <div className="w-2/5 items-center flex gap-x-4">
          <p className="w-full">Filosofi Kerja</p>
          <ArrowRight size={64} />
        </div>
        <p className="grow text-5xl font-light text-muted-foreground text-justify tracking-wider leading-14">
          Saya percaya bahwa website dengan desain yang{" "}
          <span className="text-my-primary">modern</span> dan{" "}
          <span className="text-my-primary">mudah digunakan</span> dapat
          menciptakan pengalaman pengguna yang maksimal.
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="w-full max-w-60">
          <AspectRatio ratio={3 / 4}>
            <Image
              src="/img/about2.png"
              alt="profile"
              fill
              className="object-cover rounded-lg bg-center"
            />
          </AspectRatio>
        </div>
        <div className="relative">
          <Redo className="absolute bottom-8 right-52 rotate-5" size={128} />
          <div className="space-y-4">
            <p className="text-sm w-[200px] text-justify">
              Jangan ragu untuk mengontak saya!
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Di sini!</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
