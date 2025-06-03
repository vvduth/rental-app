"use client";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import { Bell, MessageCircle, Plus, Search } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  const { data: authUser } = useGetAuthUserQuery();
 
  const router = useRouter();
  const pathname = usePathname();

  const isDashBoardPage =
    pathname.includes("/managers") || pathname.includes("/tenants");

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };
  return (
    <div
      className="fixed top-0 left-0 w-full z-50 shadow-xl"
      style={{
        height: `${NAVBAR_HEIGHT}px`,
      }}
    >
      <div
        className="flex justify-between items-center w-full
        py-3 px-8 bg-sky-700"
      >
        <div className="flex items-center gap-4 md:gap-6">
          {isDashBoardPage && (
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
          )}
          <Link
            href={"/"}
            className="cursor-pointer hover:!text-priamry-300"
            scroll={false}
          >
            <div className="flex items-center gap-3">
              <Image
                src={"/logo.svg"}
                alt="App logo"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="text-xl font-bold">
                RENT
                <span className="text-rose-500 font-light">APP</span>
              </div>
            </div>
          </Link>
          {isDashBoardPage && authUser && (
            <Button
              variant={"secondary"}
              className="md:ml-4 bg-yellow-50 text-black hover:bg-sky-700 hover:text-white"
              onClick={() => {
                router.push(
                  authUser.userRole?.toLowerCase() === "manager"
                    ? "/managers/newproperty"
                    : "search"
                );
              }}
            >
              {authUser.userRole?.toLowerCase() === "manager" ? (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="hidden md:block ml-2">Add new property</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  <span className="hidden md:block ml-2">Search</span>
                </>
              )}
            </Button>
          )}
          {!isDashBoardPage && (
            <p className="hidden md:block text-white">
              Discover the best rental properties in your area with our advance
              search
            </p>
          )}
          <div className="flex items-center gap-5">
            {authUser ? (
              <>
                <div className="relative hidden md:block">
                  <MessageCircle className="w-6 h-6 text-white cursor-pointer hover:text-sky-400" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-rose-700 rounded-full"></span>
                </div>
                <div className="relative hidden md:block">
                  <Bell className="w-6 h-6 text-white cursor-pointer hover:text-sky-400" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-rose-700 rounded-full"></span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
                    <Avatar>
                      <AvatarImage src={authUser.userInfo?.image} />
                      <AvatarFallback>
                        {authUser.userRole?.[0].toUpperCase()}
                      </AvatarFallback>
                      
                    </Avatar>
                    <p className="text-white hidden md:block">
                        {authUser.userInfo?.name}
                      </p>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                   className="bg-white text-black"
                  >
                    <DropdownMenuItem
                     className="cursor-pointer hover:bg-sky-100 font-bold"
                     onClick={() => {
                      router.push(
                        authUser.userRole?.toLowerCase() === "manager"
                          ? "/managers/properties"
                          : "/tenants/favorites",
                          {scroll: false}
                      )
                     }}
                    >
                        Go to dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator
                     className="bg-gray-200" />
                  

                     <DropdownMenuItem
                     className="cursor-pointer hover:bg-sky-100 font-bold"
                     onClick={() => {
                      router.push(
                        `/${authUser.userRole?.toLowerCase()}s/settings`,
                        {scroll: false}
                      )
                     }}
                    >
                        Go to settings
                    </DropdownMenuItem>

                    <DropdownMenuItem
                     className="cursor-pointer hover:bg-sky-100 font-bold"
                     onClick={handleSignOut}
                    >
                        Sign out
                    </DropdownMenuItem>

                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href={"/signin"}>
                  <Button className="text-white border-white border-2 bg-transparent hover:bg-sky-600">
                    Sign in
                  </Button>
                </Link>
                <Link href={"/signup"}>
                  <Button
                    variant={"outline"}
                    className="text-white bg-rose-600 border-white hover:bg-sky-600"
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
