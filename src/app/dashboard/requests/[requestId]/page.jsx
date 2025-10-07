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

export default function Page() {
  const params = useParams();
  const currentUserId = useSelector(selectCurrentUser)?._id;
  const { data, isLoading, isError } = useGetSingleLawyerRequestQuery(
    params.requestId,
    { skip: !params.requestId }
  );

  //console.log("Single Request Data:", data);

  const [updateLawyerRequestStatus] = useUpdateLawyerRequestMutation();

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

      toast.success(
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

  const request = data.data;
  const { lawyerId, firmProfileId, message, status, createdAt, updatedAt } =
    request;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-semibold">Request Details</h1>
        <span
          className={`px-3 py-1 text-sm rounded-full font-medium ${
            status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : status === "approved"
              ? "bg-green-100 text-green-800"
              : status === "rejected"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {status.toUpperCase()}
        </span>
      </div>

      {/* Lawyer Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <img
          src={lawyerId.profilePicture || userDummyImage}
          alt={lawyerId.name}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 space-y-1">
          <h2 className="text-lg sm:text-xl font-semibold">{lawyerId.name}</h2>
          <p className="text-sm sm:text-base text-gray-500">
            {lawyerId.lawyerContactEmail}
          </p>
          {lawyerId.designation && (
            <p className="text-sm text-gray-500">{lawyerId.designation}</p>
          )}
          {lawyerId.law_society_member_number && (
            <p className="text-sm text-gray-500">
              Society #: {lawyerId.law_society_member_number}
            </p>
          )}
          {lawyerId.practising_certificate_number && (
            <p className="text-sm text-gray-500">
              Certificate #: {lawyerId.practising_certificate_number}
            </p>
          )}
        </div>
      </div>

      {/* Firm Info */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <h3 className="text-lg sm:text-xl font-semibold">Firm Info</h3>
        <p>
          <span className="font-medium">Name: </span>
          {firmProfileId.firmName}
        </p>
        {firmProfileId.registrationNumber && (
          <p>
            <span className="font-medium">Registration #: </span>
            {firmProfileId.registrationNumber}
          </p>
        )}
        {firmProfileId.contactInfo?.email && (
          <p>
            <span className="font-medium">Email: </span>
            {firmProfileId.contactInfo.email}
          </p>
        )}
        {firmProfileId.contactInfo?.phone && (
          <p>
            <span className="font-medium">Phone: </span>
            {firmProfileId.contactInfo.phone}
          </p>
        )}
        {firmProfileId.contactInfo?.address && (
          <p>
            <span className="font-medium">Address: </span>
            {firmProfileId.contactInfo.address}
          </p>
        )}
      </div>

      {/* Request Message */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">
          Request Message
        </h3>
        <p className="text-gray-700 break-words">{message}</p>
      </div>

      {/* Dates */}
      <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500 gap-1 sm:gap-0">
        <p>Created: {formatRelativeTime(createdAt)}</p>
        <p>Last Updated: {formatRelativeTime(updatedAt)}</p>
      </div>

      {/* Action Buttons */}
      {status === "pending" && (
        <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row gap-3">
          <Button
            className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
            onClick={() => handleStatusUpdate("approved")}
          >
            Approve
          </Button>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button
              className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
              onClick={() => handleStatusUpdate("rejected")}
            >
              Reject
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
