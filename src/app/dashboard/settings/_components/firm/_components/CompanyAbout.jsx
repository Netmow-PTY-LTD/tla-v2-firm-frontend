"use client";
import SelectInput from "@/components/form/SelectInput";
import TextareaInput from "@/components/form/TextArea";
import TextInput from "@/components/form/TextInput";

import React from "react";

export default function CompanyAbout({ companyInfo }) {
  const options = [
    {
      label: "Self-employed / sole trader",
      value: "self_employed",
    },
    {
      label: "2–10 employees",
      value: "2_10_employees",
    },
    {
      label: "11–50 employees",
      value: "11_50_employees",
    },
    {
      label: "51–200 employees",
      value: "51_200_employees",
    },
    {
      label: "Over 200 employees",
      value: "over_200_employees",
    },
  ];

  return (
    <div className="py-9">
      <h3 className="text-black font-semibold heading-lg">About</h3>
      <p className="mt-[10px] text-[#6e6e6e] mb-7">
        We are a dedicated law firm with years of experience, offering expert
        legal services across various areas. Our mission is to deliver trusted,
        client-focused solutions with integrity.
      </p>

      <div className="space-y-7">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-7">
          <SelectInput
            label={"Choose Company Size"}
            name={"companySize"}
            options={options}
            placeholder="Select company size"
            defaultValue="Self-employed / Sole Trader"
            textColor="text-[#4b4949]"
            triggerClassName="h-[44px] w-full"
          />

          <TextInput
            label="Years in business"
            name="yearsInBusiness"
            placeholder="Number of years"
            textColor="text-[#4b4949]"
          />
        </div>
        <TextareaInput
          label="Describe your company "
          name="description"
          placeholder="What sets you apart from businesses?"
          textColor="text-[#4b4949]"
          rows={6}
        />
      </div>
    </div>
  );
}
