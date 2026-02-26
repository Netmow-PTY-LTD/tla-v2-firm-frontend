"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  ShieldCheck,
  BarChart3,
  Users2,
  Megaphone,
  Globe2,
  MessageSquare,
  DollarSign,
  CheckCircle2,
  X,
  LogIn,
  UserPlus,
  User,
  Home,
  Gavel,
  Building,
  Square,
  SquareMenu,
} from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import { checkTokenValidity } from "@/helpers/checkTokenValidity";
import Image from "next/image";
import HeroHome from "@/components/home/HeroHome";
import HomeFeatures from "@/components/home/HomeFeatures";
import HomeListingBenefits from "@/components/home/HomeListingBenefits";
import HomeLawFirmsList from "@/components/home/HomeLawFirmsList";
import HomeCTA from "@/components/home/HomeCTA";
import Footer from "@/components/home/Footer";
import HomeFAQ from "@/components/home/HomeFAQ";
import "@/styles/main.css";
import HomeActionBanner from "@/components/home/HomeActionBanner";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import MainLayout from "@/components/layouts/MainLayout";
import HomeHowItWorks from "@/components/home/HomeHowItWorks";

export default function LawListingHome() {
  // const token = Cookies.get("firm_token");
  // const validToken = checkTokenValidity(token);
  // const { data: currentUser, isLoading: isCurrentUserLoading } =
  //   useGetFirmUserInfoQuery(undefined, {
  //     skip: !token,
  //   });

  console.log('Version 1.0.3')

  return (
    <MainLayout>
      <HeroHome />
      <HomeFeatures />
      <HomeListingBenefits />
      <HomeHowItWorks />
      <HomeActionBanner />
      <HomeLawFirmsList />
      <HomeTestimonials />
      <HomeFAQ />
      <HomeCTA />
      <Footer />
      {/* Hero */}
      {/* <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 mb-4">
              <CheckCircle2 className="w-4 h-4" />
              Free to create a profile
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              List your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500">
                law firm
              </span>{" "}
              or{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500">
                company{" "}
              </span>
              and get clients faster.
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              A modern directory built for legal professionals and service
              companies. Showcase expertise, collect reviews, and convert
              inquiries with built‑in intake tools.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="px-5 py-3 rounded-xl bg-black text-white hover:bg-black/90"
              >
                Create free listing
              </Link>
              <Link
                href="#how"
                className="px-5 py-3 rounded-xl border hover:bg-gray-50"
              >
                See how it works
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative">
              <div className="absolute -inset-6 blur-3xl bg-gradient-to-tr from-gray-200 to-gray-100 rounded-3xl" />
              <div className="relative bg-white rounded-3xl shadow-xl border p-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-4 rounded-2xl bg-gray-50 border">
                    <div className="text-xs text-gray-500">Monthly Views</div>
                    <div className="text-2xl font-semibold">12,480</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-50 border">
                    <div className="text-xs text-gray-500">Leads</div>
                    <div className="text-2xl font-semibold">312</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-50 border">
                    <div className="text-xs text-gray-500">
                      Avg. Response Time
                    </div>
                    <div className="text-2xl font-semibold">2h 15m</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-50 border">
                    <div className="text-xs text-gray-500">Review Score</div>
                    <div className="text-2xl font-semibold">4.9/5</div>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 text-sm">
                  Firms on LawList see more qualified inquiries within the first
                  30 days. Powerful profiles, verified reviews and smart intake
                  — no code needed.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Why List */}
      {/* <section id="why" className="bg-gray-50 border-t">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Why list your law firm or company here?
          </h2>
          <p className="text-gray-600 mb-10 max-w-3xl">
            We designed LawList to help legal teams grow without bloated
            marketing spend. Your profile is optimized for search, built to
            convert, and backed by tools that save time.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Feature icon={Megaphone} title="More Visibility">
              SEO‑ready profiles with schema markup, location pages, and
              practice‑area tags help you rank and get found by clients nearby.
            </Feature>
            <Feature icon={Users2} title="Qualified Leads">
              Smart intake forms filter matters by practice area, urgency, and
              budget so you spend time on cases that fit.
            </Feature>
            <Feature icon={ShieldCheck} title="Trust & Compliance">
              Verified badges, document upload for certificates, and
              privacy‑first messaging build trust and keep you compliant.
            </Feature>
            <Feature icon={BarChart3} title="Analytics & Insights">
              Track views, clicks, conversion rates, and lead sources. Export
              reports for your partners or marketing team.
            </Feature>
            <Feature icon={Globe2} title="Multi‑location Boost">
              Showcase multiple offices, languages, and jurisdictions. Perfect
              for firms expanding across states or countries.
            </Feature>
            <Feature icon={DollarSign} title="Flexible Plans">
              Start free. Upgrade to highlight your profile, unlock
              pay‑per‑lead, and add intake automations when you’re ready.
            </Feature>
          </div>
        </div>
      </section> */}

      {/* Feature Bullets */}
      {/* <section id="features" className="bg-gray-50 border-y">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Everything you need to win more matters
          </h2>
          <ul className="grid md:grid-cols-2 gap-4 text-gray-700 text-sm">
            {[
              "Verified reviews & testimonials",
              "Practice‑area & location filters",
              "Secure client messaging",
              "Lead qualification & intake forms",
              "Calendar links & availability",
              "Team member profiles",
              "Attachments for certificates & licenses",
              "Analytics dashboard & CSV export",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 p-4 bg-white rounded-2xl border"
              >
                <CheckCircle2 className="w-5 h-5 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section> */}

      {/* Footer */}
      {/* <footer className="border-t bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Link href="/">
              <Image
                src="/assets/img/company-logo.png"
                alt="TLA Logo"
                width={166}
                height={40}
              />
            </Link>
          </div>
          <div className="flex gap-6">
            <Link
              href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/terms`}
              className="hover:text-black"
            >
              Terms
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/privacy-policy`}
              className="hover:text-black"
            >
              Privacy
            </Link>
            <Link href="#faq" className="hover:text-black">
              FAQ
            </Link>
          </div>
          <div>© {new Date().getFullYear()} LawList. All rights reserved.</div>
        </div>
      </footer> */}
    </MainLayout>
  );
}
