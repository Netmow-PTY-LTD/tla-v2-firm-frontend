"use client";

import { useState } from "react";

import AddPartnerModal from "./components/AddPartnerModal";
import PartnerList from "./components/PartnerList";
import {
  useCurrentUserInfoQuery,
  useGetFirmUserInfoQuery,
} from "@/store/firmFeatures/firmAuth/firmAuthApiService";
import { useGetPartnersListQuery } from "@/store/firmFeatures/partner/partnerApiService";
import EditPartnerModal from "./components/EditPartnerModal";
import permissions from "@/data/permissions";

export default function ManagingPartner() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);

  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useCurrentUserInfoQuery();

  console.log("currentUser in Firm", currentUser);

  const addPartnerId = permissions?.find(
    (perm) => perm.slug === "add-new-managing-partner"
  )._id;

  const hasAddPermissions =
    currentUser?.data?.role === "staff"
      ? currentUser?.data?.permissions?.some((perm) => {
          const idMatch =
            perm?.pageId?._id === addPartnerId || perm?._id === addPartnerId;
          return idMatch && perm?.permission === true;
        })
      : true;

  const updatePartnerId = permissions?.find(
    (perm) => perm.slug === "update-managing-partner"
  )._id;

  const hasUpdatePermissions =
    currentUser?.data?.role === "staff"
      ? currentUser?.data?.permissions?.some((perm) => {
          const idMatch =
            perm?.pageId?._id === updatePartnerId ||
            perm?._id === updatePartnerId;
          return idMatch && perm?.permission === true;
        })
      : true;

  const { data: companyInfo, isLoading: isCompanyInfoLoading } =
    useGetFirmUserInfoQuery();

  const {
    data: partners,
    isLoading: isPartnersLoading,
    refetch: refetchPartners,
  } = useGetPartnersListQuery(companyInfo?.data?._id, {
    skip: isCompanyInfoLoading,
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
        {hasAddPermissions && (
          <AddPartnerModal refetchPartners={refetchPartners} />
        )}
      </div>
      <PartnerList
        partners={partners?.data || []}
        handleEditClick={handleEditClick}
        refetchPartners={refetchPartners}
        firmId={companyInfo?.data?._id}
        hasUpdatePermissions={hasUpdatePermissions}
      />
      {hasUpdatePermissions && (
        <EditPartnerModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          selectedPartner={selectedPartner}
          refetchPartners={refetchPartners}
        />
      )}
    </div>
  );
}
