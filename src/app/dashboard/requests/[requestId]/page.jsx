"use client";

import {
  useGetSingleLawyerRequestQuery,
  useUpdateLawyerRequestMutation,
} from "@/store/firmFeatures/lawyerRequest/lawyerRequest";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { userDummyImage } from "@/data/data";
import { formatRelativeTime } from "@/helpers/formatTime";
import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/store/firmFeatures/firmAuth/firmAuthSlice";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useCurrentUserInfoQuery } from "@/store/firmFeatures/firmAuth/firmAuthApiService";
import AccessDenied from "@/components/AccessDenied";
import permissions from "@/data/permissions";
import { Loader2 } from "lucide-react";
import { showSuccessToast } from "@/components/common/toasts";

export default function Page() {
  const params = useParams();
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useCurrentUserInfoQuery();

  const pageId = permissions?.find(
    (perm) => perm.slug === "can-accept-or-reject-lawyer-list"
  )._id;

  const currentUserId = currentUser?.data?._id;
  const { data, isLoading, isError } = useGetSingleLawyerRequestQuery(
    params.requestId,
    { skip: !params.requestId }
  );

  //console.log("Single Request Data:", data);

  const [
    updateLawyerRequestStatus,
    { isLoading: isUpdateLawyerRequestStatusLoading },
  ] = useUpdateLawyerRequestMutation();

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 space-y-6 animate-pulse">
        <Skeleton className="h-8 w-3/4 sm:w-1/2" />
        <Skeleton className="h-6 w-1/2 sm:w-1/3" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="p-6 text-center text-red-600">
        Failed to load request. Please try again.
      </div>
    );
  }

  const handleStatusUpdate = async (newStatus) => {
    const payload = {
      status: newStatus,
      reviewedBy: currentUserId, // Replace with current firm user ID
      reviewedAt: new Date().toISOString(),
    };

    if (newStatus === "rejected") {
      payload.rejectionReason =
        "Unfortunately, your request to join this firm has been declined."; // Hardcoded rejection message
    }

    if (newStatus === "approved") {
      payload.message = "Welcome to our firm!";
    }

    try {
      const result = await updateLawyerRequestStatus({
        requestId: params.requestId,
        data: payload,
      }).unwrap(); // unwrap will throw error if mutation fails

      showSuccessToast(
        `Request has been ${
          newStatus === "approved" ? "approved" : "rejected"
        } successfully!`
      );
      console.log("Updated request:", result);
    } catch (error) {
      console.error("Failed to update request:", error);
      toast.error(
        error?.data?.message || "Failed to update request. Please try again."
      );
    }
  };

  const request = data.data || {};
  console.log("Request Details:", request);
  const { lawyerId, firmProfileId, message, status, createdAt, updatedAt } =
    request;

  // ✅ Apply page access control only for 'staff' role
  const hasPermissions =
    currentUser?.data?.role === "staff"
      ? currentUser?.data?.permissions?.some((perm) => {
          const idMatch = perm?.pageId?._id === pageId || perm?._id === pageId;
          return idMatch && perm?.permission === true;
        })
      : true; // other roles always have access

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="px-6 sm:px-8 py-5 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white/60 backdrop-blur-sm">
        <h4 className="text-lg font-semibold text-gray-900 tracking-tight">
          Request Details
        </h4>
        <span
          className={`px-4 py-1 text-sm font-medium rounded-full shadow-sm capitalize ${
            status === "pending"
              ? "bg-amber-50 text-amber-800 ring-1 ring-amber-200"
              : status === "approved"
              ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
              : status === "rejected"
              ? "bg-rose-50 text-rose-800 ring-1 ring-rose-200"
              : "bg-gray-50 text-gray-700 ring-1 ring-gray-200"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Lawyer & Firm Info - Split layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Lawyer Info */}
          <div className="space-y-4 col-span-2">
            <div className="flex items-center gap-4">
              <img
                src={lawyerId.profilePicture || userDummyImage}
                alt={lawyerId.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-100"
              />
              <div>
                <h5 className="text-md font-semibold text-gray-900">
                  {lawyerId.name}
                </h5>
                <p className="text-sm text-gray-500">
                  {lawyerId.lawyerContactEmail}
                </p>
                {lawyerId.designation && (
                  <p className="text-sm text-gray-400 italic">
                    {lawyerId.designation}
                  </p>
                )}
              </div>
            </div>

            <div className="text-sm text-gray-600 space-y-1 border-l-2 border-gray-200 pl-3">
              {lawyerId.law_society_member_number && (
                <p>
                  <span className="font-medium text-gray-800">Society #:</span>{" "}
                  {lawyerId.law_society_member_number}
                </p>
              )}
              {lawyerId.practising_certificate_number && (
                <p>
                  <span className="font-medium text-gray-800">
                    Certificate #:
                  </span>{" "}
                  {lawyerId.practising_certificate_number}
                </p>
              )}
            </div>
          </div>

          {/* Firm Info */}
          <div className="bg-white/70 col-span-1">
            <h5 className="text-lg font-semibold text-gray-900 mb-1">
              Firm Details
            </h5>
            <div className="text-sm text-gray-700 space-y-1.5">
              <p>
                <span className="font-medium text-gray-800">Name:</span>{" "}
                {firmProfileId.firmName}
              </p>
              {firmProfileId.registrationNumber && (
                <p>
                  <span className="font-medium text-gray-800">Reg. #:</span>{" "}
                  {firmProfileId.registrationNumber}
                </p>
              )}
              {firmProfileId.contactInfo?.email && (
                <p>
                  <span className="font-medium text-gray-800">Email:</span>{" "}
                  {firmProfileId.contactInfo.email}
                </p>
              )}
              {firmProfileId.contactInfo?.phone && (
                <p>
                  <span className="font-medium text-gray-800">Phone:</span>{" "}
                  {firmProfileId.contactInfo.phone}
                </p>
              )}
              {firmProfileId.contactInfo?.address && (
                <p>
                  <span className="font-medium text-gray-800">Address:</span>{" "}
                  {firmProfileId.contactInfo.address}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Request Message */}
        <div className="border-t border-gray-200 pt-6">
          <h5 className="text-lg font-semibold text-gray-900 mb-2">
            Request Message
          </h5>
          <div className="bg-gray-50 rounded-lg p-4 text-gray-700 text-sm leading-relaxed whitespace-pre-line break-words">
            {message}
          </div>
        </div>

        {/* Dates */}
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row sm:justify-between text-xs text-gray-500 gap-1 sm:gap-0">
          <p>Created: {formatRelativeTime(createdAt)}</p>
          <p>Last Updated: {formatRelativeTime(updatedAt)}</p>
        </div>

        {/* Actions */}
        {status === "pending" && hasPermissions && (
          <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row gap-3">
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg w-full sm:w-auto px-6 py-2.5 transition-all shadow-sm"
              onClick={() => handleStatusUpdate("approved")}
              disabled={isUpdateLawyerRequestStatusLoading}
            >
              {isUpdateLawyerRequestStatusLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              ) : (
                "Approve Request"
              )}
            </Button>
            <Button
              className="bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg w-full sm:w-auto px-6 py-2.5 transition-all shadow-sm"
              onClick={() => handleStatusUpdate("rejected")}
            >
              Reject Request
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
