import Link from "next/link";
import React from "react";

export default function HeroHome() {
  return (
    <section className="bg-[url('/assets/img/hero-bg.png')] bg-cover bg-no-repeat bg-center">
      <div className="container">
        <div className="text-center px-6 h-[calc(60vh-80px)] flex flex-col items-center justify-center gap-2">
          <h1 className="text-4xl md:text-[48px] font-semibold text-[var(--color-black)] mb-4 font-poppins">
            List Your Law Firm or Business.
          </h1>
          <h2 className="text-4xl md:text-[48px] font-semibold text-[var(--color-black)] mb-4 font-poppins">
            Get More Clients, Faster.
          </h2>
          <p className="text-[#444] text-[20px] mb-8 font-poppins">
            Reach clients actively searching for legal services
            <br className="hidden sm:block" />
            or businesses like yours.
          </p>
          <Link
            href="/register"
            className="bg-[var(--secondary-color)] text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-teal-600 transition"
          >
            Create free listing
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex gap-10 md:gap-16 items-center text-center">
            <div>
              <p className="text-[27px] font-bold text-[var(--color-black)]">
                33k+
              </p>
              <p className="text-[#595959] text-sm mt-1">Total Law Firm</p>
            </div>

            <div className="h-10 border-l border-[#262626] hidden md:block"></div>

            <div>
              <p className="text-[27px] font-bold text-[var(--color-black)]">
                12k+
              </p>
              <p className="text-[#595959] text-sm mt-1">Happy Clients</p>
            </div>

            <div className="h-10 border-l border-[#262626] hidden md:block"></div>

            <div>
              <p className="text-[27px] font-bold text-[var(--color-black)]">
                20k+
              </p>
              <p className="text-[#595959] text-sm mt-1">Trusted Lawyer</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-green-700 font-semibold text-sm">5.0</p>
              <div className="flex items-center justify-center text-yellow-400 text-sm">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>

            <div className="flex -space-x-3">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="User 1"
                className="w-10 h-10 rounded-full border-2 border-teal-500 object-cover"
              />
              <img
                src="https://randomuser.me/api/portraits/women/2.jpg"
                alt="User 2"
                className="w-10 h-10 rounded-full border-2 border-teal-500 object-cover"
              />
              <img
                src="https://randomuser.me/api/portraits/men/3.jpg"
                alt="User 3"
                className="w-10 h-10 rounded-full border-2 border-teal-500 object-cover"
              />
              <img
                src="https://randomuser.me/api/portraits/women/4.jpg"
                alt="User 4"
                className="w-10 h-10 rounded-full border-2 border-teal-500 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
