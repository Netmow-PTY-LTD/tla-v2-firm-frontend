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
import { ArrowLeft } from "lucide-react";
import PasswordInput from "@/components/form/PasswordInput";

// ---------------- Schema ----------------
const staffSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  designation: z.string().min(1, "Designation is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password must be at least 4 chars"),
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
  const router = useRouter();

  const defaultValues = {
    fullName: "",
    designation: "",
    role: "",
    phone: "",
    status: "active",
    email: "",
    password: "",
    permissions: {
      view_clients: false,
      manage_cases: false,
      access_billing: false,
      admin_rights: false,
    },
  };

  const [createStaff] = useCreateStaffMutation();

  async function onSubmit(values) {
    //console.log("New staff data:", values);

    const {
      fullName,
      designation,
      email,
      password,
      phone,
      status,
      permissions,
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
    console.log("Payload to send:", payload);

    try {
      const res = await createStaff(payload).unwrap();
      console.log("Staff created successfully:", res);
      if (res?.success) {
        showSuccessToast(res?.message || "Staff created successfully!");
        router.push("/dashboard/staffs/list");
      }
    } catch (error) {
      console.error("Failed to create staff:", error);
      showErrorToast(
        "Error creating staff: " + error?.data?.message || error.error
      );
    }
  }

  return (
    <div className="max-w-[900px] mx-auto bg-white p-6 rounded-lg shadow-sm">
      <div className="w-full">
        <h3 className="text-black font-semibold heading-lg">
          Create New Staff
        </h3>
        <p className="text-[#6e6e6e] mt-2 text-sm">
          This is the first detail clients will see when searching for legal
          services on TheLawApp. If you're a sole practitioner, simply use your
          full name. If you're part of a firm, enter your official business name
          to ensure consistency and credibility across your profile.
        </p>
        <FormWrapper
          onSubmit={onSubmit}
          schema={staffSchema}
          defaultValues={defaultValues}
        >
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mt-8">
            <div className="w-full md:w-1/2">
              <AvatarUploader name="companyLogo" />
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
            This is the first detail clients will see when searching for legal
            services on TheLawApp. If you're a sole practitioner, simply use
            your full name. If you're part of a firm, enter your official
            business name to ensure consistency and credibility across your
            profile.
          </p>
          {permissions.map((perm) => (
            <CheckboxInput
              key={perm.value}
              name={`permissions.${perm.value}`}
              label={perm.label}
            />
          ))}

          <div className="flex justify-between items-center mt-10">
            <Link
              href="/dashboard/staffs/list"
              className="text-sm flex items-center hover:underline bg-black text-white px-4 py-2 rounded-md"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Back to Staffs List</span>
            </Link>
            <Button type="submit" className="cursor-pointer">
              Create Staff
            </Button>
          </div>
        </FormWrapper>
      </div>
     
    </div>
  );
}
