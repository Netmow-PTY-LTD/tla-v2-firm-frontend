import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";
import countries from "@/data/countries.json";

export const loginValidationSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(), // checkbox is optional
});

export const lawFirmRegStepOneSchema = z
  .object({
    firmName: z
      .string()
      .min(2, "Law Firm Name must be at least 2 characters")
      .max(100, "Law Firm Name must be less than 100 characters"),

    country: z.string().min(1, "Country is required"),
    city: z.string().min(1, "City is required"),

    zipCode: z.string().min(1, "Address / Zipcode is required"),

    phone: z
      .string()
      .regex(/^\+?[0-9\s-]{7,20}$/, "Invalid phone number format"),

    email: z.email("Invalid email address"),

    website: z.url("Invalid website URL").optional(),

    registrationNumber: z
      .string()
      .min(3, "Registration Number must be at least 3 characters")
      .max(50, "Registration Number must be less than 50 characters"),

    yearEstablished: z
      .string()
      .regex(/^(19|20)\d{2}$/, "Enter a valid year (e.g. 2003)"),
  })
  .superRefine((data, ctx) => {
    const { phone, country } = data;
    console.log("Phone to validate:", phone);
    console.log("Country for phone validation:", country);

    if (!phone || !country) return;

    const countryCode = countries?.find((c) => c.countryId === country)?.code;
    const countryName = countries?.find((c) => c.countryId === country)?.name;

    // Step 1: Clean input (remove spaces and other non-digits except '+')
    const cleanedPhone = phone.replace(/[^\d+]/g, "");

    // Step 2: Check if phone number already has country code (e.g., +61 for Australia)
    // If no country code, prepend it with the country code from the country field.
    let parsedPhone;
    if (cleanedPhone.startsWith("+")) {
      parsedPhone = parsePhoneNumberFromString(cleanedPhone, countryCode);
    } else {
      const countryCallingCode = getCountryCallingCode(countryCode); // You may need to import a method to get the country calling code.
      const phoneWithCountryCode = `+${countryCallingCode}${cleanedPhone}`;
      parsedPhone = parsePhoneNumberFromString(
        phoneWithCountryCode,
        countryCode
      );
    }

    // Step 3: Validate
    if (!parsedPhone || !parsedPhone.isValid()) {
      ctx.addIssue({
        path: ["phone"],
        code: z.ZodIssueCode.custom,
        message: "Invalid phone number for " + countryName,
      });
    }
  });

// Helper function to get country calling code (example for a few countries)
function getCountryCallingCode(country) {
  const callingCodes = {
    AU: "61", // Australia
    US: "1", // United States
    GB: "44", // United Kingdom
    CA: "1", // Canada
    IE: "353", // Ireland
    ZA: "27", // South Africa
    NZ: "64", // New Zealand
    SG: "65", // Singapore
    FR: "33", // France
    DE: "49", // Germany

    // Add more countries as needed
  };
  return callingCodes[country] || ""; // Default to an empty string if country not found
}

// -------------------- Step Two --------------------

export const lawFirmRegStepTwoSchema = (countryCode) =>
  z
    .object({
      name: z
        .string()
        .min(2, { message: "Full Name must be at least 2 characters" })
        .max(50, { message: "Full Name must be at most 50 characters" }),

      email: z.email({ message: "Invalid email address" }),

      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
      // .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/, {
      //   message: "Password must contain letters, numbers, and special characters"
      // }),

      phone: z
        .string()
        .min(8, { message: "Phone number must be at least 8 digits" })
        .max(20, { message: "Phone number must be at most 20 digits" })
        .regex(/^[\d +()-]+$/, { message: "Invalid phone number format" }),
    })
    .superRefine((data, ctx) => {
      const { phone } = data;

      if (!phone || !countryCode) return;

      const cleanedPhone = phone.replace(/[^\d+]/g, "");

      let parsedPhone;
      if (cleanedPhone.startsWith("+")) {
        parsedPhone = parsePhoneNumberFromString(cleanedPhone, countryCode);
      } else {
        try {
          const callingCode = getCountryCallingCode(countryCode);
          const phoneWithCountryCode = `+${callingCode}${cleanedPhone}`;
          parsedPhone = parsePhoneNumberFromString(
            phoneWithCountryCode,
            countryCode
          );
        } catch (e) {
          ctx.addIssue({
            path: ["phone"],
            code: z.ZodIssueCode.custom,
            message:
              "Unable to validate phone number due to invalid country code",
          });
          return;
        }
      }

      if (!parsedPhone || !parsedPhone.isValid()) {
        ctx.addIssue({
          path: ["phone"],
          code: z.ZodIssueCode.custom,
          message: `Invalid phone number for selected country (${countryCode.toUpperCase()})`,
        });
      }
    });

// export const lawFirmRegStepTwoSchema = z
//   .object({
//     name: z
//       .string()
//       .min(2, { message: "Full Name must be at least 2 characters" })
//       .max(50, { message: "Full Name must be at most 50 characters" }),

//     email: z.email({ message: "Invalid email address" }),

//     password: z
//       .string()
//       .min(6, { message: "Password must be at least 6 characters" }),
//     // .regex(
//     //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
//     //   { message: "Password must contain letters, numbers, and special characters" }
//     // ),

//     phone: z
//       .string()
//       .min(8, { message: "Phone number must be at least 8 digits" })
//       .max(20, { message: "Phone number must be at most 20 digits" })
//       .regex(/^[\d +()-]+$/, { message: "Invalid phone number format" }),
//   });

// -------------------- Step There --------------------
export const lawFirmRegStepThereSchema = z.object({
  certificationId: z
    .string()
    .min(2, "License Type is required")
    .max(100, "License Type is too long"),
  licenseNumber: z
    .string()
    .min(2, "License Number is required")
    .max(50, "License Number is too long"),
  // issuedBy: z.string().min(1, "Issuing body is required"),
  validUntil: z
    .string()
    .min(1, "Valid Until date is required")
    .refine((date) => !isNaN(Date.parse(date)), "Enter a valid date"),
});
