"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function SelectInput({
  name,
  label,
  options = [],
  placeholder = "Select an option",
  disabled = false,
  triggerClassName = "",
  itemClassName = "",
  labelClassName = "",
  textColor = "text-black",
  onValueChange, // new prop
}) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={itemClassName}>
            {label && <FormLabel className={labelClassName}>{label}</FormLabel>}
            <FormControl>
              <Select
                // disabled={disabled}
                // onValueChange={field.onChange}
                onValueChange={(val) => {
                  field.onChange(val); // maintain react-hook-form behavior
                  if (onValueChange) onValueChange(val); // call external handler
                }}
                value={field.value ?? ""}
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
                  {options?.map((opt) => (
                    <SelectItem key={opt.key || opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
