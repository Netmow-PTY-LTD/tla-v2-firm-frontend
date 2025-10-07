"use client";
import { MoreHorizontal, Pencil, Star, Trash2, Users } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { lawyers } from "@/data/data";
import { useGetFirmInfoQuery } from "@/store/firmFeatures/firmApiService";
import { Skeleton } from "@/components/ui/skeleton";

export default function LawyersList() {
  const {
    data: companyInfo,
    isLoading: isCompanyInfoLoading,
    isError,
  } = useGetFirmInfoQuery();

  console.log("Company Info on Lawyers List:", companyInfo?.data?.lawyers);

  const lawyers = companyInfo?.data?.lawyers || [];

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

  if (lawyers.length === 0) {
    return (
      <div className="p-8 text-center border border-dashed border-gray-300 rounded-md bg-gray-50 shadow-sm max-w-[900px] mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Users className="w-12 h-12 text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-700">
            No Lawyers Found
          </h2>
          <p className="text-sm text-gray-500 max-w-md">
            This firm currently has no lawyers affiliated with it. Please check
            back later or contact the firm directly for more information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lawyers?.length > 0 &&
          lawyers?.map((lawyer) => (
            <div
              key={lawyer._id}
              className="bg-white shadow rounded-lg overflow-hidden relative w-full border"
            >
              {/* Team Cover */}
              <div className="w-full h-32 relative bg-[#c1c1c1]"></div>

              {/* Card Body */}
              <div className="p-6 mt-[-140px] relative z-10">
                <div className="flex flex-col">
                  {/* Settings + Dropdown */}
                  <div className="w-full flex justify-between items-center mb-4">
                    {/* Favorite button */}
                    <button
                      type="button"
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-white hover:bg-gray-200 cursor-pointer"
                    >
                      <Star className="h-4 w-4 text-yellow-500" />
                    </button>

                    {/* Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 cursor-pointer"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex gap-2 cursor-pointer py-1 px-2">
                          <Link href="#" className="flex gap-2">
                            <Pencil className="w-4 h-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex gap-2 cursor-pointer py-1 px-2 text-red-600">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Profile Info */}
                  <div className="flex flex-col gap-8 mt-6">
                    <div className="w-full flex flex-col items-center gap-4 text-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden border flex-shrink-0">
                        <img
                          src={lawyer.profilePicture}
                          alt={lawyer.name}
                          className="w-full h-full object-cover"
                          onError={(e) =>
                            (e.currentTarget.src =
                              "https://themesbrand.com/velzon/html/master/assets/images/users/avatar-2.jpg")
                          }
                        />
                      </div>
                      <div>
                        <Link
                          href={`/dashboard/lawyers/${lawyer.slug}`}
                          className="hover:underline"
                        >
                          <h5 className="text-base font-semibold">
                            {lawyer.name}
                          </h5>
                        </Link>
                        <p className="text-gray-500 text-sm">
                          {lawyer.designation}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {lawyer?.serviceIds?.map((service, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                        >
                          {service?.name}
                        </span>
                      ))}
                    </div>
                    {/* Stats */}
                    <div className="w-full flex text-center text-gray-500">
                      <div className="flex-1 border-r">
                        <h5 className="text-lg font-semibold text-gray-800">
                          {lawyer.cases}
                        </h5>
                        <p className="text-sm">Total Cases</p>
                      </div>
                      <div className="flex-1">
                        <h5 className="text-lg font-semibold text-gray-800">
                          {lawyer.hired}
                        </h5>
                        <p className="text-sm">Hired</p>
                      </div>
                    </div>

                    {/* View Button */}
                    <div className="w-full flex justify-center">
                      <Link
                        href={`/dashboard/lawyers/${lawyer.slug}`}
                        className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
