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
import { MoreHorizontal, Pencil, ShieldOff, Trash2 } from "lucide-react";
import { StaffDataTable } from "../../_components/StaffDataTable";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  useDeleteStaffMutation,
  useGetFirmWiseStaffListQuery,
} from "@/store/firmFeatures/staff/staffApiService";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";
import AccessDenied from "@/components/AccessDenied";
import permissions from "@/data/permissions";

const pageSizeOptions = [5, 10, 20];

export default function StaffsList() {
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  const pageId = permissions?.find((perm) => perm.slug === "list-of-staff")._id;

  const currentUser = useSelector((state) => state.auth.user);
  console.log("Current User from Redux:", currentUser);

  const {
    data: staffList,
    isLoading: isStaffListLoading,
    isError,
  } = useGetFirmWiseStaffListQuery();

  console.log("Staff List Data:", staffList);
  const columns = [
    // ✅ Name
    {
      accessorKey: "fullName",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
    },

    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl = row.getValue("image"); // Assuming this is the image URL or path

        return imageUrl ? (
          <img
            src={imageUrl}
            alt="Staff"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
            N/A
          </div>
        );
      },
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
        const original = row.original;
        return <div>{original?.userId?.role}</div>;
      },
    },

    // ✅ Email
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const original = row.original;

        return <div>{original?.userId?.email}</div>;
      },
    },

    // ✅ Status

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status"); // From StaffProfile
        const accountStatus =
          row.original?.userId?.accountStatus?.toLowerCase(); // From FirmUser

        const isActive = accountStatus === "active";

        return (
          <span
            className={`px-2 py-1 rounded text-xs capitalize ${
              isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status || (isActive ? "Active" : "Inactive")}
          </span>
        );
      },
    },

    // ✅ Last Login
    {
      accessorKey: "lastLogin",
      header: "Last Login",
      cell: ({ row }) => {
        const original = row.original;

        return <div>{original?.userId?.lastSeen ?? "-"}</div>;
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

  if (isStaffListLoading) {
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
    currentUser?.role === "staff"
      ? currentUser?.permissions?.some((perm) => {
          const idMatch = perm?.pageId?._id === pageId || perm?._id === pageId;
          return idMatch && perm?.permission === true;
        })
      : true;

  if (!hasPageAccess) {
    return <AccessDenied />;
  }

  return (
    <div className="max-w-[1200px] mx-auto bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-black font-semibold heading-lg mb-6">
        List of Staffs
      </h2>
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
