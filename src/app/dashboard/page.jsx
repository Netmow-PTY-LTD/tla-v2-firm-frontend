"use client";
import React, { use } from "react";
import CompanyProfileCard from "./_components/CompanyProfileCard";
import CompanyLocationSettings from "./_components/CompanyLocationSettings";
import CompanyCreditStatsCard from "./_components/CompanyCreditStatsCard";
import CompanyLawyerCountCard from "./_components/CompanyLawyerCountCard";
import { InteractiveBarChart } from "./_components/InteractiveBarChart";
import { useGetFirmInfoQuery } from "@/store/firmFeatures/firmApiService";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardHome() {
  const {
    data: companyInfo,
    isLoading: isCompanyInfoLoading,
    isError,
  } = useGetFirmInfoQuery();

  console.log("Company Info on Dashboard Home:", companyInfo);

  if (isCompanyInfoLoading) {
    return (
      <div className="p-6 space-y-8 animate-pulse">
        {/* Header section */}
        <div className="space-y-3">
          <Skeleton className="h-8 w-1/2 bg-gray-200" />
          <Skeleton className="h-4 w-1/3 bg-gray-200" />
        </div>

        {/* Content blocks */}
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="flex gap-4">
            {/* Avatar skeleton */}
            <Skeleton className="h-14 w-14 rounded-full flex-shrink-0 bg-gray-200" />
            {/* Text block */}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4 bg-gray-200" />
              <Skeleton className="h-4 w-2/3 bg-gray-200" />
              <Skeleton className="h-4 w-1/2 bg-gray-200" />
            </div>
          </div>
        ))}

        {/* Table or card-like block */}
        <div className="space-y-4 mt-8">
          <Skeleton className="h-6 w-1/3 bg-gray-200" />
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex gap-4 items-center">
              <Skeleton className="h-4 w-1/6 bg-gray-200" />
              <Skeleton className="h-4 w-1/4 bg-gray-200" />
              <Skeleton className="h-4 w-1/2 bg-gray-200" />
              <Skeleton className="h-4 w-1/5 bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }
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
