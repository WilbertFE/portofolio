import { requireAdminPage } from "@/lib/auth-guard";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type MessageRow = {
  id: string | number;
  name: string;
  message: string;
  created_at: string | null;
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});

export default async function AdminMessagesPage() {
  await requireAdminPage();

  // The messages table has no anon select policy on purpose, so this only
  // works through the service-role client behind the admin guard.
  const { data, error } = await getSupabaseAdmin()
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) console.error("Failed to load messages", error);

  const messages = (data ?? []) as MessageRow[];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-wider">Messages</h1>
        <p className="text-muted-foreground">
          Everything sent through the contact form. Read only.
        </p>
      </div>

      {messages.length === 0 ? (
        <p className="text-muted-foreground">No messages yet.</p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {messages.map((message) => (
            <Card key={message.id}>
              <CardHeader>
                <CardTitle className="tracking-wider">{message.name}</CardTitle>
                <CardDescription>
                  {message.created_at
                    ? dateFormatter.format(new Date(message.created_at))
                    : "Unknown date"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{message.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
