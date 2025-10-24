"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, CreditCard, Flame, Wallet } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CompanyCreditStatsCard({ data }) {
  return (
    <Card className="w-full bg-white shadow-sm rounded-2xl">
      <div className="flex justify-between items-center gap-4">
        <div className="w-full text-center md:text-left border-b px-4 pb-4">
          <h3 className="heading-lg font-semibold text-black">
            Credits Overview
          </h3>
        </div>
      </div>
      <div className="w-full px-4 grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {/* Total Purchased Credits */}
        <div className="bg-[#F5F6F9] flex flex-col items-center justify-center p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-1">
            {/* Icon for purchased credits */}
            <CreditCard className="w-5 h-5 text-blue-600" />
            <h4 className="text-xl font-bold text-black">
              {data?.lawyerCreditStats?.totalPurchasedCredits || 0}
            </h4>
          </div>
          <p className="text-xs text-gray-600 mt-1">Total Credits Purchase</p>
        </div>

        {/* Total Used Credits */}
        <div className="bg-[#F5F6F9] flex flex-col items-center justify-center p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-1">
            {/* Icon for used credits */}
            <Flame className="w-5 h-5 text-orange-500" />
            <h4 className="text-xl font-bold text-black">
              {data?.lawyerCreditStats?.totalUsedCredits || 0}
            </h4>
          </div>
          <p className="text-xs text-gray-600 mt-1">Total Used Credits</p>
        </div>

        {/* Remaining Credits */}
        {/* <div className="bg-[#F5F6F9] flex flex-col items-center justify-center p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-1">
           
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h4 className="text-xl font-bold text-black">
                {creditStats?.remainingCredits}
              </h4>
            </div>
            <p className="text-xs text-gray-600 mt-1">Remaining Credits</p>
          </div> */}

        {/* Current Credits */}
        <div className="bg-[#F5F6F9] flex flex-col items-center justify-center p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-1">
            {/* Icon for current credits */}
            <Wallet className="w-5 h-5 text-purple-500" />
            <h4 className="text-xl font-bold text-black">
              {data?.lawyerCreditStats?.currentCredits || 0}
            </h4>
          </div>
          <p className="text-xs text-gray-600 mt-1">Available Credits</p>
        </div>
      </div>
    </Card>
  );
}
