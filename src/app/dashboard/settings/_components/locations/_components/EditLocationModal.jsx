import { Modal } from "@/components/common/components/Modal";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
import FormWrapper from "@/components/form/FormWrapper";
import TextInput from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import {
  useAddOfficeLocationMutation,
  useUpdateOfficeLocationMutation,
} from "@/store/firmFeatures/firmApiService";
import React, { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import LocationCombobox from "./LocationCombobox";
import { Loader } from "lucide-react";

const locationSchema = z.object({
  name: z.string().min(1, { message: "*Required" }),
  zipCode: z.string().min(1, { message: "*Required" }),
});

export default function EditLocationModal({
  location,
  refetchLocations,
  open,
  onClose,
}) {
  console.log("location ==>", location);
  const defaultValues = useMemo(
    () => ({
      name: location?.name ?? "",
      zipCode: location?.address
        ? { value: location.address._id, label: location.address.zipcode }
        : null,
    }),
    [location]
  );

  // const [defaultValues, setDefaultValues] = useState({
  //   name: location?.name ?? "",
  //   zipCode: location?.address
  //     ? {
  //         value: location?.address?._id,
  //         label: location?.address?.zipCode,
  //       }
  //     : null,
  // });

  // useEffect(() => {
  //   if (location) {
  //     setDefaultValues({
  //       name: location?.name ?? "",
  //       zipCode: location?.address
  //         ? {
  //             value: location?.address?._id,
  //             label: location?.address?.zipCode,
  //           }
  //         : null,
  //     });
  //   }
  // }, [location]);

  const [updateLocation, { isLoading }] = useUpdateOfficeLocationMutation();

  const handleSubmit = async (values) => {
    //console.log("values ==>", values);

    const { name, zipCode } = values;

    const payload = {
      name,
      address: zipCode,
    };

    //  console.log("payload ==>", payload);

    try {
      const res = await updateLocation({
        locationId: location?._id,
        body: payload,
      }).unwrap();
      console.log("res after creating location", res);

      if (res?.success === true) {
        showSuccessToast(res?.message || "Location updated successfully");
        refetchLocations();
        onClose(); // ✅ close modal after success
      }
    } catch (error) {
      const errorMessage = error?.data?.message || "Failed to update location";
      showErrorToast(errorMessage);
    }
  };

  return (
    <Modal buttonName="+ Add Location" open={open} onOpenChange={onClose}>
      <h3 className="text-xl font-semibold text-black mb-6">Edit Location</h3>
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
        <LocationCombobox
          label="Zip Code"
          name="zipCode"
          placeholder="Type Zip Code..."
        />
        {/* <div className="h-40">
          <iframe
            src={`https://maps.google.com/maps?q=${form.lat},${form.lng}&z=15&output=embed`}
            className="w-full h-full rounded-lg border"
          />
        </div> */}
   
         <Button
          type="submit"
          className="w-full bg-[var(--primary-color)]"
          disabled={isLoading}
        >
          {isLoading && (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          )}
          {isLoading ? "Updating..." : "Update Location"}
        </Button>
      </FormWrapper>
    </Modal>
  );
}
