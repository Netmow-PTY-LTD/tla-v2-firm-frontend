"use client";

import { useEffect, useState } from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { CloudUpload, Trash, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { showErrorToast, showSuccessToast } from "../toasts";
import { useUpdateFirmDataMutation } from "@/store/firmFeatures/firmAuth/firmAuthApiService";
import {
  useDeleteFirmMediaMutation,
  useUpdateFirmInfoMutation,
  useUpdateFirmMediaMutation,
} from "@/store/firmFeatures/firmApiService";

export default function MultipleFileUploaderTest({
  name = "avatar",
  label = "Upload File(s)",
  accept = "image/*",
  multiple = false,
  icon = <CloudUpload className="w-6 h-6 text-[#00C3C0] mb-2" />,
  refetch,
  firmMediaInfo,
}) {
  const [updatePhotosData, { isLoading: photosIsLoading }] =
    useUpdateFirmMediaMutation();
  const { register, getValues } = useFormContext();

  const [previews, setPreviews] = useState([]);

  //console.log("firmMediaInfo", firmMediaInfo?.data?.photos);

  useEffect(() => {
    if (firmMediaInfo?.data?.photos) {
      setPreviews(firmMediaInfo.data.photos);
    }
  }, [firmMediaInfo]);

  // console.log("previews", previews);

  const handleChange = async (e) => {
    try {
      const files = e.target.files;

      if (!files || files.length === 0) return;

      const formData = new FormData();

      // Optional payload - you can adjust this if needed
      const payload = {
        videos: "",
      };

      // Add JSON payload to formData
      formData.append("data", JSON.stringify(payload));

      // Append all selected files
      for (let i = 0; i < files.length; i++) {
        formData.append("photos", files[i]); // field name should match backend
      }

      console.log("check photos data==>", formData.get("photos"));

      // ✅ Log files correctly

      const res = await updatePhotosData(formData).unwrap();
      console.log("res", res);

      if (res?.success === true) {
        showSuccessToast(res?.message || "Update successful");
        setPreviews(res?.data?.photos || []);
        refetch();
      }
    } catch (error) {
      const errorMessage = error?.data?.message || "An error occurred";
      showErrorToast(errorMessage);
      console.error("Error submitting form:", error);
    }
  };

  const [deleteFirmMedia, { isLoading: isDeleting }] =
    useDeleteFirmMediaMutation();

  const handleDeleteFirmMedia = async (index) => {
    console.log("index", index);
    const payload = { type: "photos", index };
    console.log("payload", payload);
    try {
      const res = await deleteFirmMedia(payload).unwrap();
      console.log("res", res);
      if (res?.success === true) {
        showSuccessToast(res?.message || "Deleted successfully");
        setPreviews(res?.data?.photos);
        refetch();
      }
    } catch (error) {
      const errorMessage = error?.data?.message || "An error occurred";
      showErrorToast(errorMessage);
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex gap-4">
      {/* Previews */}
      <div className="flex flex-wrap gap-4">
        {previews.map((src, index) => (
          <div key={index} className="relative">
            <Avatar className="h-[90px] w-[90px] rounded-lg">
              <AvatarImage src={src} />
              <AvatarFallback>Img</AvatarFallback>
            </Avatar>
            <button
              type="button"
              className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full shadow p-1 hover:bg-red-100 cursor-pointer transition-all duration-300"
              onClick={() => handleDeleteFirmMedia(index)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Upload input */}
      <div className="max-w-sm">
        <label
          htmlFor={`file-upload-${name}`}
          className="flex flex-col items-center justify-center w-full px-5 py-4 border border-dashed border-gray-300 rounded-2xl cursor-pointer text-center hover:bg-gray-50 transition"
        >
          {icon}
          <input
            id={`file-upload-${name}`}
            type="file"
            className="hidden"
            onChange={handleChange}
            accept={accept}
            multiple={multiple}
          />
        </label>
        <p className="text-gray-700 font-medium text-center mt-2">{label}</p>
      </div>
    </div>
  );
}
