import { z } from "zod";

export const updateProfileValidationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z
    .string()
    .regex(
      /^\+?[0-9]{10,14}$/,
      "Phone number must be a valid number with 10 to 14 digits and may start with '+'."
    ),
  address: z.string(),
  img: z.string().url().optional(),
});

export const updateProfileFormProfileValidationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
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
});
