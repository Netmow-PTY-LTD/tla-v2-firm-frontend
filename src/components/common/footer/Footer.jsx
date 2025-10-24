"use client";
import React, { useEffect, useState } from "react";
// import styles from "./Footer.module.css";
import Link from "next/link";
import Image from "next/image";
import FooterContact from "./FooterContact";
import LinkedIn from "@/components/icons/LinkedIn";
import Facebook from "@/components/icons/Facebook";
import { useSelector } from "react-redux";
import Twitter from "@/components/icons/Twitter";
import Chevron from "@/components/icons/ChevronDown";
import Cookies from "js-cookie";
import countries from "@/data/countries.json";
import { safeJsonParse } from "@/helpers/safeJsonParse";
import { checkTokenValidity } from "@/helpers/checkTokenValidity";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  let cookieCountry = safeJsonParse(Cookies.get("countryObj"));

  useEffect(() => {
    if (cookieCountry) {
      setSelectedCountry(cookieCountry);
    }
  }, [countries]);

  //console.log('selectedCountry', selectedCountry);

  // console.log('cookieCountry in footer', JSON.parse(cookieCountry));

  const token = useSelector((state) => state.auth.token);

  // const { data: currentUser } = useAuthUserInfoQuery(undefined, {
  //   skip: !token,
  // });

  const isValidToken = checkTokenValidity(token);

  return (
    <>
      {/* <NewsletterSignup /> */}
      <footer
        className="main-footer"
        // style={{ backgroundImage: `url('/assets/img/footer_bg.png')` }}
      >
        <div className="footer-top mb-[60px]">
          <div className="container">
            <div className="footer-top-widgets flex flex-wrap justify-between">
              <div className="max-w-full w-full pr-0 mt-4 lg:mt-0">
                <div className="flex flex-wrap justify-between gap-[30px] md:gap-10">
                  <div className="footer-widget w-[calc(50%-15px)] md:w-auto">
                    <h5>Navigate</h5>
                    <ul>
                      <li>
                        <Link
                          href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/about`}
                        >
                          About TheLawApp
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/contact`}
                        >
                          Contact
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://press.thelawapp.com.au/"
                          target="_blank"
                        >
                          Press
                        </Link>
                      </li>
                      {/* <li>
                        <Link href="https://www.youtube.com/" target="_blank">
                          Tutorials
                        </Link>
                      </li> */}
                    </ul>
                  </div>
                  <div className="footer-widget w-[calc(50%-15px)] md:w-auto">
                    <h5>For Clients</h5>
                    <ul>
                      <li>
                        <Link
                          href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/login`}
                        >
                          Find Lawyers
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/how-it-works/clients`}
                        >
                          How IT Works
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/login`}
                        >
                          Login Client
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-widget w-[calc(50%-15px)] md:w-auto">
                    <h5>For Lawyers</h5>
                    <ul>
                      <li>
                        <Link
                          href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/how-it-works/lawyers`}
                        >
                          How It Works
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/register`}
                        >
                          Join as a Lawyer
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/pricing`}
                        >
                          Pricing
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-widget w-[calc(50%-15px)] md:w-auto">
                    <h5>Other Pages</h5>
                    <ul>
                      <li>
                        <Link
                          href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/faq`}
                        >
                          FAQs
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/disclaimer`}
                        >
                          Disclaimer
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/privacy-policy`}
                        >
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/terms`}
                        >
                          Terms of Use
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/trust-and-quality`}
                        >
                          Trust and Quality
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-widget w-[calc(50%-15px)] md:w-auto text-right">
                    <h5 style={{ marginBottom: "25px" }}>Need help ?</h5>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/contact`}
                      className="btn-default btn-primary"
                    >
                      Contact Us
                    </Link>
                    <div className="footer-social-icon mt-4 flex item-center gap-3 justify-end">
                      <Link
                        href="https://x.com/TheLawAppOnline"
                        className="twitter"
                        target="_blank"
                      >
                        <Twitter width={20} height={20} />
                      </Link>
                      <Link
                        href="https://www.facebook.com/thelawapp"
                        className="fb"
                        target="_blank"
                      >
                        <Facebook width={22} height={22} />
                      </Link>
                      <Link
                        href="https://www.linkedin.com/in/the-law-app-22b048166/"
                        className="linkedin"
                        target="_blank"
                      >
                        <LinkedIn width={22} height={22} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <FooterContact /> */}
        <div className="footer-bottom">
          <div className="container">
            <div className="footer-bottom-wrapper">
              <div className="flex flex-wrap justify-between gap-4">
                <div className="footer-copyright text-center">
                  <p>
                    Copyright &copy; {new Date().getFullYear()}{" "}
                    <Link href="/" className="text-[var(--primary-color)]">
                      TheLawApp.
                    </Link>
                  </p>
                </div>
                <div className="footer-social flex lg:justify-end">
                  <div className="flex items-center gap-4">
                    <div className="footer-bottom-menu">
                      <ul className="flex items-center gap-3">
                        <li>
                          <Link
                            href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/disclaimer`}
                          >
                            Disclaimer
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/privacy-policy`}
                          >
                            Privacy Policy
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/terms`}
                          >
                            Terms & Use
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
