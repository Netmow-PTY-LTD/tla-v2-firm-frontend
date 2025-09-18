
import React, { useState } from "react";
import Link from "next/link";
import FormWrapper from "@/components/form/FormWrapper";
import TextInput from "@/components/form/TextInput";
import SelectInput from "@/components/form/SelectInput";
import InputCombobox from "@/components/form/ComboboxInput";
import { lawFirmRegStepOneSchema } from "@/schema/auth/authValidation.schema";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, setFormData } from "@/store/features/auth/lawFirmRegistrationSlice";

export const demoLocations = [
  {
    countryId: "1",
    slug: "germany",
    name: "Germany",
    cities: [
      {
        id: "c1",
        name: "Berlin",
        zipcodes: [
          {
            _id: "z1",
            zipcode: "10115",
            postalCode: "10115",
            latitude: 52.532,
            longitude: 13.384,
            address: "Berlin Central",
          },
          {
            _id: "z2",
            zipcode: "10117",
            postalCode: "10117",
            latitude: 52.52,
            longitude: 13.404,
            address: "Berlin Mitte",
          },
        ],
      },
      {
        id: "c2",
        name: "Hamburg",
        zipcodes: [
          {
            _id: "z3",
            zipcode: "20095",
            postalCode: "20095",
            latitude: 53.55,
            longitude: 10.0,
            address: "Hamburg Altstadt",
          },
        ],
      },
    ],
  },
  {
    countryId: "2",
    slug: "usa",
    name: "United States",
    cities: [
      {
        id: "c3",
        name: "New York",
        zipcodes: [
          {
            _id: "z4",
            zipcode: "10001",
            postalCode: "10001",
            latitude: 40.75,
            longitude: -73.997,
            address: "Manhattan",
          },
        ],
      },
      {
        id: "c4",
        name: "San Francisco",
        zipcodes: [
          {
            _id: "z5",
            zipcode: "94103",
            postalCode: "94103",
            latitude: 37.774,
            longitude: -122.419,
            address: "SoMa District",
          },
        ],
      },
    ],
  },
  {
    countryId: "3",
    slug: "canada",
    name: "Canada",
    cities: [
      {
        id: "c5",
        name: "Toronto",
        zipcodes: [
          {
            _id: "z6",
            zipcode: "M5H 2N2",
            postalCode: "M5H 2N2",
            latitude: 43.653,
            longitude: -79.383,
            address: "Downtown Toronto",
          },
        ],
      },
      {
        id: "c6",
        name: "Vancouver",
        zipcodes: [
          {
            _id: "z7",
            zipcode: "V6B 1V2",
            postalCode: "V6B 1V2",
            latitude: 49.282,
            longitude: -123.117,
            address: "Gastown",
          },
        ],
      },
    ],
  },
];

export default function LawFirmRegisterStepOne() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.lawFirmRegistration.formData);
  const countries = demoLocations.map((c) => ({
    value: c.slug,
    label: c.name,
  }));

  const cities =
    demoLocations
      .find((c) => c.slug === selectedCountry)
      ?.cities.map((city) => ({ value: city.id, label: city.name })) || [];

  const zipcodes =
    demoLocations
      .find((c) => c.slug === selectedCountry)
      ?.cities.find((city) => city.id === selectedCity)
      ?.zipcodes.map((z) => ({ value: z._id, label: z.zipcode })) || [];



  const defaultValues = {
    firmName: formData.firmName,
    registrationNumber: formData.registrationNumber,
    yearEstablished: formData.yearEstablished,
    officeAddress: formData.contactInfo.officeAddress,
    country: formData.contactInfo.country,
    city: formData.contactInfo.city,
    AreaZipcode: formData.contactInfo.AreaZipcode, // optional if needed
    phone: formData.contactInfo.phone,
    email: formData.contactInfo.email,
    password: formData.password,

    website: formData.contactInfo.officialWebsite,
  };

  const onSubmit = (data) => {
    console.log("Step One Submitted ==>", data);

    dispatch(
      setFormData({
        firmName: data.firmName,
        registrationNumber: data.registrationNumber,
        yearEstablished: data.yearEstablished,
        email: data.email,
        password: data.password,
        contactInfo: {
          officeAddress: data.officeAddress,
          country: data.country,
          city: data.city,
          phone: data.phone,
          email: data.email,
          officialWebsite: data.website,
        },
      })
    );

    dispatch(nextStep());
  };


  return (
    <div className="flex flex-wrap lg:flex-nowrap w-full">
      <div className="w-full">
        <div className="tla-auth-form tla-auth-form-register relative z-1">
          <div className="absolute inset-0 flex items-center justify-center z-[-1]">
            <div className="w-[215px] h-[215px] rounded-full bg-[#00C3C080] blur-[100px]"></div>
          </div>
          <h3 className="tla-auth-title mb-3 text-center">List Your Law Firm</h3>
          <p className="tla-auth-subtitle mb-8 text-center">
            Create your firm’s account to add lawyers and oversee their activities
          </p>

          <FormWrapper
            onSubmit={onSubmit}
            schema={lawFirmRegStepOneSchema}
          // defaultValues={defaultValues}

          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <TextInput
                name="firmName"
                label="Law Firm Name"
                placeholder="i.e. ABC LLC"
              />

              {/* Country */}
              <SelectInput
                name="country"
                label="Country"
                options={countries}
                placeholder="Select a country"
                triggerClassName={"w-full"}
                onValueChange={(val) => {
                  setSelectedCountry(val);
                  setSelectedCity(null);
                }}
              />

              {/* City */}
              <InputCombobox
                name="city"
                label="City"
                options={cities}
                placeholder="Select a city"
                onSelect={(val) => setSelectedCity(val)}
              />

              {/* Address / Zipcode */}
              <InputCombobox
                name="AreaZipcode"
                label="Address"
                placeholder="Select a Zipcode"
                options={zipcodes}
              />

              <TextInput
                name="email"
                label="Email"
                placeholder="i.e. abc@example.com"
              />
              <TextInput
                name="password"
                label="Password"
                placeholder="e.g. AbcFirm@2025"
                type="password"
              />
              <TextInput
                name="phone"
                label="Phone Number"
                placeholder="i.e. +1 (123) 456-7890"
              />




              <TextInput
                name="website"
                label="Website"
                placeholder="i.e. https://example.com"
              />

              <TextInput
                name="registrationNumber"
                label="Registration Number"
                placeholder="i.e. 1234567890"
              />

              <TextInput
                name="yearOfEstablishment"
                label="Year of Establishment"
                placeholder="i.e. 2003"
              />
            </div>

            <button
              type="submit"
              className="mt-8 w-full md:w-auto btn-auth-register bg-[#ff8f14]"
            >
              Next
            </button>
          </FormWrapper>

          <div className="flex flex-wrap justify-between gap-4">
            <div className="tla-auth-footer">
              <span>Already have an account? </span>
              <Link href="/login">
                <b>Log In</b>
              </Link>
            </div>
            <div className="tla-auth-footer">
              <span>Lost your account? </span>
              <Link href="/claim-account">
                <b>Claim Your Account</b>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}












// import React, { useState } from "react";
// import Link from "next/link";
// import FormWrapper from "@/components/form/FormWrapper";
// import TextInput from "@/components/form/TextInput";
// import SelectInput from "@/components/form/SelectInput";
// import InputCombobox from "@/components/form/ComboboxInput";
// import { lawFirmRegStepOneSchema } from "@/schema/auth/authValidation.schema";
// import { useDispatch, useSelector } from "react-redux";
// import { nextStep, setFormData } from "@/store/features/auth/lawFirmRegistrationSlice";

// export const demoLocations = [
//   {
//     countryId: "1",
//     slug: "germany",
//     name: "Germany",
//     cities: [
//       {
//         id: "c1",
//         name: "Berlin",
//         zipcodes: [
//           {
//             _id: "z1",
//             zipcode: "10115",
//             postalCode: "10115",
//             latitude: 52.532,
//             longitude: 13.384,
//             address: "Berlin Central",
//           },
//           {
//             _id: "z2",
//             zipcode: "10117",
//             postalCode: "10117",
//             latitude: 52.52,
//             longitude: 13.404,
//             address: "Berlin Mitte",
//           },
//         ],
//       },
//       {
//         id: "c2",
//         name: "Hamburg",
//         zipcodes: [
//           {
//             _id: "z3",
//             zipcode: "20095",
//             postalCode: "20095",
//             latitude: 53.55,
//             longitude: 10.0,
//             address: "Hamburg Altstadt",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     countryId: "2",
//     slug: "usa",
//     name: "United States",
//     cities: [
//       {
//         id: "c3",
//         name: "New York",
//         zipcodes: [
//           {
//             _id: "z4",
//             zipcode: "10001",
//             postalCode: "10001",
//             latitude: 40.75,
//             longitude: -73.997,
//             address: "Manhattan",
//           },
//         ],
//       },
//       {
//         id: "c4",
//         name: "San Francisco",
//         zipcodes: [
//           {
//             _id: "z5",
//             zipcode: "94103",
//             postalCode: "94103",
//             latitude: 37.774,
//             longitude: -122.419,
//             address: "SoMa District",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     countryId: "3",
//     slug: "canada",
//     name: "Canada",
//     cities: [
//       {
//         id: "c5",
//         name: "Toronto",
//         zipcodes: [
//           {
//             _id: "z6",
//             zipcode: "M5H 2N2",
//             postalCode: "M5H 2N2",
//             latitude: 43.653,
//             longitude: -79.383,
//             address: "Downtown Toronto",
//           },
//         ],
//       },
//       {
//         id: "c6",
//         name: "Vancouver",
//         zipcodes: [
//           {
//             _id: "z7",
//             zipcode: "V6B 1V2",
//             postalCode: "V6B 1V2",
//             latitude: 49.282,
//             longitude: -123.117,
//             address: "Gastown",
//           },
//         ],
//       },
//     ],
//   },
// ];

// export default function LawFirmRegisterStepOne() {
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const dispatch = useDispatch();
//   const formData = useSelector((state) => state.lawFirmRegistration.formData);
//   const countries = demoLocations.map((c) => ({
//     value: c.slug,
//     label: c.name,
//   }));

//   const cities =
//     demoLocations
//       .find((c) => c.slug === selectedCountry)
//       ?.cities.map((city) => ({ value: city.id, label: city.name })) || [];

//   const zipcodes =
//     demoLocations
//       .find((c) => c.slug === selectedCountry)
//       ?.cities.find((city) => city.id === selectedCity)
//       ?.zipcodes.map((z) => ({ value: z._id, label: z.zipcode })) || [];



//   const defaultValues = {
//     name: formData.name,
//     country: formData.country,
//     city: formData.city,
//     AreaZipcode: formData.AreaZipcode,
//     phone: formData.phone,
//     email: formData.email,
//     website: formData.website,
//     registrationNumber: formData.registrationNumber,
//     yearOfEstablishment: formData.yearOfEstablishment,
//   }


//   const onSubmit = (data) => {

//     console.log('check step one data ==>',data)
//     // 1️ Save step data to Redux
//     dispatch(setFormData(data));
//     // 2 Move to next step
//     dispatch(nextStep());
//   };

//   return (
//     <div className="flex flex-wrap lg:flex-nowrap w-full">
//       <div className="w-full">
//         <div className="tla-auth-form tla-auth-form-register relative z-1">
//           <div className="absolute inset-0 flex items-center justify-center z-[-1]">
//             <div className="w-[215px] h-[215px] rounded-full bg-[#00C3C080] blur-[100px]"></div>
//           </div>
//           <h3 className="tla-auth-title mb-3 text-center">List Your Law Firm</h3>
//           <p className="tla-auth-subtitle mb-8 text-center">
//             Create your firm’s account to add lawyers and oversee their activities
//           </p>

//           <FormWrapper
//             onSubmit={onSubmit}
//             schema={lawFirmRegStepOneSchema}
//             // defaultValues={defaultValues}

//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <TextInput
//                 name="name"
//                 label="Law Firm Name"
//                 placeholder="i.e. ABC LLC"
//               />

//               {/* Country */}
//               <SelectInput
//                 name="country"
//                 label="Country"
//                 options={countries}
//                 placeholder="Select a country"
//                 triggerClassName={"w-full"}
//                 onValueChange={(val) => {
//                   setSelectedCountry(val);
//                   setSelectedCity(null);
//                 }}
//               />

//               {/* City */}
//               <InputCombobox
//                 name="city"
//                 label="City"
//                 options={cities}
//                 placeholder="Select a city"
//                 onSelect={(val) => setSelectedCity(val)}
//               />

//               {/* Address / Zipcode */}
//               <InputCombobox
//                 name="AreaZipcode"
//                 label="Address"
//                 placeholder="Select a Zipcode"
//                 options={zipcodes}
//               />

//               <TextInput
//                 name="phone"
//                 label="Phone Number"
//                 placeholder="i.e. +1 (123) 456-7890"
//               />

//               <TextInput
//                 name="email"
//                 label="Email"
//                 placeholder="i.e. abc@example.com"
//               />

//               <TextInput
//                 name="website"
//                 label="Website"
//                 placeholder="i.e. https://example.com"
//               />

//               <TextInput
//                 name="registrationNumber"
//                 label="Registration Number"
//                 placeholder="i.e. 1234567890"
//               />

//               <TextInput
//                 name="yearOfEstablishment"
//                 label="Year of Establishment"
//                 placeholder="i.e. 2003"
//               />
//             </div>

//             <button
//               type="submit"
//               className="mt-8 w-full md:w-auto btn-auth-register bg-[#ff8f14]"
//             >
//               Next
//             </button>
//           </FormWrapper>

//           <div className="flex flex-wrap justify-between gap-4">
//             <div className="tla-auth-footer">
//               <span>Already have an account? </span>
//               <Link href="/login">
//                 <b>Log In</b>
//               </Link>
//             </div>
//             <div className="tla-auth-footer">
//               <span>Lost your account? </span>
//               <Link href="/claim-account">
//                 <b>Claim Your Account</b>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
