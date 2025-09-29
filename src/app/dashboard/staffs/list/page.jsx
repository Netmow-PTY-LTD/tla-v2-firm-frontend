"use client";
import React, { use, useState } from "react";
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

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  useDeleteStaffMutation,
  useGetFirmWiseStaffListQuery,
} from "@/store/firmFeatures/staff/staffApiService";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/firmFeatures/firmAuth/firmAuthSlice";


const pageSizeOptions = [5, 10, 20];

export default function StaffsList() {
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  const currentuser = useSelector(selectCurrentUser)
  // Only pass firmId if currentuser exists and role is "firm"
  const queryParams = currentuser?.role === "firm" ? { firmId: currentuser._id } : undefined;

  const {
    data: staffList,
    isLoading,
    isError,
  } = useGetFirmWiseStaffListQuery(queryParams);

  //console.log("Staff List Data:", staffList);
  const columns = [
    // ✅ Name
    {
      accessorKey: "fullName",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
    },

    // ✅ Role
    {
      accessorKey: "designation",
      header: "Designation",
      cell: ({ row }) => <div>{row.getValue("designation")}</div>,
    },

    // ✅ Role
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const original = row.original
        return <div>{original?.userId?.role}</div>
      },
    },

    // ✅ Email
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const original = row.original


        return <div>{original?.userId?.email}</div>
      },
    },

    // ✅ Status
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <span
            className={`px-2 py-1 rounded text-xs capitalize ${status?.toLowerCase() === "active"
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
      cell: ({ row }) => {
        const original = row.original


        return <div>{original?.userId?.lastSeen ?? "-"}</div>
      },
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
                  href={`/dashboard/staffs/edit/${staff?.userId?._id}`}
                  className="flex gap-2"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex gap-2 cursor-pointer py-1 px-2 text-red-600"
                onClick={() => handleDelete(staff?.userId?._id)}
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

  const [deleteStaff] = useDeleteStaffMutation();
  const handleDelete = async (id) => {
    try {
      const res = await deleteStaff({
        staffId: id,
      }).unwrap();
      console.log("Delete response:", res);
      if (res?.success) {
        showSuccessToast(res?.message || "Staff deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting staff:", error);
      // Optionally show an error toast here
      showErrorToast(
        "Error deleting staff: " + error?.data?.message || error.error
      );
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">List of Staffs</h2>
      <StaffDataTable
        data={staffList?.data || []}
        columns={columns}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageSizeOptions={pageSizeOptions}
      />
    </div>
  );
}
