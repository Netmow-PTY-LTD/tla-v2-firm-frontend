"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-white text-center px-6">
      <section className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full border border-gray-100">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircle className="text-green-600 w-12 h-12" />
          </div>
        </div>

        {/* Text Content */}
        <h3 className="text-3xl font-semibold text-gray-800 leading-[2] mb-2">
          Congratulations! 🎉
        </h3>
        <p className="text-gray-800 mb-5">
          <b>You’ve successfully claimed your account</b>
        </p>
        <p className="text-gray-600 mb-8">
          Our team will review your submission and get in touch with you shortly
          to confirm the next steps.
        </p>

        {/* Continue Button */}
        <Link
          href="/"
          className="w-full bg-[#00C3C0] hover:bg-[#00b0ad] text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex justify-center items-center"
        >
          Go Home
        </Link>
      </section>
    </main>
  );
}
