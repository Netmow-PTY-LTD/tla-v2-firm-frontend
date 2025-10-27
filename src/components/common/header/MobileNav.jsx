"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import { X, User, Building2 } from "lucide-react";
import { selectCurrentToken } from "@/store/firmFeatures/firmAuth/firmAuthSlice";
import Image from "next/image";

export default function MobileNav({ showMobileMenu, toggleMobileMenu }) {
  const token = useSelector(selectCurrentToken);

  return (
    <div
      className={`fixed inset-0 bg-white z-50 transform transition-all duration-500 ease-in-out
        ${
          showMobileMenu
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }
      `}
    >
      {/* Header with Close Button */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <Link href="/">
          <Image
            src="/assets/img/company-logo.png"
            alt="TLA Logo"
            width={166}
            height={40}
            className="w-[100px] md:w-[166px]"
          />
        </Link>
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition"
          onClick={toggleMobileMenu}
          aria-label="Close menu"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav
        className="flex flex-col items-center text-gray-700 text-base font-medium gap-4 py-8 px-6"
        onClick={(e) => {
          if (e.target.closest("a")) toggleMobileMenu();
        }}
      >
        <Link
          href="#why-list"
          className="hover:text-black transition-colors duration-200"
        >
          Why List
        </Link>
        <Link
          href="#how-it-works"
          className="hover:text-black transition-colors duration-200"
        >
          How It Works
        </Link>
        <Link
          href="#features"
          className="hover:text-black transition-colors duration-200"
        >
          Features
        </Link>
        <Link
          href="#faq"
          className="hover:text-black transition-colors duration-200"
        >
          FAQ
        </Link>
      </nav>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4 mx-6" />

      {/* Bottom Section */}
      <div className="flex flex-col items-center gap-4 px-6 pb-8">
        {token ? (
          <Link
            href="/dashboard"
            onClick={toggleMobileMenu}
            className="w-full flex justify-center items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl bg-black text-white hover:bg-black/90 transition"
          >
            <User className="w-4 h-4" /> Dashboard
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              onClick={toggleMobileMenu}
              className="w-full text-center text-gray-700 hover:text-black transition"
            >
              Log In
            </Link>
            <Link
              href="/register"
              onClick={toggleMobileMenu}
              className="inline-flex justify-center items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl bg-gray-900 text-white hover:bg-black transition"
            >
              <Building2 className="w-4 h-4 text-white" />
              List Your Firm
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
