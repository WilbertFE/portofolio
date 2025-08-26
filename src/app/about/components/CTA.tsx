import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <div className="w-full pt-36 pb-32">
      <div className="w-1/2 mx-auto flex flex-col items-center gap-y-8">
        <h1 className="text-5xl font-bold tracking-wider text-center">
          That&apos;s All About Me, Feel Free To Say Hi!
        </h1>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta eaque
          ducimus optio in neque eius natus obcaecati praesentium distinctio
          repellat.
        </p>
        <Button asChild variant="secondary">
          <Link href="mailto:wilbertbernardife@gmail.com">
            wilbertbernardife@gmail.com
          </Link>
        </Button>
      </div>
    </div>
  );
}
