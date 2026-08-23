import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StatCard({
  title,
  value,
  hint,
  href,
  icon: Icon,
}: {
  title: string;
  value: number | string;
  hint?: string;
  href: string;
  icon: LucideIcon;
}) {
  return (
    <Link href={href} className="group">
      <Card className="h-full transition-colors group-hover:border-my-primary">
        <CardHeader>
          <CardDescription className="flex items-center gap-x-2">
            <Icon className="size-4" />
            {title}
          </CardDescription>
          <CardTitle className="text-3xl tabular-nums">{value}</CardTitle>
          {hint && (
            <span className="text-muted-foreground text-sm">{hint}</span>
          )}
        </CardHeader>
      </Card>
    </Link>
  );
}
