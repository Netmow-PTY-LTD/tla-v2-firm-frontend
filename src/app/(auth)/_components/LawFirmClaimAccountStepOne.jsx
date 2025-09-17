"use client";
import React, { useState } from "react";
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
import { useGetZipCodeListQuery } from "@/store/features/public/publicApiService";
import { nextStep } from "@/store/features/auth/lawFirmRegistrationSlice";
import { useDispatch } from "react-redux";
import MultipleTagSelector from "@/components/form/MultipleTagSelector";

const germanCities = [
  { id: 1, name: "Berlin" },
  { id: 2, name: "Hamburg" },
  { id: 3, name: "Munich" },
  { id: 4, name: "Cologne" },
  { id: 5, name: "Frankfurt" },
  { id: 6, name: "Stuttgart" },
  { id: 7, name: "Düsseldorf" },
  { id: 8, name: "Dortmund" },
  { id: 9, name: "Leipzig" },
  { id: 10, name: "Bremen" },
];

const companies = [
  { id: 1, name: "Siemens" },
  { id: 2, name: "BMW" },
  { id: 3, name: "Volkswagen" },
  { id: 4, name: "SAP" },
  { id: 5, name: "BASF" },
  { id: 6, name: "Allianz" },
  { id: 7, name: "Deutsche Bank" },
  { id: 8, name: "Adidas" },
  { id: 9, name: "Lufthansa" },
  { id: 10, name: "Bosch" },
];

export default function LawFirmClaimAccountStepOne() {
  const [city, setCity] = useState(germanCities[0].name);
  const [zipcode, setZipcode] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const cookieCountry = safeJsonParse(Cookies.get("countryObj"));

  //const { data: countryList } = useGetCountryListQuery();

  const defaultCountry = countries?.find(
    (country) => country?.slug === cookieCountry?.slug
  );

  console.log("defaultCountry in step 2", defaultCountry);

  const paramsPayload = {
    countryId: defaultCountry?.countryId,
    search: query || "",
  };

  const { data: allZipCodes, isLoading: isZipCodeLoading } =
    useGetZipCodeListQuery(paramsPayload, {
      skip: !defaultCountry?.countryId,
    });

  const filteredZipCodes = allZipCodes?.data?.filter((z) =>
    z.zipcode?.toLowerCase()?.includes(query.toLowerCase())
  );

  const form = useForm({
    defaultValues: {
      name: "",
    },
  });

  const { control, handleSubmit } = form;
  const onSubmit = (data) => {
    console.log(data);
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
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                              }}
                            >
                              <SelectTrigger className="w-full h-[44px] bg-[#F2F2F2]">
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Countries</SelectLabel>
                                  {countries.map((country) => (
                                    <SelectItem
                                      value={country?.slug}
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
                      name="company_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Law Firm Name</FormLabel>
                          <Combobox
                            value={field.value}
                            onChange={(val) => {
                              //console.log('val', val);
                              field.onChange(val);
                              setZipcode(val);
                              const selectedZipcode = allZipCodes?.data?.find(
                                (z) => z._id === val
                              );
                              if (selectedZipcode) {
                                setLatitude(selectedZipcode.latitude);
                                setLongitude(selectedZipcode.longitude);
                                setPostalCode(selectedZipcode.postalCode);
                                setAddress(selectedZipcode.zipcode);
                              }
                            }}
                          >
                            <div className="relative">
                              <ComboboxInput
                                className="tla-form-control w-full"
                                onChange={(event) =>
                                  setQuery(event.target.value)
                                }
                                displayValue={(val) =>
                                  allZipCodes?.data?.find((z) => z._id === val)
                                    ?.zipcode || ""
                                }
                                placeholder="Select a Zipcode"
                              />
                              {filteredZipCodes?.length > 0 && (
                                <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  {filteredZipCodes
                                    ?.slice(0, 10)
                                    .map((item) => (
                                      <ComboboxOption
                                        key={item._id}
                                        value={item._id}
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
                                              {item.zipcode}
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
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="i.e. abc@example.com"
                              className="h-[44px] bg-[#F2F2F2] border-[#DCE2EA] focus-visible:ring-inset"
                              {...field}
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
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2 md:pr-5">
                    <FormField
                      control={control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Law Firm Registration Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="i.e. abc@example.com"
                              className="h-[44px] bg-[#F2F2F2] border-[#DCE2EA] focus-visible:ring-inset"
                              {...field}
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
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input
                              type="url"
                              placeholder="i.e. https://example.com"
                              className="h-[44px] bg-[#F2F2F2] border-[#DCE2EA] focus-visible:ring-inset"
                              {...field}
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
                    name="known_admins"
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
