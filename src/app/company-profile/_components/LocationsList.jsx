import React from "react";

const offices = [
  {
    title: "Sydney (Head Office)",
    address:
      "MinterEllison Building Level 40, Governor Macquarie Tower 1 Farrer Place, Sydney NSW 2000",
  },
  {
    title: "Melbourne",
    address: "Level 22, 101 Collins Street, Melbourne VIC 3000",
  },
  {
    title: "Brisbane",
    address: "Level 10, 300 Queen Street, Brisbane QLD 4000",
  },
  {
    title: "Canberra",
    address: "Level 10, 19 London Circuit, Canberra ACT 2601",
  },
];

export default function LocationsList() {
  return (
    <section className="py-[50px]">
      <div className="container">
        <h2 className="profile-heading text-[36px] font-semibold mb-8 text-[var(--color-black)]">
          Locations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Example Location Card */}
          {offices.map((office, index) => (
            <div
              className="bg-[#F8F8F8] rounded-[8px] overflow-hidden relative w-full"
              key={index}
            >
              <div className="p-3 flex flex-col gap-3">
                <div className="pl-9">
                  <h5 className="text-black text-lg font-bold">
                    {office.title}
                  </h5>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <path
                        d="M12.0527 21.825C11.8194 21.825 11.5861 21.7833 11.3527 21.7C11.1194 21.6167 10.9111 21.4917 10.7277 21.325C9.6444 20.325 8.68607 19.35 7.85273 18.4C7.0194 17.45 6.32373 16.5293 5.76573 15.638C5.20773 14.7467 4.78273 13.8883 4.49073 13.063C4.19873 12.2377 4.05273 11.45 4.05273 10.7C4.05273 8.2 4.85707 6.20833 6.46573 4.725C8.0744 3.24167 9.93673 2.5 12.0527 2.5C14.1687 2.5 16.0314 3.24167 17.6407 4.725C19.2501 6.20833 20.0541 8.2 20.0527 10.7C20.0527 11.45 19.9071 12.2377 19.6157 13.063C19.3244 13.8883 18.8994 14.7467 18.3407 15.638C17.7821 16.5293 17.0861 17.45 16.2527 18.4C15.4194 19.35 14.4611 20.325 13.3777 21.325C13.1944 21.4917 12.9861 21.6167 12.7527 21.7C12.5194 21.7833 12.2861 21.825 12.0527 21.825ZM12.0527 12.5C12.6027 12.5 13.0737 12.3043 13.4657 11.913C13.8577 11.5217 14.0534 11.0507 14.0527 10.5C14.0521 9.94933 13.8564 9.47867 13.4657 9.088C13.0751 8.69733 12.6041 8.50133 12.0527 8.5C11.5014 8.49867 11.0307 8.69467 10.6407 9.088C10.2507 9.48133 10.0547 9.952 10.0527 10.5C10.0507 11.048 10.2467 11.519 10.6407 11.913C11.0347 12.307 11.5054 12.5027 12.0527 12.5Z"
                        fill="#00C3C0"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-black text-base font-normal leading-[1.3]">
                      {office.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
