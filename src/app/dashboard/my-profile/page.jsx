"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import FormWrapper from "@/components/form/FormWrapper";
import AvatarUploader from "@/components/common/components/AvaterUploader";
import TextInput from "@/components/form/TextInput";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
import SelectInput from "@/components/form/SelectInput";
import {
  useCurrentUserInfoQuery,
  useUpdateCurrentUserInfoMutation,
} from "@/store/firmFeatures/firmAuth/firmAuthApiService";
import { Loader, Loader2 } from "lucide-react";
import CheckboxInput from "@/components/form/CheckboxInput";
import { Checkbox } from "@/components/ui/checkbox";

// ---------------- Schema ----------------
const userSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  designation: z.string().min(1, "Designation is required"),
  email: z.email("Please enter a valid email address"),
  image: z
    .any()
    .transform((val) => {
      if (!val) return undefined;

      // If user uploads a File
      if (val instanceof File) return val;

      // If user uploads via input (FileList)
      if (val instanceof FileList && val.length > 0) return val[0];

      // If it's already a URL string
      if (typeof val === "string" && val.startsWith("http")) return val;

      return undefined;
    })
    .optional(),

  password: z
    .string()
    .optional()
    .refine((val) => !val || typeof val === "string", {
      message: "Password must be a string",
    })
    .refine((val) => !val || val.length >= 6, {
      message: "Password must be at least 6 characters",
    })
    .transform((val) => (val === "" ? undefined : val)), // ignore empty string
  phone: z.string().min(1, "Phone number is required"),
  status: z.enum(["active", "inactive"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
  // permissions: z
  //   .object({
  //     view_clients: z.boolean(),
  //     manage_cases: z.boolean(),
  //     access_billing: z.boolean(),
  //     admin_rights: z.boolean(),
  //   })
  //   .superRefine((val, ctx) => {
  //     if (val && !Object.values(val).some(Boolean)) {
  //       ctx.addIssue({
  //         code: z.ZodIssueCode.custom,
  //         message: "At least one permission must be selected",
  //       });
  //     }
  //   })
  //   .optional(),
});

const permissions = [
  { label: "View Clients", value: "view_clients" },
  { label: "Manage Cases", value: "manage_cases" },
  { label: "Access Billing", value: "access_billing" },
  { label: "Admin Rights", value: "admin_rights" },
];

export default function CreateStaffPage() {
  const {
    data,
    refetch,
    isLoading: isLoadingUserInfo,
  } = useCurrentUserInfoQuery();

  console.log("Current User Data permissions:", data?.data?.permissions);

  const defaultValues = {
    fullName: data?.data?.fullName || "",
    designation: data?.data?.designation || "",
    role: data?.data?.role || "",
    phone: data?.data?.phone || "",
    status: data?.data?.status || "active",
    email: data?.data?.email || "",
    image: data?.data?.image || "",
    password: "",
    permissions: {
      view_clients: data?.data?.permissions?.view_clients ?? false,
      manage_cases: data?.data?.permissions?.manage_cases ?? false,
      access_billing: data?.data?.permissions?.access_billing ?? false,
      admin_rights: data?.data?.permissions?.admin_rights ?? false,
    },
  };

  const [updateCurrentUserInfo, { isLoading: isCurrentUserInfoUpdating }] =
    useUpdateCurrentUserInfoMutation();

  async function onSubmit(values) {
    const {
      fullName,
      designation,
      email,
      password,
      phone,
      status,
      permissions,
      image,
    } = values;
    // TODO: send values to API (e.g. /api/staff)

    const payload = {
      fullName,
      designation,
      email,
      password,
      phone,
      status,
      permissions,
    };

    try {
      const formData = new FormData();

      formData.append("data", JSON.stringify(payload));

      // Append image file if exists
      if (image instanceof File) {
        formData.append("image", image);
      }

      const res = await updateCurrentUserInfo(formData).unwrap();

      if (res.success) {
        showSuccessToast(res?.message || "update successfully!");
        refetch();
      }
    } catch (error) {
      console.error("Failed to update user info:", error);
      showErrorToast(
        "Error updating user info: " + error?.data?.message || error.error
      );
    }
  }

  return (
    <>
      <div className="max-w-[900px] mx-auto bg-white p-6 rounded-lg shadow-sm">
        <div className="w-full">
          <h3 className="text-black font-semibold heading-lg">My Profile</h3>
          <p className="text-[#6e6e6e] mt-2 text-sm">
            This is the first detail clients will see when searching for legal
            services on TheLawApp. If you're a sole practitioner, simply use
            your full name. If you're part of a firm, enter your official
            business name to ensure consistency and credibility across your
            profile.
          </p>
          <FormWrapper
            onSubmit={onSubmit}
            schema={userSchema}
            defaultValues={defaultValues}
          >
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mt-8">
              <div className="w-full md:w-1/2">
                <AvatarUploader name="image" />
              </div>

              <div className="w-full md:w-1/2 flex flex-col gap-4">
                <TextInput
                  name="fullName"
                  label="Name"
                  placeholder="Enter Staff Name"
                  textColor="text-[#4b4949]"
                />
                <TextInput
                  name="designation"
                  label="Designation"
                  placeholder="i.e. Manager, Lawyer etc"
                  textColor="text-[#4b4949]"
                />
                <TextInput
                  name="email"
                  label="Email Address"
                  placeholder="example@example.com"
                  textColor="text-[#4b4949]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
              <TextInput
                type="password"
                name="password"
                label="Password"
                placeholder="********"
                textColor="text-[#4b4949]"
              />
              <TextInput
                name="phone"
                label="Phone"
                placeholder="+1XXXXXXXXX"
                textColor="text-[#4b4949]"
              />
            </div>
            {/* <div className="border-t border-[#f2f2f2] h-1 mt-10" /> */}
            <div className="flex justify-center items-center mt-10">
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={isCurrentUserInfoUpdating}
              >
                {isCurrentUserInfoUpdating ? (
                  <div className="flex items-center gap-2">
                    <Loader className="h-4 w-4 animate-spin" />
                    <span>Updating...</span>
                  </div>
                ) : (
                  "Update Profile"
                )}
              </Button>
            </div>
          </FormWrapper>
        </div>
      </div>
      <div className="max-w-[900px] mx-auto bg-white p-6 rounded-lg shadow-sm mt-5">
        <div className="w-full">
          <h3 className="text-black font-semibold heading-lg mb-8">
            Assigned Page Permissions
          </h3>
          <FormWrapper>
            {isLoadingUserInfo ? (
              <div className="flex justify-center">
                <Loader2 className="h-6 w-6 text-gray-500 animate-spin mt-4" />
              </div>
            ) : data?.data?.permissions?.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {data?.data?.permissions?.map((perm) => (
                  <div className="w-full md:w-[calc(50%-12px)]" key={perm?._id}>
                    <label
                      htmlFor={`permissions.${perm._id}`}
                      className="flex items-center text-sm cursor-not-allowed"
                    >
                      <Checkbox
                        name={`permissions.${perm._id}`}
                        label={perm?.pageId?.title}
                        checked={perm?.permission === true}
                        disabled
                      />
                      <span className="ml-2 text-gray-700">
                        {perm?.pageId?.title}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center">
                <p className="text-gray-500 mt-4">No permissions available.</p>
              </div>
            )}
          </FormWrapper>
        </div>
      </div>
    </>
  );
}
