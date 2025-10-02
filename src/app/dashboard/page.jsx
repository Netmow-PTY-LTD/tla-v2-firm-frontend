"use client";
import React, { use } from "react";
import CompanyProfileCard from "./_components/CompanyProfileCard";
import CompanyLocationSettings from "./_components/CompanyLocationSettings";
import CompanyCreditStatsCard from "./_components/CompanyCreditStatsCard";
import CompanyLawyerCountCard from "./_components/CompanyLawyerCountCard";
import { InteractiveBarChart } from "./_components/InteractiveBarChart";
import { useGetFirmInfoQuery } from "@/store/firmFeatures/firmApiService";

export default function DashboardHome() {
  const { data: companyInfo, isLoading, isError } = useGetFirmInfoQuery();

  console.log("Company Info on Dashboard Home:", companyInfo);
  return (
    <div className=" max-w-[1200px] mx-auto relative z-0">
      {/* <WelcomeCard /> */}

      <CompanyProfileCard companyInfo={companyInfo?.data} />
      <div className="mt-5">
        <InteractiveBarChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 relative z-[1]">
        <CompanyLocationSettings companyInfo={companyInfo?.data} />
        <div className="space-y-4">
          <CompanyCreditStatsCard companyInfo={companyInfo?.data} />

          <CompanyLawyerCountCard companyInfo={companyInfo?.data} />
        </div>
      </div>
    </div>
  );
}
