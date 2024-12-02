import { z } from "zod";

// Enum for User Status (assuming Active/Inactive as examples)
// const UserStatus = z.enum(["Active", "Inactive", "Suspended"]);

// User schema
const createUserValidationSchema = z.object({
    body: z.object({
        email: z.string().email(),
        role: z.enum(["CUSTOMER", "VENDOR"]),
        password: z.string().min(8),
    })
});

export const UserValidations = {
    createUserValidationSchema
}