"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-[url('/assets/img/hero-bg.png')] bg-cover bg-no-repeat bg-center pt-8 pb-5 md:py-12">
      <div className="container">
        <div className="text-center px-6 h-[calc(60vh-80px)] flex flex-col items-center justify-center gap-4">
          {/* First Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-[32px] md:text-[48px] font-semibold text-[var(--color-black)] font-poppins"
          >
            List Your Law Firm or Business.
          </motion.h1>

          {/* Second Heading (slightly delayed) */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="text-[32px] md:text-[48px] font-semibold text-[var(--color-black)] font-poppins"
          >
            Get More Clients, Faster.
          </motion.h2>

          {/* Paragraph (optional smooth fade-in) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
            className="text-[#444] text-base md:text-[20px] mb-4 md:mb-8 font-poppins"
          >
            Reach clients actively searching for legal services
            <br className="hidden sm:block" />
            or businesses like yours.
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.9, ease: "easeOut" }}
          >
            <Link
              href="/register"
              className="bg-[var(--secondary-color)] text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-teal-600 transition"
            >
              Get Started - It's Free
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats Section (unchanged) */}
      <motion.div
        className="max-w-7xl mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 1.2, ease: "easeOut" }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex gap-10 md:gap-16 items-center text-center">
            <div>
              <p className="text-[27px] font-bold text-[var(--color-black)]">
                8
              </p>
              <p className="text-[#595959] text-sm mt-1">Total Law Firm</p>
            </div>
            <div className="h-10 border-l border-[#262626] hidden md:block"></div>
            <div>
              <p className="text-[27px] font-bold text-[var(--color-black)]">
                7k+
              </p>
              <p className="text-[#595959] text-sm mt-1">Happy Clients</p>
            </div>
            <div className="h-10 border-l border-[#262626] hidden md:block"></div>
            <div>
              <p className="text-[27px] font-bold text-[var(--color-black)]">
                74
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
              {["men/1", "women/2", "men/3", "women/4"].map((img, i) => (
                <img
                  key={i}
                  src={`https://randomuser.me/api/portraits/${img}.jpg`}
                  alt={`User ${i + 1}`}
                  className="w-10 h-10 rounded-full border-2 border-teal-500 object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
