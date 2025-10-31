"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import FormWrapper from "@/components/form/FormWrapper";
import TextInput from "@/components/form/TextInput";
import AvatarUploader from "@/components/common/components/AvaterUploader";
import CheckboxInput from "@/components/form/CheckboxInput";
import {
  useGetSingleStaffByIdQuery,
  useUpdateStaffMutation,
} from "@/store/firmFeatures/staff/staffApiService";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
import SelectInput from "@/components/form/SelectInput";
import Link from "next/link";
import { ArrowLeft, Loader, Loader2 } from "lucide-react";
import PasswordInput from "@/components/form/PasswordInput";
import { useGetPagesListQuery } from "@/store/tlaFeatures/public/publicApiService";
import { Skeleton } from "@/components/ui/skeleton";
import permissionss from "@/data/permissions";
import AccessDenied from "@/components/AccessDenied";
import { useCurrentUserInfoQuery } from "@/store/firmFeatures/firmAuth/firmAuthApiService";

// ---------------- Schema ----------------
const staffSchema = z.object({
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
  permissions: z.any().optional(),
});

export default function EditStaffPage() {
  const { data: currentUser } = useCurrentUserInfoQuery();

  const pageId = permissionss?.find((perm) => perm.slug === "edit-staff")._id;

  const params = useParams();
  const staffId = params?.staffId;

  const { data: staffData, isLoading: isStaffDataLoading } =
    useGetSingleStaffByIdQuery(
      { staffId },
      {
        skip: !staffId,
      }
    );

  const staff = staffData?.data;
  console.log("staff:", staff?.userId?.permissions);

  const { data: permissions, isLoading: isLoadingPermissions } =
    useGetPagesListQuery();

  //console.log("permissions", permissions);

  const permissionOptions = permissions?.data?.map((perm) => ({
    label: perm.title,
    value: perm._id,
  }));

  const defaultValues = useMemo(() => {
    // Transform array of permissions into { [pageId]: boolean }
    const transformedPermissions = (permissions?.data || []).reduce(
      (acc, perm) => {
        acc[perm._id] = !!staff?.userId?.permissions?.find(
          (p) => p.pageId === perm._id
        )?.permission;
        return acc;
      },
      {}
    );

    return {
      fullName: staff?.fullName || "",
      designation: staff?.designation || "",
      email: staff?.userId?.email || "",
      password: staff?.userId?.password || "",
      phone: staff?.phone || "",
      status: staff?.userId?.accountStatus || "",
      image: staff?.image || "",
      permissions: transformedPermissions || {}, // ✅ now in the correct shape
    };
  }, [staff]);

  const [updateStaff, { isLoading: isStaffUpdateLoading }] =
    useUpdateStaffMutation();

  async function onSubmit(values) {
    console.log("New staff data:", values);

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
      fullName,
      designation,
      email,
      password,
      phone,
      status,
      permissions: transformedPermissions,
    };
    console.log("Payload to send:", payload);

    const formData = new FormData();

    formData.append("data", JSON.stringify(payload));

    // Append image file if exists
    if (image instanceof File) {
      formData.append("image", image);
    }

    try {
      const res = await updateStaff({
        data: formData,
        staffId: staffId,
      });
      console.log("Staff updated successfully:", res);
      if (res?.data?.success) {
        showSuccessToast(res?.data?.message || "Staff updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update staff:", error);
      showErrorToast(
        "Error updating staff: " + error?.data?.message || error.error
      );
    }
  }

  if (isStaffDataLoading || isLoadingPermissions) {
    return (
      <div className="p-6 space-y-8 animate-pulse">
        {/* Header section */}
        <div className="space-y-3">
          <Skeleton className="h-8 w-1/2 bg-gray-200" />
          <Skeleton className="h-4 w-1/3 bg-gray-200" />
        </div>

        {/* Content blocks */}
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="flex gap-4">
            {/* Avatar skeleton */}
            <Skeleton className="h-14 w-14 rounded-full flex-shrink-0 bg-gray-200" />
            {/* Text block */}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4 bg-gray-200" />
              <Skeleton className="h-4 w-2/3 bg-gray-200" />
              <Skeleton className="h-4 w-1/2 bg-gray-200" />
            </div>
          </div>
        ))}

        {/* Table or card-like block */}
        <div className="space-y-4 mt-8">
          <Skeleton className="h-6 w-1/3 bg-gray-200" />
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex gap-4 items-center">
              <Skeleton className="h-4 w-1/6 bg-gray-200" />
              <Skeleton className="h-4 w-1/4 bg-gray-200" />
              <Skeleton className="h-4 w-1/2 bg-gray-200" />
              <Skeleton className="h-4 w-1/5 bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ✅ Apply page access control only for 'staff' role
  const hasPageAccess =
    currentUser?.data?.role === "staff"
      ? currentUser?.data?.permissions?.some((perm) => {
          const idMatch = perm?.pageId?._id === pageId || perm?._id === pageId;
          return idMatch && perm?.permission === true;
        })
      : true;

  if (!hasPageAccess) {
    return <AccessDenied />;
  }

  return (
    <div className="max-w-[900px] mx-auto bg-white p-6 rounded-lg shadow-sm">
      <div className="w-full">
        <h3 className="text-black font-semibold heading-lg">Edit Staff</h3>
        <p className="text-[#6e6e6e] mt-2 text-sm">
          Update the details and permissions of your staff member to keep their
          profile accurate and up-to-date. This helps manage their access and
          roles effectively within TheLawApp.
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
              disabled={isStaffUpdateLoading}
            >
              {isStaffUpdateLoading ? (
                <div className="flex items-center gap-2">
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  <span>Updating Staff...</span>
                </div>
              ) : (
                "Update Staff"
              )}
            </Button>
          </div>
        </FormWrapper>
      </div>
    </div>
  );
}
