import { z } from "zod";

// Define Zod schema for validation
export const loginValidationSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});