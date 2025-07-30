"use client";

import { Calendar, Home, Inbox, Plus, Search, Settings } from "lucide-react";

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
// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="p-8">
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
        <div className="flex justify-between items-center">
          <Button
            className="text-sm text-muted-foreground rounded-full bg-transparent"
            variant="outline"
          >
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex size-2.5 rounded-full bg-green-400"></span>
            </span>
            Hire me
          </Button>
          <div className="flex gap-x-4">
            <Link href="#">
              <FaGithub size={24} />
            </Link>
            <Link href="#">
              <FaInstagram size={24} />
            </Link>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-8">
        <SidebarGroup>
          <SidebarGroupLabel>Group label</SidebarGroupLabel>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarGroupAction
                onClick={() => console.log("Clicked from sidebar grup action")}
              >
                <Plus />
              </SidebarGroupAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
              <DropdownMenuItem>New window1</DropdownMenuItem>
              <DropdownMenuItem>New window2</DropdownMenuItem>
              <DropdownMenuItem>New window3</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>Here is my</SidebarMenuItem>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    onClick={() =>
                      console.log(`Clicked from sidebar menu ${item.title}`)
                    }
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={state === "collapsed" ? "hidden" : ""}
                >
                  <span>New item</span>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction
                      onClick={() =>
                        console.log(`Clicked from sidebar menu action last`)
                      }
                    >
                      <Plus />
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" align="end">
                    <DropdownMenuItem>New item</DropdownMenuItem>
                    <DropdownMenuItem>New item</DropdownMenuItem>
                    <DropdownMenuItem>New item</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-8">Here is my footer</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
