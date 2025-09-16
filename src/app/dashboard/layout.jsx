"use client";
import React, { useEffect, useState } from "react";
import LawFirmSidebar from "./_components/LawFirmSidebar";
import { usePathname } from "next/navigation";
import LawFirmDashboardHeader from "./_components/LawFirmDashboardHeader";
import "@/styles/dashboard.css";
import LawFirmDashboardFooter from "./_components/LawFirmDashboardFooter";

export default function LawFirmDashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const pathname = usePathname();
  const cleanPathname = pathname?.trim().replace(/\/+$/, "");

  const noScrollRoutes = [
    "/lawyer/dashboard/cases",
    "/lawyer/dashboard/my-responses",
  ];

  const isNoScrollPage = noScrollRoutes.includes(cleanPathname);

  useEffect(() => {
    if (isNoScrollPage) {
      window.scrollTo({ top: 0, behavior: "auto" });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "hidden"; // ✅ allow internal scroll
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isNoScrollPage]);
  return (
    <>
      <LawFirmDashboardHeader onToggleSidebar={toggleSidebar} />
      <div className="flex">
        <LawFirmSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        <div
          className={`flex-1 dashboard-content ${
            isNoScrollPage ? "no-scroll" : ""
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex-1 py-6 px-6">{children}</div>
            <LawFirmDashboardFooter />
          </div>
        </div>
      </div>
    </>
  );
}
