"use client";

import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import FormWrapper from "@/components/form/FormWrapper";
import AvatarUploader from "@/components/common/components/AvaterUploader";
import TextInput from "@/components/form/TextInput";
import CheckboxInput from "@/components/form/CheckboxInput";

// ---------------- Schema ----------------
const staffSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  designation: z.string().min(2, "Designation is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 chars"),
  permissions: z
    .object({
      view_clients: z.boolean(),
      manage_cases: z.boolean(),
      access_billing: z.boolean(),
      admin_rights: z.boolean(),
    })
    .refine((val) => Object.values(val).some(Boolean), {
      message: "At least one permission must be selected",
    }),
});

const permissions = [
  { label: "View Clients", value: "view_clients" },
  { label: "Manage Cases", value: "manage_cases" },
  { label: "Access Billing", value: "access_billing" },
  { label: "Admin Rights", value: "admin_rights" },
];

const defaultValues = {
  fullName: "",
  designation: "",
  email: "",
  password: "",
  permissions: {
    view_clients: false,
    manage_cases: false,
    access_billing: false,
    admin_rights: false,
  },
};

export default function CreateStaffPage() {
  const [loading, setLoading] = useState(false);

  // <-- No TypeScript types here (JS file)
  async function onSubmit(values) {
    setLoading(true);

    try {
      const payload = {
        fullName: values.fullName,
        designation: values.designation,
        email: values.email,
        password: values.password,
        permissions: values.permissions,
      };

      console.log("Payload to send:", payload);

      const res = await fetch("/api/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to create staff");
      }

      const data = await res.json();
      console.log("✅ Staff created successfully:", data);

      alert("Staff created successfully!");
      // optionally reset form via FormWrapper API if it exposes a reset prop

    } catch (err) {
      console.error("❌ Error creating staff:", err);
      alert("Error creating staff. Please try again.");
    } finally {
      setLoading(false);
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
          services on TheLawApp...
        </p>
        <FormWrapper
          onSubmit={onSubmit}
          schema={staffSchema}
          defaultValues={defaultValues}
        >
          {/* form contents (kept same as your original) */}
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
            <TextInput
              type="password"
              name="password"
              label="Password"
              placeholder="********"
              textColor="text-[#4b4949]"
            />
          </div>

          <div className="border-t border-[#f2f2f2] h-1 mt-10" />
          <h3 className="text-black font-semibold heading-lg mt-6">
            Set Permissions
          </h3>
          <p className="text-[#6e6e6e] mt-2 text-sm">
            Select at least one permission for this staff member.
          </p>
          {permissions.map((perm) => (
            <CheckboxInput
              key={perm.value}
              name={`permissions.${perm.value}`}
              label={perm.label}
            />
          ))}

          <div className="flex justify-center mt-6">
            <Button type="submit" disabled={loading} className="cursor-pointer">
              {loading ? "Creating..." : "Create Staff"}
            </Button>
          </div>
        </FormWrapper>
      </div>
    </div>
  );
}
