"use client";
import React, { useEffect, useState } from "react";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import Navbar from "@/components/Navbar";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
const LandingPayout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();
      if (
        (userRole === "manager" && pathname.startsWith("/search")) ||
        (userRole === "manager" && pathname === "/")
      ) {
        router.push("/managers/properties", { scroll: false });
      } else {
        setIsLoading(false);
      }
    }
  }, [authUser, pathname, router]);

  if (isLoading || authLoading) {
    return <>Loading</>;
  }

  if (!authUser?.userRole) {
    return null;
  }

  return (
    <div className="h-full">
      <Navbar />
      <main
        style={{
          paddingTop: `${NAVBAR_HEIGHT}px`,
        }}
        className={`h-full flex w-full flex-col`}
      >
        {children}
      </main>
    </div>
  );
};

export default LandingPayout;
