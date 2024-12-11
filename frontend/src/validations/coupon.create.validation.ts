import { z } from "zod";

export const createOrUpdateCouponValidationSchema = z.object({
  code: z.string().nonempty("Code is required."),
  parentage: z.number().refine((value) => value > 0 && value < 100, {
    message: "Parentage must be greater than 0 and less than 100.",
  }),
  productId: z.string().uuid("Product ID must be a valid UUID."),

  //   expiryDate: z.string().refine((date) => {
  //     const parsedDate = new Date(date);
  //     return !isNaN(parsedDate.getTime()) && parsedDate >= new Date();
  //   }, "Expiry date must be a valid ISO 8601 date string and cannot be in the past."),
});
