import Link from "next/link";
import React from "react";

export default function HomeCTA() {
  return (
    <section className="py-8 md:py-16">
      <div className="container text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          Ready to list your firm?
        </h2>
        <p className="text-gray-600 mt-2">
          Join top lawyers and companies growing with LawList.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/register"
            className="bg-[var(--secondary-color)] text-white font-semibold px-6 py-3 rounded-md hover:bg-teal-600 transition inline-flex"
          >
            Create free listing
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 rounded-xl border hover:bg-gray-50"
          >
            I already have an account
          </Link>
        </div>
      </div>
    </section>
  );
}
