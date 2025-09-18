"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  name,
  label,
  placeholder = "",
  type = "text",
  disabled = false,
  inputClassName = "",
  itemClassName = "",
  labelClassName = "",
  textColor = "text-black",
  ...props
}) {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const { ref, value, onChange, onBlur, name, ...restField } = field;

        const isPassword = type === "password";

        return (
          <FormItem className={itemClassName}>
            {label && (
              <FormLabel className={labelClassName} htmlFor={name}>
                {label}
              </FormLabel>
            )}
            <FormControl>
              <div className="relative">
                <Input
                  {...restField}
                  name={name}
                  id={name}
                  ref={ref}
                  type={isPassword && showPassword ? "text" : type}
                  placeholder={placeholder}
                  disabled={disabled}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value ?? ""}
                  className={clsx(
                    "bg-white border-[#DCE2EA] text-black placeholder:text-[#a6a8ab] h-[44px] pr-10", // add padding for icon
                    textColor,
                    inputClassName
                  )}
                  {...props}
                />

                {isPassword && (
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
