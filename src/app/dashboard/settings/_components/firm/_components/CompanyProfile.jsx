"use client";

import AvatarUploader from "@/components/common/components/AvaterUploader";
import TextInput from "@/components/form/TextInput";
import { useGetFirmInfoQuery } from "@/store/firmFeatures/firmApiService";

import React from "react";

export default function CompanyProfile() {
  return (
    <div className="py-5 w-full">
      <h3 className="text-black font-semibold heading-lg">Basic Information</h3>
      <p className="text-[#6e6e6e] mt-2">
        Enter your full name (if solo) or your official business name (if a
        firm) to ensure consistency, build credibility, and help clients easily
        recognize your services.
      </p>

      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mt-8">
        <div className="w-full md:w-1/2">
          <AvatarUploader
            name="companyLogo"
            defaultImage={"/assets/img/dummylogo.jpg" || userDummyImage}
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <TextInput
            name="firmName"
            label="Company Name"
            placeholder="Enter Your Company Name"
            textColor="text-[#4b4949]"
          />
          <TextInput
            name="email"
            label="Email Address"
            placeholder="example@example.com"
            textColor="text-[#4b4949]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <TextInput
          name="phone"
          label="Phone Number"
          placeholder="XXXXXXX"
          textColor="text-[#4b4949]"
        />
        <TextInput
          name="website"
          label="Website"
          placeholder="Company Website"
          textColor="text-[#4b4949]"
        />
        <TextInput
          label="Registration Number"
          name="registrationNumber"
          placeholder="Enter registration number"
          textColor="text-[#4b4949]"
        />
        <TextInput
          label="VAT / Tax ID"
          name="vatTaxId"
          placeholder="Enter VAT/Tax ID"
          textColor="text-[#4b4949]"
        />
      </div>
    </div>
  );
}
