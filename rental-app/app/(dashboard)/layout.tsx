"use client";
import Navbar from "@/components/Navbar";
import SidebarCustom from "@/components/SidebarCustom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole.toLowerCase();
      if (userRole === "manager" && pathname.startsWith("/tenants") ||
          userRole === "tenant" && pathname.startsWith("/managers")) {
        router.push(
          userRole === "manager" ? "/managers/properties" : "/tenants/favourites",
          {scroll: false}
        )
      } else {
        setIsLoading(false);
      }
    }
  },[authUser, pathname, router])

  if( isLoading || authLoading) {
    return <>Loading</>
  }

  if (!authUser?.userRole) {
    return null;
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
