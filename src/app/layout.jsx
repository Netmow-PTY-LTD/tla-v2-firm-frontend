import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../store/provider";
import Header from "@/components/common/header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Find a Lawyer | Hire a Lawyer | The Law App Online | The Law App",
  description:
    "The Law App is a complete online marketplace for people to search for lawyers at a price they can afford and for lawyers to build an online presence to find clients without the need for heavy marketing expenses. We match clients to lawyers directly based on their field of expertise and allow fair bidding to reach the right price.",
  icons: {
    icon: "/assets/img/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
