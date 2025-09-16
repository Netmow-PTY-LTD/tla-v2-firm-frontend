import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import MapMarkerAlt from "@/components/icons/MapMarkerAlt";

export default function CompanyLocationSettings() {
  //console.log('locations', locations);
  return (
    <Card className="w-full rounded-2xl shadow-sm">
      <div className="px-4 border-b">
        <h3 className="text-xl font-semibold text-black mb-4">
          Location Settings
        </h3>
      </div>
      {/* Locations Section */}
      <div className="px-4">
        <div className="flex items-center justify-between pb-4">
          <div>
            <h4 className="heading-base font-semibold text-black">Locations</h4>
            <p className="mt-1 text-sm text-[#34495E]">
              You're receiving client within
            </p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <MapMarkerAlt className="h-4 w-4 text-black" />
                <span className="text-sm text-black">
                  West Springfield MA 01089, United States
                </span>
              </div>
            </div>
          </div>
          <Link
            href="/dashboard/settings"
            className="text-sm text-[#8E8E8E] hover:underline"
          >
            Edit
          </Link>
        </div>
      </div>
    </Card>
  );
}
