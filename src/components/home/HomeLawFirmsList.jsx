import Link from "next/link";
import React from "react";

// dummy data (no human images for logos)
const lawFirms = [
  {
    id: 1,
    name: "Archer & Co.",
    description:
      "Full-service corporate and commercial law firm specializing in mergers & acquisitions, corporate governance, and regulatory compliance for technology companies.",
    logo: "https://placehold.co/100x50/0dd3c2/ffffff?text=Archer+%26+Co",
    verified: true,
    profileUrl: "#",
  },
  {
    id: 2,
    name: "Hamilton Legal Group",
    description:
      "Experienced litigation team focused on commercial disputes, intellectual property enforcement and complex contract disputes for mid-market clients.",
    logo: "https://placehold.co/100x50/0dd3c2/ffffff?text=Hamilton+Legal",
    verified: true,
    profileUrl: "#",
  },
  {
    id: 3,
    name: "Stonebridge Attorneys",
    description:
      "Specialists in real estate, land use and financing — advising developers, REITs and lenders on acquisitions, leases and project finance.",
    logo: "https://placehold.co/100x50/0dd3c2/ffffff?text=Stonebridge",
    verified: true,
    profileUrl: "#",
  },
  {
    id: 4,
    name: "Everett Law Partners",
    description:
      "Employment and labor practice representing employers in workforce disputes, executive contracts and workplace compliance matters.",
    logo: "https://placehold.co/100x50/0dd3c2/ffffff?text=Everett+Partners",
    verified: true,
    profileUrl: "#",
  },
  {
    id: 5,
    name: "Knight & Harper Associates",
    description:
      "Boutique family law and dispute resolution attorneys offering tailored counsel for high-net-worth family matters and mediation services.",
    logo: "https://placehold.co/100x50/0dd3c2/ffffff?text=Knight+%26+Harper",
    verified: true,
    profileUrl: "#",
  },
  {
    id: 6,
    name: "Summit Legal Advisors",
    description:
      "Advising startups and growth-stage businesses on venture financings, commercial contracting and IP strategy with an emphasis on scalable solutions.",
    logo: "https://placehold.co/100x50/0dd3c2/ffffff?text=Summit+Advisors",
    verified: true,
    profileUrl: "#",
  },
];

export default function HomeLawFirmsList() {
  return (
    <section className="w-full bg-white py-16 px-4 text-center">
      <div className="container">
        <div className="flex justify-center mb-4">
          <span className="bg-orange-500 section-subtitle px-5 py-2 rounded-full font-poppins">
            Law Firms List
          </span>
        </div>

        <h2 className="section-title mb-12 font-poppins">Top Law Firms</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {lawFirms.map((firm) => (
            <div
              key={firm.id}
              className="p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              {/* Header */}
              <div>
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 shadow-inner">
                    <img
                      src={firm.logo}
                      alt={`${firm.name} Logo`}
                      className="w-8 h-8 object-cover rounded-full"
                    />
                  </div>
                  <h4 className="ml-4 text-[20px] font-semibold text-gray-800 font-poppins text-left">
                    {firm.name}
                  </h4>
                </div>

                <div className="w-10 h-[3px] bg-[#0dd3c2] rounded mb-4"></div>

                <p className="text-[#444] text-sm leading-relaxed mb-6 text-left">
                  {firm.description}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-3 mt-auto">
                {firm.verified && (
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
                )}
                <Link
                  href={firm.profileUrl}
                  className="text-gray-800 font-medium text-sm hover:text-[#0dd3c2] transition"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
