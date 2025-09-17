"use client";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
import CheckboxInput from "@/components/form/CheckboxInput";
import FormWrapper from "@/components/form/FormWrapper";
import TextInput from "@/components/form/TextInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { loginValidationSchema } from "@/schema/auth/authValidation.schema";
import { setUser } from "@/store/features/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const LawFirmLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // ✅ read directly from react-hook-form data
      if (data.rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("userEmail", data.email);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("userEmail");
      }

      console.log("Login Data:", data);

      // router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="tla-auth-form tla-auth-form-login relative">
        <h3 className="tla-auth-title mb-4 text-center">
          Law Firm Portal Login
        </h3>
        <p className="tla-auth-subtitle text-center mb-8">
          Secure access to manage your firm, lawyers, and monitor lawyer
          activity.
        </p>

        {/* Form Wrapper */}
        <FormWrapper
          onSubmit={onSubmit}
          schema={loginValidationSchema}
          defaultValues={{
            email: localStorage.getItem("userEmail") || "",
            password: "",
            rememberMe: localStorage.getItem("rememberMe") === "true",
          }}
        >
          <div className="space-y-5">
            <TextInput
              label="Email"
              type="email"
              name="email"
              placeholder="John@example.com"
            />

            <div className="relative">
              <TextInput
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="********"
              />
              {showPassword ? (
                <EyeOff
                  className="absolute right-[12px] top-[36px] text-[var(--color-text)] cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <Eye
                  className="absolute right-[12px] top-[36px] text-[var(--color-text)] cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>

            <div className="flex flex-wrap justify-between">
              <CheckboxInput
                name={"rememberMe"}
                label={'Remember Me'}
              />

              <Link
                href="/forget-password"
                className="text-[var(--primary-color)]"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn-auth-login bg-[var(--primary-color)] w-full hover:bg-[--secondary-color] transition-all duration-300"
              style={{ cursor: "pointer" }}
            // disabled={loading || isLoading}
            >
              <span>Log In</span>
            </button>
          </div>
        </FormWrapper>

        {/* Footer with Register Link */}

        <div className="tla-auth-footer text-center">
          <span>Manage your firm? </span>
          <Link
            href="/register"
            className="text-[var(--primary-color)] underline"
          >
            <b>Register your law firm</b>
          </Link>
        </div>
        <div className="text-center mt-3 text-sm text-[var(--color-text)]">
          <span>Lost your account? </span>
          <Link
            href="/claim-account"
            className="text-[var(--primary-color)] underline"
          >
            <b>Claim Account</b>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LawFirmLoginForm;
