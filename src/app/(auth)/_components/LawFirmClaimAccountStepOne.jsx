"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import countries from "@/data/countries.json";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { safeJsonParse } from "@/helpers/safeJsonParse";
import Cookies from "js-cookie";
import { nextStep } from "@/store/firmFeatures/firmAuth/lawFirmRegistrationSlice";
import { useDispatch } from "react-redux";
import MultipleTagSelector from "@/components/form/MultipleTagSelector";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetFirmBySearchQuery } from "@/store/firmFeatures/firmApiService";

const stepOneSchema = z.object({
  country: z.string().min(1, "Country is required"),
  lawFirmName: z.string().min(1, "Law Firm Name is required"),
  lawFirmEmail: z.string().email("Invalid email address"),
  lawFirmRegistrationNumber: z
    .string()
    .min(1, "Registration Number is required"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  // knownAdminEmails: z
  //   .array(z.string().email("Invalid email address"))
  //   .optional(),
});

export default function LawFirmClaimAccountStepOne({ initialValues, onNext }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const dispatch = useDispatch();

  const cookieCountry = safeJsonParse(Cookies.get("countryObj"));

  //const { data: countryList } = useGetCountryListQuery();

  const defaultCountry = countries?.find(
    (country) => country?.slug === cookieCountry?.slug
  );

  //console.log("defaultCountry in step 2", defaultCountry);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const { data: firmsBySearch, isLoading: isLoadingFirmBySearch } =
    useGetFirmBySearchQuery(
      {
        countryId: defaultCountry?.countryId || "",
        search: debouncedQuery,
      },
      {
        skip: !defaultCountry?.countryId || debouncedQuery.length < 1,
      }
    );

  console.log("firmsBySearch", firmsBySearch);

  const filteredCompanies = firmsBySearch?.data?.filter((company) =>
    company?.firmName?.toLowerCase().includes(query.toLowerCase())
  );

  const form = useForm({
    resolver: zodResolver(stepOneSchema),
    defaultValues: initialValues || {
      country: "",
      lawFirmName: "",
      lawFirmEmail: "",
      lawFirmRegistrationNumber: "",
      website: "",
      knownAdminEmails: [],
    },
  });

  const { control, watch, handleSubmit } = form;
  const selectedCountry = watch("country");
  const onSubmit = (data) => {
    console.log(data);
    onNext(data);
    dispatch(nextStep());
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap w-full">
      <div className="w-full">
        <div className="tla-auth-form tla-auth-form-register relative z-1">
          <div className="absolute inset-0 flex items-center justify-center z-[-1]">
            <div className="w-[215px] h-[215px] rounded-full bg-[#00C3C080] blur-[100px]"></div>
          </div>
          <h3 className="tla-auth-title mb-3 text-center">
            Claim Your Law Firm Account
          </h3>
          <p className="tla-auth-subtitle mb-8 text-center">
            Create your firm’s account to add lawyers and oversee their
            activities
          </p>

          {/* <h5 className="text-[var(--color-black)] text-[24px] uppercase text-center font-semibold mb-5">
            Register as Law-firm
          </h5> */}

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <div className="flex flex-wrap">
                  <div className="w-full">
                    <FormField
                      control={control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger
                                className="w-full bg-[#F2F2F2]"
                                style={{ height: "44px" }}
                              >
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Countries</SelectLabel>
                                  {countries.map((country) => (
                                    <SelectItem
                                      value={country?.countryId}
                                      key={country?.countryId}
                                    >
                                      {country?.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2 md:pr-5">
                    <FormField
                      control={form.control}
                      name="lawFirmName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Law Firm Name</FormLabel>
                          <Combobox
                            value={field.value ?? ""}
                            onChange={(val) => {
                              field.onChange(val); // save selected company ID to form
                            }}
                          >
                            <div className="relative">
                              <ComboboxInput
                                className="tla-form-control w-full"
                                onChange={(event) =>
                                  setQuery(event.target.value)
                                }
                                displayValue={(val) =>
                                  firmsBySearch?.data?.find(
                                    (c) => c._id === val
                                  )?.firmName || ""
                                }
                                placeholder="Search a firm name..."
                                autoComplete="off"
                                disabled={!selectedCountry}
                              />
                              {filteredCompanies?.length > 0 && (
                                <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  {filteredCompanies
                                    ?.slice(0, 10)
                                    .map((company) => (
                                      <ComboboxOption
                                        key={company._id}
                                        value={company._id}
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
                                              {company?.firmName}
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
                          <FormMessage className="text-red-600" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full md:w-1/2 md:pl-5">
                    <FormField
                      control={control}
                      name="lawFirmEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="i.e. abc@example.com"
                              className="h-[44px] bg-[#F2F2F2] border-[#DCE2EA] focus-visible:ring-inset"
                              value={field.value ?? ""}
                              onChange={(e) => {
                                field.onChange(e);
                              }}
                              autoComplete="new-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2 md:pr-5">
                    <FormField
                      control={control}
                      name="lawFirmRegistrationNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Law Firm Registration Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="i.e. abc@example.com"
                              className="h-[44px] bg-[#F2F2F2] border-[#DCE2EA] focus-visible:ring-inset"
                              value={field.value ?? ""}
                              onChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full md:w-1/2 md:pl-5">
                    <FormField
                      control={control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input
                              type="url"
                              placeholder="i.e. https://example.com"
                              className="h-[44px] bg-[#F2F2F2] border-[#DCE2EA] focus-visible:ring-inset"
                              value={field.value ?? ""}
                              onChange={(e) => {
                                field.onChange(e);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <FormLabel className="mb-3 inline-block">
                    Known Admin Emails
                  </FormLabel>
                  <MultipleTagSelector
                    name="knownAdminEmails"
                    placeholder="Type and press Enter"
                  />
                </div>
              </div>

              <button type="submit" className="btn-auth-register mt-8">
                Next
              </button>
            </form>
          </Form>

          <div className="flex flex-wrap justify-between px-2">
            <div className="mt-8 md:mt-5 text-sm text-[var(--color-text)] text-center w-full md:w-auto md:text-left">
              <span>Already have an account? </span>
              <Link
                href="/login"
                className="text-[var(--primary-color)] underline"
              >
                <b>Log In</b>
              </Link>
            </div>
            <div className="mt-3 md:mt-5 text-sm text-[var(--color-text)] text-center w-full md:w-auto md:text-left">
              <span>Is your law firm not listed? </span>
              <Link
                href="/register"
                className="text-[var(--primary-color)] underline"
              >
                <b>Submit a Listing Request</b>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="hidden lg:block lg:max-w-[31.25rem] overflow-hidden">
        <Image
          src="/assets/img/register.webp"
          width={500}
          height={627}
          alt="Auth"
          className="h-full object-cover rounded-tl-0 rounded-tr-[1.25rem] rounded-br-[1.125rem] rounded-bl-0"
        />
      </div> */}
    </div>
  );
}
