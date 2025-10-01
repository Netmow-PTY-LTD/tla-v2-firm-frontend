import { lawyers } from "@/data/data";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Star, Trash2 } from "lucide-react";
import Link from "next/link";
export default function CompanyLawyersList() {
  return (
    <section className="py-[50px]">
      <div className="container">
        <h2 className="profile-heading text-[36px] font-semibold mb-8 text-[var(--color-black)]">
          Lawyers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lawyers.slice(0, 6).map((lawyer) => (
            <div
              key={lawyer.id}
              className="bg-[#5B5B5B] shadow rounded-lg overflow-hidden relative w-full border"
            >
              {/* Team Cover */}
              <div className="w-full h-32 relative bg-[#c1c1c1]"></div>

              {/* Card Body */}
              <div className="p-6 mt-[-90px] relative z-10">
                <div className="flex flex-col">
                  {/* Profile Info */}
                  <div className="flex flex-col gap-8 mt-6">
                    <div className="w-full flex flex-col items-center gap-4 text-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden border flex-shrink-0">
                        <img
                          src={lawyer.img}
                          alt={lawyer.name}
                          className="w-full h-full object-cover"
                          onError={(e) =>
                            (e.currentTarget.src =
                              "https://themesbrand.com/velzon/html/master/assets/images/users/avatar-2.jpg")
                          }
                        />
                      </div>
                      <div className="text-white">
                        <Link
                          href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/profile/${lawyer.slug}`}
                          className="hover:underline"
                        >
                          <h5 className="text-base font-semibold">
                            {lawyer.name}
                          </h5>
                        </Link>
                        <p className="text-white text-sm">
                          {lawyer.designation}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {lawyer.services.map((service, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                    {/* Stats */}
                    <div className="w-full flex text-center">
                      <div className="flex-1 border-r">
                        <h5 className="text-lg font-semibold text-white">
                          {lawyer.cases}
                        </h5>
                        <p className="text-sm text-white">Total Cases</p>
                      </div>
                      <div className="flex-1">
                        <h5 className="text-lg font-semibold text-white">
                          {lawyer.hired}
                        </h5>
                        <p className="text-sm text-white">Hired</p>
                      </div>
                    </div>

                    {/* View Button */}
                    <div className="w-full flex justify-center">
                      <Link
                        href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/profile/${lawyer.slug}`}
                        className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
