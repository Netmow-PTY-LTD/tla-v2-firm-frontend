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

export default function Media() {
  const {
    data: userInfo,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetFirmUserInfoQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
    keepUnusedDataFor: 600, // keep data for 10 minutes
  });
  const [updatePhotosData, { isLoading: photosIsLoading }] =
    useUpdateFirmDataMutation();

  const profile = userInfo?.data?.profile;
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
    videos: profile?.photos?.videos.map((item) => ({ url: item })) ?? [],
    photos: profile?.photos?.photos ?? "",
  };

  const handlePhotoUpload = async (data) => {
    try {
      const formData = new FormData();
      const { photos, videos } = data;

      console.log("Form data:", data);

      const payload = {
        photos: {
          videos: videos?.map((item) => item.url) || [],
        },
      };

      // Add JSON payload to formData
      formData.append("data", JSON.stringify(payload));

      // Append multiple photos
      if (Array.isArray(photos)) {
        photos.forEach((file) => {
          if (file instanceof File) {
            formData.append("photos", file);
          }
        });
      } else if (photos instanceof File) {
        formData.append("photos", photos);
      }

      // ✅ Log files correctly

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
        onSubmit={handlePhotoUpload}
        defaultValues={defaultValues}
        // schema={lawyerSettingsMediaFormSchema}
      >
        <div className="flex flex-col gap-3 ">
          <PhotoGallery />
          <VideoGallery />
        </div>
        {/* Footer Buttons */}
        <MediaFormAction
          isLoading={photosIsLoading}
          initialValues={defaultValues}
        />
      </FormWrapper>
    </div>
  );
}
