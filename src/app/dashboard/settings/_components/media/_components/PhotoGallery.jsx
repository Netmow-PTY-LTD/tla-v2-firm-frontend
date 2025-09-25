"use client";

import MultipleFileUploader from "@/components/common/components/MultipleFileUploader";
import React from "react";

export default function PhotoGallery({ firmMediaInfo, refetch }) {
  console.log("PhotoGallery rendered 1");
  return (
    <div>
      <h3 className="16px text-black font-semibold heading-lg">Photos</h3>
      <p className="text-[#8E8E8E] mt-[10px]">
        Showcase your professionalism — while legal services may not be visual
        by nature, clients still value seeing photos of your office, team,
        certifications, events, or speaking engagements. It helps build trust
        and makes your practice more approachable.
      </p>

      <div className="mt-11">
        <MultipleFileUploader
          name="photos"
          refetch={refetch}
          firmMediaInfo={firmMediaInfo}
          label="Upload Photos"
          multiple
        />
      </div>
    </div>
  );
}
