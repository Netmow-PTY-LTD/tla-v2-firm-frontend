"use client";

import FileUploader from "@/components/common/components/fileUploader";
import FormWrapper from "@/components/form/FormWrapper";
import TextareaInput from "@/components/form/TextArea";
import TextInput from "@/components/form/TextInput";
import FirmFormAction from "./form/FirmFormAction";
import CompanyProfile from "./_components/CompanyProfile";
import CompanyLocation from "./_components/CompanyLocation";
import CompanyAbout from "./_components/CompanyAbout";
import { use, useMemo, useState } from "react";
import {
  useGetFirmInfoQuery,
  useUpdateFirmInfoMutation,
} from "@/store/firmFeatures/firmApiService";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
import { useGetFirmUserInfoQuery } from "@/store/firmFeatures/firmAuth/firmAuthApiService";

export default function Firm() {
  const [zipCode, setZipCode] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [postalCode, setPostalCode] = useState("");

  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetFirmUserInfoQuery();

  console.log("currentUser ===>", currentUser?.data);

  const {
    data: companyInfo,
    isLoading: isCompanyInfoLoading,
    refetch: refetchCompanyInfo,
  } = useGetFirmInfoQuery();
  console.log("company ===>", companyInfo?.data);

  const defaultValues = useMemo(
    () => ({
      firmName: companyInfo?.data?.firmName || "",
      companyLogo: companyInfo?.data?.logo || "",
      email: companyInfo?.data?.contactInfo?.email || "",
      phone: companyInfo?.data?.contactInfo?.phone || "",
      website: companyInfo?.data?.contactInfo?.officialWebsite || "",
      registrationNumber: companyInfo?.data?.registrationNumber || "",
      vatTaxId: companyInfo?.data?.vatTaxId || "",
      yearEstablished: companyInfo?.data?.yearEstablished || "",
      legalFocusAreas: companyInfo?.data?.legalFocusAreas || [],
      contactInfo: {
        country: companyInfo?.data?.contactInfo?.country || "",
        city: companyInfo?.data?.contactInfo?.city || "",
        zipCode: companyInfo?.data?.contactInfo?.zipCode || "",
        phone: companyInfo?.data?.contactInfo?.phone || "",
        email: companyInfo?.data?.contactInfo?.email || "",
        officialWebsite: companyInfo?.data?.contactInfo?.officialWebsite || "",
      },
      location: {
        address: companyInfo?.data?.location?.address ?? "",
        hideFromProfile: companyInfo?.data?.location?.hideFromProfile ?? false,
        locationReason: companyInfo?.data?.location?.locationReason ?? "",
        coordinates: {
          lat: companyInfo?.data?.location?.coordinates?.lat ?? 0,
          lng: companyInfo?.data?.location?.coordinates?.lng ?? 0,
        },
      },
      companySize: companyInfo?.data?.companySize || "",
      yearsInBusiness: companyInfo?.data?.yearsInBusiness || "",
      description: companyInfo?.data?.description || "",
    }),
    [companyInfo]
  );

  const [updateFirmInfo, { isLoading: isUpdatingFirmInfoLoading }] =
    useUpdateFirmInfoMutation();

  const onSubmit = async (data) => {
    console.log("data ===>", data);
    const {
      companyLogo,
      firmName,
      email,
      phone,
      website,
      registrationNumber,
      vatTaxId,
      companySize,
      yearsInBusiness,
      description,
      ...rest
    } = data;

    const payload = {
      companyProfileInfo: {
        firmName,
        registrationNumber,
        vatTaxId,
        contactInfo: {
          country:
            currentUser?.data?.firmProfile?.contactInfo?.country ||
            currentUser?.data?.firmProfile?.contactInfo?.country?._id, // Use country from current user profile
          city:
            currentUser?.data?.firmProfile?.contactInfo?.city ||
            currentUser?.data?.firmProfile?.contactInfo?.city?._id,
          zipCode:
            currentUser?.data?.firmProfile?.contactInfo?.zipCode ||
            currentUser?.data?.firmProfile?.contactInfo?.zipCode?._id,
          phone,
          email,
          officialWebsite: website,
        },
        location: {
          address: rest.location.address,
          hideFromProfile: rest.location.hideFromProfile,
          locationReason: rest.location.locationReason,
          coordinates: {
            lat: rest.location?.coordinates?.lat,
            lng: rest.location?.coordinates?.lng,
          },
        },
        companySize,
        yearsInBusiness,
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
    try {
      const res = await updateFirmInfo(formData).unwrap();
      console.log("Firm info updated successfully:", res);
      if (res?.success) {
        // show success message
        showSuccessToast(
          res?.message || "Firm information updated successfully"
        );
        refetchCompanyInfo();
      }
    } catch (error) {
      console.error("Failed to update firm info:", error);
      // Handle error (e.g., show error message)
      showErrorToast(
        error?.data?.message || "Failed to update firm information"
      );
    }
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
