"use client";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
// import { useDeletePartnerMutation } from '@/store/features/admin/partnerApi'; // example
import { Edit, Trash } from "lucide-react";
import React from "react";

export default function PartnerList({ partners, handleEditClick, refetch }) {
  return (
    <div className="mt-6 space-y-4">
      {partners?.length > 0 &&
        partners.map((partner, i) => (
          <PartnerCard
            partner={partner}
            key={i}
            handleEditClick={handleEditClick}
            refetch={refetch}
          />
        ))}
    </div>
  );
}

const PartnerCard = ({ partner, handleEditClick, refetch }) => {
  const { name, position, email, phone, barAssociation, licenseNo } = partner;
  // const [deletePartner] = useDeletePartnerMutation();

  const handleDeleteClick = async (partnerId) => {
    try {
      // const res = await deletePartner(partnerId).unwrap();
      // if (res?.success) {
      //   showSuccessToast('Partner deleted successfully');
      //   refetch();
      // }
    } catch (error) {
      console.error("Error deleting partner:", error);
      showErrorToast(error?.data?.message || "Failed to delete partner");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-3">
        <h5 className="heading-base font-semibold text-gray-800">{name}</h5>
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => handleEditClick(partner)}
          >
            <Edit size={18} />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDeleteClick(partner?._id)}
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
      <p className="text-sm text-[#6e6e6e]">
        {position} | {email} | {phone} | {barAssociation} | {licenseNo}
      </p>
    </div>
  );
};
