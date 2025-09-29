import { Modal } from "@/components/common/components/Modal";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
import InputCombobox from "@/components/form/ComboboxInput";
import FormWrapper from "@/components/form/FormWrapper";
import SelectInput from "@/components/form/SelectInput";
import TextareaInput from "@/components/form/TextArea";
import TextInput from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import { useAddFirmWiseLicenseAndCertificationMutation } from "@/store/firmFeatures/certificateLicensesApiService";
import { useGetFirmUserInfoQuery } from "@/store/firmFeatures/firmAuth/firmAuthApiService";
import { useGetLawCertificationsListQuery } from "@/store/tlaFeatures/public/publicApiService";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";
import React, { useState } from "react";

export default function AddOptionalLicenseModal({
  defaultValues,
  schema,
  refetchLicenses,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const onCancel = () => setIsOpen(!isOpen);

  const token = Cookies.get("token");
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetFirmUserInfoQuery(undefined, {
      skip: !token,
    });

  const countryId =
    currentUser?.data?.firmProfile?.contactInfo?.country ||
    currentUser?.data?.firmProfile?.contactInfo?.country?._id ||
    ""; // Default to Australia if not available
  const {
    data: certificationsList,
    isLoading: isCertificationsListLoading,
    isError,
  } = useGetLawCertificationsListQuery({
    countryId: countryId,
    type: "optional",
    page: 1,
    limit: 10,
  });
  //console.log("Certifications List:", certificationsList);

  const [addLicenseAndCertification, { isLoading: addOptionalLicenseIsLoading }] =
    useAddFirmWiseLicenseAndCertificationMutation();
  const handleOptionalLicenseSubmit = async (data) => {
    //console.log("Optional License form submitted:", data);
    const { certificationId, licenseNumber, validUntil, additionalNote } = data;

    const payload = {
      certificationId,
      licenseNumber,
      validUntil,
      additionalNote,
      type: "optional",
    };
    console.log("Payload to be sent:", payload);

    try {
      // Send request to backend
      const res = await addLicenseAndCertification(payload).unwrap();
      console.log("Response after adding license and certification:", res);
      if (res?.success) {
        // Show success message or toast
        showSuccessToast(
          res?.message || "License and certification added successfully"
        );
        refetchLicenses();
        onCancel();
      }
    } catch (error) {
      const errorMessage = error?.data?.message || "An error occurred";
      showErrorToast(errorMessage);
    }
  };
  return (
    <Modal
      title="Add Optional License"
      description="Add a new license to your firm"
      buttonName="+ Add License"
      width="max-w-[600px]"
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <div className="modal-header">
        <h4 className="text-lg font-semibold ">Add Optional License</h4>
      </div>
      <FormWrapper
        onSubmit={handleOptionalLicenseSubmit}
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
            onClick={onCancel}
            disabled={addOptionalLicenseIsLoading} // disable while loading

          >
            Cancel
          </Button>
          <Button
            type="submit" variant={"default"}
            className="cursor-pointer"
            disabled={addOptionalLicenseIsLoading} // disable while loading
          >
            {addOptionalLicenseIsLoading && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            {addOptionalLicenseIsLoading ? "Adding..." : "Add License"}
          </Button>
        </div>
      </FormWrapper>
    </Modal>
  );
}
