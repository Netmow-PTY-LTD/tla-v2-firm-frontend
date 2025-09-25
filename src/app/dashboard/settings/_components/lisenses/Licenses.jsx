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
import { z } from "zod";
import { useGetLicensesAndCertificationsListQuery } from "@/store/firmFeatures/certificateLicensesApiService";
import { is } from "zod/v4/locales";
import EditCoreLicenseModal from "../modal/EditCoreLicenseModal";
import EditOptionalLicenseModal from "../modal/EditOptionalLicensesModal";
import LicenseCard from "../modal/LicenseCard";

const licenseSchema = z.object({
  certificationId: z.string().min(1, { message: "*Required" }),
  licenseNumber: z.string().min(1, { message: "*Required" }),
  issuedBy: z.string().optional(),
  additionalNote: z.string().optional(),
  validUntil: z.string().min(1, { message: "*Required" }),
});

export default function License() {
  const [isEditCoreLicenseModalOpen, setIsEditCoreLicenseModalOpen] =
    useState(false);
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [isEditOptionalLicenseModalOpen, setIsEditOptionalLicenseModalOpen] =
    useState(false);
  const [selectedOptionalLicense, setSelectedOptionalLicense] = useState(null);

  const handleOpenEditCoreLicenseModal = (license) => {
    setSelectedLicense(license);
    setIsEditCoreLicenseModalOpen(true);
  };

  const handleOpenEditOptionalLicenseModal = (license) => {
    setSelectedOptionalLicense(license);
    setIsEditOptionalLicenseModalOpen(true);
  };

  const handleDeleteMandatoryLicense = (licenseId) => {
    console.log("Delete mandatory license with ID:", licenseId);
  };

  const initialValues = {
    certificationId: "",
    licenseNumber: "",
    validUntil: "",
    additionalNote: "",
  };

  const {
    data: licensesList,
    isLoading: isCoreLicensesLoading,
    refetch: refetchLicenses,
  } = useGetLicensesAndCertificationsListQuery();

  console.log("licensesList", licensesList);

  const mandatoryLicenses = licensesList?.data?.filter(
    (item) => item.type === "mandatory"
  );
  const optionalLicenses = licensesList?.data?.filter(
    (item) => item.type === "optional"
  );

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-black font-semibold heading-lg mb-2">
            Core Legal Certifications
          </h3>
          <p className="text-gray-600">
            Provide accurate licensing information to verify your firm’s legal
            credentials.
          </p>
        </div>
        <div className="flex justify-end">
          <AddCoreLicenseModal
            defaultValues={initialValues}
            schema={licenseSchema}
            refetchLicenses={refetchLicenses}
          />
        </div>
      </div>
      {/* Mandatory Licenses */}
      {mandatoryLicenses?.length > 0 ? (
        <div className="space-y-4">
          {mandatoryLicenses.map((license) => (
            <LicenseCard
              key={license?._id}
              license={license}
              handleOpenEditCoreLicenseModal={handleOpenEditCoreLicenseModal}
              refetchLicenses={refetchLicenses}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-lg transition-all">
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col">
              <h5 className="heading-base font-semibold text-gray-800 mb-2">
                No core licenses found
              </h5>
            </div>
          </div>
        </div>
      )}

      {isEditCoreLicenseModalOpen && selectedLicense && (
        <EditCoreLicenseModal
          isOpen={isEditCoreLicenseModalOpen}
          onClose={() => setIsEditCoreLicenseModalOpen(false)}
          defaultValues={{
            certificationId: selectedLicense?.certificationId?._id || "",
            licenseNumber: selectedLicense?.licenseNumber || "",
            validUntil:
              new Date(selectedLicense.validUntil)
                .toISOString()
                .split("T")[0] || "",
            additionalNote: selectedLicense?.additionalNote || "",
          }}
          schema={licenseSchema}
          refetchLicenses={refetchLicenses}
          selectedLicense={selectedLicense}
        />
      )}

      <div className="border-t border-white my-14" />

      {/* Optional Licenses */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-black font-semibold heading-lg mb-2">
            Optional Legal Certifications
          </h3>
          <p className="text-gray-600">
            Provide accurate licensing information to verify your firm’s legal
            credentials.
          </p>
        </div>
        <div className="flex justify-end">
          <AddOptionalLicenseModal
            defaultValues={initialValues}
            schema={licenseSchema}
            refetchLicenses={refetchLicenses}
          />
        </div>
      </div>

      {optionalLicenses?.length > 0 ? (
        <div className="space-y-4">
          {optionalLicenses?.map((license) => (
            <LicenseCard
              key={license?._id}
              license={license}
              handleOpenEditCoreLicenseModal={
                handleOpenEditOptionalLicenseModal
              }
              refetchLicenses={refetchLicenses}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-lg transition-all">
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col">
              <h5 className="heading-base font-semibold text-gray-800 mb-2">
                No optional licenses found
              </h5>
            </div>
          </div>
        </div>
      )}

      {isEditOptionalLicenseModalOpen && selectedOptionalLicense && (
        <EditOptionalLicenseModal
          isOpen={isEditOptionalLicenseModalOpen}
          onClose={() => setIsEditOptionalLicenseModalOpen(false)}
          defaultValues={{
            certificationId:
              selectedOptionalLicense?.certificationId?._id || "",
            licenseNumber: selectedOptionalLicense?.licenseNumber || "",
            validUntil:
              new Date(selectedOptionalLicense.validUntil)
                .toISOString()
                .split("T")[0] || "",
            additionalNote: selectedOptionalLicense?.additionalNote || "",
          }}
          schema={licenseSchema}
          refetchLicenses={refetchLicenses}
          selectedLicense={selectedOptionalLicense}
        />
      )}

      {/* <BillingTaxFormAction isLoading={false} initialValues={initialValues} /> */}
    </div>
  );
}
