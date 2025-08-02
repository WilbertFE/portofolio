"use client";

import {
  Home,
  User,
  Award,
  FolderGit2,
  LayoutDashboard,
  MessageCircleMore,
  BookUser,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaGithub, FaInstagram } from "react-icons/fa6";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
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
  {
    title: "Chat Room",
    url: "/chat",
    icon: MessageCircleMore,
  },
  {
    title: "Contact",
    url: "/contact",
    icon: BookUser,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader
        className={`px-8 py-4 ${state === "collapsed" ? "hidden" : ""}`}
      >
        <Avatar className="w-16 h-16 border border-muted-foreground">
          <AvatarImage src="/img/profile.png" />
          <AvatarFallback>WB</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex gap-x-1 items-center">
            <h1>Wilbert Bernardi</h1>
            <MdVerified style={{ color: "#0000FF" }} size={16} />
          </div>
          <span className="text-sm text-muted-foreground">@wilbertfe</span>
        </div>
        <div className="flex gap-x-2 justify-between items-center">
          <Link href="/">
            <Button
              className="text-sm text-muted-foreground rounded-full bg-transparent"
              variant="outline"
            >
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex size-2.5 rounded-full bg-green-400"></span>
              </span>
              Hire me.
            </Button>
          </Link>
          <div className="flex gap-x-2">
            <Link href="https://github.com/WilbertFE">
              <FaGithub size={30} />
            </Link>
            <Link href="https://fastwork.id/user/wilbertbernardi">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>FW</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className={state === "expanded" ? "px-4 py-0 my-0" : ""}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    onClick={() =>
                      console.log(`Clicked from sidebar menu ${item.title}`)
                    }
                  >
                    <a href={item.url}>
                      <item.icon
                        className={
                          state === "expanded" ? "min-w-5 min-h-5" : ""
                        }
                      />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <Separator />

      {state === "expanded" && (
        <SidebarFooter
          className={`px-8 flex flex-col gap-y-0 text-center text-[12px] text-muted-foreground`}
        >
          <span>COPYRIGHT &copy; 2025</span>
          <span>Wilbert Bernardi. All rights reserved</span>
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
