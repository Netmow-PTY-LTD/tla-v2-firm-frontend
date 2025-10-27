import Link from "next/link";
import React from "react";
export default function HomeActionBanner() {
  return (
    <>
      <section className="home-cta section">
        <div className="container">
          <div className="home-cta-content">
            <div className="flex flex-wrap items-center">
              <div className="w-full md:w-1/2">
                <div className="home-cta-text md:pr-5 lg:pr-20">
                  <h2>Urgent help/ instant consult!</h2>
                  <div className="cta-text">
                    Connect with a lawyer instantly though chat, call, or video
                  </div>
                  <div className="home-cta-button flex flex-wrap gap-2">
                    <Link
                      href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}`}
                      className="btn-default btn-secondary uppercase"
                      target="_blank"
                    >
                      Post a case
                    </Link>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/register`}
                      className="btn-default btn-primary uppercase"
                      target="_blank"
                    >
                      Register as lawyer
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="home-cta-images">
                  <div className="cta-shape"></div>
                  <img
                    src="/assets/img/home-cta-2.png"
                    alt="home cta"
                    className="cta-img-1"
                  />
                  <img
                    src="/assets/img/home-cta.png"
                    alt="home cta"
                    className="cta-img-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
