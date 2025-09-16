import { Button } from "@/components/ui/button";
import React from "react";
import CompanyProfileCard from "./_components/CompanyProfileCard";
import CompanyLocationSettings from "./_components/CompanyLocationSettings";
import CompanyCreditStatsCard from "./_components/CompanyCreditStatsCard";
import CompanyLawyerCountCard from "./_components/CompanyLawyerCountCard";
import { InteractiveBarChart } from "./_components/InteractiveBarChart";

export default function DashboardHome() {
  return (
    <div className=" max-w-[1200px] mx-auto relative z-0">
      {/* <WelcomeCard /> */}

      <CompanyProfileCard />
      <div className="mt-5">
        <InteractiveBarChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 relative z-[1]">
        <CompanyLocationSettings />
        <div className="space-y-4">
          <CompanyCreditStatsCard />

          <CompanyLawyerCountCard />
        </div>
      </div>
    </div>
  );
}
