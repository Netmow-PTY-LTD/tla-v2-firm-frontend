"use client";

import React from "react";

import ZipCodeComboboxMap from "./ZipCodeComboboxMap";

export default function CompanyLocation({ companyInfo }) {
  console.log("companyInfo in company location", companyInfo);
  const country = companyInfo?.contactInfo?.country;

  return (
    <div className="">
      <h3 className="text-black font-semibold heading-lg">Location</h3>
      <p className="mt-[10px] text-[#8E8E8E] mb-7">
        Add a clear business address to boost visibility in local searches. This
        builds trust and helps clients nearby find and connect with your legal
        services more easily.
      </p>

      <ZipCodeComboboxMap
        name={"zipCode"}
        countryId={country?._id}
        address={companyInfo?.contactInfo?.zipCode?.zipcode}
      />
    </div>
  );
}
