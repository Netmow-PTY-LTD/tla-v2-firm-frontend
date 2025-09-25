"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import { Check, Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLazyGetZipCodeListQuery } from "@/store/tlaFeatures/public/publicApiService";

const ZipCodeComboboxMap = ({ name, label, placeholder, countryId, disabled = false }) => {
  const { control ,getValues } = useFormContext();
  const [query, setQuery] = useState("");
  const [mapSrc, setMapSrc] = useState("");

  const [getZipCodes, { data, isFetching }] = useLazyGetZipCodeListQuery();

  // Fetch zip codes for search or default value
  useEffect(() => {
    const defaultZipId = getValues(name);
    const searchTerm = query.length >= 2 ? query : defaultZipId || "";
    if (searchTerm) {
      getZipCodes({ page: 1, limit: 10, search: searchTerm, countryId });
    }
  }, [query, getValues, name, getZipCodes, countryId]);

  const options = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((z) => ({
      _id: z._id,
      label: z.zipcode,
      latitude: z.latitude,
      longitude: z.longitude,
    }));
  }, [data]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        // Find the full object for RHF value
        const selectedZip = options.find((o) => o._id === field.value) || null;

        // Update map when selection changes
        useEffect(() => {
          if (selectedZip && selectedZip.latitude && selectedZip.longitude) {
            setMapSrc(
              `https://maps.google.com/maps?q=${selectedZip.latitude},${selectedZip.longitude}&z=15&output=embed`
            );
          } else {
            setMapSrc("");
          }
        }, [selectedZip]);

        return (
          <div className="mb-4 w-full">
            {label && <label className="block text-sm font-medium mb-1">{label}</label>}

            <Combobox
              value={selectedZip}
              onChange={(zip) => field.onChange(zip._id)}
              disabled={disabled}
            >
              <div className="relative">
                <ComboboxInput
                  className="w-full h-11 text-black bg-white border border-[#dce2ea] rounded-lg px-4 text-sm font-medium placeholder:text-[12px]"
                  displayValue={(val) => val?.label || ""}
                  placeholder={placeholder}
                  onChange={(e) => setQuery(e.target.value)}
                />

                <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {isFetching ? (
                    <div className="flex items-center justify-center gap-2 p-2 text-gray-500">
                      <Loader className="h-4 w-4 animate-spin" /> Loading...
                    </div>
                  ) : options.length > 0 ? (
                    options.map((zip) => (
                      <ComboboxOption
                        key={zip._id}
                        value={zip}
                        className={({ active }) =>
                          cn(
                            "cursor-pointer select-none relative py-2 pl-10 pr-4",
                            active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                          )
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={cn("block truncate", {
                                "font-medium": selected,
                                "font-normal": !selected,
                              })}
                            >
                              {zip.label}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                <Check className="h-4 w-4" />
                              </span>
                            )}
                          </>
                        )}
                      </ComboboxOption>
                    ))
                  ) : (
                    <div className="p-2 text-gray-500 text-center">No zip codes found</div>
                  )}
                </ComboboxOptions>
              </div>
            </Combobox>

            {/* Map iframe */}
            <div style={{ height: "300px" }} className="w-full mt-5 overflow-hidden rounded-lg border">
              {mapSrc ? (
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={mapSrc}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Map preview
                </div>
              )}
            </div>

            {fieldState.error && (
              <p className="text-red-600 text-sm mt-1">{fieldState.error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

export default ZipCodeComboboxMap;












// "use client";

// import React, { useState, useMemo, useEffect } from "react";
// import { Controller, useFormContext } from "react-hook-form";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxOptions,
//   ComboboxOption,
// } from "@headlessui/react";
// import { Check, Loader } from "lucide-react";
// import { cn } from "@/lib/utils";

// import { useLazyGetZipCodeListQuery } from "@/store/tlaFeatures/public/publicApiService";

// const ZipCodeComboboxMap = ({ name, label, placeholder, countryId, disabled = false }) => {
//   const { control, setValue } = useFormContext();
//   const [query, setQuery] = useState("");
//   const [mapSrc, setMapSrc] = useState("");
//   const [selectedZip, setSelectedZip] = useState(null); // store full object internally


//   const [getZipCodes, { data, isFetching }] = useLazyGetZipCodeListQuery();

//   useEffect(() => {
//     if (query.length >= 2) {
//       getZipCodes({ page: 1, limit: 10, search: query, countryId });
//     }
//   }, [query, getZipCodes, countryId]);

//   const options = useMemo(() => {
//     if (!data?.data) return [];
//     return data.data.map((z) => ({
//       _id: z._id,
//       label: z.zipcode,
//       latitude: z.latitude,
//       longitude: z.longitude,
//     }));
//   }, [data]);

//   const handleSelect = (zip) => {
//     setSelectedZip(zip); // internal full object
//     setValue(name, zip._id); // only submit _id to RHF
//     if (zip.latitude && zip.longitude) {
//       setMapSrc(`https://maps.google.com/maps?q=${zip.latitude},${zip.longitude}&z=15&output=embed`);
//     } else {
//       setMapSrc("");
//     }
//   };

//   return (
//     <Controller
//       control={control}
//       name={name}
//       render={({ field, fieldState }) => (
//         <div className="mb-4 w-full">
//           {label && <label className="block text-sm font-medium mb-1">{label}</label>}

//           <Combobox
//             value={selectedZip}
//             onChange={handleSelect}
//             disabled={disabled}
//           >
//             <div className="relative">
//               <ComboboxInput
//                 className="w-full h-11 text-black bg-white border border-[#dce2ea] rounded-lg px-4 text-sm font-medium placeholder:text-[12px]"
//                 displayValue={(val) => val?.label || ""}
//                 placeholder={placeholder}
//                 onChange={(e) => setQuery(e.target.value)}
//               />
          
//               <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                 {isFetching ? (
//                   <div className="flex items-center justify-center gap-2 p-2 text-gray-500">
//                     <Loader className="h-4 w-4 animate-spin" /> Loading...
//                   </div>
//                 ) : options.length > 0 ? (
//                   options.map((zip) => (
//                     <ComboboxOption
//                       key={zip._id}
//                       value={zip}
//                       className={({ active }) =>
//                         cn(
//                           "cursor-pointer select-none relative py-2 pl-10 pr-4",
//                           active ? "bg-blue-100 text-blue-900" : "text-gray-900"
//                         )
//                       }
//                     >
//                       {({ selected }) => (
//                         <>
//                           <span
//                             className={cn("block truncate", {
//                               "font-medium": selected,
//                               "font-normal": !selected,
//                             })}
//                           >
//                             {zip.label}
//                           </span>
//                           {selected && (
//                             <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
//                               <Check className="h-4 w-4" />
//                             </span>
//                           )}
//                         </>
//                       )}
//                     </ComboboxOption>
//                   ))
//                 ) : (
//                   <div className="p-2 text-gray-500 text-center">No zip codes found</div>
//                 )}
//               </ComboboxOptions>
//             </div>
//           </Combobox>

//           {/* Map iframe */}
//           <div style={{ height: '300px' }} className="aspect-video w-full mt-5 overflow-hidden rounded-lg border">
//             {mapSrc ? (
//               <iframe
//                 width="100%"
//                 height="100%"
//                 style={{ border: 0 }}
//                 loading="lazy"
//                 allowFullScreen
//                 referrerPolicy="no-referrer-when-downgrade"
//                 src={mapSrc}
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-gray-500">
//                 Map preview
//               </div>
//             )}
//           </div>

//           {fieldState.error && <p className="text-red-600 text-sm mt-1">{fieldState.error.message}</p>}
//         </div>
//       )}
//     />
//   );
// };

// export default ZipCodeComboboxMap;

