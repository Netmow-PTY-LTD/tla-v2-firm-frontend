"use client";

import { Modal } from "@/components/common/components/Modal";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
import FormWrapper from "@/components/form/FormWrapper";
import TextInput from "@/components/form/TextInput";
import {
  useDeleteFirmMediaMutation,
  useUpdateFirmMediaMutation,
} from "@/store/firmFeatures/firmApiService";
import { CloudUpload, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getEmbedUrl } from "../mediaValidation";

export default function VideoGallery({ firmMediaInfo, refetch }) {
  // const {
  //   control,
  //   watch,
  //   setValue,
  //   setError,
  //   clearErrors,
  //   formState: { errors },
  // } = useFormContext();

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: 'videos',
  // });

  const [videos, setVideos] = useState(null);

  const [open, setOpen] = useState(false);
  const [newLink, setNewLink] = useState("");

  useEffect(() => {
    if (firmMediaInfo?.data?.videos) {
      setVideos(firmMediaInfo?.data?.videos);
    }
  }, [firmMediaInfo?.data?.videos]);

  // useEffect(() => {
  //   const current = watch('videos');
  //   if (!Array.isArray(current)) {
  //     setValue('videos', []);
  //   }
  // }, [setValue, watch]);

  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   setNewLink(value);

  //   // Clear error immediately if the input becomes valid
  //   if (videoUrlRegex.test(value)) {
  //     clearErrors('videos');
  //   }
  // };

  const onSave = () => {
    if (!newLink) return;

    if (!videoUrlRegex.test(newLink)) {
      setError("videos", {
        type: "manual",
        message: "Invalid video URL. Please enter a YouTube, Vimeo, etc. link.",
      });
      return;
    }

    const embed = getEmbedUrl(newLink);
    if (embed) {
      append({ url: newLink });
      setNewLink("");
      setOpen(false);
      clearErrors("videos"); // just in case
    } else {
      setError("videos", {
        type: "manual",
        message: "This video link cannot be embedded.",
      });
    }
  };

  const onCancel = () => {
    setNewLink("");
    clearErrors("videos");
    setOpen(false);
  };
  const [updateVideosData, { isLoading: photosIsLoading }] =
    useUpdateFirmMediaMutation();
  const handlePhotoUpload = async (data) => {
    //console.log('data', data);
    try {
      const { video_url } = data;

      const payload = {
        videos: video_url,
      };

      console.log("payload", payload);

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));

      const res = await updateVideosData(formData).unwrap();
      console.log("res", res);
      if (res?.success === true) {
        showSuccessToast(res?.message || "Update successful");
        refetch();
        setOpen(false);
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
    const payload = { type: "videos", index };
    console.log("payload", payload);
    try {
      const res = await deleteFirmMedia(payload).unwrap();
      console.log("res", res);
      if (res?.success === true) {
        showSuccessToast(res?.message || "Deleted successfully");
        refetch();
      }
    } catch (error) {
      const errorMessage = error?.data?.message || "An error occurred";
      showErrorToast(errorMessage);
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="mt-10">
      <h3 className="text-black font-semibold heading-lg">Videos</h3>
      <p className="text-[#8E8E8E] mt-[10px]">
        Add YouTube videos to highlight your legal expertise — share recordings
        of public seminars, legal webinars, client education sessions, or media
        appearances to build credibility and connect with potential clients.
      </p>

      <div className="grid grid-cols-2 gap-3 mt-11">
        {videos?.map((url, index) => {
          const embed = getEmbedUrl(url);
          if (!embed) return null;

          return (
            <div
              key={index}
              className="relative group w-full aspect-video rounded-xl overflow-hidden shadow-lg"
            >
              <iframe
                width="100%"
                height="100%"
                src={embed}
                title={`Embedded Video ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow group-hover:opacity-100 opacity-0 transition cursor-pointer"
                onClick={() => handleDeleteFirmMedia(index)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          );
        })}

        <div className="w-full aspect-video">
          <label
            className="flex flex-col items-center justify-center w-full h-full px-5 py-4 border border-dashed border-gray-300 rounded-2xl cursor-pointer text-center hover:bg-gray-50 transition"
            onClick={() => setOpen(true)}
          >
            <CloudUpload className="w-6 h-6 text-[#00C3C0] mb-2" />
            <span className="text-sm text-gray-500">Add Video Link</span>
          </label>
        </div>
      </div>

      <Modal open={open} onOpenChange={setOpen} title="Add Video Link">
        <FormWrapper
          onSubmit={handlePhotoUpload}
          // schema={lawyerSettingsMediaFormSchema}
        >
          <TextInput
            label=""
            name="video_url"
            placeholder="https://www.youtube.com/watch?v=example"
          />
          {/* {errors.videos && (
            <p className="text-sm text-red-500 mt-2">{errors.videos.message}</p>
          )} */}
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={onCancel}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              // onClick={onSave}
              type="submit"
              className="bg-[#12C7C4] text-white px-4 py-2 text-sm rounded-md hover:bg-[#10b0ae] cursor-pointer"
            >
              Add Link
            </button>
          </div>
        </FormWrapper>
      </Modal>
    </div>
  );
}
