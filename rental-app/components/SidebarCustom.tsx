"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import {
  Building,
  FileText,
  Heart,
  Home,
  Menu,
  Settings,
  X,
} from "lucide-react";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

const SidebarCustom = ({ userType }: AppSidebarProps) => {
  const pathName = usePathname();
  const { toggleSidebar, open } = useSidebar();
  const navLinks =
    userType === "manager"
      ? [
          { icon: Building, label: "Properties", href: "/managers/properties" },
          {
            icon: FileText,
            label: "Applications",
            href: "/managers/applications",
          },
          { icon: Settings, label: "Leases", href: "/managers/settings" },
        ]
      : [
          { icon: Heart, label: "My favourites", href: "/tenants/favourites" },
          {
            icon: FileText,
            label: "My Applications",
            href: "/tenants/applications",
          },
          { icon: Home, label: "Residences", href: "/tenants/residences" },
          { icon: Settings, label: "Settings", href: "/tenants/settings" },
        ];
  return (
    <Sidebar
      collapsible="icon"
      className="fixed left-0 bg-white shadow-lg"
      style={{
        top: `${NAVBAR_HEIGHT}px`,
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={cn(
                "flex min-h-[56px] w-full items-center pt-3 mb-3",
                open ? "justify-between px-6" : "justify-center px-2"
              )}
            >
              {open ? (
                <>
                  <h1 className="text-xl font-bold text-gray-800">
                    {userType === "manager"
                      ? "Manager Dashboard"
                      : "Tenant Dashboard"}
                  </h1>
                  <button
                    className="text-gray-500 hover:text-gray-700 p-2"
                    onClick={toggleSidebar}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="text-gray-500 hover:text-gray-700 p-2"
                    onClick={toggleSidebar}
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navLinks.map((link) => {
            const isActive = pathName === link.href;
            return (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "flex items-center px-7 py-7",
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    open ? "text-sky-600" : "ml-[5px]"
                  )}
                >
                  <Link href={link.href} className="w-full" scroll={false}>
                    <div className="flex items-center gap-3">
                      <link.icon
                        className={cn(
                          "h-5 w-5",
                          isActive ? "text-sky-600" : "text-gray-500"
                        )}
                      />
                      <span
                        className={`font-medium ${
                          isActive ? "text-blue-600" : "text-gray-800"
                        }`}
                      >
                        {link.label}
                      </span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarCustom;
