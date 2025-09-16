import React from "react";
import LawFirmLoginForm from "../_components/LawFirmLoginForm";

export default function LawFirmLogin() {
  return (
    <section
      className="tla-auth-section flex justify-center items-center py-8"
      // style={{ backgroundImage: `url('/assets/img/hero_bg.png')` }}
    >
      <div className="tla-auth-box max-w-[900px] w-full mx-auto">
        <div className="flex flex-wrap w-full">
          {/* Image Section (Hidden on mobile) */}
          <div
            className="hidden md:block w-full md:w-1/2"
            style={{
              backgroundImage: `url('/assets/img/login-img.webp')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              borderRadius: "14px 0 0 14px",
            }}
          >
            <div className="tla-auth-image">
              {/* <Image
                  src="/assets/img/login-img.png"
                  width={215}
                  height={373}
                  alt="Auth Image"
                /> */}
              <div className="tla-auth-login-text">{`Access your dashboard to oversee lawyer activity, manage staff, and expand your practice.`}</div>
            </div>
          </div>
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-[20px] md:p-[38px] relative">
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div className="w-[150px] h-[150px] rounded-full bg-[#ff860230] blur-[70px]"></div>
            </div>
            <LawFirmLoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
