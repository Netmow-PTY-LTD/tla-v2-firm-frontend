'use client';

import AvatarUploader from '@/components/common/components/AvaterUploader';
import TextInput from '@/components/form/TextInput';

import React from 'react';

export default function CompanyProfile() {
  return (
    <div className="py-5 w-full">
      <h3 className="text-black font-semibold heading-lg">
        Company Information
      </h3>
      <p className="text-[#6e6e6e] mt-2">
        This is the first detail clients will see when searching for legal
        services on TheLawApp. If you're a sole practitioner, simply use your
        full name. If you're part of a firm, enter your official business name
        to ensure consistency and credibility across your profile.
      </p>

      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mt-8">
        <div className="w-full md:w-1/2">
          <AvatarUploader name="companyLogo" />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <TextInput
            name="companyName"
            label="Name"
            placeholder="Enter Your Company Name"
            textColor="text-[#4b4949]"
          />
          <TextInput
            name="contactEmail"
            label="Email Address"
            placeholder="example@example.com"
            textColor="text-[#4b4949]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <TextInput
          name="phoneNumber"
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
