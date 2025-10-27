import { faqData } from "@/data/data";
import React, { useState } from "react";

export default function HomeFAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };
  return (
    <section className="tla-faq section" id="faq">
      <div className="container">
        <div className="flex justify-center mb-4">
          <span className="bg-orange-500 section-subtitle px-5 py-2 rounded-full">
            FAQ
          </span>
        </div>

        <h2 className="section-title mb-15 text-center">
          Everything you need to know
        </h2>
        <div className="tla-faq-accordion">
          {faqData.length > 0 &&
            faqData?.map((faq, index) => (
              <div className="tla-faq-accordion-item" key={faq?.id}>
                <div
                  className="tla-faq-accordion-header"
                  onClick={() => toggleAccordion(index)}
                >
                  <h5>
                    <span>{index + 1}.</span> {faq?.question}
                  </h5>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className={`${index === activeIndex ? "rotate" : ""}`}
                  >
                    <path
                      fill="#575757"
                      d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"
                    />
                  </svg>
                </div>
                <div
                  className={`tla-faq-accordion-body ${
                    index === activeIndex ? "active" : ""
                  }`}
                  dangerouslySetInnerHTML={{ __html: faq?.answer }}
                ></div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
