import React, { Suspense } from "react";
import Firm from "./components/firm/Firm";
import Licenses from "./components/lisenses/Licenses";
import { Loader } from "lucide-react";
import { DynamicAccordion } from "@/components/common/components/AcordionComponent";
import ManagingPartner from "./components/managingPartner/ManagingPartner";
import BillingAndTax from "./components/billingTax/BillingAndTax";
import Media from "./components/media/Media";
import Locations from "./components/locations/Locations";



export default function DashboardSettings() {
const accordionItems = [
  { id: "firm", title: "Firm", content: <Firm /> },
  { id: "licenses", title: "Licenses & Credentials", content: <Licenses /> },
  { id: "managing-partner", title: "Managing Partner", content: <ManagingPartner /> },
  { id: "billing-tax", title: "Billing & Tax Info", content: <BillingAndTax /> },
  { id: "media", title: "Photos & Videos", content: <Media /> },
  { id: "locations", title: "Locations", content: <Locations /> },
];

  return (
    <div>
    
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-10">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
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
