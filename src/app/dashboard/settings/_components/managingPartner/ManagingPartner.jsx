"use client";

import { useState } from "react";

import AddPartnerModal from "./components/AddPartnerModal";
import PartnerList from "./components/PartnerList";
import { useGetFirmUserInfoQuery } from "@/store/firmFeatures/firmAuth/firmAuthApiService";
import { useGetPartnersListQuery } from "@/store/firmFeatures/partner/partnerApiService";
import EditPartnerModal from "./components/EditPartnerModal";



export default function ManagingPartner() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);

  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetFirmUserInfoQuery();

  const {
    data: partners,
    isLoading: isPartnersLoading,
    refetch: refetchPartners,
  } = useGetPartnersListQuery(currentUser?.data?._id, {
    skip: isCurrentUserLoading,
  });

  //console.log("Partners data in managing partner page", partners);

  const handleEditClick = (service) => {
    setSelectedPartner(service);
    setIsEditModalOpen(true);
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex justify-between items-center gap-5">
        <div>
          <h3 className="text-black font-semibold heading-lg">Your Partners</h3>

          <p className="mt-[10px] text-[#6e6e6e]">
            List the legal Partners you offer so we can connect you with the
            most relevant clients seeking your expertise.
          </p>
        </div>
        {/*  Partners modal */}
        <AddPartnerModal refetchPartners={refetchPartners} />
      </div>
      <PartnerList
        partners={partners?.data || []}
        handleEditClick={handleEditClick}
        refetchPartners={refetchPartners}
        firmId={currentUser?.data?._id}
      />
      <EditPartnerModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        selectedPartner={selectedPartner}
        refetchPartners={refetchPartners}
      />
    </div>
  );
}
