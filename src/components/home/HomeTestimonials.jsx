"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Quote } from "lucide-react";
import { userDummyImage } from "@/data/data";

const testimonials = [
  {
    id: 1,
    title: "Excellent Service and Support",
    comment:
      "Working with this team was a fantastic experience. They understood our needs perfectly and delivered beyond expectations.",
    client: {
      name: "Sophia Turner",
      designation: "Marketing Manager, BrightWave Solutions",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      companyLogo:
        "https://www.google.com/s2/favicons?domain=brightwave-solutions.com&sz=128",
    },
  },
  {
    id: 2,
    title: "Highly Recommend!",
    comment:
      "Their professionalism and attention to detail made all the difference. We saw immediate improvements in our workflow.",
    client: {
      name: "Liam Anderson",
      designation: "Operations Director, NovaTech",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      companyLogo:
        "https://www.google.com/s2/favicons?domain=novatech.com&sz=128",
    },
  },
  {
    id: 3,
    title: "Amazing Experience",
    comment:
      "They brought our vision to life beautifully. The process was smooth and communication was excellent throughout.",
    client: {
      name: "Olivia Martinez",
      designation: "Creative Head, PixelPoint Agency",
      image: "https://randomuser.me/api/portraits/women/21.jpg",
      companyLogo:
        "https://www.google.com/s2/favicons?domain=pixelpointagency.com&sz=128",
    },
  },
  {
    id: 4,
    title: "Professional and Efficient",
    comment:
      "The team’s expertise and quick turnaround helped us launch our product on time without any hassle.",
    client: {
      name: "Ethan Smith",
      designation: "Product Manager, CloudSync",
      image: "https://randomuser.me/api/portraits/men/65.jpg",
      companyLogo:
        "https://www.google.com/s2/favicons?domain=cloudsync.com&sz=128",
    },
  },
  {
    id: 5,
    title: "Outstanding Quality",
    comment:
      "Their dedication to quality and customer satisfaction is unmatched. We’ll definitely work with them again.",
    client: {
      name: "Ava Johnson",
      designation: "CEO, Horizon Media",
      image: "https://randomuser.me/api/portraits/women/36.jpg",
      companyLogo:
        "https://www.google.com/s2/favicons?domain=horizonmedia.com&sz=128",
    },
  },
];

export default function HomeTestimonials() {
  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-10">
          <span className="bg-orange-500 text-white text-sm font-medium px-4 py-1 rounded-full">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
            What our clients say
          </h2>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="relative"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="flex h-auto">
              <div className="bg-white shadow-md rounded-2xl px-4 pt-6 pb-5 md:pt-8 md:pb-5 relative flex flex-col justify-between h-full border border-gray-100 min-h-[280px]">
                {/* Quote icon */}
                <div className="absolute -top-6 left-4 bg-[#F5F2F8] rounded-full p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                  >
                    <path
                      d="M12.8633 15.3711C12.8633 13.6746 12.8633 12.8263 13.3903 12.2993C13.9174 11.7722 14.7656 11.7722 16.4621 11.7722C18.1586 11.7722 19.0069 11.7722 19.5339 12.2993C20.061 12.8263 20.061 13.6746 20.061 15.3711C20.061 17.0676 20.061 17.9158 19.5339 18.4429C19.0069 18.9699 18.1586 18.9699 16.4621 18.9699C14.7656 18.9699 13.9174 18.9699 13.3903 18.4429C12.8633 17.9158 12.8633 17.0676 12.8633 15.3711Z"
                      fill="#FF8602"
                      stroke="#FF8602"
                      strokeWidth="1.07965"
                    />
                    <path
                      d="M12.8633 15.371V11.6485C12.8633 8.34938 15.1267 5.55141 18.2616 4.57446"
                      stroke="#FF8602"
                      strokeWidth="1.07965"
                      strokeLinecap="round"
                    />
                    <path
                      d="M2.06641 15.3711C2.06641 13.6746 2.06641 12.8263 2.59345 12.2993C3.12048 11.7722 3.96874 11.7722 5.66525 11.7722C7.36177 11.7722 8.21003 11.7722 8.73706 12.2993C9.2641 12.8263 9.2641 13.6746 9.2641 15.3711C9.2641 17.0676 9.2641 17.9158 8.73706 18.4429C8.21003 18.9699 7.36177 18.9699 5.66525 18.9699C3.96874 18.9699 3.12048 18.9699 2.59345 18.4429C2.06641 17.9158 2.06641 17.0676 2.06641 15.3711Z"
                      fill="#FF8602"
                      stroke="#FF8602"
                      strokeWidth="1.07965"
                    />
                    <path
                      d="M2.06641 15.371V11.6485C2.06641 8.34938 4.32982 5.55141 7.46468 4.57446"
                      stroke="#FF8602"
                      strokeWidth="1.07965"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Content */}
                <div className="mt-6">
                  <h5 className="text-lg font-semibold text-[#0A0C10] mb-3">
                    {item.title}
                  </h5>
                  <p className="text-[#0A0C10] text-sm leading-relaxed">
                    {item.comment}
                  </p>
                </div>

                {/* Divider */}
                <hr className="my-5 border-gray-200" />

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.client.image || userDummyImage}
                      alt=""
                      className="w-8 h-8 object-cover border border-[#d9d9d9] rounded-full"
                    />
                    <div>
                      <h5 className="font-medium text-[#0A0C10]">
                        {item.client.name}
                      </h5>
                      <p className="text-[12px] text-[#545454]">
                        {item.client.designation}
                      </p>
                    </div>
                  </div>
                  <img
                    src={item.client.companyLogo || ""}
                    alt="Company Logo"
                    className="h-6 object-contain"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Navigation Buttons */}
          <div className="flex justify-between mt-10 relative z-10 w-[200px]">
            <div className="flex justify-center items-center gap-3">
              <button className="swiper-button-prev-custom flex items-center justify-center w-10 h-10 bg-[var(--primary-color)] text-white rounded-full hover:bg-[var(--secondary-color)] transition-all duration-300 ease-in-out cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="12"
                  viewBox="0 0 19 12"
                  fill="none"
                >
                  <path
                    d="M1.59766 5.75659H17.5977M1.59766 5.75659C1.59766 7.15699 5.58626 9.77359 6.59766 10.7566M1.59766 5.75659C1.59766 4.35619 5.58626 1.73965 6.59766 0.756592"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button className="swiper-button-next-custom flex items-center justify-center w-10 h-10 bg-[var(--primary-color)] text-white rounded-full hover:bg-[var(--secondary-color)] transition-all duration-300 ease-in-out cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="12"
                  viewBox="0 0 19 12"
                  fill="none"
                >
                  <path
                    d="M17.5976 5.75659H1.59766M17.5976 5.75659C17.5976 7.15699 13.6091 9.77359 12.5977 10.7566M17.5976 5.75659C17.5976 4.35619 13.6091 1.73965 12.5977 0.756592"
                    stroke="#E2E2E2"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Swiper>

        <style>{`
      .swiper {
        padding-top: 50px; /* space for pagination */
        }
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background-color: #e2e2e2; 
          border-radius: 50%;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background-color: #14b8a6; /* teal-500 */
          transform: scale(1.2);
        }
      `}</style>
      </div>
    </section>
  );
}
