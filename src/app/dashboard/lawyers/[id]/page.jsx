"use client";

import { lawyers } from "@/data/data";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function LawyerDetailsPage() {
  const { id } = useParams();
  const lawyer = lawyers.find((l) => l.id.toString() === id);

  if (!lawyer) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-red-500">Lawyer not found</h2>
        <Link
          href="/dashboard/lawyers"
          className="text-blue-500 underline mt-4 inline-block"
        >
          Back to Lawyers
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Lawyer Header */}
      <div className="bg-white shadow rounded-2xl p-8 border border-gray-100 flex flex-col items-center text-center">
        {/* Profile Image */}
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-200 mb-4">
          <img
            src={lawyer.img}
            alt={lawyer.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{lawyer.name}</h1>
        <p className="text-lg text-gray-600">{lawyer.designation}</p>
      </div>

      {/* Services */}
      <div className="mt-6 bg-gray-50 rounded-2xl p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          Services Offered
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          {lawyer.services.map((service, idx) => (
            <li key={idx}>{service}</li>
          ))}
        </ul>
      </div>

      {/* Contact Info */}
      <div className="mt-6 bg-white rounded-2xl p-6 border border-gray-100 shadow">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          Contact Information
        </h2>
        <p className="text-gray-700">
          <span className="font-medium">Email:</span>{" "}
          <a
            href={`mailto:${lawyer.email}`}
            className="text-blue-600 hover:underline"
          >
            {lawyer.email}
          </a>
        </p>
        <p className="text-gray-700 mt-1">
          <span className="font-medium">Phone:</span>{" "}
          <a
            href={`tel:${lawyer.phone}`}
            className="text-blue-600 hover:underline"
          >
            {lawyer.phone}
          </a>
        </p>
      </div>

      {/* About */}
      <div className="mt-6 bg-gray-50 rounded-2xl p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">About</h2>
        <p className="text-gray-700 leading-relaxed">{lawyer.bio}</p>
      </div>

      {/* Back Button */}
      <div className="mt-8 text-center">
        <Link
          href="/lawyers"
          className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ← Back to all lawyers
        </Link>
      </div>
    </div>
  );
}
