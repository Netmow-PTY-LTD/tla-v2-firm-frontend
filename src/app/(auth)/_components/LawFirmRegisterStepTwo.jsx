

import React, { useState } from "react";
import FormWrapper from "@/components/form/FormWrapper";
import TextInput from "@/components/form/TextInput";
import SelectInput from "@/components/form/SelectInput";

import { useDispatch, useSelector } from "react-redux";
import { previousStep, setFormData } from "@/store/features/auth/lawFirmRegistrationSlice";
import { lawFirmRegStepTwoSchema } from "@/schema/auth/authValidation.schema";
import { useAuthFirmRegisterMutation } from "@/store/features/auth/authApiService";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
import { useRouter } from "next/navigation";

export default function LawFirmRegisterStepTwo() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.lawFirmRegistration.formData); // get previous step data
  const router = useRouter()
  const [firmRegister, { isLoading }] = useAuthFirmRegisterMutation();

  const defaultValues = {
    licenseType: formData.licenseDetails.licenseType,
    licenseNumber: formData.licenseDetails.licenseNumber,
    issuedBy: formData.licenseDetails.issuedBy,
    validUntil: formData.licenseDetails.validUntil,
  };

  const onSubmit = async (data) => {
    try {


      // 1️⃣ Save Step 2 data inside licenseDetails
      dispatch(
        setFormData({
          licenseDetails: {
            licenseType: data.licenseType,
            licenseNumber: data.licenseNumber,
            issuedBy: data.issuedBy,
            validUntil: data.validUntil,
          },
        })
      );

      // 2️⃣ Combine all steps data from Redux
      const finalData = {
        ...formData,
        licenseDetails: {
          ...formData.licenseDetails,
          ...data,
        },
      };

      console.log("Final Submit Data ==>", finalData);

      // 3️⃣ API call to finish registration
      const res = await firmRegister(finalData).unwrap();
      console.log("API Response ==>", res);

      if (res.success) {
        showSuccessToast(res?.message || "Firm registered successfully");
        router.push("/dashboard"); // ✅ redirect after success
      }

    } catch (error) {
      const errorMessage = error?.data?.message || "An error occurred";
      showErrorToast(errorMessage);
      console.error(
        "Registration failed:",
        error?.response?.data || error.message
      );


    }
  };


  return (
    <div className="flex flex-wrap lg:flex-nowrap w-full">
      <div className="w-full">
        <div className="tla-auth-form tla-auth-form-register relative z-1">
          <div className="absolute inset-0 flex items-center justify-center z-[-1]">
            <div className="w-[215px] h-[215px] rounded-full bg-[#00C3C080] blur-[100px]"></div>
          </div>
          <h3 className="tla-auth-title mb-3 text-center uppercase">
            License Details
          </h3>
          <p className="tla-auth-subtitle mb-8 text-center text-muted">
            Provide accurate licensing information to verify your firm’s legal credentials.
          </p>
          <FormWrapper
            onSubmit={onSubmit}
            schema={lawFirmRegStepTwoSchema}
          // defaultValues={defaultValues}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <TextInput
                name="licenseType"
                label="License Type"
                placeholder="i.e. Law Firm License"
              />

              <TextInput
                name="licenseNumber"
                label="License Number"
                placeholder="i.e. ABC1234567"
              />

              <SelectInput
                name="issuedBy"
                label="Issued By"
                placeholder="Select a body"
                options={[
                  { value: "bar-council", label: "Bar Council of Australia" },
                  { value: "legal-services-commission", label: "Legal Services Commission" },
                ]}
                triggerClassName="w-full"

              />

              <TextInput
                name="validUntil"
                label="Valid Until"
                type="date"
                inputClassName="h-[44px] inline-block  focus-visible:ring-inset"
              />
            </div>

            <div className="flex justify-between gap-3 mt-10">
              <button
                type="button"
                className="btn-default btn-outline-black"
                onClick={() => dispatch(previousStep())}
                disabled={isLoading} // ✅ prevent step change while submitting
              >
                Back
              </button>
              <button
                type="submit"
                className="btn-default bg-[var(--color-special)]"
                disabled={isLoading} // ✅ disable while submitting
              >
                {isLoading ? "Submitting..." : "Finish"}
              </button>
            </div>
          </FormWrapper>
        </div>
      </div>
    </div>
  );
}

