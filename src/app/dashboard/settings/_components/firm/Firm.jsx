"use client";

import FileUploader from "@/components/common/components/fileUploader";
import FormWrapper from "@/components/form/FormWrapper";
import TextareaInput from "@/components/form/TextArea";
import TextInput from "@/components/form/TextInput";
import FirmFormAction from "./form/FirmFormAction";
import CompanyProfile from "./_components/CompanyProfile";
import CompanyLocation from "./_components/CompanyLocation";
import CompanyAbout from "./_components/CompanyAbout";
import { useState } from "react";
import { useGetFirmInfoQuery } from "@/store/firmFeatures/firmApiService";

export default function Firm() {
  const [zipCode, setZipCode] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [postalCode, setPostalCode] = useState("");

  const { data: companyInfo, isLoading: isCompanyInfoLoading } =
    useGetFirmInfoQuery();
  console.log("company ===>", companyInfo?.data);

  const defaultValues = {
    firmName: companyInfo?.data?.firmName || "",
    email: companyInfo?.data?.contactInfo?.email || "",
    phone: companyInfo?.data?.contactInfo?.phone || "",
    website: companyInfo?.data?.contactInfo?.officialWebsite || "",
    logo: companyInfo?.data?.logo || "",
    registrationNumber: companyInfo?.data?.registrationNumber || "",
    vatTaxId: companyInfo?.data?.vatTaxId || "",
    yearEstablished: companyInfo?.data?.yearEstablished || "",
    legalFocusAreas: companyInfo?.data?.legalFocusAreas || [],
    contactInfo: {
      officeAddress: companyInfo?.data?.contactInfo?.officeAddress || "",
      country: companyInfo?.data?.contactInfo?.country || "",
      city: companyInfo?.data?.contactInfo?.city || "",
      phone: companyInfo?.data?.contactInfo?.phone || "",
      email: companyInfo?.data?.contactInfo?.email || "",
      officialWebsite: companyInfo?.data?.contactInfo?.officialWebsite || "",
    },
    overview: companyInfo?.data?.overview || "",
  };

  const onSubmit = (data) => {
    console.log("data ===>", data);
    const {
      companyLogo,
      companyName,
      contactEmail,
      phoneNumber,
      website,
      registrationNumber,
      vatTaxId,
      companySize,
      yearInBusiness,
      description,
      ...rest
    } = data;
    const payload = {
      companyProfile: {
        companyName,
        contactEmail,
        phoneNumber,
        website,
        registrationNumber,
        vatTaxId,
      },
      companyLocation: {
        address: rest.location.address,
        hideFromProfile: rest.location.hideFromProfile,
        locationReason: rest.location.locationReason,
        coordinates: {
          lat: rest.location?.coordinates?.lat,
          lng: rest.location?.coordinates?.lng,
        },
      },
      companyAbout: {
        companySize,
        yearInBusiness,
        description,
      },
    };

    console.log("Payload to send:", payload);

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));

    // Conditionally append files
    if (companyLogo instanceof File) {
      formData.append("companyLogo", companyLogo);
    }

    console.log("FormData to send:", JSON.parse(formData.get("data")));

    // ✅ Console all formData key-value pairs
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    // TODO: send values to API (e.g. /api/staff)
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <FormWrapper onSubmit={onSubmit} defaultValues={defaultValues}>
        <CompanyProfile />
        <div className="border-t border-white" />
        <CompanyLocation
          setZipCode={setZipCode}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          setPostalCode={setPostalCode}
          companyInfo={companyInfo?.data}
        />
        <div className="border-t border-white" />
        <CompanyAbout companyInfo={companyInfo?.data} />

        <div className="border-t border-white" />
        {/* Footer Buttons */}
        <FirmFormAction isLoading={false} defaultValues={defaultValues} />
      </FormWrapper>
    </div>
  );
}
