"use client";

import { lawyers } from "@/data/data";

import Link from "next/link";
import { useParams } from "next/navigation";
import LawyerPhotoGallery from "../_components/LawyerPhotoGallery";
import { Skeleton } from "@/components/ui/skeleton";
import CompanyProfileServices from "../_components/CompanyProfileServices";
import { useGetUserProfileBySlugQuery } from "@/store/tlaFeatures/public/publicApiService";

export default function LawyerDetailsPage() {
  const params = useParams();
  const slug = params?.slug;

  // Call API only if slug === 'maksud-haque'
  const {
    data: lawyerInfo,
    isLoading: isLawyerInfoLoading,
    isError,
    error,
  } = useGetUserProfileBySlugQuery(slug, {
    skip: slug !== "maksud-haque", // prevents API call for others
  });

  // Decide lawyer data
  const lawyer =
    slug === "maksud-haque"
      ? lawyerInfo?.data
      : lawyers.find((l) => l.slug === slug);
  console.log("Lawyer Data:", lawyer);

  const lawyerVideos =
    lawyer?.slug === "maksud-haque"
      ? lawyer?.photosVideos?.videos
      : lawyer?.videos;

  const lawyerExperience =
    lawyer?.slug === "maksud-haque"
      ? lawyerInfo?.data?.experience?.experience
      : lawyer?.experienceHighlight;

  const lawyerCareer =
    lawyer?.slug === "maksud-haque"
      ? lawyerInfo?.data?.experience?.experienceHighlight
      : lawyer?.careerHighlight;

  // if (!lawyer) {
  //   return (
  //     <div className="p-6 text-center">
  //       <h2 className="text-xl font-semibold text-red-500">Lawyer not found</h2>
  //       <Link
  //         href="/dashboard/lawyers"
  //         className="text-blue-500 underline mt-4 inline-block"
  //       >
  //         Back to Lawyers
  //       </Link>
  //     </div>
  //   );
  // }

  function extractYouTubeVideoId(url) {
    const regex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&?/]+)/;
    const match = url?.match(regex);
    return match?.[1] || null;
  }

  if (isLawyerInfoLoading) {
    return (
      <div className="p-6 space-y-8 animate-pulse">
        {/* Header section */}
        <div className="space-y-3">
          <Skeleton className="h-8 w-1/2 bg-gray-200" />
          <Skeleton className="h-4 w-1/3 bg-gray-200" />
        </div>

        {/* Content blocks */}
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="flex gap-4">
            {/* Avatar skeleton */}
            <Skeleton className="h-14 w-14 rounded-full flex-shrink-0 bg-gray-200" />
            {/* Text block */}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4 bg-gray-200" />
              <Skeleton className="h-4 w-2/3 bg-gray-200" />
              <Skeleton className="h-4 w-1/2 bg-gray-200" />
            </div>
          </div>
        ))}

        {/* Table or card-like block */}
        <div className="space-y-4 mt-8">
          <Skeleton className="h-6 w-1/3 bg-gray-200" />
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex gap-4 items-center">
              <Skeleton className="h-4 w-1/6 bg-gray-200" />
              <Skeleton className="h-4 w-1/4 bg-gray-200" />
              <Skeleton className="h-4 w-1/2 bg-gray-200" />
              <Skeleton className="h-4 w-1/5 bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Lawyer Header */}
      <div className="bg-white shadow rounded-2xl p-8 border border-gray-100 flex flex-col items-center text-center">
        {/* Profile Image */}
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-200 mb-4">
          <img
            src={lawyer?.img || lawyer?.profilePicture}
            alt={lawyer?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">{lawyer?.name}</h2>
        <div className="text-lg text-gray-600">{lawyer?.designation}</div>
        <div className="flex flex-col items-start gap-2 mt-4">
          <div className="text-lg text-gray-600">
            <b>Address:</b>
            <span> {lawyer?.address}</span>
          </div>
          <div className="text-gray-700">
            <b>Email:</b> <span>{lawyer?.email}</span>
          </div>
          <div className="text-gray-700 mt-1">
            <b>Phone:</b> <span>{lawyer?.phone}</span>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="mt-6 bg-gray-50 rounded-2xl p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-3 text-[var(--primary-color)]">
          Services Offered
        </h2>
        <div className="space-y-1 text-gray-700">
          {lawyer?.services?.map((service, idx) => (
            <span
              key={idx}
              className="border py-1 px-2 rounded-full inline-block mr-2 mb-2 bg-gray-100 text-xs"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="mt-6 bg-white rounded-2xl p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-3 text-[var(--primary-color)]">
          About
        </h2>
        <div
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: lawyer?.bio }}
        ></div>
      </div>

      {lawyer?.languages?.length > 0 && (
        <div className="mt-6 bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <h4 className="font-semibold mb-4 text-[var(--primary-color)]">
            Languages
          </h4>
          <div className="flex flex-wrap mb-4">
            {Array.isArray(lawyer?.languages) &&
            lawyer?.languages?.length > 0 ? (
              lawyer?.languages?.map((language, index) => (
                <div key={language + index}>
                  <span className="py-2 px-4 mr-2 mb-2 rounded-lg inline-block bg-[#095761] text-white text-sm">
                    {language}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-gray-500 italic">
                No languages available.
              </div>
            )}
          </div>
        </div>
      )}

      <CompanyProfileServices data={lawyer} />

      <LawyerPhotoGallery lawyer={lawyer} />

      {/* Experiences Start */}
      {lawyerExperience && (
        <section className="py-5 profile-experience">
          <div className="flex flex-wrap">
            <div className="w-full">
              <h2 className="text-xl text-[var(--primary-color)] font-bold mb-4 profile-heading relative flex items-baseline gap-3">
                <span>Experiences</span>
              </h2>
              <div
                className="mt-4 prose prose-sm prose-headings:font-semibold prose-ul:list-disc prose-li:marker:text-black w-full text-base max-w-none"
                dangerouslySetInnerHTML={{
                  __html: lawyerExperience || "",
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Career Highlights Start */}
      {lawyerCareer && (
        <section className="py-5 relative profile-experience">
          <div className="flex flex-wrap">
            <div className="w-full">
              <h2 className="text-[var(--primary-color)] text-xl font-bold mb-4 profile-heading relative flex items-baseline gap-3">
                <span>Career Highlights</span>
              </h2>
              <div
                className="mt-4 prose prose-sm prose-headings:font-semibold prose-ul:list-disc prose-li:marker:text-black w-full text-base max-w-none"
                dangerouslySetInnerHTML={{
                  __html: lawyerCareer || "",
                }}
              />
            </div>
          </div>
        </section>
      )}

      {lawyerVideos?.length > 0 && (
        <section className="py-5">
          <div className="flex flex-wrap gap-5">
            <div className="w-full">
              <h2 className="text-[var(--primary-color)] font-bold mb-4 profile-heading relative flex items-baseline gap-3">
                <span>Videos</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {lawyerVideos?.length > 0 ? (
                  lawyerVideos?.map((video, index) => {
                    const videoId = extractYouTubeVideoId(video);
                    return (
                      <div
                        key={`video-${index}`}
                        className="w-full aspect-video rounded-lg overflow-hidden"
                      >
                        {videoId ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={`YouTube video ${index + 1}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          ></iframe>
                        ) : (
                          <div className="bg-gray-100 text-center text-sm text-gray-500 p-4 rounded-lg">
                            Invalid video URL
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full text-gray-500 italic">
                    No video is available.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Back Button */}
      <div className="mt-8 text-center">
        <Link
          href="/dashboard/lawyers"
          className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ← Back to all lawyers
        </Link>
      </div>
    </div>
  );
}
