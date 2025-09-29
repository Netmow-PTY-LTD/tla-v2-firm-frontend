import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useGetFirmInfoQuery } from "@/store/firmFeatures/firmApiService";
import { useGetFirmUserInfoQuery } from "@/store/firmFeatures/firmAuth/firmAuthApiService";
import { useGetZipCodeListQuery } from "@/store/tlaFeatures/public/publicApiService";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Check, ChevronDown, Loader } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export default function LocationCombobox({
  name,
  onSelect,
  placeholder,
  label,
  itemClassName,
  labelClassName,
}) {
  const { control } = useFormContext();
  const [query, setQuery] = useState("");

  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetFirmUserInfoQuery();

  //console.log("currentUser in LocationCombobox", currentUser);

  const countryId =
    currentUser?.data?.contactInfo?.country?._id || // Prefer _id if it's an object
    currentUser?.data?.contactInfo?.country ||
    "";

  //console.log("countryId in LocationCombobox", countryId);

  const { data, isLoading } = useGetZipCodeListQuery({
    page: 1,
    limit: 10,
    search: query,
    countryId: countryId,
  });

  // ✅ transform API data → options
  const options = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((z) => ({
      value: z._id,
      label: `${z.zipcode}`, // adjust based on API response
    }));
  }, [data]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={itemClassName}>
          {label && <FormLabel className={labelClassName}>{label}</FormLabel>}
          <FormControl>
            <Combobox
              value={field.value ?? null}
              onChange={(val) => {
                field.onChange(val);
                if (onSelect) onSelect(val);
              }}
            >
              <div className="relative">
                <ComboboxInput
                  className="w-full h-11 text-black bg-white border border-[#dce2ea] rounded-lg px-4  text-sm font-medium leading-[27px] placeholder:text-[12px] placeholder:font-normal"
                  displayValue={(val) => {
                    if (!val) return "";
                    const match = options.find((o) => o.value === val); // val is string id
                    return match ? match.label : "";
                  }}
                  //   displayValue={(val) =>
                  //     options.find((o) => o.value === val)?.label || ""
                  //   }
                  //   displayValue={(val) => {
                  //     if (!val) return "";
                  //     const match = options.find((o) => o.value === val);
                  //     // fallback: if the form value came with a pre-filled label
                  //     if (typeof val === "object") return val.label || "";
                  //     return match?.label || val; // show id as last fallback
                  //   }}
                  placeholder={placeholder}
                  onChange={(e) => setQuery(e.target.value)} // live search
                />
                <ComboboxButton className="absolute top-0 bottom-0 right-0 flex items-center pr-2">
                  <ChevronDown className="h-4 w-4" />
                </ComboboxButton>

                <ComboboxOptions
                  className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md 
             bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 
             focus:outline-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2 p-2 text-gray-500">
                      <Loader className="h-4 w-4 animate-spin" />
                      Loading...
                    </div>
                  ) : options && options.length > 0 ? (
                    options.map((item) => (
                      <ComboboxOption
                        key={item.value}
                        value={item?.value}
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
                              {item.label}
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
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
