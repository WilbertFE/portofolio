import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MdMiscellaneousServices } from "react-icons/md";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Service() {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex items-center gap-x-2">
          <MdMiscellaneousServices size={32} />
          <span className="text-2xl tracking-wider">Service</span>
        </div>
        <p>
          I work as a freelancer creating and developing websites for brands,
          companies, institutions, and startups. I focus on a modern look and
          the use of the latest technology.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold tracking-wider">
            LET&apos;S WORK TOGETHER!
          </CardTitle>
          <CardDescription className="text-base">
            I&apos;m available for freelance projects. Please contact me by
            email for further information.
          </CardDescription>
          <CardAction>
            <Button
              className="size-20 p-4"
              asChild
              size="icon"
              variant="outline"
            >
              <Link href="/contact">
                <Mail className="min-w-8 min-h-8" />
              </Link>
            </Button>
            <span className="relative flex size-3 bottom-20 left-18">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
            </span>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}
