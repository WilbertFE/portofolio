"use client";

import {
  Home,
  User,
  FolderGit2,
  LayoutDashboard,
  BookUser,
  ArrowRight,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const router = useRouter();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className={`p-4 ${state === "collapsed" ? "hidden" : ""}`}>
        <Avatar className="w-24 h-24 border border-muted-foreground">
          <AvatarImage src="/img/profile.png" />
          <AvatarFallback>WB</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex gap-x-1 items-center">
            <h1 className="text-xl">Wilbert Bernardi</h1>
            <MdVerified style={{ color: "blue" }} size={20} />
          </div>
          <span className="text-muted-foreground">@wilbertfe</span>
        </div>
        <div className="flex gap-x-2 justify-between items-center">
          <Link href="/">
            <Button
              className="text-lg text-muted-foreground rounded-full bg-transparent"
              variant="outline"
            >
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex size-2.5 rounded-full bg-green-400"></span>
              </span>
              Hire me.
            </Button>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className={state === "expanded" ? "py-0 my-0" : ""}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className={`hover:bg-muted rounded-sm cursor-pointer ${
                        isActive ? "bg-muted" : ""
                      }`}
                      onClick={() => router.push(item.url)}
                      asChild
                    >
                      <div className="flex">
                        <item.icon
                          className={
                            state === "expanded" ? "min-w-6 min-h-6" : ""
                          }
                        />
                        <span className="text-lg grow">{item.title}</span>
                        {isActive && (
                          <ArrowRight className="justify-self-end" />
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <Separator />

      {state === "expanded" && (
        <SidebarFooter
          className={`flex flex-col gap-y-0 text-center text-muted-foreground`}
        >
          <span>COPYRIGHT &copy; 2025</span>
          <span>Wilbert Bernardi. All rights reserved</span>
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "About",
    url: "/about",
    icon: User,
  },

  {
    title: "Projects",
    url: "/projects",
    icon: FolderGit2,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  // {
  //   title: "Chat Room",
  //   url: "/chat",
  //   icon: MessageCircleMore,
  // },
  {
    title: "Contact",
    url: "/contact",
    icon: BookUser,
  },
  // {
  //   title: "Settings",
  //   url: "/settings",
  //   icon: Settings,
  // },
];
