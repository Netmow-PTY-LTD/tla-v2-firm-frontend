"use client";
import { ConfirmationModal } from "@/components/common/components/ConfirmationModal";
import { showErrorToast, showSuccessToast } from "@/components/common/toasts";
import { userDummyImage } from "@/data/data";
import { useDeletePartnerMutation } from "@/store/firmFeatures/partner/partnerApiService";
import { Edit, Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function PartnerList({
  partners,
  handleEditClick,
  refetchPartners,
  firmId,
}) {

  return (
    <div className="mt-6 space-y-4">
      {partners?.length > 0 ? (
        partners.map((partner, i) => (
          <PartnerCard
            partner={partner}
            key={i}
            handleEditClick={handleEditClick}
            refetchPartners={refetchPartners}
            firmId={firmId}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">
          Currently there is no partner.
        </p>
      )}
    </div>
  );
}

const PartnerCard = ({ partner, handleEditClick, refetchPartners, firmId }) => {
  const { name, position, email, phone } = partner;
  const [isOpen, setIsOpen] = useState(false)
  const [deletePartner] = useDeletePartnerMutation();

  const handleDeletePartner = async (partnerId) => {
    try {
      const res = await deletePartner({ firmId, partnerId }).unwrap();
      if (res?.success) {
        showSuccessToast(res?.message || "Partner deleted successfully");
        refetchPartners();
      }
    } catch (error) {
      console.error("Error deleting partner:", error);
      showErrorToast(error?.data?.message || "Failed to delete partner");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Image
            src={partner?.logo || userDummyImage}
            alt={name || "Partner Image"}
            width={50}
            height={50}
            className="w-12 h-12 object-cover rounded-full border border-gray-300"
          />
          <div className="flex flex-col gap-1">
            <h5 className="heading-base font-semibold text-gray-800">{name}</h5>
            <p className="text-sm text-[#6e6e6e]">
              {position} | {email} | {phone}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={() => handleEditClick(partner)}
          >
            <Edit size={18} />
          </button>

          <ConfirmationModal
            onConfirm={() => handleDeletePartner(partner?._id)}
            open={isOpen}
            onOpenChange={setIsOpen}
            description="You Want to to delete your Partner "
            trigger={

              <button
                className="text-red-500 hover:text-red-700 cursor-pointer"

              >
                <Trash2 size={18} />
              </button>
            }
          />

        </div>
      </div>
    </div>
  );
};
