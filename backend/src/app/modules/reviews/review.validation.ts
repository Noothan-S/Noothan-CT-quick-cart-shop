import { z } from "zod";

const createReviewValidationSchema = z.object({
    body: z.object({
        productId: z.string().uuid({ message: "Invalid product ID format" }),
        description: z.string().min(1, "Description is required"),
        rating: z.number().int().min(1, "Rating must be at least 1").max(5, "Rating must not exceed 5"),
    })
});

export const ReviewValidations = {
    createReviewValidationSchema
}