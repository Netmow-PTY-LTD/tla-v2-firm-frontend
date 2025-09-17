import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CompanyProfileServices({ data }) {
  if (!data?.customService?.length) return null;

  return (
    <section className="py-5 profile-services bg-white rounded-2xl p-6 border border-gray-100 mt-6">
      <div className="flex flex-wrap">
        <div className="w-full">
          <h2 className="text-[var(--primary-color)] font-bold mb-4 profile-heading relative flex items-baseline gap-3">
            <span>Services</span>
          </h2>
          <div className="">
            <Accordion type="single" collapsible className="w-full">
              {data?.customService?.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-base font-medium hover:no-underline">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    <p className="text-base">{item.description}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
