import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().nonempty("is required").email("Invalid email address"),
  password: z
    .string()
    .nonempty("is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(), // checkbox is optional
});




export const lawFirmRegStepOneSchema = z.object({
  firmName: z
    .string()
    .min(2, "Law Firm Name must be at least 2 characters")
    .max(100, "Law Firm Name must be less than 100 characters"),

  country: z
    .string()
    .min(1, "Country is required"),
  city: z
    .string()
    .min(1, "City is required"),

  zipCode: z
    .string()
    .min(1, "Address / Zipcode is required"),

  phone: z
    .string()
    .regex(
      /^\+?[0-9\s-]{7,20}$/,
      "Invalid phone number format"
    ),

  email: z.email("Invalid email address"),


  website: z.url("Invalid website URL")
    .optional(),

  registrationNumber: z
    .string()
    .min(3, "Registration Number must be at least 3 characters")
    .max(50, "Registration Number must be less than 50 characters"),

  yearEstablished: z
    .string()
    .regex(
      /^(19|20)\d{2}$/,
      "Enter a valid year (e.g. 2003)"
    ),
});




// -------------------- Step Two --------------------

export const lawFirmRegStepTwoSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Full Name must be at least 2 characters" })
    .max(50, { message: "Full Name must be at most 50 characters" }),

  email: z.email({ message: "Invalid email address" }),

 password: z
  .string()
  .min(6, { message: "Password must be at least 6 characters" }),
  // .regex(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
  //   { message: "Password must contain letters, numbers, and special characters" }
  // ),


  phone: z
    .string()
    .min(8, { message: "Phone number must be at least 8 digits" })
    .max(20, { message: "Phone number must be at most 20 digits" })
    .regex(
      /^[\d +()-]+$/,
      { message: "Invalid phone number format" }
    ),
});
















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




