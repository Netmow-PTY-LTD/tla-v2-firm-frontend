"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  useCurrentUserInfoQuery,
  useGetFirmUserInfoQuery,
} from "@/store/firmFeatures/firmAuth/firmAuthApiService";
import { BellRing, PanelLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import LawFirmProfileDropDown from "./LawFirmProfileDropdown";
import { Badge } from "@/components/ui/badge";
import NotificationDropdown from "./NotificationDropDwon";

export default function LawFirmDashboardHeader({ onToggleSidebar }) {
  const [user, setUser] = React.useState(null);
  const router = useRouter();

  const token = Cookies.get("firm_token");
  const { data: companyInfo, isLoading: isCurrentUserLoading } =
    useGetFirmUserInfoQuery(undefined, {
      skip: !token,
    });

  //console.log("companyInfo from header", companyInfo);

  const { data: currentUser, isLoading: isCurrentUserDataLoading } =
    useCurrentUserInfoQuery(undefined, {
      skip: !token,
    });

  console.log("c from header", currentUser);

  return (
    <header className="db-header">
      <div className="db-header-container flex gap-4">
        <Link href={`${token ? "/dashboard" : "/"}`} className="db-logo">
          <Image
            src={"/assets/img/company-logo.png"}
            alt="TLA Logo"
            width={150}
            height={40}
          />
        </Link>
        <button
          data-sidebar-toggle
          onClick={() => onToggleSidebar()}
          className="xl:hidden cursor-pointer"
        >
          <PanelLeft />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <Badge
          asChild
          variant="secondary"
          className="px-3 py-1 bg-[#ff860231] text-[#ff8602] hidden sm:inline-flex"
        >
          <span>{companyInfo?.data?.firmName}</span>
        </Badge>
        {/* <Link
          href="#"
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full flex-shrink-0"
        >
          <BellRing className="w-5 h-5 text-gray-500" />
        </Link> */}
        <NotificationDropdown />
        <LawFirmProfileDropDown
          currentUser={currentUser?.data ?? []}
          isCurrentUserLoading={isCurrentUserLoading}
        />
      </div>
    </header>
  );
}
