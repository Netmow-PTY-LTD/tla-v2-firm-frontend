"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown, LogOut, SendToBack, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { userDummyImage } from "@/data/data";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logOut } from "@/store/firmFeatures/firmAuth/firmAuthSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { slugify } from "@/helpers/generateSlug";
import { useAuthLogOutMutation } from "@/store/firmFeatures/firmAuth/firmAuthApiService";

export default function LawFirmProfileDropDown({
  currentUser,
  isCurrentUserLoading,
}) {
  console.log("currentUser from dropdown", currentUser);
  const dispatch = useDispatch();

  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  //console.log("currentUser from dropdown", currentUser);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (typeof window === "undefined") {
    return null; // SSR-safe: avoid rendering dynamic content
  }

  /**
   * Handles user logout functionality.
   * - Calls the authLogout mutation to invalidate the session on the server.
   * - Dispatches the logOut action to update the Redux store and clear user state.
   * - Redirects the user to the login page using the Next.js router.
   */
  const [authLogout] = useAuthLogOutMutation();
  const handleLogout = () => {
    authLogout();
    dispatch(logOut());
    router.push("/login");
  };

  if (!isClient) {
    return null; // or a skeleton/loading fallback
  }

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {isCurrentUserLoading ? (
            <div className="flex items-center group gap-[5px]">
              <div className="w-10">
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <div>
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          ) : (
            <div className="flex items-center group gap-[10px]">
              <Avatar className="w-8 h-8 border border-gray-300">
                <AvatarImage
                  src={currentUser?.image ?? userDummyImage}
                  alt={currentUser?.fullName || "Admin"}
                />
                <AvatarFallback>USER</AvatarFallback>
              </Avatar>
              <span className="font-medium text-[14px]">
                {currentUser?.fullName?.split(" ")[0] || "Admin"}
              </span>
              <ChevronDown className="w-5 h-5" />
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 z-[999]"
          portalled={"false"}
          sideOffset={8}
          align="start"
        >
          <DropdownMenuLabel>User Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link
                href={`/company-profile/${currentUser?.slug}`}
                target="_blank"
                className="w-full flex items-center justify-between gap-2 cursor-pointer"
              >
                <span>Company Profile</span>
                <DropdownMenuShortcut>
                  <SendToBack />
                </DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link
                href={`/dashboard/my-profile`}
                className="w-full flex items-center justify-between gap-2 cursor-pointer"
              >
                <span>My Profile</span>
                <DropdownMenuShortcut>
                  <SendToBack />
                </DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link
                href="/dashboard/settings"
                className="w-full flex items-center justify-between gap-2 cursor-pointer"
              >
                <span>Settings</span>
                <DropdownMenuShortcut>
                  <Settings />
                </DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <div
              className="flex items-center justify-between w-full cursor-pointer"
              onClick={handleLogout}
            >
              <span>Log out</span>
              <DropdownMenuShortcut className="flex items-center">
                <LogOut />
              </DropdownMenuShortcut>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
