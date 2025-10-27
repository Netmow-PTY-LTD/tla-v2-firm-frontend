import React from "react";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import "@/styles/main.css";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }) {
  const pathname = usePathname();
  return (
    <>
      <Header />
      <main>{children}</main>
      {pathname !== "/" && <Footer />}
    </>
  );
}
