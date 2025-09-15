import Header from "@/components/common/header/Header";
import "@/styles/main.css";

export default function AuthLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
