import { z } from "zod";

const responseValidationSchema = z.object({
    body: z.object({
        description: z.string().min(5, 'Reply Must be > 5 creators')
    })
})

export const ReviewResponseValidations = {
    responseValidationSchema
}