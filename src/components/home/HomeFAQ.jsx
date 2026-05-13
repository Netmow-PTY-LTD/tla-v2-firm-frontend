import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGetCompanyPublicFaqsQuery } from "@/store/firmFeatures/public/websiteFaqPublicApiService";

const FAQ_CATEGORIES = [
  { value: "general", label: "General" },
  { value: "lawyer", label: "For Lawyer" },
];

export default function HomeFAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("general");

  const { data: faqResponse, isLoading } = useGetCompanyPublicFaqsQuery(activeCategory);
  const faqData = faqResponse?.data || [];

  const toggleAccordion = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // delay between each item
        delayChildren: 0.4, // wait before starting
      },
    },
  };

  // 🟢 Each FAQ item animation
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="tla-faq section"
      id="faq"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
    >
      <div className="container">
        <div className="flex justify-center mb-4">
          <span className="bg-orange-500 section-subtitle px-5 py-2 rounded-full">
            FAQ
          </span>
        </div>

        <h2 className="section-title mb-15 text-center">
          Everything you need to know
        </h2>

        {/* Category Tabs */}
        <div className="flex justify-center mb-10 gap-3 flex-wrap">
          {FAQ_CATEGORIES.map((category) => (
            <button
              key={category.value}
              onClick={() => {
                setActiveCategory(category.value);
                setActiveIndex(null);
              }}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.value
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        <motion.div
          className="tla-faq-accordion"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {isLoading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent"></div>
            </div>
          ) : faqData.length > 0 ? (
            faqData?.map((faq, index) => (
              <motion.div
                className="tla-faq-accordion-item"
                key={faq?._id || index}
                variants={cardVariants}
                viewport={{ once: true, amount: 0.2 }}
              >
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
              </motion.div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p>No FAQs available for this category.</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
