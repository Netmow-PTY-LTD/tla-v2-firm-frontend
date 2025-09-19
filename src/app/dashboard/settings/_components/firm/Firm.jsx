"use client";

import FileUploader from "@/components/common/components/fileUploader";
import FormWrapper from "@/components/form/FormWrapper";
import TextareaInput from "@/components/form/TextArea";
import TextInput from "@/components/form/TextInput";
import FirmFormAction from "./form/FirmFormAction";
import CompanyProfile from "./components/CompanyProfile";
import CompanyLocation from "./components/CompanyLocation";
import CompanyAbout from "./components/CompanyAbout";
import { useState } from "react";

export default function Firm() {
  const [zipCode, setZipCode] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [postalCode, setPostalCode] = useState("");

  const initialValues = {
    firmName: "",
    logo: "",
    registrationNumber: "",
    vatTaxId: "",
    yearEstablished: "",
    legalFocusAreas: "",
    contactInfo: {
      officeAddress: "",
      country: "",
      city: "",
      phone: "",
      email: "",
      officialWebsite: "",
    },
    overview: "",
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
      <FormWrapper onSubmit={onSubmit}>
        <CompanyProfile />
        <div className="border-t border-white" />
        <CompanyLocation
          setZipCode={setZipCode}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          setPostalCode={setPostalCode}
        />
        <div className="border-t border-white" />
        <CompanyAbout />

        <div className="border-t border-white" />
        {/* Footer Buttons */}
        <FirmFormAction isLoading={false} initialValues={initialValues} />
      </FormWrapper>
    </div>
  );
}
