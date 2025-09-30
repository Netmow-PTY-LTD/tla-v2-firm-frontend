"use client";

import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const InputCombobox = ({ name, label, options, placeholder, onSelect }) => {
  const { control } = useFormContext();
  const [query, setQuery] = useState("");

  // filter options based on query
  const filteredOptions =
    query === ""
      ? options
      : options?.filter((item) =>
          item?.label?.toLowerCase()?.includes(query.toLowerCase())
        );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">{label}</label>
          <Combobox
            value={field.value}
            onChange={(val) => {
              field.onChange(val);
              if (onSelect) onSelect(val);
            }}
          >
            <div className="relative">
              <ComboboxInput
                className=" w-full border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-200 h-[44px]"
                displayValue={(val) =>
                  options?.find((o) => o.value === val)?.label || ""
                }
                placeholder={placeholder}
                onChange={(e) => setQuery(e.target.value)} // ✅ enable search
              />
              <ComboboxButton className="absolute top-0 bottom-0 right-0 flex items-center pr-2">
                <ChevronDown className="h-4 w-4 " />
              </ComboboxButton>

              {filteredOptions?.length > 0 && (
                <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-gray-200 ring-opacity-5 focus:outline-none">
                  {filteredOptions.map((item, index) => (
                    <ComboboxOption
                      key={index}
                      value={item.value}
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
                  ))}
                </ComboboxOptions>
              )}
            </div>
          </Combobox>
          {fieldState.error && (
            <p className="text-red-600 text-sm mt-1">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default InputCombobox;
