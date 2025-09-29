import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <div className="w-full pt-36 pb-32">
      <div className="w-1/2 mx-auto flex flex-col items-center gap-y-8">
        <h1 className="text-5xl leading-normal font-bold tracking-wider text-center">
          Itu Saja Tentang Saya. Jangan Ragu untuk Menyapa!
        </h1>

        <Button asChild variant="secondary">
          <Link href="/contact">Hubungi Saya</Link>
        </Button>
      </div>
    </div>
  );
}
