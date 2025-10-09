"use client";

import React, { useState } from "react";
import LawFirmClaimAccountStepOne from "../_components/LawFirmClaimAccountStepOne";
import LawFirmClaimAccountStepTwo from "../_components/LawFirmClaimAccountStepTwo";
import { useSelector } from "react-redux";
import { useClaimAccountMutation } from "@/store/firmFeatures/firmApiService";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";

export default function LawFirmClaimAccount() {
  // const [step, setStep] = useState(1);
  const [stepOneData, setStepOneData] = useState({});

  const step = useSelector((state) => state.lawFirmRegistration.currentStep);

  //console.log("step", step);
  const handleStepOneSubmit = (data) => {
    setStepOneData(data);
    // setStep(2);
  };

  const [claimAccount, { isLoading }] = useClaimAccountMutation();

  const handleStepTwoSubmit = async (stepTwoData) => {
    console.log("Step Two Data:", stepTwoData);

    const { proofOwnFiles = [], ...restStepTwo } = stepTwoData;

    // ✅ Merge all non-file data
    const finalPayload = {
      ...stepOneData,
      ...restStepTwo,
    };

    console.log("Final Payload (without files):", finalPayload);
    // ✅ Build FormData
    const formData = new FormData();

    // 👉 Append JSON stringified payload
    formData.append("data", JSON.stringify(finalPayload));

    // Append uploaded files
    if (Array.isArray(proofOwnFiles)) {
      proofOwnFiles?.forEach((file) => {
        if (file instanceof File) {
          formData.append("proofOwnFiles", file);
        }
      });
    }

    try {
      const res = await claimAccount(formData).unwrap();

      console.log("Claim Account Response:", res);

      if (res?.success) {
        showSuccessToast(
          res?.message || "Account claim request submitted successfully"
        );
        // Optional: reset form or redirect
      }
    } catch (error) {
      console.error("Error claiming account:", error);
      showErrorToast(
        error?.data?.message || "Failed to submit account claim request"
      );
    }
  };

  return (
    <section
      className="tla-auth-section"
      // style={{ backgroundImage: `url('/assets/img/hero_bg.png')` }}
    >
      <div className="container">
        <div className="tla-auth-wrapper flex justify-center items-center">
          <div className="tla-auth-box max-w-[900px] w-full">
            {step === 1 && (
              <LawFirmClaimAccountStepOne
                initialValues={stepOneData}
                onNext={handleStepOneSubmit}
              />
            )}
            {step === 2 && (
              <LawFirmClaimAccountStepTwo
                onSubmitFinal={handleStepTwoSubmit}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
