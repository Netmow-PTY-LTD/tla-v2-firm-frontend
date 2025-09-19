import React from "react";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
