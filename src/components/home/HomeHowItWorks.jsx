import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export default function HomeHowItWorks() {
  return (
    <motion.section
      id="how-it-works"
      className="bg-white py-8 md:py-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
    >
      <div className="container">
        <div className="max-w-2xl">
          <div className="flex justify-start mb-4">
            <span className="bg-orange-500 section-subtitle px-5 py-2 rounded-full font-poppins">
              How it works
            </span>
          </div>
          <h2 className="section-title mb-10">
            Simple steps to list your firm and connect with clients instantly
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl border hover:shadow-md transition-shadow duration-300">
            <div className="text-sm text-gray-500">Step 1</div>
            <h3 className="text-lg font-semibold mb-2">List Your Firm</h3>
            <p className="text-gray-600 text-sm">
              Provide essential details like your firm’s name, address, contact
              information, registration number, and areas of practice.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl border hover:shadow-md transition-shadow duration-300">
            <div className="text-sm text-gray-500">Step 2</div>
            <h3 className="text-lg font-semibold mb-2">
              Access Your Dashboard
            </h3>
            <p className="text-gray-600 text-sm">
              Manage your listings, update information, and monitor engagement —
              all from your personalized dashboard.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl border hover:shadow-md transition-shadow duration-300">
            <div className="text-sm text-gray-500">Step 3</div>
            <h3 className="text-lg font-semibold mb-2">Find Clients</h3>
            <p className="text-gray-600 text-sm">
              Get discovered by potential clients searching for legal help and
              start building lasting relationships.
            </p>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <Link
            href="/register"
            className="bg-[var(--secondary-color)] text-white font-semibold px-6 py-3 rounded-md hover:bg-teal-600 transition inline-flex"
          >
            Start free listing
          </Link>
          <Link
            href="/login"
            className="px-5 py-3 rounded-xl border hover:bg-gray-50"
          >
            Log In
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
