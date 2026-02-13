"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Building2, Gavel, SquareMenu, User } from "lucide-react";
import { selectCurrentToken } from "@/store/firmFeatures/firmAuth/firmAuthSlice";
import { checkTokenValidity } from "@/helpers/checkTokenValidity";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";

export default function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  // ✅ Get token from Redux store with typing
  const token = useSelector(selectCurrentToken);
  const validToken = checkTokenValidity(token);

  console.log('validte token', validToken)

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <img
                src="/assets/img/logo-tla.svg"
                alt="TLA Logo"
                className="h-[48px]"
              />
            </Link>
          </div>
          {pathname === "/" && (
            <nav className="hidden md:flex items-center gap-8 text-sm text-gray-700">
              <Link href="#features" className="nav_link hover:text-black">
                Features
              </Link>
              <Link href="#why-list" className="nav_link hover:text-black">
                Why List
              </Link>
              <Link href="#how-it-works" className="nav_link hover:text-black">
                How It Works
              </Link>

              <Link href="#faq" className="nav_link hover:text-black">
                FAQ
              </Link>
            </nav>
          )}
          <div className="flex items-center gap-2">
            {validToken ? (
              <Link
                href="/dashboard"
                className="px-3 py-2 text-sm rounded-xl bg-black text-white hover:bg-black/90 flex items-center gap-2"
              >
                <User className="w-4 h-4" /> Dashboard
              </Link>
            ) : (
              <>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <Link href="/login" className="nav_link hidden md:flex">
                    <span>Log In</span>
                  </Link>
                  <Link
                    href="/register"
                    className="btn_register hidden md:flex"
                  >
                    <div className="icon w-6 h-6 bg-white flex items-center justify-center rounded-full">
                      <Building2 className="w-4 h-4 text-black" />
                    </div>
                    <span>List Your Firm</span>
                  </Link>
                </div>
              </>
            )}

            <button
              onClick={toggleMobileMenu}
              className="md:hidden cursor-pointer"
            >
              <SquareMenu className="text-[#34495e]" />
            </button>
          </div>
        </div>
      </header>
      <MobileNav
        showMobileMenu={showMobileMenu}
        toggleMobileMenu={toggleMobileMenu}
      />
    </>
  );
}
