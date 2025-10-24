"use client";
import React, { Suspense } from "react";
import Firm from "./_components/firm/Firm";
import Licenses from "./_components/lisenses/Licenses";
import { Loader } from "lucide-react";
import { DynamicAccordion } from "@/components/common/components/AcordionComponent";
import ManagingPartner from "./_components/managingPartner/ManagingPartner";
import BillingAndTax from "./_components/billingTax/BillingAndTax";
import Media from "./_components/media/Media";
import { CreditSummary } from "./_components/CreditSummary/CreditSummary";
import { TransactionHistory } from "./_components/TransactionHistory/TransactionHistory";
import Locations from "./_components/locations/Locations";
import { useCurrentUserInfoQuery } from "@/store/firmFeatures/firmAuth/firmAuthApiService";
import permissions from "@/data/permissions";

export default function DashboardSettings() {
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useCurrentUserInfoQuery();

  console.log("currentUser in Firm", currentUser);

  const companyPageId = permissions?.find(
    (perm) => perm.slug === "view-company-details"
  )._id;

  const hasCompanyDetailsPermissions =
    currentUser?.data?.role === "staff"
      ? currentUser?.data?.permissions?.some((perm) => {
          const idMatch =
            perm?.pageId?._id === companyPageId || perm?._id === companyPageId;
          return idMatch && perm?.permission === true;
        })
      : true;

  const licensesPageId = permissions?.find(
    (perm) => perm.slug === "view-license-certificates"
  )._id;
  const hasLicensesPermissions =
    currentUser?.data?.role === "staff"
      ? currentUser?.data?.permissions?.some((perm) => {
          const idMatch =
            perm?.pageId?._id === licensesPageId ||
            perm?._id === licensesPageId;
          return idMatch && perm?.permission === true;
        })
      : true;

  const managingPartnerPageId = permissions?.find(
    (perm) => perm.slug === "view-managing-partner"
  )._id;

  const hasManagingPartnerPermissions =
    currentUser?.data?.role === "staff"
      ? currentUser?.data?.permissions?.some((perm) => {
          const idMatch =
            perm?.pageId?._id === managingPartnerPageId ||
            perm?._id === managingPartnerPageId;
          return idMatch && perm?.permission === true;
        })
      : true;

  const billingTaxPageId = permissions?.find(
    (perm) => perm.slug === "view-billing-tax"
  )._id;

  const hasBillingTaxPermissions =
    currentUser?.data?.role === "staff"
      ? currentUser?.data?.permissions?.some((perm) => {
          const idMatch =
            perm?.pageId?._id === billingTaxPageId ||
            perm?._id === billingTaxPageId;
          return idMatch && perm?.permission === true;
        })
      : true;

  const mediaPageId = permissions?.find(
    (perm) => perm.slug === "view-photos-videos"
  )._id;

  const hasMediaPermissions =
    currentUser?.data?.role === "staff"
      ? currentUser?.data?.permissions?.some((perm) => {
          const idMatch =
            perm?.pageId?._id === mediaPageId || perm?._id === mediaPageId;
          return idMatch && perm?.permission === true;
        })
      : true;

  const locationsPageId = permissions?.find(
    (perm) => perm.slug === "view-other-office-locations"
  )._id;

  const hasLocationsPermissions =
    currentUser?.data?.role === "staff"
      ? currentUser?.data?.permissions?.some((perm) => {
          const idMatch =
            perm?.pageId?._id === locationsPageId ||
            perm?._id === locationsPageId;
          return idMatch && perm?.permission === true;
        })
      : true;

  const accordionItems = [
    ...(hasCompanyDetailsPermissions
      ? [
          {
            id: "company-details",
            title: "Company Details",
            content: <Firm />,
          },
        ]
      : []),
    ...(hasLicensesPermissions
      ? [
          {
            id: "licenses",
            title: "Certificates & Licenses",
            content: <Licenses />,
          },
        ]
      : []),
    ...(hasManagingPartnerPermissions
      ? [
          {
            id: "managing-partner",
            title: "Managing Partner",
            content: <ManagingPartner />,
          },
        ]
      : []),
    ...(hasBillingTaxPermissions
      ? [
          {
            id: "billing-tax",
            title: "Billing & Tax Info",
            content: <BillingAndTax currentUser={currentUser} />,
          },
        ]
      : []),
    ...(hasMediaPermissions
      ? [
          {
            id: "media",
            title: "Photos & Videos",
            content: <Media />,
          },
        ]
      : []),
    ...(hasLocationsPermissions
      ? [
          {
            id: "locations",
            title: "Other Office Locations",
            content: <Locations currentUser={currentUser} />,
          },
        ]
      : []),
    // { id: "transaction-history", title: "Transaction History", content: <TransactionHistory /> },
    // { id: "credit-summary", title: "Credit Summary", content: <CreditSummary /> },
  ];

  return (
    <div>
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-10">
            <span className="ml-2 text-sm text-gray-500">
              <Loader /> Loading...
            </span>
          </div>
        }
      >
        <DynamicAccordion items={accordionItems} />
      </Suspense>
    </div>
  );
}
