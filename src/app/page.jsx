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
} from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import { checkTokenValidity } from "@/helpers/checkTokenValidity";
import Image from "next/image";

// Tailwind is available by default in this canvas preview environment.
// This component renders a single-page landing with built-in Login/Register modals.

const Feature = ({ icon: Icon, title, children }) => (
  <div className="p-6 bg-white rounded-2xl shadow-sm border">
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 rounded-xl bg-gray-100">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed">{children}</p>
  </div>
);

const Modal = ({ open, onClose, title, children }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-semibold">{title}</h3>
            <button
              className="p-2 rounded-lg hover:bg-gray-100"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Input = ({ label, type = "text", ...props }) => (
  <label className="block mb-3">
    <span className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </span>
    <input
      type={type}
      className="w-full rounded-xl border px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20"
      {...props}
    />
  </label>
);

const Select = ({ label, children, ...props }) => (
  <label className="block mb-3">
    <span className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </span>
    <select
      className="w-full rounded-xl border px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20"
      {...props}
    >
      {children}
    </select>
  </label>
);

export default function LawListingHome() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const token = Cookies.get("token");
  const validToken = checkTokenValidity(token);
  // const { data: currentUser, isLoading: isCurrentUserLoading } =
  //   useGetFirmUserInfoQuery(undefined, {
  //     skip: !token,
  //   });

  return (
    <div className="font-sans antialiased">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="/assets/img/company-logo.png"
                alt="TLA Logo"
                width={166}
                height={40}
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-700">
            <a href="#why" className="hover:text-black">
              Why List
            </a>
            <a href="#how" className="hover:text-black">
              How It Works
            </a>
            <a href="#features" className="hover:text-black">
              Features
            </a>
            <a href="#faq" className="hover:text-black">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-2">
            {token ? (
              <Link
                href="/dashboard"
                className="px-3 py-2 text-sm rounded-xl bg-black text-white hover:bg-black/90 flex items-center gap-2"
              >
                <User className="w-4 h-4" /> Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href={"/login"}
                  className="px-3 py-2 text-sm rounded-xl border hover:bg-gray-50 flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" /> Login
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-2 text-sm rounded-xl bg-black text-white hover:bg-black/90 flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" /> Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
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
                href="/create-listing"
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
      </section>

      {/* Why List */}
      <section id="why" className="bg-gray-50 border-t">
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
      </section>

      {/* How It Works */}
      <section id="how" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">How it works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border">
              <div className="text-sm text-gray-500">Step 1</div>
              <h3 className="text-lg font-semibold mb-2">
                Create your profile
              </h3>
              <p className="text-gray-600 text-sm">
                Add practice areas, locations, languages, fees and
                certifications. Import from LinkedIn in seconds.
              </p>
            </div>
            <div className="p-6 rounded-2xl border">
              <div className="text-sm text-gray-500">Step 2</div>
              <h3 className="text-lg font-semibold mb-2">
                Publish & get discovered
              </h3>
              <p className="text-gray-600 text-sm">
                Our directory and search engine optimization drive relevant
                traffic to your page.
              </p>
            </div>
            <div className="p-6 rounded-2xl border">
              <div className="text-sm text-gray-500">Step 3</div>
              <h3 className="text-lg font-semibold mb-2">
                Convert with smart intake
              </h3>
              <p className="text-gray-600 text-sm">
                Leads arrive via secure messaging. Auto‑responses and scheduling
                reduce back‑and‑forth.
              </p>
            </div>
          </div>
          <div className="mt-8 flex gap-3">
            <Link
              href="/register"
              className="px-5 py-3 rounded-xl bg-black text-white hover:bg-black/90"
            >
              Start free
            </Link>
            <Link
              href="/login"
              className="px-5 py-3 rounded-xl border hover:bg-gray-50"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Bullets */}
      <section id="features" className="bg-gray-50 border-y">
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
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Ready to list your firm?
          </h2>
          <p className="text-gray-600 mt-2">
            Join top lawyers and companies growing with LawList.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/register"
              className="px-6 py-3 rounded-xl bg-black text-white hover:bg-black/90"
            >
              Create free listing
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 rounded-xl border hover:bg-gray-50"
            >
              I already have an account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Building2 className="w-5 h-5" /> LawList
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black">
              Terms
            </a>
            <a href="#" className="hover:text-black">
              Privacy
            </a>
            <a href="#faq" className="hover:text-black">
              FAQ
            </a>
          </div>
          <div>© {new Date().getFullYear()} LawList. All rights reserved.</div>
        </div>
      </footer>

      {/* Login Modal */}
      <Modal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        title="Welcome back"
      >
        <form className="space-y-3">
          <Input label="Email" type="email" placeholder="you@firm.com" />
          <Input label="Password" type="password" placeholder="••••••••" />
          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" className="rounded" /> Remember me
            </label>
            <a href="#" className="text-gray-700 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="button"
            className="w-full py-2.5 rounded-xl bg-black text-white hover:bg-black/90"
          >
            Login
          </button>
          <p className="text-xs text-center text-gray-500">
            New here?{" "}
            <button
              type="button"
              onClick={() => {
                setLoginOpen(false);
                setRegisterOpen(true);
              }}
              className="underline"
            >
              Create an account
            </button>
          </p>
        </form>
      </Modal>

      {/* Register Modal */}
      <Modal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        title="Create your free listing"
      >
        <form className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input label="First name" placeholder="Jane" />
            <Input label="Last name" placeholder="Doe" />
          </div>
          <Input label="Firm / Company name" placeholder="Acme Legal" />
          <Select label="Account type">
            <option value="lawfirm">Law Firm</option>
            <option value="company">Company</option>
          </Select>
          <Input label="Email" type="email" placeholder="you@firm.com" />
          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
          />
          <div className="text-xs text-gray-500">
            By creating an account you agree to our{" "}
            <a href="#" className="underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </div>
          <button
            type="button"
            className="w-full py-2.5 rounded-xl bg-black text-white hover:bg-black/90"
          >
            Create account
          </button>
        </form>
      </Modal>
    </div>
  );
}

// import MainLayout from "@/components/layouts/MainLayout";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <MainLayout>
//       <div className="flex min-h-[calc(100vh-69px)] flex-col items-center justify-center p-24">
//         <h1 className="text-5xl font-bold">Welcome to Company Profile</h1>
//         <div className="flex gap-3 mt-5">
//           <Link
//             href="/register"
//             className="btn-default bg-[var(--color-black)] no-underline"
//           >
//             Register
//           </Link>
//           <Link
//             href="/login"
//             className="btn-default bg-[var(--color-black)] no-underline"
//           >
//             Login
//           </Link>
//         </div>
//       </div>
//     </MainLayout>
//   );
// }
