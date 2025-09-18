'use client'

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
  const [postalCode, setPostalCode] = useState('');

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
  }






  const onSubmit = (data) => {
    console.log("data ===>", data);
  };






  return (

    <div className="max-w-[900px] mx-auto">
      <FormWrapper
        onSubmit={onSubmit}

      >

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
        <FirmFormAction
          isLoading={false}
          initialValues={initialValues}
        />
      </FormWrapper>

    </div>

  );
}
