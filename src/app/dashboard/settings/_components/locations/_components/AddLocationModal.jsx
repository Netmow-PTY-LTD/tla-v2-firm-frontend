import ZipCodeCombobox from "@/app/(auth)/_components/register/ZipCodeCombobox";
import { Modal } from "@/components/common/components/Modal";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
import FormWrapper from "@/components/form/FormWrapper";
import TextInput from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import { useAddOfficeLocationMutation } from "@/store/firmFeatures/firmApiService";
import React, { useState } from "react";
import { z } from "zod";
import LocationCombobox from "./LocationCombobox";

const locationSchema = z.object({
  name: z.string().min(1, { message: "*Required" }),
  zipCode: z.string().min(1, { message: "*Required" }),
});

export default function AddLocationModal({ refetchLocations }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(!isOpen);
  const defaultValues = {
    name: "",
    zipCode: "",
  };

  const [createLocation, { isLoading }] = useAddOfficeLocationMutation();

  const handleSubmit = async (values) => {
    // console.log("values ==>", values);

    const { name, zipCode } = values;

    const payload = {
      name,
      address: zipCode,
    };

    //console.log("payload ==>", payload);

    try {
      const res = await createLocation(payload).unwrap();
      console.log("res after creating location", res);

      if (res?.success === true) {
        showSuccessToast(res?.message || "Location created successfully");
        refetchLocations();
        onClose(); // ✅ close modal after success
      }
    } catch (error) {
      const errorMessage = error?.data?.message || "An error occurred";
      showErrorToast(errorMessage);
    }
  };

  return (
    <Modal buttonName="+ Add Location" open={isOpen} onOpenChange={setIsOpen}>
      <h3 className="text-xl font-semibold text-black mb-6">Add Location</h3>
      <FormWrapper
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        schema={locationSchema}
      >
        <TextInput
          label="Location Name"
          name="name"
          placeholder="Location Name"
        />
        {/* <ZipCodeCombobox
          label="Zip Code"
          name="zipCode"
          placeholder={"select zip code"}
        /> */}

        <LocationCombobox
          label="Zip Code"
          name="zipCode"
          placeholder={"Type a Zip Code..."}
        />
        <Button type="submit" className="w-full bg-[var(--primary-color)]">
          Save Location
        </Button>
      </FormWrapper>
    </Modal>
  );
}
