"use client";

import React, { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import clsx from "clsx";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCheckFirmNameMutation } from "@/store/firmFeatures/public/firmPublicApiService";


export default function FirmNameInput({
  name,
  label,
  placeholder = "",
  type = "text",
  disabled = false,
  inputClassName = "",
  itemClassName = "",
  labelClassName = "",
  textColor = "text-black",
}) {
  const { control } = useFormContext();

  // watch country field
  const countryId = useWatch({ control, name: "country" });

  // watch firmName field
  const firmName = useWatch({ control, name });

  const [checkFirmName, { isLoading }] = useCheckFirmNameMutation();

  const [debouncedFirmName, setDebouncedFirmName] = useState(firmName);
  const [apiMessage, setApiMessage] = useState(null);
  const [apiError, setApiError] = useState(false);

  // debounce input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFirmName(firmName);
    }, 500);

    return () => clearTimeout(handler);
  }, [firmName]);

  // Call API when debouncedFirmName changes
  useEffect(() => {
    if (!debouncedFirmName || !countryId) {
      setApiMessage(null);
      setApiError(false);
      return;
    }

    checkFirmName({ firmName: debouncedFirmName, countryId })
      .unwrap()
      .then((res) => {
        // Use API message from backend
        setApiMessage(res?.message || "Firm name is available ✅");
        setApiError(!res?.success); // error if success = false
      })
      .catch((err) => {
        setApiMessage(err?.data?.message || "Something went wrong ❌");
        setApiError(true);
      });
  }, [debouncedFirmName, countryId, checkFirmName]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const { ref, value, onChange, onBlur, name, ...restField } = field;

        return (
          <FormItem className={itemClassName}>
            {label && (
              <FormLabel className={labelClassName} htmlFor={name}>
                {label}
              </FormLabel>
            )}
            <FormControl>
              <Input
                {...restField}
                name={name}
                id={name}
                ref={ref}
                type={type}
                placeholder={placeholder}
                  disabled={disabled || !countryId}
                onChange={onChange}
                onBlur={onBlur}
                value={value ?? ""}
                className={clsx(
                  "bg-white border-[#DCE2EA] text-black placeholder:text-[#a6a8ab] h-[44px]",
                  textColor,
                  inputClassName
                )}
              />
            </FormControl>

            {/* Show API response */}
            <FormMessage className={apiError ? "text-red-500" : "text-green-500"}>
              {isLoading ? "Checking firm name..." : apiMessage || ""}
            </FormMessage>
          </FormItem>
        );
      }}
    />
  );
}
