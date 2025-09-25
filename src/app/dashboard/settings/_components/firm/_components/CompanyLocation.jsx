"use client";


import React from "react";

import ZipCodeComboboxMap from "./ZipCodeComboboxMap";

export default function CompanyLocation({ companyInfo}) {

  const country= companyInfo?.contactInfo?.country



  return (
    <div className="">
      <h3 className="text-black font-semibold heading-lg">Company location</h3>
      <p className="mt-[10px] text-[#8E8E8E] mb-7">
        Provide a specific business address to improve visibility for clients
        searching for legal services in your area. A clear and accurate location
        helps build trust and connects you with local clients more effectively.
      </p>

      <ZipCodeComboboxMap  name={'zipCode'}  countryId={country?._id} />

    </div>
  );
}
