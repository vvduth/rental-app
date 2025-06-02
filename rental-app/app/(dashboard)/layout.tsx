"use client";
import Navbar from "@/components/Navbar";
import SidebarCustom from "@/components/SidebarCustom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { useGetAuthUserQuery } from "@/state/api";
import React from "react";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {

  const {data: authUser} = useGetAuthUserQuery()  

  if (!authUser?.userRole ) {
    return null
  }
  return (
    <SidebarProvider>
        <div className="min-h-screen w-full bg-amber-50">
      <Navbar />

      <div
        style={{
          paddingTop: NAVBAR_HEIGHT + "px",
        }}
      >
        <main className="flex">
          <SidebarCustom userType={authUser?.userRole.toLowerCase()} />
          <div className="flex-grow transition-all duration-300">
            {children}
          </div>
        </main>
      </div>
    </div>
    </SidebarProvider>
  );
};

export default DashBoardLayout;
