import React, { useState } from "react";
import FormWrapper from "@/components/form/FormWrapper";
import TextInput from "@/components/form/TextInput";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  previousStep,
  setFormData,
} from "@/store/firmFeatures/firmAuth/lawFirmRegistrationSlice";
import PasswordInput from "@/components/form/PasswordInput";
import { lawFirmRegStepTwoSchema } from "@/schema/auth/authValidation.schema";
import countries from "@/data/countries.json";

export default function LawFirmRegisterStepTwo() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.lawFirmRegistration.formData);

  console.log("Step Two - Form Data from Redux:", formData);
  const countryId = formData?.firmData?.contactInfo?.country;
  const countryCode = countries?.find((c) => c.countryId === countryId)?.code;
  // Default values from userData slice
  const defaultValues = {
    name: formData.userData.name,
    email: formData.userData.email,
    password: formData.userData.password,
    phone: formData.userData.phone,
  };

  const onSubmit = (data) => {
    dispatch(
      setFormData({
        userData: {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
        },
      })
    );

    dispatch(nextStep());
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap w-full">
      <div className="w-full">
        <div className="tla-auth-form tla-auth-form-register relative z-1">
          <div className="absolute inset-0 flex items-center justify-center z-[-1]">
            <div className="w-[215px] h-[215px] rounded-full bg-[#00C3C080] blur-[100px]"></div>
          </div>

          <h3 className="tla-auth-title mb-3 text-center">
            Firm User Information
          </h3>
          <p className="tla-auth-subtitle mb-8 text-center">
            Enter your details to create your firm user account and start using
            our services.
          </p>

          <FormWrapper
            onSubmit={onSubmit}
            schema={lawFirmRegStepTwoSchema} // Your zod schema for user info
            defaultValues={defaultValues}
            context={{ countryCode }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <TextInput
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
              />
              <TextInput
                name="email"
                label="Email"
                placeholder="i.e. abc@example.com"
              />
              <PasswordInput
                name="password"
                label="Password"
                placeholder="e.g. Abc123@2025"
                type="password"
              />
              <TextInput
                name="phone"
                label="Phone Number"
                placeholder="i.e. +1 (123) 456-7890"
              />
            </div>

            <div className="flex justify-between gap-3 mt-10">
              <button
                type="button"
                className="btn-default btn-outline-black cursor-pointer"
                onClick={() => dispatch(previousStep())}
              >
                Back
              </button>
              <button
                type="submit"
                className="btn-default bg-[var(--color-special)] cursor-pointer"
              >
                Next
              </button>
            </div>
          </FormWrapper>
        </div>
      </div>
    </div>
  );
}
