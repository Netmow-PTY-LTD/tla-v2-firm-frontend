"use client";
import MainLayout from "@/components/layouts/MainLayout";
import { useParams } from "next/navigation";
import React from "react";

export default function CompanyProfile() {
  const params = useParams();
  const { slug } = params;

  return (
    <MainLayout>
      <div className="container">CompanyProfile {slug}</div>
    </MainLayout>
  );
}
