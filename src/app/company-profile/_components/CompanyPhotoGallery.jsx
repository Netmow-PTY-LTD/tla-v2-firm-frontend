import { useState } from "react";
import { id } from "zod/v4/locales";

const photos = [
  { id: 1, url: "/assets/img/gallery/gallery-1.webp" },
  { id: 2, url: "/assets/img/gallery/gallery-2.webp" },
  { id: 3, url: "/assets/img/gallery/gallery-3.webp" },
  { id: 4, url: "/assets/img/gallery/gallery-4.webp" },
  { id: 5, url: "/assets/img/gallery/gallery-5.webp" },
  { id: 6, url: "/assets/img/gallery/gallery-6.webp" },
  { id: 7, url: "/assets/img/gallery/gallery-7.webp" },
  { id: 8, url: "/assets/img/gallery/gallery-8.webp" },
  { id: 9, url: "/assets/img/gallery/gallery-9.webp" },
  { id: 10, url: "/assets/img/gallery/gallery-10.webp" },
  { id: 11, url: "/assets/img/gallery/gallery-11.webp" },
];

export default function CompanyPhotoGallery() {
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
    <section className="py-[50px] relative">
      <div className="container">
        <div className="flex flex-wrap gap-5">
          <div className="w-full">
            <h2 className="profile-heading text-[36px] font-semibold mb-8 text-[var(--color-black)]">
              Photos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {photos.length > 0 ? (
                photos.map((photo, index) => (
                  <button
                    key={`photo-${index}`}
                    onClick={() => openLightbox(index)}
                    className="focus:outline-none cursor-pointer"
                  >
                    <img
                      src={photo.url}
                      alt={`Gallery Image ${index + 1}`}
                      className="w-full h-[200px] rounded-lg object-cover"
                    />
                  </button>
                ))
              ) : (
                <div className="col-span-full text-gray-500 italic">
                  No photos available.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999]">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-3xl font-bold z-50 cursor-pointer"
          >
            &times;
          </button>
          <button
            onClick={goPrev}
            className="absolute left-4 text-white text-4xl z-50 cursor-pointer"
          >
            &#10094;
          </button>
          <img
            src={photos[currentIndex].url}
            alt={`Preview ${currentIndex + 1}`}
            className="max-w-full max-h-[80vh] rounded-lg z-40"
          />
          <button
            onClick={goNext}
            className="absolute right-4 text-white text-4xl z-50 cursor-pointer"
          >
            &#10095;
          </button>
        </div>
      )}
    </section>
  );
}
