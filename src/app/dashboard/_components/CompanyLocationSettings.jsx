"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import MapMarkerAlt from "@/components/icons/MapMarkerAlt";
import { useGetOfficeLocationsQuery } from "@/store/firmFeatures/firmApiService";
import { Loader } from "lucide-react";

export default function CompanyLocationSettings({ companyInfo }) {
  //console.log('locations', locations);
  const {
    data: locations,
    isLoading: isLocationsLoading,
    refetch: refetchLocations,
  } = useGetOfficeLocationsQuery();

  return (
    <Card className="w-full rounded-2xl shadow-sm">
      <div className="px-4 border-b">
        <h3 className="heading-lg font-semibold text-black mb-4">
          Location Settings
        </h3>
      </div>
      {/* Locations Section */}
      <div className="px-4">
        <div className="flex items-center justify-between pb-4">
          <div>
            <h4 className="heading-base font-semibold text-black">Locations</h4>
            {locations?.data?.length > 0 && (
              <p className="mt-1 text-sm text-[#34495E]">
                You're receiving client within
              </p>
            )}
            {locations?.data?.length > 0 ? (
              locations.data.map((location, index) => (
                <div key={index} className="mt-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <MapMarkerAlt className="h-4 w-4 text-black" />
                    <span className="text-sm text-black">
                      {location.address?.zipcode}
                    </span>
                  </div>
                </div>
              ))
            ) : isLocationsLoading ? (
              <div className="flex items-center gap-2 mt-2">
                <Loader className="h-4 w-4 animate-spin text-black" />
              </div>
            ) : (
              <p className="mt-2 text-sm text-[#8E8E8E]">
                No locations added yet. Add locations from{" "}
                <Link
                  href="/dashboard/settings?section=locations"
                  className="text-[var(--primary-color)] hover:underline"
                >
                  here
                </Link>
                .
              </p>
            )}
          </div>
          {locations?.data?.length > 0 && (
            <Link
              href="/dashboard/settings?section=locations"
              className="text-sm text-[#8E8E8E] hover:underline"
            >
              Edit
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}
