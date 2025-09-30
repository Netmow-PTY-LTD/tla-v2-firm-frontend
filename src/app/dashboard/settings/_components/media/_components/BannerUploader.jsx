
"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { CloudUpload, X } from "lucide-react";
import { DEFAULT_IMAGES } from "@/data/data";
import resizeAndConvertToWebP from "@/components/common/components/resizeAndConvertToWebP";
import {

  useDeleteFirmMediaMutation,
  useUpdateFirmMediaMutation,

} from "@/store/firmFeatures/firmApiService";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";



export default function BannerUploader({
  name = "banner",
  accept = "image/*",
  multiple = false,
  icon = <CloudUpload className="w-6 h-6 text-[#00C3C0] mb-2" />,
  defaultImage = DEFAULT_IMAGES.BANNER,
  firmMediaInfo,
  refetch,
}) {
  const { setValue, watch } = useFormContext();
  const file = watch(name);
  const [preview, setPreview] = useState(null);

  // --- Mutations ---
  const [deleteFirmMedia, { isLoading: isDeleting }] =
    useDeleteFirmMediaMutation();
  const [uploadFirmBanner, { isLoading: isUploading }] =
    useUpdateFirmMediaMutation();


  // Handle preview changes
  useEffect(() => {
    if (file instanceof File) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }

    // Backend banner image
    if (firmMediaInfo?.data?.bannerImage) {
      setPreview(firmMediaInfo.data.bannerImage);
    } else {
      // No banner
      setPreview(null);
    }
  }, [file, firmMediaInfo?.data?.bannerImage]);

  // Handle file upload
  const handleChange = async (e) => {
    const uploaded = e.target.files?.[0];
    if (!uploaded) return;

    try {
      const webpFile = await resizeAndConvertToWebP(uploaded, 1200, 0.8);
      if (!webpFile) return;

      setValue(name, webpFile, { shouldValidate: true });

      // Prepare FormData for API
      const formData = new FormData();
      // Optional payload - you can adjust this if needed
      const payload = {
        videos: "",
      };

      // Add JSON payload to formData
      formData.append("data", JSON.stringify(payload));
      formData.append("bannerImage", webpFile);

      const res = await uploadFirmBanner(formData).unwrap();
      if (res?.success) {
        showSuccessToast(res?.message || "Banner uploaded successfully");
        setPreview(res?.data?.bannerImage);
        refetch();
      }
    } catch (error) {
      const errorMessage = error?.data?.message || "Upload failed";
      showErrorToast(errorMessage);
      console.error("Upload error:", error);
    }
  };

  // Handle banner delete
  const handleDeleteFirmBanner = async () => {
    try {
      const payload = { type: "bannerImage" };
      const res = await deleteFirmMedia(payload).unwrap();
      if (res?.success) {
        showSuccessToast(res?.message || "Banner deleted successfully");
        setPreview("");
        setValue(name, "", { shouldValidate: true });
        refetch();
      }
    } catch (error) {
      const errorMessage = error?.data?.message || "Delete failed";
      showErrorToast(errorMessage);
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {preview ? (
        <div className="relative w-full max-w-2xl h-48 md:h-60 lg:h-72 z-[1]">
          <img
            src={preview}
            alt="Banner Preview"
            className="object-cover h-full w-full rounded-lg"
          />

          {/* Remove Button */}
          <button
            type="button"
            disabled={isDeleting}
            onClick={handleDeleteFirmBanner}
            className="absolute top-[-8px] right-[-8px] bg-white border border-gray-300 text-gray-600 rounded-full p-1 shadow hover:text-red-500 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="relative w-full max-w-2xl h-48 md:h-60 lg:h-72 z-[1]">
          <img
            src={defaultImage}
            alt="Banner Default"
            className="object-cover h-full w-full rounded-lg absolute top-0 left-0 z-[-1] opacity-50"
          />
          <label
            htmlFor={`file-upload-${name}`}
            className="flex flex-col items-center justify-center h-48 w-full md:h-60 lg:h-72 px-2 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer text-center hover:bg-gray-50 transition"
          >
            {isUploading ? (
              <span className="text-sm text-gray-500">Uploading...</span>
            ) : (
              icon
            )}
            <input
              id={`file-upload-${name}`}
              type="file"
              className="hidden"
              onChange={handleChange}
              accept={accept}
              multiple={multiple}
            />
          </label>
        </div>
      )}
    </div>
  );
}
