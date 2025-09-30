"use client";

import React from "react";
import { useSelector } from "react-redux";
import LawFirmRegisterStepOne from "../_components/LawFirmRegisterStepOne";
import LawFirmRegisterStepTwo from "../_components/LawFirmRegisterStepTwo";
import LawFirmRegisterStepThree from "../_components/LawFirmRegisterStepThree";



const Register = () => {

  const { currentStep } = useSelector(state => state.lawFirmRegistration);

  return (
    <section className="tla-auth-section">
      <div className="container">
        <div className="tla-auth-wrapper flex justify-center items-center">
          <div className="tla-auth-box max-w-[900px] w-full">
            {currentStep === 1 && <LawFirmRegisterStepOne />}
            {currentStep=== 2 && <LawFirmRegisterStepTwo />}
            {currentStep=== 3 && <LawFirmRegisterStepThree />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
