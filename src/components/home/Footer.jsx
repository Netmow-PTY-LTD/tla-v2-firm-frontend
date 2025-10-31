import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="w-full bg-white py-10 flex flex-col items-center space-y-6 text-sm text-[#1c2c3b]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
        <Link
          href="#how-it-works"
          className="hover:text-orange-500 transition text-sm text-[#34495E]"
        >
          How IT Works
        </Link>
        <Link
          href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/register`}
          className="hover:text-orange-500 transition text-sm text-[#34495E]"
          target="_blank"
        >
          Join as a Lawyer
        </Link>
        <Link
          href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/pricing`}
          className="hover:text-orange-500 transition text-sm text-[#34495E]"
          target="_blank"
        >
          Pricing
        </Link>
        {/* <Link
          href="#"
          className="hover:text-orange-500 transition text-sm text-[#34495E]"
        >
          Help centre
        </Link>
        <Link
          href="#"
          className="hover:text-orange-500 transition text-sm text-[#34495E]"
        >
          Mobile App
        </Link> */}
        <Link
          href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/contact`}
          className="hover:text-orange-500 transition text-sm text-[#34495E]"
          target="_blank"
        >
          Contact
        </Link>
      </div>

      <div className="flex items-center space-x-6 text-2xl text-[#0b1829]">
        <Link
          href="#"
          aria-label="Twitter"
          className="hover:text-orange-500 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
          >
            <path
              d="M15.2313 11.3418L24.5373 0.756836H22.332L14.2502 9.9485L7.79905 0.756836H0.353516L10.1143 14.6568L0.353516 25.7568H2.56053L11.0937 16.0502L17.9096 25.7568H25.3535L15.2279 11.3402L15.2313 11.3418ZM12.2097 14.7785L11.2203 13.3952L3.35338 2.38017H6.73969L13.0892 11.2685L14.0786 12.6518L22.332 24.2052H18.9457L12.2097 14.7785Z"
              fill="#0B1C2D"
            />
          </svg>
        </Link>

        <Link
          href="#"
          aria-label="Facebook"
          className="hover:text-orange-500 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="26"
            viewBox="0 0 15 26"
            fill="none"
          >
            <path
              d="M3.95366 14.8679H0.736713C0.217635 14.8679 0.0546875 14.6813 0.0546875 14.2112V10.426C0.0546875 9.92602 0.249552 9.76767 0.736713 9.76767H3.95366V7.0142C3.95366 5.76413 4.18044 4.57407 4.83055 3.47901C5.51257 2.35229 6.48689 1.60058 7.71991 1.16223C8.52465 0.885735 9.37134 0.748728 10.2229 0.757207H13.4046C13.8581 0.757207 14.0547 0.943883 14.0547 1.38224V4.94909C14.0547 5.38745 13.8598 5.57579 13.4046 5.57579C12.5277 5.57579 11.6508 5.57579 10.7739 5.60579C9.89702 5.60579 9.44178 6.01248 9.44178 6.88919C9.40818 7.82757 9.44178 8.73595 9.44178 9.70601H13.2097C13.7305 9.70601 13.9237 9.89268 13.9237 10.3944V14.1796C13.9237 14.6796 13.7624 14.8379 13.2097 14.8379H9.44178V25.0385C9.44178 25.5702 9.28051 25.7568 8.69592 25.7568H4.63568C4.14852 25.7568 3.95366 25.5702 3.95366 25.1001V14.8679Z"
              fill="#0B1C2D"
            />
          </svg>
        </Link>

        <Link
          href="#"
          aria-label="LinkedIn"
          className="hover:text-orange-500 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
          >
            <path
              d="M6.54869 8.81919H1.55053C1.49778 8.81897 1.4455 8.82917 1.3967 8.84921C1.3479 8.86925 1.30354 8.89872 1.26616 8.93595C1.22878 8.97317 1.19912 9.01741 1.17888 9.06613C1.15865 9.11485 1.14823 9.16708 1.14823 9.21983V25.2722C1.14823 25.4924 1.32869 25.6729 1.55053 25.6729H6.54703C6.65329 25.6729 6.7552 25.6306 6.83033 25.5555C6.90547 25.4804 6.94768 25.3785 6.94768 25.2722V9.21983C6.94768 9.11415 6.90593 9.01274 6.83151 8.9377C6.75708 8.86266 6.65437 8.82006 6.54869 8.81919ZM4.05375 0.839355C3.1798 0.839793 2.34173 1.18693 1.72344 1.8046C1.10516 2.42226 0.757175 3.25999 0.755859 4.13393C0.755859 5.95009 2.23428 7.42851 4.05375 7.42851C5.86991 7.42851 7.34833 5.95009 7.34833 4.13393C7.34833 2.31778 5.86991 0.839355 4.05375 0.839355ZM19.2585 8.42185C17.2519 8.42185 15.7685 9.28275 14.8679 10.2645V9.22149C14.8679 9.11523 14.8257 9.01333 14.7506 8.93819C14.6754 8.86305 14.5735 8.82084 14.4673 8.82084H9.68268C9.62992 8.82062 9.57765 8.83083 9.52885 8.85086C9.48005 8.8709 9.43569 8.90038 9.39831 8.9376C9.36093 8.97483 9.33127 9.01907 9.31103 9.06779C9.29079 9.1165 9.28037 9.16874 9.28037 9.22149V25.2722C9.28037 25.4941 9.45917 25.6745 9.68102 25.6745H14.6676C14.7203 25.6745 14.7726 25.6641 14.8213 25.6439C14.87 25.6236 14.9142 25.594 14.9515 25.5566C14.9887 25.5192 15.0182 25.4748 15.0382 25.426C15.0583 25.3772 15.0685 25.325 15.0682 25.2722V17.3305C15.0682 14.6551 15.7967 13.6121 17.6609 13.6121C19.6922 13.6121 19.8545 15.2842 19.8545 17.4695V25.2722C19.8545 25.4941 20.0333 25.6745 20.2551 25.6745H25.2433C25.2961 25.6745 25.3483 25.6641 25.3971 25.6439C25.4458 25.6236 25.49 25.594 25.5272 25.5566C25.5645 25.5192 25.5939 25.4748 25.614 25.426C25.634 25.3772 25.6442 25.325 25.644 25.2722V16.4679C25.644 12.4896 24.8857 8.42185 19.2585 8.42185Z"
              fill="#0B1C2D"
            />
          </svg>
        </Link>
      </div>

      <p className="text-[var(--color-text)] text-sm">
        Copyright © {new Date().getFullYear()} | All rights reserved by{" "}
        <Link href="/" className="text-orange-500 font-medium">
          TheLawApp
        </Link>
      </p>
    </motion.footer>
  );
}
