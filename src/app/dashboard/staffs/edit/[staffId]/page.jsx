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
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useEffect } from "react";

// ✅ Example staff data
const staffData = [
  {
    id: 1,
    name: "John Doe",
    role: "Lawyer",
    email: "john@example.com",
    status: "Active",
    lastLogin: "2025-09-10",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Admin",
    email: "jane@example.com",
    status: "Inactive",
    lastLogin: "2025-09-01",
  },
  {
    id: 3,
    name: "Mark Lee",
    role: "Assistant",
    email: "mark@example.com",
    status: "Active",
    lastLogin: "2025-09-12",
  },
];

// ---------------- Schema ----------------
const staffSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  designation: z.string().min(2, "Designation is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 chars"),
  permissions: z.array(z.string()),
});

export default function EditStaffPage() {
  const params = useParams();
  const staffId = params.staffId;

  const staff = staffData.find((s) => s.id.toString() === staffId);
  console.log("staff:", staff);
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

  useEffect(() => {
    if (staff) {
      form.reset({
        fullName: staff.name,
        designation: staff.role,
        email: staff.email,
        password: staff.password,
        permissions: staff.permissions || [],
      });
    }
  }, [staff, form]);

  function onSubmit(values) {
    console.log("New staff data:", values);
    // TODO: send values to API (e.g. /api/staff)
  }

  return (
    <div className="max-w-[1200px] mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Staff</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-wrap md:flex-nowrap md:space-x-4 items-stretch">
            {/* Left Column */}
            <div className="w-full md:w-1/2">
              <Card className="h-full">
                <CardTitle className="pb-4 border-b px-6">
                  Personal Information
                </CardTitle>
                <CardContent className="h-full">
                  <div className="space-y-5">
                    {/* Full Name */}
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              {...field}
                              className="h-[44px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Designation */}
                    <FormField
                      control={form.control}
                      name="designation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Designation</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="designation"
                              {...field}
                              className="h-[44px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="staff@example.com"
                              {...field}
                              className="h-[44px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password / Temp Link */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Password"
                              {...field}
                              className="h-[44px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
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
              Update Staff
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
