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
  const {
    control,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useFormContext();

  const countryId = useWatch({ control, name: "country" });
  const firmName = useWatch({ control, name });
  const [checkFirmName, { isLoading }] = useCheckFirmNameMutation();
  const [debouncedFirmName, setDebouncedFirmName] = useState(firmName);
  const [apiMessage, setApiMessage] = useState(null);
  const [apiError, setApiError] = useState(false);

  // Debounce input
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
      clearErrors(name); // clear error if empty
      return;
    }

    checkFirmName({ firmName: debouncedFirmName, countryId })
      .unwrap()
      .then((res) => {
        if (res.success) {
          setApiMessage(res?.message || "Firm name is available ✅");
          setApiError(false);
          clearErrors(name); // clear any previous errors
        } else {
          setApiMessage(res?.message || "Firm name is available ✅");
          setApiError(true);
          setError(name, {
            message: res.message || "Firm name already taken ❌",
          });
        }
      })
      .catch((err) => {
        setApiMessage(err?.data?.message || "Something went wrong ❌");
        setApiError(true);
        setError(name, {
          message: err?.data?.message || "Something went wrong ❌",
        });
      });
  }, [
    debouncedFirmName,
    countryId,
    checkFirmName,
    name,
    setError,
    clearErrors,
  ]);

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

            <FormMessage
              className={clsx(
                apiError || errors?.[name] ? "text-red-500" : "text-green-500"
              )}
            >
              {isLoading
                ? "Checking firm name..."
                : errors?.[name]?.message || apiMessage || ""}
            </FormMessage>
          </FormItem>
        );
      }}
    />
  );
}
