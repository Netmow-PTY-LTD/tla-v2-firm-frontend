import Link from "next/link";
import React from "react";

export default function HomeLawFirmsList() {
  return (
    <section className="w-full bg-white py-16 px-4 text-center">
      <div className="flex justify-center mb-4">
        <span className="bg-orange-500 section-subtitle px-5 py-2 rounded-full">
          Law Firms List
        </span>
      </div>

      <h2 className="section-title mb-12">Top Law Firms</h2>

      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        <div className="p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 shadow-inner">
              <img
                src="/assets/img/firm-logo.png"
                alt="Law Firm Logo"
                className="w-8 h-8"
              />
            </div>
            <h3 className="ml-4 text-[28px] font-semibold text-gray-800">
              Archer &amp; Co.
            </h3>
          </div>

          <div className="w-10 h-[3px] bg-[#0dd3c2] rounded mb-4"></div>

          <p className="text-[#444] text-sm leading-relaxed mb-6 text-left">
            Lorem ipsum dolor sit amet consectetur. Dolor aliquam non
            pellentesque scelerisque tempor tellus lectus scelerisque. Vitae
            mattis risus fringilla bibendum id blandit ipsum.
          </p>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-[#0dd3c2] text-white text-sm px-3 py-1.5 rounded-md hover:bg-[#0bc2b2] transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4 -rotate-45"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
              Verified
            </button>
            <Link
              href="#"
              className="text-gray-800 font-medium text-sm hover:text-[#0dd3c2] transition"
            >
              View Profile
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 shadow-inner">
              <img
                src="/assets/img/firm-logo.png"
                alt="Law Firm Logo"
                className="w-8 h-8"
              />
            </div>
            <h3 className="ml-4 text-lg font-semibold text-gray-800">
              Archer &amp; Co.
            </h3>
          </div>

          <div className="w-10 h-[3px] bg-[#0dd3c2] rounded mb-4"></div>

          <p className="text-[#444] text-sm leading-relaxed mb-6 text-left">
            Lorem ipsum dolor sit amet consectetur. Dolor aliquam non
            pellentesque scelerisque tempor tellus lectus scelerisque. Vitae
            mattis risus fringilla bibendum id blandit ipsum.
          </p>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-[#0dd3c2] text-white text-sm px-3 py-1.5 rounded-md hover:bg-[#0bc2b2] transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4 -rotate-45"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
              Verified
            </button>
            <Link
              href="#"
              className="text-gray-800 font-medium text-sm hover:text-[#0dd3c2] transition"
            >
              View Profile
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 shadow-inner">
              <img
                src="/assets/img/firm-logo.png"
                alt="Law Firm Logo"
                className="w-8 h-8"
              />
            </div>
            <h3 className="ml-4 text-lg font-semibold text-gray-800">
              Archer &amp; Co.
            </h3>
          </div>

          <div className="w-10 h-[3px] bg-[#0dd3c2] rounded mb-4"></div>

          <p className="text-[#444] text-sm leading-relaxed mb-6 text-left">
            Lorem ipsum dolor sit amet consectetur. Dolor aliquam non
            pellentesque scelerisque tempor tellus lectus scelerisque. Vitae
            mattis risus fringilla bibendum id blandit ipsum.
          </p>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-[#0dd3c2] text-white text-sm px-3 py-1.5 rounded-md hover:bg-[#0bc2b2] transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4 -rotate-45"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
              Verified
            </button>
            <Link
              href="#"
              className="text-gray-800 font-medium text-sm hover:text-[#0dd3c2] transition"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
