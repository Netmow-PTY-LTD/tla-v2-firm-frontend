
import React from "react";
import Link from "next/link";
import FormWrapper from "@/components/form/FormWrapper";
import TextInput from "@/components/form/TextInput";
import { lawFirmRegStepOneSchema } from "@/schema/auth/authValidation.schema";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, setFormData } from "@/store/firmFeatures/firmAuth/lawFirmRegistrationSlice";
import PasswordInput from "@/components/form/PasswordInput";
import ZipCodeCombobox from "@/app/(auth)/_components/register/ZipCodeCombobox";
import CityCombobox from "@/app/(auth)/_components/register/CityCombobox";
import CountrySelect from "@/app/(auth)/_components/register/CountrySelect";



export default function LawFirmRegisterStepOne() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.lawFirmRegistration.formData);

  const defaultValues = {
    firmName: formData.firmName,
    registrationNumber: formData.registrationNumber,
    yearEstablished: formData.yearEstablished,
    officeAddress: formData.contactInfo.officeAddress,
    country: formData.contactInfo.country,
    city: formData.contactInfo.city,
    zipCode: formData.contactInfo.zipCode, // optional if needed
    phone: formData.contactInfo.phone,
    email: formData.contactInfo.email,
    password: formData.password,

    website: formData.contactInfo.officialWebsite,
  };

  const onSubmit = (data) => {

    dispatch(
      setFormData({
        firmName: data.firmName,
        registrationNumber: data.registrationNumber,
        yearEstablished: data.yearEstablished,
        email: data.email,
        password: data.password,
        contactInfo: {
          zipCode: data.zipCode, // optional if needed
          country: data.country,
          city: data.city,
          phone: data.phone,
          email: data.email,
          officialWebsite: data.website,
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
          <h3 className="tla-auth-title mb-3 text-center">List Your Law Firm</h3>
          <p className="tla-auth-subtitle mb-8 text-center">
            Create your firm’s account to add lawyers and oversee their activities
          </p>

          <FormWrapper
            onSubmit={onSubmit}
            schema={lawFirmRegStepOneSchema}
            defaultValues={defaultValues}

          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <TextInput
                name="firmName"
                label="Law Firm Name"
                placeholder="i.e. ABC LLC"
              />

              <CountrySelect
                name="country"
                label="Country"
                placeholder="Select a country"
                triggerClassName={"w-full"}

              />

              {/* City */}
              <CityCombobox
                name="city"
                label="City"
                placeholder="Select a city"

              />

              <ZipCodeCombobox
                name="zipCode"
                label="Address"
                placeholder="Select a Zipcode or Address"

              />

              <TextInput
                name="email"
                label="Email"
                placeholder="i.e. abc@example.com"
              />
              <PasswordInput
                name="password"
                label="Password"
                placeholder="e.g. AbcFirm@2025"
                type="password"
              />
              <TextInput
                name="phone"
                label="Phone Number"
                placeholder="i.e. +1 (123) 456-7890"
              />

              <TextInput
                name="website"
                label="Website"
                placeholder="i.e. https://example.com"
              />

              <TextInput
                name="registrationNumber"
                label="Registration Number"
                placeholder="i.e. 1234567890"
              />

              <TextInput
                name="yearEstablished"
                label="Year of Establishment"
                placeholder="i.e. 2003"
              />
            </div>

            <button
              type="submit"
              className="mt-8 w-full md:w-auto btn-auth-register bg-[#ff8f14]"
            >
              Next
            </button>
          </FormWrapper>

          <div className="flex flex-wrap justify-between gap-4">
            <div className="tla-auth-footer">
              <span>Already have an account? </span>
              <Link href="/login">
                <b>Log In</b>
              </Link>
            </div>
            <div className="tla-auth-footer">
              <span>Lost your account? </span>
              <Link href="/claim-account">
                <b>Claim Your Account</b>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}









