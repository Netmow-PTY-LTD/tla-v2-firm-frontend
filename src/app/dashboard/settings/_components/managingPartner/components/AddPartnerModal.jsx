"use client";

import React, { useState } from "react";
import TextInput from "@/components/form/TextInput";
import FormWrapper from "@/components/form/FormWrapper";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
import { json, z } from "zod";
import { Modal } from "@/components/common/components/Modal";
import { useCreatePartnerMutation } from "@/store/firmFeatures/partner/partnerApiService";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

import AvatarUploader from "@/components/common/components/AvaterUploader";
// import { useCreatePartnerMutation } from '@/redux/features/partner/partnerApi'; // example

// Zod Schema
const partnerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  partnerImage: z.any().refine(
    (file) =>
      file === null ||
      file === undefined ||
      file instanceof File ||
      typeof file === "string", // in case of existing image URL in edit form
    {
      message: "Invalid image file",
    }
  ),

  // barAssociation: z.string().min(1, { message: "Bar Association is required" }),
  // licenseNo: z.string().min(1, { message: "License No is required" }),
});

const AddPartnerModal = ({ refetchPartners }) => {
  const [open, setOpen] = useState(false);
  const onCancel = () => setOpen(!open);

  const [createPartner, { isLoading: addPartnerIsLoading }] = useCreatePartnerMutation();
  const defaultValues = {
    name: "",
    position: "",
    email: "",
    phone: "",
    partnerImage: null,
  };

  const handleSubmit = async (values) => {
    console.log("values ==>", values);
    const { name, position, email, phone, partnerImage } = values;

    const payload = {
      name,
      position,
      email,
      phone,
    };

    console.log("payload ==>", payload);

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));

    console.log("partnerImage ==>", partnerImage);

    if (partnerImage instanceof File) {
      formData.append("partnerImage", partnerImage);
    }

    console.log("partnerImage after append", formData.get("partnerImage"));

    try {
      // Send request to backend
      const res = await createPartner(formData).unwrap();
      console.log("res after creating partner", res);
      if (res?.success === true) {
        showSuccessToast(res?.message || "Partner created successfully");
        refetchPartners();
        onCancel();
      }
    } catch (error) {
      const errorMessage = error?.data?.message || "An error occurred";
      showErrorToast(errorMessage);
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <Modal
        buttonName="+ Add Partner"
        description="Add a new partner to your firm"
        title="Add Partner"
        onOpenChange={setOpen}
        open={open}
      >
        <h3 className="text-black font-semibold heading-lg mb-5">
          Add Partner
        </h3>
        <FormWrapper
          onSubmit={handleSubmit}
          schema={partnerSchema}
          defaultValues={defaultValues}
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
            <AvatarUploader name="partnerImage" />

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

          <div className="flex justify-between gap-4 mt-4">
            <Button
              type="button"
              variant={"outline"}
              className="cursor-pointer"
              onClick={onCancel}
              disabled={addPartnerIsLoading} // disable while loading

            >
              Cancel
            </Button>
            <Button
              type="submit" variant={"default"}
              className="cursor-pointer bg-[#ff8602]"
              disabled={addPartnerIsLoading} // disable while loading
            >
              {addPartnerIsLoading && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              {addPartnerIsLoading ? "Adding..." : "Add Partner"}
            </Button>
          </div>
        </FormWrapper>
      </Modal>
    </div>
  );
};

export default AddPartnerModal;
