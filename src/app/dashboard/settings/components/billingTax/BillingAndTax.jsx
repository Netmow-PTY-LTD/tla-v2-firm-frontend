

'use client';

import { useState } from "react";
import FormWrapper from "@/components/form/FormWrapper";
import TextInput from "@/components/form/TextInput";
import TextareaInput from "@/components/form/TextArea";

import BillingTaxFormAction from "./BillingTaxFormAction";


export default function BillingAndTax() {
  const [logo, setLogo] = useState(null);

  const initialValues = {
    billingEmail: "Contactfinance@lexeuropa.de",
    iban: "DE89 3704 0044 0532 0130 00",
    bicSwift: "COBADEFFXXX",
    taxId: "27/123/45678",
    currency: "EUR (€)",
    notes: "",
    companyLogo: null,
  };

  const onSubmit = (data) => {
    console.log("Billing form submitted:", data);
  
  };

  return (

<div className="max-w-[900px] mx-auto">
  {/* Heading and Description */}
  <div className="mb-6">
    <h3 className="text-black font-semibold heading-lg">
      Billing & Tax Information
    </h3>
    <p className="text-gray-600 mt-1">
      Please provide your billing details including contact email, IBAN, BIC/SWIFT code, Tax ID, and invoicing currency. This information will be used for generating invoices.
    </p>
  </div>

  <FormWrapper
    onSubmit={onSubmit}
    defaultValues={initialValues}
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TextInput
        label="Billing Contact Email"
        name="billingEmail"
        placeholder="Enter billing email"
      />

      <TextInput
        label="IBAN"
        name="iban"
        placeholder="Enter IBAN number"
      />

      <TextInput
        label="BIC / SWIFT Code"
        name="bicSwift"
        placeholder="Enter BIC / SWIFT code"
      />

      <TextInput
        label="Tax ID"
        name="taxId"
        placeholder="Enter Tax ID"
      />

      <TextInput
        label="Invoicing Currency"
        name="currency"
        placeholder="Enter currency"
      />

      <TextareaInput
        label="Additional Notes"
        name="notes"
        placeholder="Any extra billing or tax notes"
        className="col-span-1 md:col-span-2"
      />
    </div>

    <div className="border-t border-white mt-6" />

    {/* Footer Buttons */}
    <BillingTaxFormAction
      isLoading={false}
      initialValues={initialValues}
    />
  </FormWrapper>
</div>


  );
}
