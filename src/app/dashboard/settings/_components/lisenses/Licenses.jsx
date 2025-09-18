"use client";

import FormWrapper from "@/components/form/FormWrapper";
import TextareaInput from "@/components/form/TextArea";
import TextInput from "@/components/form/TextInput";
import { useState } from "react";
import BillingTaxFormAction from "../billingTax/BillingTaxFormAction";
import SelectInput from "@/components/form/SelectInput";
import AddCoreLicenseModal from "../modal/AddCoreLicenseModal";
import { Edit, Trash, Trash2 } from "lucide-react";
import AddOptionalLicenseModal from "../modal/AddOptionalLicenses";

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
        <div className="mb-4">
          <h3 className="text-black font-semibold heading-lg mb-2">
            Core Legal Certifications
          </h3>
          <p className="text-gray-600">
            Provide accurate licensing information to verify your firm’s legal
            credentials.
          </p>
        </div>
        <div className="flex justify-end">
          <AddCoreLicenseModal />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-lg transition-all">
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col">
              <h4 className="heading-lg font-semibold text-gray-800 mb-2">
                Bar Certification / License
              </h4>
              <div className="space-y-1">
                <p className="text-sm text-[#6e6e6e]">
                  <b>License Number</b>: ABC1234567 | <b> Valid Until: </b> 31
                  Dec 2025
                </p>
                <p className="text-sm text-[#6e6e6e]">
                  <b> Note: </b> This is a sample note for the license.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
                // onClick={() => handleEditClick(partner)}
              >
                <Edit size={18} />
              </button>
              <button
                className="text-red-500 hover:text-red-700 cursor-pointer"
                // onClick={() => handleDeleteClick(partner?._id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white mt-8" />

        <div className="mb-4">
          <h3 className="text-black font-semibold heading-lg mb-2">
            Optional Legal Certifications
          </h3>
          <p className="text-gray-600">
            Provide accurate licensing information to verify your firm’s legal
            credentials.
          </p>
        </div>
        <div className="flex justify-end">
          <AddOptionalLicenseModal />
        </div>
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-lg transition-all">
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col">
              <h4 className="heading-lg font-semibold text-gray-800 mb-2">
                Bar Certification / License
              </h4>
              <div className="space-y-1">
                <p className="text-sm text-[#6e6e6e]">
                  <b>License Number</b>: ABC1234567 | <b> Valid Until: </b> 31
                  Dec 2025
                </p>
                <p className="text-sm text-[#6e6e6e]">
                  <b> Note: </b> This is a sample note for the license.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
                // onClick={() => handleEditClick(partner)}
              >
                <Edit size={18} />
              </button>
              <button
                className="text-red-500 hover:text-red-700 cursor-pointer"
                // onClick={() => handleDeleteClick(partner?._id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white mt-8" />

        {/* Footer Buttons */}
        <BillingTaxFormAction isLoading={false} initialValues={initialValues} />
      </FormWrapper>
    </div>
  );
}
