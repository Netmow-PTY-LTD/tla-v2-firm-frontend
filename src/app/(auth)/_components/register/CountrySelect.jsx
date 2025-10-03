"use client";

import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";



import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetCountryListQuery } from "@/store/tlaFeatures/public/publicApiService";

//  import your API hook


export default function CountrySelect({
  name,
  label,
  placeholder = "Select a country",
  disabled = false,
  triggerClassName = "",
  itemClassName = "",
  labelClassName = "",
  textColor = "text-black",
  onValueChange, // external callback
}) {
  const { control } = useFormContext();

  //  fetch countries from API
  const { data: countriesData, isLoading } = useGetCountryListQuery();

  // ✅ transform API response → options for Select
  const options = useMemo(() => {
    if (!countriesData?.data) return [];
    return countriesData.data.map((c) => ({
      value: c._id,
      label: c.name,
    }));
  }, [countriesData]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={itemClassName}>
          {label && <FormLabel className={labelClassName}>{label}</FormLabel>}
          <FormControl>
            <Select
              disabled={disabled || isLoading}
              value={field.value ?? ""}
              onValueChange={(val) => {
                field.onChange(val); // maintain react-hook-form behavior
                if (onValueChange) onValueChange(val); // call external handler
              }}
            >
              <SelectTrigger
                className={clsx(
                  "bg-white w-full",
                  textColor,
                  triggerClassName
                )}
                style={{ height: "44px" }}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
