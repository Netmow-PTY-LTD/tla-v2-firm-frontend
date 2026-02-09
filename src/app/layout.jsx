import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../store/provider";
import Header from "@/components/common/header/Header";
import { Toaster } from "sonner";

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
  title: "Find a Lawyer | Hire a Lawyer | The Law App Online | Company The Law App",
  description:
    "The Law App is a complete online marketplace for people to search for lawyers at a price they can afford and for lawyers to build an online presence to find clients without the need for heavy marketing expenses. We match clients to lawyers directly based on their field of expertise and allow fair bidding to reach the right price.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/assets/img/logo.webp",
  },
  openGraph: {
    title: "Find a Lawyer | Hire a Lawyer | The Law App Online | Company The Law App",
    description:
      "The Law App is a complete online marketplace for people to search for lawyers at a price they can afford and for lawyers to build an online presence to find clients without the need for heavy marketing expenses. We match clients to lawyers directly based on their field of expertise and allow fair bidding to reach the right price.",
    url: "https://company-thelawapp.netlify.app",
    siteName: "Company The Law App",
    images: [
      {
        url: "/assets/img/logo.webp",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <ReduxProvider>{children}</ReduxProvider>
        <Toaster/>
      </body>
    </html>
  );
}
