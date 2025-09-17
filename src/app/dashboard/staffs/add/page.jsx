"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormWrapper from "@/components/form/FormWrapper";
import AvatarUploader from "@/components/common/components/AvaterUploader";
import TextInput from "@/components/form/TextInput";

// ---------------- Schema ----------------
const staffSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  designation: z.string().min(2, "Designation is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 chars"),
  permissions: z.array(z.string()),
});

export default function CreateStaffPage() {
  const form = useForm({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      fullName: "",
      designation: "",
      email: "",
      password: "",
      permissions: [],
    },
  });

  function onSubmit(values) {
    console.log("New staff data:", values);
    // TODO: send values to API (e.g. /api/staff)
  }

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="py-5 w-full">
        <h3 className="text-black font-semibold heading-lg">
          Create New Staff
        </h3>
        <p className="text-[#6e6e6e] mt-2">
          This is the first detail clients will see when searching for legal
          services on TheLawApp. If you're a sole practitioner, simply use your
          full name. If you're part of a firm, enter your official business name
          to ensure consistency and credibility across your profile.
        </p>
        <FormWrapper onSubmit={onSubmit}>
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mt-8">
            <div className="w-full md:w-1/2">
              <AvatarUploader name="companyLogo" />
            </div>

            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <TextInput
                name="staffName"
                label="Staff Name"
                placeholder="Enter Staff Name"
                textColor="text-[#4b4949]"
              />
              <TextInput
                name="staffEmail"
                label="Email Address"
                placeholder="example@example.com"
                textColor="text-[#4b4949]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
            <TextInput
              name="phoneNumber"
              label="Phone Number"
              placeholder="XXXXXXX"
              textColor="text-[#4b4949]"
            />
            <TextInput
              name="designation"
              label="Designation"
              placeholder="i.e. Manager, Lawyer etc"
              textColor="text-[#4b4949]"
            />
          </div>
          <div className="border-t border-[#fff] h-1 mt-10" />
          <h3 className="text-black font-semibold heading-lg mt-6">
            Set Permissions
          </h3>
          <p className="text-[#6e6e6e] mt-2">
            This is the first detail clients will see when searching for legal
            services on TheLawApp. If you're a sole practitioner, simply use
            your full name. If you're part of a firm, enter your official
            business name to ensure consistency and credibility across your
            profile.
          </p>
          <FormField
            control={form.control}
            name="permissions"
            render={() => (
              <FormItem>
                <div className="space-y-3">
                  {[
                    "View Clients",
                    "Manage Cases",
                    "Access Billing",
                    "Admin Rights",
                  ].map((perm) => (
                    <FormField
                      key={perm}
                      control={form.control}
                      name="permissions"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={perm}
                            className="flex flex-row items-start space-y-0"
                          >
                            <FormControl>
                              <input
                                type="checkbox"
                                className="h-4 w-4"
                                checked={field.value?.includes(perm)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    field.onChange([
                                      ...(field.value || []),
                                      perm,
                                    ]);
                                  } else {
                                    field.onChange(
                                      field.value.filter((val) => val !== perm)
                                    );
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {perm}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormWrapper>
      </div>
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-wrap space-y-4">
            <div className="w-full md:w-1/2">
              <Card className="h-full">
                <CardTitle className="pb-4 border-b px-6">
                  Permissions
                </CardTitle>
                <CardContent className="h-full">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="permissions"
                      render={() => (
                        <FormItem>
                          <div className="space-y-3">
                            {[
                              "View Clients",
                              "Manage Cases",
                              "Access Billing",
                              "Admin Rights",
                            ].map((perm) => (
                              <FormField
                                key={perm}
                                control={form.control}
                                name="permissions"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={perm}
                                      className="flex flex-row items-start space-y-0"
                                    >
                                      <FormControl>
                                        <input
                                          type="checkbox"
                                          className="h-4 w-4"
                                          checked={field.value?.includes(perm)}
                                          onChange={(e) => {
                                            if (e.target.checked) {
                                              field.onChange([
                                                ...(field.value || []),
                                                perm,
                                              ]);
                                            } else {
                                              field.onChange(
                                                field.value.filter(
                                                  (val) => val !== perm
                                                )
                                              );
                                            }
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        {perm}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-center">
            <Button type="submit" className="cursor-pointer">
              Create Staff
            </Button>
          </div>
        </form>
      </Form> */}
    </div>
  );
}
