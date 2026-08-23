import type { Metadata } from "next";
import { requireAdminPage } from "@/lib/auth-guard";
import { AdminNav } from "./components";

export const metadata: Metadata = {
  title: "Admin - Wilbert Bernardi",
  robots: { index: false, follow: false },
};

/**
 * Guards every /admin route. src/proxy.ts already bounces requests with no
 * session cookie, but that only checks the cookie exists - this is where the
 * session is actually validated and the role checked.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminPage();

  return (
    <div className="min-h-screen">
      <AdminNav userName={session.user.name} userEmail={session.user.email} />
      <main className="container mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
