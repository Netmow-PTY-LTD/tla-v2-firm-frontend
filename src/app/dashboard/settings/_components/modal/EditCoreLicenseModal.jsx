import { Modal } from "@/components/common/components/Modal";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
import InputCombobox from "@/components/form/ComboboxInput";
import FormWrapper from "@/components/form/FormWrapper";
import TextareaInput from "@/components/form/TextArea";
import TextInput from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import {
  useAddFirmWiseLicenseAndCertificationMutation,
  useGetSingleLicenseAndCertificationByIdQuery,
  useUpdateLicenseAndCertificationMutation,
} from "@/store/firmFeatures/certificateLicensesApiService";
import { useGetFirmUserInfoQuery } from "@/store/firmFeatures/firmAuth/firmAuthApiService";
import { useGetLawCertificationsListQuery } from "@/store/tlaFeatures/public/publicApiService";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";
import React, { useState } from "react";

export default function EditCoreLicenseModal({
  isOpen,
  defaultValues,
  schema,
  refetchLicenses,
  onClose,
  selectedLicense,
}) {
  //console.log("selectedLicense in EditCoreLicenseModal", selectedLicense);
  const token = Cookies.get("firm_token");
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetFirmUserInfoQuery(undefined, {
      skip: !token,
    });
  //console.log("currentUser in AddCoreLicenseModal", currentUser);

  const countryId = currentUser?.data?.contactInfo?.country?._id || ""; // Default to Australia if not available

  const {
    data: certificationsList,
    isLoading: isCertificationsListLoading,
    isError,
  } = useGetLawCertificationsListQuery({
    countryId: countryId,
    type: "mandatory",
    page: 1,
    limit: 10,
  });

  //console.log("Certifications List in Core:", certificationsList);

  const { data: singleLicense, isLoading: isSingleLicenseLoading } =
    useGetSingleLicenseAndCertificationByIdQuery(selectedLicense?._id, {
      skip: !selectedLicense?._id,
    });
  // console.log("singleLicense in EditCoreLicenseModal", singleLicense);
  const [updateLicenseAndCertification, { isLoading: updateLicenseIsLoading }] =
    useUpdateLicenseAndCertificationMutation();
  const handleMandatoryLicenseSubmit = async (data) => {
    // console.log("Mandatory License form submitted:", data);
    const { certificationId, licenseNumber, validUntil, additionalNote } = data;

    const payload = {
      certificationId,
      licenseNumber,
      validUntil,
      additionalNote,
      type: "mandatory",
    };

    console.log("Payload to be sent:", payload);

    try {
      const res = await updateLicenseAndCertification({
        licenseId: selectedLicense?._id,
        body: payload,
      }).unwrap();
      console.log("Response after updating license and certification:", res);
      if (res?.success) {
        // Show success message or toast
        showSuccessToast(
          res?.message || "License and certification updated successfully"
        );
        refetchLicenses();
        onClose();
      }
    } catch (error) {
      console.error("Error adding license and certification:", error);
      // Show error message or toast
      showErrorToast(
        error?.data?.message || "Failed to update license and certification"
      );
    }
  };
  return (
    <Modal
      title="Add Core License"
      description="Add a new license to your firm"
      width="max-w-[600px]"
      onOpenChange={onClose}
      open={isOpen}
    >
      <div className="modal-header">
        <h4 className="text-lg font-semibold">Edit Mandatory License</h4>
      </div>
      <FormWrapper
        onSubmit={handleMandatoryLicenseSubmit}
        defaultValues={defaultValues}
        schema={schema}
      >
        <div className="grid grid-cols-1 gap-5 mt-6">
          <InputCombobox
            label="License Type"
            name="certificationId"
            placeholder="Licensing Type"
            options={
              certificationsList?.data?.map((cert) => ({
                value: cert._id,
                label: cert.certificationName,
              })) || []
            }
            triggerClassName="w-full " // set custom width here
          />

          <TextInput
            label="License Number"
            name="licenseNumber"
            placeholder="i.e. ABC1234567"
          />

          <TextInput
            label="Valid Until"
            name="validUntil"
            type="date"
            inputClassName="h-[44px] inline-block  focus-visible:ring-inset w-full"
          />

          <TextareaInput
            label="Additional Notes"
            name="additionalNote"
            placeholder="Any extra notes"
            className="w-full"
          />
        </div>
        <div className="flex justify-between gap-4 mt-8">
          <Button
            type="button"
            variant={"outline"}
            className="cursor-pointer"
            onClick={onClose}
            disabled={updateLicenseIsLoading} // disable while loading
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant={"default"}
            className="cursor-pointer bg-[#ff8602]"
            disabled={updateLicenseIsLoading} // disable while loading
          >
            {updateLicenseIsLoading && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            {updateLicenseIsLoading ? "Updating..." : "  Update License"}
          </Button>
        </div>
      </FormWrapper>
    </Modal>
  );
}
