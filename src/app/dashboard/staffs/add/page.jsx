"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import FormWrapper from "@/components/form/FormWrapper";
import AvatarUploader from "@/components/common/components/AvaterUploader";
import TextInput from "@/components/form/TextInput";
import CheckboxInput from "@/components/form/CheckboxInput";
import { useCreateStaffMutation } from "@/store/firmFeatures/staff/staffApiService";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
import { useRouter } from "next/navigation";
import SelectInput from "@/components/form/SelectInput";
import Link from "next/link";
import { ArrowLeft, Loader, Loader2 } from "lucide-react";
import PasswordInput from "@/components/form/PasswordInput";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/firmFeatures/firmAuth/firmAuthSlice";
import { useGetPagesListQuery } from "@/store/tlaFeatures/public/publicApiService";
import { useMemo } from "react";

// ---------------- Schema ----------------

const staffSchema = z.object({
  firmProfileId: z.string().min(1, "Firm profile ID is required"),
  fullName: z.string().min(1, "Full name is required"),
  designation: z.string().min(1, "Designation is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  image: z
    .union([z.instanceof(File), z.string().url()])
    .or(
      z
        .any()
        .transform((val) => (val?.[0] instanceof File ? val[0] : undefined))
    )
    .optional(),
  phone: z.string().min(1, "Phone number is required"),
  status: z.enum(["active", "inactive"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
  permissions: z
    .any()
    .optional()
    .superRefine((val, ctx) => {
      if (val === undefined) return;

      if (
        typeof val !== "object" ||
        Array.isArray(val) ||
        Object.values(val).some((v) => typeof v !== "boolean")
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Permissions must be an object with boolean values",
        });
      }
    }),
});

export default function CreateStaffPage() {
  const router = useRouter();
  const currentuser = useSelector(selectCurrentUser);
  // Only pass firmId if currentuser exists and role is "firm"
  const firmProfileId = currentuser?.firmProfileId;

  const { data: permissions, isLoading: isLoadingPermissions } =
    useGetPagesListQuery();

  const permissionOptions = permissions?.data?.map((perm) => ({
    label: perm.title,
    value: perm._id,
  }));

  // Construct default values only after permissionOptions is available
  const defaultValues = useMemo(() => {
    return {
      firmProfileId: firmProfileId || "",
      fullName: "",
      designation: "",
      email: "",
      password: "",
      phone: "",
      status: "active",
      image: undefined,
      permissions: Object.fromEntries(
        permissionOptions?.map((perm) => [perm.value, false]) || []
      ),
    };
  }, [firmProfileId, permissionOptions]);

  const [createStaff, { isLoading: isStaffCreationLoading }] =
    useCreateStaffMutation();

  const onSubmit = async (values) => {
    console.log("Form Values:", values);
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

    const transformedPermissions = Object.entries(permissions || {}).map(
      ([pageId, permission]) => ({
        pageId,
        permission,
      })
    );

    const payload = {
      firmProfileId,
      fullName,
      designation,
      email,
      password,
      phone,
      status,
      permissions: transformedPermissions,
    };

    console.log("payload:", payload);

    try {
      const formData = new FormData();

      formData.append("data", JSON.stringify(payload));

      // Append image file if exists
      if (image instanceof File) {
        formData.append("image", image);
      }

      const res = await createStaff(formData).unwrap();
      console.log("Staff created successfully:", res);
      if (res.success) {
        showSuccessToast(res?.message || "Staff created successfully!");
        router.push("/dashboard/staffs/list");
      }
    } catch (error) {
      console.error("Failed to create staff:", error);
      showErrorToast(
        "Error creating staff: " + error?.data?.message || error.error
      );
    }
  };

  return (
    <div className="max-w-[900px] mx-auto bg-white p-6 rounded-lg shadow-sm">
      <div className="w-full">
        <h3 className="text-black font-semibold heading-lg">
          Create New Staff
        </h3>
        <p className="text-[#6e6e6e] mt-2 text-sm">
          Add individual staff members to your company profile to showcase your
          team. Each staff account can include personal details, role, and
          specialization, ensuring clients can see who they will be working
          with. You can also assign permissions to control access within the
          company dashboard.
        </p>

        <FormWrapper
          onSubmit={onSubmit}
          schema={staffSchema}
          defaultValues={defaultValues}
        >
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mt-8">
            <div className="w-full md:w-1/2">
              <AvatarUploader name="image" />
            </div>

            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <TextInput
                name="fullName"
                label="Staff Name"
                placeholder="Enter Staff Name"
                textColor="text-[#4b4949]"
              />
              <TextInput
                name="designation"
                label="Designation"
                placeholder="i.e. Manager, Lawyer etc"
                textColor="text-[#4b4949]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
            <TextInput
              name="email"
              label="Email Address"
              placeholder="example@example.com"
              textColor="text-[#4b4949]"
            />
            <PasswordInput
              type="password"
              name="password"
              label="Password"
              placeholder="********"
              textColor="text-[#4b4949]"
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
            <TextInput
              name="phone"
              label="Phone"
              placeholder="+1XXXXXXXXX"
              textColor="text-[#4b4949]"
            />
            <SelectInput
              name="status"
              label="Status"
              placeholder="Select Status"
              textColor="text-[#4b4949]"
              options={[
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
            />
          </div>
          <div className="border-t border-[#f2f2f2] h-1 mt-10" />
          <h3 className="text-black font-semibold heading-lg mt-6">
            Set Permissions
          </h3>
          <p className="text-[#6e6e6e] mt-2 text-sm">
            Choose which pages this staff member can access. Select from the
            list below to assign permissions.
          </p>

          {permissionOptions?.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {permissionOptions.map((perm) => (
                <div className="w-full md:w-[calc(50%-12px)]" key={perm.value}>
                  <CheckboxInput
                    name={`permissions.${perm.value}`}
                    label={perm.label}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center mt-10">
            <Link
              href="/dashboard/staffs/list"
              className="text-sm flex items-center hover:underline bg-black text-white px-4 py-2 rounded-md"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Back to Staffs List</span>
            </Link>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isStaffCreationLoading}
            >
              {isStaffCreationLoading ? (
                <div className="flex items-center gap-2">
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  <span>Creating Staff...</span>
                </div>
              ) : (
                "Create Staff"
              )}
            </Button>
          </div>
        </FormWrapper>
      </div>
    </div>
  );
}
