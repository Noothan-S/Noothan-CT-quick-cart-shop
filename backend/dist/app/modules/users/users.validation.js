"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
// Enum for User Status (assuming Active/Inactive as examples)
// const UserStatus = z.enum(["Active", "Inactive", "Suspended"]);
// User schema
const CreateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        role: zod_1.z.enum(["CUSTOMER", "VENDOR"]),
        password: zod_1.z.string().min(8),
    })
});
// Define Profile schema
const UpdateProfileSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    firstName: zod_1.z.string().min(1, "First name is required"),
    lastName: zod_1.z.string().min(1, "Last name is required"),
    phone: zod_1.z.string().optional().nullable(),
    address: zod_1.z.string().optional().nullable(),
    img: zod_1.z.string().url().optional().nullable(),
});
// Define Vendor schema
const UpdateVendorSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string().min(1, "Name is required"),
    phone: zod_1.z.string().optional().nullable(),
    address: zod_1.z.string().optional().nullable(),
    logo: zod_1.z.string().url().optional().nullable(),
    description: zod_1.z.string().min(1, "Description is required"),
});
// Create a union schema
const UpdateProfileOrVendorValidationSchema = zod_1.z.object({
    body: zod_1.z.union([UpdateProfileSchema, UpdateVendorSchema])
});
exports.UserValidations = {
    CreateUserValidationSchema,
    UpdateProfileOrVendorValidationSchema,
};
