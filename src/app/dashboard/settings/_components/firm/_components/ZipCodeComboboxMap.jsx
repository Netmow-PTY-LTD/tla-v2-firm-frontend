"use client";

import React, { useState, useEffect } from "react";
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

const ZipCodeComboboxMap = ({
  name,
  label,
  placeholder,
  countryId,
  disabled = false,
}) => {
  const { control } = useFormContext();
  const [query, setQuery] = useState("");
  const [mapSrc, setMapSrc] = useState("");
  const [options, setOptions] = useState([]);

  const [getZipCodes, { data, isFetching }] = useLazyGetZipCodeListQuery();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const selectedZip = options.find((o) => o._id === field.value) || null;

        // 🔹 Fetch zip codes: prioritize search > default value > fallback
        useEffect(() => {
          const searchTerm = query.length >= 2 ? query : "";

          if (searchTerm) {
            // ✅ Prioritize search when user types
            getZipCodes({
              page: 1,
              limit: 10,
              countryId,
              search: searchTerm,
            });
          } else if (field.value) {
            // ✅ Fallback: fetch by default selected zip code
            getZipCodes({
              page: 1,
              limit: 1,
              countryId,
              zipCodeId: field.value,
            });
          } else if (countryId) {
            // ✅ Initial load: fetch first 10 zip codes of country
            getZipCodes({
              page: 1,
              limit: 10,
              countryId,
            });
          }
        }, [field.value, query, countryId, getZipCodes]);

        // 🔹 Update options & map when API responds
        useEffect(() => {
          if (data?.data) {
            const opts = data.data.map((z) => ({
              _id: z._id,
              label: z.zipcode,
              latitude: z.latitude,
              longitude: z.longitude,
            }));
            setOptions(opts);

            // If default selected zip → set map
            if (field.value) {
              const defaultZip = opts.find((z) => z._id === field.value);
              if (defaultZip?.latitude && defaultZip?.longitude) {
                setMapSrc(
                  `https://maps.google.com/maps?q=${defaultZip.latitude},${defaultZip.longitude}&z=15&output=embed`
                );
              }
            }
          }
        }, [data, field.value]);

        return (
          <div className="mb-4 w-full">
            {label && (
              <label className="block text-sm font-medium mb-1">{label}</label>
            )}

            <Combobox
              value={selectedZip}
              onChange={(zip) => {
                field.onChange(zip._id);
                if (zip.latitude && zip.longitude) {
                  setMapSrc(
                    `https://maps.google.com/maps?q=${zip.latitude},${zip.longitude}&z=15&output=embed`
                  );
                }
              }}
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
                            active
                              ? "bg-blue-100 text-blue-900"
                              : "text-gray-900"
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
                    <div className="p-2 text-gray-500 text-center">
                      No zip codes found
                    </div>
                  )}
                </ComboboxOptions>
              </div>
            </Combobox>

            {/* Map iframe */}
            <div
              style={{ height: "300px" }}
              className="w-full mt-5 overflow-hidden rounded-lg border"
            >
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
              <p className="text-red-600 text-sm mt-1">
                {fieldState.error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default ZipCodeComboboxMap;













