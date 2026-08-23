"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  Award,
  ExternalLink,
  FolderGit2,
  LayoutDashboard,
  LogOut,
  Mail,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const links = [
  { title: "Overview", href: "/admin", icon: LayoutDashboard },
  { title: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { title: "Certificates", href: "/admin/certificates", icon: Award },
  { title: "Messages", href: "/admin/messages", icon: Mail },
];

export default function AdminNav({
  userName,
  userEmail,
}: {
  userName: string;
  userEmail: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const signOut = async () => {
    setIsSigningOut(true);
    await authClient.signOut();
    toast.success("Signed out");
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="border-b">
      <div className="container mx-auto flex flex-wrap items-center gap-4 px-6 py-4">
        <span className="text-my-primary font-bold tracking-widest">ADMIN</span>

        <nav className="flex flex-1 flex-wrap items-center gap-1">
          {links.map((link) => {
            // startsWith, not equality: /admin/projects/new has to keep
            // Projects highlighted.
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);

            return (
              <Button
                key={link.href}
                asChild
                variant="ghost"
                size="sm"
                className={cn(isActive && "bg-muted text-my-primary")}
              >
                <Link href={link.href}>
                  <link.icon />
                  {link.title}
                </Link>
              </Button>
            );
          })}
        </nav>

        <span
          className="text-muted-foreground hidden text-sm sm:inline"
          title={userEmail}
        >
          {userName}
        </span>

        <Button asChild variant="ghost" size="sm">
          <Link href="/" target="_blank" rel="noopener noreferrer">
            <ExternalLink />
            View site
          </Link>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
          onClick={signOut}
          disabled={isSigningOut}
        >
          {isSigningOut ? <Spinner /> : <LogOut />}
          Sign out
        </Button>
      </div>
    </header>
  );
}
