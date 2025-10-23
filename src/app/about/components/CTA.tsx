import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <div className="w-full pt-36 pb-32">
      <div className="w-1/2 mx-auto flex flex-col items-center gap-y-8">
        <h1 className="text-5xl leading-normal font-bold tracking-wider text-center">
          That&apos;s all about me. Feel free to say hello!
        </h1>

        <Button asChild variant="secondary">
          <Link href="/contact">Contact Me</Link>
        </Button>
      </div>
    </div>
  );
}
