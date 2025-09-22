"use client";

import React, { useMemo } from "react";
import TextInput from "@/components/form/TextInput";
import FormWrapper from "@/components/form/FormWrapper";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
import { z } from "zod";
import { Modal } from "@/components/common/components/Modal";
import { useUpdatePartnerMutation } from "@/store/firmFeatures/partner/partnerApiService";
import { useGetFirmUserInfoQuery } from "@/store/firmFeatures/firmAuth/firmAuthApiService";

// Zod schema for partner validation
const partnerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  // barAssociation: z.string().min(1, { message: "Bar Association is required" }),
  // licenseNo: z.string().min(1, { message: "License No is required" }),
});

const EditPartnerModal = ({
  refetchPartners,
  selectedPartner,
  open,
  onClose,
}) => {
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetFirmUserInfoQuery();

  // console.log("currentUser in Edit Modal:", currentUser);
  // console.log("selectedPartner in Edit Modal:", selectedPartner);

  const onCancel = () => onClose();

  const defaultValues = useMemo(
    () => ({
      name: selectedPartner?.name ?? "",
      position: selectedPartner?.position ?? "",
      email: selectedPartner?.email ?? "",
      phone: selectedPartner?.phone ?? "",
      // barAssociation: selectedPartner?.barAssociation ?? "",
      // licenseNo: selectedPartner?.licenseNo ?? "",
    }),
    [selectedPartner]
  );

  const [updatePartner] = useUpdatePartnerMutation();

  const handleSubmit = async (values) => {
    const { name, position, email, phone } = values;

    const firmId = currentUser?.data?._id;
    const partnerId = selectedPartner?._id;

    if (!firmId || !partnerId) {
      showErrorToast("Missing firmId or partnerId");
      return;
    }

    const payload = { name, position, email, phone }; // ✅ exclude firmId & partnerId from payload

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload)); // ✅ only the data needed in req.body

    // if (selectedImageFile) {
    //   formData.append("partnerImage", selectedImageFile);
    // }

    try {
      const res = await updatePartner({ firmId, partnerId, formData }).unwrap();
      if (res?.success) {
        showSuccessToast(res.message || "Partner updated successfully");
        refetchPartners();
        onClose();
      }
    } catch (error) {
      const errorMessage = error?.data?.message || "An error occurred";
      showErrorToast(errorMessage);
      console.error("Error updating partner:", error);
    }
  };

  return (
    <Modal
      description="Update partner information"
      title="Edit Partner"
      onOpenChange={onClose}
      open={open}
    >
      <FormWrapper
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        schema={partnerSchema}
      >
        <div className="space-y-5">
          <TextInput label="Name" name="name" placeholder="Enter name" />
          <TextInput
            label="Position"
            name="position"
            placeholder="Enter position"
          />
          <TextInput label="Email" name="email" placeholder="Enter email" />
          <TextInput
            label="Phone"
            name="phone"
            placeholder="Enter phone number"
          />
          {/* <TextInput
            label="Bar Association"
            name="barAssociation"
            placeholder="Enter bar association"
          />
          <TextInput
            label="License Number"
            name="licenseNo"
            placeholder="Enter license number"
          /> */}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#12C7C4] text-white px-4 py-2 text-sm rounded-md hover:bg-[#10b0ae] cursor-pointer transition-all duration-300"
          >
            Update
          </button>
        </div>
      </FormWrapper>
    </Modal>
  );
};

export default EditPartnerModal;
