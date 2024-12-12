import { z } from "zod";

// Enum for User Status (assuming Active/Inactive as examples)
// const UserStatus = z.enum(["Active", "Inactive", "Suspended"]);

// User schema
const CreateUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    role: z.enum(["CUSTOMER", "VENDOR"]),
    password: z.string().min(8),
  }),
});

const blockUnblockUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

// Define Profile schema
const UpdateProfileSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  img: z.string().url().optional().nullable(),
});

// Define Vendor schema
const UpdateVendorSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  logo: z.string().url().optional().nullable(),
  description: z.string().min(1, "Description is required"),
});

// Create a union schema
const UpdateProfileOrVendorValidationSchema = z.object({
  body: z.union([UpdateProfileSchema, UpdateVendorSchema]),
});

export const UserValidations = {
  CreateUserValidationSchema,
  UpdateProfileOrVendorValidationSchema,
  blockUnblockUserValidationSchema,
};
