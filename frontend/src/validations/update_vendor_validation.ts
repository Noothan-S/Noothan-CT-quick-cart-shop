import { z } from "zod";

export const updateVendorValidationSchema = z.object({
  name: z.string().min(1, "Vendor name is required"),
  phone: z
    .string()
    .regex(
      /^\+?[0-9]{10,14}$/,
      "Phone number must be a valid number with 10 to 14 digits and may start with '+'."
    ),
  address: z
    .string()
    .min(10, "Address must be at least 5 character long")
    .max(200, "Address must be at most 50 character long"),

  img: z.string().url().optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 character long")
    .max(200, "Description must be at most 10 character long"),
});

export const updateVendorFromProfileValidationSchema = z.object({
  name: z.string().min(1, "Vendor name is required"),
  phone: z
    .string()
    .regex(
      /^\+?[0-9]{10,14}$/,
      "Phone number must be a valid number with 10 to 14 digits and may start with '+'."
    )
    .optional(),
  address: z
    .string()
    .min(10, "Address must be at least 5 character long")
    .max(200, "Address must be at most 50 character long"),

  description: z
    .string()
    .min(10, "Description must be at least 10 character long")
    .max(200, "Description must be at most 200 character long"),
});
