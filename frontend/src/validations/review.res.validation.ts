import { z } from "zod";

export const responseReviewValidationSchema = z.object({
  description: z
    .string()
    .min(10, { message: "Response must be at least 10 characters long" })
    .max(100, { message: "Response cannot exceed 100 characters" }),
});
