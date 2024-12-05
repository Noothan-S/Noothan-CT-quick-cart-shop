import { z } from "zod";

const createCouponValidationSchema = z.object({
    body: z.object({
        code: z.string().min(1, "Code is required"),
        parentage: z.number().positive().lte(100).refine(val => Number.isInteger(val), {
            message: "Parentage must be a positive integer less than or equal to 100",
        }),
        expiryDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid date format",
        }),
        productId: z.string().uuid({ message: "Invalid product ID format" }),
    })
});

export const CouponValidations = {
    createCouponValidationSchema
}