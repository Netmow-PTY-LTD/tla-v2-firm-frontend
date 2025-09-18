"use client";

import FormWrapper from "@/components/form/FormWrapper";
import TextareaInput from "@/components/form/TextArea";
import TextInput from "@/components/form/TextInput";
import { useState } from "react";
import BillingTaxFormAction from "../billingTax/BillingTaxFormAction";
import SelectInput from "@/components/form/SelectInput";

export default function License() {
  const [logo, setLogo] = useState(null);

  const initialValues = {
    licenseType: "",
    licenseNumber: "",
    issuedBy: "",
    validUntil: "",
    notes: "",
  };

  const onSubmit = (data) => {
    console.log("License form submitted:", data);
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <FormWrapper onSubmit={onSubmit} defaultValues={initialValues}>
        <div className="mb-6 ">
          <h3 className="text-black font-semibold heading-lg mb-2">
            Core Legal Certifications
          </h3>
          <p className="text-gray-600">
            Provide accurate licensing information to verify your firm’s legal
            credentials.
          </p>
        </div>
        <div className="flex justify-end"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            label="License Type"
            name="licenseType"
            placeholder="i.e. Law Firm License etc."
          />

          <TextInput
            label="License Number"
            name="licenseNumber"
            placeholder="i.e. ABC1234567"
          />

          <SelectInput
            label="Issued By"
            name="issuedBy"
            placeholder="Issuing body"
            options={[
              { label: "Bar Council of Australia", value: "bar-council" },
              {
                label: "Legal Services Commission",
                value: "legal-services-commission",
              },
            ]}
            triggerClassName="w-full " // set custom width here
          />

          <TextInput
            label="Valid Until"
            name="validUntil"
            type="date"
            inputClassName="h-[44px] inline-block  focus-visible:ring-inset"
          />

          <TextareaInput
            label="Additional Notes"
            name="notes"
            placeholder="Any extra notes"
            className="col-span-1 md:col-span-2"
          />
        </div>

        <div className="border-t border-white mt-10" />

        {/* Footer Buttons */}
        <BillingTaxFormAction isLoading={false} initialValues={initialValues} />
      </FormWrapper>
    </div>
  );
}
