"use client";
import React, { useEffect, useState } from "react";

import PhotoGallery from "./_components/PhotoGallery";
import VideoGallery from "./_components/VideoGallery";
import FormWrapper from "@/components/form/FormWrapper";
import {

  useGetFirmMediaQuery,
} from "@/store/firmFeatures/firmApiService";
import BannerUploader from "./_components/BannerUploader";

export default function Media() {
  const [videos, setVideos] = useState(null);

  const {
    data: firmMediaInfo,
    isLoading: isFirmMediaIsLoading,
    refetch: refetchFirmMediaInfo,
  } = useGetFirmMediaQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
    keepUnusedDataFor: 600, // keep data for 10 minutes
  });



  useEffect(() => {
    if (firmMediaInfo?.data?.videos) {
      setVideos(firmMediaInfo?.data?.videos);
    }
  }, [firmMediaInfo?.data?.videos]);



  const defaultValues = {
    videos: firmMediaInfo?.data?.videos?.map((item) => ({ url: item })) ?? [],
    photos: firmMediaInfo?.data?.photos ?? "",
  };



  return (
    <div className="max-w-[900px] mx-auto">
      <FormWrapper
        defaultValues={defaultValues}
      // schema={lawyerSettingsMediaFormSchema}
      >


        <div className="flex flex-col gap-3 ">
          <div className="mb-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Company Banner Image</h2>
            <p className="text-sm text-gray-500">
              Showcase your company with a professional banner. This image will appear at the top of your public profile and helps create a strong first impression for clients and partners.<br />

            </p>
          </div>
          <BannerUploader
            firmMediaInfo={firmMediaInfo}
            refetch={refetchFirmMediaInfo}
            name="bannerImage" />
        </div>

        <div className="flex flex-col gap-3 ">
          <PhotoGallery
            firmMediaInfo={firmMediaInfo}
            refetch={refetchFirmMediaInfo}
          />
        </div>

      </FormWrapper>
      <VideoGallery
        firmMediaInfo={firmMediaInfo}
        videos={videos}
        refetch={refetchFirmMediaInfo}
      />
    </div>
  );
}
