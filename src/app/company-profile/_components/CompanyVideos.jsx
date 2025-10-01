import React from "react";
import { id } from "zod/v4/locales";

const videos = [
  { id: 1, url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { id: 2, url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ" },
  { id: 3, url: "https://www.youtube.com/watch?v=L_jWHffIx5E" },
];
export default function CompanyVideos() {
  function extractYouTubeVideoId(url) {
    const regex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&?/]+)/;
    const match = url?.match(regex);
    return match?.[1] || null;
  }
  return (
    <section className="pt-[50px] pb-[100px]">
      <div className="container">
        <h2 className="profile-heading text-[36px] font-semibold mb-8 text-[var(--color-black)]">
          Videos
        </h2>
        {/* Example Video Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos?.length > 0 ? (
            videos?.map((video, index) => {
              const videoId = extractYouTubeVideoId(video?.url);
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
    </section>
  );
}
