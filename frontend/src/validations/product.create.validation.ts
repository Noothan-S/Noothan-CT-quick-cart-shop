import { z } from "zod";

export const createProductValidationSchema = z.object({
  categoryId: z.string().uuid(),
  title: z.string().min(1, "Title is required"),
  //   imgs: z.array(z.string().min(1, "Image filename cannot be empty")),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  discount: z
    .number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%"),
  quantity: z.number().int().nonnegative("Quantity cannot be negative"),
});
