"use client";
import React from "react";

import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
import {
  useGetFirmUserInfoQuery,
  useUpdateFirmDataMutation,
} from "@/store/firmFeatures/firmAuth/firmAuthApiService";

import PhotoGallery from "./_components/PhotoGallery";
import VideoGallery from "./_components/VideoGallery";
import MediaFormAction from "./_components/MediaFormAction";
import FormWrapper from "@/components/form/FormWrapper";
import {
  useGetFirmInfoQuery,
  useGetFirmMediaQuery,
} from "@/store/firmFeatures/firmApiService";

export default function Media() {
  console.log("Media rendered 1");
  const { data: firmMediaInfo, isLoading: isFirmMediaIsLoading } =
    useGetFirmMediaQuery(undefined, {
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: false,
      refetchOnFocus: false,
      keepUnusedDataFor: 600, // keep data for 10 minutes
    });

  console.log("Media rendered 2");

  // console.log("firmMediaInfo", firmMediaInfo);
  const [updatePhotosData, { isLoading: photosIsLoading }] =
    useUpdateFirmDataMutation();

  console.log("Media rendered 3");

  //const profile = userInfo?.data?.profile;
  // if (isLoading)
  //   return (
  //     <div>
  //       <span className="flex items-center justify-center gap-2">
  //         <Loader className="w-4 h-4 animate-spin" />
  //         loading...
  //       </span>
  //     </div>
  //   );

  // if (isError) {
  //   return (
  //     <div className="flex items-center justify-center ">
  //       <div className="text-red-500 ">
  //         <p>Error loading profile: {error.message}</p>
  //         <button
  //           onClick={refetch}
  //           className="bg-blue-500 text-white px-4 py-2 rounded"
  //         >
  //           Retry
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  const defaultValues = {
    videos: firmMediaInfo?.data?.videos.map((item) => ({ url: item })) ?? [],
    photos: firmMediaInfo?.data?.photos ?? "",
  };

  //console.log("defaultValues", defaultValues);
  const handlePhotoUpload = async (data) => {
    console.log("data", data);
    try {
      const formData = new FormData();
      const { photos, videos } = data;

      console.log("Form data:", data);

      const payload = {
        videos: videos?.map((item) => item.url) || [],
      };

      console.log("Payload:", payload);

      formData.append("data", JSON.stringify(payload));

      if (Array.isArray(photos)) {
        photos.forEach((file) => {
          if (file instanceof File) {
            formData.append("photos", file);
          }
        });
      } else if (photos instanceof File) {
        formData.append("photos", photos);
      }

      console.log("check photos data==>", formData.get("data"));
      console.log("check photos data==>", formData.get("photos"));

      const res = await updatePhotosData(formData).unwrap();
      console.log("response ==>", res);

      if (res?.success === true) {
        showSuccessToast(res?.message || "Update successful");
      }
    } catch (error) {
      const errorMessage = error?.data?.message || "An error occurred";
      showErrorToast(errorMessage);
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <FormWrapper
        defaultValues={defaultValues}
        // schema={lawyerSettingsMediaFormSchema}
      >
        <div className="flex flex-col gap-3 ">
          <PhotoGallery />
          <VideoGallery />
        </div>
        {/* Footer Buttons */}
        {/* <MediaFormAction
          isLoading={photosIsLoading}
          initialValues={defaultValues}
        /> */}
      </FormWrapper>
    </div>
  );
}
