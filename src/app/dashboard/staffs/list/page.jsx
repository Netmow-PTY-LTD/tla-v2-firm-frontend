"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { StaffDataTable } from "../../_components/StaffDataTable";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

const pageSizeOptions = [5, 10, 20];

export default function StaffsList() {
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  const handleDelete = (id) => {
    alert("Staff with ID " + id + " has been deleted!");
  };

  const columns = [
    // ✅ Name
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },

    // ✅ Role
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <div>{row.getValue("role")}</div>,
    },

    // ✅ Email
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },

    // ✅ Status
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <span
            className={`px-2 py-1 rounded text-xs ${
              status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        );
      },
    },

    // ✅ Last Login
    {
      accessorKey: "lastLogin",
      header: "Last Login",
      cell: ({ row }) => <div>{row.getValue("lastLogin")}</div>,
    },

    // ✅ Actions Dropdown
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const staff = row.original; // row data
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-2 cursor-pointer py-1 px-2">
                <Link
                  href={`/dashboard/staffs/edit/${staff.id}`}
                  className="flex gap-2"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex gap-2 cursor-pointer py-1 px-2 text-red-600"
                onClick={() => handleDelete(staff.id)}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">List of Staffs</h2>
      <StaffDataTable
        data={staffData || []}
        columns={columns}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageSizeOptions={pageSizeOptions}
      />
    </div>
  );
}
