"use client";

import React, { useEffect, useState } from "react";
import styles from "@/components/common/header/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Gavel } from "lucide-react";

export default function Header() {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  // ✅ Get token from Redux store with typing
  // const token = useSelector((state: RootState) => state.auth.token)
  //const validToken = checkValidity(token)

  // ✅ Call API conditionally
  //   const { data: currentUser } = useAuthUserInfoQuery(undefined, {
  //     skip: !validToken,
  //   })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setIsHeaderFixed(window.scrollY > 50);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // ✅ Define dashboard URL paths based on user type
  //   const dashboardPaths: Record<UserData['regUserType'], string> = {
  //     admin: '/admin',
  //     lawyer: '/lawyer/dashboard',
  //     client: '/client/dashboard',
  //   }

  //   const userType = currentUser?.data?.regUserType
  //   const dashboardUrl = userType ? dashboardPaths[userType] : ''

  return (
    <header
      className={`${styles.main_header} ${isHeaderFixed ? styles.sticky : ""}`}
    >
      <div className="container-lg">
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className={styles.logo}>
            <Image
              src="/assets/img/logo.webp"
              alt="TLA Logo"
              width={166}
              height={40}
            />
          </Link>

          <nav className="relative">
            <ul className="flex items-center gap-6">
              {/* Navigation items (commented out) */}
            </ul>
          </nav>

          <div className="flex items-center gap-6 ml-auto">
            {/* {validToken ? (
              <div className="flex items-center gap-4 flex-shrink-0">
                <Link href={dashboardUrl} className={styles.btn_register}>
                  <span>Dashboard</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4 flex-shrink-0">
                <Link href="/law-firm/login" className={styles.nav_link}>
                  <span>Log In</span>
                </Link>
                <Link
                  href="/law-firm/register"
                  className={`${styles.btn_register} ${styles.btn_register_mobile}`}
                >
                  <div className="icon w-6 h-6 bg-white flex items-center justify-center rounded-full">
                    <Gavel className="w-4 h-4 text-black" />
                  </div>
                  <span>List Your Law Firm</span>
                </Link>
              </div>
            )} */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <Link href="/login" className={styles.nav_link}>
                <span>Log In</span>
              </Link>
              <Link
                href="/register"
                className={`${styles.btn_register} ${styles.btn_register_mobile}`}
              >
                <div className="icon w-6 h-6 bg-white flex items-center justify-center rounded-full">
                  <Gavel className="w-4 h-4 text-black" />
                </div>
                <span>List Your Law Firm</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
