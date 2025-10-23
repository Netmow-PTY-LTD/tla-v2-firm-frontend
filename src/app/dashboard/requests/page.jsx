"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { userDummyImage } from "@/data/data";
import { formatRelativeTime } from "@/helpers/formatTime";
import Link from "next/link";
import { useGetLawyerRequestsListQuery } from "@/store/firmFeatures/lawyerRequest/lawyerRequest";
import AccessDenied from "@/components/AccessDenied";
import permissions from "@/data/permissions";
import { useCurrentUserInfoQuery } from "@/store/firmFeatures/firmAuth/firmAuthApiService";

export default function LawyerRequestsAsMember() {
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useCurrentUserInfoQuery();

  const pageId = permissions?.find(
    (perm) => perm.slug === "view-list-of-lawyer-requests"
  )._id;
  // Fetch from your RTK Query hook
  const { data, isLoading } = useGetLawyerRequestsListQuery();
  const requests = data?.data || [];

  const showRequests = requests?.length > 0 ? requests : [];

  if (isLoading) {
    return (
      <div className="p-6 space-y-8 animate-pulse">
        <div className="space-y-3">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="flex gap-4">
            <Skeleton className="h-14 w-14 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ✅ Apply page access control only for 'staff' role
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

  return (
    <div className="p-4 max-w-[1100px] mx-auto">
      <div className="mb-6">
        <h2 className="text-black font-semibold heading-lg">
          Lawyer Membership Requests
        </h2>
        <div className="h-0.5 w-[28%] bg-[#e79d13] mt-2 rounded"></div>
      </div>

      {showRequests.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-gray-400 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            No Membership Requests
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            You currently have no lawyer membership requests.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg">
          {showRequests.map((req, index) => (
            <div
              key={req._id}
              className="flex items-start justify-between gap-4 py-3 px-4 rounded-lg border border-gray-200 mb-3"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={req.lawyerId?.avatar || userDummyImage}
                    alt={req.lawyerId?.name || ""}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-gray-500 text-sm">
                    {req.lawyerId?.name}
                  </div>
                  <div className="text-black font-medium text-sm mb-1">
                    {req.message || "No message provided."}
                  </div>
                  <div className="text-xs text-gray-500">
                    Status:{" "}
                    <span
                      className={`font-semibold capitalize ${
                        req.status === "approved"
                          ? "text-green-600"
                          : req.status === "rejected"
                          ? "text-red-600"
                          : req.status === "cancelled"
                          ? "text-gray-500"
                          : "text-yellow-600"
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                  {req.reviewedBy && (
                    <div className="text-xs text-gray-400">
                      Reviewed by: {req.reviewedBy.name}{" "}
                      {req.reviewedAt && (
                        <>({formatRelativeTime(req.reviewedAt)})</>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">
                  {formatRelativeTime(req.createdAt)}
                </span>
                <Link href={`/dashboard/requests/${req._id}`}>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
