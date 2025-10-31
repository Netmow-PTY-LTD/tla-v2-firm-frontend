"use client";
import Link from "next/link";
import React from "react";

export default function LawFirmDashboardFooter() {
  return (
    <footer className="db-footer bg-[#F3F3F3]">
      <div className="container">
        <p className="font-semibold">
          Copyright &copy; {new Date().getFullYear()} |{" "}
          <Link href="/dashboard">TheLawApp</Link>.
        </p>
      </div>
    </footer>
  );
}
