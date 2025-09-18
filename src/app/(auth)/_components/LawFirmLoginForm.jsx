"use client";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
import CheckboxInput from "@/components/form/CheckboxInput";
import FormWrapper from "@/components/form/FormWrapper";
import PasswordInput from "@/components/form/PasswordInput";
import TextInput from "@/components/form/TextInput";
import { verifyToken } from "@/helpers/verifyToken";
import { loginValidationSchema } from "@/schema/auth/authValidation.schema";
import { useLoginFirmMutation } from "@/store/firmFeatures/firmAuth/firmAuthApiService";

import { setUser } from "@/store/firmFeatures/firmAuth/firmAuthSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { useDispatch } from "react-redux";

const LawFirmLoginForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [authLogin, { isLoading }] =  useLoginFirmMutation();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // 🔹 Call login API
      const res = await authLogin(data).unwrap();
      console.log("res ===>", res);
      if (res?.success) {
        showSuccessToast(res?.message || "Login successful");
        // 🔹 Verify token
        const user = await verifyToken(res?.token);
        console.log("user", user);

        if (user) {
          // 🔹 Dispatch user to Redux
          dispatch(
            setUser({
              user: res?.data,
              token: res?.token,
            })
          );

          // 🔹 Handle remember me from form data
          if (data.rememberMe) {
            localStorage.setItem("rememberMe", "true");
            localStorage.setItem("userEmail", data.email);
          } else {
            localStorage.removeItem("rememberMe");
            localStorage.removeItem("userEmail");
          }

          // 🔹 Redirect if login worked

          router.push(`/dashboard`);
        }
      }
    } catch (error) {
      const errorMessage = error?.data?.message || "An error occurred";
      showErrorToast(errorMessage);
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
          // defaultValues={{
          //   email: localStorage.getItem("userEmail") || "",
          //   password: "",
          //   rememberMe: localStorage.getItem("rememberMe") === "true",
          // }}
        >
          <div className="space-y-5">
            <TextInput
              label="Email"
              type="email"
              name="email"
              placeholder="John@example.com"
            />

            <PasswordInput
              label="Password"
              type={"password"}
              name="password"
              placeholder="********"
            />

            <div className="flex flex-wrap justify-between">
              <CheckboxInput name={"rememberMe"} label={"Remember Me"} />

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
              disabled={loading || isLoading}
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
