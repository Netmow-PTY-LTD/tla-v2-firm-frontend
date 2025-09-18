import React, { Suspense } from "react";
import Firm from "./_components/firm/Firm";
import Licenses from "./_components/lisenses/Licenses";
import { Loader } from "lucide-react";
import { DynamicAccordion } from "@/components/common/components/AcordionComponent";
import ManagingPartner from "./_components/managingPartner/ManagingPartner";
import BillingAndTax from "./_components/billingTax/BillingAndTax";
import Media from "./_components/media/Media";
import Locations from "./_components/locations/Locations";
import { CreditSummary } from "./_components/CreditSummary/CreditSummary";
import { TransactionHistory } from "./_components/TransactionHistory/TransactionHistory";

export default function DashboardSettings() {
  const accordionItems = [
    { id: "company-details", title: "Company Details", content: <Firm /> },
    { id: "licenses", title: "Licenses & Credentials", content: <Licenses /> },
    {
      id: "managing-partner",
      title: "Managing Partner",
      content: <ManagingPartner />,
    },
    {
      id: "billing-tax",
      title: "Billing & Tax Info",
      content: <BillingAndTax />,
    },
    { id: "media", title: "Photos & Videos", content: <Media /> },
    { id: "locations", title: "Locations", content: <Locations /> },
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
