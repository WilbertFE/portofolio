"use client";

import {
  Book,
  Calendar,
  Home,
  Inbox,
  Plus,
  Search,
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      <SidebarHeader>Here is my logo</SidebarHeader>
      <SidebarContent>
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
      <SidebarFooter>Here is my footer</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
