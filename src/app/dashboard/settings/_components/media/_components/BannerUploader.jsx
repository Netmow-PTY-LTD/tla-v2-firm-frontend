"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { CloudUpload, X } from "lucide-react";
import { DEFAULT_IMAGES } from "@/data/data";
import resizeAndConvertToWebP from "@/components/common/components/resizeAndConvertToWebP";

export default function BannerUploader({
  name = "banner",
  accept = "image/*",
  multiple = false,
  icon = <CloudUpload className="w-6 h-6 text-[#00C3C0] mb-2" />,
  defaultImage = DEFAULT_IMAGES.BANNER,
}) {
  const { register, setValue, watch, getValues } = useFormContext();
  const file = watch(name);
  const [preview, setPreview] = useState(null);

  // Handle preview generation
  useEffect(() => {
    if (file instanceof File) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }

    if (typeof file === "string") {
      setPreview(file); // from backend or default
    }
  }, [file]);

  // Handle file input
  const handleChange = async (e) => {
    const uploaded = e.target.files?.[0];
    const webpFile = await resizeAndConvertToWebP(uploaded, 1200, 0.8); // Banner: wider size
    if (webpFile) {
      setValue(name, webpFile, { shouldValidate: true });
    }
  };

  // Handle remove image
  const handleRemove = () => {
    setValue(name, "", { shouldValidate: true });
    setPreview("");
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
          {preview && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-[-8px] right-[-8px] bg-white border border-gray-300 text-gray-600 rounded-full p-1 shadow hover:text-red-500 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
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
        </div>
      )}
    </div>
  );
}
