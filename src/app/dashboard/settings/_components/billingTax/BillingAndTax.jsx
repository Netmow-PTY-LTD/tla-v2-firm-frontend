"use client";

import { useMemo, useState } from "react";
import FormWrapper from "@/components/form/FormWrapper";
import TextInput from "@/components/form/TextInput";
import TextareaInput from "@/components/form/TextArea";

import BillingTaxFormAction from "./BillingTaxFormAction";
import {
  useGetFirmInfoQuery,
  useUpdateFirmInfoMutation,
} from "@/store/firmFeatures/firmApiService";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
import SelectInput from "@/components/form/SelectInput";
import countries from "@/data/countries.json";

export default function BillingAndTax() {
  const {
    data: companyInfo,
    isLoading: isCompanyInfoLoading,
    refetch: refetchCompanyInfo,
  } = useGetFirmInfoQuery();


  const initialValues = useMemo(() => {
    return {
      billingEmail: companyInfo?.data?.billingInfo?.billingEmail || "",
      iban: companyInfo?.data?.billingInfo?.iban || "",
      bicSwift: companyInfo?.data?.billingInfo?.bicSwift || "",
      taxId: companyInfo?.data?.billingInfo?.taxId || "",
      currency: companyInfo?.data?.billingInfo?.currency || "",
      notes: companyInfo?.data?.billingInfo?.notes || "",
    };
  }, [companyInfo]);

  const [updateFirmInfo, { isLoading: isUpdatingFirmInfoLoading }] =
    useUpdateFirmInfoMutation();

  const onSubmit = async (data) => {
    console.log("Billing form submitted:", data);
    const { billingEmail, iban, bicSwift, taxId, currency, notes } = data;
    const payload = {
      billingInfo: {
        billingEmail,
        iban,
        bicSwift,
        taxId,
        currency,
        notes,
      },
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));

    try {
      const res = await updateFirmInfo(formData).unwrap();
      console.log("Billing info updated:", res);
      if (res?.success) {
        showSuccessToast(res?.message || "Billing info updated successfully");
        refetchCompanyInfo();
      }
    } catch (error) {
      console.error("Error updating firm info:", error);
      showErrorToast(error?.data?.message || "Failed to update firm info");
    }
  };

  // Use a Set to track added currencies
  const seen = new Set();
  const options = countries
    .filter((country) => {
      const currency = country.currency.toLowerCase();
      if (seen.has(currency)) return false;
      seen.add(currency);
      return true;
    })
    .map((country) => ({
      value: country.currency.toLowerCase(), // e.g., "eur"
      label: country.currency, // e.g., "EUR"
    }));

  return (
    <div className="max-w-[900px] mx-auto">
      {/* Heading and Description */}
      <div className="mb-6">
        <h3 className="text-black font-semibold heading-lg mb-2">
          Billing & Tax Information
        </h3>
        <p className="text-gray-600 mt-1">
          Please provide your billing details including contact email, IBAN,
          BIC/SWIFT code, Tax ID, and invoicing currency. This information will
          be used for generating invoices.
        </p>
      </div>

      <FormWrapper onSubmit={onSubmit} defaultValues={initialValues}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <TextInput
            label="Billing Contact Email"
            name="billingEmail"
            placeholder="Enter billing email"
          />

          <TextInput label="IBAN" name="iban" placeholder="Enter IBAN number" />

          <TextInput
            label="BIC / SWIFT Code"
            name="bicSwift"
            placeholder="Enter BIC / SWIFT code"
          />

          <TextInput label="Tax ID" name="taxId" placeholder="Enter Tax ID" />

          {/* <TextInput
            label="Invoicing Currency"
            name="currency"
            placeholder="Enter currency"
          /> */}
          <SelectInput
            label="Invoicing Currency"
            name="currency"
            options={options}
            placeholder={"Select currency"}
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
        <BillingTaxFormAction isLoading={isUpdatingFirmInfoLoading} initialValues={initialValues} />
      </FormWrapper>
    </div>
  );
}
