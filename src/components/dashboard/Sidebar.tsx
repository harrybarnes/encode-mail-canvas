
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  User,
  Bell,
  Calendar,
  Search
} from "lucide-react";
import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: Search },
  { title: "Contacts", url: "/contacts", icon: User },
  { title: "Deals", url: "/deals", icon: Bell },
  { title: "Tasks", url: "/tasks", icon: Calendar },
  { title: "Calendar", url: "/calendar", icon: Calendar },
  { title: "Reports", url: "/reports", icon: Search },
  { title: "Settings", url: "/settings", icon: User },
];

export function Sidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isExpanded = items.some((i) => isActive(i.url));

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600" 
      : "hover:bg-gray-100 text-gray-700";

  return (
    <SidebarUI
      className={`${collapsed ? "w-14" : "w-64"} border-r border-gray-200 bg-white transition-all duration-300`}
      collapsible
    >
      <SidebarTrigger className="m-2 self-end hover:bg-gray-100" />

      <SidebarContent className="px-3">
        <SidebarGroup
          open={isExpanded}
          onOpenChange={() => {}}
        >
          <SidebarGroupLabel className="text-gray-500 font-medium mb-2">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={`${getNavCls({ isActive: isActive(item.url) })} rounded-lg px-3 py-2 transition-all duration-200 flex items-center gap-3`}
                    >
                      <item.icon className={`w-5 h-5 ${collapsed ? "mx-auto" : ""}`} />
                      {!collapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarUI>
  );
}
