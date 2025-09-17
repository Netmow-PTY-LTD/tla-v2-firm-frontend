import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

import { userDummyImage } from "@/data/data";
import { BadgeAlert } from "lucide-react";
export default function CompanyProfileCard() {
  return (
    <>
      <div className="flex items-center justify-between p-4 bg-white rounded-[10px] relative z-[9] shadow-sm">
        {/* Left section: Avatar and text */}
        <div className="flex items-center gap-4">
          <Avatar className="h-[70px] w-[70px]">
            <AvatarImage src={userDummyImage} alt="Profile" />
            <AvatarFallback>PI</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-800 heading">
                {"Company Name"}
              </h2>

              {/* Show Warning Badge If Not Approved */}
              {/* {status !== "approved" && (
                  <span className="flex items-center gap-1 text-xs font-medium bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-full px-2 py-0.5 shadow-sm">
                    <BadgeAlert className="h-3.5 w-3.5 text-yellow-600" />
                    Your account is under approval by admin
                  </span>
                )} */}
            </div>

            <p className="text-gray-500 mt-1 admin-text">
              Completing your profile is a great way to appeal to clients.
            </p>
          </div>
        </div>

        {/* Right section: Edit button */}
        <Link
          href="/dashboard/settings"
          className="text-gray-600 text-sm font-medium px-4 py-2 rounded-md transition border border-gray-300"
        >
          Edit
        </Link>
      </div>
    </>
  );
}
