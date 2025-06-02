"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuItem, useSidebar } from "./ui/sidebar";
import { Building, FileText, Heart, Home, Menu, Settings, X } from "lucide-react";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SidebarCustom = ({ userType }: AppSidebarProps) => {
  const pathName = usePathname();
  const { toggleSidebar, open } = useSidebar();
  const navLinks = 
  userType === "manager" ? [
    {icon: Building,label: "Properties", path: "/managers/properties"},
    {icon: FileText ,label: "Applications", path: "/managers/applications"},
    {icon: Settings, label: "Leases", path: "/managers/settings"},

  ] : [
    {icon: Heart, label: "My favourites", path: "/tenants/favourites"},
    {icon: FileText, label: "My Applications", path: "/tenants/applications"},
    {icon: Home, label: "Residences", path: "/tenants/residences"},
    {icon: Settings, label: "Settings", path: "/tenants/settings"},
  ]
  return (
    <Sidebar
      collapsible="icon"
      className="fixed left-0 bg-white shadow-lg"
      style={{
        top : `${NAVBAR_HEIGHT}px`,
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className={cn("flex min-h-[56px] w-full items-center pt-3 mb-3",
              open ? "justify-between px-6" : "justify-center px-2")}>
                {
                  open ? (
                    <>
                    <h1 className="text-xl font-bold text-gray-800">
                      {userType === "manager" ? "Manager Dashboard" : "Tenant Dashboard"}
                    </h1>
                    <button
                     className="text-gray-500 hover:text-gray-700 p-2"
                     onClick={toggleSidebar}
                    >
                      <X className="h-5 w-5" />
                    </button>
                    </>
                  ) : (
                    <><button
                     className="text-gray-500 hover:text-gray-700 p-2"
                     onClick={toggleSidebar}
                    >
                      <Menu className="h-5 w-5" />
                    </button></>
                  )
                }
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
    </Sidebar>
  );
};

export default SidebarCustom;
