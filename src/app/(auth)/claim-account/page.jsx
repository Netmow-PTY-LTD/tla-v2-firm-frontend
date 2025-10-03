"use client";

import React, { useState } from "react";
import LawFirmClaimAccountStepOne from "../_components/LawFirmClaimAccountStepOne";
import LawFirmClaimAccountStepTwo from "../_components/LawFirmClaimAccountStepTwo";
import { useSelector } from "react-redux";

export default function LawFirmClaimAccount() {
  // const [step, setStep] = useState(1);
  const [stepOneData, setStepOneData] = useState({});

  const step = useSelector((state) => state.lawFirmRegistration.currentStep);

  //console.log("step", step);
  const handleStepOneSubmit = (data) => {
    setStepOneData(data);
    // setStep(2);
  };

  const handleStepTwoSubmit = (stepTwoData) => {
    const finalPayload = {
      ...stepOneData,
      ...stepTwoData,
    };

    console.log("Final Payload:", finalPayload);

    // 👉 send finalPayload to API
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
              <LawFirmClaimAccountStepTwo onSubmitFinal={handleStepTwoSubmit} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
