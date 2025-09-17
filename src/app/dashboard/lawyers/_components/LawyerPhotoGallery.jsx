"use client";

import { useState } from "react";

export default function LawyerPhotoGallery({ lawyer }) {
  // Photos from API response (if present)
  const apiPhotos = lawyer?.photosVideos?.photos || [];

  // Photos from static lawyer object (if present)
  const staticPhotos = lawyer?.photos || [];

  // Merge both
  const photos = lawyer?.slug === "maksud-haque" ? apiPhotos : staticPhotos;

  if (!photos.length) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const goPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % photos.length);

  return (
    <section className="py-5 relative mt-5">
      <div className="flex flex-wrap gap-5">
        <div className="w-full">
          <h2 className="text-[var(--primary-color)] font-bold mb-4 profile-heading relative flex items-baseline gap-3">
            <span>Gallery</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {photos.map((photo, index) => (
              <button
                key={`photo-${index}`}
                onClick={() => openLightbox(index)}
                className="focus:outline-none cursor-pointer"
              >
                <img
                  src={photo || "/assets/img/gallery-placeholder.png"}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-[200px] rounded-lg object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999]">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
          >
            &times;
          </button>
          <button
            onClick={goPrev}
            className="absolute left-4 text-white text-4xl z-50"
          >
            &#10094;
          </button>
          <img
            src={photos[currentIndex]}
            alt={`Preview ${currentIndex + 1}`}
            className="max-w-full max-h-[80vh] rounded-lg z-40"
          />
          <button
            onClick={goNext}
            className="absolute right-4 text-white text-4xl z-50"
          >
            &#10095;
          </button>
        </div>
      )}
    </section>
  );
}
