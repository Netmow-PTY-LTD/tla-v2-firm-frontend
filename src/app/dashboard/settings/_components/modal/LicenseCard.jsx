import { ConfirmationModal } from "@/components/common/components/ConfirmationModal";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
import { Button } from "@/components/ui/button";
import { useDeleteLicenseAndCertificationMutation } from "@/store/firmFeatures/certificateLicensesApiService";
import { Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";

export default function LicenseCard({
  license,
  handleOpenEditCoreLicenseModal,
  refetchLicenses,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteLicense] = useDeleteLicenseAndCertificationMutation();

  const handleDeleteLicense = async (licenseId) => {
    try {
      const res = await deleteLicense(licenseId).unwrap();
      console.log("Response after deleting license:", res);
      // Show success message or toast
      if (res?.success) {
        showSuccessToast(res?.message || "License deleted successfully");
        refetchLicenses();
      }
    } catch (error) {
      console.error("Error deleting license:", error);
      showErrorToast(error?.data?.message || "Failed to delete license");
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-lg transition-all">
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col">
          <h5 className="heading-base font-semibold text-gray-800 mb-2">
            {license?.certificationId?.certificationName ||
              "Core Certification / License"}
          </h5>
          <div className="space-y-1">
            <p className="text-sm text-[#6e6e6e]">
              <b>License Number</b>: {license?.licenseNumber} |{" "}
              <b>Valid Until:</b>{" "}
              {license?.validUntil
                ? new Date(license?.validUntil).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "—"}
            </p>
            <p className="text-sm text-[#6e6e6e]">
              <b>Note:</b> {license?.additionalNote || "—"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={() => handleOpenEditCoreLicenseModal(license)}
          >
            <Edit size={18} />
          </button>
          <ConfirmationModal
            onConfirm={() => handleDeleteLicense(license?._id)}
            open={isOpen}
            onOpenChange={setIsOpen}
            description="Do you want to delete your Legal Certifications?"
            trigger={
              <button className="text-red-500 hover:text-red-700 cursor-pointer">
                <Trash2 size={18} />
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
}
