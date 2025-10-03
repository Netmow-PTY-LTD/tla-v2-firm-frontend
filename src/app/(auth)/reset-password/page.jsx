"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TextInput from "@/components/form/TextInput";
import { Button } from "@/components/ui/button";
import FormWrapper from "@/components/form/FormWrapper";
import { useResetFirmPasswordMutation } from "@/store/firmFeatures/firmAuth/firmAuthApiService";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
import { toast } from "sonner";

const ResetPassword = () => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Manually parse query parameters from URL
    const searchParams = new URLSearchParams(window.location.search);
    setToken(searchParams.get("token"));
    setEmail(searchParams.get("email"));
  }, []);

  const [handleResetPassword, { isLoading, isSuccess, data }] =
    useResetFirmPasswordMutation();

  useEffect(() => {
    if (data && !data?.success) {
      showErrorToast(data?.message);
    }

    if (!isLoading && isSuccess) {
      showSuccessToast(data?.message);
      router.push("/login");
    }
  }, [isLoading, isSuccess, data]);

  const onSubmit = async (data) => {
    handleResetPassword({ ...data, email, token });
  };

  return (
    <>
      <div className="tla-auth-section flex w-full items-center justify-center py-8 px-4">
        <div className="border border-gray-200 rounded-xl p-8 w-full max-w-[400px]">
          <h3 className="mb-2 text-2xl font-bold text-center">
            Reset Password
          </h3>
          <p className="mb-6 text-md text-center text-[var(--color-text)]">
            Enter your new password to reset it
          </p>

          <div className="w-full">
            <FormWrapper
              //    schema={}
              onSubmit={onSubmit}
            >
              <div className="">
                <TextInput
                  label="New Password"
                  name="newPassword"
                  type="password"
                />
              </div>

              <Button
                className="w-full"
                size="lg"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Set New Password"}
              </Button>
            </FormWrapper>

            <div className="text-center mt-4 text-sm text-[var(--color-text)]">
              Remember your password?{" "}
              <Link
                className="text-[var(--secondary-color)] font-medium underline"
                href="/login"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
