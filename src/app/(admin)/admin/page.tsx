import Link from "next/link";
import { Award, FolderGit2, Mail } from "lucide-react";
import { requireAdminPage } from "@/lib/auth-guard";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { StatCard } from "./components";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

async function count(table: string, filter?: Record<string, unknown>) {
  let query = getSupabaseAdmin()
    .from(table)
    .select("*", { count: "exact", head: true });

  if (filter) {
    for (const [column, value] of Object.entries(filter)) {
      query = query.eq(column, value);
    }
  }

  const { count: total, error } = await query;
  if (error) {
    console.error(`Failed to count ${table}`, error);
    return 0;
  }
  return total ?? 0;
}

export default async function AdminOverviewPage() {
  const session = await requireAdminPage();

  const [projects, publishedProjects, certificates, messages, recent] =
    await Promise.all([
      count("projects"),
      count("projects", { published: true }),
      count("certificates"),
      count("messages"),
      getSupabaseAdmin()
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

  const recentMessages = (recent.data ?? []) as {
    id: string | number;
    name: string;
    message: string;
    created_at: string | null;
  }[];

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-wider">
          Welcome back, {session.user.name.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground">
          Add or edit what the site shows, without touching the source.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Projects"
          value={projects}
          hint={`${publishedProjects} published`}
          href="/admin/projects"
          icon={FolderGit2}
        />
        <StatCard
          title="Certificates"
          value={certificates}
          href="/admin/certificates"
          icon={Award}
        />
        <StatCard
          title="Messages"
          value={messages}
          href="/admin/messages"
          icon={Mail}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="tracking-wider">Latest messages</CardTitle>
          <CardDescription>From the contact form.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentMessages.length === 0 ? (
            <p className="text-muted-foreground text-sm">Nothing yet.</p>
          ) : (
            recentMessages.map((message) => (
              <div key={message.id} className="border-b pb-3 last:border-none">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-medium">{message.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {message.created_at
                      ? new Date(message.created_at).toLocaleDateString("en-GB")
                      : ""}
                  </span>
                </div>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  {message.message}
                </p>
              </div>
            ))
          )}
          <Button asChild variant="link" className="px-0 text-my-primary">
            <Link href="/admin/messages">See all messages</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
