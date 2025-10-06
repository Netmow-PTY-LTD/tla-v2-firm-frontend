"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { userDummyImage } from "@/data/data";
import { formatRelativeTime } from "@/helpers/formatTime";
import Link from "next/link";
import { useGetLawyerRequestsListQuery } from "@/store/firmFeatures/lawyerRequest/lawyerRequest";

export default function LawyerRequestsAsMember() {
  // Fetch from your RTK Query hook
  const { data, isLoading } = useGetLawyerRequestsListQuery();
  const requests = data?.data || [];

  // Demo fallback data (in case API isn’t ready)
  const demoRequests = [
    {
      _id: "req1",
      message: "I would like to join your firm as a corporate lawyer.",
      status: "pending",
      createdAt: "2025-10-01T12:00:00Z",
      lawyerId: {
        _id: "law1",
        name: "Rabby Hasan",
        avatar: "https://randomuser.me/api/portraits/men/31.jpg",
      },
      reviewedBy: null,
      reviewedAt: null,
      firmProfileId: {
        name: "LegalX Law Associates",
        logo: "https://placehold.co/60x60?text=LX",
      },
    },
    {
      _id: "req2",
      message: "Interested in joining your criminal law department.",
      status: "approved",
      createdAt: "2025-09-28T10:15:00Z",
      lawyerId: {
        _id: "law2",
        name: "Nusrat Tania",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      reviewedBy: { name: "Admin (Mizan)" },
      reviewedAt: "2025-09-30T09:45:00Z",
      firmProfileId: {
        name: "Justice League Firm",
        logo: "https://placehold.co/60x60?text=JL",
      },
    },
  ];

  const showRequests = requests?.length ? requests : demoRequests;

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

  return (
    <div className="p-4 max-w-[1100px] mx-auto">
      <div className="mb-6">
        <h2 className="text-black font-semibold heading-lg">
          Lawyer Membership Requests
        </h2>
        <div className="h-0.5 w-[16%] bg-[#e79d13] mt-2 rounded"></div>
      </div>

      {showRequests.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center bg-gray-50 rounded-lg p-8 border border-dashed border-gray-300">
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
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
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
                    className="w-10 h-10 rounded-full object-cover"
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
