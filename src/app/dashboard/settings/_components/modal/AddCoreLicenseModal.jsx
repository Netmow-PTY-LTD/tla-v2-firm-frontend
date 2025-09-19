import { Modal } from "@/components/common/components/Modal";
import SelectInput from "@/components/form/SelectInput";
import TextareaInput from "@/components/form/TextArea";
import TextInput from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import { useGetFirmUserInfoQuery } from "@/store/firmFeatures/firmAuth/firmAuthApiService";
import { selectCurrentUser } from "@/store/firmFeatures/firmAuth/firmAuthSlice";
import { useGetLawCertificationsListQuery } from "@/store/tlaFeatures/public/publicApiService";
import Cookies from "js-cookie";
import React from "react";
import { useSelector } from "react-redux";

export default function AddCoreLicenseModal() {
  const token = Cookies.get("token");
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetFirmUserInfoQuery(undefined, {
      skip: !token,
    });
  console.log("currentUser in AddCoreLicenseModal", currentUser);

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
  console.log("Certifications List:", certificationsList);
  const handleAddCoreLicense = () => {
    // Logic to open the modal
    console.log("Add Core License");
  };
  return (
    <Modal
      title="Add Core License"
      description="Add a new license to your firm"
      buttonName="+ Add License"
      width="max-w-[600px]"
    >
      <div className="modal-header">
        <h4 className="text-lg font-semibold ">Add Core License</h4>
      </div>
      <div className="grid grid-cols-1 gap-5 mt-6">
        <SelectInput
          label="License Type"
          name="licenseType"
          placeholder="Licensing Type"
          options={[
            { label: "Bar Council of Australia", value: "bar-council" },
            {
              label: "Legal Services Commission",
              value: "legal-services-commission",
            },
          ]}
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
          name="notes"
          placeholder="Any extra notes"
          className="w-full"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        <Button type="button" variant={"outline"} className="cursor-pointer">
          Cancel
        </Button>
        <Button
          type="button"
          variant={"default"}
          className="cursor-pointer"
          onClick={handleAddCoreLicense}
        >
          Add License
        </Button>
      </div>
    </Modal>
  );
}
