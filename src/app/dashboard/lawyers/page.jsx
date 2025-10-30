"use client";
import {
  Eye,
  LogIn,
  MoreHorizontal,
  Pencil,
  Star,
  Trash2,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetFirmInfoQuery } from "@/store/firmFeatures/firmApiService";
import { Skeleton } from "@/components/ui/skeleton";
import AccessDenied from "@/components/AccessDenied";
import permissions from "@/data/permissions";
import {
  useCurrentUserInfoQuery,
  useLawyerLoginRequestMutation,
} from "@/store/firmFeatures/firmAuth/firmAuthApiService";
import { ConfirmationModal } from "@/components/common/components/ConfirmationModal";

export default function LawyersList() {
  const [isOpen, setIsOpen] = useState(false);
  const pageId = permissions?.find(
    (perm) => perm.slug === "view-lawyer-list"
  )._id;

  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useCurrentUserInfoQuery();
  const {
    data: companyInfo,
    isLoading: isCompanyInfoLoading,
    isError,
  } = useGetFirmInfoQuery();

  console.log("Current User on Lawyers List Page:", currentUser);
  const [lawyerLoginRequest] = useLawyerLoginRequestMutation();

  //console.log("Company Info on Lawyers List:", companyInfo?.data?.lawyers);

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

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  //  Apply page access control only for 'staff' role
  const hasPageAccess =
    currentUser?.data?.role === "staff"
      ? currentUser?.data?.permissions?.some((perm) => {
          const idMatch = perm?.pageId?._id === pageId || perm?._id === pageId;
          return idMatch && perm?.permission === true;
        })
      : true; // other roles always have access

  if (!hasPageAccess) {
    return <AccessDenied />;
  }

  const loginAccessId = permissions?.find(
    (perm) => perm.slug === "you-are-permitted-to-log-in-to-the-lawyer-panel"
  )._id;

  const hasLoginAsLawyerPermissions =
    currentUser?.data?.role === "staff"
      ? currentUser?.data?.permissions?.some((perm) => {
          const idMatch =
            perm?.pageId?._id === loginAccessId || perm?._id === loginAccessId;
          return idMatch && perm?.permission === true;
        })
      : true;

  if (lawyers.length === 0) {
    return (
      <div className="p-8 text-center max-w-[900px] mx-auto">
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

  const handleLawyerLogin = async (lawyerId) => {
    try {
      const requestLawyer = await lawyerLoginRequest({ lawyerId }).unwrap();
      console.log("Lawyer Login Request Response:", requestLawyer);
      if (requestLawyer?.data?.redirectUrl) {
        window.open(requestLawyer?.data?.redirectUrl, "_blank");
      }
    } catch (error) {
      console.error("Error logging in as lawyer:", error);
    }
  };

  const handleLawyerDelete = async (lawyerId) => {
    // Implement delete functionality here
    console.log("Delete lawyer with ID:", lawyerId);
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-8 border-b border-gray-200 pb-3">
        <h3 className="text-black font-semibold heading-lg mb-2">
          List of Lawyers affiliated with the Firm
        </h3>
        <div>
          {" "}
          <b>Total: {lawyers?.length}</b>
        </div>
      </div>
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
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-white hover:bg-gray-200 cursor-pointer"
                      >
                        <Star className="h-4 w-4 text-yellow-500" />
                      </button>
                      {lawyer?.isElitePro === true &&
                        lawyer?.eliteProSubscriptionId !== null && (
                          <div className="w-8 h-8 bg-[var(--primary-color)] text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center justify-center">
                            E
                          </div>
                        )}

                      {lawyer?.subscriptionId &&
                        lawyer?.subscriptionId !== null && (
                          <div className="bg-[var(--secondary-color)] text-white px-2 py-1 rounded-full text-xs font-semibold w-8 h-8 flex items-center justify-center">
                            S
                          </div>
                        )}
                    </div>

                    {/* Dropdown */}
                    {/* <DropdownMenu>
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
                            <Eye className="w-4 h-4" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex gap-2 cursor-pointer py-1 px-2 text-red-600">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </DropdownMenuItem>

                        {hasLoginAsLawyerPermissions && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex gap-2 cursor-pointer py-1 px-2">
                              <button
                                onClick={() => handleLawyerLogin(lawyer._id)}
                                className="flex gap-2"
                              >
                                <Trash2 className="w-4 h-4 cursor-pointer" />
                                Login
                              </button>
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu> */}
                  </div>

                  {/* Profile Info */}
                  <div className="flex flex-col gap-6 mt-6">
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
                    <div className="bg-gray-50 rounded-md p-3 text-sm text-gray-700 space-y-2">
                      {/* Total Credits */}
                      <div className="flex justify-between">
                        <span className="font-medium text-xs">
                          Total Credits:
                        </span>
                        <span className="text-gray-800 font-medium text-xs">
                          {lawyer?.credits || 0}
                        </span>
                      </div>

                      {/* Elite Pro Dates */}
                      {lawyer?.eliteProPeriodStart &&
                        lawyer?.eliteProPeriodEnd && (
                          <div className="flex justify-between">
                            <span className="font-medium text-xs">
                              Elite Pro:
                            </span>
                            <span className="text-gray-800 font-medium text-xs">
                              {formatDate(lawyer.eliteProPeriodStart)} →{" "}
                              {formatDate(lawyer.eliteProPeriodEnd)}
                            </span>
                          </div>
                        )}

                      {/* Subscription Dates */}
                      {lawyer?.subscriptionPeriodStart &&
                        lawyer?.subscriptionPeriodEnd && (
                          <div className="flex justify-between">
                            <span className="font-medium text-xs">
                              Subscription:
                            </span>
                            <span className="text-gray-800 font-medium text-xs">
                              {formatDate(lawyer.subscriptionPeriodStart)} →{" "}
                              {formatDate(lawyer.subscriptionPeriodEnd)}
                            </span>
                          </div>
                        )}
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
                    {/* Action Buttons */}
                    <div className="w-full flex flex-wrap justify-center gap-3 mt-3">
                      {/* View Profile */}
                      <Link
                        href={`/dashboard/lawyers/${lawyer.slug}`}
                        className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors duration-200 font-medium cursor-pointer"
                      >
                        <Eye className="w-4 h-4 inline-block mr-1" />
                        View
                      </Link>

                      {/* Login */}
                      {hasLoginAsLawyerPermissions && (
                        <button
                          onClick={() => handleLawyerLogin(lawyer?._id)}
                          className="px-4 py-2 text-sm bg-[#00C3C0] hover:bg-[#00a9a7] text-white rounded-md transition-colors duration-200 font-medium cursor-pointer"
                        >
                          <LogIn className="w-4 h-4 inline-block mr-1" />
                          Login As Lawyer
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => setIsOpen(true)}
                        className="px-4 py-2 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors duration-200 font-medium cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 inline-block mr-1" />
                        Delete
                      </button>
                      <ConfirmationModal
                        onConfirm={() => handleLawyerDelete(lawyer?._id)}
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        description="Do you want to delete your lawyer?"
                        cancelText="No"
                      />
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
