
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Mail,
  Users,
  BarChart3,
  Settings,
  Send,
  Target
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
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Campaigns", url: "/campaigns", icon: Target },
  { title: "Contacts", url: "/contacts", icon: Users },
  { title: "Outbox", url: "/outbox", icon: Send },
  { title: "Inbox", url: "/inbox", icon: Mail },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function Sidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gray-900 text-white hover:bg-gray-800" 
      : "hover:bg-gray-100/80 text-gray-700 hover:text-gray-900";

  return (
    <SidebarUI
      className={`${collapsed ? "w-14" : "w-64"} border-r border-gray-200/50 bg-white/95 backdrop-blur-sm transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarTrigger className="m-2 self-end hover:bg-gray-100/80 rounded-xl" />

      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 font-semibold mb-3 text-xs uppercase tracking-wider">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={`${getNavCls({ isActive: isActive(item.url) })} rounded-xl px-3 py-3 transition-all duration-200 flex items-center font-medium ${collapsed ? 'justify-center' : 'gap-3'}`}
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && (
                        <span>{item.title}</span>
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
